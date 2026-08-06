'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

interface ECateringModalProps { onClose: () => void; }

export const ECateringModal: React.FC<ECateringModalProps> = ({ onClose }) => {
  const restaurants = [
    { name: 'Rajdhani Thali', rating: 4.5, items: [
      { name: 'Veg Thali (Full)', price: 180, veg: true }, { name: 'Paneer Butter Masala + Roti', price: 150, veg: true },
      { name: 'Dal Makhani + Rice', price: 120, veg: true }, { name: 'Chicken Biryani', price: 220, veg: false },
    ]},
    { name: 'South Express', rating: 4.3, items: [
      { name: 'Masala Dosa', price: 80, veg: true }, { name: 'Idli Sambar (4pc)', price: 60, veg: true },
      { name: 'Curd Rice', price: 70, veg: true }, { name: 'Filter Coffee', price: 30, veg: true },
    ]},
    { name: 'Fast Track Snacks', rating: 4.1, items: [
      { name: 'Veg Sandwich', price: 50, veg: true }, { name: 'Samosa (2pc)', price: 40, veg: true },
      { name: 'Mineral Water 1L', price: 20, veg: true }, { name: 'Cold Coffee', price: 60, veg: true },
    ]},
  ];

  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addItem = (name: string) => setCart((p) => ({ ...p, [name]: (p[name] || 0) + 1 }));
  const removeItem = (name: string) => { const n = { ...cart }; if (n[name] > 1) n[name]--; else delete n[name]; setCart(n); };

  const cartTotal = Object.entries(cart).reduce((sum, [name, qty]) => {
    for (const r of restaurants) { const item = r.items.find((i) => i.name === name); if (item) return sum + item.price * qty; } return sum;
  }, 0);

  return (
    <div className="modal-overlay">
      <div className="relative w-full max-w-3xl rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-100 text-orange-600">
              <Icons.utensils className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">E-Catering</h3>
          </div>
          <button onClick={onClose} className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all">
            <Icons.x className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {orderPlaced ? (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-200">
                <Icons.check className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">Order Placed!</h3>
              <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto">Your food will be delivered at your seat. Estimated time: 30-45 mins.</p>
              <button onClick={onClose} className="mt-6 btn-brand px-6 py-3 text-sm">Done</button>
            </div>
          ) : (
            <>
              {restaurants.map((r, ri) => (
                <div key={ri} className="rounded-2xl border border-stone-200 overflow-hidden">
                  <div className="flex items-center justify-between bg-stone-50/80 px-5 py-4 border-b border-stone-100">
                    <div>
                      <h4 className="font-bold text-stone-900">{r.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Icons.star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-stone-600">{r.rating}</span>
                        <span className="text-xs text-stone-400">• 30-45 min</span>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {r.items.map((item, ii) => (
                      <div key={ii} className="flex items-center justify-between px-5 py-4 hover:bg-stone-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`h-3.5 w-3.5 rounded-md border-2 ${item.veg ? 'border-emerald-500 bg-emerald-500' : 'border-rose-500 bg-rose-500'}`}></div>
                          <div>
                            <p className="text-sm font-bold text-stone-800">{item.name}</p>
                            <p className="text-xs font-bold text-orange-600 mt-0.5">₹{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cart[item.name] ? (
                            <div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-1.5">
                              <button onClick={() => removeItem(item.name)} className="p-1.5 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"><Icons.minus className="h-3.5 w-3.5" /></button>
                              <span className="text-sm font-bold text-orange-700 w-6 text-center">{cart[item.name]}</span>
                              <button onClick={() => addItem(item.name)} className="p-1.5 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"><Icons.plus className="h-3.5 w-3.5" /></button>
                            </div>
                          ) : (
                            <button onClick={() => addItem(item.name)} className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700 hover:bg-orange-100 transition-all">ADD</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(cart).length > 0 && (
                <div className="sticky bottom-0 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 p-5 flex items-center justify-between shadow-xl shadow-orange-500/20 border border-orange-500">
                  <div className="flex items-center gap-3 text-white">
                    <Icons.shoppingCart className="h-5 w-5" />
                    <div>
                      <span className="text-xs text-orange-100">{Object.values(cart).reduce((a, b) => a + b, 0)} items</span>
                      <p className="font-bold text-lg">₹{cartTotal}</p>
                    </div>
                  </div>
                  <button onClick={() => setOrderPlaced(true)} className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-colors shadow-sm">Place Order</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};