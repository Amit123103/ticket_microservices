'use client';
import React, { useState } from 'react';
import { X, Utensils, Star, ShoppingCart, Plus, Minus, Clock, MapPin, CheckCircle2 } from 'lucide-react';

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
  const removeItem = (name: string) => setCart((p) => { const n = { ...p }; if (n[name] > 1) n[name]--; else delete n[name]; return n; });

  const cartTotal = Object.entries(cart).reduce((sum, [name, qty]) => {
    for (const r of restaurants) { const item = r.items.find((i) => i.name === name); if (item) return sum + item.price * qty; } return sum;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
          <div className="flex items-center gap-2"><Utensils className="h-5 w-5 text-emerald-600" /><h3 className="font-bold text-slate-900 text-lg">E-Catering</h3></div>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {orderPlaced ? (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
              <h3 className="text-xl font-black text-slate-900">Order Placed!</h3>
              <p className="text-sm text-slate-500 mt-2">Your food will be delivered at your seat. Estimated time: 30-45 mins.</p>
              <button onClick={onClose} className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-500">Done</button>
            </div>
          ) : (
            <>
              {restaurants.map((r, ri) => (
                <div key={ri} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="flex items-center justify-between bg-slate-50 px-5 py-3 border-b border-slate-200">
                    <div><h4 className="font-bold text-slate-900">{r.name}</h4>
                      <div className="flex items-center gap-1 mt-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-xs font-bold text-slate-600">{r.rating}</span></div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400"><Clock className="h-3 w-3" /> 30-45 min</div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {r.items.map((item, ii) => (
                      <div key={ii} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded border ${item.veg ? 'border-emerald-500 bg-emerald-500' : 'border-rose-500 bg-rose-500'}`}></div>
                          <div><p className="text-sm font-bold text-slate-800">{item.name}</p><p className="text-xs text-emerald-600 font-bold">₹{item.price}</p></div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cart[item.name] ? (
                            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-1">
                              <button onClick={() => removeItem(item.name)} className="p-1 text-emerald-600"><Minus className="h-3.5 w-3.5" /></button>
                              <span className="text-xs font-bold text-emerald-700 w-5 text-center">{cart[item.name]}</span>
                              <button onClick={() => addItem(item.name)} className="p-1 text-emerald-600"><Plus className="h-3.5 w-3.5" /></button>
                            </div>
                          ) : (
                            <button onClick={() => addItem(item.name)} className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100">ADD</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(cart).length > 0 && (
                <div className="sticky bottom-0 rounded-2xl bg-emerald-600 p-4 flex items-center justify-between shadow-xl shadow-emerald-200">
                  <div className="flex items-center gap-2 text-white"><ShoppingCart className="h-5 w-5" />
                    <div><span className="text-xs">{Object.values(cart).reduce((a, b) => a + b, 0)} items</span>
                      <p className="font-bold text-lg">₹{cartTotal}</p></div></div>
                  <button onClick={() => setOrderPlaced(true)} className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-50">Place Order</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
