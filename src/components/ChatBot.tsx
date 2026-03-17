"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const FAQS = [
  { keywords: ['course', 'offer', 'provide'], response: "We offer JEE, NEET, CUET, CLAT, Foundation (6-10), Integrated Programs, and Crash Courses." },
  { keywords: ['fee', 'cost', 'price'], response: "Please call 9865440099 or fill the enquiry form for detailed fee structures based on your course." },
  { keywords: ['batch', 'when', 'start'], response: "New batches start June 2025. We also have weekend batches for CLAT & CUET." },
  { keywords: ['online', 'offline'], response: "Yes! We offer both online live interactive classes and offline physical classes at our Madurai center." },
  { keywords: ['location', 'address', 'where'], response: "We are at No. 207, 8th St, Muthuramalingapuram, K. Pudur, Madurai - 625007." },
  { keywords: ['enroll', 'admission', 'join'], response: "Fill out our enquiry form or call 9865440099 for an immediate response." },
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ role: 'bot', content: "Hi! I'm your Admission Officer. Let's talk! 👋" }]);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    // Find response
    const query = userMessage.toLowerCase();
    const match = FAQS.find((faq) => faq.keywords.some((key) => query.includes(key)));

    setTimeout(() => {
      const response = match ? match.response : "For more details, please call us at 9865440099 or fill the enquiry form on our website.";
      setMessages((prev) => [...prev, { role: 'bot', content: response }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-secondary shadow-2xl hover:scale-110 transition-transform p-0"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      ) : (
        <div className="bg-white w-[350px] max-w-[90vw] h-[500px] rounded-2xl shadow-2xl flex flex-col border border-border overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-secondary p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">A</div>
              <div>
                <p className="font-bold leading-none">Admission Desk</p>
                <p className="text-[10px] opacity-80 mt-1">Online | Acharya Education</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' ? "bg-primary text-white rounded-br-none" : "bg-muted text-foreground rounded-bl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about courses, fees..."
              className="flex-1 text-sm bg-muted px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-secondary"
            />
            <Button onClick={handleSend} size="icon" className="bg-secondary rounded-full">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
