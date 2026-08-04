'use client';

import React from 'react';
import { X, Clock, MapPin, Train as TrainIcon, Navigation } from 'lucide-react';
import { Train } from '../data/trainData';

interface TrainRouteModalProps {
  train: Train | null;
  onClose: () => void;
}

export const TrainRouteModal: React.FC<TrainRouteModalProps> = ({ train, onClose }) => {
  if (!train) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <TrainIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg">{train.name}</h3>
                <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-xs font-bold text-indigo-400">
                  {train.number}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full Route Timetable • {train.duration} Total Duration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Timetable Station List */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          {train.route.map((st, idx) => (
            <div key={st.stationCode} className="relative flex items-start gap-4">
              {/* Timeline Indicator Line */}
              {idx !== train.route.length - 1 && (
                <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-slate-800" />
              )}
              
              <div
                className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  st.isPassed
                    ? 'bg-emerald-500 text-slate-950'
                    : idx === 0 || idx === train.route.length - 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {idx + 1}
              </div>

              <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{st.stationName}</h4>
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-indigo-400">
                        {st.stationCode}
                      </span>
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
                    {st.haltMinutes > 0 && (
                      <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                        Halt: {st.haltMinutes} mins
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="h-4 w-4 text-indigo-400" />
            <span>Schedule updated for IRCTC 2026 timetable</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
