'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';

interface LandingPageProps {
  onLogin: () => void;
}

const STATS = [
  { value: '10M+', label: 'Tickets Booked' },
  { value: '8,000+', label: 'Trains Covered' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '28', label: 'Microservices' },
  { value: '<2s', label: 'Booking Time' },
  { value: '₹0', label: 'Hidden Charges' },
];

const FEATURES = [
  { icon: 'zap', title: 'Instant Booking', desc: 'Book tickets in under 2 seconds with our streamlined checkout. Tatkal, General, Ladies quota — all supported.', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50' },
  { icon: 'live', title: 'Live GPS Tracking', desc: 'Real-time train location, platform info, delay updates and ETA — powered by Indian Railways live feed.', color: 'from-indigo-500 to-purple-600', bg: 'bg-purple-50' },
  { icon: 'refresh', title: 'Instant Refunds', desc: 'Cancel anytime. Refunds processed in 3-5 business days directly to your payment source.', color: 'from-purple-600 to-fuchsia-500', bg: 'bg-fuchsia-50' },
  { icon: 'bot', title: 'RailAI Assistant', desc: 'AI-powered travel recommendations, best routes, price predictions and 24/7 chat support.', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50' },
  { icon: 'mapPin', title: 'Station Explorer', desc: 'Browse amenities, platform maps, food options and facilities for 500+ Indian Railway stations.', color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50' },
  { icon: 'shield', title: 'Secure Payments', desc: 'UPI, cards, net banking & wallets — all protected with bank-grade encryption and fraud detection.', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'The live tracking feature is incredible! Knew exactly where my train was before reaching the station. Booked 3 tickets last month — all seamless.', initials: 'PS' },
  { name: 'Rahul Verma', city: 'Delhi', rating: 5, text: 'Cancelled a trip and got my refund within 3 days. The UI is so clean and fast compared to the original IRCTC site.', initials: 'RV' },
  { name: 'Ananya Krishnan', city: 'Bangalore', rating: 5, text: 'The AI assistant helped me find the best route from Bangalore to Chennai with optimal pricing. Saved ₹400!', initials: 'AK' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Search Trains', desc: 'Enter source, destination & date. Filter by class, quota and availability.' },
  { step: '02', title: 'Choose Seats', desc: 'View the interactive seat map and pick your preferred berth or seat.' },
  { step: '03', title: 'Pay & Confirm', desc: 'Pay via UPI, card or wallet. Instant e-ticket on your email and app.' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white text-stone-900">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-purple-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/20">
              <Icons.train className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>RailGo</span>
              <span className="ml-2 rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-600 border border-purple-200">28 MESH</span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {['Features', 'How it works', 'Reviews'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-semibold text-stone-500 hover:text-purple-600 transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="text-sm font-semibold text-stone-600 hover:text-purple-600 px-4 py-2.5 rounded-xl hover:bg-purple-50 transition-all">Log in</button>
            <button onClick={onLogin} className="btn-brand text-sm px-5 py-2.5">Get Started <Icons.arrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="section-pill mb-6 animate-fade-in-up">
            <Icons.sparkles className="h-3.5 w-3.5 text-purple-600" /> AI-Powered Train Booking Platform
          </div>

          <h1 className="animate-fade-in-up delay-100 mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Trains
            <br />
            <span className="gradient-text">Smarter. Faster.</span>
            <br />
            In Seconds.
          </h1>

          <p className="animate-fade-in-up delay-200 mx-auto mb-10 max-w-2xl text-lg text-purple-950/70 leading-relaxed">
            India's most advanced train booking platform — powered by 28 microservices.
            Real-time availability, live GPS tracking, instant refunds and AI assistance.
          </p>

          <div className="animate-fade-in-up delay-300 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button onClick={onLogin} className="btn-brand text-base px-8 py-4 sm:w-auto w-full justify-center">
              <Icons.ticket className="h-5 w-5" /> Book Tickets Now
            </button>
            <button onClick={onLogin} className="btn-ghost text-base px-8 py-4 sm:w-auto w-full justify-center">
              <Icons.live className="h-5 w-5 text-purple-600" /> Check Live Status
            </button>
          </div>

          {/* Quick email CTA */}
          <div className="animate-fade-in-up delay-400 mx-auto mt-10 flex max-w-md items-center gap-3 rounded-2xl border border-purple-200 bg-white p-2 shadow-lg shadow-purple-200/50">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email to get started"
              className="flex-1 bg-transparent px-3 py-2.5 text-sm font-medium outline-none placeholder:text-purple-300"
              style={{ color: '#1c1917' }}
            />
            <button onClick={onLogin} className="btn-brand px-5 py-2.5 text-sm rounded-xl">
              Start Free
            </button>
          </div>

          <p className="mt-3 text-xs text-purple-400">No credit card required • Free forever for basic use</p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-purple-100 bg-purple-50/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-purple-100 px-4 py-10 sm:px-6">
          {STATS.map((s, i) => (
            <div key={i} className="px-4 text-center">
              <p className="text-2xl font-bold text-purple-950" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
              <p className="mt-1 text-xs font-medium text-purple-700/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="section-pill mb-4">
              <Icons.activity className="h-3.5 w-3.5 text-purple-600" /> Platform Features
            </div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Everything you need for<br /><span className="gradient-text">a perfect journey</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-stone-500">
              From booking to destination — we've got every step covered with cutting-edge technology.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon, title, desc, color, bg }, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200/40">
                <div className={`mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                  <Icons.train className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                <p className="text-sm leading-relaxed text-stone-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-4 py-24 sm:px-6 bg-purple-50/30">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <div className="section-pill mb-4">
              <Icons.zap className="h-3.5 w-3.5 text-purple-600" /> How It Works
            </div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Book in <span className="gradient-text">3 simple steps</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={i} className="relative text-center">
                {i < 2 && (
                  <div className="hidden sm:block absolute left-[calc(50%+2rem)] top-10 w-[calc(100%-4rem)]">
                    <div className="h-0.5 w-full bg-gradient-to-r from-purple-200 to-purple-100 rounded-full" />
                  </div>
                )}
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl text-xl font-bold bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 text-purple-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button onClick={onLogin} className="btn-brand px-10 py-4 text-base">
              Start Booking Now <Icons.arrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="reviews" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="section-pill mb-4">
              <Icons.star className="h-3.5 w-3.5 text-purple-600 fill-purple-600" /> Testimonials
            </div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Loved by <span className="gradient-text">millions of travelers</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map(({ name, city, rating, text, initials }, i) => (
              <div key={i} className="rounded-2xl border border-purple-100 bg-white p-7 shadow-sm hover:shadow-lg hover:shadow-purple-200/40 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Icons.star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-stone-600">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-purple-50">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white font-bold text-sm shadow-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">{name}</p>
                    <p className="text-xs text-stone-400">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/40 p-12 text-center shadow-xl shadow-purple-200/40">
          <div className="section-pill mb-6 mx-auto w-fit">
            <Icons.globe className="h-3.5 w-3.5 text-purple-600" /> Join 10 Million+ travelers
          </div>
          <h2 className="mb-4 text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to travel smarter?
          </h2>
          <p className="mb-8 text-sm text-stone-500 max-w-md mx-auto">
            Create your free account and book your first ticket in under 60 seconds.
          </p>
          <button onClick={onLogin} className="btn-brand px-12 py-4 text-base">
            <Icons.ticket className="h-5 w-5" /> Create Free Account
          </button>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
            {['IRCTC Authorized', 'Bank-grade Security', 'No Hidden Fees', 'Instant Refunds'].map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <Icons.check className="h-3.5 w-3.5 text-emerald-500" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-purple-100 bg-purple-50/40 px-4 py-10">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left max-w-7xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icons.train className="h-5 w-5 text-purple-600" />
              <span className="font-bold text-sm text-stone-700">RailGo © 2026 — IRCTC NextGen Platform</span>
            </div>
            <p className="text-xs text-stone-400">Powered by 28 microservices • 99.9% uptime SLA</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-stone-500">
            <button onClick={onLogin} className="hover:text-purple-600 transition-colors">Get Started</button>
            <span className="text-stone-300">•</span>
            <span className="text-stone-400">Made with <Icons.heart className="h-3.5 w-3.5 text-purple-600 inline" /> for travelers</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
