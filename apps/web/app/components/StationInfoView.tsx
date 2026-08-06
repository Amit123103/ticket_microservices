'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';

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
        <div className="section-pill mb-3">
          <Icons.building className="h-3.5 w-3.5" /> Station Guide
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Station Information</h2>
        <p className="mt-2 text-sm text-stone-500">Detailed info on major Indian railway stations — platforms, facilities, and amenities.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {stations.map((s, idx) => (
          <button key={s.code} onClick={() => setSelectedStation(idx)}
            className={`rounded-2xl border p-4 text-center transition ${selectedStation === idx ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-400' : 'border-stone-200 bg-white hover:border-purple-300'}`}>
            <span className="text-lg font-black text-purple-700">{s.code}</span>
            <p className="text-[10px] font-bold text-stone-500 mt-0.5">{s.city}</p>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white shadow-lg overflow-hidden">
        <div className="border-b border-stone-100 bg-purple-50/80 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-purple-600 text-white font-black text-lg shadow-lg shadow-purple-200">{st.code}</div>
            <div><h3 className="text-xl font-bold text-stone-900">{st.name}</h3>
              <p className="text-xs text-stone-500">{st.city} • {st.zone}</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center"><span className="text-lg font-black text-purple-700">{st.platforms}</span><p className="text-[10px] text-stone-400 font-bold">Platforms</p></div>
            <div className="text-center"><span className="text-lg font-black text-purple-700">{st.daily}</span><p className="text-[10px] text-stone-400 font-bold">Daily Trains</p></div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="rounded-2xl border border-stone-200 overflow-hidden">
            <button onClick={() => setExpandedSection(expandedSection === 'facilities' ? null : 'facilities')} className="flex w-full items-center justify-between p-4 bg-stone-50 text-left font-bold text-stone-800">
              <span className="flex items-center gap-2"><Icons.utensils className="h-4 w-4 text-purple-600" /> Facilities & Amenities</span>
              {expandedSection === 'facilities' ? <Icons.chevronUp className="h-4 w-4" /> : <Icons.chevronDown className="h-4 w-4" />}
            </button>
            {expandedSection === 'facilities' && (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {st.facilities.map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 p-3">
                    <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                    <span className="text-xs font-bold text-stone-700">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 flex items-center gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-50 border border-purple-200"><Icons.users className="h-5 w-5 text-purple-600" /></div>
              <div><p className="text-xs font-bold text-stone-400 uppercase">Accessibility</p><p className="text-sm font-bold text-stone-800">{st.wheelchair ? 'Wheelchair accessible • Ramps • Lifts' : 'Limited'}</p></div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 flex items-center gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-50 border border-purple-200"><Icons.phone className="h-5 w-5 text-purple-600" /></div>
              <div><p className="text-xs font-bold text-stone-400 uppercase">Station Helpline</p><p className="text-sm font-bold text-stone-800">{st.contact}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};