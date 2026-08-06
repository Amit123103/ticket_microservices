'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

interface HelpChatViewProps {}

interface FAQ {
  question: string;
  answer: string;
  category: 'Booking' | 'Cancellation' | 'PNR & Live' | 'Payments';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const FAQS: FAQ[] = [
  {
    question: 'How do I check my seat availability in real time?',
    answer: 'Simply enter your source and destination station along with your preferred travel date in the Search tab. Our engine queries Indian Railways live database to give you instant seat counts across 1A, 2A, 3A, SL, and Chair Car.',
    category: 'Booking',
  },
  {
    question: 'What is the refund rule for ticket cancellation?',
    answer: 'Cancellations made 48 hours prior to train departure incur flat cancellation charges (1A/EC: ₹240, 2A/3A: ₹200, SL: ₹120). Cancellations within 12-48 hours deduct 25% of fare, while within 4-12 hours deduct 50%.',
    category: 'Cancellation',
  },
  {
    question: 'How long does a refund take to reflect in my bank account?',
    answer: 'Refunds are automatically triggered immediately upon cancellation. Depending on your payment provider (UPI vs Credit Card), funds will land back in your account within 1 to 5 business days.',
    category: 'Payments',
  },
  {
    question: 'What does RAC and Waitlist (WL) status mean?',
    answer: 'RAC (Reservation Against Cancellation) guarantees a seat on the train, though you may need to share a side berth. WL (Waitlist) tickets cannot board unless confirmed before chart preparation.',
    category: 'PNR & Live',
  },
  {
    question: 'Can I change passenger details after booking?',
    answer: 'As per IRCTC rules, passenger name or age changes are allowed only by submitting an application at a railway reservation counter with valid government ID proof at least 24 hours before departure.',
    category: 'Booking',
  },
];

export const HelpChatView: React.FC<HelpChatViewProps> = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'chat'>('faq');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! 👋 Welcome to RailGo Support. How can I help you with your booking, PNR or refunds today?',
      time: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const categories = ['All', 'Booking', 'Cancellation', 'PNR & Live', 'Payments'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = 'Thank you for reaching out! A support specialist is reviewing your request. For urgent issues regarding active PNRs, please call our 24/7 helpline at 1800-111-139.';

      if (query.toLowerCase().includes('cancel') || query.toLowerCase().includes('refund')) {
        botResponse = 'For ticket cancellations, go to the "Trips" section, select your booking, and click "Cancel Ticket". Refunds are processed within 3-5 business days to your original payment mode.';
      } else if (query.toLowerCase().includes('pnr') || query.toLowerCase().includes('status')) {
        botResponse = 'You can track real-time PNR charting status and seat confirmation probability directly in our PNR Status tab by entering your 10-digit PNR number.';
      } else if (query.toLowerCase().includes('hi') || query.toLowerCase().includes('hello')) {
        botResponse = 'Hello! How can I assist you today? You can ask me about bookings, refunds, PNR status, or station amenities!';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickQuestion = (qText: string) => {
    setInputMessage(qText);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="section-pill mb-3">
          <Icons.help className="h-3.5 w-3.5" /> Customer Care & Support
        </div>
        <h2 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Help Center & Live Assistance
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Find answers to common travel queries or chat live with our RailAI support team.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-2xl p-1.5 border border-stone-200 bg-stone-50/80">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'faq' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Icons.fileQuestion className="h-4 w-4" /> Frequently Asked Questions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'chat' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Icons.messageSquare className="h-4 w-4" /> Live AI Chat Support
          </button>
        </div>
      </div>

      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white text-stone-500 border border-stone-200 hover:border-purple-300 hover:text-purple-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-4xl space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-stone-200/30"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-semibold text-stone-800 transition-colors hover:bg-stone-50/50"
                  >
                    <span className="flex items-center gap-3 text-sm sm:text-base">
                      <span className="badge-brand text-[10px] uppercase">{faq.category}</span>
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Icons.chevronUp className="h-5 w-5 shrink-0 text-purple-600" />
                    ) : (
                      <Icons.chevronDown className="h-5 w-5 shrink-0 text-stone-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="border-t border-stone-100 p-5 text-sm leading-relaxed text-stone-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-purple-100 bg-white p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
                <Icons.phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Toll Free Helpline</h4>
                <p className="text-sm font-mono font-bold text-purple-600 mt-0.5">1800-111-139</p>
                <span className="text-xs text-stone-400">24x7 Customer Support</span>
              </div>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-white p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
                <Icons.mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Email Assistance</h4>
                <p className="text-sm font-mono font-bold text-purple-600 mt-0.5">care@railgo.in</p>
                <span className="text-xs text-stone-400">Response within 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-purple-100 bg-white overflow-hidden flex flex-col shadow-lg shadow-purple-200/30" style={{ minHeight: '600px' }}>
            <div className="flex items-center justify-between p-4 border-b border-purple-100 bg-purple-50/50">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-purple-600 to-violet-600 text-white shadow-lg">
                  <Icons.bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">RailAI Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-soft" />
                    <span className="text-[11px] text-stone-500">Online • 28 Microservices Connected</span>
                  </div>
                </div>
              </div>
              <span className="badge-brand text-[10px]">Instant AI</span>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-purple-50/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 animate-fade-in ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gradient-to-tr from-purple-600 to-violet-600 text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? <Icons.user className="h-4 w-4" /> : <Icons.bot className="h-4 w-4" />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed transition-all ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-500/20'
                        : 'bg-white text-stone-700 rounded-tl-none border border-purple-100 shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block mt-1.5 text-[10px] ${
                        msg.sender === 'user' ? 'text-purple-200 text-right' : 'text-stone-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 p-2">
                  <Icons.bot className="h-4 w-4 animate-spin" /> RailAI is typing...
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-purple-100 bg-white flex flex-wrap gap-2">
              <span className="text-[10px] font-bold uppercase text-stone-400 self-center mr-1">Suggested:</span>
              {[
                'Cancel ticket info',
                'Refund status ETA',
                'PNR tracking help',
                'Tatkal rules'
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-[11px] font-semibold text-stone-600 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-200 bg-white flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask RailAI anything about train booking, PNR or refunds..."
                className="field-control flex-1 text-sm py-3"
              />
              <button type="submit" className="btn-brand px-4 py-3 rounded-xl shrink-0">
                <Icons.send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};