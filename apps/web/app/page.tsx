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
import { StationExplorer } from './components/StationExplorer';
import { TrainReviews } from './components/TrainReviews';
import { ECateringModal } from './components/ECateringModal';
import { WalletModal } from './components/WalletModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { AITravelAssistant } from './components/AITravelAssistant';

import {
  TRAINS_DATA,
  INITIAL_USER_TRIPS,
  getTrainsForRoute,
  Train,
  TrainClassInfo,
  BookingTicket,
} from './data/trainData';

const SESSION_STORAGE_KEY = 'railgo_user_session_v1';
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

interface SavedUserSession {
  user: { name: string; email: string; avatar: string };
  loginTime: number;
}

export default function Page() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(false);

  // Navigation Tab State (Default to 'microservices' grid dashboard upon login)
  const [activeTab, setActiveTabState] = useState<NavTab>('microservices');

  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.pushState({ tab }, '', url.toString());
    }
  };

  // 1. PERSISTENT AUTH SESSION & GOOGLE OAUTH URL PARAMETER DETECTOR
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const authStatus = urlParams.get('auth');
        const urlEmail = urlParams.get('email');
        const urlName = urlParams.get('name');

        // Handle Google OAuth return redirect ?auth=success
        if (authStatus === 'success' && urlEmail) {
          const formattedName = urlName || urlEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          const loggedUser = {
            name: formattedName,
            email: urlEmail,
            avatar: (formattedName[0] || 'U').toUpperCase(),
          };

          const sessionData: SavedUserSession = {
            user: loggedUser,
            loginTime: Date.now(),
          };

          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
          setUser(loggedUser);
          setIsLoggedIn(true);
          setShowLandingPage(false);
          setShowAuthModal(false);
          setActiveTabState('search');

          // Redirect URL to ?tab=search#special-panel
          const targetUrl = `${window.location.pathname}?tab=search#special-panel`;
          window.history.replaceState(null, '', targetUrl);
          return;
        }

        // Check active localStorage session
        const rawSession = localStorage.getItem(SESSION_STORAGE_KEY);
        if (rawSession) {
          const session: SavedUserSession = JSON.parse(rawSession);
          const now = Date.now();
          const elapsed = now - session.loginTime;

          if (elapsed < TWENTY_FOUR_HOURS_MS) {
            setUser(session.user);
            setIsLoggedIn(true);
            setShowLandingPage(false);
            setActiveTabState('microservices');
          } else {
            localStorage.removeItem(SESSION_STORAGE_KEY);
            setIsLoggedIn(false);
            setUser(null);
            setShowLandingPage(true);
            setSessionExpiredNotice(true);
          }
        }
      } catch (err) {
        console.error('Session restoration error:', err);
      }
    }
  }, []);

  // 2. BROWSER HISTORY POPSTATE LISTENER
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const validTabs: NavTab[] = [
        'search', 'pnr', 'live', 'trips', 'payments',
        'refunds', 'help', 'station', 'reviews', 'microservices'
      ];

      const syncTabFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab') as NavTab;
        if (tabParam && validTabs.includes(tabParam)) {
          setActiveTabState(tabParam);
        }
      };

      syncTabFromUrl();

      const handlePopState = () => {
        syncTabFromUrl();
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

  // Dynamic Route Solver
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

  const handleSelectTrain = (train: Train, selectedClass: TrainClassInfo) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setSeatTrainInfo({ train, travelClass: selectedClass });
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
    setSessionExpiredNotice(false);
    setActiveTabState('search');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `${window.location.pathname}?tab=search#special-panel`);
    }

    try {
      const sessionData: SavedUserSession = {
        user: loggedInUser,
        loginTime: Date.now(),
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (err) {
      console.error('Session saving error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setIsLoggedIn(false);
    setUser(null);
    setShowLandingPage(true);
    setActiveTabState('search');
  };

  // Render Public Landing Page ONLY when not logged in
  if (showLandingPage && !isLoggedIn) {
    return (
      <>
        <LandingPage
          onLogin={() => setShowAuthModal(true)}
        />

        {/* Auth Modal Overlay */}
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleLoginSuccess}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Session Expired Banner Notification */}
      {sessionExpiredNotice && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-2.5 text-center text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2 animate-fade-in">
          <span>Your 24-hour session expired for security reasons. Please sign in again.</span>
          <button
            onClick={() => setSessionExpiredNotice(false)}
            className="rounded bg-white/20 px-2 py-0.5 hover:bg-white/30 text-white font-black"
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary Top Header Navigation Bar */}
      <PageNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripCount={userTrips.length}
        user={user}
        onOpenWallet={() => setShowWalletModal(true)}
        onOpenNotifications={() => setShowNotificationsDrawer(true)}
        onOpenECatering={() => setShowECateringModal(true)}
        onOpenAiAssistant={() => setShowAiAssistantModal(true)}
        onLogout={handleLogout}
        onGoHome={() => setActiveTab('search')}
      />

      {/* Main Content Router */}
      <main className="flex-1 pb-16">
        {activeTab === 'search' && (
          <div>
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
                fromCity={fromCode}
                toCity={toCode}
                travelDate={travelDate}
                quota={quota}
                passengerCount={passengerCount}
                onSelectTrain={handleSelectTrain}
                onViewRoute={(train) => setRouteTrain(train)}
                onOpenECatering={() => setShowECateringModal(true)}
              />
            )}
          </div>
        )}

        {activeTab === 'microservices' && (
          <MicroservicesDashboard />
        )}
        {activeTab === 'pnr' && (
          <PNRStatusView onOpenETicket={(t) => setViewTicket(t)} />
        )}
        {activeTab === 'live' && <LiveStatusView />}
        {activeTab === 'trips' && (
          <MyTripsView
            trips={userTrips}
            onOpenETicket={(t) => setViewTicket(t)}
            onCancelTicket={handleCancelTicket}
          />
        )}
        {activeTab === 'payments' && <PaymentHistoryView />}
        {activeTab === 'refunds' && <RefundHistoryView />}
        {activeTab === 'help' && <HelpChatView />}
        {activeTab === 'station' && <StationExplorer />}
        {activeTab === 'reviews' && (
          <TrainReviews
            train={TRAINS_DATA[0]}
            onClose={() => setActiveTab('search')}
          />
        )}
      </main>

      {/* Global Modals */}
      {routeTrain && (
        <TrainRouteModal
          train={routeTrain}
          onClose={() => setRouteTrain(null)}
        />
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
        <ETicketModal
          ticket={viewTicket}
          onClose={() => setViewTicket(null)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLoginSuccess}
        />
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

      {showAiAssistantModal && (
        <AITravelAssistant onClose={() => setShowAiAssistantModal(false)} />
      )}
    </div>
  );
}
