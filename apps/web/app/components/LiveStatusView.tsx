'use client';
import React, { useState } from 'react';
import { Search, Radio, MapPin, Clock, Activity, AlertCircle } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200 mb-3"><Radio className="h-4 w-4" /> Live GPS Tracking</div>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Live Train Status</h2>
        <p className="mt-2 text-sm text-slate-500">Real-time location, delay and ETA for any Indian Railways train.</p>
      </div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
          <div className="relative flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-2 border border-slate-200 focus-within:border-emerald-400"><Radio className="h-5 w-5 text-emerald-600 mr-3" />
            <input type="text" value={trainNo} onChange={(e) => setTrainNo(e.target.value)} placeholder="Enter train number" className="w-full bg-transparent font-mono font-bold text-slate-900 placeholder-slate-400 focus:outline-none" />
          </div>
          <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-bold text-white shadow-md shadow-emerald-200 hover:bg-emerald-500"><Search className="h-4 w-4" /> TRACK TRAIN</button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400"><span>Try:</span>
          {Object.keys(LIVE_TRAINS).map((k) => (<button key={k} type="button" onClick={() => { setTrainNo(k); setResult(LIVE_TRAINS[k]); setErrorMsg(''); }}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-emerald-700 hover:bg-emerald-50">{k}</button>))}
        </div>
      </form>
      {errorMsg && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center text-xs font-bold text-rose-600"><AlertCircle className="mx-auto h-6 w-6 mb-2" />{errorMsg}</div>}
      {result && (
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div><h3 className="text-xl font-black text-slate-900">{result.trainName}</h3>
                <p className="text-xs text-slate-400">#{result.trainNumber} • {result.fromCode} → {result.toCode}</p></div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold border ${result.delay > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                  {result.delay > 0 ? `Delayed ${result.delay} min` : 'On Time'}
                </span>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 border border-emerald-200"><Activity className="h-5 w-5 text-emerald-600 animate-pulse" /></div>
              </div>
            </div>
            {/* Current Position */}
            <div className="my-5 rounded-2xl bg-emerald-50 p-5 border border-emerald-200">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">Current Location</span>
              <div className="flex items-center gap-3 mt-2"><MapPin className="h-6 w-6 text-emerald-600 animate-pulse" />
                <div><p className="font-bold text-slate-900 text-lg">{result.currentStation}</p><p className="text-xs text-slate-500">{result.currentState}</p></div>
              </div>
            </div>
            {/* Details */}
            <div className="grid gap-3 sm:grid-cols-3">
              {[{l:'Speed',v:result.speed+'km/h'},{l:'Last Updated',v:result.lastUpdated},{l:'Next Station',v:result.nextStation}].map(({l,v}) => (
                <div key={l} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><span className="text-[10px] font-extrabold uppercase text-slate-400">{l}</span><p className="mt-1 text-sm font-bold text-slate-800">{v}</p></div>
              ))}
            </div>
          </div>
          {/* Timeline */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <h4 className="font-bold text-slate-900 mb-4">Route Timeline</h4>
            <div className="space-y-4">
              {result.stations.map((st: LiveRouteStation, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  {idx !== result.stations.length - 1 && <div className="absolute left-[15px] top-7 bottom-0 w-0.5 bg-emerald-200" />}
                  <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${st.isPassed ? 'bg-emerald-500 text-white' : 'bg-white text-slate-500 border-2 border-slate-300'}`}>{idx + 1}</div>
                  <div className={`flex-1 flex flex-wrap items-center justify-between gap-2 rounded-xl p-3 border ${st.isPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div><span className="font-bold text-slate-800 text-sm">{st.stationName}</span><span className="ml-2 text-[10px] font-bold text-emerald-600">{st.stationCode}</span></div>
                    <div className="flex items-center gap-3 text-xs text-slate-500"><Clock className="h-3.5 w-3.5" /><span>{st.arrivalTime} → {st.departureTime}</span></div>
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
