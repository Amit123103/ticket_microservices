'use client';

import React from 'react';
import { X, Clock, Train as TrainIcon } from 'lucide-react';
import { Train } from '../data/trainData';

interface TrainRouteModalProps { train: Train | null; onClose: () => void; }

export const TrainRouteModal: React.FC<TrainRouteModalProps> = ({ train, onClose }) => {
  if (!train) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white"><TrainIcon className="h-5 w-5" /></div>
            <div>
              <div className="flex items-center gap-2"><h3 className="font-bold text-slate-900 text-lg">{train.name}</h3>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">{train.number}</span></div>
              <p className="text-xs text-slate-500">Full Route • {train.duration}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200"><X className="h-5 w-5" /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          {train.route.map((st, idx) => (
            <div key={st.stationCode} className="relative flex items-start gap-4">
              {idx !== train.route.length - 1 && <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-emerald-200" />}
              <div className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                st.isPassed ? 'bg-emerald-500 text-white' : idx === 0 || idx === train.route.length - 1 ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border-2 border-emerald-300'
              }`}>{idx + 1}</div>
              <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-emerald-200 transition">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2"><h4 className="font-bold text-slate-900">{st.stationName}</h4>
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">{st.stationCode}</span></div>
                    <p className="text-xs text-slate-400 mt-0.5">{st.distanceKm} km {st.platform && `• ${st.platform}`}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-700"><span>Arr: {st.arrivalTime}</span><span>Dep: {st.departureTime}</span></div>
                    {st.haltMinutes > 0 && <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">Halt: {st.haltMinutes} mins</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400"><Clock className="h-4 w-4 text-emerald-600" /><span>IRCTC 2026 timetable</span></div>
          <button onClick={onClose} className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500">Close</button>
        </div>
      </div>
    </div>
  );
};
