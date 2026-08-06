'use client';

import React, { FormEvent } from 'react';
import { Icons } from './Icons';
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
    <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Banner Header */}
        <div className="mx-auto max-w-3xl text-center mb-8">
          <div className="section-pill mb-3">
            <Icons.sparkles className="h-3.5 w-3.5 text-purple-600" /> Authorized IRCTC Partner • Zero Cancellation Fee
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Train Tickets <span className="gradient-text">In Seconds</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            Real-time seat availability, live GPS train tracking, Tatkal quota & 100% instant refunds.
          </p>
        </div>

        {/* Search Form Card */}
        <form onSubmit={onSearch} className="relative z-10 rounded-3xl border border-purple-100 bg-white p-5 sm:p-7 shadow-xl shadow-purple-200/40">
          {/* Top Options: Quota Selector & Trip Type */}
          <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-purple-50">
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
                <input type="radio" name="triptype" defaultChecked className="h-4 w-4 accent-purple-600" /> One Way
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-stone-400 hover:text-purple-700 uppercase tracking-wider">
                <input type="radio" name="triptype" className="h-4 w-4 accent-purple-600" /> Round Trip
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Quota:</span>
              {['General', 'Tatkal', 'Ladies', 'Sr. Citizen'].map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setQuota(q)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    quota === q
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-sm shadow-purple-500/20'
                      : 'bg-white text-stone-600 border border-purple-200 hover:border-purple-300 hover:text-purple-700'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields Grid with Integrated Square Search Button */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 items-stretch">
            {/* From Station */}
            <div className="lg:col-span-3 rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.mapPin className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">From Station</span>
              </div>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="mt-1 w-full font-bold focus:outline-none soft-input text-sm text-stone-900 bg-transparent cursor-pointer"
              >
                {STATIONS.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-purple-600 mt-1.5">{getStation(fromCode)?.state}</p>
            </div>

            {/* Swap Button */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <button
                type="button"
                onClick={switchRoute}
                title="Swap stations"
                className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-200 bg-purple-50 text-purple-600 transition-all hover:bg-purple-600 hover:text-white hover:rotate-180 shadow-sm"
              >
                <Icons.swap className="h-5 w-5" />
              </button>
            </div>

            {/* To Station */}
            <div className="lg:col-span-3 rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.mapPin className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">To Station</span>
              </div>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="mt-1 w-full font-bold focus:outline-none soft-input text-sm text-stone-900 bg-transparent cursor-pointer"
              >
                {STATIONS.filter((st) => st.code !== fromCode).map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-purple-600 mt-1.5">{getStation(toCode)?.state}</p>
            </div>

            {/* Departure Date */}
            <div className="lg:col-span-2 rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.calendar className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Departure Date</span>
              </div>
              <input
                type="date"
                value={travelDate}
                min="2026-08-05"
                onChange={(e) => setTravelDate(e.target.value)}
                className="mt-1 w-full font-bold focus:outline-none soft-input text-sm text-stone-900 bg-transparent cursor-pointer"
              />
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-05')}
                  className="text-[10px] text-purple-600 hover:text-purple-700 font-bold hover:underline"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-06')}
                  className="text-[10px] text-purple-600 hover:text-purple-700 font-bold hover:underline"
                >
                  Tomorrow
                </button>
              </div>
            </div>

            {/* Travellers & Class */}
            <div className="lg:col-span-1 rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-purple-600 mb-1.5">
                  <Icons.users className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Travellers</span>
                </div>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(Number(e.target.value))}
                  className="w-full font-bold focus:outline-none soft-input text-xs text-stone-900 bg-transparent cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 pt-2 border-t border-stone-100">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full font-bold focus:outline-none soft-input text-[11px] text-purple-700 bg-transparent cursor-pointer"
                >
                  <option value="ALL">All Classes</option>
                  <option value="1A">1A AC</option>
                  <option value="2A">2A AC</option>
                  <option value="3A">3A AC</option>
                  <option value="SL">SL Sleeper</option>
                  <option value="CC">CC Chair</option>
                  <option value="EC">EC Exec</option>
                </select>
              </div>
            </div>

            {/* Square Full-Height Search Trains Button */}
            <div className="flex lg:col-span-2">
              <button
                type="submit"
                className="group relative flex h-full w-full min-h-[96px] flex-col items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-violet-700 p-4 text-white shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 group-hover:rotate-12 transition-transform">
                  <Icons.sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-extrabold text-sm tracking-wide text-white uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Search Trains
                </span>
                <span className="text-[10px] font-semibold text-purple-200 uppercase tracking-widest">
                  Live Results
                </span>
              </button>
            </div>
          </div>
        </form>

        {/* Feature Highlights Bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {[
            { icon: 'shield', title: 'IRCTC Authorized', sub: 'Official partner' },
            { icon: 'sparkles', title: 'Instant Refund', sub: '100% on cancellation' },
            { icon: 'users', title: 'Tatkal Ready', sub: '1-click checkout' },
            { icon: 'calendar', title: 'Live Seat Map', sub: 'Choose berths' },
          ].map(({ title, sub }, i) => (
            <div key={i} className="rounded-2xl border border-purple-100 bg-white p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
              <Icons.train className="h-5 w-5 text-purple-600 mb-1" />
              <p className="text-xs font-bold text-stone-700">{title}</p>
              <p className="text-[11px] text-stone-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
