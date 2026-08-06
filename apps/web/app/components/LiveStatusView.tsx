'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';
import { LIVE_TRAINS, LiveTrainStatus, LiveRouteStation } from '../data/trainData';

export const LiveStatusView: React.FC = () => {
  const [trainNo, setTrainNo] = useState('12301');
  const [result, setResult] = useState<LiveTrainStatus | null>(LIVE_TRAINS['12301']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); setErrorMsg('');
    const t = LIVE_TRAINS[trainNo.trim()]; if (t) setResult(t); else { setResult(null); setErrorMsg(`No live data for train: ${trainNo.trim()}`); }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5 text-xs font-bold text-purple-700 border border-purple-200 mb-3">
          <Icons.live className="h-4 w-4" /> Live GPS Tracking
        </div>
        <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Live Train Status</h2>
        <p className="mt-2 text-sm text-stone-500">Real-time location, delay and ETA for any Indian Railways train.</p>
      </div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-lg shadow-stone-200/30">
          <div className="relative flex-1 flex items-center bg-stone-50 rounded-xl px-4 py-3 border border-stone-200 focus-within:border-purple-400 focus-within:shadow-sm focus-within:shadow-purple-500/10 transition-all">
            <Icons.live className="h-5 w-5 text-purple-600 mr-3" />
            <input type="text" value={trainNo} onChange={(e) => setTrainNo(e.target.value)} placeholder="Enter train number" className="w-full bg-transparent font-mono font-bold text-stone-900 placeholder-stone-400 focus:outline-none" />
          </div>
          <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all">
            <Icons.search className="h-4 w-4" /> TRACK TRAIN
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
          <span>Try:</span>
          {Object.keys(LIVE_TRAINS).map((k) => (<button key={k} type="button" onClick={() => { setTrainNo(k); setResult(LIVE_TRAINS[k]); setErrorMsg(''); }}
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 font-mono text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all font-semibold">{k}</button>))}
        </div>
      </form>
      {errorMsg && <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-sm font-semibold text-red-700"><Icons.alertCircle className="mx-auto h-6 w-6 mb-2" />{errorMsg}</div>}
      {result && (
        <div className="space-y-5">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-lg shadow-stone-200/30">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <h3 className="text-xl font-bold text-stone-900">{result.trainName}</h3>
                <p className="text-xs text-stone-400 mt-0.5">#{result.trainNumber} • {result.fromCode} → {result.toCode}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1.5 text-xs font-bold border ${result.delay > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                  {result.delay > 0 ? `Delayed ${result.delay} min` : 'On Time'}
                </span>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-purple-50 border border-purple-200">
                  <Icons.activity className="h-5 w-5 text-purple-600 animate-pulse-soft" />
                </div>
              </div>
            </div>
            <div className="my-5 rounded-2xl bg-purple-50/80 p-5 border border-purple-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700">Current Location</span>
              <div className="flex items-center gap-3 mt-2">
                <Icons.mapPin className="h-6 w-6 text-purple-600 animate-pulse-soft" />
                <div>
                  <p className="font-bold text-stone-900 text-lg">{result.currentStation}</p>
                  <p className="text-xs text-stone-500">{result.currentState}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[{l:'Speed',v:result.speed+'km/h'},{l:'Last Updated',v:result.lastUpdated},{l:'Next Station',v:result.nextStation}].map(({l,v}) => (
                <div key={l} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <span className="text-[10px] font-bold uppercase text-stone-400">{l}</span>
                  <p className="mt-1.5 text-sm font-bold text-stone-800">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-lg shadow-stone-200/30">
            <h4 className="font-bold text-stone-900 mb-5">Route Timeline</h4>
            <div className="space-y-4">
              {result.stations.map((st: LiveRouteStation, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  {idx !== result.stations.length - 1 && <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-stone-200" />}
                  <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold border-2 ${st.isPassed ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-stone-500 border-stone-300'}`}>{idx + 1}</div>
                  <div className={`flex-1 flex flex-wrap items-center justify-between gap-2 rounded-xl p-3.5 border ${st.isPassed ? 'bg-purple-50 border-purple-200' : 'bg-stone-50 border-stone-200'}`}>
                    <div>
                      <span className="font-bold text-stone-800 text-sm">{st.stationName}</span>
                      <span className="ml-2 text-[10px] font-bold text-purple-600">{st.stationCode}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Icons.clock className="h-3.5 w-3.5" />
                      <span>{st.arrivalTime} → {st.departureTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
