'use client';

import React, { useState } from 'react';
import { Sparkles, Bot, Send, CheckCircle2, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const AITravelAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    {
      role: 'ai',
      text: "Namaste! I'm RailAI, your intelligent IRCTC microservice travel assistant. Ask me anything about seat confirmation odds, Tatkal timings, best train routes, or food recommendations!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsgs = [...messages, { role: 'user' as const, text: userText }];
    setMessages(newMsgs);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = "I've analyzed your request using RailAI Recommendation & Route microservices. Here is your personalized advice:";

      const lower = userText.toLowerCase();
      if (lower.includes('vande bharat') || lower.includes('fastest')) {
        reply = "⚡ Train #20901 Vande Bharat Express is the fastest train on the Mumbai-Ahmedabad route (160 km/h, 5h 25m total time). It has an average punctuality rating of 99.2% with gourmet meal services.";
      } else if (lower.includes('rac') || lower.includes('confirm') || lower.includes('wl')) {
        reply = "🎯 Historical AI Prediction: RAC 12 on Train #12951 Rajdhani Express has a 96% probability of getting fully confirmed (CNF) before chart preparation tomorrow morning!";
      } else if (lower.includes('tatkal')) {
        reply = "⏰ Tatkal Strategy Tip: AC Tatkal opens sharp at 10:00 AM (Non-AC at 11:00 AM). Make sure your RailGo Wallet is pre-funded with ₹2,500 for instant 1-click checkout!";
      } else if (lower.includes('food') || lower.includes('meal')) {
        reply = "🍕 E-Catering Recommendation: Order Domino's Paneer Makhani Pizza at Surat Junction (PF 1) or Haldiram's Deluxe Thali at Vadodara Junction!";
      }

      setMessages([...newMsgs, { role: 'ai', text: reply }]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 mb-3">
          <Bot className="h-4 w-4 text-indigo-400" />
          <span>Powered by ai-service & recommendation-service</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">RailAI Smart Travel Assistant</h2>
        <p className="mt-2 text-sm text-slate-400">
          Get instant predictions on seat confirmation probabilities, optimal routes, and Tatkal timing strategies.
        </p>
      </div>

      {/* Chat Container */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Chat Body */}
        <div className="p-6 h-[400px] overflow-y-auto space-y-4 bg-slate-950/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white font-bold ${
                  m.role === 'ai'
                    ? 'bg-gradient-to-tr from-indigo-600 to-emerald-500 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {m.role === 'ai' ? <Bot className="h-5 w-5" /> : ' You '}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                  m.role === 'ai'
                    ? 'border border-slate-800 bg-slate-900 text-slate-100'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>RailAI microservice analyzing parameters...</span>
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="border-t border-slate-800 bg-slate-950 p-3 flex flex-wrap gap-2">
          {[
            'Will my RAC 12 ticket get confirmed?',
            'Which train is fastest to Ahmedabad?',
            'What are the Tatkal booking rules?',
            'Suggest best meals on Rajdhani',
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-indigo-300 hover:border-indigo-500 hover:bg-slate-800"
            >
              ✨ {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2 border-t border-slate-800 bg-slate-900 p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask RailAI anything about your trip..."
            className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-bold text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white hover:bg-indigo-500"
          >
            <span>Ask AI</span>
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>
    </section>
  );
};
