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
      <header className="sticky top-0 z-40 border-b border-purple-800/40 bg-gradient-to-r from-purple-950 via-slate-950 to-purple-950 text-white shadow-xl shadow-purple-950/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div
            onClick={onGoHome || (() => setActiveTab('search'))}
            className="cursor-pointer group"
          >
            <Logo className="h-10 w-auto" />
          </div>

          {/* Header Quick Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wallet Button */}
            {onOpenWallet && (
              <button
                onClick={onOpenWallet}
                className="flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-900/60 px-3 py-1.5 text-xs font-bold text-purple-200 hover:bg-purple-800/80 hover:text-white transition-all shadow-sm"
              >
                <Icons.wallet className="h-4 w-4 text-purple-400" />
                <span className="hidden sm:inline">Wallet:</span>
                <span className="font-black text-white">₹8,450</span>
              </button>
            )}

            {/* E-Catering */}
            {onOpenECatering && (
              <button
                onClick={onOpenECatering}
                className="flex items-center gap-1.5 rounded-xl border border-purple-700/50 bg-white/10 px-3 py-1.5 text-xs font-semibold text-purple-100 hover:bg-white/20 hover:text-white transition-all"
                title="Order Food on Train"
              >
                <Icons.utensils className="h-4 w-4 text-purple-300" />
                <span className="hidden md:inline">E-Catering</span>
              </button>
            )}

            {/* RailAI Assistant */}
            {onOpenAiAssistant && (
              <button
                onClick={onOpenAiAssistant}
                className="flex items-center gap-1.5 rounded-xl border border-purple-400/50 bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:scale-105 transition-all"
                title="RailAI Assistant"
              >
                <Icons.sparkles className="h-4 w-4 text-purple-200" />
                <span className="hidden md:inline">RailAI</span>
              </button>
            )}

            {/* Notifications */}
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="relative rounded-xl border border-purple-700/50 bg-white/10 p-2 text-purple-200 hover:bg-white/20 hover:text-white transition-all"
                title="Notifications"
              >
                <Icons.bell className="h-4 w-4 text-purple-300" />
                <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-purple-500 text-[9px] font-bold text-white shadow-sm">
                  5
                </span>
              </button>
            )}

            {/* User Profile & Logout */}
            {onLogout && (
              <div className="ml-1 sm:ml-2 flex items-center gap-2 border-l border-purple-800/60 pl-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-violet-700 text-white font-bold text-xs shadow-md shadow-purple-600/30">
                  {user?.name ? user.name[0].toUpperCase() : 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-white leading-none">{user?.name || 'Amit Kumar'}</p>
                  <p className="text-[10px] text-purple-300 mt-0.5 leading-none">{user?.email || 'amit@railgo.in'}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="rounded-xl bg-white/10 p-2 text-purple-300 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                  title="Log out"
                >
                  <Icons.logout className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Navigation Options Grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2.5">
          {NAV_OPTIONS.map(({ id, label, icon, badge }) => {
            const isActive = activeTab === id;
            const IconSvg = Icons[icon as keyof typeof Icons];
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`group relative flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all hover:shadow-md ${
                  isActive
                    ? 'border-purple-400 bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                <div className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${
                  isActive ? 'bg-purple-500/50 text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
                }`}>
                  {IconSvg ? <IconSvg className="h-4 w-4" /> : null}
                </div>
                <span className="text-[11px] font-bold tracking-tight">{label}</span>
                {badge && badge > 0 ? (
                  <span className={`absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-bold ${
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