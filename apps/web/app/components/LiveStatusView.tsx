'use client';

import React, { useState } from 'react';
import { Radio, Search, MapPin, Clock, Train as TrainIcon, Navigation, AlertCircle, CheckCircle2 } from 'lucide-react';
import { TRAINS_DATA, Train } from '../data/trainData';

export const LiveStatusView: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<Train>(TRAINS_DATA[0]);
  const [query, setQuery] = useState('12951');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = TRAINS_DATA.find(
      (t) => t.number.includes(query) || t.name.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setSelectedTrain(found);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-3">
          <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>Real-time GPS Live Running Status</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Live Train Location & Delays</h2>
        <p className="mt-2 text-sm text-slate-400">
          Track exact train position, delay updates, and platform numbers in real time.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl">
          <div className="relative flex-1 flex items-center bg-slate-950 rounded-xl px-4 py-2 border border-slate-800 focus-within:border-emerald-500">
            <Search className="h-5 w-5 text-emerald-400 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Train No. or Name (e.g. 12951, Vande Bharat)"
              className="w-full bg-transparent font-bold text-white placeholder-slate-500 focus:outline-none text-sm"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
          >
            <Radio className="h-4 w-4 animate-pulse" />
            <span>TRACK LIVE</span>
          </button>
        </div>

        {/* Train Select Shortcuts */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
          <span>Select Train:</span>
          {TRAINS_DATA.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setSelectedTrain(t);
                setQuery(t.number);
              }}
              className={`rounded-md border px-2.5 py-1 font-mono transition ${
                selectedTrain.id === t.id
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t.number} ({t.type})
            </button>
          ))}
        </div>
      </form>

      {/* Selected Train Status Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl space-y-6">
        
        {/* Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white">{selectedTrain.name}</h3>
              <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-xs font-bold text-indigo-400">
                #{selectedTrain.number}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {selectedTrain.fromName} → {selectedTrain.toName} • Total Route: {selectedTrain.duration}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-2 text-right">
              <span className="block text-[10px] font-extrabold uppercase text-emerald-400">Current Status</span>
              <strong className="text-sm font-bold text-white">ON TIME (0 min delay)</strong>
            </div>
          </div>
        </div>

        {/* Live Route Station Timeline */}
        <div>
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Station Passage Timeline & Platform Numbers:
          </h4>

          <div className="space-y-4">
            {selectedTrain.route.map((st, idx) => (
              <div key={st.stationCode} className="relative flex items-start gap-4">
                {/* Timeline Line */}
                {idx !== selectedTrain.route.length - 1 && (
                  <div
                    className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${
                      st.isPassed ? 'bg-emerald-500' : 'bg-slate-800'
                    }`}
                  />
                )}

                {/* Animated train icon if currently at this station */}
                <div
                  className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    st.isPassed
                      ? 'bg-emerald-500 text-slate-950'
                      : idx === 2
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {st.isPassed ? (
                    <CheckCircle2 className="h-4 w-4 stroke-[3]" />
                  ) : idx === 2 ? (
                    <TrainIcon className="h-4 w-4" />
                  ) : (
                    idx + 1
                  )}
                </div>

                <div
                  className={`flex-1 rounded-2xl border p-4 transition ${
                    idx === 2
                      ? 'border-indigo-500 bg-indigo-950/30 ring-1 ring-indigo-500/40'
                      : 'border-slate-800 bg-slate-950/60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-bold text-white text-base">{st.stationName}</strong>
                        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-indigo-400">
                          {st.stationCode}
                        </span>
                        {idx === 2 && (
                          <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                            Current Train Location
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Distance: {st.distanceKm} km {st.platform && `• ${st.platform}`}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                        <span>Arr: {st.arrivalTime}</span>
                        <span>Dep: {st.departureTime}</span>
                      </div>
                      {st.isPassed ? (
                        <span className="text-[10px] font-bold text-emerald-400">Departed On Time</span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">Expected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
