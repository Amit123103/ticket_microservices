'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" style={{ background: 'rgba(28,25,23,0.4)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full max-w-md rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-300/30 animate-scale-in overflow-hidden">

        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-4 rounded-xl p-2 transition-colors text-stone-400 hover:text-stone-700 hover:bg-stone-100">
          <Icons.x className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25">
            <Icons.train className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {view === 'choose' ? 'Welcome to RailGo' : (isSignUp ? 'Create Account' : 'Sign In')}
          </h2>
          <p className="text-sm text-stone-500">
            {view === 'choose' ? 'Choose how you\'d like to continue' : (isSignUp ? 'Start booking in seconds' : 'Good to see you again')}
          </p>
        </div>

        <div className="px-8 pb-8">
          {view === 'choose' ? (
            <div className="space-y-3">
              {/* Google */}
              <button onClick={handleGoogle} disabled={loading} className="group flex w-full items-center gap-4 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all border border-stone-200 hover:border-orange-300 hover:shadow-sm">
                {loading ? <Icons.arrowRight className="h-5 w-5 animate-spin mx-auto text-orange-500" /> : (
                  <>
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200"><GoogleIcon /></div>
                    <span className="text-stone-700">Continue with Google</span>
                    <Icons.arrowRight className="h-4 w-4 ml-auto text-stone-400 group-hover:text-orange-500 transition-colors" />
                  </>
                )}
              </button>

              {/* Apple */}
              <button onClick={handleApple} disabled={loading} className="flex w-full items-center gap-4 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all border border-stone-200 hover:border-stone-300 hover:shadow-sm">
                <div className="grid h-9 w-9 place-items-center rounded-lg border border-stone-200 text-stone-700"><AppleIcon /></div>
                <span className="text-stone-700">Continue with Apple</span>
                <Icons.arrowRight className="h-4 w-4 ml-auto text-stone-400" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-3">
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-xs font-semibold text-stone-400">or</span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>

              {/* Email */}
              <button onClick={() => setView('email')} className="flex w-full items-center gap-4 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-orange-100 text-orange-600">
                  <Icons.mail className="h-4 w-4" />
                </div>
                <span>Continue with Email</span>
                <Icons.arrowRight className="h-4 w-4 ml-auto" />
              </button>

              <p className="text-center text-xs pt-2 text-stone-400">
                By continuing, you agree to our <span className="cursor-pointer text-orange-600 font-medium">Terms</span> & <span className="cursor-pointer text-orange-600 font-medium">Privacy Policy</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {/* Name (sign up only) */}
              {isSignUp && (
                <div>
                  <label className="field-label">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Amit Kumar" className="field-control mt-1" />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="field-label">Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="field-control mt-1" />
              </div>

              {/* Password */}
              <div>
                <label className="field-label">Password</label>
                <div className="relative mt-1">
                  <input value={password} onChange={e => setPassword(e.target.value)}
                    type={showPass ? 'text' : 'password'} placeholder="••••••••" className="field-control pr-10" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                    {showPass ? <Icons.x className="h-4 w-4" /> : <Icons.arrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-semibold text-orange-600 hover:text-orange-700">Forgot password?</button>
                </div>
              )}

              {error && (
                <div className="rounded-xl px-4 py-3 text-sm font-semibold bg-red-50 border border-red-200 text-red-700">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-brand w-full py-3.5 justify-center">
                {loading ? <Icons.arrowRight className="h-5 w-5 animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-stone-200" />
                <button type="button" onClick={() => { setView('choose'); setError(''); }} className="text-xs font-semibold text-stone-400 hover:text-stone-600">Back</button>
                <div className="flex-1 h-px bg-stone-200" />
              </div>

              <p className="text-center text-sm text-stone-500">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="font-bold text-orange-600 hover:text-orange-700">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Security badge */}
        <div className="px-8 pb-6 flex items-center justify-center gap-2 text-xs text-stone-400">
          <Icons.shield className="h-3.5 w-3.5 text-indigo-500" />
          <span>256-bit SSL encryption • Your data is safe</span>
        </div>
      </div>
    </div>
  );
};
