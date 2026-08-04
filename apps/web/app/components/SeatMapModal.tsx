'use client';

import React, { useState } from 'react';
import { X, Check, Users, Sparkles, AlertCircle, Train as TrainIcon } from 'lucide-react';
import { Train, TrainClassInfo } from '../data/trainData';

interface SeatMapModalProps {
  train: Train;
  travelClass: TrainClassInfo;
  passengerCount: number;
  onClose: () => void;
  onConfirmSeats: (seats: string[]) => void;
}

export const SeatMapModal: React.FC<SeatMapModalProps> = ({
  train,
  travelClass,
  passengerCount,
  onClose,
  onConfirmSeats,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [coachNumber, setCoachNumber] = useState<string>(
    travelClass.code === '1A' ? 'H1' : travelClass.code === '2A' ? 'A1' : travelClass.code === '3A' ? 'B3' : travelClass.code === 'CC' ? 'C2' : 'S4'
  );

  // Generate 24 seats in coach layout
  const seatLayout = Array.from({ length: 24 }, (_, i) => {
    const seatNum = i + 1;
    let type: 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window' = 'Lower';

    if (travelClass.code === 'CC' || travelClass.code === 'EC') {
      type = seatNum % 2 === 0 ? 'Window' : 'Aisle' as any;
    } else {
      const rem = seatNum % 8;
      if (rem === 1 || rem === 4) type = 'Lower';
      else if (rem === 2 || rem === 5) type = 'Middle';
      else if (rem === 3 || rem === 6) type = 'Upper';
      else if (rem === 7) type = 'Side Lower';
      else type = 'Side Upper';
    }

    // Mark seats 3, 7, 14 as occupied
    const isOccupied = [3, 7, 14, 19].includes(seatNum);
    return { seatNum, type, isOccupied };
  });

  const toggleSeat = (seatLabel: string, isOccupied: boolean) => {
    if (isOccupied) return;

    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatLabel));
    } else {
      if (selectedSeats.length >= passengerCount) {
        // replace first selected
        setSelectedSeats([...selectedSeats.slice(1), seatLabel]);
      } else {
        setSelectedSeats([...selectedSeats, seatLabel]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      // Auto assign if none picked
      const autoSeats = Array.from({ length: passengerCount }, (_, i) => `${coachNumber}-${i + 12} (${seatLayout[i].type})`);
      onConfirmSeats(autoSeats);
    } else {
      onConfirmSeats(selectedSeats);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <TrainIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Select Berth & Seat Preferences</h3>
              <p className="text-xs text-slate-400">
                {train.name} (#{train.number}) • Coach {coachNumber} ({travelClass.name})
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

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Coach Selector & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-950/60 p-4 border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Coach:</span>
              {['B1', 'B2', 'B3', 'B4'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCoachNumber(c); setSelectedSeats([]); }}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                    coachNumber === c ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <div className="h-3.5 w-3.5 rounded bg-emerald-500"></div>
                <span className="text-slate-300">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3.5 w-3.5 rounded bg-slate-800 border border-slate-700"></div>
                <span className="text-slate-300">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3.5 w-3.5 rounded bg-rose-900/60 border border-rose-700"></div>
                <span className="text-slate-400">Booked</span>
              </div>
            </div>
          </div>

          {/* Interactive Seat Grid Layout */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-indigo-400">
              Visual Coach Map (Click to select up to {passengerCount} seat{passengerCount > 1 ? 's' : ''}):
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 rounded-3xl bg-slate-950 p-6 border border-slate-800">
              {seatLayout.map((seat) => {
                const seatLabel = `${coachNumber}-${seat.seatNum} (${seat.type})`;
                const isSelected = selectedSeats.includes(seatLabel);

                return (
                  <button
                    key={seat.seatNum}
                    type="button"
                    disabled={seat.isOccupied}
                    onClick={() => toggleSeat(seatLabel, seat.isOccupied)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-3 border transition-all ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500/20 text-white ring-2 ring-emerald-400/50 scale-105'
                        : seat.isOccupied
                        ? 'border-rose-950 bg-rose-950/40 text-slate-600 cursor-not-allowed'
                        : 'border-slate-800 bg-slate-900 text-slate-200 hover:border-indigo-500 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black">#{seat.seatNum}</span>
                    <span className="text-[10px] font-bold mt-1 text-slate-400">{seat.type}</span>
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-slate-950">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selection Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-indigo-950/30 p-4 border border-indigo-500/20">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-xs font-bold text-white">
                  Selected {selectedSeats.length} of {passengerCount} Seat{passengerCount > 1 ? 's' : ''}
                </p>
                <p className="text-[11px] text-slate-400">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Auto berth allocation enabled if none selected'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                <span>Confirm Seats & Proceed</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
