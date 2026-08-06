'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { Logo } from './Logo';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; avatar: string }) => void;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 6.294C4.672 4.167 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
    <path d="M14.94 12.98c-.28.62-.62 1.2-1.02 1.74-.54.7-1.08 1.05-1.62 1.06-.41 0-.9-.12-1.47-.36-.58-.24-1.12-.36-1.6-.36-.51 0-1.06.12-1.65.36-.58.24-1.06.37-1.43.38-.52.02-1.07-.34-1.64-1.07-.43-.55-.79-1.16-1.06-1.82A8.8 8.8 0 0 1 2 9.3c0-.97.21-1.81.63-2.51.33-.55.77-1 1.32-1.33.55-.33 1.15-.5 1.79-.51.44 0 1.02.14 1.73.41.71.27 1.17.41 1.36.41.15 0 .66-.16 1.51-.48.81-.3 1.5-.42 2.07-.38 1.53.12 2.68.72 3.44 1.8a4.16 4.16 0 0 0-2.02 3.77c.03 1.27.47 2.34 1.33 3.19zm-3.6-12.1c0 .99-.36 1.91-1.09 2.76-.88 1.01-1.93 1.6-3.08 1.51-.01-.12-.02-.24-.02-.37 0-.95.41-1.97 1.14-2.8.36-.42.82-.77 1.38-1.04.55-.27 1.07-.42 1.57-.44.01.13.1.26.1.38z"/>
  </svg>
);

