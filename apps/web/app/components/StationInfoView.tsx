'use client';
import React, { useState } from 'react';
import { Building2, MapPin, Clock, Train, Wifi, Coffee, Shield, Phone, Search, ChevronDown, ChevronUp, Users, Accessibility } from 'lucide-react';

export const StationInfoView: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('facilities');

  const stations = [
    { code: 'NDLS', name: 'New Delhi', city: 'Delhi', platforms: 16, zone: 'Northern Railway', daily: '450+ trains', facilities: ['WiFi','Escalators','Food Court','Waiting Hall','Cloak Room','ATM','Medical','Parking'], wheelchair: true, contact: '011-23423424' },
    { code: 'CSTM', name: 'Chhatrapati Shivaji Terminus', city: 'Mumbai', platforms: 18, zone: 'Central Railway', daily: '400+ trains', facilities: ['WiFi','AC Waiting','Heritage Walk','Food Court','Book Stall','ATM','Medical'], wheelchair: true, contact: '022-22624343' },
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', platforms: 23, zone: 'Eastern Railway', daily: '600+ trains', facilities: ['WiFi','Escalators','Food Court','Retiring Room','ATM','Medical','Parking'], wheelchair: true, contact: '033-26408427' },
    { code: 'MAS', name: 'Chennai Central', city: 'Chennai', platforms: 17, zone: 'Southern Railway', daily: '350+ trains', facilities: ['WiFi','AC Hall','Food Court','Book Stall','ATM','Medical','Parking'], wheelchair: true, contact: '044-25354595' },
    { code: 'SBC', name: 'KSR Bengaluru', city: 'Bengaluru', platforms: 10, zone: 'South Western Railway', daily: '200+ trains', facilities: ['WiFi','Food Court','Waiting Hall','ATM','Medical','Parking'], wheelchair: true, contact: '080-22353434' },
    { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur', platforms: 6, zone: 'North Western Railway', daily: '150+ trains', facilities: ['WiFi','Waiting Hall','Food Stall','ATM','Medical'], wheelchair: true, contact: '0141-2204461' },
  ];

  const st = stations[selectedStation];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200 mb-3"><Building2 className="h-4 w-4" /> Station Guide</div>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Station Information</h2>
        <p className="mt-2 text-sm text-slate-500">Detailed info on major Indian railway stations — platforms, facilities, and amenities.</p>
      </div>

      {/* Station Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {stations.map((s, idx) => (
          <button key={s.code} onClick={() => setSelectedStation(idx)}
            className={`rounded-2xl border p-4 text-center transition ${selectedStation === idx ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400' : 'border-slate-200 bg-white hover:border-emerald-300'}`}>
            <span className="text-lg font-black text-emerald-700">{s.code}</span>
            <p className="text-[10px] font-bold text-slate-500 mt-0.5">{s.city}</p>
          </button>
        ))}
      </div>

      {/* Station Details */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <div className="border-b border-slate-100 bg-emerald-50 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-600 text-white font-black text-lg shadow-lg shadow-emerald-200">{st.code}</div>
            <div><h3 className="text-xl font-black text-slate-900">{st.name}</h3>
              <p className="text-xs text-slate-500">{st.city} • {st.zone}</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center"><span className="text-lg font-black text-emerald-700">{st.platforms}</span><p className="text-[10px] text-slate-400 font-bold">Platforms</p></div>
            <div className="text-center"><span className="text-lg font-black text-emerald-700">{st.daily}</span><p className="text-[10px] text-slate-400 font-bold">Daily Trains</p></div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Facilities */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <button onClick={() => setExpandedSection(expandedSection === 'facilities' ? null : 'facilities')} className="flex w-full items-center justify-between p-4 bg-slate-50 text-left font-bold text-slate-800">
              <span className="flex items-center gap-2"><Coffee className="h-4 w-4 text-emerald-600" /> Facilities & Amenities</span>
              {expandedSection === 'facilities' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSection === 'facilities' && (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {st.facilities.map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Access & Contact */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-center gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 border border-emerald-200"><Accessibility className="h-5 w-5 text-emerald-600" /></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase">Accessibility</p><p className="text-sm font-bold text-slate-800">{st.wheelchair ? 'Wheelchair accessible • Ramps • Lifts' : 'Limited'}</p></div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-center gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 border border-emerald-200"><Phone className="h-5 w-5 text-emerald-600" /></div>
              <div><p className="text-xs font-bold text-slate-400 uppercase">Station Helpline</p><p className="text-sm font-bold text-slate-800">{st.contact}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
