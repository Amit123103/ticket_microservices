'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

export interface WalletTransaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  amount: number;
  date: string;
  status: 'SUCCESS' | 'PENDING';
}

const MOCK_WALLET_TXNS: WalletTransaction[] = [
  { id: 'WTXN-001', type: 'CREDIT', description: 'Refund for PNR 8492049182', amount: 2414, date: '2026-08-05', status: 'SUCCESS' },
  { id: 'WTXN-002', type: 'DEBIT', description: 'Booking Rajdhani Express (12951)', amount: 2250, date: '2026-08-03', status: 'SUCCESS' },
  { id: 'WTXN-003', type: 'CREDIT', description: 'Wallet Top-Up via UPI', amount: 5000, date: '2026-07-28', status: 'SUCCESS' },
  { id: 'WTXN-004', type: 'DEBIT', description: 'E-Catering Order #ORD-4821', amount: 380, date: '2026-07-20', status: 'SUCCESS' },
  { id: 'WTXN-005', type: 'DEBIT', description: 'Booking Shatabdi Express (12002)', amount: 1420, date: '2026-07-15', status: 'SUCCESS' },
];

export const WalletModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [topUpAmount, setTopUpAmount] = useState('');
  const [showTopUp, setShowTopUp] = useState(false);
  const [balance, setBalance] = useState(8450);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = () => {
    const amt = Number(topUpAmount);
    if (amt <= 0 || isNaN(amt)) return;
    setIsProcessing(true);
    setTimeout(() => {
      setBalance((b) => b + amt);
      setIsProcessing(false);
      setShowTopUp(false);
      setTopUpAmount('');
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="relative w-full max-w-md rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
              <Icons.wallet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">RailGo Wallet</h3>
              <p className="text-xs text-stone-500 mt-0.5">Balance & Transactions</p>
            </div>
          </div>
          <button onClick={() => {}} className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all">
            <Icons.x className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg shadow-orange-500/20">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-100">Available Balance</span>
            <p className="mt-2 text-3xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{balance.toLocaleString('en-IN')}</p>
            <button onClick={() => setShowTopUp(!showTopUp)} className="mt-4 rounded-xl bg-white/20 px-4 py-2 text-xs font-bold hover:bg-white/30 transition-colors backdrop-blur-sm">
              {showTopUp ? 'Close' : '+ Top Up Wallet'}
            </button>
          </div>

          {showTopUp && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 space-y-3">
              <label className="field-label">Amount (₹)</label>
              <input type="number" value={topUpAmount} onChange={(e) => setTopUpAmount(e.target.value)} placeholder="Enter amount" className="field-control" />
              <button onClick={handleTopUp} disabled={isProcessing} className="btn-brand w-full py-3 text-sm">
                {isProcessing ? <Icons.arrowRight className="h-4 w-4 animate-spin" /> : <><Icons.send className="h-4 w-4" /> Top Up ₹{topUpAmount || '0'}</>}
              </button>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Recent Transactions</h4>
            <div className="space-y-3">
              {MOCK_WALLET_TXNS.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between rounded-2xl p-4 border border-stone-200 bg-white hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-xl ${txn.type === 'CREDIT' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                      {txn.type === 'CREDIT' ? <Icons.arrowUp className="h-4 w-4" /> : <Icons.arrowDown className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-800">{txn.description}</p>
                      <p className="text-[10px] text-stone-400">{txn.id} • {txn.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${txn.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {txn.type === 'CREDIT' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                    </p>
                    <span className={`text-[10px] font-bold ${txn.status === 'SUCCESS' ? 'text-emerald-500' : 'text-amber-500'}`}>{txn.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};