'use client';

import React, { useState } from 'react';
import { MapPin, Coffee, Wifi, Lock, Zap, Navigation, CheckCircle2, Building2 } from 'lucide-react';
import { STATIONS, Station } from '../data/trainData';
import { STATION_AMENITIES } from '../data/microservicesData';

export const StationExplorer: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState('BCT');
  const currentStation = STATIONS.find((s) => s.code === selectedCode) || STATIONS[0];
  const amenities = STATION_AMENITIES[selectedCode] || STATION_AMENITIES['BCT'];

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold text-sky-300 mb-3">
          <Building2 className="h-4 w-4 text-sky-400" />
          <span>station-service & route-service Guide</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Station Amenities & Platform Map</h2>
        <p className="mt-2 text-sm text-slate-400">
          Discover lounges, cloakroom tariffs, food plazas, and platform connections across Indian Junctions.
        </p>
      </div>

      {/* Station Selector Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {STATIONS.slice(0, 8).map((st) => (
          <button
            key={st.code}
            onClick={() => setSelectedCode(st.code)}
            className={`rounded-2xl border px-4 py-2 text-xs font-bold transition ${
              selectedCode === st.code
                ? 'border-sky-500 bg-sky-600/20 text-sky-300 ring-1 ring-sky-500'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:bg-slate-800'
            }`}
          >
            {st.city} ({st.code})
          </button>
        ))}
      </div>

      {/* Main Station Info Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
        
        {/* Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-600/20 text-sky-400 border border-sky-500/30">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{currentStation.name}</h3>
              <p className="text-xs text-slate-400">
                City: {currentStation.city} • State: {currentStation.state} • Code: #{currentStation.code}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              100 Mbps Wi-Fi Ready
            </span>
          </div>
        </div>

        {/* Amenities List */}
        <div>
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Available Station Facilities & Lounges:
          </h4>

          <div className="grid gap-4 sm:grid-cols-2">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.category === 'Lounge' && <Coffee className="h-4 w-4 text-amber-400" />}
                    {item.category === 'Utility' && <Wifi className="h-4 w-4 text-sky-400" />}
                    {item.category === 'Transport' && <Zap className="h-4 w-4 text-emerald-400" />}
                    {item.category === 'Food' && <Coffee className="h-4 w-4 text-rose-400" />}
                    <h5 className="font-bold text-white text-sm">{item.name}</h5>
                  </div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
                    {item.location}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
