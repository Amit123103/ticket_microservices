'use client';

import React, { useState } from 'react';
import { Search, Ticket, CheckCircle2, Clock, Train as TrainIcon, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { MOCK_PNRS, BookingTicket } from '../data/trainData';

interface PNRStatusViewProps {
  onOpenETicket: (ticket: BookingTicket) => void;
}

export const PNRStatusView: React.FC<PNRStatusViewProps> = ({ onOpenETicket }) => {
  const [pnrInput, setPnrInput] = useState('8492049182');
  const [searchedTicket, setSearchedTicket] = useState<BookingTicket | null>(MOCK_PNRS['8492049182']);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePnrSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanPnr = pnrInput.trim();
    if (MOCK_PNRS[cleanPnr]) {
      setSearchedTicket(MOCK_PNRS[cleanPnr]);
    } else {
      setErrorMsg(`No active booking found for PNR: ${cleanPnr}. Try sample PNRs below.`);
      setSearchedTicket(null);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-3">
          <Ticket className="h-4 w-4 text-indigo-400" />
          <span>Real-time IRCTC PNR Tracker</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Check Real-Time PNR Status</h2>
        <p className="mt-2 text-sm text-slate-400">
          Enter your 10-digit Passenger Name Record (PNR) number to inspect live status & coach position.
        </p>
      </div>

      {/* PNR Search Form */}
      <form onSubmit={handlePnrSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl">
          <div className="relative flex-1 flex items-center bg-slate-950 rounded-xl px-4 py-2 border border-slate-800 focus-within:border-indigo-500">
            <Ticket className="h-5 w-5 text-indigo-400 mr-3" />
            <input
              type="text"
              maxLength={10}
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              placeholder="Enter 10-digit PNR Number (e.g. 8492049182)"
              className="w-full bg-transparent font-mono font-bold text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
          >
            <Search className="h-4 w-4" />
            <span>GET PNR STATUS</span>
          </button>
        </div>

        {/* Quick Sample Buttons */}
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>Quick Try:</span>
          {Object.keys(MOCK_PNRS).map((pnr) => (
            <button
              key={pnr}
              type="button"
              onClick={() => {
                setPnrInput(pnr);
                setSearchedTicket(MOCK_PNRS[pnr]);
                setErrorMsg('');
              }}
              className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-indigo-400 hover:bg-slate-800"
            >
              {pnr}
            </button>
          ))}
        </div>
      </form>

      {/* Error Message */}
      {errorMsg && (
        <div className="rounded-2xl border border-rose-800/50 bg-rose-950/40 p-4 text-center text-xs font-bold text-rose-300">
          <AlertCircle className="mx-auto h-6 w-6 mb-2 text-rose-400" />
          {errorMsg}
        </div>
      )}

      {/* PNR Result Display */}
      {searchedTicket && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
          {/* Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                PNR NUMBER: {searchedTicket.pnr}
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {searchedTicket.trainName} (#{searchedTicket.trainNumber})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {searchedTicket.fromCity} ({searchedTicket.fromCode}) → {searchedTicket.toCity} ({searchedTicket.toCode}) • {searchedTicket.departureDate}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-extrabold text-emerald-400 border border-emerald-500/30">
                {searchedTicket.chartStatus}
              </span>
              <button
                onClick={() => onOpenETicket(searchedTicket)}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                <span>View Full E-Ticket</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Passenger Status Table */}
          <div>
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Live Passenger Status Breakdown:
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900 text-slate-400">
                  <tr>
                    <th className="p-3.5">#</th>
                    <th className="p-3.5">Passenger</th>
                    <th className="p-3.5">Booking Status</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5">Coach & Seat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {searchedTicket.passengers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="p-3.5 font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3.5 font-bold text-white">{p.name}</td>
                      <td className="p-3.5 font-mono text-emerald-400">{p.status || 'CNF'}</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-400">CNF / Confirmed</td>
                      <td className="p-3.5 font-mono font-extrabold text-indigo-400">{p.seatAssigned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Confirmation Predictor Gauge */}
          <div className="rounded-2xl bg-indigo-950/40 p-5 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-lg shadow-indigo-600/30">
                99%
              </div>
              <div>
                <p className="text-xs font-bold text-white">Confirmation Probability: High</p>
                <p className="text-[11px] text-slate-400">Based on historical chart trends for train #{searchedTicket.trainNumber}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Departure Time</span>
              <p className="text-sm font-bold text-white">{searchedTicket.departureTime} Hrs</p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
