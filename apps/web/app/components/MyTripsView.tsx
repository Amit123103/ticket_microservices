'use client';
import React, { useState } from 'react';
import { Ticket, ArrowRight, XCircle, CheckCircle2, Eye, AlertTriangle } from 'lucide-react';
import { USER_TRIPS, BookingTicket } from '../data/trainData';

interface MyTripsViewProps { onOpenETicket: (ticket: BookingTicket) => void; }

export const MyTripsView: React.FC<MyTripsViewProps> = ({ onOpenETicket }) => {
  const [trips, setTrips] = useState(USER_TRIPS);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'cancelled'>('all');

  const filtered = trips.filter((t) => filter === 'all' ? true : filter === 'upcoming' ? t.status === 'CONFIRMED' : t.status === 'CANCELLED');
  const handleCancel = (id: string) => { setTrips(trips.map((t) => t.pnr === id ? { ...t, status: 'CANCELLED' as const } : t)); setConfirmCancel(null); };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200 mb-3"><Ticket className="h-4 w-4" /> Trip Manager</div>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">My Trips</h2>
        <p className="mt-2 text-sm text-slate-500">All your bookings, tickets, and cancellations in one place.</p>
      </div>

      <div className="mb-6 flex items-center gap-2 justify-center">
        {(['all','upcoming','cancelled'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition ${filter===f?'bg-emerald-600 text-white shadow-md shadow-emerald-200':'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-5">
        {filtered.map((trip) => (
          <article key={trip.pnr} className={`rounded-3xl border bg-white shadow-sm overflow-hidden transition hover:shadow-md ${trip.status==='CANCELLED'?'border-rose-200':'border-slate-200 hover:border-emerald-200'}`}>
            <div className={`flex items-center justify-between px-6 py-3 border-b ${trip.status==='CANCELLED'?'bg-rose-50 border-rose-100':'bg-emerald-50 border-slate-100'}`}>
              <div className="flex items-center gap-2">
                {trip.status==='CONFIRMED'?<CheckCircle2 className="h-4 w-4 text-emerald-600" />:<XCircle className="h-4 w-4 text-rose-500" />}
                <span className={`text-xs font-bold ${trip.status==='CANCELLED'?'text-rose-600':'text-emerald-700'}`}>{trip.status}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">PNR: {trip.pnr}</span>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">{trip.trainName}</h3>
                  <p className="text-xs text-slate-400">#{trip.trainNumber} • {trip.departureDate} • {trip.travelClass}</p>
                  <p className="text-sm text-slate-600 mt-1 font-bold">{trip.fromCity} <ArrowRight className="inline h-3.5 w-3.5 text-emerald-600" /> {trip.toCity}</p>
                </div>
                <div className="flex items-center gap-3">
                  {trip.status === 'CONFIRMED' && (
                    <>
                      <button onClick={() => onOpenETicket(trip)} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500"><Eye className="h-3.5 w-3.5" /> View Ticket</button>
                      <button onClick={() => setConfirmCancel(trip.pnr)} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100">Cancel</button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {confirmCancel === trip.pnr && (
              <div className="border-t border-rose-200 bg-rose-50 p-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-rose-600 font-bold"><AlertTriangle className="h-4 w-4" /> Cancel this booking? Refund: ₹{Math.round(trip.totalFare*0.85)}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setConfirmCancel(null)} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200">No</button>
                  <button onClick={() => handleCancel(trip.pnr)} className="rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-bold text-white">Yes, Cancel</button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
