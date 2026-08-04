'use client';

import React, { useState } from 'react';
import { HelpCircle, Clock, ShieldCheck, RefreshCw, Calculator, PhoneCall, Mail, ChevronDown } from 'lucide-react';

export const SupportModal: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [calcFare, setCalcFare] = useState('2050');
  const [calcClass, setCalcClass] = useState('3A');

  const faqs = [
    {
      q: 'What are the Tatkal ticket booking timings on IRCTC?',
      a: 'Tatkal booking opens at 10:00 AM for AC classes (1A, 2A, 3A, CC, EC) and at 11:00 AM for Non-AC classes (SL, 2S) one day prior to the date of journey from the train origin station.',
    },
    {
      q: 'How long does an instant refund take on ticket cancellation?',
      a: 'If you selected RailGo Assured Free Cancellation, refunds are processed instantly (within 15 minutes) to your original UPI VPA or RailGo Wallet. Bank card refunds take 1-3 business days.',
    },
    {
      q: 'What is RAC and Waiting List (WL) ticket status?',
      a: 'RAC (Reservation Against Cancellation) guarantees a seat on the train, shared with another passenger until further cancellations. WL means your ticket will only be confirmed if someone cancels.',
    },
    {
      q: 'Can I change passenger details or boarding station after booking?',
      a: 'Yes, boarding station changes are permitted up to 24 hours before train departure via IRCTC online portal or at computerized reservation counters.',
    },
  ];

  const getCalculatedRefund = () => {
    const fare = Number(calcFare) || 0;
    let fee = 120;
    if (calcClass === '1A' || calcClass === '2A') fee = 240;
    if (calcClass === '3A' || calcClass === 'CC') fee = 180;
    if (calcClass === 'SL') fee = 120;
    if (calcClass === '2S') fee = 60;

    return Math.max(0, fare - fee);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-3">
          <HelpCircle className="h-4 w-4 text-indigo-400" />
          <span>24/7 RailGo Assistance</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Help Center & FAQ</h2>
        <p className="mt-2 text-sm text-slate-400">
          Everything you need to know about Indian Railway ticket bookings, Tatkal timings & refunds.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        
        {/* FAQ Accordion */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h3>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-white text-sm"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-indigo-400 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs leading-relaxed text-slate-300 border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instant Refund Estimator Tool & Contact Box */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Calculator className="h-5 w-5" />
              <span>Instant Refund Estimator</span>
            </div>

            <div>
              <label className="field-label">Ticket Base Fare (₹)</label>
              <input
                type="number"
                value={calcFare}
                onChange={(e) => setCalcFare(e.target.value)}
                className="field-control mt-1"
              />
            </div>

            <div>
              <label className="field-label">Travel Class</label>
              <select
                value={calcCalcClass(calcClass, setCalcClass)}
                onChange={(e) => setCalcClass(e.target.value)}
                className="field-control mt-1"
              >
                <option value="1A">1A / Executive AC</option>
                <option value="2A">2A Tier AC</option>
                <option value="3A">3A Tier AC / CC</option>
                <option value="SL">Sleeper Class (SL)</option>
                <option value="2S">Second Sitting (2S)</option>
              </select>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Refundable Amount</span>
              <p className="text-2xl font-black text-emerald-400">₹{getCalculatedRefund()}</p>
            </div>
          </div>

          {/* Customer Care Contacts */}
          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-950/30 p-6 space-y-3">
            <h4 className="font-bold text-white text-sm">Customer Support Helpline</h4>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <PhoneCall className="h-4 w-4 text-indigo-400" />
              <span>Toll Free: 1800-111-139 / 139</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="h-4 w-4 text-indigo-400" />
              <span>Support: care@railgo.in</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

function calcCalcClass(val: string, setVal: any) {
  return val;
}
