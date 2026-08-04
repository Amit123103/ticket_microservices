'use client';

import React from 'react';
import { Bell, X, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { INITIAL_NOTIFICATIONS, NotificationItem } from '../data/microservicesData';

interface NotificationsDrawerProps {
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="h-full w-full max-w-md border-l border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold">
            <Bell className="h-5 w-5" />
            <span>notification-service Alerts</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 p-1.5 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {INITIAL_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`rounded-2xl border p-4 space-y-1.5 transition ${
                n.read ? 'border-slate-800/80 bg-slate-950/40 opacity-80' : 'border-indigo-500/30 bg-slate-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {n.type === 'SUCCESS' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                  {n.type === 'INFO' && <Info className="h-4 w-4 text-sky-400" />}
                  {n.type === 'WARNING' && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                  <h4 className="font-bold text-white text-xs">{n.title}</h4>
                </div>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
