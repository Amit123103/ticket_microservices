'use client';
import React, { useState } from 'react';
import { Search, Ticket, AlertCircle, ArrowRight } from 'lucide-react';
import { MOCK_PNRS, BookingTicket } from '../data/trainData';

interface PNRStatusViewProps { onOpenETicket: (ticket: BookingTicket) => void; }

export const PNRStatusView: React.FC<PNRStatusViewProps> = ({ onOpenETicket }) => {
  const [pnrInput, setPnrInput] = useState('8492049182');
  const [searchedTicket, setSearchedTicket] = useState<BookingTicket | null>(MOCK_PNRS['8492049182']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); setErrorMsg('');
    const t = MOCK_PNRS[pnrInput.trim()];
    if (t) setSearchedTicket(t); else { setErrorMsg(`No booking for PNR: ${pnrInput.trim()}`); setSearchedTicket(null); }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200 mb-3"><Ticket className="h-4 w-4" /> Real-time PNR Tracker</div>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Check PNR Status</h2>
        <p className="mt-2 text-sm text-slate-500">Enter your 10-digit PNR number to view live charting status.</p>
      </div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
          <div className="relative flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-2 border border-slate-200 focus-within:border-emerald-400">
            <Ticket className="h-5 w-5 text-emerald-600 mr-3" />
            <input type="text" maxLength={10} value={pnrInput} onChange={(e) => setPnrInput(e.target.value)} placeholder="Enter 10-digit PNR" className="w-full bg-transparent font-mono font-bold text-slate-900 placeholder-slate-400 focus:outline-none" />
          </div>
          <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-bold text-white shadow-md shadow-emerald-200 hover:bg-emerald-500"><Search className="h-4 w-4" /> GET STATUS</button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400"><span>Try:</span>
          {Object.keys(MOCK_PNRS).map((p) => (<button key={p} type="button" onClick={() => { setPnrInput(p); setSearchedTicket(MOCK_PNRS[p]); setErrorMsg(''); }}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-emerald-700 hover:bg-emerald-50">{p}</button>))}
        </div>
      </form>
      {errorMsg && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center text-xs font-bold text-rose-600"><AlertCircle className="mx-auto h-6 w-6 mb-2" />{errorMsg}</div>}
      {searchedTicket && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div><span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">PNR: {searchedTicket.pnr}</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">{searchedTicket.trainName} (#{searchedTicket.trainNumber})</h3>
              <p className="text-xs text-slate-400 mt-0.5">{searchedTicket.fromCity} → {searchedTicket.toCity} • {searchedTicket.departureDate}</p></div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">{searchedTicket.chartStatus}</span>
              <button onClick={() => onOpenETicket(searchedTicket)} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500">E-Ticket <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs"><thead className="border-b border-slate-200 bg-emerald-50 text-slate-500"><tr><th className="p-3.5">#</th><th className="p-3.5">Passenger</th><th className="p-3.5">Booking Status</th><th className="p-3.5">Current</th><th className="p-3.5">Seat</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{searchedTicket.passengers.map((p,i) => (<tr key={i} className="hover:bg-slate-50"><td className="p-3.5 font-bold text-slate-400">{i+1}</td><td className="p-3.5 font-bold text-slate-800">{p.name}</td><td className="p-3.5 font-mono text-emerald-700">{p.status}</td><td className="p-3.5 font-bold text-emerald-700">CNF / Confirmed</td><td className="p-3.5 font-mono font-bold text-emerald-700">{p.seatAssigned}</td></tr>))}</tbody>
            </table>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-600 text-white font-black text-sm shadow-md">99%</div>
              <div><p className="text-xs font-bold text-slate-800">Confirmation: High</p><p className="text-[11px] text-slate-500">Historical trend for #{searchedTicket.trainNumber}</p></div></div>
            <div className="text-right"><span className="text-[10px] font-extrabold uppercase text-slate-400">Departure</span><p className="text-sm font-bold text-slate-800">{searchedTicket.departureTime}</p></div>
          </div>
        </div>
      )}
    </section>
  );
};
