'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';

const TRAIN_BG_IMAGES = [
  'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1515165562839-978402923d5c?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1558694440-03aed0a29482?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=2000&q=80',
];

interface LandingPageProps {
  onLogin: () => void;
}

const SPECIAL_TRAINS = [
  {
    name: 'Vande Bharat Express',
    code: '20901',
    speed: '160 km/h',
    badge: 'High Speed Chair Car',
    desc: 'India’s fastest semi-high-speed train with 180° swivel seats, executive lounge access, automatic plug doors, and panoramic windows.',
    routes: 'Mumbai Central ↔ Ahmedabad • Delhi ↔ Varanasi • Jaipur ↔ Delhi',
    classTypes: 'Executive Chair (EC) • AC Chair Car (CC)',
  },
  {
    name: 'Tejas Premium Express',
    code: '82901',
    speed: '140 km/h',
    badge: 'IRCTC Luxury',
    desc: 'Premium corporate express featuring onboard infotainment screens, complimentary meals, travel insurance, and door-to-door luggage service.',
    routes: 'Mumbai ↔ Ahmedabad • Lucknow ↔ New Delhi',
    classTypes: 'Executive Chair (EC) • AC Chair Car (CC)',
  },
  {
    name: 'Premier Rajdhani Express',
    code: '12951',
    speed: '130 km/h',
    badge: 'Overnight Sleeper',
    desc: 'Connecting national capitals with priority signaling, complimentary hot gourmet meals, fresh linen, and first-class AC sleeper cabins.',
    routes: 'Mumbai ↔ New Delhi • Howrah ↔ New Delhi • Bangalore ↔ New Delhi',
    classTypes: 'First AC (1A) • 2 Tier AC (2A) • 3 Tier AC (3A)',
  },
  {
    name: 'Shatabdi Day Express',
    code: '12007',
    speed: '130 km/h',
    badge: 'Inter-City Speed',
    desc: 'Same-day return inter-city express offering fast transit, breakfast/dinner service, and ergonomic air-conditioned seating.',
    routes: 'Chennai ↔ Mysore • Kalka ↔ New Delhi • Bhopal ↔ New Delhi',
    classTypes: 'Executive Chair (EC) • AC Chair Car (CC)',
  },
  {
    name: 'Deccan Queen Historic',
    code: '12123',
    speed: '110 km/h',
    badge: 'Iconic Heritage',
    desc: 'Legendary express running between Mumbai and Pune featuring a unique dining car, vestibuled coaches, and heritage prestige.',
    routes: 'Mumbai CSMT ↔ Pune Junction',
    classTypes: 'AC Chair Car (CC) • Second Sitting (2S)',
  },
];

const PLATFORM_FEATURES = [
  {
    title: '1-Click Tatkal Booking',
    tag: 'Speed',
    desc: 'Pre-save passenger details and payment credentials to secure Tatkal berths within 2 seconds of quota opening at 10 AM & 11 AM.',
  },
  {
    title: 'Interactive Seat & Berth Map',
    tag: 'Selection',
    desc: 'Choose exact lower, middle, upper, or side berths visually using our 3D interactive coach seat layout before making payment.',
  },
  {
    title: 'Live GPS Train Tracking',
    tag: 'Real-Time',
    desc: 'Track live train location, exact delay minutes, platform number announcements, and upcoming station ETAs powered by direct IRCTC feeds.',
  },
  {
    title: 'On-Seat Hot E-Catering',
    tag: 'Food',
    desc: 'Order fresh hygienic meals from Domino’s, Haldiram’s, Behrouz Biryani, and Jain food vendors delivered directly to your train berth.',
  },
  {
    title: 'Instant 100% Refund Assurance',
    tag: 'Refunds',
    desc: 'Zero-cancellation-fee option returns 100% of ticket fare instantly to your source bank account within 3 to 5 business days.',
  },
  {
    title: 'RailAI Travel Assistant',
    tag: 'AI Support',
    desc: 'AI-driven confirmation probability calculator, optimal route finder, price predictions, and 24/7 automated passenger support.',
  },
];

