'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronDown,
    MessageSquare,
    Sparkles,
    User,
    CheckCircle2,
    MessageCircle,
} from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'contact' | 'system';
    timestamp: Date;
    kind: 'note' | 'event' | 'text';
}

interface ChatInterfaceProps {
    conversationId: string;
}

const ChatInterface = ({ conversationId }: ChatInterfaceProps) => {
    // palette tuned to your screenshot
    const panelBg = 'bg-[#101113]';
    const border = 'border-[#2a2f36]';
    const soft = 'text-[#98a2b3]';
    const strong = 'text-[#e6eaf2]';
    const dim = 'text-[#7b8696]';

    const messages: Message[] = useMemo(
        () => [
            {
                id: 'm1',
                text: '@Faisal BH What are ypu doing',
                sender: 'contact',
                timestamp: new Date('2025-08-11T23:59:00'),
                kind: 'text',
            },
            {
                id: 'm2',
                text: 'Conversation closed by you',
                sender: 'system',
                timestamp: new Date('2025-08-11T23:59:00'),
                kind: 'event',
            },
            {
                id: 'm3',
                text: 'Conversation opened by you',
                sender: 'system',
                timestamp: new Date('2025-08-11T23:59:00'),
                kind: 'event',
            },
            {
                id: 'm4',
                text: 'Conversation closed by you',
                sender: 'system',
                timestamp: new Date('2025-08-11T23:59:00'),
                kind: 'event',
            },
            {
                id: 'm5',
                text: 'You unassigned this person',
                sender: 'system',
                timestamp: new Date('2025-08-11T23:59:00'),
                kind: 'note',
            },
            {
                id: 'm6',
                text: 'Assigned to you',
                sender: 'system',
                timestamp: new Date('2025-08-11T23:59:00'),
                kind: 'note',
            },
            {
                id: 'm7',
                text: 'Yesterday',
                sender: 'system',
                timestamp: new Date('2025-08-10T00:00:00'),
                kind: 'note',
            },
            {
                id: 'm8',
                text: 'Lifecycle Stage New Lead updated to Hot Lead by you',
                sender: 'system',
                timestamp: new Date('2025-08-10T00:00:00'),
                kind: 'event',
            },
            {
                id: 'm9',
                text: 'Lifecycle Stage Hot Lead updated to Payment by you',
                sender: 'system',
                timestamp: new Date('2025-08-10T00:00:00'),
                kind: 'event',
            },
            {
                id: 'm10',
                text: 'Lifecycle Stage Payment updated to Customer by you',
                sender: 'system',
                timestamp: new Date('2025-08-10T00:00:00'),
                kind: 'event',
            },
        ],
        []
    );

    const fmtTime = (d: Date) =>
        d.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });

    // helpers to style system lines like in the screenshot
    const isConversationState = (t: string) =>
        /Conversation (opened|closed) by you/i.test(t);

    const isLifecycleUpdate = (t: string) => t.startsWith('Lifecycle Stage ');

    const isPillNote = (t: string) =>
        t === 'Yesterday' ||
        /^Assigned to you$/i.test(t) ||
        /^You unassigned this person$/i.test(t);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex-1 ${panelBg} flex flex-col min-w-0 border-l ${border}`}
        >
            {/* Scrollable messages */}
            <div id="chat-scroll" className="flex-1 overflow-y-auto min-h-0 px-4 py-3 space-y-3">
                {/* --- Top timeline header: faint line + date chip layered on top --- */}
                <div className="relative w-full">
                    <div className={`text-xs ${dim} text-center truncate px-6 select-none`}>
                        Aug 11, 2025 • by you
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-2">
                        <span className="px-3 py-1 rounded-md text-xs bg-[#2a2f36] text-[#c3cad6]">
                            Aug 11, 2025
                        </span>
                    </div>
                </div>

                {messages.map((m, idx) => {
                    // CONTACT message bubble — RIGHT aligned now
                    if (m.sender === 'contact' && m.kind === 'text') {
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02, duration: 0.18 }}
                                className="flex items-start gap-2 justify-end"
                            >
                                {/* bubble */}
                                <div className="max-w-xl">
                                    <div className="rounded-xl bg-[#3F3322] text-white px-3 py-2 rounded-br-md">
                                        <span className="text-sm text-[#4288FF]">@Faisal BH</span>{' '}
                                        <span className="text-sm opacity-90">What are ypu doing</span>
                                    </div>
                                    <div className={`mt-1 text-right text-xs ${dim}`}>{fmtTime(m.timestamp)}</div>
                                </div>

                                {/* avatar: contact icon with yellow message badge */}
                                <div className="relative shrink-0">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5b7bff] to-[#8a5bff] flex items-center justify-center text-white">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#3F3322] flex items-center justify-center ring-2 ring-[#101113]">
                                        <MessageSquare className="w-2 h-2 text-[#fbbf24]" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    // SYSTEM — lifecycle updates: centered, no bg/border
                    if (isLifecycleUpdate(m.text)) {
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02, duration: 0.16 }}
                                className={`w-full text-center text-sm ${soft}`}
                            >
                                {m.text}
                            </motion.div>
                        );
                    }

                    // SYSTEM — inline pill notes
                    if (isPillNote(m.text)) {
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02, duration: 0.16 }}
                                className="w-full flex justify-center"
                            >
                                <span className="px-3 py-1 rounded-md text-xs bg-[#2a2f36] text-[#c3cad6]">
                                    {m.text}
                                </span>
                            </motion.div>
                        );
                    }

                    // SYSTEM — conversation opened/closed rows:
                    // * full width (stretch), not capped
                    // * contact icon with green check on the left
                    if (isConversationState(m.text)) {
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02, duration: 0.18 }}
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
                                    <span className={`ml-auto text-xs ${dim}`}>{fmtTime(m.timestamp)}</span>
                                </div>
                            </motion.div>
                        );
                    }

                    // Fallback: centered plain text
                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.02, duration: 0.16 }}
                            className={`w-full text-center text-sm ${soft}`}
                        >
                            {m.text}
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer actions */}
            <div className="px-4 py-2">
                {/* “No Channels Selected” card section */}
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
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="#8ab4ff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                            </div>
                            <div>
                                <div className={`text-sm ${strong}`}>Contact not connected to any Channel</div>
                                <div className={`text-sm ${soft}`}>
                                    Try connecting the Contact to a Channel to get started.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action buttons with icons on the left */}
                <div className="flex items-center justify-between">
                    <button className={`flex items-center gap-2 ${soft} hover:text-[#e6eaf2] cursor-pointer`}>
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Add comment</span>
                    </button>
                    <button className={`flex items-center gap-2 ${soft} hover:text-[#e6eaf2] cursor-pointer`}>
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">Summarize</span>
                    </button>
                </div>
            </div>

            {/* Custom scrollbar */}
            <style jsx global>{`
        #chat-scroll {
          scrollbar-width: thin;
          scrollbar-color: #3a4353 #101113; /* thumb, track (Firefox) */
        }
        #chat-scroll::-webkit-scrollbar {
          width: 10px;
        }
        #chat-scroll::-webkit-scrollbar-track {
          background: #101113;
        }
        #chat-scroll::-webkit-scrollbar-thumb {
          background-color: #3a4353;
          border-radius: 8px;
          border: 2px solid #101113;
        }
        #chat-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #495368;
        }
      `}</style>
        </motion.div>
    );
};

export default ChatInterface;
