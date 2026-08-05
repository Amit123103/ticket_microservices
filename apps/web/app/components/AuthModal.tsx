'use client';
import React, { useState } from 'react';
import { X, Mail, Eye, EyeOff, Train, Shield, Loader2 } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; avatar: string }) => void;
}

// Google SVG icon
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 6.294C4.672 4.167 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

// Apple SVG icon
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M14.94 12.98c-.28.62-.62 1.2-1.02 1.74-.54.7-1.08 1.05-1.62 1.06-.41 0-.9-.12-1.47-.36-.58-.24-1.12-.36-1.6-.36-.51 0-1.06.12-1.65.36-.58.24-1.06.37-1.43.38-.52.02-1.07-.34-1.64-1.07-.43-.55-.79-1.16-1.06-1.82A8.8 8.8 0 0 1 2 9.3c0-.97.21-1.81.63-2.51.33-.55.77-1 1.32-1.33.55-.33 1.15-.5 1.79-.51.44 0 1.02.14 1.73.41.71.27 1.17.41 1.36.41.15 0 .66-.16 1.51-.48.81-.3 1.5-.42 2.07-.38 1.53.12 2.68.72 3.44 1.8a4.16 4.16 0 0 0-2.02 3.77c.03 1.27.47 2.34 1.33 3.19zm-3.6-12.1c0 .99-.36 1.91-1.09 2.76-.88 1.01-1.93 1.6-3.08 1.51-.01-.12-.02-.24-.02-.37 0-.95.41-1.97 1.14-2.8.36-.42.82-.77 1.38-1.04.55-.27 1.07-.42 1.57-.44.01.13.1.26.1.38z"/>
  </svg>
);

type AuthView = 'choose' | 'email';

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [view, setView] = useState<AuthView>('choose');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mockLogin = (userName: string, userEmail: string) => {
    setLoading(true);
    setTimeout(() => {
      onSuccess({
        name: userName,
        email: userEmail,
        avatar: userName[0].toUpperCase(),
      });
    }, 1200);
  };

  const handleGoogle = () => mockLogin('Amit Kumar', 'amit.kumar@gmail.com');
  const handleApple  = () => mockLogin('Amit Kumar', 'amit@icloud.com');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) { setError('Enter a valid email.'); return; }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return; }
    if (isSignUp && !name.trim()) { setError('Enter your name.'); return; }
    mockLogin(isSignUp ? name.trim() : 'Demo User', email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
      <div className="relative w-full max-w-md rounded-md p-8 animate-fade-in-up border-orange-500/30" style={{ background: '#120e20', border: '1px solid rgba(249,115,22,0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>

        {/* Close */}
        <button onClick={onClose} className="absolute right-5 top-5 rounded-md p-2 transition" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#f8fafc')}
          onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-md bg-gradient-to-br from-orange-500 to-purple-600 text-white shadow-lg" style={{ boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>
            <Train className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {view === 'choose' ? 'Welcome to RailGo' : (isSignUp ? 'Create Account' : 'Sign In')}
          </h2>
          <p className="text-sm text-slate-400">
            {view === 'choose' ? 'Choose how you\'d like to continue' : (isSignUp ? 'Start booking in seconds' : 'Good to see you again')}
          </p>
        </div>

        {view === 'choose' ? (
          <div className="space-y-3">
            {/* Google */}
            <button onClick={handleGoogle} disabled={loading} className="group flex w-full items-center gap-4 rounded-md px-5 py-3.5 text-sm font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto text-orange-500" /> : (
                <>
                  <div className="grid h-9 w-9 place-items-center rounded-md" style={{ background: '#fff' }}><GoogleIcon /></div>
                  <span className="text-slate-200">Continue with Google</span>
                </>
              )}
            </button>

            {/* Apple */}
            <button onClick={handleApple} disabled={loading} className="flex w-full items-center gap-4 rounded-md px-5 py-3.5 text-sm font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
              <div className="grid h-9 w-9 place-items-center rounded-md" style={{ background: '#fff', color: '#000' }}><AppleIcon /></div>
              <span className="text-slate-200">Continue with Apple</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <span className="text-xs font-semibold text-slate-500">or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Email */}
            <button onClick={() => setView('email')} className="flex w-full items-center gap-4 rounded-md px-5 py-3.5 text-sm font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
              <div className="grid h-9 w-9 place-items-center rounded-md" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                <Mail className="h-4 w-4 text-orange-400" />
              </div>
              <span className="text-slate-200">Continue with Email</span>
            </button>

            <p className="text-center text-xs pt-2 text-slate-500">
              By continuing, you agree to our <span className="cursor-pointer text-orange-400">Terms</span> & <span className="cursor-pointer text-purple-400">Privacy Policy</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {/* Name (sign up only) */}
            {isSignUp && (
              <div>
                <label className="field-label">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Amit Kumar" className="input-dark mt-1" />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="field-label">Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="input-dark mt-1" />
            </div>

            {/* Password */}
            <div>
              <label className="field-label">Password</label>
              <div className="relative">
                <input value={password} onChange={e => setPassword(e.target.value)}
                  type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-dark mt-1 pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-semibold text-orange-400">Forgot password?</button>
              </div>
            )}

            {error && (
              <div className="rounded-md px-4 py-3 text-sm font-semibold" style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.25)', color: '#fb7185' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-brand w-full py-3.5">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <button type="button" onClick={() => { setView('choose'); setError(''); }} className="text-xs font-semibold text-slate-400">Back</button>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            </div>

            <p className="text-center text-sm text-slate-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="font-bold text-orange-400">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </form>
        )}

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Shield className="h-3.5 w-3.5 text-purple-400" />
          <span>256-bit SSL encryption • Your data is safe</span>
        </div>
      </div>
    </div>
  );
};
