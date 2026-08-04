'use client';

import React, { FormEvent } from 'react';
import { ArrowLeftRight, Calendar, MapPin, Users, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { STATIONS, Station } from '../data/trainData';

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
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  const getStationByCode = (code: string): Station | undefined => {
    return STATIONS.find((s) => s.code === code);
  };

  return (
    <section className="hero-pattern relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Banner Title */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Instant Booking & Zero Cancellation Fee Option</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Book Train Tickets <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">In Seconds</span>
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            Authorized IRCTC booking partner. Real-time seat availability, live PNR tracking & instant refunds.
          </p>
        </div>

        {/* Search Widget Form */}
        <form
          onSubmit={onSearch}
          className="relative z-10 mt-8 rounded-3xl border border-slate-700/60 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl sm:p-7"
        >
          {/* Top Options Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-indigo-400">
                <input type="radio" name="triptype" defaultChecked className="h-4 w-4 accent-indigo-500" />
                <span>One Way</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-200">
                <input type="radio" name="triptype" className="h-4 w-4 accent-indigo-500" />
                <span>Round Trip</span>
              </label>
            </div>

            {/* Quota Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quota:</span>
              {['General', 'Tatkal', 'Ladies', 'Sr. Citizen'].map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setQuota(q)}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                    quota === q
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid gap-4 lg:grid-cols-[1.1fr_44px_1.1fr_1fr_0.8fr_1fr]">
            
            {/* From Station */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-3 transition focus-within:border-indigo-500">
              <div className="flex items-center gap-2 text-indigo-400">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">From Station</span>
              </div>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="mt-1 w-full bg-transparent font-bold text-white focus:outline-none"
              >
                {STATIONS.map((st) => (
                  <option key={st.code} value={st.code} className="bg-slate-900 text-white">
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                {getStationByCode(fromCode)?.state}
              </p>
            </div>

            {/* Swap Button */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={switchRoute}
                title="Swap From & To Stations"
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-700 bg-slate-800 text-indigo-400 transition hover:bg-indigo-600 hover:text-white hover:rotate-180"
              >
                <ArrowLeftRight className="h-5 w-5" />
              </button>
            </div>

            {/* To Station */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-3 transition focus-within:border-indigo-500">
              <div className="flex items-center gap-2 text-indigo-400">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">To Station</span>
              </div>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="mt-1 w-full bg-transparent font-bold text-white focus:outline-none"
              >
                {STATIONS.filter((st) => st.code !== fromCode).map((st) => (
                  <option key={st.code} value={st.code} className="bg-slate-900 text-white">
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                {getStationByCode(toCode)?.state}
              </p>
            </div>

            {/* Departure Date */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-3 transition focus-within:border-indigo-500">
              <div className="flex items-center gap-2 text-indigo-400">
                <Calendar className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Departure Date</span>
              </div>
              <input
                type="date"
                value={travelDate}
                min="2026-08-05"
                onChange={(e) => setTravelDate(e.target.value)}
                className="mt-1 w-full bg-transparent font-bold text-white focus:outline-none"
              />
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-05')}
                  className="text-[10px] text-indigo-400 hover:underline font-bold"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-06')}
                  className="text-[10px] text-indigo-400 hover:underline font-bold"
                >
                  Tomorrow
                </button>
              </div>
            </div>

            {/* Passengers & Class */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-3 transition focus-within:border-indigo-500">
              <div className="flex items-center gap-2 text-indigo-400">
                <Users className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Travellers</span>
              </div>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="mt-1 w-full bg-transparent font-bold text-white focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num} className="bg-slate-900 text-white">
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">Standard Fare</p>
            </div>

            {/* Class Filter */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-3 transition focus-within:border-indigo-500">
              <div className="flex items-center gap-2 text-indigo-400">
                <Filter className="h-4 w-4" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Class</span>
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="mt-1 w-full bg-transparent font-bold text-white focus:outline-none"
              >
                <option value="ALL" className="bg-slate-900 text-white">All Classes</option>
                <option value="1A" className="bg-slate-900 text-white">1A - First AC</option>
                <option value="2A" className="bg-slate-900 text-white">2A - 2 Tier AC</option>
                <option value="3A" className="bg-slate-900 text-white">3A - 3 Tier AC</option>
                <option value="3E" className="bg-slate-900 text-white">3E - 3 AC Economy</option>
                <option value="SL" className="bg-slate-900 text-white">SL - Sleeper</option>
                <option value="CC" className="bg-slate-900 text-white">CC - Chair Car</option>
                <option value="EC" className="bg-slate-900 text-white">EC - Exec. Chair</option>
              </select>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">{quota} Quota</p>
            </div>

          </div>

          {/* Submit Search Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-600/30 transition hover:scale-[1.01] hover:brightness-110 sm:w-auto"
            >
              <Sparkles className="h-5 w-5 text-emerald-300" />
              <span>SEARCH TRAINS</span>
            </button>
          </div>
        </form>

        {/* Feature Badges */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
            <ShieldCheck className="mx-auto h-6 w-6 text-emerald-400" />
            <p className="mt-2 text-xs font-bold text-white">IRCTC Authorized</p>
            <p className="text-[10px] text-slate-400">Official partner booking</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
            <Sparkles className="mx-auto h-6 w-6 text-indigo-400" />
            <p className="mt-2 text-xs font-bold text-white">Instant Refund</p>
            <p className="text-[10px] text-slate-400">100% refund on cancellation</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
            <Users className="mx-auto h-6 w-6 text-sky-400" />
            <p className="mt-2 text-xs font-bold text-white">Tatkal Ready</p>
            <p className="text-[10px] text-slate-400">Fast 1-click checkout</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-md">
            <Calendar className="mx-auto h-6 w-6 text-amber-400" />
            <p className="mt-2 text-xs font-bold text-white">Live Seat Map</p>
            <p className="text-[10px] text-slate-400">Choose preferred berths</p>
          </div>
        </div>

      </div>
    </section>
  );
};
