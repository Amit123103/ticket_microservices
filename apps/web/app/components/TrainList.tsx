'use client';

import React, { useState } from 'react';
import { Train as TrainIcon, Clock, ArrowRight, Star, ShieldCheck, Sparkles, AlertCircle, Eye, Utensils } from 'lucide-react';
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
  trains,
  fromCity,
  toCity,
  travelDate,
  quota,
  passengerCount,
  onSelectTrain,
  onViewRoute,
  onOpenECatering,
}) => {
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
  const [selectedClassMap, setSelectedClassMap] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<'departure' | 'duration' | 'price'>('departure');

  const handleClassSelect = (trainId: string, classCode: string) => {
    setSelectedClassMap((prev) => ({ ...prev, [trainId]: classCode }));
    setSelectedTrainId(trainId);
  };

  const sortedTrains = [...trains].sort((a, b) => {
    if (sortBy === 'departure') {
      return a.departureTime.localeCompare(b.departureTime);
    }
    if (sortBy === 'duration') {
      return a.duration.localeCompare(b.duration);
    }
    if (sortBy === 'price') {
      const priceA = a.classes[0]?.price || 0;
      const priceB = b.classes[0]?.price || 0;
      return priceA - priceB;
    }
    return 0;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header & Sorting Filters */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">Available Trains</h2>
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/30">
              {trains.length} Trains Found
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {fromCity} to {toCity} • {travelDate} • {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'} • Quota: {quota}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sort By:</span>
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setSortBy('departure')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                sortBy === 'departure' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Departure
            </button>
            <button
              onClick={() => setSortBy('duration')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                sortBy === 'duration' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Duration
            </button>
            <button
              onClick={() => setSortBy('price')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                sortBy === 'price' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Price
            </button>
          </div>
        </div>
      </div>

      {/* Train Cards List */}
      <div className="space-y-6">
        {sortedTrains.map((train) => {
          const currentClassCode = selectedClassMap[train.id] || train.classes[0]?.code;
          const currentClassInfo = train.classes.find((c) => c.code === currentClassCode) || train.classes[0];

          return (
            <article
              key={train.id}
              className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                selectedTrainId === train.id
                  ? 'border-indigo-500 bg-slate-900/90 ring-2 ring-indigo-500/30 shadow-2xl'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Train Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/60 px-6 py-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <TrainIcon className="h-4 w-4 text-indigo-400" />
                    <h3 className="font-extrabold text-white text-base">{train.name}</h3>
                  </div>
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-bold text-slate-300">
                    #{train.number}
                  </span>
                  {train.badge && (
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">
                      {train.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="font-bold text-white">{train.rating}</span>
                  </div>

                  <button
                    onClick={onOpenECatering}
                    className="flex items-center gap-1 text-amber-400 hover:underline font-bold"
                  >
                    <Utensils className="h-3.5 w-3.5" />
                    <span>E-Catering Food</span>
                  </button>

                  <button
                    onClick={() => onViewRoute(train)}
                    className="flex items-center gap-1 text-indigo-400 hover:underline font-bold"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Timetable</span>
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_1.5fr_1fr] lg:items-center">
                  
                  {/* Departure / Duration / Arrival */}
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-950/50 p-4 border border-slate-800/50">
                    <div className="text-center">
                      <strong className="block text-xl font-black text-white">{train.departureTime}</strong>
                      <span className="text-xs font-bold text-indigo-400">{train.fromName}</span>
                      <span className="block text-[10px] text-slate-400">({train.fromCode})</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-400">{train.duration}</span>
                      <div className="relative my-1 flex items-center w-24">
                        <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-emerald-400"></div>
                        <ArrowRight className="absolute right-0 h-4 w-4 text-emerald-400" />
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">Daily Service</span>
                    </div>

                    <div className="text-center">
                      <strong className="block text-xl font-black text-white">{train.arrivalTime}</strong>
                      <span className="text-xs font-bold text-indigo-400">{train.toName}</span>
                      <span className="block text-[10px] text-slate-400">({train.toCode})</span>
                    </div>
                  </div>

                  {/* Travel Class Selector Pills */}
                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Select Travel Class & Seat Availability:
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                      {train.classes.map((cls) => {
                        const isSelected = currentClassCode === cls.code;
                        return (
                          <button
                            key={cls.code}
                            type="button"
                            onClick={() => handleClassSelect(train.id, cls.code)}
                            className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                              isSelected
                                ? 'border-indigo-500 bg-indigo-600/20 text-white ring-1 ring-indigo-500'
                                : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black">{cls.code}</span>
                              <strong className="text-sm font-extrabold text-emerald-400">
                                ₹{cls.price}
                              </strong>
                            </div>
                            <div className="mt-2">
                              {cls.status === 'AVAILABLE' ? (
                                <span className="block text-[10px] font-bold text-emerald-400">
                                  AVAILABLE-{cls.available.toString().padStart(4, '0')}
                                </span>
                              ) : cls.status === 'RAC' ? (
                                <span className="block text-[10px] font-bold text-amber-400">
                                  RAC {cls.statusNumber}
                                </span>
                              ) : (
                                <span className="block text-[10px] font-bold text-rose-400">
                                  WL {cls.statusNumber}
                                </span>
                              )}
                              <span className="block text-[9px] text-slate-400">{cls.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing & Select Action */}
                  <div className="flex flex-col items-end justify-between border-t border-slate-800/80 pt-4 lg:border-t-0 lg:pt-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Total Price ({passengerCount} Pax)</span>
                      <strong className="block text-2xl font-black text-white">
                        ₹{(currentClassInfo.price * passengerCount).toLocaleString('en-IN')}
                      </strong>
                      <span className="text-[10px] font-bold text-emerald-400">Includes IRCTC Tax & GST</span>
                    </div>

                    <button
                      onClick={() => onSelectTrain(train, currentClassInfo)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:scale-105 hover:brightness-110"
                    >
                      <Sparkles className="h-4 w-4 text-emerald-300" />
                      <span>Select & Choose Seat</span>
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
