'use client';

import React, { useState } from 'react';
import { Train as TrainIcon, ArrowRight, Star, Sparkles, Eye, Utensils } from 'lucide-react';
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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">Available Trains</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              {trains.length} Found
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">{fromCity} → {toCity} • {travelDate} • {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'} • {quota}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-400">Sort:</span>
          <div className="flex rounded-xl bg-slate-100 p-1">
            {(['departure', 'duration', 'price'] as const).map((s) => (
              <button key={s} onClick={() => setSortBy(s)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition capitalize ${sortBy === s ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}>
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
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-emerald-200">
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-6 py-3">
                <div className="flex flex-wrap items-center gap-3">
                  <TrainIcon className="h-4 w-4 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-900 text-base">{train.name}</h3>
                  <span className="rounded-md bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">#{train.number}</span>
                  {train.badge && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">{train.badge}</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="font-bold text-slate-700">{train.rating}</span>
                  </div>
                  <button onClick={onOpenECatering} className="flex items-center gap-1 text-emerald-600 hover:underline font-bold">
                    <Utensils className="h-3.5 w-3.5" /> E-Catering
                  </button>
                  <button onClick={() => onViewRoute(train)} className="flex items-center gap-1 text-emerald-600 hover:underline font-bold">
                    <Eye className="h-3.5 w-3.5" /> Timetable
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_1.5fr_1fr] lg:items-center">
                  {/* Times */}
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-emerald-50/50 p-4 border border-emerald-100">
                    <div className="text-center">
                      <strong className="block text-xl font-black text-slate-900">{train.departureTime}</strong>
                      <span className="text-xs font-bold text-emerald-700">{train.fromName}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-400">{train.duration}</span>
                      <div className="relative my-1 flex items-center w-24">
                        <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                        <ArrowRight className="absolute right-0 h-4 w-4 text-emerald-600" />
                      </div>
                    </div>
                    <div className="text-center">
                      <strong className="block text-xl font-black text-slate-900">{train.arrivalTime}</strong>
                      <span className="text-xs font-bold text-emerald-700">{train.toName}</span>
                    </div>
                  </div>

                  {/* Class Pills */}
                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Travel Class & Availability:</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                      {train.classes.map((cls) => (
                        <button key={cls.code} type="button"
                          onClick={() => setSelectedClassMap((p) => ({ ...p, [train.id]: cls.code }))}
                          className={`flex flex-col justify-between rounded-xl border p-3 text-left transition ${
                            ccCode === cls.code
                              ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400'
                              : 'border-slate-200 hover:border-emerald-300'
                          }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-700">{cls.code}</span>
                            <strong className="text-sm font-extrabold text-emerald-700">₹{cls.price}</strong>
                          </div>
                          <div className="mt-2">
                            <span className={`block text-[10px] font-bold ${cls.status === 'AVAILABLE' ? 'text-emerald-600' : cls.status === 'RAC' ? 'text-amber-600' : 'text-rose-600'}`}>
                              {cls.status === 'AVAILABLE' ? `AVAILABLE-${cls.available.toString().padStart(4,'0')}` : `${cls.status} ${cls.statusNumber}`}
                            </span>
                            <span className="block text-[9px] text-slate-400">{cls.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Book */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Total ({passengerCount} Pax)</span>
                      <strong className="block text-2xl font-black text-slate-900">₹{(ccInfo.price * passengerCount).toLocaleString('en-IN')}</strong>
                      <span className="text-[10px] font-bold text-emerald-600">Includes GST</span>
                    </div>
                    <button onClick={() => onSelectTrain(train, ccInfo)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-105 hover:brightness-110">
                      <Sparkles className="h-4 w-4 text-emerald-200" /> Select & Choose Seat
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
