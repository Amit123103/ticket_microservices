'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';

export const ReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Priya Sharma', train: 'Rajdhani Express (12301)', rating: 5, text: 'Excellent journey! Punctual departure, clean coaches, delicious meals served on time. The new LHB coaches are very comfortable.', date: '2026-08-03', likes: 42 },
    { id: 2, user: 'Rahul Verma', train: 'Shatabdi Express (12002)', rating: 4, text: 'Good experience overall. AC was working perfectly. Food quality has improved. Minor delay of 15 minutes at arrival.', date: '2026-08-02', likes: 28 },
    { id: 3, user: 'Anita Patel', train: 'Tamil Nadu Express (12621)', rating: 5, text: 'Best train on this route! Clean bedding, attentive staff, and the pantry car food was surprisingly good this time.', date: '2026-08-01', likes: 35 },
    { id: 4, user: 'Vikash Kumar', train: 'Duronto Express (12213)', rating: 3, text: 'Train was on time but cleanliness could be improved. Bio-toilets in some coaches were not working properly.', date: '2026-07-30', likes: 15 },
    { id: 5, user: 'Meera Nair', train: 'Garib Rath (12203)', rating: 4, text: 'Great value for money! AC coaches are well maintained. The only downside is no pantry car, but e-catering makes up for it.', date: '2026-07-29', likes: 22 },
  ]);

  const [newReview, setNewReview] = useState({ train: '', rating: 5, text: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!newReview.train || !newReview.text) return;
    setReviews([{ id: Date.now(), user: 'Amit Kumar', ...newReview, date: new Date().toISOString().split('T')[0], likes: 0 }, ...reviews]);
    setNewReview({ train: '', rating: 5, text: '' }); setShowForm(false);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="section-pill mb-3">
          <Icons.star className="h-3.5 w-3.5" /> Community
        </div>
        <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Train Reviews</h2>
        <p className="mt-2 text-sm text-stone-500">Real experiences from real travelers. Share yours too!</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { l: 'Total Reviews', v: reviews.length.toString() },
          { l: 'Avg Rating', v: '4.2 ★' },
          { l: 'Satisfaction', v: '92%' }
        ].map(({ l, v }) => (
          <div key={l} className="rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm hover:shadow-md transition-all">
            <p className="text-2xl font-bold text-orange-700" style={{ fontFamily: 'Outfit, sans-serif' }}>{v}</p>
            <p className="text-xs font-medium text-stone-500 mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 text-center">
        <button onClick={() => setShowForm(!showForm)} className="btn-brand text-xs px-6 py-3">
          <Icons.messageSquare className="h-4 w-4 mr-2 inline" /> {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <h4 className="font-bold text-stone-900 text-base">Share Your Experience</h4>
          <input type="text" value={newReview.train} onChange={(e) => setNewReview({ ...newReview, train: e.target.value })} placeholder="Train name and number" className="field-control" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-stone-500">Rating:</span>
            {[1,2,3,4,5].map((n) => (
              <button key={n} type="button" onClick={() => setNewReview({ ...newReview, rating: n })} className="p-0.5 transition-transform hover:scale-110">
                <Icons.star className={`h-5 w-5 ${n <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
              </button>
            ))}
          </div>
          <textarea value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} rows={3} placeholder="Write your review…" className="field-control resize-none" />
          <button type="submit" className="btn-brand flex items-center gap-2">
            <Icons.send className="h-3.5 w-3.5" /> Submit Review
          </button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-orange-700 font-bold text-sm border border-orange-200">{r.user[0]}</div>
                <div>
                  <p className="font-bold text-stone-900 text-sm">{r.user}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Icons.train className="h-3.5 w-3.5 text-orange-600" />
                    <span className="text-xs text-stone-500">{r.train}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icons.star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">{r.text}</p>
            <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <Icons.clock className="h-3 w-3" /> {r.date}
              </div>
              <button className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-orange-600 transition-colors font-medium">
                <Icons.thumbsUp className="h-3.5 w-3.5" /> {r.likes}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};