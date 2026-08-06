'use client';

import React from 'react';
import { Icons } from './Icons';
import { INITIAL_NOTIFICATIONS, NotificationItem } from '../data/microservicesData';

interface NotificationsDrawerProps {
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/40 backdrop-blur-sm">
      <div className="h-full w-full max-w-md border-l border-stone-200 bg-white shadow-2xl shadow-stone-300/30 space-y-6 overflow-y-auto animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-5">
          <div className="flex items-center gap-2 text-orange-600 font-bold">
            <Icons.bell className="h-5 w-5" />
            <span>Notifications</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all"
          >
            <Icons.x className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 pb-6 space-y-3">
          {INITIAL_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`rounded-2xl border p-4 space-y-1.5 transition-all hover:shadow-sm ${
                n.read ? 'border-stone-200 bg-stone-50/50 opacity-75' : 'border-orange-200 bg-orange-50/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {n.type === 'SUCCESS' && <Icons.check className="h-4 w-4 text-emerald-500" />}
                  {n.type === 'INFO' && <Icons.info className="h-4 w-4 text-indigo-500" />}
                  {n.type === 'WARNING' && <Icons.alertTriangle className="h-4 w-4 text-amber-500" />}
                  <h4 className="font-bold text-stone-900 text-sm">{n.title}</h4>
                </div>
                <span className="text-[10px] text-stone-400">{n.time}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};