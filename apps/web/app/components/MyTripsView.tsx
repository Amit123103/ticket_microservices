'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
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
          <Icons.ticket className="h-3.5 w-3.5" /> Booking Manager
        </div>
        <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
          My Trips & Bookings
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Manage your upcoming train journeys, view e-tickets and process instant cancellations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex justify-center gap-2">
        {(['all', 'upcoming', 'cancelled'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold capitalize transition-all ${
              filter === f
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-white text-stone-500 border border-stone-200 hover:border-purple-300 hover:text-purple-700'
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
            className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
              trip.status === 'CANCELLED'
                ? 'border-red-200 bg-red-50/30'
                : 'border-stone-200 hover:border-purple-200 hover:shadow-lg hover:shadow-stone-200/40'
            }`}
          >
            {/* Trip Header Status */}
            <div
              className={`flex flex-wrap items-center justify-between px-6 py-3 border-b text-xs font-bold ${
                trip.status === 'CANCELLED'
                  ? 'bg-red-50 border-red-100'
                  : 'bg-stone-50/80 border-stone-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {trip.status === 'CONFIRMED' ? (
                  <span className="badge-success inline-flex items-center gap-1.5">
                    <Icons.check className="h-3.5 w-3.5" /> CONFIRMED
                  </span>
                ) : (
                  <span className="badge-danger inline-flex items-center gap-1.5">
                    <Icons.x className="h-3.5 w-3.5" /> CANCELLED
                  </span>
                )}
                <span className="text-stone-400 font-mono text-[11px]">Chart: {trip.chartStatus}</span>
              </div>
              <span className="font-mono text-purple-600 text-xs">PNR: {trip.pnr}</span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {trip.trainName}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Train #{trip.trainNumber} • Departs: {trip.departureDate} • Class: {trip.travelClass}
                  </p>
                  <p className="mt-2.5 text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <span>{trip.fromCity} ({trip.fromCode})</span>
                    <Icons.arrowRight className="h-4 w-4 text-purple-600" />
                    <span>{trip.toCity} ({trip.toCode})</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {trip.status === 'CONFIRMED' && (
                    <>
                      <button
                        onClick={() => onOpenETicket(trip)}
                        className="btn-brand px-4 py-2.5 text-xs flex items-center gap-1.5"
                      >
                        <Icons.eye className="h-3.5 w-3.5" /> E-Ticket
                      </button>
                      <button
                        onClick={() => setConfirmCancelPnr(trip.pnr)}
                        className="btn-danger px-4 py-2.5 text-xs"
                      >
                        Cancel Ticket
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Passengers Breakdown */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap gap-4 text-xs text-stone-500">
                <span>Passengers: <strong className="text-stone-700">{trip.passengers.length}</strong></span>
                <span>Fare Paid: <strong className="text-emerald-600">₹{trip.totalFare}</strong></span>
                <span>Payment: <strong className="text-stone-700">{trip.paymentMethod}</strong></span>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-base font-bold text-stone-500">No trips found in this category.</p>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {selectedCancelTrip && (
        <div className="modal-overlay">
          <div className="rounded-3xl border border-red-200 bg-white p-6 animate-scale-in max-w-md w-full shadow-2xl shadow-red-200/30">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <Icons.alertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Cancel Ticket & Request Refund?
              </h3>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed mb-5">
              You are cancelling <strong>{selectedCancelTrip.trainName}</strong> (PNR: {selectedCancelTrip.pnr}) for {selectedCancelTrip.passengers.length} passenger(s).
            </p>

            {/* Financial Breakdown */}
            <div className="rounded-xl p-5 mb-5 space-y-3 text-sm bg-stone-50 border border-stone-200">
              <div className="flex justify-between text-stone-600">
                <span>Original Fare Paid:</span>
                <span className="font-bold text-stone-800">₹{selectedCancelTrip.totalFare}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>IRCTC Cancellation Clerkage (15%):</span>
                <span className="font-bold">-₹{Math.round(selectedCancelTrip.totalFare * 0.15)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 font-bold text-stone-900 text-base">
                <span>Estimated Net Refund:</span>
                <span className="text-emerald-600">₹{Math.round(selectedCancelTrip.totalFare * 0.85)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-indigo-600 mb-6">
              <Icons.refresh className="h-3.5 w-3.5" /> Refund will land back in your {selectedCancelTrip.paymentMethod} in 3-5 days.
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmCancelPnr(null)}
                className="btn-ghost px-4 py-2.5 text-xs"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleConfirmCancel(selectedCancelTrip.pnr)}
                className="btn-danger px-5 py-2.5 text-xs font-bold"
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
