'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { PageNavbar, NavTab } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { HeroSearch } from './components/HeroSearch';
import { TrainList } from './components/TrainList';
import { TrainRouteModal } from './components/TrainRouteModal';
import { SeatMapModal } from './components/SeatMapModal';
import { BookingCheckout } from './components/BookingCheckout';
import { ETicketModal } from './components/ETicketModal';
import { PNRStatusView } from './components/PNRStatusView';
import { LiveStatusView } from './components/LiveStatusView';
import { MyTripsView } from './components/MyTripsView';
import { PaymentHistoryView } from './components/PaymentHistoryView';
import { RefundHistoryView } from './components/RefundHistoryView';
import { HelpChatView } from './components/HelpChatView';
import { MicroservicesDashboard } from './components/MicroservicesDashboard';
import { AITravelAssistant } from './components/AITravelAssistant';
import { StationExplorer } from './components/StationExplorer';
import { TrainReviews } from './components/TrainReviews';
import { ECateringModal } from './components/ECateringModal';
import { WalletModal } from './components/WalletModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';

import {
  TRAINS_DATA,
  STATIONS,
  INITIAL_USER_TRIPS,
  getTrainsForRoute,
  Train,
  TrainClassInfo,
  BookingTicket,
} from './data/trainData';

export default function Page() {
  // Auth State — DEFAULT TO NOT LOGGED IN SO LANDING PAGE OPENS FIRST!
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);

  // Navigation Tab State with URL query sync
  const [activeTab, setActiveTabState] = useState<NavTab>('search');

  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.pushState({}, '', url.toString());
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as NavTab;
      const validTabs: NavTab[] = [
        'search', 'pnr', 'live', 'trips', 'payments',
        'refunds', 'help', 'station', 'reviews', 'microservices'
      ];
      if (tabParam && validTabs.includes(tabParam)) {
        setActiveTabState(tabParam);
      }

      const handlePopState = () => {
        const p = new URLSearchParams(window.location.search);
        const t = p.get('tab') as NavTab;
        if (t && validTabs.includes(t)) {
          setActiveTabState(t);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  // Search Engine Form State
  const [fromCode, setFromCode] = useState('BCT');
  const [toCode, setToCode] = useState('NDLS');
  const [travelDate, setTravelDate] = useState('2026-08-15');
  const [passengerCount, setPassengerCount] = useState(1);
  const [quota, setQuota] = useState('General');
  const [classFilter, setClassFilter] = useState('ALL');
  const [hasSearched, setHasSearched] = useState(true);

  // Active Modals State
  const [routeTrain, setRouteTrain] = useState<Train | null>(null);
  const [seatTrainInfo, setSeatTrainInfo] = useState<{ train: Train; travelClass: TrainClassInfo } | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [checkoutInfo, setCheckoutInfo] = useState<{ train: Train; travelClass: TrainClassInfo } | null>(null);
  const [viewTicket, setViewTicket] = useState<BookingTicket | null>(null);

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [showECateringModal, setShowECateringModal] = useState(false);
  const [showAiAssistantModal, setShowAiAssistantModal] = useState(false);

  // User Trips State
  const [userTrips, setUserTrips] = useState<BookingTicket[]>(INITIAL_USER_TRIPS);

  // Dynamic Route Solver — 100% working train search for ALL station pairs
  const displayTrains = getTrainsForRoute(fromCode, toCode, classFilter);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setHasSearched(true);
    setActiveTab('search');
    setTimeout(() => {
      const trainListEl = document.getElementById('train-list-section');
      if (trainListEl) {
        trainListEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectTrain = (train: Train, travelClass: TrainClassInfo) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setSeatTrainInfo({ train, travelClass });
  };

  const handleConfirmSeats = (seats: string[]) => {
    setSelectedSeats(seats);
    if (seatTrainInfo) {
      setCheckoutInfo({ train: seatTrainInfo.train, travelClass: seatTrainInfo.travelClass });
      setSeatTrainInfo(null);
    }
  };

  const handleBookingSuccess = (newTicket: BookingTicket) => {
    setUserTrips([newTicket, ...userTrips]);
    setCheckoutInfo(null);
    setViewTicket(newTicket);
    setActiveTab('trips');
  };

  const handleCancelTicket = (pnr: string) => {
    setUserTrips((prev) =>
      prev.map((t) => (t.pnr === pnr ? { ...t, status: 'CANCELLED' } : t))
    );
  };

  const handleLoginSuccess = (loggedInUser: { name: string; email: string; avatar: string }) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setShowLandingPage(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setShowLandingPage(true);
  };

  const getStationCity = (code: string) => {
    return STATIONS.find((s) => s.code === code)?.city || code;
  };

  // IF NOT LOGGED IN OR LANDING PAGE IS ACTIVE -> RENDER LANDING PAGE FIRST!
  if (showLandingPage || !isLoggedIn) {
    return (
      <main className="min-h-screen bg-white text-stone-900">
        <LandingPage
          onLogin={() => setShowAuthModal(true)}
        />

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleLoginSuccess}
          />
        )}
      </main>
    );
  }

  // ONCE LOGGED IN -> RENDER FULL APP & TICKET BOOKING DASHBOARD
  return (
    <main className="min-h-screen antialiased selection:bg-purple-500 selection:text-white bg-purple-900/10 text-white">
      {/* Top Header & Navigation Options */}
      <PageNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripCount={userTrips.filter((t) => t.status === 'CONFIRMED').length}
        user={user}
        onOpenWallet={() => setShowWalletModal(true)}
        onOpenNotifications={() => setShowNotificationsDrawer(true)}
        onOpenECatering={() => setShowECateringModal(true)}
        onOpenAiAssistant={() => setShowAiAssistantModal(true)}
        onLogout={handleLogout}
        onGoHome={() => setActiveTab('search')}
      />

      {/* AI Assistant Drawer Header */}
      {showAiAssistantModal && (
        <div className="border-b border-stone-200 bg-white/90 backdrop-blur-xl">
          <AITravelAssistant />
        </div>
      )}

      {/* VIEW 1: SEARCH & TRAIN LISTING */}
      {activeTab === 'search' && (
        <>
          <HeroSearch
            fromCode={fromCode}
            setFromCode={setFromCode}
            toCode={toCode}
            setToCode={setToCode}
            travelDate={travelDate}
            setTravelDate={setTravelDate}
            passengerCount={passengerCount}
            setPassengerCount={setPassengerCount}
            quota={quota}
            setQuota={setQuota}
            classFilter={classFilter}
            setClassFilter={setClassFilter}
            onSearch={handleSearchSubmit}
          />

          {hasSearched && (
            <TrainList
              trains={displayTrains}
              fromCity={getStationCity(fromCode)}
              toCity={getStationCity(toCode)}
              travelDate={travelDate}
              quota={quota}
              passengerCount={passengerCount}
              onSelectTrain={handleSelectTrain}
              onViewRoute={(t) => setRouteTrain(t)}
              onOpenECatering={() => setShowECateringModal(true)}
            />
          )}
        </>
      )}

      {/* VIEW 2: PNR STATUS */}
      {activeTab === 'pnr' && (
        <PNRStatusView onOpenETicket={(t) => setViewTicket(t)} />
      )}

      {/* VIEW 3: LIVE TRAIN TRACKING */}
      {activeTab === 'live' && <LiveStatusView />}

      {/* VIEW 4: MY TRIPS & BOOKING MANAGER */}
      {activeTab === 'trips' && (
        <MyTripsView
          trips={userTrips}
          onOpenETicket={(t) => setViewTicket(t)}
          onCancelTicket={handleCancelTicket}
        />
      )}

      {/* VIEW 5: PAYMENT HISTORY */}
      {activeTab === 'payments' && <PaymentHistoryView />}

      {/* VIEW 6: REFUND HISTORY */}
      {activeTab === 'refunds' && <RefundHistoryView />}

      {/* VIEW 7: HELP & LIVE CHAT */}
      {activeTab === 'help' && <HelpChatView />}

      {/* VIEW 8: STATIONS EXPLORER */}
      {activeTab === 'station' && <StationExplorer />}

      {/* VIEW 9: REVIEWS */}
      {activeTab === 'reviews' && <TrainReviews train={displayTrains[0] || TRAINS_DATA[0]} onClose={() => {}} />}

      {/* VIEW 10: 28 MICROSERVICES DASHBOARD */}
      {activeTab === 'microservices' && <MicroservicesDashboard />}

      {/* MODALS */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {routeTrain && (
        <TrainRouteModal train={routeTrain} onClose={() => setRouteTrain(null)} />
      )}

      {seatTrainInfo && (
        <SeatMapModal
          train={seatTrainInfo.train}
          travelClass={seatTrainInfo.travelClass}
          passengerCount={passengerCount}
          onClose={() => setSeatTrainInfo(null)}
          onConfirmSeats={handleConfirmSeats}
        />
      )}

      {checkoutInfo && (
        <BookingCheckout
          train={checkoutInfo.train}
          selectedClass={checkoutInfo.travelClass}
          passengerCount={passengerCount}
          selectedSeats={selectedSeats}
          travelDate={travelDate}
          quota={quota}
          onClose={() => setCheckoutInfo(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {viewTicket && (
        <ETicketModal ticket={viewTicket} onClose={() => setViewTicket(null)} />
      )}

      {showWalletModal && (
        <WalletModal onClose={() => setShowWalletModal(false)} />
      )}

      {showNotificationsDrawer && (
        <NotificationsDrawer onClose={() => setShowNotificationsDrawer(false)} />
      )}

      {showECateringModal && (
        <ECateringModal onClose={() => setShowECateringModal(false)} />
      )}

      {/* Global Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <div>
            <p className="font-bold text-stone-800" style={{ fontFamily: 'Outfit, sans-serif' }}>
              © 2026 RailGo IRCTC Express Services Inc.
            </p>
            <p className="text-xs text-stone-400 mt-1">
              Official 28 microservices train ticket booking & status platform.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-stone-500">
            <button onClick={() => setShowLandingPage(true)} className="hover:text-purple-600 transition-colors">
              Landing Overview
            </button>
            <button onClick={() => setActiveTab('microservices')} className="hover:text-purple-600 transition-colors">
              Microservices Mesh (28)
            </button>
            <button onClick={() => setActiveTab('payments')} className="hover:text-purple-600 transition-colors">
              Payments
            </button>
            <button onClick={() => setActiveTab('refunds')} className="hover:text-purple-600 transition-colors">
              Refunds
            </button>
            <button onClick={() => setActiveTab('help')} className="hover:text-purple-600 transition-colors">
              Help & Chat
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
