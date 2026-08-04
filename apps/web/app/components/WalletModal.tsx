'use client';

import React, { useState } from 'react';
import { Wallet, Plus, X, CheckCircle2, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { INITIAL_WALLET_TRANSACTIONS, WalletTransaction } from '../data/microservicesData';

interface WalletModalProps {
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ onClose }) => {
  const [balance, setBalance] = useState(2500);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_WALLET_TRANSACTIONS);
  const [topUpAmount, setTopUpAmount] = useState('500');
  const [isAdding, setIsAdding] = useState(false);

  const handleTopUp = () => {
    const amt = Number(topUpAmount) || 0;
    if (amt <= 0) return;

    setIsAdding(true);
    setTimeout(() => {
      setBalance((prev) => prev + amt);
      setTransactions([
        {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          type: 'CREDIT',
          amount: amt,
          title: 'UPI Top-Up Added',
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          referenceId: `UPI${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'SUCCESS',
        },
        ...transactions,
      ]);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">RailGo Fast-Pay Wallet</h3>
              <p className="text-xs text-slate-400">wallet-service • Zero-fee instant checkout & refunds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Balance Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-emerald-500/30 bg-emerald-950/30 p-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Available Wallet Balance</span>
              <h2 className="text-3xl font-black text-white mt-1">₹{balance.toLocaleString('en-IN')}</h2>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-24 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-bold text-white focus:outline-none"
              />
              <button
                onClick={handleTopUp}
                disabled={isAdding}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
              >
                <Plus className="h-4 w-4 stroke-[3]" />
                <span>{isAdding ? 'Adding...' : 'Top Up'}</span>
              </button>
            </div>
          </div>

          {/* Transactions Ledger */}
          <div>
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Transaction History & Instant Refunds:
            </h4>

            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-9 w-9 place-items-center rounded-xl font-bold ${
                        tx.type === 'CREDIT' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {tx.type === 'CREDIT' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">{tx.title}</h5>
                      <p className="text-[10px] text-slate-500">{tx.date} • Ref: {tx.referenceId}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <strong
                      className={`block text-sm font-black ${
                        tx.type === 'CREDIT' ? 'text-emerald-400' : 'text-slate-200'
                      }`}
                    >
                      {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount}
                    </strong>
                    <span className="text-[9px] font-bold text-emerald-400">{tx.status}</span>
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
