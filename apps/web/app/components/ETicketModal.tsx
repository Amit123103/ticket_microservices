'use client';

import React from 'react';
import { X, Printer, CheckCircle2, QrCode, Train as TrainIcon, ShieldCheck } from 'lucide-react';
import { BookingTicket } from '../data/trainData';

interface ETicketModalProps {
  ticket: BookingTicket;
  onClose: () => void;
}

export const ETicketModal: React.FC<ETicketModalProps> = ({ ticket, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass overflow-y-auto" style={{ background: 'rgba(0,0,0,0.85)' }}>
    <div className="relative w-full max-w-3xl card-elevated overflow-hidden border-indigo-500/40 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4 glass-brand">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <CheckCircle2 className="h-5 w-5" /> Official IRCTC E-Ticket Confirmed
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="btn-ghost px-3.5 py-2 text-xs flex items-center gap-1.5"
          >
            <Printer className="h-4 w-4 text-indigo-400" /> Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:text-slate-100 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
        {/* Ticket Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 border" style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.25)' }}>
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white shadow-lg">
              <TrainIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">INDIAN RAILWAYS PASSENGER TICKET</p>
              <h2 className="text-xl font-black text-slate-100">{ticket.trainName}</h2>
              <p className="text-xs text-slate-400">#{ticket.trainNumber} • Quota: {ticket.quota} • {ticket.travelClass}</p>
            </div>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-xl bg-white p-1 shadow border border-slate-300">
            <QrCode className="h-14 w-14 text-slate-900" />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: 'PNR Number', v: ticket.pnr, c: 'text-indigo-400 font-mono' },
            { l: 'Booking ID', v: ticket.bookingId, c: 'font-mono' },
            { l: 'Departure Date', v: ticket.departureDate, c: 'text-cyan-300' },
            { l: 'Chart Status', v: ticket.chartStatus, c: 'text-emerald-400' },
          ].map(({ l, v, c }) => (
            <div key={l} className="rounded-2xl p-3.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{l}</span>
              <p className={`mt-1 text-sm font-bold ${c}`}>{v}</p>
            </div>
          ))}
        </div>

        {/* Boarding Info */}
        <div className="flex items-center justify-between rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-indigo-400">Boarding Station</span>
            <strong className="block text-lg font-bold text-slate-100">{ticket.fromCity} ({ticket.fromCode})</strong>
            <span className="text-xs text-slate-400">Dep: {ticket.departureTime}</span>
          </div>
          <span className="badge-brand px-3 py-1 text-xs">Express Route</span>
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-indigo-400">Destination</span>
            <strong className="block text-lg font-bold text-slate-100">{ticket.toCity} ({ticket.toCode})</strong>
            <span className="text-xs text-slate-400">Arr: {ticket.arrivalTime}</span>
          </div>
        </div>

        {/* Passenger Table */}
        <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <table className="w-full text-left text-xs">
            <thead style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <tr style={{ color: '#64748b' }}>
                <th className="p-3">#</th>
                <th className="p-3">Passenger Name</th>
                <th className="p-3">Age / Gender</th>
                <th className="p-3">Current Status</th>
                <th className="p-3">Coach / Seat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ticket.passengers.map((p, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="p-3 text-slate-500 font-bold">{i + 1}</td>
                  <td className="p-3 font-bold text-slate-200">{p.name}</td>
                  <td className="p-3 text-slate-400">{p.age} / {p.gender}</td>
                  <td className="p-3">
                    <span className="badge-success">{p.status || 'CNF'}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-cyan-400">{p.seatAssigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Amount Paid</span>
            <p className="text-xl font-black text-emerald-400">₹{ticket.totalFare.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-slate-400">{ticket.paymentMethod}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-cyan-400" /> Valid with original government photo ID proof
          </div>
        </div>
      </div>
    </div>
  </div>
);
