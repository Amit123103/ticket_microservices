'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

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
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="section-pill mb-3">
          <Icons.sparkles className="h-3.5 w-3.5" /> AI-Powered Assistant
        </div>
        <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">RailAI Smart Travel Assistant</h2>
        <p className="mt-2 text-sm text-stone-500">
          Get instant predictions on seat confirmation probabilities, optimal routes, and Tatkal timing strategies.
        </p>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/30 overflow-hidden">
        <div className="p-6 h-[400px] overflow-y-auto space-y-4 bg-stone-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 animate-fade-in ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white font-bold ${
                  m.role === 'ai'
                    ? 'bg-gradient-to-tr from-purple-600 to-violet-600 shadow-lg shadow-purple-500/20'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {m.role === 'ai' ? <Icons.bot className="h-5 w-5" /> : 'You'}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm font-medium leading-relaxed ${
                  m.role === 'ai'
                    ? 'bg-white border border-stone-200 text-stone-800 shadow-sm'
                    : 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">
              <Icons.refresh className="h-4 w-4 animate-spin" />
              <span>RailAI microservice analyzing parameters...</span>
            </div>
          )}
        </div>

        <div className="border-t border-stone-200 bg-white p-4 flex flex-wrap gap-2">
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
              className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-[11px] font-semibold text-stone-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-all"
            >
              <Icons.sparkles className="h-3.5 w-3.5 inline mr-1" />{prompt}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-3 border-t border-stone-200 bg-stone-50/50 p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask RailAI anything about your trip..."
            className="field-control flex-1 text-sm py-3"
          />
          <button
            type="submit"
            className="btn-brand flex items-center gap-1.5 px-5 py-3 rounded-xl shrink-0"
          >
            <span>Ask AI</span>
            <Icons.send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
};