'use client';

import React, { useState, FormEvent } from 'react';
import { Navbar, NavTab } from './components/Navbar';
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

  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<NavTab>('search');

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

  // Filtered Trains
  const filteredTrains = TRAINS_DATA.filter((t) => {
    const matchesFrom = t.fromCode === fromCode || fromCode === 'BCT';
    const matchesTo = t.toCode === toCode || toCode === 'NDLS';
    const matchesClass = classFilter === 'ALL' || t.classes.some((c) => c.code === classFilter);
    return matchesFrom && matchesTo && matchesClass;
  });

  const displayTrains = filteredTrains.length > 0 ? filteredTrains : TRAINS_DATA;

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setHasSearched(true);
    setActiveTab('search');
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
      <main className="min-h-screen bg-white text-slate-900" style={{ background: '#ffffff' }}>
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
    <main className="min-h-screen antialiased selection:bg-orange-500 selection:text-white bg-white text-slate-900" style={{ background: '#ffffff', color: '#0f172a' }}>
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripCount={userTrips.filter((t) => t.status === 'CONFIRMED').length}
        isLoggedIn={isLoggedIn}
        user={user}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onOpenWallet={() => setShowWalletModal(true)}
        onOpenNotifications={() => setShowNotificationsDrawer(true)}
        onOpenAiAssistant={() => setShowAiAssistantModal((prev) => !prev)}
      />

      {/* AI Assistant Drawer Header */}
      {showAiAssistantModal && (
        <div className="border-b py-4 glass-brand animate-fade-in" style={{ borderColor: 'rgba(99,102,241,0.25)' }}>
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
      {activeTab === 'reviews' && <TrainReviews />}

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
      <footer className="mt-20 border-t py-12 text-xs" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(15,23,36,0.6)' }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <div>
            <p className="font-bold text-slate-200" style={{ fontFamily: 'Outfit, sans-serif' }}>
              © 2026 RailGo IRCTC Express Services Inc.
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: '#64748b' }}>
              Official 28 microservices train ticket booking & status platform.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-semibold" style={{ color: '#94a3b8' }}>
            <button onClick={() => setShowLandingPage(true)} className="hover:text-indigo-400 transition">
              Landing Overview
            </button>
            <button onClick={() => setActiveTab('microservices')} className="hover:text-indigo-400 transition">
              Microservices Mesh (28)
            </button>
            <button onClick={() => setActiveTab('payments')} className="hover:text-indigo-400 transition">
              Payments
            </button>
            <button onClick={() => setActiveTab('refunds')} className="hover:text-indigo-400 transition">
              Refunds
            </button>
            <button onClick={() => setActiveTab('help')} className="hover:text-indigo-400 transition">
              Help & Chat
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