const STATS = [
  { value: '10M+', label: 'Tickets Booked' },
  { value: '8,000+', label: 'Trains Covered' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '28', label: 'Microservices Mesh' },
  { value: '<2s', label: 'Avg Booking Time' },
  { value: '₹0', label: 'Hidden Charges' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Mumbai', text: 'The live tracking feature is incredible! Knew exactly where my train was before reaching the station. Booked 3 tickets last month — all seamless.', initials: 'PS' },
  { name: 'Rahul Verma', city: 'Delhi', text: 'Cancelled a trip and got my refund within 3 days. The UI is so clean and fast compared to the original IRCTC site.', initials: 'RV' },
  { name: 'Ananya Krishnan', city: 'Bangalore', text: 'The AI assistant helped me find the best route from Bangalore to Chennai with optimal pricing. Saved ₹400!', initials: 'AK' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Search Route & Date', desc: 'Enter origin, destination, departure date, and filter by travel class or quota (General, Tatkal, Ladies).' },
  { step: '02', title: 'Select Berth & Passenger', desc: 'View live seat availability, select preferred berths on the interactive map, and add passenger details.' },
  { step: '03', title: 'Instant Confirmation', desc: 'Pay securely via UPI, Card, Net Banking, or Wallet and instantly receive your IRCTC E-Ticket with PNR.' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [activePanelTab, setActivePanelTab] = useState<'trains' | 'features'>('trains');
  const [selectedTrainIndex, setSelectedTrainIndex] = useState(0);

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % TRAIN_BG_IMAGES.length);
    }, 2000); // 2 SECONDS AUTOMATIC DELAY!

    return () => clearInterval(timer);
  }, []);

  const currentTrain = SPECIAL_TRAINS[selectedTrainIndex];

  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-purple-600 selection:text-white">

      {/* ── Sticky Navigation Header ── */}
      <header className="sticky top-0 z-50 border-b border-purple-800/40 bg-gradient-to-r from-purple-950 via-slate-950 to-purple-950 text-white shadow-xl shadow-purple-950/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="cursor-pointer">
            <Logo className="h-10 w-auto" />
          </div>

          <nav className="hidden items-center gap-2 md:flex text-xs font-bold text-purple-100">
            <a href="#special-panel" className="px-3.5 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-all">Special Trains</a>
            <a href="#features" className="px-3.5 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-all">Features</a>
            <a href="#how-it-works" className="px-3.5 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-all">How It Works</a>
            <a href="#reviews" className="px-3.5 py-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-all">Reviews</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="text-xs font-bold text-purple-200 hover:text-white px-4 py-2 rounded-xl border border-purple-700/50 hover:bg-white/10 transition-all"
            >
              Log in
            </button>
            <button
              onClick={onLogin}
              className="rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden px-4 pt-12 pb-14 sm:px-6 lg:px-8">
        {/* 10 Automated Background Images Slideshow Carousel (2s Delay) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {TRAIN_BG_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                bgIndex === idx ? 'opacity-30 scale-105 transition-all duration-1000' : 'opacity-0 scale-100'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/90 via-white/80 to-purple-50/95 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="section-pill mb-3 normal-case font-medium text-[11px]">
            AI-Powered Indian Railways Microservices Platform
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-3 text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Train Tickets <span className="gradient-text">Smarter. Faster.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
            Official 28 microservices booking engine with real-time seat availability, live GPS train tracking, Tatkal quota & 100% instant refunds.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button onClick={onLogin} className="btn-brand text-xs px-6 py-3 rounded-xl sm:w-auto w-full justify-center shadow-md">
              Book Tickets Now
            </button>
            <button onClick={onLogin} className="rounded-xl border border-purple-200 bg-white px-6 py-3 text-xs font-bold text-purple-700 hover:bg-purple-50 transition-all sm:w-auto w-full justify-center">
              Check Live Train Status
            </button>
          </div>

          {/* Email Quick CTA */}
          <div className="mx-auto mt-7 flex max-w-md items-center gap-2 rounded-2xl border border-purple-200 bg-white p-1.5 shadow-md shadow-purple-200/30">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for instant booking"
              className="flex-1 bg-transparent px-3 py-2 text-xs font-medium outline-none text-stone-800 placeholder:text-stone-400"
            />
            <button onClick={onLogin} className="btn-brand px-4 py-2 text-xs rounded-xl">
              Start Free
            </button>
          </div>
          <p className="mt-2 text-[10px] text-stone-400 font-medium">No credit card required • Instant IRCTC confirmation</p>
        </div>
      </section>

      {/* ── BAR PANEL: SPECIAL TRAINS & TICKET BOOKING FEATURES ── */}
      <section id="special-panel" className="px-4 py-8 sm:px-6 lg:px-8 bg-purple-50/40 border-y border-purple-100">
        <div className="mx-auto max-w-7xl">
          {/* Panel Header Switcher */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600">Featured Showcase</span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Special Trains & Premier Features Bar Panel
              </h2>
            </div>
            <div className="flex rounded-xl bg-white p-1 border border-purple-200 shadow-sm">
              <button
                onClick={() => setActivePanelTab('trains')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                  activePanelTab === 'trains'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-purple-700'
                }`}
              >
                Special Trains Showcase
              </button>
              <button
                onClick={() => setActivePanelTab('features')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                  activePanelTab === 'features'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-purple-700'
                }`}
              >
                Booking Features
              </button>
            </div>
          </div>

          {/* TAB CONTENT 1: SPECIAL TRAINS */}
          {activePanelTab === 'trains' && (
            <div className="grid gap-6 lg:grid-cols-12 items-stretch">
              {/* Train Selector Ticker List */}
              <div className="lg:col-span-5 space-y-2.5">
                {SPECIAL_TRAINS.map((train, idx) => (
                  <button
                    key={train.code}
                    onClick={() => setSelectedTrainIndex(idx)}
                    className={`w-full text-left rounded-2xl border p-3.5 transition-all flex items-center justify-between ${
                      selectedTrainIndex === idx
                        ? 'border-purple-400 bg-white shadow-md shadow-purple-200/50 text-stone-900'
                        : 'border-purple-100 bg-white/70 hover:border-purple-200 text-stone-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{train.name}</span>
                        <span className="rounded-md bg-purple-50 px-1.5 py-0.5 text-[9px] font-bold text-purple-700 border border-purple-200">
                          #{train.code}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-1">{train.routes}</p>
                    </div>
                    <span className="rounded-full bg-purple-100/80 px-2 py-0.5 text-[9px] font-extrabold text-purple-800">
                      {train.speed}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Special Train Detailed Card */}
              <div className="lg:col-span-7 rounded-3xl border border-purple-200 bg-white p-6 shadow-lg shadow-purple-200/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
                      {currentTrain.badge}
                    </span>
                    <span className="text-xs font-extrabold text-purple-900">
                      Max Speed: {currentTrain.speed}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {currentTrain.name} (#{currentTrain.code})
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {currentTrain.desc}
                  </p>

                  <div className="space-y-2 text-xs border-t border-purple-50 pt-3">
                    <div>
                      <span className="font-bold text-stone-700">Key Routes: </span>
                      <span className="text-purple-700 font-semibold">{currentTrain.routes}</span>
                    </div>
                    <div>
                      <span className="font-bold text-stone-700">Available Classes: </span>
                      <span className="text-stone-600">{currentTrain.classTypes}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-purple-50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Live Seat Availability & IRCTC Tatkal Supported
                  </span>
                  <button onClick={onLogin} className="btn-brand text-xs px-5 py-2 rounded-xl">
                    Book {currentTrain.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: BOOKING FEATURES */}
          {activePanelTab === 'features' && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PLATFORM_FEATURES.map((feat, idx) => (
                <div key={idx} className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-900">{feat.title}</span>
                    <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[9px] font-bold text-purple-700 border border-purple-200">
                      {feat.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Microservices Stats Bar ── */}
      <section className="border-b border-purple-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-purple-100 px-4 py-8 sm:px-6">
          {STATS.map((s, i) => (
            <div key={i} className="px-3 text-center">
              <p className="text-xl font-bold text-purple-950" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
              <p className="mt-0.5 text-[10px] font-bold text-purple-700/80 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform Infrastructure Details Grid ── */}
      <section id="features" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="section-pill mb-2 normal-case font-medium text-[11px]">
              Platform Architecture & Guarantees
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Engineered for High-Concurrency <span className="gradient-text">Rail Travel</span>
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-xs text-stone-500">
              Built with 28 decoupled microservices for instant search, zero-latency seat locks, and instant bank settlements.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'High-Speed Tatkal Engine',
                desc: 'Optimized queue processor capable of executing 50,000 concurrent ticket transactions per minute during peak Tatkal hours.',
              },
              {
                title: 'Live GPS Train Feed',
                desc: 'Real-time telemetry feeds connected directly to train locators for precise delay analysis, speed tracking, and platform numbers.',
              },
              {
                title: 'Automated Refund Service',
                desc: 'Smart refund microservice that automatically initiates source payment reversals upon ticket cancellation without manual claims.',
              },
              {
                title: 'RailAI Recommendation Mesh',
                desc: 'Machine learning algorithms predicting PNR waitlist confirmation probabilities and optimal route combinations.',
              },
              {
                title: 'Station Amenities Explorer',
                desc: 'Detailed database of station facilities, platform maps, waiting room availability, and on-station food outlets.',
              },
              {
                title: 'Bank-Grade Payment Security',
                desc: '256-bit SSL encrypted checkout supporting UPI (GPay, PhonePe), credit/debit cards, net banking, and RailWallet.',
              },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all">
                <h3 className="mb-1.5 text-sm font-bold text-stone-900">{f.title}</h3>
                <p className="text-xs leading-relaxed text-stone-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Step-by-Step How It Works ── */}
      <section id="how-it-works" className="px-4 py-16 sm:px-6 bg-purple-50/30 border-y border-purple-100">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <div className="section-pill mb-2 normal-case font-medium text-[11px]">
              Simple Booking Process
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Book your ticket in <span className="gradient-text">3 easy steps</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={i} className="rounded-2xl border border-purple-100 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl text-sm font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  {step}
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-stone-900">{title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button onClick={onLogin} className="btn-brand text-xs px-8 py-3 rounded-xl">
              Start Booking Now
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials & Reviews ── */}
      <section id="reviews" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="section-pill mb-2 normal-case font-medium text-[11px]">
              Passenger Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Trusted by <span className="gradient-text">millions of daily travelers</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map(({ name, city, text, initials }, i) => (
              <div key={i} className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                <p className="mb-4 text-xs leading-relaxed text-stone-600">"{text}"</p>
                <div className="flex items-center gap-2.5 pt-3 border-t border-purple-50">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-purple-600 text-white font-bold text-xs shadow-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 leading-none">{name}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5 leading-none">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/30 p-8 text-center shadow-lg shadow-purple-200/40">
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-purple-700 border border-purple-200 mb-3 inline-block">
            10 Million+ Tickets Booked
          </span>
          <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to experience faster train booking?
          </h2>
          <p className="mb-6 text-xs text-stone-500 max-w-md mx-auto">
            Create your account in under 30 seconds and book your next journey with zero hassle.
          </p>
          <button onClick={onLogin} className="btn-brand text-xs px-8 py-3 rounded-xl">
            Create Free Account
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-purple-100 bg-purple-50/40 px-4 py-8">
        <div className="mx-auto flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left max-w-7xl">
          <div>
            <p className="font-bold text-xs text-stone-700">RailGo © 2026 — Official IRCTC Express Partner</p>
            <p className="text-[10px] text-stone-400 mt-0.5">Powered by 28 decoupled microservices • 99.99% Uptime SLA</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-stone-500">
            <button onClick={onLogin} className="hover:text-purple-600 transition-colors">Sign In</button>
            <span className="text-stone-300">•</span>
            <button onClick={onLogin} className="hover:text-purple-600 transition-colors">Book Tickets</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
