'use client';

import React from 'react';
import { Train, Search, Ticket, Radio, User, Wallet, HelpCircle, Bell, Activity, Bot, Building2, Star } from 'lucide-react';

interface NavbarProps {
  activeTab: 'search' | 'pnr' | 'live' | 'trips' | 'support' | 'microservices' | 'station' | 'reviews';
  setActiveTab: (tab: 'search' | 'pnr' | 'live' | 'trips' | 'support' | 'microservices' | 'station' | 'reviews') => void;
  tripCount: number;
  onOpenWallet: () => void;
  onOpenNotifications: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  tripCount,
  onOpenWallet,
  onOpenNotifications,
  onOpenAiAssistant,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
          <button
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-lg shadow-emerald-500/25">
            <Train className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <strong className="text-xl font-bold tracking-tight text-slate-900">RailGo</strong>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                28 SERVICES
              </span>
            </div>
            <p className="text-xs font-medium text-slate-400">IRCTC NextGen Platform</p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1 xl:flex">
          {[
            { id: 'search' as const, label: 'Search', Icon: Search },
            { id: 'pnr' as const, label: 'PNR Status', Icon: Ticket },
            { id: 'live' as const, label: 'Live Status', Icon: Radio },
            { id: 'station' as const, label: 'Stations', Icon: Building2 },
            { id: 'reviews' as const, label: 'Reviews', Icon: Star },
            { id: 'microservices' as const, label: 'Services (28)', Icon: Activity },
            { id: 'trips' as const, label: 'Trips', Icon: User },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                activeTab === id
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className={`h-4 w-4 ${activeTab === id ? 'text-emerald-600' : ''}`} />
              <span>{label}</span>
              {id === 'trips' && tripCount > 0 && (
                <span className="grid h-4 min-w-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                  {tripCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            <Bot className="h-4 w-4 text-emerald-600" />
            <span className="hidden sm:inline">RailAI</span>
          </button>

          <button
            onClick={onOpenWallet}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            <Wallet className="h-4 w-4 text-emerald-600" />
            <span>₹2,500</span>
          </button>

          <button
            onClick={onOpenNotifications}
            className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 hover:text-emerald-600"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="flex xl:hidden border-t border-slate-100 bg-white px-2 py-1 justify-around overflow-x-auto">
        {[
          { id: 'search' as const, label: 'Search', Icon: Search },
          { id: 'pnr' as const, label: 'PNR', Icon: Ticket },
          { id: 'live' as const, label: 'Live', Icon: Radio },
          { id: 'station' as const, label: 'Stations', Icon: Building2 },
          { id: 'microservices' as const, label: 'Services', Icon: Activity },
          { id: 'trips' as const, label: 'Trips', Icon: User },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
              activeTab === id ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
