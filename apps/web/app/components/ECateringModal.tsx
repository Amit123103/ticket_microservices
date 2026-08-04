'use client';

import React, { useState } from 'react';
import { Utensils, X, CheckCircle2, Sparkles, MapPin, Clock } from 'lucide-react';
import { E_CATERING_ITEMS, ECateringItem } from '../data/microservicesData';

interface ECateringModalProps {
  onClose: () => void;
}

export const ECateringModal: React.FC<ECateringModalProps> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<ECateringItem | null>(null);
  const [seatInput, setSeatInput] = useState('Coach B3, Seat 14');
  const [orderedSuccess, setOrderedSuccess] = useState(false);

  const handleOrder = (item: ECateringItem) => {
    setSelectedItem(item);
  };

  const handleConfirmOrder = () => {
    setOrderedSuccess(true);
    setTimeout(() => {
      setOrderedSuccess(false);
      setSelectedItem(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">IRCTC E-Catering In-Train Food Delivery</h3>
              <p className="text-xs text-slate-400">Order hygienic meals delivered hot to your seat at halt stations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {!selectedItem && (
            <div className="grid gap-4 sm:grid-cols-2">
              {E_CATERING_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3 hover:border-amber-500/40 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-2xl">{item.image}</span>
                      <h4 className="font-bold text-white text-sm mt-1">{item.dishName}</h4>
                      <p className="text-xs text-amber-400 font-semibold">{item.restaurant}</p>
                    </div>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-black text-emerald-400">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs text-slate-400">
                    <span>Delivered at: {item.deliveryStation}</span>
                    <button
                      onClick={() => handleOrder(item)}
                      className="rounded-xl bg-amber-600 px-3.5 py-1.5 font-bold text-slate-950 hover:bg-amber-500"
                    >
                      Order Meal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedItem && !orderedSuccess && (
            <div className="space-y-4 rounded-2xl bg-slate-950 p-5 border border-slate-800">
              <h4 className="font-bold text-white text-base">Confirm Food Delivery to Seat</h4>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Selected Dish:</span>
                <strong className="text-amber-400 font-bold">{selectedItem.dishName} ({selectedItem.restaurant})</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Delivery Halt Station:</span>
                <span>{selectedItem.deliveryStation}</span>
              </div>

              <div>
                <label className="field-label">Seat & Coach Details</label>
                <input
                  type="text"
                  value={seatInput}
                  onChange={(e) => setSeatInput(e.target.value)}
                  className="field-control mt-1"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700"
                >
                  Change Dish
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Pay ₹{selectedItem.price} & Order</span>
                </button>
              </div>
            </div>
          )}

          {orderedSuccess && (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
              <h4 className="text-xl font-bold text-white">Meal Order Confirmed!</h4>
              <p className="text-xs text-slate-400">
                Your order will be delivered hot directly to {seatInput} at {selectedItem?.deliveryStation}.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
