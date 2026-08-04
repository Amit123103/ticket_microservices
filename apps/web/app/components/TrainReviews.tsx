'use client';

import React from 'react';
import { Star, ThumbsUp, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';
import { TRAIN_REVIEWS } from '../data/microservicesData';

export const TrainReviews: React.FC = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 mb-3">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>review-service Verified Feedback</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Train Ratings & Passenger Reviews</h2>
        <p className="mt-2 text-sm text-slate-400">
          Cleanliness scores, punctuality ratings, and authentic feedback from verified PNR travelers.
        </p>
      </div>

      {/* Aggregate Score Card */}
      <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="grid gap-6 sm:grid-cols-4 sm:divide-x sm:divide-slate-800 text-center">
          <div>
            <span className="text-3xl font-black text-amber-400">4.8 / 5</span>
            <p className="text-xs font-bold text-slate-300 mt-1">Overall Satisfaction</p>
          </div>
          <div>
            <span className="text-3xl font-black text-emerald-400">4.9 / 5</span>
            <p className="text-xs font-bold text-slate-300 mt-1">Coach Cleanliness</p>
          </div>
          <div>
            <span className="text-3xl font-black text-indigo-400">4.8 / 5</span>
            <p className="text-xs font-bold text-slate-300 mt-1">Punctuality Score</p>
          </div>
          <div>
            <span className="text-3xl font-black text-sky-400">4.6 / 5</span>
            <p className="text-xs font-bold text-slate-300 mt-1">On-board Catering</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {TRAIN_REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-3 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 font-bold text-white text-xs">
                  {rev.userName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">{rev.userName}</h4>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      {rev.userBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{rev.date} • Verified PNR Passenger</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-4 w-4 fill-amber-400" />
                <span className="font-extrabold text-sm">{rev.rating}</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-300">{rev.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
