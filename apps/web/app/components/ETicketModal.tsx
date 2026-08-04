'use client';

import React from 'react';
import { X, Printer, Download, Share2, CheckCircle2, QrCode, Train as TrainIcon, ShieldCheck } from 'lucide-react';
import { BookingTicket } from '../data/trainData';

interface ETicketModalProps {
  ticket: BookingTicket;
  onClose: () => void;
}

export const ETicketModal: React.FC<ETicketModalProps> = ({ ticket, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Top Actions Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5" />
            <span>Official E-Ticket Confirmed</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700"
            >
              <Printer className="h-4 w-4" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* E-Ticket Main Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Railway Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/20">
                <TrainIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                  INDIAN RAILWAYS E-TICKET SERVICE
                </p>
                <h2 className="text-xl font-black text-white">{ticket.trainName}</h2>
                <p className="text-xs text-slate-400">
                  Train No: #{ticket.trainNumber} • Quota: {ticket.quota} • Class: {ticket.travelClass}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-white p-1 shadow-inner">
                <QrCode className="h-14 w-14 text-slate-950" />
              </div>
            </div>
          </div>

          {/* Ticket Key Info Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">PNR Number</span>
              <p className="mt-1 font-mono text-base font-black text-indigo-400">{ticket.pnr}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Booking ID</span>
              <p className="mt-1 font-mono text-base font-bold text-white">{ticket.bookingId}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Journey Date</span>
              <p className="mt-1 text-sm font-bold text-white">{ticket.departureDate}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Chart Status</span>
              <p className="mt-1 text-xs font-extrabold text-emerald-400">{ticket.chartStatus}</p>
            </div>
          </div>

          {/* Departure & Destination Details */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">Boarding Station</span>
              <strong className="block text-lg font-bold text-white">{ticket.fromCity} ({ticket.fromCode})</strong>
              <span className="text-xs text-slate-400">Dep: {ticket.departureTime}</span>
            </div>

            <div className="text-center">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-bold text-slate-300">
                Direct Express
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">Destination</span>
              <strong className="block text-lg font-bold text-white">{ticket.toCity} ({ticket.toCode})</strong>
              <span className="text-xs text-slate-400">Arr: {ticket.arrivalTime}</span>
            </div>
          </div>

          {/* Passenger Manifest Table */}
          <div>
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Passenger Manifest & Seat Allocation:
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Passenger Name</th>
                    <th className="p-3">Age / Gender</th>
                    <th className="p-3">Booking Status</th>
                    <th className="p-3">Coach / Seat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {ticket.passengers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/30">
                      <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-bold text-white">{p.name}</td>
                      <td className="p-3">{p.age} Yrs / {p.gender}</td>
                      <td className="p-3">
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400">
                          {p.status || 'CNF'}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-indigo-400">
                        {p.seatAssigned || `${ticket.coach} - ${idx + 12}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment & Terms Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Paid Fare</span>
              <p className="text-xl font-black text-emerald-400">₹{ticket.totalFare.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-slate-400">Via {ticket.paymentMethod} • ID: {ticket.bookingId}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Valid with original ID proof (Aadhaar / Driving License / PAN)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
