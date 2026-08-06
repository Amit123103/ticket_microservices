'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
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
    <div className="modal-overlay">
      <div className="relative w-full max-w-4xl rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 bg-stone-50/50 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/20">
              <Icons.train className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-lg">Select Berth & Seat</h3>
              <p className="text-xs text-stone-500 mt-0.5">{train.name} • Coach {coachNumber} ({travelClass.name})</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all">
            <Icons.x className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Coach & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-stone-50/80 p-5 border border-stone-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Coach:</span>
              {['B1','B2','B3','B4'].map((c) => (
                <button key={c} onClick={() => { setCoachNumber(c); setSelectedSeats([]); }}
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-all ${coachNumber === c ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20' : 'bg-white text-stone-600 border border-stone-200 hover:border-purple-300 hover:text-purple-700'}`}>{c}</button>
              ))}
            </div>
            <div className="flex items-center gap-5 text-xs">
              <div className="flex items-center gap-2"><div className="h-3.5 w-3.5 rounded-lg bg-purple-600"></div><span className="text-stone-500 font-medium">Selected</span></div>
              <div className="flex items-center gap-2"><div className="h-3.5 w-3.5 rounded-lg bg-white border border-stone-300"></div><span className="text-stone-500 font-medium">Available</span></div>
              <div className="flex items-center gap-2"><div className="h-3.5 w-3.5 rounded-lg bg-red-50 border border-red-200"></div><span className="text-stone-500 font-medium">Booked</span></div>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 rounded-3xl bg-stone-50/80 p-6 border border-stone-200">
            {seatLayout.map((seat) => {
              const label = `${coachNumber}-${seat.seatNum} (${seat.type})`;
              const isSel = selectedSeats.includes(label);
              return (
                <button key={seat.seatNum} type="button" disabled={seat.isOccupied} onClick={() => toggleSeat(label, seat.isOccupied)}
                  className={`relative flex flex-col items-center justify-center rounded-2xl p-3.5 border transition-all ${
                    isSel ? 'border-purple-400 bg-purple-50 text-purple-800 shadow-sm shadow-purple-500/10 scale-105'
                    : seat.isOccupied ? 'border-red-200 bg-red-50 text-stone-400 cursor-not-allowed'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-purple-400 hover:bg-purple-50 hover:shadow-sm'}`}>
                  <span className="text-xs font-bold">{seat.seatNum}</span>
                  <span className="text-[10px] font-semibold mt-1 text-stone-400">{seat.type}</span>
                  {isSel && <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-purple-600 text-white shadow-sm"><Icons.check className="h-3 w-3 stroke-[3]" /></span>}
                </button>
              );
            })}
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-purple-50/60 p-5 border border-purple-200">
            <div className="flex items-center gap-3">
              <Icons.users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-bold text-stone-800">Selected {selectedSeats.length} of {passengerCount}</p>
                <p className="text-xs text-stone-500">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Auto berth if none selected'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-stone-600 border border-stone-200 hover:bg-stone-50 transition-all">Back</button>
              <button onClick={handleConfirm} className="btn-brand flex items-center gap-2">
                <Icons.sparkles className="h-4 w-4" /> Confirm & Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
