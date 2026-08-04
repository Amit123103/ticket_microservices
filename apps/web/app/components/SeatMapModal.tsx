'use client';

import React, { useState } from 'react';
import { X, Check, Users, Sparkles, Train as TrainIcon } from 'lucide-react';
import { Train, TrainClassInfo } from '../data/trainData';

interface SeatMapModalProps { train: Train; travelClass: TrainClassInfo; passengerCount: number; onClose: () => void; onConfirmSeats: (seats: string[]) => void; }

export const SeatMapModal: React.FC<SeatMapModalProps> = ({ train, travelClass, passengerCount, onClose, onConfirmSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [coachNumber, setCoachNumber] = useState('B3');

  const seatLayout = Array.from({ length: 24 }, (_, i) => {
    const n = i + 1;
    let type = 'Lower';
    if (travelClass.code === 'CC' || travelClass.code === 'EC') { type = n % 2 === 0 ? 'Window' : 'Aisle'; }
    else { const r = n % 8; if (r===1||r===4) type='Lower'; else if(r===2||r===5) type='Middle'; else if(r===3||r===6) type='Upper'; else if(r===7) type='Side Lower'; else type='Side Upper'; }
    return { seatNum: n, type, isOccupied: [3,7,14,19].includes(n) };
  });

  const toggleSeat = (label: string, occ: boolean) => {
    if (occ) return;
    if (selectedSeats.includes(label)) setSelectedSeats(selectedSeats.filter((s) => s !== label));
    else if (selectedSeats.length >= passengerCount) setSelectedSeats([...selectedSeats.slice(1), label]);
    else setSelectedSeats([...selectedSeats, label]);
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) { onConfirmSeats(Array.from({ length: passengerCount }, (_, i) => `${coachNumber}-${i+12} (${seatLayout[i].type})`)); }
    else onConfirmSeats(selectedSeats);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white"><TrainIcon className="h-5 w-5" /></div>
            <div><h3 className="font-bold text-slate-900 text-lg">Select Berth & Seat</h3>
              <p className="text-xs text-slate-500">{train.name} • Coach {coachNumber} ({travelClass.name})</p></div>
          </div>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Coach & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase text-slate-400">Coach:</span>
              {['B1','B2','B3','B4'].map((c) => (
                <button key={c} onClick={() => { setCoachNumber(c); setSelectedSeats([]); }}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition ${coachNumber === c ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}>{c}</button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="h-3.5 w-3.5 rounded bg-emerald-500"></div><span className="text-slate-500">Selected</span></div>
              <div className="flex items-center gap-1.5"><div className="h-3.5 w-3.5 rounded bg-white border border-slate-300"></div><span className="text-slate-500">Available</span></div>
              <div className="flex items-center gap-1.5"><div className="h-3.5 w-3.5 rounded bg-rose-100 border border-rose-300"></div><span className="text-slate-500">Booked</span></div>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 rounded-3xl bg-slate-50 p-6 border border-slate-200">
            {seatLayout.map((seat) => {
              const label = `${coachNumber}-${seat.seatNum} (${seat.type})`;
              const isSel = selectedSeats.includes(label);
              return (
                <button key={seat.seatNum} type="button" disabled={seat.isOccupied} onClick={() => toggleSeat(label, seat.isOccupied)}
                  className={`relative flex flex-col items-center justify-center rounded-2xl p-3 border transition-all ${
                    isSel ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400/50 scale-105'
                    : seat.isOccupied ? 'border-rose-200 bg-rose-50 text-slate-400 cursor-not-allowed'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                  <span className="text-xs font-black">#{seat.seatNum}</span>
                  <span className="text-[10px] font-bold mt-1 text-slate-400">{seat.type}</span>
                  {isSel && <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white"><Check className="h-3 w-3 stroke-[3]" /></span>}
                </button>
              );
            })}
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <div><p className="text-xs font-bold text-slate-800">Selected {selectedSeats.length} of {passengerCount}</p>
                <p className="text-[11px] text-slate-500">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Auto berth if none selected'}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50">Back</button>
              <button onClick={handleConfirm} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-200 hover:bg-emerald-500">
                <Sparkles className="h-4 w-4" /> Confirm & Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
