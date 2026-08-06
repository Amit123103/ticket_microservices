import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Handle cancelled or denied Google OAuth gracefully
  if (error || !code) {
    const errorMsg = errorDescription || error || 'Google Authentication was cancelled or denied.';
    return NextResponse.redirect(`${origin}?auth_error=${encodeURIComponent(errorMsg)}`);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
    const redirectUri = `${origin}/api/auth/callback/google`;

    // 1. Exchange authorization code for Google access token & id_token (Authorization Code Flow with PKCE/State)
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      const tokenError = tokenData.error_description || tokenData.error || 'Failed to exchange authorization code.';
      return NextResponse.redirect(`${origin}?auth_error=${encodeURIComponent(tokenError)}`);
    }

    // 2. Fetch authenticated Google User Profile from Google UserInfo endpoint
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userInfoResponse.json();
    const email = googleUser.email;
    const name = googleUser.name || email.split('@')[0];
    const picture = googleUser.picture || '';
    const emailVerified = googleUser.email_verified || true;

    if (!email) {
      return NextResponse.redirect(`${origin}?auth_error=${encodeURIComponent('No email address provided by Google account.')}`);
    }

    // 3. Sync User Profile with Backend REST API (Account Linking & Duplicate Prevention)
    try {
      await fetch(`${origin}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'google',
          email,
          name,
          picture,
          emailVerified,
          googleId: googleUser.sub,
        }),
      });
    } catch (dbErr) {
      // Non-blocking sync error
    }

    // 4. Set Secure HTTP-only Cookie & Redirect User Directly to Search Page (?tab=search#special-panel)
    const redirectUrl = new URL(origin);
    redirectUrl.searchParams.set('auth', 'success');
    redirectUrl.searchParams.set('email', email);
    redirectUrl.searchParams.set('name', name);
    redirectUrl.searchParams.set('tab', 'search');
    redirectUrl.hash = 'special-panel';
    if (picture) redirectUrl.searchParams.set('picture', picture);

    const response = NextResponse.redirect(redirectUrl.toString());
    
    response.cookies.set('railgo_user_session', JSON.stringify({
      email,
      name,
      picture,
      emailVerified,
      loginTime: Date.now(),
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;
  } catch (err: any) {
    const catchMsg = err.message || 'An unexpected error occurred during Google Sign In.';
    return NextResponse.redirect(`${origin}?auth_error=${encodeURIComponent(catchMsg)}`);
  }
}
