'use client';

import { FormEvent, useMemo, useState } from 'react';

type Train = {
  id: string;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  seats: number;
  badge?: string;
};

const trains: Train[] = [
  { id: 'rajdhani', name: 'Rajdhani Express', number: '12951', departure: '06:10', arrival: '14:45', duration: '8h 35m', price: 1240, seats: 32, badge: 'Best value' },
  { id: 'vande', name: 'Vande Bharat Express', number: '20901', departure: '08:00', arrival: '13:35', duration: '5h 35m', price: 1690, seats: 18, badge: 'Fastest' },
  { id: 'intercity', name: 'Intercity Superfast', number: '19015', departure: '10:20', arrival: '18:40', duration: '8h 20m', price: 890, seats: 46 },
];

const cities = ['Mumbai', 'New Delhi', 'Ahmedabad', 'Bengaluru', 'Chennai', 'Pune', 'Kolkata'];

export default function Page() {
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('New Delhi');
  const [travelDate, setTravelDate] = useState('2026-08-15');
  const [passengers, setPassengers] = useState(1);
  const [searched, setSearched] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [travelClass, setTravelClass] = useState('AC 3 Tier');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [bookingId, setBookingId] = useState<string | null>(null);

  const total = useMemo(() => (selectedTrain ? selectedTrain.price * passengers : 0), [selectedTrain, passengers]);

  function searchTrains(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearched(true);
    setSelectedTrain(null);
    setBookingId(null);
  }

  function switchRoute() {
    setFrom(to);
    setTo(from);
  }

  function bookTicket() {
    if (!selectedTrain) return;
    setBookingId(`TKT${Math.floor(100000 + Math.random() * 900000)}`);
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a className="flex items-center gap-3" href="#top">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-xl text-white shadow-lg shadow-indigo-200">?</span>
            <span>
              <strong className="block text-lg tracking-tight">RailGo</strong>
              <span className="text-xs font-medium text-slate-500">Your journey, simplified</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a className="text-indigo-600" href="#search">Book tickets</a>
            <a href="#trips">My trips</a>
            <a href="#support">Help & support</a>
          </nav>
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600">Sign in</button>
        </div>
      </header>

      <section id="top" className="hero-pattern overflow-hidden bg-slate-950 px-5 pb-24 pt-14 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-300">India&apos;s easy train booking</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Find the right train. Book in minutes.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">Search routes, choose your preferred seat, and get your ticket confirmation instantly.</p>
          </div>

          <form id="search" onSubmit={searchTrains} className="relative z-10 mt-10 rounded-2xl bg-white p-4 text-slate-900 shadow-2xl shadow-slate-950/30 lg:p-6">
            <div className="mb-5 flex gap-5 text-sm font-semibold">
              <label className="flex cursor-pointer items-center gap-2 text-indigo-600"><input defaultChecked name="trip" type="radio" className="accent-indigo-600" /> One way</label>
              <label className="flex cursor-pointer items-center gap-2 text-slate-500"><input name="trip" type="radio" className="accent-indigo-600" /> Round trip</label>
            </div>
            <div className="grid gap-3 lg:grid-cols-[1.15fr_44px_1.15fr_1fr_0.75fr_auto] lg:items-end">
              <label className="field-label">From
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="field-control">{cities.map((city) => <option key={city}>{city}</option>)}</select>
              </label>
              <button onClick={switchRoute} type="button" aria-label="Switch origin and destination" className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-lg text-indigo-600 transition hover:bg-indigo-50">?</button>
              <label className="field-label">To
                <select value={to} onChange={(e) => setTo(e.target.value)} className="field-control">{cities.filter((city) => city !== from).map((city) => <option key={city}>{city}</option>)}</select>
              </label>
              <label className="field-label">Departure
                <input value={travelDate} onChange={(e) => setTravelDate(e.target.value)} min="2026-08-05" type="date" className="field-control" />
              </label>
              <label className="field-label">Travellers
                <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="field-control">{[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'Adult' : 'Adults'}</option>)}</select>
              </label>
              <button className="h-12 rounded-xl bg-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">Search trains</button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {!searched && !bookingId && (
          <div className="grid gap-5 md:grid-cols-3">
            {[['Easy changes', 'Manage your booking online anytime.'], ['Secure checkout', 'Your payment details are always protected.'], ['Live seat choice', 'Pick available seats before you pay.']].map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-indigo-50 font-bold text-indigo-600">0{index + 1}</span>
                <h2 className="font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        )}

        {searched && !bookingId && (
          <div className="grid gap-7 xl:grid-cols-[1fr_380px]">
            <section>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div><p className="text-sm font-semibold text-indigo-600">{from} to {to}</p><h2 className="text-2xl font-bold">Available trains</h2><p className="mt-1 text-sm text-slate-500">{travelDate} ? {passengers} traveller{passengers > 1 ? 's' : ''}</p></div>
                <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">? Sort by departure</button>
              </div>
              <div className="space-y-4">
                {trains.map((train) => (
                  <article key={train.id} className={`rounded-2xl border bg-white p-5 shadow-sm transition ${selectedTrain?.id === train.id ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200'}`}>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{train.name}</h3>{train.badge && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{train.badge}</span>}</div><p className="mt-1 text-xs text-slate-500">Train {train.number} ? Daily</p></div>
                      <div className="flex items-center gap-4 text-center"><div><strong className="block text-lg">{train.departure}</strong><span className="text-xs text-slate-500">{from}</span></div><div className="min-w-20"><span className="block text-xs text-slate-400">{train.duration}</span><span className="mt-1 block border-t border-dashed border-slate-300">?</span></div><div><strong className="block text-lg">{train.arrival}</strong><span className="text-xs text-slate-500">{to}</span></div></div>
                      <div className="flex items-center justify-between gap-4 sm:block sm:text-right"><div><strong className="text-lg">?{train.price.toLocaleString('en-IN')}</strong><span className="block text-xs text-emerald-600">{train.seats} seats left</span></div><button onClick={() => setSelectedTrain(train)} className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">Select</button></div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-6">
              {selectedTrain ? <>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Your journey</p><h2 className="mt-1 text-xl font-bold">{selectedTrain.name}</h2><p className="mt-1 text-sm text-slate-500">{from} ? {to} ? {travelDate}</p>
                <div className="my-5 border-y border-slate-100 py-5"><p className="field-label">Travel class</p><div className="mt-2 grid grid-cols-2 gap-2">{['AC 3 Tier', 'AC Chair Car', 'Sleeper', 'Second Sitting'].map((item) => <button key={item} onClick={() => setTravelClass(item)} className={`rounded-lg border px-2 py-2 text-xs font-semibold ${travelClass === item ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}>{item}</button>)}</div></div>
                <label className="field-label">Lead traveller name<input defaultValue="Amit Kumar" className="field-control mt-1" /></label>
                <label className="field-label mt-4">Mobile number<input defaultValue="98765 43210" className="field-control mt-1" /></label>
                <div className="mt-5"><p className="field-label">Payment method</p><div className="mt-2 space-y-2">{['UPI', 'Credit / Debit Card', 'Net Banking'].map((method) => <label key={method} className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-3 text-sm font-semibold ${paymentMethod === method ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}`}><span>{method}</span><input checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} name="payment" type="radio" className="accent-indigo-600" /></label>)}</div></div>
                <div className="mt-5 flex items-center justify-between"><span className="text-sm text-slate-500">Total fare</span><strong className="text-xl">?{total.toLocaleString('en-IN')}</strong></div>
                <button onClick={bookTicket} className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">Pay ?{total.toLocaleString('en-IN')} & book</button><p className="mt-3 text-center text-xs text-slate-400">By continuing, you agree to the booking terms.</p>
              </> : <div className="py-10 text-center"><span className="grid mx-auto h-12 w-12 place-items-center rounded-full bg-indigo-50 text-xl text-indigo-600">?</span><h2 className="mt-4 font-bold">Choose a train</h2><p className="mt-2 text-sm leading-6 text-slate-500">Select a train to see fares, classes, and payment options.</p></div>}
            </aside>
          </div>
        )}

        {bookingId && selectedTrain && <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-12"><span className="grid mx-auto h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-600">?</span><p className="mt-6 text-sm font-bold uppercase tracking-wider text-emerald-600">Booking confirmed</p><h2 className="mt-2 text-3xl font-bold">You&apos;re all set for your trip!</h2><p className="mt-3 text-slate-500">Your e-ticket has been sent to your registered mobile number.</p><div className="my-7 grid gap-4 rounded-2xl bg-slate-50 p-5 text-left sm:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Booking ID</p><p className="mt-1 font-bold text-indigo-600">{bookingId}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Total paid</p><p className="mt-1 font-bold">?{total.toLocaleString('en-IN')}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Train</p><p className="mt-1 font-semibold">{selectedTrain.name}</p></div><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Journey</p><p className="mt-1 font-semibold">{from} ? {to}</p></div></div><button onClick={() => { setSearched(false); setSelectedTrain(null); setBookingId(null); }} className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800">Book another ticket</button></section>}
      </section>

      <footer id="support" className="mt-12 border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row lg:px-8"><span>? 2026 RailGo. Built for better journeys.</span><span>24?7 customer support ? Safe & secure payments</span></div></footer>
    </main>
  );
}
