'use client';
import React, { useState } from 'react';
import { X, Brain, Send, Sparkles, Train, Clock, Bot } from 'lucide-react';

interface AiAssistantModalProps { onClose: () => void; }

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m RailAI 🚂 — your smart travel assistant. I can help with trip planning, train recommendations, fare estimates, platform info, and more. Ask me anything!' },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = ['Cheapest train Delhi to Mumbai?', 'Best Rajdhani for families?', 'Tatkal booking tips', 'Platform info for NDLS'];

  const handleSend = (text?: string) => {
    const msg = (text || input).trim(); if (!msg) return;
    setMessages((p) => [...p, { role: 'user', text: msg }]); setInput('');
    setTimeout(() => {
      const responses: Record<string, string> = {
        'cheap': '💰 The cheapest option is Garib Rath (12203) with Sleeper class starting at ₹455. Departure: 15:55 from NDLS.',
        'rajdhani': '🚄 Rajdhani Express (12301) is the premium choice! 1AC from ₹4,255 with meals included. Runs daily, departs 16:55.',
        'tatkal': '⚡ Tatkal tips: Login 5 min early, pre-fill passenger details, use fast payment (UPI recommended), book AC at 10:00 AM sharp.',
        'platform': '🏗️ New Delhi (NDLS) has 16 platforms. Rajdhani usually departs from Platform 3-5. Check live status for real-time updates.',
      };
      const key = Object.keys(responses).find((k) => msg.toLowerCase().includes(k));
      setMessages((p) => [...p, { role: 'bot', text: key ? responses[key] : `Great question! Based on current data, I recommend checking the Search tab for real-time availability. For ${msg}, you can also try our PNR and Live Status tools. Need anything else?` }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: '80vh' }}>
        <div className="flex items-center justify-between border-b border-slate-100 bg-emerald-50 px-6 py-4">
          <div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white"><Brain className="h-5 w-5" /></div>
            <div><h3 className="font-bold text-slate-900">RailAI Assistant</h3><p className="text-[10px] text-emerald-600 font-bold">Powered by AI • Always Learning</p></div></div>
          <button onClick={onClose} className="rounded-full bg-white p-2 text-slate-400 hover:text-slate-700 border border-slate-200"><X className="h-5 w-5" /></button>
        </div>

        {/* Quick Questions */}
        <div className="border-b border-slate-100 bg-white px-4 py-3 flex gap-2 overflow-x-auto">
          {quickQuestions.map((q, i) => (
            <button key={i} onClick={() => handleSend(q)} className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100">{q}</button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                {m.role === 'bot' && <Bot className="inline h-3.5 w-3.5 text-emerald-600 mr-1" />}{m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="border-t border-slate-100 p-3 flex gap-2 bg-white">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask RailAI anything…" className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-400" />
          <button type="submit" className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-500"><Send className="h-4 w-4" /></button>
        </form>
      </div>
    </div>
  );
};
