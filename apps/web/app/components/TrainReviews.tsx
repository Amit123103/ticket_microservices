'use client';
import React from 'react';
import { Icons } from './Icons';
import { Train } from '../data/trainData';

interface TrainReviewsProps { train: Train; onClose: () => void; }

export const TrainReviews: React.FC<TrainReviewsProps> = ({ train, onClose }) => {
  const reviews = [
    { user: 'Priya S.', rating: 5, text: 'Excellent punctuality and clean coaches. The onboard catering was a pleasant surprise.', date: '2026-07-20' },
    { user: 'Rahul M.', rating: 4, text: 'Good experience overall. Slight delay of 12 minutes but staff was helpful.', date: '2026-07-15' },
    { user: 'Anita K.', rating: 5, text: 'Best train I have ever travelled on. The LHB coaches are very comfortable.', date: '2026-07-10' },
  ];

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="modal-overlay">
      <div className="relative w-full max-w-2xl rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
              <Icons.train className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">{train.name}</h3>
              <p className="text-xs text-stone-500 mt-0.5">#{train.number} • {train.fromName} → {train.toName}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all">
            <Icons.x className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-center gap-6 rounded-2xl bg-stone-50 p-5 border border-stone-200">
            <div className="text-center">
              <span className="text-4xl font-black text-orange-600" style={{ fontFamily: 'Outfit, sans-serif' }}>{avgRating}</span>
              <p className="text-xs text-stone-500 mt-1">Average Rating</p>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Icons.star key={i} className={`h-5 w-5 ${i < Math.round(parseFloat(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
              ))}
            </div>
            <span className="text-xs text-stone-400">{reviews.length} reviews</span>
          </div>

          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-orange-200 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-orange-50 text-orange-700 font-bold text-sm border border-orange-200">{r.user[0]}</div>
                    <div>
                      <p className="font-bold text-stone-900 text-sm">{r.user}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: 5 }, (_, j) => (
                          <Icons.star key={j} className={`h-3 w-3 ${j < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-400">{r.date}</span>
                </div>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};