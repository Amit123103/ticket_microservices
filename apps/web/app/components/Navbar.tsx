'use client';

import React, { useState } from 'react';
import { Train, Search, Ticket, Radio, User, Wallet, Bell, Activity, Bot, Building2, Star, CreditCard, RefreshCw, HelpCircle, LogOut, LogIn, Menu, X } from 'lucide-react';

export type NavTab =
  | 'search'
  | 'pnr'
  | 'live'
  | 'trips'
  | 'payments'
  | 'refunds'
  | 'help'
  | 'microservices'
  | 'station'
  | 'reviews';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  tripCount: number;
  isLoggedIn: boolean;
  user: { name: string; email: string; avatar: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenWallet: () => void;
  onOpenNotifications: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  tripCount,
  isLoggedIn,
  user,
  onOpenAuth,
  onLogout,
  onOpenWallet,
  onOpenNotifications,
  onOpenAiAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id: 'search' as const, label: 'Search', Icon: Search },
    { id: 'pnr' as const, label: 'PNR Status', Icon: Ticket },
    { id: 'live' as const, label: 'Live Status', Icon: Radio },
    { id: 'trips' as const, label: 'My Trips', Icon: User, badge: tripCount },
    { id: 'payments' as const, label: 'Payments', Icon: CreditCard },
    { id: 'refunds' as const, label: 'Refunds', Icon: RefreshCw },
    { id: 'help' as const, label: 'Help & Chat', Icon: HelpCircle },
    { id: 'station' as const, label: 'Stations', Icon: Building2 },
    { id: 'reviews' as const, label: 'Reviews', Icon: Star },
    { id: 'microservices' as const, label: 'Services (28)', Icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 text-white shadow-lg transition-transform group-hover:scale-105" style={{ boxShadow: '0 4px 14px rgba(249,115,22,0.35)' }}>
            <Train className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <strong className="text-xl font-black tracking-tight text-slate-100" style={{ fontFamily: 'Outfit, sans-serif' }}>RailGo</strong>
              <span className="badge-brand text-[10px]">28 MESH</span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400">IRCTC Partner</p>
          </div>
        </button>

        {/* Desktop Navigation Links — Scrollable / Flex container to fit ALL 10 tabs perfectly without squishing */}
        <nav className="hidden items-center gap-1 lg:flex overflow-x-auto py-1 px-2 no-scrollbar">
          {NAV_ITEMS.map(({ id, label, Icon, badge }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 to-purple-600/20 text-orange-400 border border-orange-500/40 shadow-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-orange-400' : ''}`} />
                <span>{label}</span>
                {badge && badge > 0 ? (
                  <span className="grid h-4 min-w-4 place-items-center rounded-sm bg-purple-600 text-[10px] font-bold text-white px-1">
                    {badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="hidden sm:flex items-center gap-1.5 rounded-md border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-300 hover:bg-purple-500/20 transition"
          >
            <Bot className="h-4 w-4 text-purple-400" />
            <span>RailAI</span>
          </button>

          {/* Wallet Button */}
          <button
            onClick={onOpenWallet}
            className="flex items-center gap-1.5 rounded-md border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-400 hover:bg-orange-500/20 transition"
          >
            <Wallet className="h-4 w-4 text-orange-400" />
            <span>₹2,500</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative rounded-md border border-white/10 bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          </button>

          {/* User Auth / Profile */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-orange-500 to-purple-600 font-bold text-xs text-white shadow">
                {user.avatar}
              </div>
              <button
                onClick={onLogout}
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-rose-400 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-brand text-xs px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Log in</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t p-4 space-y-2 glass animate-fade-in" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 rounded-md p-2.5 text-xs font-bold ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
