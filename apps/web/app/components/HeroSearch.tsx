'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Logo } from './Logo';
import { STATIONS } from '../data/trainData';

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
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % TRAIN_BG_IMAGES.length);
    }, 2000); // 2 SECONDS AUTOMATIC DELAY!

    return () => clearInterval(timer);
  }, []);

  const switchRoute = () => {
    const t = fromCode;
    setFromCode(toCode);
    setToCode(t);
  };
  const getStation = (code: string) => STATIONS.find((s) => s.code === code);

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-6 sm:px-6 lg:px-8">
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

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Banner Header */}
        <div className="mx-auto max-w-3xl text-center mb-5">
          <Logo showText={false} className="h-12 w-auto mx-auto mb-2" />
          <div className="section-pill mb-2 normal-case font-medium text-[11px]">
            Authorized IRCTC Partner • Zero Cancellation Fee
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Train Tickets <span className="gradient-text">In Seconds</span>
          </h1>
          <p className="text-xs text-stone-500 max-w-xl mx-auto">
            Real-time seat availability, live GPS train tracking, Tatkal quota & 100% instant refunds.
          </p>
        </div>

        {/* Search Form Card */}
        <form onSubmit={onSearch} className="relative z-10 rounded-3xl border border-purple-100 bg-white p-5 shadow-xl shadow-purple-200/40">
          {/* Top Options: Quota Selector & Trip Type */}
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-purple-50">
            <div className="flex items-center gap-5">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
                <input type="radio" name="triptype" defaultChecked className="h-3.5 w-3.5 accent-purple-600" /> One Way
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-stone-400 hover:text-purple-700 uppercase tracking-wider">
                <input type="radio" name="triptype" className="h-3.5 w-3.5 accent-purple-600" /> Round Trip
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Quota:</span>
              {['General', 'Tatkal', 'Ladies', 'Sr. Citizen'].map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setQuota(q)}
                  className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
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

          {/* Form Fields Grid with Compact Square Search Button */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-12 items-center">
            {/* From Station */}
            <div className="lg:col-span-3 rounded-2xl border border-purple-100 bg-white p-3.5 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <Icons.mapPin className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">From Station</span>
              </div>
              <select
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="mt-0.5 w-full font-bold focus:outline-none text-xs text-stone-900 bg-transparent cursor-pointer"
              >
                {STATIONS.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[10px] font-medium text-purple-600 mt-1 leading-none">{getStation(fromCode)?.state}</p>
            </div>

            {/* Swap Button */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <button
                type="button"
                onClick={switchRoute}
                title="Swap stations"
                className="grid h-10 w-10 place-items-center rounded-xl border border-purple-200 bg-purple-50 text-purple-600 transition-all hover:bg-purple-600 hover:text-white hover:rotate-180 shadow-sm"
              >
                <Icons.swap className="h-4 w-4" />
              </button>
            </div>

            {/* To Station */}
            <div className="lg:col-span-3 rounded-2xl border border-purple-100 bg-white p-3.5 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <Icons.mapPin className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">To Station</span>
              </div>
              <select
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="mt-0.5 w-full font-bold focus:outline-none text-xs text-stone-900 bg-transparent cursor-pointer"
              >
                {STATIONS.filter((st) => st.code !== fromCode).map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.city} - {st.name} ({st.code})
                  </option>
                ))}
              </select>
              <p className="text-[10px] font-medium text-purple-600 mt-1 leading-none">{getStation(toCode)?.state}</p>
            </div>

            {/* Departure Date */}
            <div className="lg:col-span-2 rounded-2xl border border-purple-100 bg-white p-3.5 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <Icons.calendar className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Departure</span>
              </div>
              <input
                type="date"
                value={travelDate}
                min="2026-08-05"
                onChange={(e) => setTravelDate(e.target.value)}
                className="mt-0.5 w-full font-bold focus:outline-none text-xs text-stone-900 bg-transparent cursor-pointer"
              />
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-05')}
                  className="text-[9px] text-purple-600 hover:text-purple-700 font-bold hover:underline"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setTravelDate('2026-08-06')}
                  className="text-[9px] text-purple-600 hover:text-purple-700 font-bold hover:underline"
                >
                  Tomorrow
                </button>
              </div>
            </div>

            {/* Travellers */}
            <div className="lg:col-span-1 rounded-2xl border border-purple-100 bg-white p-3.5 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-1 text-purple-600 mb-1">
                <Icons.users className="h-3 w-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Adults</span>
              </div>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="mt-0.5 w-full font-bold focus:outline-none text-xs text-stone-900 bg-transparent cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Class */}
            <div className="lg:col-span-1 rounded-2xl border border-purple-100 bg-white p-3.5 transition-all hover:border-purple-300 hover:shadow-sm">
              <div className="flex items-center gap-1 text-purple-600 mb-1">
                <Icons.filter className="h-3 w-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Class</span>
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="mt-0.5 w-full font-bold focus:outline-none text-xs text-stone-900 bg-transparent cursor-pointer"
              >
                <option value="ALL">ALL</option>
                <option value="1A">1A</option>
                <option value="2A">2A</option>
                <option value="3A">3A</option>
                <option value="SL">SL</option>
                <option value="CC">CC</option>
                <option value="EC">EC</option>
              </select>
            </div>

            {/* Small Square Search Button WITHOUT ICON */}
            <div className="flex items-center justify-center lg:col-span-1">
              <button
                type="submit"
                className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-violet-700 text-white font-black text-xs uppercase shadow-md shadow-purple-600/30 hover:shadow-lg hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-center leading-tight p-2 border border-purple-400/30 tracking-tight"
                title="Search Trains"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Feature Highlights Bar */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          {[
            { title: 'IRCTC Authorized', sub: 'Official partner' },
            { title: 'Instant Refund', sub: '100% on cancellation' },
            { title: 'Tatkal Ready', sub: '1-click checkout' },
            { title: 'Live Seat Map', sub: 'Choose berths' },
          ].map(({ title, sub }, i) => (
            <div key={i} className="rounded-2xl border border-purple-100 bg-white p-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all">
              <Icons.train className="h-4 w-4 text-purple-600 mb-1" />
              <p className="text-xs font-bold text-stone-700">{title}</p>
              <p className="text-[10px] text-stone-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
