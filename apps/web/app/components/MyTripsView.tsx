'use client';

import React, { useState } from 'react';
import { User, Ticket, Calendar, X, AlertTriangle, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { BookingTicket } from '../data/trainData';

interface MyTripsViewProps {
  trips: BookingTicket[];
  onOpenETicket: (ticket: BookingTicket) => void;
  onCancelTicket: (pnr: string) => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({ trips, onOpenETicket, onCancelTicket }) => {
  const [cancellingTicket, setCancellingTicket] = useState<BookingTicket | null>(null);

  const activeTrips = trips.filter((t) => t.status === 'CONFIRMED');
  const cancelledTrips = trips.filter((t) => t.status === 'CANCELLED');

  const handleConfirmCancel = () => {
    if (cancellingTicket) {
      onCancelTicket(cancellingTicket.pnr);
      setCancellingTicket(null);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-extrabold text-white">My Trips & Bookings</h2>
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/30">
              {trips.length} Bookings
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            View active e-tickets, download PDFs, and manage instant ticket cancellations.
          </p>
        </div>
      </div>

      {/* Trips Grid */}
      <div className="space-y-6">
        {trips.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <Ticket className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-white">No Bookings Found</h3>
            <p className="text-xs text-slate-400 mt-1">Book your first train ticket to see your trips here.</p>
          </div>
        ) : (
          trips.map((ticket) => (
            <article
              key={ticket.pnr}
              className={`rounded-3xl border p-6 transition-all ${
                ticket.status === 'CANCELLED'
                  ? 'border-slate-800/80 bg-slate-950/40 opacity-75'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-extrabold text-white text-lg">{ticket.trainName}</h3>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-bold text-slate-300">
                      #{ticket.trainNumber}
                    </span>
                    {ticket.status === 'CONFIRMED' ? (
                      <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                        CONFIRMED
                      </span>
                    ) : (
                      <span className="rounded-full bg-rose-500/20 px-3 py-0.5 text-xs font-bold text-rose-400 border border-rose-500/30">
                        CANCELLED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    PNR: <strong className="font-mono text-indigo-400">{ticket.pnr}</strong> • Booking ID: {ticket.bookingId}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">Total Fare</span>
                  <strong className="block text-xl font-black text-white">
                    ₹{ticket.totalFare.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              {/* Journey Details */}
              <div className="my-5 grid gap-4 sm:grid-cols-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">From</span>
                  <p className="font-bold text-white text-sm">{ticket.fromCity} ({ticket.fromCode})</p>
                  <p className="text-xs text-slate-400">Dep: {ticket.departureTime}</p>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Journey Date</span>
                  <p className="font-bold text-indigo-400 text-sm">{ticket.departureDate}</p>
                  <p className="text-xs text-slate-400">Class: {ticket.travelClass}</p>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">To</span>
                  <p className="font-bold text-white text-sm">{ticket.toCity} ({ticket.toCode})</p>
                  <p className="text-xs text-slate-400">Arr: {ticket.arrivalTime}</p>
                </div>
              </div>

              {/* Passenger Summary & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <User className="h-4 w-4 text-indigo-400" />
                  <span>
                    {ticket.passengers.length} Passenger{ticket.passengers.length > 1 ? 's' : ''}:{' '}
                    {ticket.passengers.map((p) => p.name).join(', ')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {ticket.status === 'CONFIRMED' && (
                    <button
                      onClick={() => setCancellingTicket(ticket)}
                      className="rounded-xl border border-rose-800/50 bg-rose-950/30 px-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-900/50"
                    >
                      Cancel Ticket
                    </button>
                  )}

                  <button
                    onClick={() => onOpenETicket(ticket)}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    <Ticket className="h-4 w-4" />
                    <span>View E-Ticket</span>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Cancellation Modal */}
      {cancellingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <AlertTriangle className="h-5 w-5" />
                <span>Confirm Ticket Cancellation</span>
              </div>
              <button
                onClick={() => setCancellingTicket(null)}
                className="rounded-full bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <p className="text-sm text-slate-300">
                Are you sure you want to cancel ticket for PNR <strong className="font-mono text-indigo-400">{cancellingTicket.pnr}</strong>?
              </p>

              {/* Refund breakdown */}
              <div className="mt-4 rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Paid Fare</span>
                  <span>₹{cancellingTicket.totalFare}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>IRCTC Cancellation Charge</span>
                  <span>- ₹120</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-400 border-t border-slate-800 pt-2 text-sm">
                  <span>Net Refundable Amount</span>
                  <span>₹{Math.max(0, cancellingTicket.totalFare - 120)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCancellingTicket(null)}
                className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
