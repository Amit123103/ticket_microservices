'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

export interface RefundRecord {
  id: string;
  pnr: string;
  trainName: string;
  cancelledDate: string;
  originalAmount: number;
  refundAmount: number;
  deduction: number;
  status: 'CREDITED' | 'PROCESSING' | 'REJECTED';
  estimatedCreditDate: string;
  refundMethod: string;
  referenceNo: string;
}

const MOCK_REFUNDS: RefundRecord[] = [
  { id: 'REF-904123', pnr: '8492049182', trainName: 'Vande Bharat Express (20901)', cancelledDate: '2026-08-04 16:30', originalAmount: 2840, refundAmount: 2414, deduction: 426, status: 'CREDITED', estimatedCreditDate: '2026-08-05 (Completed)', refundMethod: 'UPI (GPay - linked to Bank)', referenceNo: 'UPI/REF/9018249120' },
  { id: 'REF-781920', pnr: '5612849102', trainName: 'August Kranti Rajdhani (12953)', cancelledDate: '2026-08-02 11:15', originalAmount: 1980, refundAmount: 1683, deduction: 297, status: 'PROCESSING', estimatedCreditDate: '2026-08-06', refundMethod: 'HDFC Credit Card ending in 4092', referenceNo: 'PG/REF/881290412' },
];

export const RefundHistoryView: React.FC = () => {
  const [selectedRefund, setSelectedRefund] = useState<RefundRecord | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="section-pill mb-3"><Icons.refresh className="h-3.5 w-3.5" /> Automated Refund System</div>
        <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Refund History & Tracker</h2>
        <p className="mt-2 text-sm text-stone-500">Real-time tracking of cancellation refunds according to IRCTC official refund rules.</p>
      </div>

      <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-600 border border-orange-200">
            <Icons.shield className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900">IRCTC Refund Assurance</h4>
            <p className="mt-1 text-xs leading-relaxed text-stone-600">Cancellations done prior to chart preparation receive up to 85%-100% refund after flat clerkage fees. Refunds are automatically credited back to your original source account within 3 to 5 business days.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_REFUNDS.map((rf) => (
          <div key={rf.id} className="rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:shadow-lg hover:shadow-stone-200/40 hover:border-orange-200">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-stone-400">Refund Ref: {rf.referenceNo}</span>
                <h3 className="mt-1 text-lg font-bold text-stone-900">{rf.trainName}</h3>
                <span className="text-xs text-stone-400 mt-0.5">PNR: {rf.pnr} • Cancelled on {rf.cancelledDate}</span>
              </div>
              <div>
                {rf.status === 'CREDITED' && <span className="badge-success inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"><Icons.check className="h-4 w-4 text-emerald-500" /> Refund Credited</span>}
                {rf.status === 'PROCESSING' && <span className="badge-warning inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"><Icons.clock className="h-4 w-4 text-amber-500 animate-pulse-soft" /> Refund Processing</span>}
                {rf.status === 'REJECTED' && <span className="badge-danger inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"><Icons.alertTriangle className="h-4 w-4 text-red-500" /> Refund Rejected</span>}
              </div>
            </div>

            <div className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl p-4 bg-stone-50 border border-stone-200"><span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Original Fare</span><p className="mt-1.5 text-sm font-bold text-stone-700">₹{rf.originalAmount}</p></div>
              <div className="rounded-xl p-4 bg-stone-50 border border-stone-200"><span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Cancellation Fee</span><p className="mt-1.5 text-sm font-bold text-red-600">-₹{rf.deduction}</p></div>
              <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-200"><span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Refund Amount</span><p className="mt-1.5 text-base font-bold text-emerald-600">₹{rf.refundAmount}</p></div>
              <div className="rounded-xl p-4 bg-stone-50 border border-stone-200"><span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Est. Credit Date</span><p className="mt-1.5 text-xs font-bold text-indigo-600">{rf.estimatedCreditDate}</p></div>
            </div>

            <div className="mt-4 rounded-xl p-4 bg-stone-50 border border-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Refund Status Timeline</span>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-600 font-semibold"><Icons.check className="h-4 w-4" /> Cancellation Requested</div>
                <div className="h-0.5 flex-1 bg-stone-200 rounded-full" />
                <div className="flex items-center gap-2 font-semibold text-stone-700"><Icons.check className="h-4 w-4 text-emerald-600" /> Bank Initiated</div>
                <div className={`h-0.5 flex-1 rounded-full ${rf.status === 'CREDITED' ? 'bg-emerald-500' : 'bg-stone-200'}`} />
                <div className={`flex items-center gap-2 font-semibold ${rf.status === 'CREDITED' ? 'text-emerald-600' : 'text-stone-400'}`}>
                  {rf.status === 'CREDITED' ? <Icons.check className="h-4 w-4" /> : <Icons.clock className="h-4 w-4" />} Account Credited
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
