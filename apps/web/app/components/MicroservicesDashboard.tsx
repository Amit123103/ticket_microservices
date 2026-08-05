'use client';
import React, { useState } from 'react';
import { Activity, CheckCircle2, Server, Database, Shield, Zap, Globe, CreditCard, Mail, Bell, Users, Lock, Cloud, BarChart3, Settings, Wifi, MapPin, Utensils, ClipboardCheck, Truck, Calendar, Brain, ShieldCheck, Layers, Monitor, ArrowUpDown, FileText, Headphones } from 'lucide-react';

interface Service { name: string; description: string; status: 'healthy' | 'degraded' | 'down'; latency: string; uptime: string; icon: any; category: string; }

const SERVICES: Service[] = [
  { name: 'User Auth Service', description: 'Login, registration, OTP, password management', status: 'healthy', latency: '45ms', uptime: '99.98%', icon: Lock, category: 'Core' },
  { name: 'Train Search Engine', description: 'Route search, availability, schedule lookup', status: 'healthy', latency: '120ms', uptime: '99.95%', icon: Zap, category: 'Core' },
  { name: 'Booking Service', description: 'Reservation, seat allocation, PNR generation', status: 'healthy', latency: '200ms', uptime: '99.99%', icon: ClipboardCheck, category: 'Core' },
  { name: 'Payment Gateway', description: 'UPI, cards, net banking, wallet transactions', status: 'healthy', latency: '180ms', uptime: '99.97%', icon: CreditCard, category: 'Core' },
  { name: 'PNR Status Service', description: 'Real-time PNR tracking, charting status', status: 'healthy', latency: '95ms', uptime: '99.96%', icon: FileText, category: 'Core' },
  { name: 'Live Train Tracker', description: 'GPS tracking, delay calculation, ETA', status: 'healthy', latency: '150ms', uptime: '99.90%', icon: MapPin, category: 'Tracking' },
  { name: 'Notification Service', description: 'SMS, email, push notification delivery', status: 'healthy', latency: '60ms', uptime: '99.99%', icon: Bell, category: 'Communication' },
  { name: 'Email Service', description: 'Transactional emails, E-Ticket delivery', status: 'healthy', latency: '350ms', uptime: '99.92%', icon: Mail, category: 'Communication' },
  { name: 'API Gateway', description: 'Request routing, rate limiting, load balancing', status: 'healthy', latency: '15ms', uptime: '99.99%', icon: Globe, category: 'Infrastructure' },
  { name: 'Database Cluster', description: 'PostgreSQL primary + 3 replicas', status: 'healthy', latency: '8ms', uptime: '99.99%', icon: Database, category: 'Infrastructure' },
  { name: 'Cache Layer (Redis)', description: 'Session cache, rate limiting, hot data', status: 'healthy', latency: '2ms', uptime: '99.99%', icon: Zap, category: 'Infrastructure' },
  { name: 'CDN Service', description: 'Static assets, edge caching, media delivery', status: 'healthy', latency: '12ms', uptime: '99.99%', icon: Cloud, category: 'Infrastructure' },
  { name: 'User Profile Service', description: 'Profile management, preferences, history', status: 'healthy', latency: '55ms', uptime: '99.97%', icon: Users, category: 'User' },
  { name: 'Wallet Service', description: 'Balance management, top-up, refund credits', status: 'healthy', latency: '80ms', uptime: '99.95%', icon: CreditCard, category: 'Payment' },
  { name: 'Refund Service', description: 'Automated refund processing, status tracking', status: 'healthy', latency: '250ms', uptime: '99.93%', icon: ArrowUpDown, category: 'Payment' },
  { name: 'Seat Map Service', description: 'Coach layout, berth mapping, visual selection', status: 'healthy', latency: '110ms', uptime: '99.94%', icon: Layers, category: 'Booking' },
  { name: 'Waitlist Engine', description: 'RAC/WL allocation, confirmation probability', status: 'healthy', latency: '75ms', uptime: '99.96%', icon: BarChart3, category: 'Booking' },
  { name: 'E-Catering Service', description: 'Meal ordering, restaurant partners, delivery', status: 'healthy', latency: '180ms', uptime: '99.91%', icon: Utensils, category: 'Add-on' },
  { name: 'Insurance Service', description: 'Travel insurance enrollment, claims processing', status: 'healthy', latency: '90ms', uptime: '99.98%', icon: Shield, category: 'Add-on' },
  { name: 'Analytics Service', description: 'Real-time dashboards, user behavior, revenue', status: 'healthy', latency: '200ms', uptime: '99.95%', icon: BarChart3, category: 'Analytics' },
  { name: 'Fraud Detection', description: 'Anomaly detection, payment fraud prevention', status: 'healthy', latency: '35ms', uptime: '99.99%', icon: ShieldCheck, category: 'Security' },
  { name: 'Config Service', description: 'Feature flags, A/B testing, dynamic config', status: 'healthy', latency: '10ms', uptime: '99.99%', icon: Settings, category: 'Infrastructure' },
  { name: 'RailAI Assistant', description: 'AI-powered travel recommendations, NLP chat', status: 'healthy', latency: '300ms', uptime: '99.88%', icon: Brain, category: 'AI' },
  { name: 'Station Info Service', description: 'Station data, platform info, amenities', status: 'healthy', latency: '65ms', uptime: '99.97%', icon: Monitor, category: 'Info' },
  { name: 'Feedback Service', description: 'Ratings, reviews, complaint management', status: 'healthy', latency: '70ms', uptime: '99.96%', icon: Headphones, category: 'User' },
  { name: 'Cancellation Service', description: 'Ticket cancellation, refund calculation', status: 'healthy', latency: '130ms', uptime: '99.94%', icon: ClipboardCheck, category: 'Booking' },
  { name: 'Schedule Service', description: 'Timetable management, route data, updates', status: 'healthy', latency: '85ms', uptime: '99.97%', icon: Calendar, category: 'Core' },
  { name: 'Connectivity Monitor', description: 'Network health, latency monitoring, alerts', status: 'healthy', latency: '5ms', uptime: '99.99%', icon: Wifi, category: 'Infrastructure' },
];

