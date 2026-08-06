'use client';
import React from 'react';
import { Icons } from './Icons';
import { BookingTicket } from '../data/trainData';

interface ETicketModalProps {
  ticket: BookingTicket;
  onClose: () => void;
}

export const ETicketModal: React.FC<ETicketModalProps> = ({ ticket, onClose }) => (
  <div className="modal-overlay">
    <div className="relative w-full max-w-3xl rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-4">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
          <Icons.check className="h-5 w-5" /> Official IRCTC E-Ticket Confirmed
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="btn-ghost px-3.5 py-2 text-xs flex items-center gap-1.5"
          >
            <Icons.printer className="h-4 w-4 text-indigo-600" /> Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all"
          >
            <Icons.x className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
        {/* Ticket Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 border bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg">
              <Icons.train className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">INDIAN RAILWAYS PASSENGER TICKET</p>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">{ticket.trainName}</h2>
              <p className="text-xs text-stone-500 mt-0.5">#{ticket.trainNumber} • Quota: {ticket.quota} • {ticket.travelClass}</p>
            </div>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-xl bg-white p-1.5 shadow border border-stone-300">
            <Icons.qrCode className="h-14 w-14 text-stone-900" />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: 'PNR Number', v: ticket.pnr, c: 'text-indigo-600 font-mono' },
            { l: 'Booking ID', v: ticket.bookingId, c: 'font-mono' },
            { l: 'Departure Date', v: ticket.departureDate, c: 'text-purple-600' },
            { l: 'Chart Status', v: ticket.chartStatus, c: 'text-emerald-600' },
          ].map(({ l, v, c }) => (
            <div key={l} className="rounded-2xl p-4 bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{l}</span>
              <p className={`mt-1.5 text-sm font-bold ${c}`}>{v}</p>
            </div>
          ))}
        </div>

        {/* Boarding Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 border bg-stone-50 border-stone-200">
          <div>
            <span className="text-[10px] font-bold uppercase text-indigo-600">Boarding Station</span>
            <strong className="block text-lg font-bold text-stone-900 mt-0.5">{ticket.fromCity} ({ticket.fromCode})</strong>
            <span className="text-xs text-stone-500">Dep: {ticket.departureTime}</span>
          </div>
          <span className="badge-brand px-3 py-1.5 text-xs">Express Route</span>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-indigo-600">Destination</span>
            <strong className="block text-lg font-bold text-stone-900 mt-0.5">{ticket.toCity} ({ticket.toCode})</strong>
            <span className="text-xs text-stone-500">Arr: {ticket.arrivalTime}</span>
          </div>
        </div>

        {/* Passenger Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50">
              <tr className="text-xs font-bold text-stone-500">
                <th className="p-3.5">#</th>
                <th className="p-3.5">Passenger Name</th>
                <th className="p-3.5">Age / Gender</th>
                <th className="p-3.5">Current Status</th>
                <th className="p-3.5">Coach / Seat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ticket.passengers.map((p, i) => (
                <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-3.5 font-bold text-stone-500">{i + 1}</td>
                  <td className="p-3.5 font-bold text-stone-800">{p.name}</td>
                  <td className="p-3.5 text-stone-500">{p.age} / {p.gender}</td>
                  <td className="p-3.5">
                    <span className="badge-success inline-flex items-center gap-1">
                      <Icons.check className="h-3.5 w-3.5" /> {p.status || 'CNF'}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-indigo-600">{p.seatAssigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 border bg-stone-50 border-stone-200">
          <div>
            <span className="text-[10px] font-bold uppercase text-stone-400">Total Amount Paid</span>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">₹{ticket.totalFare.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-stone-400 mt-0.5">{ticket.paymentMethod}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Icons.shieldCheck className="h-4 w-4 text-indigo-500" /> Valid with original government photo ID proof
          </div>
        </div>
      </div>
    </div>
  </div>
);
