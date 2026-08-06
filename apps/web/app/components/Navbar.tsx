'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

export type NavTab =
  | 'search'
  | 'pnr'
  | 'live'
  | 'trips'
  | 'payments'
  | 'refunds'
  | 'help'
  | 'station'
  | 'reviews'
  | 'microservices';

interface PageNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  tripCount: number;
}

export const PageNavbar: React.FC<PageNavProps> = ({ activeTab, setActiveTab, tripCount }) => {
  const NAV_OPTIONS = [
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'pnr', label: 'PNR', icon: 'ticket' },
    { id: 'live', label: 'Live', icon: 'live' },
    { id: 'trips', label: 'Trips', icon: 'user', badge: tripCount },
    { id: 'payments', label: 'Payments', icon: 'card' },
    { id: 'refunds', label: 'Refunds', icon: 'refresh' },
    { id: 'help', label: 'Help', icon: 'help' },
    { id: 'station', label: 'Stations', icon: 'building' },
    { id: 'reviews', label: 'Reviews', icon: 'star' },
    { id: 'microservices', label: 'Services', icon: 'activity' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {NAV_OPTIONS.map(({ id, label, icon, badge }) => {
          const isActive = activeTab === id;
          const IconSvg = Icons[icon as keyof typeof Icons];
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`group relative flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all hover:shadow-lg ${
                isActive
                  ? 'border-purple-400 bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <div className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
                isActive ? 'bg-purple-500/50 text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
              }`}>
                {IconSvg ? <IconSvg className="h-5 w-5" /> : null}
              </div>
              <span className="text-xs font-bold">{label}</span>
              {badge && badge > 0 ? (
                <span className={`absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full text-[10px] font-bold text-white ${
                  isActive ? 'bg-white text-purple-700' : 'bg-purple-600'
                }`}>
                  {badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
};