'use client';

import React, { useState } from 'react';
import { CreditCard, Download, Search, CheckCircle2, XCircle, Clock, Filter, ArrowUpRight } from 'lucide-react';

export interface PaymentTransaction {
  id: string;
  pnr: string;
  trainName: string;
  trainNumber: string;
  amount: number;
  date: string;
  method: 'UPI (GPay)' | 'Credit Card' | 'Net Banking' | 'RailGo Wallet';
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  receiptUrl?: string;
}

const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'TXN-894204',
    pnr: '8492049182',
    trainName: 'Vande Bharat Express',
    trainNumber: '20901',
    amount: 2840,
    date: '2026-08-04 14:20',
    method: 'UPI (GPay)',
    status: 'SUCCESS',
  },
  {
    id: 'TXN-218491',
    pnr: '2184910482',
    trainName: 'Rajdhani Express',
    trainNumber: '12951',
    amount: 2250,
    date: '2026-08-03 10:02',
    method: 'Credit Card',
    status: 'SUCCESS',
  },
  {
    id: 'TXN-109283',
    pnr: '9012830192',
    trainName: 'Tejas Express',
    trainNumber: '82901',
    amount: 1420,
    date: '2026-07-28 09:15',
    method: 'RailGo Wallet',
    status: 'SUCCESS',
  },
  {
    id: 'TXN-098231',
    pnr: '7819203912',
    trainName: 'Deccan Queen',
    trainNumber: '12123',
    amount: 485,
    date: '2026-07-15 16:45',
    method: 'UPI (GPay)',
    status: 'FAILED',
  },
];

export const PaymentHistoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'FAILED' | 'PENDING'>('ALL');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredPayments = MOCK_PAYMENTS.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.pnr.includes(searchTerm) ||
      p.trainName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSpent = MOCK_PAYMENTS.filter((p) => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadReceipt = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Receipt for ${id} downloaded successfully!`);
    }, 1000);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="section-pill mb-3">
          <CreditCard className="h-3.5 w-3.5" /> Financial Records
        </div>
        <h2 className="text-3xl font-black sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Payment History
        </h2>
        <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>
          View all transactions, download invoice receipts & track payment statuses.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card-dark p-6">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>Total Transactions</span>
          <p className="mt-2 text-3xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: '#818cf8' }}>
            {MOCK_PAYMENTS.length}
          </p>
          <span className="mt-1 inline-block text-xs" style={{ color: '#94a3b8' }}>All time bookings</span>
        </div>
        <div className="card-dark p-6">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>Successful Payments</span>
          <p className="mt-2 text-3xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: '#34d399' }}>
            ₹{totalSpent.toLocaleString('en-IN')}
          </p>
          <span className="mt-1 inline-block text-xs" style={{ color: '#94a3b8' }}>Total amount paid</span>
        </div>
        <div className="card-dark p-6">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748b' }}>Primary Payment Method</span>
          <p className="mt-2 text-xl font-black text-slate-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
            UPI (GPay)
          </p>
          <span className="mt-1 inline-block text-xs" style={{ color: '#22d3ee' }}>Default checkout method</span>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: '#64748b' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Transaction ID, PNR or Train..."
            className="input-dark pl-10"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" style={{ color: '#64748b' }} />
          <span className="text-xs font-semibold" style={{ color: '#64748b' }}>Filter:</span>
          {(['ALL', 'SUCCESS', 'FAILED', 'PENDING'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                statusFilter === st ? 'btn-brand text-white' : 'btn-ghost text-slate-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <tr style={{ color: '#64748b' }} className="text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Txn ID / Date</th>
                <th className="p-4">Train & PNR</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="transition hover:bg-white/[0.02]">
                  <td className="p-4">
                    <span className="font-mono font-bold text-slate-100">{p.id}</span>
                    <span className="block text-xs" style={{ color: '#64748b' }}>{p.date}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-200">{p.trainName} (#{p.trainNumber})</span>
                    <span className="block text-xs font-mono" style={{ color: '#94a3b8' }}>PNR: {p.pnr}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-300">
                    {p.method}
                  </td>
                  <td className="p-4 font-bold text-slate-100">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    {p.status === 'SUCCESS' && (
                      <span className="badge-success inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Success
                      </span>
                    )}
                    {p.status === 'FAILED' && (
                      <span className="badge-danger inline-flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> Failed
                      </span>
                    )}
                    {p.status === 'PENDING' && (
                      <span className="badge-warning inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {p.status === 'SUCCESS' ? (
                      <button
                        onClick={() => handleDownloadReceipt(p.id)}
                        disabled={downloadingId === p.id}
                        className="btn-ghost px-3 py-1.5 text-xs inline-flex items-center gap-1"
                      >
                        <Download className="h-3.5 w-3.5 text-indigo-400" />
                        {downloadingId === p.id ? 'Saving...' : 'Receipt'}
                      </button>
                    ) : (
                      <span className="text-xs" style={{ color: '#475569' }}>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center" style={{ color: '#64748b' }}>
                    No payment records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
