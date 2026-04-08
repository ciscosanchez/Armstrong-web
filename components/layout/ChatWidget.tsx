'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type MessageRole = 'user' | 'agent';

interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

// Mock auto-responses keyed by keyword patterns
const BOT_RESPONSES: Array<{ pattern: RegExp; reply: string }> = [
  {
    pattern: /quote|estimate|price|cost|how much/i,
    reply:
      "I'd love to help you get a quote! You can use our free Ballpark Estimate tool at /ballpark-estimate, or I can connect you with one of our moving specialists. What type of move are you planning — residential, commercial, or something else?",
  },
  {
    pattern: /location|office|near me|city|where/i,
    reply:
      'Armstrong has 33+ locations across the country! You can find your nearest branch on our Locations page at /our-locations. Would you like me to help you find a specific city?',
  },
  {
    pattern: /residential|household|home|apartment|house/i,
    reply:
      'We handle residential moves of all sizes — local, long-distance, and international. Our crews are trained and fully insured. Would you like to start a free estimate or talk to a specialist?',
  },
  {
    pattern: /business|commercial|office|corporate/i,
    reply:
      'Armstrong has a dedicated commercial moving division. We handle office relocations, FF&E, and full business transitions with minimal downtime. Want me to connect you with our commercial team?',
  },
  {
    pattern: /supply chain|warehouse|logistics|freight/i,
    reply:
      "Our Supply Chain Solutions team handles everything from warehousing to last-mile delivery. I can arrange a call with a supply chain specialist — what's your biggest logistics challenge right now?",
  },
  {
    pattern: /career|job|hiring|work|employ/i,
    reply:
      "We're always looking for great people! Check out our Careers page at /careers to learn about open positions and what it's like to work at Armstrong.",
  },
  {
    pattern: /safety|insurance|damage|liability/i,
    reply:
      'Safety is our top priority at Armstrong. All moves are fully insured and our crews complete regular safety training. You can learn more on our Safety page at /safety.',
  },
  {
    pattern: /thank|thanks|great|awesome|perfect/i,
    reply:
      "You're very welcome! Is there anything else I can help you with today? Our team is always here if you need us.",
  },
  {
    pattern: /hello|hi|hey|howdy/i,
    reply:
      "Hey there! I'm here to help with any questions about Armstrong's moving and logistics services. What can I do for you today?",
  },
];

const FALLBACK_REPLY =
  "Thanks for reaching out! I want to make sure you get the right help. Can you tell me a bit more about what you're looking for, or would you like me to connect you with one of our team members directly?";

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init',
  role: 'agent',
  text: "Hi! I'm the Armstrong assistant. How can I help you today? Whether it's a quote, finding a location, or learning about our services — I'm here for it.",
  timestamp: new Date(),
};

function getBotReply(input: string): string {
  for (const { pattern, reply } of BOT_RESPONSES) {
    if (pattern.test(input)) return reply;
  }
  return FALLBACK_REPLY;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const reply = getBotReply(text);
      const agentMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'agent',
        text: reply,
        timestamp: new Date(),
      };
      setTyping(false);
      setMessages((prev) => [...prev, agentMsg]);
      if (!open) setUnread((n) => n + 1);
    }, delay);
  }, [input, open]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
        {/* Nudge bubble */}
        {!open && (
          <div className="animate-fade-in-up text-armstrong-dark-blue rounded-2xl rounded-br-none bg-white px-4 py-2 text-sm font-medium shadow-lg">
            Need help planning your move?
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chat' : 'Open live chat'}
          className="bg-armstrong-blue relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {open ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
          {unread > 0 && !open && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unread}
            </span>
          )}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed right-6 bottom-24 z-50 flex w-[360px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl bg-white shadow-2xl"
          style={{ height: '480px' }}
        >
          {/* Header */}
          <div className="bg-armstrong-dark-blue flex items-center gap-3 rounded-t-2xl px-4 py-3">
            <div className="bg-armstrong-blue relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white">
              A
              <span className="border-armstrong-dark-blue absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 bg-green-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Armstrong Support</p>
              <p className="text-armstrong-light-blue text-xs">Typically replies in minutes</p>
            </div>
            <div className="bg-armstrong-blue/20 text-armstrong-light-blue ml-auto rounded-sm px-2 py-0.5 text-xs">
              Mock
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-armstrong-blue rounded-br-none text-white'
                      : 'text-armstrong-dark-blue rounded-bl-none bg-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t border-gray-200 p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              className="focus:border-armstrong-blue focus:ring-armstrong-blue flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-1"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Send message"
              className="bg-armstrong-blue flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-40"
            >
              <svg className="h-4 w-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          <p className="pb-2 text-center text-[10px] text-gray-400">
            Powered by Armstrong ·{' '}
            <a href="/privacy-policy" className="underline">
              Privacy
            </a>
          </p>
        </div>
      )}
    </>
  );
}
