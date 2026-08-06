'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';
import { Train, TrainClassInfo, Passenger, BookingTicket } from '../data/trainData';

interface BookingCheckoutProps { train: Train; selectedClass: TrainClassInfo; passengerCount: number; selectedSeats: string[]; travelDate: string; quota: string; onClose: () => void; onBookingSuccess: (ticket: BookingTicket) => void; }

export const BookingCheckout: React.FC<BookingCheckoutProps> = ({ train, selectedClass, passengerCount, selectedSeats, travelDate, quota, onClose, onBookingSuccess }) => {
  const [step, setStep] = useState<1|2|3>(1);
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengerCount }, (_, i) => ({ name: i===0?'Amit Kumar':`Passenger ${i+1}`, age: i===0?28:25+i*2, gender: i%2===0?'Male':'Female', berthPreference:'Lower', foodPreference:'Veg', seatAssigned: selectedSeats[i]||`B3-${i+14} (Lower)` }))
  );
  const [mobile, setMobile] = useState('9876543210');
  const [email, setEmail] = useState('amit.kumar@example.com');
  const [upiId, setUpiId] = useState('amit@gpay');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeFreeCancellation, setIncludeFreeCancellation] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI'|'Card'|'NetBanking'|'Wallet'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const baseFare = selectedClass.price * passengerCount;
  const totalFare = Math.round(baseFare + (includeInsurance ? 0.45*passengerCount : 0) + (includeFreeCancellation ? 99 : 0));

  const updatePassenger = (idx: number, field: keyof Passenger, value: any) => { const u = [...passengers]; u[idx] = { ...u[idx], [field]: value }; setPassengers(u); };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    passengers.forEach((p, i) => {
      if (!p.name.trim()) e[`passenger-${i}-name`] = 'Name is required';
      if (!p.age || p.age < 1 || p.age > 120) e[`passenger-${i}-age`] = 'Valid age required';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!mobile.trim() || mobile.length < 10) e.mobile = 'Valid mobile number required';
    if (!email.trim() || !email.includes('@')) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (paymentMethod === 'UPI' && (!upiId.trim() || !upiId.includes('@'))) e.upiId = 'Valid UPI ID required (e.g. user@gpay)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = (fromStep: 1|2) => {
    if (fromStep === 1 && !validateStep1()) return;
    if (fromStep === 2 && !validateStep2()) return;
    setStep(fromStep === 1 ? 2 : 3);
  };

  const handlePayAndBook = async () => {
    if (!validateStep3()) return;
    setIsProcessing(true);
    try {
      const newTicket: BookingTicket = {
        pnr: Math.floor(1e9+Math.random()*9e9).toString(), bookingId: `TKT${Math.floor(1e5+Math.random()*9e5)}`,
        trainNumber: train.number, trainName: train.name, fromCode: train.fromCode, fromCity: train.fromName,
        toCode: train.toCode, toCity: train.toName, departureDate: travelDate, departureTime: train.departureTime,
        arrivalTime: train.arrivalTime, travelClass: `${selectedClass.name} (${selectedClass.code})`, quota,
        passengers: passengers.map((p,i) => ({ ...p, status:'CNF (Confirmed)', seatAssigned: selectedSeats[i]||`B3-${i+14} (Lower)` })),
        totalFare, paymentMethod: paymentMethod==='UPI'?`UPI (${upiId})`:paymentMethod,
        bookingTime: new Date().toISOString().replace('T',' ').substring(0,16), status:'CONFIRMED',
        coach: selectedSeats[0]?.split('-')[0]||'B3', chartStatus:'CHART PREPARED',
      };
      await fetch('/api/tickets/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pnr: newTicket.pnr, bookingId: newTicket.bookingId, trainName: newTicket.trainName,
          trainNumber: newTicket.trainNumber, fromCity: newTicket.fromCity, toCity: newTicket.toCity,
          departureDate: newTicket.departureDate, departureTime: newTicket.departureTime,
          arrivalTime: newTicket.arrivalTime, travelClass: newTicket.travelClass, quota: newTicket.quota,
          passengers: newTicket.passengers, totalFare: newTicket.totalFare, paymentMethod: newTicket.paymentMethod,
          email: email, mobile: mobile,
        }),
      });
      setIsProcessing(false); onBookingSuccess(newTicket);
    } catch {
      setIsProcessing(false);
    }
  };

  const steps = [
    { n: 1, l: 'Passengers', icon: Icons.users },
    { n: 2, l: 'Contact', icon: Icons.mail },
    { n: 3, l: 'Payment', icon: Icons.creditCard },
  ] as const;

  return (
    <div className="modal-overlay">
      <div className="relative w-full max-w-3xl rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-4 py-3.5 sm:px-6 sm:py-5 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">IRCTC Checkout • Step {step}/3</span>
            </div>
            <h3 className="font-bold text-stone-900 text-base sm:text-lg truncate max-w-[240px] sm:max-w-none">{train.name} <span className="text-stone-400 font-normal">#{train.number}</span></h3>
          </div>
          <button onClick={onClose} className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all flex-shrink-0">
            <Icons.x className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 border-b border-stone-100 bg-white px-3 py-3 sm:px-6 sm:py-4 flex-shrink-0">
          {steps.map(({ n, l, icon: Icon }, i) => (
            <React.Fragment key={n}>
              {i > 0 && <div className="h-px w-4 sm:w-8 bg-stone-200" />}
              <button onClick={() => setStep(n as any)} className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${step >= n ? 'text-purple-700' : 'text-stone-400'}`}>
                <div className={`grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${step >= n ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20' : 'bg-stone-100 text-stone-400'}`}>
                  {step > n ? <Icons.sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : n}
                </div>
                <span className="text-[11px] sm:text-xs font-bold">{l}</span>
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
          {step === 1 && <div className="space-y-4 sm:space-y-5">
            <h4 className="font-bold text-stone-900 text-sm sm:text-base">Passenger Information</h4>
            {passengers.map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-purple-100 bg-white p-4 sm:p-5 space-y-3 sm:space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-600">Passenger {idx + 1}</span>
                  <span className="text-[11px] font-mono font-semibold text-stone-500 bg-stone-50 px-2 py-1 rounded-lg">{p.seatAssigned}</span>
                </div>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                  <div>
                    <label className="field-label">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={p.name} onChange={(e) => updatePassenger(idx,'name',e.target.value)} className="field-control mt-1" placeholder="Enter full name" />
                    {errors[`passenger-${idx}-name`] && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors[`passenger-${idx}-name`]}</p>}
                  </div>
                  <div>
                    <label className="field-label">Age <span className="text-red-500">*</span></label>
                    <input type="number" value={p.age} onChange={(e) => updatePassenger(idx,'age',Number(e.target.value))} className="field-control mt-1" min={1} max={120} />
                    {errors[`passenger-${idx}-age`] && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors[`passenger-${idx}-age`]}</p>}
                  </div>
                  <div>
                    <label className="field-label">Gender</label>
                    <select value={p.gender} onChange={(e) => updatePassenger(idx,'gender',e.target.value)} className="field-control mt-1">
                      <option>Male</option><option>Female</option><option>Transgender</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="field-label">Berth Preference</label>
                    <select value={p.berthPreference} onChange={(e) => updatePassenger(idx,'berthPreference',e.target.value)} className="field-control mt-1">
                      <option>No Preference</option><option>Lower</option><option>Middle</option><option>Upper</option><option>Side Lower</option><option>Side Upper</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Meal</label>
                    <select value={p.foodPreference} onChange={(e) => updatePassenger(idx,'foodPreference',e.target.value)} className="field-control mt-1">
                      <option>Veg</option><option>Non-Veg</option><option>Jain</option><option>No Meal</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <button onClick={() => handleNext(1)} className="w-full sm:w-auto btn-brand flex items-center justify-center gap-2">
                Continue <Icons.arrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>}

          {step === 2 && <div className="space-y-4 sm:space-y-5">
            <h4 className="font-bold text-stone-900 text-sm sm:text-base">Contact Information</h4>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="field-label">Mobile Number <span className="text-red-500">*</span></label>
                <div className="relative mt-1">
                  <Icons.phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 z-10" />
                  <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="field-control" style={{ paddingLeft: '2.5rem' }} placeholder="9876543210" />
                </div>
                {errors.mobile && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.mobile}</p>}
              </div>
              <div>
                <label className="field-label">Email Address <span className="text-red-500">*</span></label>
                <div className="relative mt-1">
                  <Icons.mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 z-10" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-control" style={{ paddingLeft: '2.5rem' }} placeholder="you@example.com" />
                </div>
                {errors.email && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.email}</p>}
              </div>
            </div>
            <label className="flex cursor-pointer items-start gap-3 sm:gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer">
              <input type="checkbox" checked={includeFreeCancellation} onChange={(e) => setIncludeFreeCancellation(e.target.checked)} className="mt-1 h-4 w-4 accent-purple-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-stone-800 text-sm">Free Cancellation (+₹99)</span>
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">Recommended</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">100% refund before chart preparation.</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-start gap-3 sm:gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer">
              <input type="checkbox" checked={includeInsurance} onChange={(e) => setIncludeInsurance(e.target.checked)} className="mt-1 h-4 w-4 accent-purple-600 flex-shrink-0" />
              <div className="flex-1">
                <span className="font-bold text-stone-800 text-sm">Travel Insurance (+₹0.45/pax)</span>
                <p className="text-xs text-stone-500 mt-1">Coverage up to ₹10,00,000.</p>
              </div>
            </label>
            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setStep(1)} className="btn-ghost text-xs">Back</button>
              <button onClick={() => handleNext(2)} className="btn-brand flex items-center gap-2">
                Continue <Icons.arrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>}

          {step === 3 && <div className="space-y-4 sm:space-y-5">
            <h4 className="font-bold text-stone-900 text-sm sm:text-base">Payment Method</h4>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
              {[{id:'UPI',l:'UPI / GPay',i:Icons.smartphone},{id:'Card',l:'Cards',i:Icons.creditCard},{id:'NetBanking',l:'Net Banking',i:Icons.building},{id:'Wallet',l:'Wallet',i:Icons.wallet}].map(({id,l,i:Icon}) => (
                <button key={id} onClick={() => setPaymentMethod(id as any)}
                  className={`flex flex-col items-center gap-2 sm:gap-3 rounded-2xl border p-3.5 sm:p-5 transition-all ${paymentMethod===id?'border-purple-400 bg-purple-50 shadow-sm shadow-purple-500/10':'border-stone-200 hover:border-purple-300 hover:bg-purple-50/30'}`}>
                  <Icon className={`h-5 w-5 ${paymentMethod===id?'text-purple-600':'text-stone-400'}`} />
                  <span className={`text-xs font-semibold ${paymentMethod===id?'text-purple-700':'text-stone-600'}`}>{l}</span>
                </button>
              ))}
            </div>
            {paymentMethod==='UPI' && <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-4 sm:p-5">
              <label className="field-label">UPI ID <span className="text-red-500">*</span></label>
              <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="field-control mt-1" placeholder="user@gpay" />
              {errors.upiId && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.upiId}</p>}
              <p className="text-[10px] text-stone-400 mt-1.5">Example: amit@gpay, name@upi</p>
            </div>}
            <div className="rounded-2xl bg-purple-50/80 p-4 sm:p-5 border border-purple-200 space-y-2.5 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm text-stone-600">
                <span>Base Fare ({passengerCount} Pax)</span>
                <span className="font-semibold">₹{baseFare}</span>
              </div>
              {includeFreeCancellation && <div className="flex justify-between text-xs sm:text-sm text-stone-600">
                <span>Free Cancellation</span>
                <span className="font-semibold">₹99</span>
              </div>}
              <div className="flex justify-between border-t border-purple-200 pt-2.5 sm:pt-3 font-bold text-stone-900 text-sm sm:text-base">
                <span>Total</span>
                <span className="text-purple-700">₹{totalFare}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setStep(2)} disabled={isProcessing} className="btn-ghost text-xs">Back</button>
              <button disabled={isProcessing} onClick={handlePayAndBook}
                className="btn-brand flex items-center justify-center gap-2 px-6 sm:px-8 py-3">
                {isProcessing ? <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div><span>Processing...</span></> : <><Icons.sparkles className="h-4 w-4" /><span>Pay ₹{totalFare} & Book</span></>}
              </button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};