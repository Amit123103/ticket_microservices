'use client';

import React, { FormEvent } from 'react';
import { ArrowLeftRight, Calendar, MapPin, Users, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { STATIONS } from '../data/trainData';

interface HeroSearchProps {
  fromCode: string;
  setFromCode: (code: string) => void;
  toCode: string;
  setToCode: (code: string) => void;
  travelDate: string;
  setTravelDate: (date: string) => void;
  passengerCount: number;
  setPassengerCount: (count: number) => void;
  quota: string;
  setQuota: (quota: string) => void;
  classFilter: string;
  setClassFilter: (cls: string) => void;
  onSearch: (e: FormEvent) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  fromCode,
  setFromCode,
  toCode,
  setToCode,
  travelDate,
  setTravelDate,
  passengerCount,
  setPassengerCount,
  quota,
  setQuota,
  classFilter,
  setClassFilter,
  onSearch,
}) => {
  const switchRoute = () => {
    const t = fromCode;
    setFromCode(toCode);
    setToCode(t);
  };
  const getStation = (code: string) => STATIONS.find((s) => s.code === code);

  return (
    <section className="hero-mesh relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Banner */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-pill mb-3">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" /> Instant Booking & Zero Cancellation Fee Option
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Train Tickets <span className="gradient-text">In Seconds</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Authorized IRCTC booking partner. Real-time seat availability, live PNR tracking & instant refunds.
          </p>
        </div>

        {/* Search Form Card */}
        <form onSubmit={onSearch} className="relative z-10 mt-8 card-elevated p-6 sm:p-8 border-orange-200">
          {/* Top Options */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-orange-600">
                <input type="radio" name="triptype" defaultChecked className="h-4 w-4 accent-orange-500" /> One Way
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800">
                <input type="radio" name="triptype" className="h-4 w-4 accent-orange-500" /> Round Trip
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quota:</span>
              {['General', 'Tatkal', 'Ladies', 'Sr. Citizen'].map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setQuota(q)}
                  className={`rounded-md px-3.5 py-1 text-xs font-bold transition ${
                    quota === q
                      ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-sm'
                      : 'btn-ghost text-slate-600'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 lg:grid-cols-[1.1fr_44px_1.1fr_1fr_0.8fr_1fr]">
            {/* From */}
            <div className="rounded-md border border-slate-200 bg-white p-3 transition">
              <div className="flex items-center gap-2 text-orange-600">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">From Station</span>
              </div>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="mt-1 w-full font-bold focus:outline-none soft-input"
              >
                {STATIONS.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">{getStation(fromCode)?.state}</p>
            </div>

            {/* Swap */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={switchRoute}
                title="Swap stations"
                className="grid h-10 w-10 place-items-center rounded-md border border-orange-500/30 bg-orange-500/10 text-orange-400 transition hover:bg-orange-500 hover:text-white hover:rotate-180"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            {/* To */}
            <div className="rounded-md border p-3 transition" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 text-orange-400">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">To Station</span>
              </div>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="mt-1 w-full font-bold focus:outline-none soft-input"
              >
                {STATIONS.filter((st) => st.code !== fromCode).map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">{getStation(toCode)?.state}</p>
            </div>

            {/* Date */}
            <div className="rounded-md border p-3 transition" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 text-purple-400">
                <Calendar className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Departure Date</span>
              </div>
              <input
                type="date"
                value={travelDate}
                min="2026-08-05"
                onChange={(e) => setTravelDate(e.target.value)}
                className="mt-1 w-full font-bold focus:outline-none soft-input"
              />
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-05')}
                  className="text-[10px] text-purple-400 hover:underline font-bold"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-06')}
                  className="text-[10px] text-purple-400 hover:underline font-bold"
                >
                  Tomorrow
                </button>
              </div>
            </div>

            {/* Passengers */}
            <div className="rounded-md border p-3 transition" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 text-orange-400">
                <Users className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Travellers</span>
              </div>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="mt-1 w-full font-bold focus:outline-none soft-input"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div className="rounded-md border p-3 transition" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 text-purple-400">
                <Filter className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Class</span>
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="mt-1 w-full font-bold focus:outline-none soft-input"
              >
                <option value="ALL">All Classes</option>
                <option value="1A">1A - First AC</option>
                <option value="2A">2A - 2 Tier AC</option>
                <option value="3A">3A - 3 Tier AC</option>
                <option value="SL">SL - Sleeper</option>
                <option value="CC">CC - Chair Car</option>
                <option value="EC">EC - Exec. Chair</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-end">
            <button type="submit" className="btn-brand flex w-full items-center justify-center gap-2 sm:w-auto px-8 py-3 text-base">
              <Sparkles className="h-5 w-5 text-white/90" />
              <span>Search Trains</span>
            </button>
          </div>
        </form>

        {/* Feature Badges */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'IRCTC Authorized', sub: 'Official partner' },
            { icon: Sparkles, title: 'Instant Refund', sub: '100% on cancellation' },
            { icon: Users, title: 'Tatkal Ready', sub: '1-click checkout' },
            { icon: Calendar, title: 'Live Seat Map', sub: 'Choose berths' },
          ].map(({ icon: Icon, title, sub }, i) => (
            <div key={i} className="card-dark p-4 flex flex-col items-center justify-center">
              <Icon className="h-6 w-6 text-orange-400" />
              <p className="mt-2 text-xs font-bold text-slate-200">{title}</p>
              <p className="text-[10px] text-slate-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
