'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Headphones,
  CheckCircle2
} from 'lucide-react';

export default function SuspendedPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: 'Hello! I am the automated billing & compliance assistant. How can we help resolve your account suspension today?',
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Tambah pesan user
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Simulasi balasan otomatis dari admin / bot
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'system',
        text: 'Your request #SUP-89201 has been logged with Priority: High. A compliance officer is reviewing your account parameters.',
        time: 'Just now'
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans selection:bg-red-500 selection:text-white overflow-hidden">
      
      {/* Main Alert Card */}
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-red-200 overflow-hidden text-slate-900 z-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-red-50 px-6 py-4 border-b border-red-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-block text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-100 px-2 py-0.5 rounded">
                CRITICAL ALERT
              </span>
              <h3 className="text-base font-semibold text-slate-900">
                Service Suspension Notice
              </h3>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-amber-900 text-sm">
            <p className="font-semibold flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Automated Fraud Detection Triggered
            </p>
            <p className="text-amber-800 text-xs leading-relaxed">
              System detected anomalous patterns associated with your instance. Service access is restricted pending identity and service tier review.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Issue Details
            </h4>
            <div className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono space-y-2 leading-relaxed overflow-x-auto">
              <p><span className="text-red-400">[ERR_SUSPENDED_ACCOUNT]</span> Important Notice Regarding Your Service:</p>
              <p className="text-slate-300">
                Your account has been placed on hold following automated system alerts for potential fraud. If you believe this is an error or wish to upgrade your service plan, please reach out to our admin team through your account portal.
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Admin Desk Online
          </div>
          <button
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Open Live Support Chat
          </button>
        </div>

      </div>

      {/* Slide-over Live Support Chat Drawer */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
            
            {/* Chat Drawer Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="p-2 bg-slate-800 rounded-lg text-red-400">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                    Admin Compliance Desk
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400">Ticket #SUP-89201 • Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-red-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your reply to admin..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-100 text-slate-800 text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
              <button
                type="submit"
                className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}