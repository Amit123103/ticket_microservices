'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

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
  {
    id: 'REF-904123',
    pnr: '8492049182',
    trainName: 'Vande Bharat Express (20901)',
    cancelledDate: '2026-08-04 16:30',
    originalAmount: 2840,
    refundAmount: 2414,
    deduction: 426,
    status: 'CREDITED',
    estimatedCreditDate: '2026-08-05 (Completed)',
    refundMethod: 'UPI (GPay - linked to Bank)',
    referenceNo: 'UPI/REF/9018249120',
  },
  {
    id: 'REF-781920',
    pnr: '5612849102',
    trainName: 'August Kranti Rajdhani (12953)',
    cancelledDate: '2026-08-02 11:15',
    originalAmount: 1980,
    refundAmount: 1683,
    deduction: 297,
    status: 'PROCESSING',
    estimatedCreditDate: '2026-08-06',
    refundMethod: 'HDFC Credit Card ending in 4092',
    referenceNo: 'PG/REF/881290412',
  },
];

export const RefundHistoryView: React.FC = () => {
  const [selectedRefund, setSelectedRefund] = useState<RefundRecord | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="section-pill mb-3">
          <RefreshCw className="h-3.5 w-3.5" /> Automated Refund System
        </div>
        <h2 className="text-3xl font-black sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Refund History & Tracker
        </h2>
        <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>
          Real-time tracking of cancellation refunds according to IRCTC official refund rules.
        </p>
      </div>

      {/* Refund Rules Callout */}
      <div className="card-dark mb-8 p-6 glass-brand">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-500/20 text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100">IRCTC Refund Assurance</h4>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
              Cancellations done prior to chart preparation receive up to 85%-100% refund after flat clerkage fees. Refunds are automatically credited back to your original source account within 3 to 5 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Refunds List */}
      <div className="space-y-6">
        {MOCK_REFUNDS.map((rf) => (
          <div key={rf.id} className="card-dark p-6 transition hover:border-indigo-500/40">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <span className="text-xs font-mono font-bold" style={{ color: '#64748b' }}>Refund Ref: {rf.referenceNo}</span>
                <h3 className="mt-1 text-lg font-bold text-slate-100">{rf.trainName}</h3>
                <span className="text-xs" style={{ color: '#94a3b8' }}>PNR: {rf.pnr} • Cancelled on {rf.cancelledDate}</span>
              </div>
              <div>
                {rf.status === 'CREDITED' && (
                  <span className="badge-success inline-flex items-center gap-1.5 px-3 py-1 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Refund Credited
                  </span>
                )}
                {rf.status === 'PROCESSING' && (
                  <span className="badge-warning inline-flex items-center gap-1.5 px-3 py-1 text-xs">
                    <Clock className="h-4 w-4 text-amber-400 animate-spin" /> Refund Processing
                  </span>
                )}
                {rf.status === 'REJECTED' && (
                  <span className="badge-danger inline-flex items-center gap-1.5 px-3 py-1 text-xs">
                    <AlertTriangle className="h-4 w-4 text-rose-400" /> Refund Rejected
                  </span>
                )}
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>Original Fare</span>
                <p className="mt-1 text-sm font-bold text-slate-300">₹{rf.originalAmount}</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>Cancellation Fee</span>
                <p className="mt-1 text-sm font-bold text-rose-400">-₹{rf.deduction}</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#34d399' }}>Refund Amount</span>
                <p className="mt-1 text-base font-black text-emerald-400">₹{rf.refundAmount}</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>Est. Credit Date</span>
                <p className="mt-1 text-xs font-bold text-cyan-300">{rf.estimatedCreditDate}</p>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="mt-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Refund Status Timeline</span>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="h-4 w-4" /> Cancellation Requested
                </div>
                <div className="h-0.5 flex-1 bg-emerald-500/50" />
                <div className={`flex items-center gap-2 font-semibold ${rf.status !== 'REJECTED' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <CheckCircle2 className="h-4 w-4" /> Bank Initiated
                </div>
                <div className={`h-0.5 flex-1 ${rf.status === 'CREDITED' ? 'bg-emerald-500/50' : 'bg-slate-700'}`} />
                <div className={`flex items-center gap-2 font-semibold ${rf.status === 'CREDITED' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {rf.status === 'CREDITED' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />} Account Credited
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
