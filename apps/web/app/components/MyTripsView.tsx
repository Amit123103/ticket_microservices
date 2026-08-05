'use client';

import React, { useState } from 'react';
import { Ticket, ArrowRight, XCircle, CheckCircle2, Eye, AlertTriangle, RefreshCw, ShieldCheck } from 'lucide-react';
import { BookingTicket } from '../data/trainData';

interface MyTripsViewProps {
  trips: BookingTicket[];
  onOpenETicket: (ticket: BookingTicket) => void;
  onCancelTicket: (pnr: string) => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({ trips, onOpenETicket, onCancelTicket }) => {
  const [confirmCancelPnr, setConfirmCancelPnr] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'cancelled'>('all');

  const filtered = trips.filter((t: BookingTicket) =>
    filter === 'all' ? true : filter === 'upcoming' ? t.status === 'CONFIRMED' : t.status === 'CANCELLED'
  );

  const selectedCancelTrip = trips.find((t) => t.pnr === confirmCancelPnr);

  const handleConfirmCancel = (pnr: string) => {
    onCancelTicket(pnr);
    setConfirmCancelPnr(null);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <div className="section-pill mb-3">
          <Ticket className="h-3.5 w-3.5" /> Booking Manager
        </div>
        <h2 className="text-3xl font-black text-slate-100 sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
          My Trips & Bookings
        </h2>
        <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>
          Manage your upcoming train journeys, view e-tickets and process instant cancellations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex justify-center gap-2">
        {(['all', 'upcoming', 'cancelled'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-5 py-2 text-xs font-bold capitalize transition ${
              filter === f
                ? 'btn-brand text-white shadow-lg'
                : 'btn-ghost text-slate-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Trips List */}
      <div className="space-y-5">
        {filtered.map((trip: BookingTicket) => (
          <article
            key={trip.pnr}
            className={`card-dark overflow-hidden transition-all duration-200 ${
              trip.status === 'CANCELLED'
                ? 'border-rose-500/30 bg-rose-950/10'
                : 'hover:border-indigo-500/50'
            }`}
          >
            {/* Trip Header Status */}
            <div
              className={`flex items-center justify-between px-6 py-3 border-b text-xs font-bold ${
                trip.status === 'CANCELLED'
                  ? 'bg-rose-900/20 border-rose-800/30'
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                {trip.status === 'CONFIRMED' ? (
                  <span className="badge-success flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> CONFIRMED
                  </span>
                ) : (
                  <span className="badge-danger flex items-center gap-1">
                    <XCircle className="h-3.5 w-3.5" /> CANCELLED
                  </span>
                )}
                <span className="text-slate-400 font-mono">Chart: {trip.chartStatus}</span>
              </div>
              <span className="font-mono text-indigo-300">PNR: {trip.pnr}</span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {trip.trainName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Train #{trip.trainNumber} • Departs: {trip.departureDate} • Class: {trip.travelClass}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-200 flex items-center gap-2">
                    <span>{trip.fromCity} ({trip.fromCode})</span>
                    <ArrowRight className="h-4 w-4 text-cyan-400" />
                    <span>{trip.toCity} ({trip.toCode})</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {trip.status === 'CONFIRMED' && (
                    <>
                      <button
                        onClick={() => onOpenETicket(trip)}
                        className="btn-brand px-4 py-2 text-xs flex items-center gap-1.5"
                      >
                        <Eye className="h-3.5 w-3.5" /> E-Ticket
                      </button>
                      <button
                        onClick={() => setConfirmCancelPnr(trip.pnr)}
                        className="btn-danger px-4 py-2 text-xs"
                      >
                        Cancel Ticket
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Passengers Breakdown */}
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs text-slate-400" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span>Passengers: <strong className="text-slate-200">{trip.passengers.length}</strong></span>
                <span>Fare Paid: <strong className="text-emerald-400">₹{trip.totalFare}</strong></span>
                <span>Payment: <strong className="text-slate-200">{trip.paymentMethod}</strong></span>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="card-dark p-12 text-center" style={{ color: '#64748b' }}>
            <p className="text-base font-bold">No trips found in this category.</p>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {selectedCancelTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="card-dark max-w-md w-full p-6 animate-fade-in-up border-rose-500/40">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-black text-slate-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Cancel Ticket & Request Refund?
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              You are cancelling <strong>{selectedCancelTrip.trainName}</strong> (PNR: {selectedCancelTrip.pnr}) for {selectedCancelTrip.passengers.length} passenger(s).
            </p>

            {/* Financial Breakdown */}
            <div className="rounded-xl p-4 mb-6 space-y-2 text-xs" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between text-slate-400">
                <span>Original Fare Paid:</span>
                <span className="font-bold text-slate-200">₹{selectedCancelTrip.totalFare}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>IRCTC Cancellation Clerkage (15%):</span>
                <span className="font-bold">-₹{Math.round(selectedCancelTrip.totalFare * 0.15)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span>Estimated Net Refund:</span>
                <span className="text-base">₹{Math.round(selectedCancelTrip.totalFare * 0.85)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-cyan-300 mb-6">
              <RefreshCw className="h-3.5 w-3.5" /> Refund will land back in your {selectedCancelTrip.paymentMethod} in 3-5 days.
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmCancelPnr(null)}
                className="btn-ghost px-4 py-2 text-xs"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleConfirmCancel(selectedCancelTrip.pnr)}
                className="btn-danger px-5 py-2 text-xs font-bold"
              >
                Yes, Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
