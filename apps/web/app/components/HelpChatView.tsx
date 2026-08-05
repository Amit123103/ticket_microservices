'use client';

import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Send, Bot, User, ChevronDown, ChevronUp, Phone, Mail, FileQuestion, Sparkles } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: 'Booking' | 'Cancellation' | 'PNR & Live' | 'Payments';
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

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const HelpChatView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'chat'>('faq');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Chat state
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
      {/* Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="section-pill mb-3">
          <HelpCircle className="h-3.5 w-3.5" /> Customer Care & Support
        </div>
        <h2 className="text-3xl font-black sm:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Help Center & Live Assistance
        </h2>
        <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>
          Find answers to common travel queries or chat live with our RailAI support team.
        </p>
      </div>

      {/* Main Switch Tabs */}
      <div className="mb-8 flex justify-center">
        <div className="glass-light inline-flex rounded-2xl p-1.5 border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition ${
              activeTab === 'faq' ? 'btn-brand text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileQuestion className="h-4 w-4" /> Frequently Asked Questions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition ${
              activeTab === 'chat' ? 'btn-brand text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="h-4 w-4 text-cyan-400" /> Live AI Chat Support
          </button>
        </div>
      </div>

      {/* TAB 1: FAQ ACCORDION */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'btn-ghost text-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="mx-auto max-w-4xl space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="card-dark overflow-hidden transition-all duration-200"
                  style={{ borderColor: isOpen ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)' }}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-slate-100 transition hover:bg-white/[0.02]"
                  >
                    <span className="flex items-center gap-3 text-sm sm:text-base">
                      <span className="badge-brand text-[10px] uppercase">{faq.category}</span>
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-indigo-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-slate-500" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="border-t p-5 text-sm leading-relaxed" style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Support Direct Grid */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="card-dark p-6 flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100">Toll Free Helpline</h4>
                <p className="text-sm font-mono font-bold text-indigo-400 mt-0.5">1800-111-139</p>
                <span className="text-xs" style={{ color: '#64748b' }}>24x7 Customer Support</span>
              </div>
            </div>
            <div className="card-dark p-6 flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-purple-500/20 text-purple-400">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100">Email Assistance</h4>
                <p className="text-sm font-mono font-bold text-cyan-400 mt-0.5">care@railgo.in</p>
                <span className="text-xs" style={{ color: '#64748b' }}>Response within 2 hours</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE CHAT */}
      {activeTab === 'chat' && (
        <div className="mx-auto max-w-3xl">
          <div className="card-dark overflow-hidden flex flex-col h-[600px] border" style={{ borderColor: 'rgba(99,102,241,0.3)' }}>
            {/* Chat Box Header */}
            <div className="flex items-center justify-between p-4 border-b bg-slate-900/80 glass" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white shadow-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">RailAI Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px]" style={{ color: '#94a3b8' }}>Online • 28 Microservices Connected</span>
                  </div>
                </div>
              </div>
              <span className="badge-brand text-[10px]">Instant AI</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: 'rgba(8,12,20,0.6)' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 animate-chat-pop ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'card-dark text-slate-200 rounded-tl-none border-white/10'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block mt-1 text-[10px] ${
                        msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-500'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold p-2">
                  <Bot className="h-4 w-4 animate-spin" /> RailAI is typing...
                </div>
              )}
            </div>

            {/* Quick Questions Chips */}
            <div className="px-4 py-2 border-t flex flex-wrap gap-2 text-xs" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(15,23,36,0.9)' }}>
              <span className="text-[10px] font-bold uppercase text-slate-500 self-center">Suggested:</span>
              <button
                onClick={() => handleQuickQuestion('How do I cancel my ticket?')}
                className="btn-ghost px-2.5 py-1 text-[11px] rounded-lg"
              >
                Cancel ticket info
              </button>
              <button
                onClick={() => handleQuickQuestion('When will I get my refund?')}
                className="btn-ghost px-2.5 py-1 text-[11px] rounded-lg"
              >
                Refund status ETA
              </button>
              <button
                onClick={() => handleQuickQuestion('How to check PNR status?')}
                className="btn-ghost px-2.5 py-1 text-[11px] rounded-lg"
              >
                PNR tracking help
              </button>
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t bg-slate-900/90 glass flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask RailAI anything about train booking, PNR or refunds..."
                className="input-dark flex-1 text-sm py-2.5"
              />
              <button type="submit" className="btn-brand px-4 py-2.5 rounded-xl shrink-0">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