// Initial registered users list for duplicate email validation
const INITIAL_REGISTERED_USERS = [
  'user@railgo.in',
  'amit@railgo.in',
  'demo@railgo.in',
];

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [verificationStep, setVerificationStep] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  // Social Auth Modals
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showAppleModal, setShowAppleModal] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot password & OTP State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [resendTimer, setResendTimer] = useState(30);

  // Social Custom Email Mode
  const [customEmailMode, setCustomEmailMode] = useState(false);
  const [socialEmail, setSocialEmail] = useState('');
  const [socialName, setSocialName] = useState('');
  const [socialError, setSocialError] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (verificationStep && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verificationStep, resendTimer]);

  const triggerLoginSuccess = (userName: string, userEmail: string) => {
    setLoading(true);
    setError('');
    setSuccessMsg(`Welcome back, ${userName}! Signing in...`);

    setTimeout(() => {
      onSuccess({
        name: userName,
        email: userEmail,
        avatar: (userName[0] || 'U').toUpperCase(),
      });
    }, 600);
  };

  const handleOpenGoogle = () => {
    setError('');
    setSocialError('');

    const cleanEmail = email.trim();
    if (cleanEmail && cleanEmail.includes('@')) {
      const userName = name.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      triggerLoginSuccess(userName, cleanEmail);
      return;
    }

    setCustomEmailMode(false);
    setSocialEmail('');
    setSocialName('');
    setShowGoogleModal(true);
  };

  const handleOpenApple = () => {
    setError('');
    setSocialError('');

    const cleanEmail = email.trim();
    if (cleanEmail && cleanEmail.includes('@')) {
      const userName = name.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      triggerLoginSuccess(userName, cleanEmail);
      return;
    }

    setCustomEmailMode(false);
    setSocialEmail('');
    setSocialName('');
    setShowAppleModal(true);
  };

  const handleSelectGoogleAccount = (userEmail: string, userName: string) => {
    setShowGoogleModal(false);
    triggerLoginSuccess(userName, userEmail);
  };

  const handleConfirmGoogleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setSocialError('');

    const cleanEmail = socialEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setSocialError('Please enter a valid Google / Gmail address.');
      return;
    }

    const userName = socialName.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    setShowGoogleModal(false);
    triggerLoginSuccess(userName, cleanEmail);
  };

  const handleConfirmAppleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setSocialError('');

    const cleanEmail = socialEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setSocialError('Please enter a valid Apple ID email address.');
      return;
    }

    const userName = socialName.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    setShowAppleModal(false);
    triggerLoginSuccess(userName, cleanEmail);
  };

  const validateEmailFormat = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();

    // 1. Email Format Validation
    if (!cleanEmail || !validateEmailFormat(cleanEmail)) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    // 2. Password Length Validation
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // 3. Sign Up Validation
    if (authMode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      // Check if email already registered
      if (INITIAL_REGISTERED_USERS.includes(cleanEmail)) {
        setError('An account with this email address already exists. Please Sign In instead.');
        return;
      }

      // Trigger Email Verification OTP step for new Sign Up
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomCode);
      setVerificationStep(true);
      setResendTimer(30);
      return;
    }

    // Sign In Execution
    const userName = cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    triggerLoginSuccess(userName, cleanEmail);
  };

  // OTP Verification Handler
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');

    if (entered.length < 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    if (entered !== generatedOtp) {
      setError('Invalid verification code. Please check your email and try again.');
      return;
    }

    const userName = name.trim() || email.split('@')[0];
    setVerificationStep(false);
    triggerLoginSuccess(userName, email.trim());
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otpCode];
    newOtp[index] = val;
    setOtpCode(newOtp);

    // Auto advance focus
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !validateEmailFormat(forgotEmail)) {
      setError('Please enter a valid account email address.');
      return;
    }
    setError('');
    setForgotSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
      {/* ── MAIN MINIMAL AUTH CARD CONTAINER ── */}
      <div className="relative w-full max-w-md rounded-3xl border border-stone-200/80 bg-white shadow-2xl shadow-purple-950/20 overflow-hidden animate-scale-in">
        
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <Icons.x className="h-4 w-4" />
        </button>

        {/* Modal Top Header Logo */}
        <div className="px-8 pt-8 pb-4 text-center border-b border-stone-100">
          <Logo showText={false} className="h-12 w-auto mx-auto mb-3" />
          
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {verificationStep
              ? 'Verify Email Address'
              : authMode === 'signin'
              ? 'Sign In'
              : 'Create Account'}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {verificationStep
              ? `We sent a 6-digit code to ${email}`
              : authMode === 'signin'
              ? 'Welcome back! Enter your details to access RailGo'
              : 'Sign up to start booking trains with 28 microservices'}
          </p>
        </div>

        {/* Card Body */}
        <div className="px-8 py-6 max-h-[75vh] overflow-y-auto">
          
          {/* ── 1. EMAIL VERIFICATION OTP STEP ── */}
          {verificationStep ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="rounded-2xl bg-purple-50 border border-purple-200 p-4 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Verification Code</span>
                <p className="text-xl font-mono font-black text-purple-900 mt-0.5 tracking-widest">{generatedOtp}</p>
                <p className="text-[10px] text-purple-600 mt-1">Simulated email OTP for instant testing</p>
              </div>

              {/* 6 Digit Inputs */}
              <div>
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2 text-center">
                  Enter 6-Digit Code
                </label>
                <div className="flex items-center justify-between gap-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="h-12 w-11 rounded-xl border border-stone-300 text-center font-mono font-bold text-lg text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-700 animate-fade-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-700 py-3.5 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Verify & Create Account</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={() => {
                    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(newCode);
                    setResendTimer(30);
                    setError('');
                  }}
                  className={`text-xs font-bold ${
                    resendTimer > 0 ? 'text-stone-400 cursor-not-allowed' : 'text-purple-600 hover:underline'
                  }`}
                >
                  {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : 'Resend Verification Code'}
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* ── 2. OAUTH SOCIAL BUTTONS ── */}
              <div className="space-y-2.5 mb-5">
                <button
                  type="button"
                  onClick={handleOpenGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white py-3 px-4 text-xs font-bold text-stone-700 hover:border-purple-300 hover:bg-stone-50 transition-all shadow-sm active:scale-[0.99]"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenApple}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl border border-stone-200 bg-white py-3 px-4 text-xs font-bold text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all shadow-sm active:scale-[0.99]"
                >
                  <AppleIcon />
                  <span>Continue with Apple</span>
                </button>
              </div>

              {/* ── 3. OR CONTINUE WITH EMAIL DIVIDER ── */}
              <div className="relative flex items-center justify-center mb-5">
                <div className="w-full border-t border-stone-200" />
                <span className="absolute bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>

              {/* ── 4. EMAIL FORM ── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name (Sign Up only) */}
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="auth-fullname" className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input
                      id="auth-fullname"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amit Kumar"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label htmlFor="auth-email" className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    id="auth-email"
                    ref={emailInputRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email (e.g. name@domain.com)"
                    className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="auth-password" className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                      Password
                    </label>
                    {authMode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email);
                          setShowForgotPassword(true);
                        }}
                        className="text-[11px] font-bold text-purple-600 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="auth-password"
                      type={showPass ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-semibold"
                    >
                      {showPass ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Sign Up only) */}
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="auth-confirmpass" className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="auth-confirmpass"
                      type={showPass ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                  </div>
                )}

                {/* Remember Me Checkbox */}
                {authMode === 'signin' && (
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 accent-purple-600 rounded"
                    />
                    <span className="text-xs text-stone-600 font-semibold">Remember Me</span>
                  </label>
                )}

                {/* Validation Errors & Alerts */}
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

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-violet-700 py-3.5 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>

              {/* Mode Switcher Link */}
              <div className="mt-5 text-center text-xs font-medium text-stone-500 border-t border-stone-100 pt-4">
                {authMode === 'signin' ? (
                  <span>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signup'); setError(''); }}
                      className="font-bold text-purple-600 hover:underline"
                    >
                      Sign Up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signin'); setError(''); }}
                      className="font-bold text-purple-600 hover:underline"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Security Badge */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-center text-[10px] text-stone-400 font-medium">
          256-bit SSL Encrypted • Official IRCTC Partner OAuth Security
        </div>
      </div>

      {/* ── FORGOT PASSWORD MODAL ── */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 animate-scale-in">
            <button
              onClick={() => { setShowForgotPassword(false); setForgotSent(false); }}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:text-stone-700"
            >
              <Icons.x className="h-4 w-4" />
            </button>

            <div className="text-center mb-4">
              <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-purple-100 text-purple-700">
                <Icons.shieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Reset Password</h3>
              <p className="text-xs text-stone-500 mt-1">Enter your account email to receive a password reset link</p>
            </div>

            {forgotSent ? (
              <div className="space-y-4 text-center py-2">
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800">
                  Password reset link sent to <span className="font-bold">{forgotEmail}</span>. Please check your inbox.
                </div>
                <button
                  type="button"
                  onClick={() => { setShowForgotPassword(false); setForgotSent(false); }}
                  className="w-full rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-purple-700 transition-all"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Account Email Address</label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-semibold text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 py-3 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── GOOGLE ACCOUNT CHOOSER OVERLAY ── */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 animate-scale-in">
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:text-stone-700"
            >
              <Icons.x className="h-4 w-4" />
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto mb-2 grid h-10 w-10 place-items-center"><GoogleIcon /></div>
              <h3 className="font-bold text-base text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Choose an account</h3>
              <p className="text-xs text-stone-500 mt-1">to continue to <span className="font-bold text-purple-700">RailGo Express</span></p>
            </div>

            {!customEmailMode ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleSelectGoogleAccount('user@gmail.com', 'Google User')}
                  className="w-full flex items-center gap-3.5 rounded-2xl border border-stone-200 p-3.5 text-left hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-600 text-white font-bold text-sm shadow-sm">
                    G
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate">Google User</p>
                    <p className="text-[11px] text-stone-500 truncate">Sign in with Google Account</p>
                  </div>
                  <Icons.arrowRight className="h-4 w-4 text-stone-400 group-hover:text-purple-600 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => setCustomEmailMode(true)}
                  className="w-full flex items-center gap-3.5 rounded-2xl border border-dashed border-purple-200 p-3.5 text-left hover:border-purple-400 hover:bg-purple-50/60 transition-all text-xs font-bold text-purple-700"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-100 text-purple-700">
                    +
                  </div>
                  <span>Use another Google / Gmail email address</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmGoogleAuth} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Google Email Address</label>
                  <input
                    type="email"
                    required
                    value={socialEmail}
                    onChange={(e) => setSocialEmail(e.target.value)}
                    placeholder="enter your gmail (e.g. name@gmail.com)"
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-semibold text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Full Name (Optional)</label>
                  <input
                    type="text"
                    value={socialName}
                    onChange={(e) => setSocialName(e.target.value)}
                    placeholder="Your Name"
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>

                {socialError && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs font-semibold text-red-700">
                    {socialError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 py-3 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── APPLE ID ACCOUNT CHOOSER OVERLAY ── */}
      {showAppleModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 animate-scale-in">
            <button
              onClick={() => setShowAppleModal(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:text-stone-700"
            >
              <Icons.x className="h-4 w-4" />
            </button>

            <div className="text-center mb-5">
              <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-stone-900 text-white">
                <AppleIcon />
              </div>
              <h3 className="font-bold text-base text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Sign in with Apple ID</h3>
              <p className="text-xs text-stone-500 mt-1">to continue to <span className="font-bold text-stone-900">RailGo Express</span></p>
            </div>

            {!customEmailMode ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleSelectGoogleAccount('user@icloud.com', 'Apple User')}
                  className="w-full flex items-center gap-3.5 rounded-2xl border border-stone-200 p-3.5 text-left hover:border-stone-400 hover:bg-stone-50 transition-all group"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-stone-900 text-white font-bold text-sm shadow-sm">
                    <AppleIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-900 truncate">Apple ID User</p>
                    <p className="text-[11px] text-stone-500 truncate">Sign in with Apple Account</p>
                  </div>
                  <Icons.arrowRight className="h-4 w-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => setCustomEmailMode(true)}
                  className="w-full flex items-center gap-3.5 rounded-2xl border border-dashed border-stone-300 p-3.5 text-left hover:border-stone-600 hover:bg-stone-50 transition-all text-xs font-bold text-stone-900"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-900 font-bold">
                    +
                  </div>
                  <span>Use another Apple ID email address</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmAppleAuth} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Apple ID Email Address</label>
                  <input
                    type="email"
                    required
                    value={socialEmail}
                    onChange={(e) => setSocialEmail(e.target.value)}
                    placeholder="enter your icloud (e.g. name@icloud.com)"
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-semibold text-stone-900 outline-none focus:border-stone-900 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Full Name (Optional)</label>
                  <input
                    type="text"
                    value={socialName}
                    onChange={(e) => setSocialName(e.target.value)}
                    placeholder="Your Name"
                    className="mt-1 w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-medium text-stone-900 outline-none focus:border-stone-900 transition-all"
                  />
                </div>

                {socialError && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs font-semibold text-red-700">
                    {socialError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-md hover:bg-stone-800 transition-all"
                >
                  <AppleIcon />
                  <span>Continue with Apple ID</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
