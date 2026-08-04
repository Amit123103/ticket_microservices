'use client';
import React from 'react';
import { X, Printer, CheckCircle2, QrCode, Train as TrainIcon, ShieldCheck } from 'lucide-react';
import { BookingTicket } from '../data/trainData';

interface ETicketModalProps { ticket: BookingTicket; onClose: () => void; }

export const ETicketModal: React.FC<ETicketModalProps> = ({ ticket, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm overflow-y-auto">
    <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm"><CheckCircle2 className="h-5 w-5" /> E-Ticket Confirmed</div>
        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-50"><Printer className="h-4 w-4" /> Print</button>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200"><X className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200"><TrainIcon className="h-6 w-6" /></div>
            <div><p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">INDIAN RAILWAYS E-TICKET</p>
              <h2 className="text-xl font-black text-slate-900">{ticket.trainName}</h2>
              <p className="text-xs text-slate-500">#{ticket.trainNumber} • {ticket.quota} • {ticket.travelClass}</p></div>
          </div>
          <div className="grid h-16 w-16 place-items-center rounded-xl bg-white p-1 shadow border border-slate-200"><QrCode className="h-14 w-14 text-slate-800" /></div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[{l:'PNR',v:ticket.pnr,c:'text-emerald-700 font-mono'},{l:'Booking ID',v:ticket.bookingId,c:'font-mono'},{l:'Date',v:ticket.departureDate,c:''},{l:'Chart',v:ticket.chartStatus,c:'text-emerald-700'}].map(({l,v,c}) => (
            <div key={l} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{l}</span>
              <p className={`mt-1 text-sm font-bold text-slate-900 ${c}`}>{v}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
          <div><span className="text-[10px] font-extrabold uppercase text-emerald-700">Boarding</span><strong className="block text-lg font-bold text-slate-900">{ticket.fromCity} ({ticket.fromCode})</strong><span className="text-xs text-slate-400">Dep: {ticket.departureTime}</span></div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">Express</span>
          <div className="text-right"><span className="text-[10px] font-extrabold uppercase text-emerald-700">Destination</span><strong className="block text-lg font-bold text-slate-900">{ticket.toCity} ({ticket.toCode})</strong><span className="text-xs text-slate-400">Arr: {ticket.arrivalTime}</span></div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-emerald-50 text-slate-500"><tr><th className="p-3">#</th><th className="p-3">Passenger</th><th className="p-3">Age / Gender</th><th className="p-3">Status</th><th className="p-3">Coach / Seat</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {ticket.passengers.map((p,i) => (<tr key={i} className="hover:bg-slate-50"><td className="p-3 text-slate-400 font-bold">{i+1}</td><td className="p-3 font-bold text-slate-800">{p.name}</td><td className="p-3 text-slate-600">{p.age} / {p.gender}</td>
                <td className="p-3"><span className="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">{p.status||'CNF'}</span></td><td className="p-3 font-mono font-bold text-emerald-700">{p.seatAssigned}</td></tr>))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div><span className="text-[10px] font-extrabold uppercase text-slate-400">Total Paid</span><p className="text-xl font-black text-emerald-700">₹{ticket.totalFare.toLocaleString('en-IN')}</p><p className="text-[10px] text-slate-400">{ticket.paymentMethod}</p></div>
          <div className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Valid with original ID proof</div>
        </div>
      </div>
    </div>
  </div>
);
