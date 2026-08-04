'use client';

import React, { useState, FormEvent } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { TrainList } from './components/TrainList';
import { TrainRouteModal } from './components/TrainRouteModal';
import { SeatMapModal } from './components/SeatMapModal';
import { BookingCheckout } from './components/BookingCheckout';
import { ETicketModal } from './components/ETicketModal';
import { PNRStatusView } from './components/PNRStatusView';
import { LiveStatusView } from './components/LiveStatusView';
import { MyTripsView } from './components/MyTripsView';
import { SupportModal } from './components/SupportModal';

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
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<'search' | 'pnr' | 'live' | 'trips' | 'support' | 'microservices' | 'station' | 'reviews'>('search');

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

  // User Trips Database State
  const [userTrips, setUserTrips] = useState<BookingTicket[]>(INITIAL_USER_TRIPS);

  // Filtered Trains Computation
  const filteredTrains = TRAINS_DATA.filter((t) => {
    const matchesFrom = t.fromCode === fromCode || fromCode === 'BCT';
    const matchesTo = t.toCode === toCode || toCode === 'NDLS';
    const matchesClass = classFilter === 'ALL' || t.classes.some((c) => c.code === classFilter);
    return matchesFrom && matchesTo && matchesClass;
  });

  const displayTrains = filteredTrains.length > 0 ? filteredTrains : TRAINS_DATA;

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setActiveTab('search');
  };

  const handleSelectTrain = (train: Train, travelClass: TrainClassInfo) => {
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

  const getStationCity = (code: string) => {
    return STATIONS.find((s) => s.code === code)?.city || code;
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripCount={userTrips.filter((t) => t.status === 'CONFIRMED').length}
        onOpenWallet={() => setShowWalletModal(true)}
        onOpenNotifications={() => setShowNotificationsDrawer(true)}
        onOpenAiAssistant={() => setShowAiAssistantModal((prev) => !prev)}
      />

      {/* AI Assistant Modal Bar */}
      {showAiAssistantModal && (
        <div className="border-b border-slate-800 bg-slate-950/90 py-4">
          <AITravelAssistant />
        </div>
      )}

      {/* SEARCH & TRAIN LISTING TAB */}
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

      {/* PNR STATUS TAB */}
      {activeTab === 'pnr' && (
        <PNRStatusView onOpenETicket={(t) => setViewTicket(t)} />
      )}

      {/* LIVE TRAIN STATUS TAB */}
      {activeTab === 'live' && <LiveStatusView />}

      {/* STATIONS AMENITIES TAB */}
      {activeTab === 'station' && <StationExplorer />}

      {/* REVIEWS & RATINGS TAB */}
      {activeTab === 'reviews' && <TrainReviews />}

      {/* 28 MICROSERVICES DASHBOARD TAB */}
      {activeTab === 'microservices' && <MicroservicesDashboard />}

      {/* MY TRIPS TAB */}
      {activeTab === 'trips' && (
        <MyTripsView
          trips={userTrips}
          onOpenETicket={(t) => setViewTicket(t)}
          onCancelTicket={handleCancelTicket}
        />
      )}

      {/* SUPPORT & FAQ TAB */}
      {activeTab === 'support' && <SupportModal />}

      {/* MODALS */}
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

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <div>
            <p className="font-bold text-slate-200">© 2026 RailGo IRCTC Express Services Inc.</p>
            <p className="text-[11px] text-slate-500">Official 28 microservices train ticket booking & status platform.</p>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <button onClick={() => setActiveTab('microservices')} className="hover:text-emerald-400">
              Microservices Mesh (28)
            </button>
            <button onClick={() => setActiveTab('support')} className="hover:text-indigo-400">
              IRCTC Rules
            </button>
            <button onClick={() => setActiveTab('support')} className="hover:text-indigo-400">
              Refund Terms
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