export const MicroservicesDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(SERVICES.map((s) => s.category)))];
  const filtered = selectedCategory === 'All' ? SERVICES : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200 mb-3"><Activity className="h-4 w-4" /> System Health</div>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Platform Microservices</h2>
        <p className="mt-2 text-sm text-slate-500">28 services powering the RailGo platform. All systems operational.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
        {[{l:'Total Services',v:'28',c:'text-emerald-700'},{l:'Healthy',v:'28/28',c:'text-emerald-700'},{l:'Avg Latency',v:'102ms',c:'text-emerald-700'},{l:'Avg Uptime',v:'99.96%',c:'text-emerald-700'}].map(({l,v,c}) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <p className={`text-2xl font-black ${c}`}>{v}</p><p className="text-xs font-bold text-slate-400 mt-1">{l}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2 justify-center">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${selectedCategory===cat?'bg-emerald-600 text-white shadow-md shadow-emerald-200':'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}>{cat}</button>
        ))}
      </div>

      {/* Service Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <div key={idx} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover:bg-emerald-100">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3" /> Healthy
                </div>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{svc.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{svc.description}</p>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="text-center"><span className="text-[9px] font-bold uppercase text-slate-400">Latency</span><p className="text-xs font-bold text-emerald-700">{svc.latency}</p></div>
                <div className="text-center"><span className="text-[9px] font-bold uppercase text-slate-400">Uptime</span><p className="text-xs font-bold text-emerald-700">{svc.uptime}</p></div>
                <div className="text-center"><span className="text-[9px] font-bold uppercase text-slate-400">Category</span><p className="text-xs font-bold text-slate-600">{svc.category}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
