'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
import { STATIONS, Station } from '../data/trainData';
import { STATION_AMENITIES } from '../data/microservicesData';

export const StationExplorer: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState('BCT');
  const currentStation = STATIONS.find((s) => s.code === selectedCode) || STATIONS[0];
  const amenities = STATION_AMENITIES[selectedCode] || STATION_AMENITIES['BCT'];

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="section-pill mb-3">
          <Icons.building className="h-3.5 w-3.5" /> Station Service Guide
        </div>
        <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Station Amenities & Platform Map</h2>
        <p className="mt-2 text-sm text-stone-500">
          Discover lounges, cloakroom tariffs, food plazas, and platform connections across Indian Junctions.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {STATIONS.slice(0, 8).map((st) => (
          <button
            key={st.code}
            onClick={() => setSelectedCode(st.code)}
            className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              selectedCode === st.code
                ? 'border-purple-400 bg-purple-50 text-purple-700 shadow-sm shadow-purple-500/10'
                : 'border-stone-200 bg-white text-stone-500 hover:border-purple-300 hover:text-purple-700 hover:shadow-sm'
            }`}
          >
            {st.city} ({st.code})
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-lg shadow-stone-200/30 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-100 text-purple-600 border border-purple-200">
              <Icons.mapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900">{currentStation.name}</h3>
              <p className="text-sm text-stone-500 mt-0.5">
                City: {currentStation.city} • State: {currentStation.state} • Code: #{currentStation.code}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200">
              100 Mbps Wi-Fi Ready
            </span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-stone-400">
            Available Station Facilities & Lounges:
          </h4>

          <div className="grid gap-4 sm:grid-cols-2">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-purple-100 bg-white p-5 space-y-2 hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {item.category === 'Lounge' && <Icons.coffee className="h-4 w-4 text-amber-600" />}
                    {item.category === 'Utility' && <Icons.wifi className="h-4 w-4 text-indigo-600" />}
                    {item.category === 'Transport' && <Icons.zap className="h-4 w-4 text-emerald-600" />}
                    {item.category === 'Food' && <Icons.utensils className="h-4 w-4 text-rose-600" />}
                    <h5 className="font-bold text-stone-900 text-sm">{item.name}</h5>
                  </div>
                  <span className="rounded-lg bg-stone-100 px-2.5 py-1 text-[10px] font-bold text-stone-600">
                    {item.location}
                  </span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};