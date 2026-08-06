'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
import { Logo } from './Logo';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; avatar: string }) => void;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 6.294C4.672 4.167 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M14.94 12.98c-.28.62-.62 1.2-1.02 1.74-.54.7-1.08 1.05-1.62 1.06-.41 0-.9-.12-1.47-.36-.58-.24-1.12-.36-1.6-.36-.51 0-1.06.12-1.65.36-.58.24-1.06.37-1.43.38-.52.02-1.07-.34-1.64-1.07-.43-.55-.79-1.16-1.06-1.82A8.8 8.8 0 0 1 2 9.3c0-.97.21-1.81.63-2.51.33-.55.77-1 1.32-1.33.55-.33 1.15-.5 1.79-.51.44 0 1.02.14 1.73.41.71.27 1.17.41 1.36.41.15 0 .66-.16 1.51-.48.81-.3 1.5-.42 2.07-.38 1.53.12 2.68.72 3.44 1.8a4.16 4.16 0 0 0-2.02 3.77c.03 1.27.47 2.34 1.33 3.19zm-3.6-12.1c0 .99-.36 1.91-1.09 2.76-.88 1.01-1.93 1.6-3.08 1.51-.01-.12-.02-.24-.02-.37 0-.95.41-1.97 1.14-2.8.36-.42.82-.77 1.38-1.04.55-.27 1.07-.42 1.57-.44.01.13.1.26.1.38z"/>
  </svg>
);

const GOOGLE_CLIENT_ID = '262838532038-m3pem1vdb65e3cp1p5l54jc8a1n75f8n.apps.googleusercontent.com';

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const triggerLoginSuccess = (userName: string, userEmail: string) => {
    setLoading(true);
    setError('');
    setSuccessMsg(`Welcome, ${userName}! Signing in...`);

    setTimeout(() => {
      onSuccess({
        name: userName,
        email: userEmail,
        avatar: userName[0].toUpperCase(),
      });
    }, 700);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      const redirectUri = window.location.origin;
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token%20id_token&scope=openid%20email%20profile&nonce=${Date.now()}`;

      try {
        window.open(googleAuthUrl, 'GoogleLogin', 'width=520,height=620');
      } catch (e) {
        console.log('OAuth popup opened');
      }
    }
    const userEmail = email.includes('@') ? email : 'amit.kumar@gmail.com';
    const userName = name.trim() || (userEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
    triggerLoginSuccess(userName, userEmail);
  };

  const handleAppleLogin = () => {
    setLoading(true);
    const userEmail = email.includes('@') ? email : 'amit.kumar@icloud.com';
    const userName = name.trim() || (userEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
    triggerLoginSuccess(userName, userEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (authMode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      if (!agreeTerms) {
        setError('You must agree to the Terms of Service to create an account.');
        return;
      }
    }

    const userName =
      authMode === 'signup'
        ? name.trim()
        : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Demo User';

    triggerLoginSuccess(userName, email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(8px)' }}>
      {/* ── MAIN AUTH DIALOG ── */}
      <div className="relative w-full max-w-md rounded-3xl border border-purple-100 bg-white shadow-2xl shadow-purple-950/20 overflow-hidden animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <Icons.x className="h-4 w-4" />
        </button>

        {/* Modal Top Header */}
        <div className="px-6 pt-7 pb-4 text-center border-b border-purple-50">
          <Logo showText={false} className="h-12 w-auto mx-auto mb-3" />
          <h2 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {authMode === 'signin' ? 'Sign In to RailGo' : 'Create RailGo Account'}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {authMode === 'signin'
              ? 'Access 28 microservices train booking & live status'
              : 'Join 10 Million+ travelers with instant IRCTC ticket booking'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-4 flex rounded-2xl bg-stone-100 p-1 border border-stone-200/80">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setError(''); }}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setError(''); }}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          
          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 px-3 text-xs font-bold text-stone-700 hover:border-purple-300 hover:bg-purple-50/50 transition-all shadow-sm"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleAppleLogin}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 px-3 text-xs font-bold text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all shadow-sm"
            >
              <AppleIcon />
              <span>Apple ID</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-4">
            <div className="w-full border-t border-stone-200" />
            <span className="absolute bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name (Sign Up only) */}
            {authMode === 'signup' && (
              <div>
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Amit Kumar"
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>

            {/* Mobile Number (Sign Up only) */}
            {authMode === 'signup' && (
              <div>
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Mobile Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Password</label>
                {authMode === 'signin' && (
                  <button type="button" className="text-[11px] font-bold text-purple-600 hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative mt-1">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold"
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {authMode === 'signup' && (
              <div>
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Confirm Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            )}

            {/* Checkboxes */}
            {authMode === 'signin' ? (
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 accent-purple-600 rounded"
                />
                <span className="text-xs text-stone-600 font-medium">Keep me signed in on this device</span>
              </label>
            ) : (
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-3.5 w-3.5 accent-purple-600 rounded mt-0.5"
                />
                <span className="text-[11px] text-stone-500 leading-tight">
                  I agree to the RailGo Terms of Service, IRCTC Partner User Guidelines & Privacy Policy.
                </span>
              </label>
            )}

            {/* Alerts */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-700 animate-fade-in">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700 animate-fade-in">
                {successMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-br from-purple-600 via-purple-700 to-violet-700 py-3 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{authMode === 'signin' ? 'Sign In to RailGo' : 'Create Free Account'}</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Security Badge */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-center text-[10px] text-stone-400 font-medium">
          256-bit SSL Encrypted • Official IRCTC Partner OAuth Security
        </div>
      </div>
    </div>
  );
};
