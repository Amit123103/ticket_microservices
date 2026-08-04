'use client';

import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Wallet, Smartphone, Building2, User, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { Train, TrainClassInfo, Passenger, BookingTicket } from '../data/trainData';

interface BookingCheckoutProps {
  train: Train;
  selectedClass: TrainClassInfo;
  passengerCount: number;
  selectedSeats: string[];
  travelDate: string;
  quota: string;
  onClose: () => void;
  onBookingSuccess: (ticket: BookingTicket) => void;
}

export const BookingCheckout: React.FC<BookingCheckoutProps> = ({
  train,
  selectedClass,
  passengerCount,
  selectedSeats,
  travelDate,
  quota,
  onClose,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengerCount }, (_, i) => ({
      name: i === 0 ? 'Amit Kumar' : `Passenger ${i + 1}`,
      age: i === 0 ? 28 : 25 + i * 2,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      berthPreference: 'Lower',
      foodPreference: 'Veg',
      seatAssigned: selectedSeats[i] || `B3 - ${i + 14} (Lower)`,
    }))
  );

  const [mobile, setMobile] = useState('9876543210');
  const [email, setEmail] = useState('amit.kumar@example.com');
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeFreeCancellation, setIncludeFreeCancellation] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Wallet'>('UPI');
  const [upiId, setUpiId] = useState('amit@gpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const baseFare = selectedClass.price * passengerCount;
  const insuranceCost = includeInsurance ? 0.45 * passengerCount : 0;
  const cancellationCost = includeFreeCancellation ? 99 : 0;
  const totalFare = Math.round(baseFare + insuranceCost + cancellationCost);

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handlePayAndBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedPnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      const generatedBookingId = `TKT${Math.floor(100000 + Math.random() * 900000)}`;

      const newTicket: BookingTicket = {
        pnr: generatedPnr,
        bookingId: generatedBookingId,
        trainNumber: train.number,
        trainName: train.name,
        fromCode: train.fromCode,
        fromCity: train.fromName,
        toCode: train.toCode,
        toCity: train.toName,
        departureDate: travelDate,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        travelClass: `${selectedClass.name} (${selectedClass.code})`,
        quota,
        passengers: passengers.map((p, idx) => ({
          ...p,
          status: 'CNF (Confirmed)',
          seatAssigned: selectedSeats[idx] || `B3 - ${idx + 14} (Lower)`,
        })),
        totalFare,
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${upiId})` : paymentMethod,
        bookingTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'CONFIRMED',
        coach: selectedSeats[0]?.split('-')[0] || 'B3',
        chartStatus: 'CHART PREPARED',
      };

      setIsProcessing(false);
      onBookingSuccess(newTicket);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
              IRCTC Checkout • Step {step} of 3
            </span>
            <h3 className="font-bold text-white text-xl">{train.name} (#{train.number})</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Stepper Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 py-3">
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-indigo-400' : 'text-slate-500'}`}>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-indigo-600 text-white">1</span>
            <span>Passenger Details</span>
          </div>
          <div className="mx-4 flex-1 self-center border-t border-slate-800"></div>
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-indigo-400' : 'text-slate-500'}`}>
            <span className={`grid h-6 w-6 place-items-center rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
            <span>Add-ons & Contact</span>
          </div>
          <div className="mx-4 flex-1 self-center border-t border-slate-800"></div>
          <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? 'text-indigo-400' : 'text-slate-500'}`}>
            <span className={`grid h-6 w-6 place-items-center rounded-full ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          
          {/* STEP 1: PASSENGERS */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base">Enter Passenger Information</h4>
              {passengers.map((p, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span>Passenger {idx + 1}</span>
                    <span>Assigned: {p.seatAssigned}</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="field-label">Full Name</label>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
                        className="field-control"
                      />
                    </div>
                    <div>
                      <label className="field-label">Age</label>
                      <input
                        type="number"
                        value={p.age}
                        onChange={(e) => updatePassenger(idx, 'age', Number(e.target.value))}
                        className="field-control"
                      />
                    </div>
                    <div>
                      <label className="field-label">Gender</label>
                      <select
                        value={p.gender}
                        onChange={(e) => updatePassenger(idx, 'gender', e.target.value as any)}
                        className="field-control"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="field-label">Berth Preference</label>
                      <select
                        value={p.berthPreference}
                        onChange={(e) => updatePassenger(idx, 'berthPreference', e.target.value as any)}
                        className="field-control"
                      >
                        <option value="No Preference">No Preference</option>
                        <option value="Lower">Lower Berth</option>
                        <option value="Middle">Middle Berth</option>
                        <option value="Upper">Upper Berth</option>
                        <option value="Side Lower">Side Lower</option>
                        <option value="Side Upper">Side Upper</option>
                      </select>
                    </div>
                    <div>
                      <label className="field-label">Meal Choice</label>
                      <select
                        value={p.foodPreference}
                        onChange={(e) => updatePassenger(idx, 'foodPreference', e.target.value as any)}
                        className="field-control"
                      >
                        <option value="Veg">Vegetarian</option>
                        <option value="Non-Veg">Non-Vegetarian</option>
                        <option value="Jain">Jain Meal</option>
                        <option value="No Meal">No Meal Required</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-500"
                >
                  <span>Continue to Add-ons</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADD-ONS & CONTACT */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base">Contact Details & Protection</h4>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">Mobile Number (for SMS ticket)</label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="field-control"
                  />
                </div>
                <div>
                  <label className="field-label">Email Address (for PDF e-ticket)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-control"
                  />
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-3 pt-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeFreeCancellation}
                    onChange={(e) => setIncludeFreeCancellation(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-indigo-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Assured Free Cancellation (+₹99)</span>
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Recommended</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Get 100% instant refund if you cancel your booking anytime before chart preparation.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-indigo-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Travel Insurance (+₹0.45/pax)</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Coverage up to ₹10,00,000 against accidents and travel delays.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-500"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="space-y-5">
              <h4 className="font-bold text-white text-base">Select Payment Method</h4>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { id: 'UPI', label: 'UPI / GPay', icon: Smartphone },
                  { id: 'Card', label: 'Cards', icon: CreditCard },
                  { id: 'NetBanking', label: 'Net Banking', icon: Building2 },
                  { id: 'Wallet', label: 'RailGo Wallet', icon: Wallet },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-600/20 text-white ring-1 ring-indigo-500'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-indigo-400" />
                      <span className="text-xs font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'UPI' && (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                  <label className="field-label">Enter UPI ID (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    className="field-control"
                  />
                  <p className="text-[11px] text-slate-400">Supports Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              )}

              {/* Summary Box */}
              <div className="rounded-2xl bg-indigo-950/40 p-4 border border-indigo-500/20 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Base Ticket Fare ({passengerCount} Pax)</span>
                  <span>₹{baseFare}</span>
                </div>
                {includeFreeCancellation && (
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Assured Free Cancellation Add-on</span>
                    <span>₹99</span>
                  </div>
                )}
                {includeInsurance && (
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Travel Insurance</span>
                    <span>₹{(0.45 * passengerCount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-white text-base">
                  <span>Total Amount Payable</span>
                  <span className="text-emerald-400">₹{totalFare}</span>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={isProcessing}
                  className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePayAndBook}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 px-8 py-3.5 font-bold text-white shadow-xl shadow-emerald-500/20 hover:brightness-110 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Processing IRCTC Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Pay ₹{totalFare} & Confirm Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
