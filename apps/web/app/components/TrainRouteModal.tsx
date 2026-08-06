'use client';
import React from 'react';
import { Icons } from './Icons';
import { Train } from '../data/trainData';

interface TrainRouteModalProps { train: Train; onClose: () => void; }

export const TrainRouteModal: React.FC<TrainRouteModalProps> = ({ train, onClose }) => {
  const routeStations = [
    { name: train.fromName, code: train.fromCode, arr: '--', dep: train.departureTime, halt: '--', dist: '0 km' },
    { name: 'Kota Junction', code: 'KOTA', arr: '18:45', dep: '18:50', halt: '5 min', dist: '280 km' },
    { name: 'Ratlam Junction', code: 'RTM', arr: '21:10', dep: '21:15', halt: '5 min', dist: '540 km' },
    { name: train.toName, code: train.toCode, arr: '23:30', dep: '--', halt: '--', dist: '820 km' },
  ];

  return (
    <div className="modal-overlay">
      <div className="relative w-full max-w-2xl rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
              <Icons.route className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Route Overview</h3>
              <p className="text-xs text-stone-500 mt-0.5">{train.name} #{train.number}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all">
            <Icons.x className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="text-center">
              <p className="text-xs font-bold text-stone-400 uppercase">Origin</p>
              <p className="text-sm font-bold text-stone-900 mt-0.5">{train.fromName}</p>
              <p className="text-xs text-stone-500">{train.fromCode}</p>
            </div>
            <div className="flex-1 mx-4 flex items-center gap-1">
              <div className="flex-1 h-0.5 bg-orange-300 rounded-full" />
              <Icons.arrowRight className="h-4 w-4 text-orange-500" />
              <div className="flex-1 h-0.5 bg-orange-300 rounded-full" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-stone-400 uppercase">Destination</p>
              <p className="text-sm font-bold text-stone-900 mt-0.5">{train.toName}</p>
              <p className="text-xs text-stone-500">{train.toCode}</p>
            </div>
          </div>

          <div className="space-y-0">
            {routeStations.map((st, i) => (
              <div key={i} className="flex items-start gap-4">
                {i !== routeStations.length - 1 && <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-stone-200" />}
                <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold border-2 ${i === 0 ? 'bg-orange-600 text-white border-orange-600' : i === routeStations.length - 1 ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-500 border-stone-300'}`}>{i + 1}</div>
                <div className={`flex-1 flex flex-wrap items-center justify-between gap-2 rounded-xl p-3.5 border ${i === 0 ? 'bg-orange-50 border-orange-200' : i === routeStations.length - 1 ? 'bg-stone-900/5 border-stone-200' : 'bg-stone-50 border-stone-200'}`}>
                  <div>
                    <span className="font-bold text-stone-900 text-sm">{st.name}</span>
                    <span className="ml-2 text-[10px] font-bold text-orange-600">{st.code}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span><Icons.clock className="h-3 w-3 inline mr-1" />{st.arr}</span>
                    <span><Icons.send className="h-3 w-3 inline mr-1" />{st.dep}</span>
                    <span>{st.halt}</span>
                    <span className="font-bold text-stone-700">{st.dist}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};