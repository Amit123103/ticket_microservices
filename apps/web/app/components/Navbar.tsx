'use client';

import React from 'react';
import { Icons } from './Icons';
import { Logo } from './Logo';

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

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
}

interface PageNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  tripCount: number;
  user?: UserInfo | null;
  onOpenWallet?: () => void;
  onOpenNotifications?: () => void;
  onOpenECatering?: () => void;
  onOpenAiAssistant?: () => void;
  onLogout?: () => void;
  onGoHome?: () => void;
}

export const PageNavbar: React.FC<PageNavProps> = ({
  activeTab,
  setActiveTab,
  tripCount,
  user,
  onOpenWallet,
  onOpenNotifications,
  onOpenECatering,
  onOpenAiAssistant,
  onLogout,
  onGoHome,
}) => {
  const NAV_OPTIONS: Array<{ id: NavTab; label: string; icon: string; badge?: number }> = [
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
    <div className="w-full">
      {/* ── Top Header Bar Above Navigation ── */}
      <header className="sticky top-0 z-40 border-b border-purple-100 bg-white/95 backdrop-blur-xl text-stone-900 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div
            onClick={onGoHome || (() => setActiveTab('search'))}
            className="cursor-pointer group flex-shrink-0"
          >
            <Logo className="h-8 sm:h-10 w-auto" />
          </div>

          {/* Header Quick Actions & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Wallet Button */}
            {onOpenWallet && (
              <button
                onClick={onOpenWallet}
                className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-purple-200 bg-purple-50/80 px-2.5 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-all shadow-sm"
              >
                <Icons.wallet className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span className="hidden md:inline">Wallet:</span>
                <span className="font-black text-[11px] sm:text-xs">₹8,450</span>
              </button>
            )}

            {/* E-Catering */}
            {onOpenECatering && (
              <button
                onClick={onOpenECatering}
                className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all"
                title="Order Food on Train"
              >
                <Icons.utensils className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span className="hidden sm:inline">E-Catering</span>
              </button>
            )}

            {/* RailAI Assistant */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-2.5 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-100 transition-all"
                title="RailAI Assistant"
              >
                <Icons.sparkles className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span className="hidden sm:inline">RailAI</span>
              </button>
            )}

            {/* Notifications */}
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="relative rounded-xl border border-stone-200 bg-white p-2 text-stone-600 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all"
                title="Notifications"
              >
                <Icons.bell className="h-4 w-4 text-purple-600" />
                <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-purple-600 text-[9px] font-bold text-white shadow-sm">
                  5
                </span>
              </button>
            )}

            {/* User Profile & Logout */}
            {onLogout && (
              <div className="ml-1 sm:ml-2 flex items-center gap-1.5 sm:gap-2 border-l border-stone-200 pl-2 sm:pl-3">
                <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-purple-600 text-white font-bold text-xs shadow-sm flex-shrink-0">
                  {user?.name ? user.name[0].toUpperCase() : 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-stone-900 leading-none">{user?.name || 'Amit Kumar'}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5 leading-none">{user?.email || 'amit@railgo.in'}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="rounded-xl bg-stone-100 p-1.5 sm:p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Log out"
                >
                  <Icons.logout className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Navigation Options Bar (Horizontal scroll on Mobile, Grid on Laptop/Desktop) ── */}
      <section className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto no-scrollbar touch-scroll gap-2 pb-1 sm:pb-0 sm:grid sm:grid-cols-5 lg:grid-cols-10 sm:gap-2.5">
          {NAV_OPTIONS.map(({ id, label, icon, badge }) => {
            const isActive = activeTab === id;
            const IconSvg = Icons[icon as keyof typeof Icons];
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`group relative flex-shrink-0 min-w-[76px] sm:min-w-0 flex flex-col items-center gap-1 sm:gap-1.5 rounded-2xl border p-2.5 sm:p-3 transition-all hover:shadow-md ${
                  isActive
                    ? 'border-purple-400 bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                <div className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl transition-colors ${
                  isActive ? 'bg-purple-500/50 text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
                }`}>
                  {IconSvg ? <IconSvg className="h-4 w-4" /> : null}
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-tight whitespace-nowrap">{label}</span>
                {badge && badge > 0 ? (
                  <span className={`absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 grid h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 place-items-center rounded-full px-1 text-[9px] sm:text-[10px] font-bold ${
                    isActive ? 'bg-white text-purple-700 shadow-sm' : 'bg-purple-600 text-white shadow-sm'
                  }`}>
                    {badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};