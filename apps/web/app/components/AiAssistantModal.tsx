'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';

interface AiAssistantModalProps { onClose: () => void; }

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Hi! I\'m RailAI 🚂 — your smart travel assistant. I can help with trip planning, train recommendations, fare estimates, platform info, and more. Ask me anything!' },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = ['Cheapest train Delhi to Mumbai?', 'Best Rajdhani for families?', 'Tatkal booking tips', 'Platform info for NDLS'];

  const handleSend = (text?: string) => {
    const msg = (text || input).trim(); if (!msg) return;
    setMessages((p) => [...p, { role: 'user' as const, text: msg }]); setInput('');
    setTimeout(() => {
      const responses: Record<string, string> = {
        'cheap': '💰 The cheapest option is Garib Rath (12203) with Sleeper class starting at ₹455. Departure: 15:55 from NDLS.',
        'rajdhani': '🚄 Rajdhani Express (12301) is the premium choice! 1AC from ₹4,255 with meals included. Runs daily, departs 16:55.',
        'tatkal': '⚡ Tatkal tips: Login 5 min early, pre-fill passenger details, use fast payment (UPI recommended), book AC at 10:00 AM sharp.',
        'platform': '🏗️ New Delhi (NDLS) has 16 platforms. Rajdhani usually departs from Platform 3-5. Check live status for real-time updates.',
      };
      const key = Object.keys(responses).find((k) => msg.toLowerCase().includes(k));
      setMessages((p) => [...p, { role: 'bot' as const, text: key ? responses[key] : `Great question! Based on current data, I recommend checking the Search tab for real-time availability. For ${msg}, you can also try our PNR and Live Status tools. Need anything else?` }]);
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden flex flex-col" style={{ maxHeight: '80vh' }}>
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/20">
              <Icons.brain className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">RailAI Assistant</h3>
              <p className="text-[10px] text-purple-600 font-bold">Powered by AI • Always Learning</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl bg-white p-2 text-stone-400 hover:text-stone-700 border border-stone-200 hover:border-stone-300 transition-all">
            <Icons.x className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-stone-100 bg-white px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {quickQuestions.map((q, i) => (
            <button key={i} onClick={() => handleSend(q)} className="shrink-0 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-[11px] font-semibold text-stone-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-all">
              <Icons.sparkles className="h-3.5 w-3.5 inline mr-1" />{q}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-stone-50/30">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${m.role === 'user' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-white text-stone-700 border border-stone-200 shadow-sm'}`}>
                {m.role === 'bot' && <Icons.bot className="inline h-3.5 w-3.5 text-purple-600 mr-1.5" />}{m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="border-t border-stone-200 bg-white p-4 flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask RailAI anything…" className="field-control flex-1" />
          <button type="submit" className="btn-brand grid h-11 w-11 place-items-center rounded-xl shrink-0">
            <Icons.send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};