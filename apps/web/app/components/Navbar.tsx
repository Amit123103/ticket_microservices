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
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-lg shadow-indigo-500/25">
            <Train className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <strong className="text-xl font-bold tracking-tight text-white">RailGo</strong>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/30">
                28 MICROSERVICES
              </span>
            </div>
            <p className="text-xs font-medium text-slate-400">IRCTC NextGen Mesh Platform</p>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1 xl:flex">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'search'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>

          <button
            onClick={() => setActiveTab('pnr')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'pnr'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Ticket className="h-4 w-4" />
            <span>PNR Status</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'live'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Live Status</span>
          </button>

          <button
            onClick={() => setActiveTab('station')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'station'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Building2 className="h-4 w-4 text-sky-400" />
            <span>Stations</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'reviews'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Star className="h-4 w-4 text-amber-400" />
            <span>Reviews</span>
          </button>

          <button
            onClick={() => setActiveTab('microservices')}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'microservices'
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Activity className="h-4 w-4 text-emerald-400" />
            <span>Services (28)</span>
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              activeTab === 'trips'
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Trips</span>
            {tripCount > 0 && (
              <span className="grid h-4 min-w-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950">
                {tripCount}
              </span>
            )}
          </button>
        </nav>

        {/* User Actions Bar */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-600/20 px-3 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-600/30"
          >
            <Bot className="h-4 w-4 text-indigo-400" />
            <span className="hidden sm:inline">RailAI</span>
          </button>

          {/* Wallet */}
          <button
            onClick={onOpenWallet}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20"
          >
            <Wallet className="h-4 w-4 text-emerald-400" />
            <span>₹2,500</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500"></span>
          </button>
        </div>

      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="flex xl:hidden border-t border-slate-800 bg-slate-950 px-2 py-1 justify-around overflow-x-auto">
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
            activeTab === 'search' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
        <button
          onClick={() => setActiveTab('pnr')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
            activeTab === 'pnr' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Ticket className="h-4 w-4" />
          <span>PNR</span>
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
            activeTab === 'live' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Radio className="h-4 w-4 text-emerald-400" />
          <span>Live</span>
        </button>
        <button
          onClick={() => setActiveTab('station')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
            activeTab === 'station' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <Building2 className="h-4 w-4 text-sky-400" />
          <span>Stations</span>
        </button>
        <button
          onClick={() => setActiveTab('microservices')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
            activeTab === 'microservices' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Activity className="h-4 w-4 text-emerald-400" />
          <span>Services</span>
        </button>
        <button
          onClick={() => setActiveTab('trips')}
          className={`flex flex-col items-center gap-1 p-2 text-[10px] font-bold ${
            activeTab === 'trips' ? 'text-indigo-400' : 'text-slate-400'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Trips</span>
        </button>
      </div>
    </header>
  );
};
