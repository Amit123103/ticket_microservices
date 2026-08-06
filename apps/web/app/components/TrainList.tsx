'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
import { Train, TrainClassInfo } from '../data/trainData';

interface TrainListProps {
  trains: Train[];
  fromCity: string;
  toCity: string;
  travelDate: string;
  quota: string;
  passengerCount: number;
  onSelectTrain: (train: Train, selectedClass: TrainClassInfo) => void;
  onViewRoute: (train: Train) => void;
  onOpenECatering: () => void;
}

export const TrainList: React.FC<TrainListProps> = ({
  trains, fromCity, toCity, travelDate, quota, passengerCount,
  onSelectTrain, onViewRoute, onOpenECatering,
}) => {
  const [selectedClassMap, setSelectedClassMap] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<'departure' | 'duration' | 'price'>('departure');

  const sortedTrains = [...trains].sort((a, b) => {
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'price') return (a.classes[0]?.price || 0) - (b.classes[0]?.price || 0);
    return 0;
  });

  return (
    <section id="train-list-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-stone-900">Available Trains</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              {trains.length} Found
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-400">{fromCity} → {toCity} • {travelDate} • {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'} • {quota}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Sort:</span>
          <div className="flex rounded-xl bg-stone-100 p-1">
            {(['departure', 'duration', 'price'] as const).map((s) => (
              <button key={s} onClick={() => setSortBy(s)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all capitalize ${sortBy === s ? 'bg-purple-600 text-white shadow-sm' : 'text-stone-500 hover:text-stone-700 hover:bg-white'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Train Cards */}
      <div className="space-y-5">
        {sortedTrains.map((train) => {
          const ccCode = selectedClassMap[train.id] || train.classes[0]?.code;
          const ccInfo = train.classes.find((c) => c.code === ccCode) || train.classes[0];

          return (
            <article key={train.id}
              className="rounded-2xl border border-purple-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/60 hover:border-purple-300">
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50/80 px-5 sm:px-6 py-3.5 border-b border-purple-50">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-purple-100 text-purple-600">
                    <Icons.train className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base">{train.name}</h3>
                  <span className="rounded-lg bg-white px-2 py-1 text-xs font-semibold text-stone-500 border border-stone-200">#{train.number}</span>
                  {train.badge && (
                    <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 border border-purple-200">{train.badge}</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-stone-400">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Icons.star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="font-bold text-stone-700">{train.rating}</span>
                  </div>
                  <button onClick={onOpenECatering} className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                    <Icons.utensils className="h-3.5 w-3.5" /> E-Catering
                  </button>
                  <button onClick={() => onViewRoute(train)} className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                    <Icons.eye className="h-3.5 w-3.5" /> Timetable
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_1.6fr_1fr] lg:items-center">
                  {/* Times */}
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-purple-50/60 p-5 border border-purple-100">
                    <div className="text-center">
                      <strong className="block text-2xl font-bold text-stone-900">{train.departureTime}</strong>
                      <span className="text-xs font-semibold text-purple-700">{train.fromName}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-stone-400">{train.duration}</span>
                      <div className="relative flex items-center w-20">
                        <div className="h-0.5 w-full bg-gradient-to-r from-purple-300 to-purple-600 rounded-full"></div>
                        <Icons.arrowRight className="absolute right-0 h-3.5 w-3.5 text-purple-600" />
                      </div>
                    </div>
                    <div className="text-center">
                      <strong className="block text-2xl font-bold text-stone-900">{train.arrivalTime}</strong>
                      <span className="text-xs font-semibold text-purple-700">{train.toName}</span>
                    </div>
                  </div>

                  {/* Class Pills */}
                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-stone-400">Travel Class & Availability:</p>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-3">
                      {train.classes.map((cls) => (
                        <button key={cls.code} type="button"
                          onClick={() => setSelectedClassMap((p) => ({ ...p, [train.id]: cls.code }))}
                          className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                            ccCode === cls.code
                              ? 'border-purple-400 bg-purple-50 shadow-sm shadow-purple-500/10'
                              : 'border-stone-200 hover:border-purple-300 hover:bg-purple-50/30'
                          }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-700">{cls.code}</span>
                            <strong className="text-sm font-bold text-purple-700">₹{cls.price}</strong>
                          </div>
                          <div className="mt-2">
                            <span className={`block text-[10px] font-bold ${cls.status === 'AVAILABLE' ? 'text-emerald-600' : cls.status === 'RAC' ? 'text-amber-600' : 'text-rose-600'}`}>
                              {cls.status === 'AVAILABLE' ? `AVAILABLE-${cls.available.toString().padStart(4,'0')}` : `${cls.status} ${cls.statusNumber}`}
                            </span>
                            <span className="block text-[10px] text-stone-400">{cls.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Book */}
                  <div className="flex flex-col items-end justify-between gap-4">
                    <div className="text-right w-full">
                      <span className="text-xs text-stone-400">Total ({passengerCount} Pax)</span>
                      <strong className="block text-2xl font-bold text-stone-900">₹{(ccInfo.price * passengerCount).toLocaleString('en-IN')}</strong>
                      <span className="text-[10px] font-bold text-emerald-600">Includes GST</span>
                    </div>
                    <button onClick={() => onSelectTrain(train, ccInfo)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:from-purple-700 hover:to-violet-700 transition-all">
                      <Icons.sparkles className="h-4 w-4 text-white/90" /> Select & Choose Seat
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
