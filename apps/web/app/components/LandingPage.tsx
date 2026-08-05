'use client';
import React, { useState } from 'react';
import {
  Train, Zap, Shield, MapPin, Clock, Star, Users, Ticket,
  ArrowRight, ChevronRight, Radio, CreditCard, RefreshCw,
  CheckCircle2, Sparkles, Globe, Activity, Bot
} from 'lucide-react';

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
  { icon: Zap, title: 'Instant Booking', desc: 'Book tickets in under 2 seconds with our streamlined checkout. Tatkal, General, Ladies quota — all supported.', color: 'from-orange-500 to-amber-500' },
  { icon: Radio, title: 'Live GPS Tracking', desc: 'Real-time train location, platform info, delay updates and ETA — powered by Indian Railways live feed.', color: 'from-purple-500 to-indigo-600' },
  { icon: RefreshCw, title: 'Instant Refunds', desc: 'Cancel anytime. Refunds processed in 3-5 business days directly to your payment source.', color: 'from-orange-600 to-purple-600' },
  { icon: Bot, title: 'RailAI Assistant', desc: 'AI-powered travel recommendations, best routes, price predictions and 24/7 chat support.', color: 'from-amber-500 to-purple-500' },
  { icon: MapPin, title: 'Station Explorer', desc: 'Browse amenities, platform maps, food options and facilities for 500+ Indian Railway stations.', color: 'from-purple-600 to-pink-500' },
  { icon: Shield, title: 'Secure Payments', desc: 'UPI, cards, net banking & wallets — all protected with bank-grade encryption and fraud detection.', color: 'from-orange-500 to-purple-600' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'The live tracking feature is incredible! Knew exactly where my train was before reaching the station. Booked 3 tickets last month — all seamless.' },
  { name: 'Rahul Verma', city: 'Delhi', rating: 5, text: 'Cancelled a trip and got my refund within 3 days. The UI is so clean and fast compared to the original IRCTC site.' },
  { name: 'Ananya Krishnan', city: 'Bangalore', rating: 5, text: 'The AI assistant helped me find the best route from Bangalore to Chennai with optimal pricing. Saved ₹400!' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Search Trains', desc: 'Enter source, destination & date. Filter by class, quota and availability.' },
  { step: '02', title: 'Choose Seats', desc: 'View the interactive seat map and pick your preferred berth or seat.' },
  { step: '03', title: 'Pay & Confirm', desc: 'Pay via UPI, card or wallet. Instant e-ticket on your email and app.' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ background: '#ffffff' }}>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 glass border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-orange-500 to-purple-600 text-white shadow-lg" style={{ boxShadow: '0 4px 16px rgba(249,115,22,0.35)' }}>
              <Train className="h-5 w-5" />
            </div>
            <div>
              <span className="font-outfit text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>RailGo</span>
              <span className="ml-2 badge-brand text-[10px]">28 MESH</span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {['Features', 'How it works', 'Reviews'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-semibold transition" style={{ color: '#94a3b8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f8fafc')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="btn-ghost text-sm px-4 py-2">Log in</button>
            <button onClick={onLogin} className="btn-brand text-sm px-5 py-2">Get Started <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero-mesh relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ background: '#f97316' }} />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full opacity-25 blur-3xl" style={{ background: '#a855f7' }} />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="section-pill mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" /> AI-Powered Train Booking Platform
          </div>

          <h1 className="animate-fade-in-up mb-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Trains
            <br />
            <span className="gradient-text">Smarter. Faster.</span>
            <br />
            In Seconds.
          </h1>

          <p className="animate-fade-in-up delay-100 mx-auto mb-10 max-w-2xl text-lg text-slate-600">
            India's most advanced train booking platform — powered by 28 microservices.
            Real-time availability, live GPS tracking, instant refunds and AI assistance.
          </p>

          <div className="animate-fade-in-up delay-200 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button onClick={onLogin} className="btn-brand text-base px-8 py-4 sm:w-auto w-full">
              <Ticket className="h-5 w-5" /> Book Tickets Now
            </button>
            <button onClick={onLogin} className="btn-ghost text-base px-8 py-4 sm:w-auto w-full">
              <Radio className="h-5 w-5 text-purple-600" /> Check Live Status
            </button>
          </div>

          {/* Quick email CTA */}
          <div className="animate-fade-in-up delay-300 mx-auto mt-10 flex max-w-md items-center gap-2 rounded-md p-2 glass-light">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email to get started"
              className="flex-1 bg-transparent px-3 py-2 text-sm font-medium outline-none placeholder:text-slate-400"
              style={{ color: '#0f172a' }}
            />
            <button onClick={onLogin} className="btn-brand px-4 py-2 text-sm rounded-md">
              Start Free
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">No credit card required • Free forever for basic use</p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/10 px-4 py-8 sm:grid-cols-6">
          {STATS.map((s, i) => (
            <div key={i} className="px-4 text-center">
              <p className="text-2xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: i % 2 === 0 ? '#f97316' : '#c084fc' }}>{s.value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="section-pill mb-4">
              <Activity className="h-3.5 w-3.5 text-orange-400" /> Platform Features
            </div>
            <h2 className="text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Everything you need for<br /><span className="gradient-text">a perfect journey</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
              From booking to destination — we've got every step covered with cutting-edge technology.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className="card-dark group cursor-default rounded-md p-6 transition-all duration-200 hover:-translate-y-1 border-white/5"
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className={`mb-4 grid h-11 w-11 place-items-center rounded-md bg-gradient-to-br ${color} text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-4 py-24 sm:px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <div className="section-pill mb-4">
              <Zap className="h-3.5 w-3.5 text-orange-400" /> How It Works
            </div>
            <h2 className="text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Book in <span className="gradient-text">3 simple steps</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={i} className="relative text-center">
                {i < 2 && (
                  <div className="absolute left-full top-8 hidden w-full items-center sm:flex">
                    <ChevronRight className="h-5 w-5 mx-auto text-slate-600" />
                  </div>
                )}
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-md text-xl font-black" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(168,85,247,0.2))', border: '1px solid rgba(249,115,22,0.3)', fontFamily: 'Outfit, sans-serif', color: '#ff9a4d' }}>
                  {step}
                </div>
                <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button onClick={onLogin} className="btn-brand px-10 py-4 text-base">
              Start Booking Now <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="reviews" className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="section-pill mb-4">
              <Star className="h-3.5 w-3.5 text-amber-400" /> Testimonials
            </div>
            <h2 className="text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Loved by <span className="gradient-text">millions of travelers</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map(({ name, city, rating, text }, i) => (
              <div key={i} className="card-dark rounded-md p-6 border-white/5"
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-300">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #f97316, #9333ea)' }}>
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{name}</p>
                    <p className="text-xs text-slate-500">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-md p-12 text-center glass-brand border-orange-500/30">
          <div className="section-pill mb-6">
            <Globe className="h-3.5 w-3.5 text-orange-400" /> Join 10 Million+ travelers
          </div>
          <h2 className="mb-4 text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to travel smarter?
          </h2>
          <p className="mb-8 text-sm text-slate-300">
            Create your free account and book your first ticket in under 60 seconds.
          </p>
          <button onClick={onLogin} className="btn-brand px-12 py-4 text-base">
            <Ticket className="h-5 w-5" /> Create Free Account
          </button>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            {['IRCTC Authorized', 'Bank-grade Security', 'No Hidden Fees', 'Instant Refunds'].map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t px-4 py-10 text-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Train className="h-4 w-4 text-orange-500" />
          <span className="font-bold text-sm text-slate-300">RailGo © 2026 — IRCTC NextGen Platform</span>
        </div>
        <p className="text-xs text-slate-500">Powered by 28 microservices • 99.9% uptime SLA</p>
      </footer>
    </div>
  );
};
