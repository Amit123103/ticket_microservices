'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Wallet, Smartphone, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { Train, TrainClassInfo, Passenger, BookingTicket } from '../data/trainData';

interface BookingCheckoutProps { train: Train; selectedClass: TrainClassInfo; passengerCount: number; selectedSeats: string[]; travelDate: string; quota: string; onClose: () => void; onBookingSuccess: (ticket: BookingTicket) => void; }

export const BookingCheckout: React.FC<BookingCheckoutProps> = ({ train, selectedClass, passengerCount, selectedSeats, travelDate, quota, onClose, onBookingSuccess }) => {
  const [step, setStep] = useState<1|2|3>(1);
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengerCount }, (_, i) => ({ name: i===0?'Amit Kumar':`Passenger ${i+1}`, age: i===0?28:25+i*2, gender: i%2===0?'Male':'Female', berthPreference:'Lower', foodPreference:'Veg', seatAssigned: selectedSeats[i]||`B3-${i+14} (Lower)` }))
  );
  const [mobile, setMobile] = useState('9876543210');
  const [email, setEmail] = useState('amit.kumar@example.com');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeFreeCancellation, setIncludeFreeCancellation] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI'|'Card'|'NetBanking'|'Wallet'>('UPI');
  const [upiId, setUpiId] = useState('amit@gpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const baseFare = selectedClass.price * passengerCount;
  const totalFare = Math.round(baseFare + (includeInsurance ? 0.45*passengerCount : 0) + (includeFreeCancellation ? 99 : 0));

  const updatePassenger = (idx: number, field: keyof Passenger, value: any) => { const u = [...passengers]; u[idx] = { ...u[idx], [field]: value }; setPassengers(u); };

  const handlePayAndBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
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
      setIsProcessing(false); onBookingSuccess(newTicket);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
          <div><span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">IRCTC Checkout • Step {step}/3</span>
            <h3 className="font-bold text-slate-900 text-xl">{train.name} (#{train.number})</h3></div>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200"><X className="h-5 w-5" /></button>
        </div>

        {/* Stepper */}
        <div className="flex border-b border-slate-100 bg-white px-6 py-3">
          {[{n:1,l:'Passengers'},{n:2,l:'Add-ons'},{n:3,l:'Payment'}].map(({n,l},i) => (
            <React.Fragment key={n}>
              {i>0 && <div className="mx-4 flex-1 self-center border-t border-slate-200"></div>}
              <div className={`flex items-center gap-2 text-xs font-bold ${step>=n?'text-emerald-700':'text-slate-400'}`}>
                <span className={`grid h-6 w-6 place-items-center rounded-full ${step>=n?'bg-emerald-600 text-white':'bg-slate-200 text-slate-400'}`}>{n}</span><span>{l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {step===1 && <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Passenger Information</h4>
            {passengers.map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700"><span>Passenger {idx+1}</span><span>{p.seatAssigned}</span></div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div><label className="field-label">Full Name</label><input type="text" value={p.name} onChange={(e) => updatePassenger(idx,'name',e.target.value)} className="field-control" /></div>
                  <div><label className="field-label">Age</label><input type="number" value={p.age} onChange={(e) => updatePassenger(idx,'age',Number(e.target.value))} className="field-control" /></div>
                  <div><label className="field-label">Gender</label><select value={p.gender} onChange={(e) => updatePassenger(idx,'gender',e.target.value)} className="field-control"><option>Male</option><option>Female</option><option>Transgender</option></select></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div><label className="field-label">Berth Preference</label><select value={p.berthPreference} onChange={(e) => updatePassenger(idx,'berthPreference',e.target.value)} className="field-control"><option>No Preference</option><option>Lower</option><option>Middle</option><option>Upper</option><option>Side Lower</option><option>Side Upper</option></select></div>
                  <div><label className="field-label">Meal</label><select value={p.foodPreference} onChange={(e) => updatePassenger(idx,'foodPreference',e.target.value)} className="field-control"><option>Veg</option><option>Non-Veg</option><option>Jain</option><option>No Meal</option></select></div>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4"><button onClick={() => setStep(2)} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-500">Continue <ArrowRight className="h-4 w-4" /></button></div>
          </div>}

          {step===2 && <div className="space-y-4">
            <h4 className="font-bold text-slate-900">Contact & Protection</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="field-label">Mobile</label><input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="field-control" /></div>
              <div><label className="field-label">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-control" /></div>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-300">
              <input type="checkbox" checked={includeFreeCancellation} onChange={(e) => setIncludeFreeCancellation(e.target.checked)} className="mt-1 h-4 w-4 accent-emerald-600" />
              <div><div className="flex items-center gap-2"><span className="font-bold text-slate-800 text-sm">Free Cancellation (+₹99)</span><span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Recommended</span></div>
                <p className="text-xs text-slate-400 mt-0.5">100% refund before chart preparation.</p></div>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-300">
              <input type="checkbox" checked={includeInsurance} onChange={(e) => setIncludeInsurance(e.target.checked)} className="mt-1 h-4 w-4 accent-emerald-600" />
              <div><span className="font-bold text-slate-800 text-sm">Travel Insurance (+₹0.45/pax)</span><p className="text-xs text-slate-400 mt-0.5">Coverage up to ₹10,00,000.</p></div>
            </label>
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-600 border border-slate-200">Back</button>
              <button onClick={() => setStep(3)} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-500">Payment <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>}

          {step===3 && <div className="space-y-5">
            <h4 className="font-bold text-slate-900">Payment Method</h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[{id:'UPI',l:'UPI / GPay',I:Smartphone},{id:'Card',l:'Cards',I:CreditCard},{id:'NetBanking',l:'Net Banking',I:Building2},{id:'Wallet',l:'Wallet',I:Wallet}].map(({id,l,I}) => (
                <button key={id} onClick={() => setPaymentMethod(id as any)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition ${paymentMethod===id?'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400':'border-slate-200 hover:border-emerald-300'}`}>
                  <I className="h-5 w-5 text-emerald-600" /><span className="text-xs font-bold text-slate-700">{l}</span>
                </button>
              ))}
            </div>
            {paymentMethod==='UPI' && <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><label className="field-label">UPI ID</label><input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="field-control mt-1" /></div>}
            <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600"><span>Base Fare ({passengerCount} Pax)</span><span>₹{baseFare}</span></div>
              {includeFreeCancellation && <div className="flex justify-between text-xs text-slate-600"><span>Free Cancellation</span><span>₹99</span></div>}
              <div className="flex justify-between border-t border-emerald-200 pt-2 font-bold text-slate-900 text-base"><span>Total</span><span className="text-emerald-700">₹{totalFare}</span></div>
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(2)} disabled={isProcessing} className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-600 border border-slate-200">Back</button>
              <button disabled={isProcessing} onClick={handlePayAndBook}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3.5 font-bold text-white shadow-xl shadow-emerald-500/20 hover:brightness-110 disabled:opacity-50">
                {isProcessing ? <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div><span>Processing...</span></> : <><Sparkles className="h-4 w-4" /><span>Pay ₹{totalFare} & Book</span></>}
              </button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};
