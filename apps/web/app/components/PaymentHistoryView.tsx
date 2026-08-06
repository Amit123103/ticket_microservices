'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

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
  { id: 'TXN-894204', pnr: '8492049182', trainName: 'Vande Bharat Express', trainNumber: '20901', amount: 2840, date: '2026-08-04 14:20', method: 'UPI (GPay)', status: 'SUCCESS' },
  { id: 'TXN-218491', pnr: '2184910482', trainName: 'Rajdhani Express', trainNumber: '12951', amount: 2250, date: '2026-08-03 10:02', method: 'Credit Card', status: 'SUCCESS' },
  { id: 'TXN-109283', pnr: '9012830192', trainName: 'Tejas Express', trainNumber: '82901', amount: 1420, date: '2026-07-28 09:15', method: 'RailGo Wallet', status: 'SUCCESS' },
  { id: 'TXN-098231', pnr: '7819203912', trainName: 'Deccan Queen', trainNumber: '12123', amount: 485, date: '2026-07-15 16:45', method: 'UPI (GPay)', status: 'FAILED' },
];

export const PaymentHistoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'FAILED' | 'PENDING'>('ALL');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredPayments = MOCK_PAYMENTS.filter((p) => {
    const matchesSearch = p.id.toLowerCase().includes(searchTerm.toLowerCase()) || p.pnr.includes(searchTerm) || p.trainName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSpent = MOCK_PAYMENTS.filter((p) => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadReceipt = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => { setDownloadingId(null); alert(`Receipt for ${id} downloaded successfully!`); }, 1000);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="section-pill mb-3"><Icons.card className="h-3.5 w-3.5" /> Financial Records</div>
        <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Payment History</h2>
        <p className="mt-2 text-sm text-stone-500">View all transactions, download invoice receipts & track payment statuses.</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Transactions</span>
          <p className="mt-2 text-3xl font-bold text-indigo-600" style={{ fontFamily: 'Outfit, sans-serif' }}>{MOCK_PAYMENTS.length}</p>
          <span className="mt-1 inline-block text-xs text-stone-400">All time bookings</span>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Successful Payments</span>
          <p className="mt-2 text-3xl font-bold text-emerald-600" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{totalSpent.toLocaleString('en-IN')}</p>
          <span className="mt-1 inline-block text-xs text-stone-400">Total amount paid</span>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Primary Payment Method</span>
          <p className="mt-2 text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>UPI (GPay)</p>
          <span className="mt-1 inline-block text-xs text-purple-600">Default checkout method</span>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Icons.search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by Transaction ID, PNR or Train..." className="field-control pl-10" />
        </div>
        <div className="flex items-center gap-2">
          <Icons.filter className="h-4 w-4 text-stone-400" />
          <span className="text-xs font-semibold text-stone-500">Filter:</span>
          {(['ALL', 'SUCCESS', 'FAILED', 'PENDING'] as const).map((st) => (
            <button key={st} onClick={() => setStatusFilter(st)} className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${statusFilter === st ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20' : 'bg-white text-stone-500 border border-stone-200 hover:border-purple-300 hover:text-purple-700'}`}>{st}</button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50">
              <tr className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                <th className="p-4">Txn ID / Date</th>
                <th className="p-4">Train & PNR</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="transition hover:bg-stone-50/50">
                  <td className="p-4"><span className="font-mono font-bold text-stone-800">{p.id}</span><span className="block text-xs text-stone-400 mt-0.5">{p.date}</span></td>
                  <td className="p-4"><span className="font-bold text-stone-800">{p.trainName} <span className="text-stone-400 font-normal">#{p.trainNumber}</span></span><span className="block text-xs font-mono text-stone-400 mt-0.5">PNR: {p.pnr}</span></td>
                  <td className="p-4 font-semibold text-stone-600">{p.method}</td>
                  <td className="p-4 font-bold text-stone-900">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    {p.status === 'SUCCESS' && <span className="badge-success inline-flex items-center gap-1.5"><Icons.check className="h-3.5 w-3.5" /> Success</span>}
                    {p.status === 'FAILED' && <span className="badge-danger inline-flex items-center gap-1.5"><Icons.x className="h-3.5 w-3.5" /> Failed</span>}
                    {p.status === 'PENDING' && <span className="badge-warning inline-flex items-center gap-1.5"><Icons.clock className="h-3.5 w-3.5" /> Pending</span>}
                  </td>
                  <td className="p-4 text-right">
                    {p.status === 'SUCCESS' ? (
                      <button onClick={() => handleDownloadReceipt(p.id)} disabled={downloadingId === p.id} className="btn-ghost px-3 py-2 text-xs inline-flex items-center gap-1.5">
                        <Icons.download className="h-3.5 w-3.5 text-indigo-600" /> {downloadingId === p.id ? 'Saving...' : 'Receipt'}
                      </button>
                    ) : <span className="text-xs text-stone-400">N/A</span>}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-stone-500">No payment records found matching your filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
