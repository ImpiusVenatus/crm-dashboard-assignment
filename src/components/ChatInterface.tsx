'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageSquare, Sparkles, User, CheckCircle2 } from 'lucide-react';
import useChatFeed from '../hooks/useChatFeed';

interface ChatInterfaceProps {
    conversationId: string;
}

const ChatInterface = ({ conversationId }: ChatInterfaceProps) => {
    const panelBg = 'bg-[#101113]';
    const border = 'border-[#2a2f36]';
    const soft = 'text-[#98a2b3]';
    const strong = 'text-[#e6eaf2]';
    const dim = 'text-[#7b8696]';

    const { messages, loading, error, hasMore, loadingOlder, fetchOlder } = useChatFeed(conversationId);

    const fmtTime = (d: Date) =>
        d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

    const isConversationState = (t: string) => /Conversation (opened|closed) by you/i.test(t);
    const isLifecycleUpdate = (t: string) => t.startsWith('Lifecycle Stage ');
    const isPillNote = (t: string) =>
        t === 'Yesterday' || /^Assigned to you$/i.test(t) || /^You unassigned this person$/i.test(t);

    // === Lazy-load on reach top ===
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLDivElement | null>(null);
    const lastHeights = useRef<{ h: number; t: number }>({ h: 0, t: 0 });

    // Observe top sentinel
    useEffect(() => {
        if (!topRef.current) return;
        const el = topRef.current;

        const io = new IntersectionObserver(
            async (entries) => {
                const first = entries[0];
                if (!first || !first.isIntersecting) return;
                if (!hasMore || loadingOlder) return;

                const scroller = scrollRef.current;
                if (!scroller) return;

                // record heights BEFORE prepend
                lastHeights.current = {
                    h: scroller.scrollHeight,
                    t: scroller.scrollTop,
                };

                await fetchOlder();

                // restore scroll position AFTER DOM updates
                requestAnimationFrame(() => {
                    const newH = scroller.scrollHeight;
                    const delta = newH - lastHeights.current.h;
                    scroller.scrollTop = lastHeights.current.t + delta;
                });
            },
            { root: scrollRef.current, rootMargin: '200px 0px 0px 0px', threshold: 0 } // start a bit before top
        );

        io.observe(el);
        return () => io.disconnect();
    }, [hasMore, loadingOlder, fetchOlder]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex-auto min-w-0 min-h-0 ${panelBg} flex flex-col border-l ${border}`}
        >
            {/* Only this section scrolls */}
            <div
                id="chat-scroll"
                ref={scrollRef}
                className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3"
            >
                {/* Top sentinel for lazy load */}
                <div ref={topRef} />

                {/* Optional tiny loader at top while fetching older */}
                {loadingOlder && hasMore && (
                    <div className="sticky top-0 z-10 flex justify-center pt-2">
                        <div className="px-2 py-1 text-[11px] rounded bg-[#2a2f36] text-[#c3cad6]">
                            Loading older…
                        </div>
                    </div>
                )}

                <div className="relative w-full">
                    <div className={`text-xs ${dim} text-center truncate px-6 select-none`}>Aug 11, 2025 • by you</div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-2">
                        <span className="px-3 py-1 rounded-md text-xs bg-[#2a2f36] text-[#c3cad6]">Aug 11, 2025</span>
                    </div>
                </div>

                {loading && <div className="text-center text-sm text-[#8591a3] py-6">Loading messages…</div>}
                {error && !loading && <div className="text-center text-sm text-red-400 py-6">{error} — showing local sample.</div>}

                {messages.map((m, idx) => {
                    if (m.kind === 'text' && m.sender !== 'system') {
                        const isRight = m.sender === 'contact';
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(idx * 0.01, 0.25), duration: 0.18 }}
                                className={`flex items-start gap-2 ${isRight ? 'justify-end' : ''}`}
                            >
                                <div className="max-w-xl">
                                    <div
                                        className={`rounded-xl ${isRight ? 'bg-[#3F3322] text-white rounded-br-md' : 'bg-[#1f2632] text-white rounded-bl-md'
                                            } px-3 py-2`}
                                    >
                                        {isRight && <span className="text-sm text-[#4288FF]">@Faisal BH</span>}{' '}
                                        <span className="text-sm opacity-90">{m.text}</span>
                                    </div>
                                    <div className={`mt-1 ${isRight ? 'text-right' : 'text-left'} text-xs ${dim}`}>
                                        {fmtTime(m.timestamp)}
                                    </div>
                                </div>

                                {isRight && (
                                    <div className="relative shrink-0">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5b7bff] to-[#8a5bff] flex items-center justify-center text-white">
                                            <User className="w-4 h-4" />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    }

                    if (isLifecycleUpdate(m.text)) {
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(idx * 0.01, 0.2), duration: 0.16 }}
                                className={`w-full text-center text-sm ${soft}`}
                            >
                                {m.text}
                            </motion.div>
                        );
                    }

                    if (isPillNote(m.text)) {
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(idx * 0.01, 0.2), duration: 0.16 }}
                                className="w-full flex justify-center"
                            >
                                <span className="px-3 py-1 rounded-md text-xs bg-[#2a2f36] text-[#c3cad6]">{m.text}</span>
                            </motion.div>
                        );
                    }

                    if (isConversationState(m.text)) {
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(idx * 0.01, 0.25), duration: 0.18 }}
                                className={`w-full border ${border} rounded-xl px-3 py-2`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="relative shrink-0">
                                        <div className="w-5 h-5 rounded-full bg-[#1f2632] flex items-center justify-center">
                                            <User className="w-3.5 h-3.5 text-[#9fb3d9]" />
                                        </div>
                                        <CheckCircle2 className="w-3 h-3 text-[#48d597] absolute -right-1 -bottom-1 bg-[#101113] rounded-full" />
                                    </div>
                                    <span className={`text-sm ${strong}`}>{m.text}</span>
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(idx * 0.01, 0.2), duration: 0.16 }}
                            className={`w-full text-center text-sm ${soft}`}
                        >
                            {m.text}
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom: always visible */}
            <div className="sticky bottom-0 z-10 px-4 py-2 border-t border-[#2a2f36] bg-[#101113]">
                <div className="mx-auto w-full my-2 bg-[#222225] border border-[#3A3B3E] rounded-xl">
                    <div className={`flex items-center justify-between px-2 py-1 ${soft}`}>
                        <div className="flex items-center gap-1 pt-2">
                            <span className="text-xs">No Channels Selected</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="m-2 bg-[#363C45] rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="rounded-md p-1.5">
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#8ab4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            </div>
                            <div>
                                <div className={`text-sm ${strong}`}>Contact not connected to any Channel</div>
                                <div className={`text-sm ${soft}`}>Try connecting the Contact to a Channel to get started.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button className={`flex items-center gap-2 ${soft} hover:text-[#e6eaf2]`}>
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Add comment</span>
                    </button>
                    <button className={`flex items-center gap-2 ${soft} hover:text-[#e6eaf2]`}>
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">Summarize</span>
                    </button>
                </div>
            </div>

            <style jsx global>{`
        #chat-scroll {
          scrollbar-width: thin;
          scrollbar-color: #3a4353 #101113;
        }
        #chat-scroll::-webkit-scrollbar { width: 10px; }
        #chat-scroll::-webkit-scrollbar-track { background: #101113; }
        #chat-scroll::-webkit-scrollbar-thumb {
          background-color: #3a4353;
          border-radius: 8px;
          border: 2px solid #101113;
        }
        #chat-scroll::-webkit-scrollbar-thumb:hover { background-color: #495368; }
      `}</style>
        </motion.div>
    );
};

export default ChatInterface;
