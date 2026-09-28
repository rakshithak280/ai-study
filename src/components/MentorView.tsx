import React, { useState } from 'react';
import { BranchId } from '../types';
import { BRANCHES } from '../data/engineeringData';
import { Send, Bot, User, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface MentorViewProps {
  currentBranch: BranchId;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  source?: 'ai' | 'curated' | 'fallback';
}

export const MentorView: React.FC<MentorViewProps> = ({ currentBranch }) => {
  const currentBranchObj = BRANCHES.find((b) => b.id === currentBranch) || BRANCHES[0];

  const [inputQuery, setInputQuery] = useState<string>('');
  const [targetSubject, setTargetSubject] = useState<string>('General Engineering & Cross-Discipline');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'mentor',
      text: `Hello! I am your **OmniEngineer Cross-Branch Mentor**. 
I specialize in translating any advanced engineering concept, mathematical derivation, or hardware-software system through the foundational concepts of **${currentBranchObj.name}**.

What engineering concept, equation, or emerging technology would you like to master today?`,
      timestamp: 'Just now',
      source: 'curated'
    }
  ]);

  const quickPrompts = [
    `Explain the Fourier Transform using a physical ${currentBranchObj.name} system`,
    `How does gradient descent in Machine Learning relate to potential energy in ${currentBranchObj.name}?`,
    `I want to build an autonomous drone. What are my branch-specific blind spots?`,
    `Explain memory pointers and registers in C++ for someone who knows basic Python`,
    `How do I read an electrical schematic and size resistors as a ${currentBranchObj.code} student?`
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userBranch: currentBranchObj.name,
          targetSubject,
          message: textToSend
        })
      });

      const data = await response.json();

      const mentorMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: data.text || 'I could not generate an answer right now. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: `### Cross-Branch Insight for ${currentBranchObj.name}\n\nWhen tackling this topic, remember that physical laws across disciplines map to identical differential equations. For instance, whether you are dealing with fluid flow rate, electric current, heat flux, or data throughput, the rate of change is driven by an energetic potential gradient opposed by system resistance.\n\nTry testing this in our interactive PID Simulator or RC Filter Sandbox!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'fallback'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[750px] overflow-hidden">
      {/* Mentor Header */}
      <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>OmniEngineer AI Polymath Mentor</span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-400 font-mono">Tailored for {currentBranchObj.code}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              Ask Anything Regardless of Branch
            </h3>
          </div>
        </div>

        {/* Target Subject Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 whitespace-nowrap">Focus:</span>
          <select
            value={targetSubject}
            onChange={(e) => setTargetSubject(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="General Engineering & Cross-Discipline">General Cross-Discipline</option>
            <option value="Machine Learning & Neural Networks">Machine Learning & Neural Nets</option>
            <option value="Control Systems & PID Dynamics">Control Systems & PID</option>
            <option value="Embedded Systems & Microcontrollers">Embedded Systems & C++</option>
            <option value="Signals, FFT & DSP">Signals, FFT & DSP</option>
            <option value="Finite Element Analysis & Stress">FEA & Structural Stress</option>
            <option value="Electric Vehicles & Battery BMS">EV & Battery BMS</option>
          </select>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 border border-slate-700 text-cyan-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none'
                  : 'bg-slate-950/80 border border-slate-800/80 text-slate-200 rounded-tl-none shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[11px] opacity-70 pb-1 border-b border-white/10">
                <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'OmniEngineer Mentor'}</span>
                <span>{msg.timestamp}</span>
              </div>

              <div className="space-y-2 whitespace-pre-wrap">
                {msg.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-md mr-auto">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Analyzing through {currentBranchObj.name} principles...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 overflow-x-auto flex items-center gap-2">
        <span className="text-[11px] text-slate-500 whitespace-nowrap">Suggested:</span>
        {quickPrompts.slice(0, 3).map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            {prompt.length > 45 ? `${prompt.substring(0, 45)}...` : prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`Ask a question as a ${currentBranchObj.name} student... (e.g. How does PID control relate to CS rate limiting?)`}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
