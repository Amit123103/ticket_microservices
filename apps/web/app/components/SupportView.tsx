'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';

export const SupportView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatMessages, setChatMessages] = useState([{ role: 'bot', text: 'Hello! I\'m RailGo support. Ask me anything about bookings, PNR, cancellations, or trains.' }]);
  const [chatInput, setChatInput] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    { q: 'How to check PNR status?', a: 'Go to the PNR Status tab, enter your 10-digit PNR number, and click GET STATUS.' },
    { q: 'Can I cancel a confirmed ticket?', a: 'Yes. Go to My Trips, open the booking, and click Cancel. Refunds are processed within 5-7 business days.' },
    { q: 'What is Tatkal quota?', a: 'Tatkal tickets open at 10:00 AM (AC) and 11:00 AM (Non-AC), one day before departure for emergency travel.' },
    { q: 'What payment methods are supported?', a: 'We support UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and RailGo Wallet.' },
    { q: 'How to track a running train?', a: 'Go to Live Status tab, enter the train number, and view real-time GPS location, delay, and ETA.' },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault(); if (!chatInput.trim()) return;
    const msg = chatInput.trim(); setChatMessages((p) => [...p, { role: 'user', text: msg }]); setChatInput('');
    setTimeout(() => {
      const responses: Record<string, string> = { 'cancel': 'To cancel, go to My Trips, find your booking, and click Cancel. Refund is 85% of fare.', 'refund': 'Refunds are processed to original payment method within 5-7 business days.', 'pnr': 'Go to PNR Status tab, enter your 10-digit PNR and click GET STATUS.', 'tatkal': 'Tatkal opens at 10AM (AC) / 11AM (Non-AC), one day before departure.' };
      const key = Object.keys(responses).find((k) => msg.toLowerCase().includes(k));
      setChatMessages((p) => [...p, { role: 'bot', text: key ? responses[key] : 'Thank you for your query. Our team will get back to you soon. For urgent issues, call 139.' }]);
    }, 800);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="section-pill mb-3">
          <Icons.headphones className="h-3.5 w-3.5" /> 24/7 Support
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Help & Support</h2>
        <p className="mt-2 text-sm text-stone-500">FAQs, live chat, ticket submission, and helpline — all in one place.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {[
          { l: 'Helpline', v: '139 / 1800-111-321', d: '24×7' },
          { l: 'Email', v: 'care@railgo.in', d: '24hr reply' },
          { l: 'Hours', v: '24×7 Available', d: 'All days' }
        ].map(({ l, v, d }) => (
          <div key={l} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-orange-200 transition-all">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-50 border border-orange-200">
              {l === 'Helpline' ? <Icons.phone className="h-5 w-5 text-orange-600" /> : l === 'Email' ? <Icons.mail className="h-5 w-5 text-orange-600" /> : <Icons.clock className="h-5 w-5 text-orange-600" />}
            </div>
            <div><p className="text-xs font-bold uppercase text-stone-400">{l}</p><p className="font-bold text-stone-900">{v}</p><p className="text-[11px] text-stone-400">{d}</p></div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-stone-900 text-lg mb-4 flex items-center gap-2"><Icons.fileQuestion className="h-5 w-5 text-orange-600" /> Frequently Asked</h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-stone-200 overflow-hidden hover:border-orange-200 transition-all">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-stone-800 hover:bg-stone-50">
                  <span>{faq.q}</span>{openFaq === idx ? <Icons.chevronUp className="h-4 w-4 text-orange-600" /> : <Icons.chevronDown className="h-4 w-4 text-stone-400" />}
                </button>
                {openFaq === idx && <div className="border-t border-stone-100 bg-orange-50 p-4 text-xs text-stone-600 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm flex flex-col">
          <div className="border-b border-stone-100 bg-orange-50/80 px-6 py-4 flex items-center gap-2">
            <Icons.messageSquare className="h-5 w-5 text-orange-600" /><span className="font-bold text-stone-900">Live Chat</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-orange-700"><span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse-soft" /> Online</span>
          </div>
          <div className="flex-1 max-h-72 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-xs ${m.role === 'user' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-700 border border-stone-200'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChat} className="border-t border-stone-100 p-3 flex gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask a question…" className="field-control flex-1 text-sm py-3" />
            <button type="submit" className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-white hover:bg-orange-500 transition-colors">
              <Icons.send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-stone-900 text-lg mb-4 flex items-center gap-2"><Icons.help className="h-5 w-5 text-orange-600" /> Submit Support Ticket</h3>
        {ticketSubmitted ? (
          <div className="text-center py-8 text-sm text-orange-700 font-bold">✓ Ticket submitted! We'll respond within 24 hours.</div>
        ) : (
          <div className="space-y-3">
            <input type="text" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Subject" className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm focus:outline-none focus:border-orange-400" />
            <textarea value={ticketBody} onChange={(e) => setTicketBody(e.target.value)} rows={4} placeholder="Describe your issue…" className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm focus:outline-none focus:border-orange-400 resize-none" />
            <button onClick={() => { if (ticketSubject && ticketBody) setTicketSubmitted(true); }} className="rounded-xl bg-orange-600 px-6 py-3 text-xs font-bold text-white hover:bg-orange-500 transition-colors">Submit Ticket</button>
          </div>
        )}
      </div>
    </section>
  );
};