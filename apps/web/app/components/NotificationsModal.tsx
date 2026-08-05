'use client';
import React from 'react';
import { X, Bell, CheckCircle2, Clock, AlertCircle, Info } from 'lucide-react';

interface NotificationsModalProps { onClose: () => void; }

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const notifs = [
    { id: 1, title: 'Booking Confirmed', desc: 'PNR 8492049182 for Rajdhani Express on 2026-08-10 is confirmed.', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'Chart Prepared', desc: 'Chart for Train 12301 (Aug 10) has been prepared. Your seat: B3-14.', time: '3 hours ago', type: 'info' },
    { id: 3, title: 'Price Drop Alert', desc: 'Shatabdi Express fares reduced by 15% for August bookings.', time: '1 day ago', type: 'promo' },
    { id: 4, title: 'Refund Processed', desc: '₹450 refunded to your wallet for PNR 7364829150.', time: '3 days ago', type: 'success' },
    { id: 5, title: 'Schedule Change', desc: 'Tamil Nadu Express departure time changed to 22:15 from Aug 15.', time: '5 days ago', type: 'warning' },
  ];

  const getIcon = (type: string) => {
    if (type === 'success') return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
    if (type === 'warning') return <AlertCircle className="h-4 w-4 text-amber-500" />;
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
          <div className="flex items-center gap-2"><Bell className="h-5 w-5 text-emerald-600" /><h3 className="font-bold text-slate-900 text-lg">Notifications</h3>
            <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">{notifs.length}</span></div>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200 shadow-sm"><X className="h-5 w-5" /></button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-2">
          {notifs.map((n) => (
            <div key={n.id} className="flex items-start gap-3 rounded-xl bg-white p-4 hover:border-emerald-200 hover:bg-slate-50 transition cursor-pointer">
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-50 border border-slate-200">{getIcon(n.type)}</div>
              <div className="flex-1"><p className="text-sm font-bold text-slate-800">{n.title}</p><p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400"><Clock className="h-3 w-3" /> {n.time}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
