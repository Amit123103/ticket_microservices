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
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Banner */}
        <div className="mx-auto max-w-3xl text-center mb-10">
          <div className="section-pill mb-3">
            <Icons.sparkles className="h-3.5 w-3.5 text-purple-600" /> Instant Booking & Zero Cancellation Fee Option
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Train Tickets <span className="gradient-text">In Seconds</span>
          </h1>
          <p className="text-base sm:text-lg text-purple-950/70">
            Authorized IRCTC booking partner. Real-time seat availability, live PNR tracking & instant refunds.
          </p>
        </div>

        {/* Search Form Card */}
        <form onSubmit={onSearch} className="relative z-10 rounded-3xl border border-purple-100 bg-white p-6 sm:p-8 shadow-xl shadow-purple-200/40">
          {/* Top Options */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-purple-50">
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-purple-700">
                <input type="radio" name="triptype" defaultChecked className="h-4 w-4 accent-purple-600" /> One Way
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-stone-400 hover:text-purple-700">
                <input type="radio" name="triptype" className="h-4 w-4 accent-purple-600" /> Round Trip
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Quota:</span>
              {['General', 'Tatkal', 'Ladies', 'Sr. Citizen'].map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setQuota(q)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
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

          {/* Form Fields */}
          <div className="grid gap-5 lg:grid-cols-[1.2fr_auto_1.2fr_1fr_0.9fr_1fr]">
            {/* From */}
            <div className="rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.mapPin className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">From Station</span>
              </div>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="mt-1 w-full font-semibold focus:outline-none soft-input text-sm"
              >
                {STATIONS.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-stone-400 mt-1.5">{getStation(fromCode)?.state}</p>
            </div>

            {/* Swap */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={switchRoute}
                title="Swap stations"
                className="grid h-11 w-11 place-items-center rounded-xl border border-purple-200 bg-purple-50 text-purple-600 transition-all hover:bg-purple-600 hover:text-white hover:rotate-180"
              >
                <Icons.swap className="h-4 w-4" />
              </button>
            </div>

            {/* To */}
            <div className="rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.mapPin className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">To Station</span>
              </div>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="mt-1 w-full font-semibold focus:outline-none soft-input text-sm"
              >
                {STATIONS.filter((st) => st.code !== fromCode).map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-stone-400 mt-1.5">{getStation(toCode)?.state}</p>
            </div>

            {/* Date */}
            <div className="rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.calendar className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Departure Date</span>
              </div>
              <input
                type="date"
                value={travelDate}
                min="2026-08-05"
                onChange={(e) => setTravelDate(e.target.value)}
                className="mt-1 w-full font-semibold focus:outline-none soft-input text-sm"
              />
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-05')}
                  className="text-[10px] text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-06')}
                  className="text-[10px] text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                >
                  Tomorrow
                </button>
              </div>
            </div>

            {/* Passengers */}
            <div className="rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.users className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Travellers</span>
              </div>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="mt-1 w-full font-semibold focus:outline-none soft-input text-sm"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div className="rounded-2xl border border-purple-100 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Icons.filter className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Class</span>
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="mt-1 w-full font-semibold focus:outline-none soft-input text-sm"
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
            <button type="submit" className="btn-brand flex w-full items-center justify-center gap-2 sm:w-auto px-8 py-3.5 text-base">
              <Icons.sparkles className="h-5 w-5 text-white/90" />
              <span>Search Trains</span>
            </button>
          </div>
        </form>

        {/* Feature Badges */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {[
            { icon: 'shield', title: 'IRCTC Authorized', sub: 'Official partner' },
            { icon: 'sparkles', title: 'Instant Refund', sub: '100% on cancellation' },
            { icon: 'users', title: 'Tatkal Ready', sub: '1-click checkout' },
            { icon: 'calendar', title: 'Live Seat Map', sub: 'Choose berths' },
          ].map(({ icon, title, sub }, i) => (
            <div key={i} className="rounded-2xl border border-purple-100 bg-white p-5 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
              <Icons.train className="h-6 w-6 text-purple-600" />
              <p className="mt-2 text-xs font-bold text-stone-700">{title}</p>
              <p className="text-[11px] text-stone-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
