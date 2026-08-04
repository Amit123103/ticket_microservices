'use client';
import React from 'react';
import { X, Wallet, Plus, ArrowUpDown, Sparkles } from 'lucide-react';

interface WalletModalProps { onClose: () => void; }

export const WalletModal: React.FC<WalletModalProps> = ({ onClose }) => {
  const txns = [
    { id: 1, type: 'Credit', amount: 2500, desc: 'Wallet Top-Up via UPI', date: '2026-08-04', time: '14:30' },
    { id: 2, type: 'Debit', amount: -835, desc: 'Booking #TKT293847', date: '2026-08-03', time: '09:15' },
    { id: 3, type: 'Credit', amount: 450, desc: 'Refund - PNR 7364829150', date: '2026-08-01', time: '11:45' },
    { id: 4, type: 'Credit', amount: 1000, desc: 'Welcome Bonus', date: '2026-07-28', time: '10:00' },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
          <div className="flex items-center gap-2"><Wallet className="h-5 w-5 text-emerald-600" /><h3 className="font-bold text-slate-900 text-lg">RailGo Wallet</h3></div>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white shadow-lg shadow-emerald-200">
            <span className="text-xs font-bold text-emerald-200 uppercase">Available Balance</span>
            <p className="text-3xl font-black mt-1">₹2,500.00</p>
            <button className="mt-3 flex items-center gap-1.5 rounded-xl bg-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/30"><Plus className="h-3.5 w-3.5" /> Add Money</button>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2"><ArrowUpDown className="h-4 w-4 text-emerald-600" /> Recent Transactions</h4>
            <div className="space-y-2">
              {txns.map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 hover:border-emerald-200 transition">
                  <div><p className="text-xs font-bold text-slate-800">{t.desc}</p><p className="text-[10px] text-slate-400">{t.date} • {t.time}</p></div>
                  <span className={`text-sm font-bold ${t.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
