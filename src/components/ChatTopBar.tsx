'use client';

import {
    Search,
    Timer,
    Phone,
    MoreHorizontal,
    MoreVertical, // kept if you still use it elsewhere
    ChevronRight,
    ChevronDown,
    FileText,
    User,
    Info,
} from 'lucide-react';
import useChatMessages from '../hooks/useChatMessages';

interface ChatTopBarProps {
    onShowContactDetails: () => void;
    isMobile?: boolean;
    conversationId?: string;
}

const ChatTopBar = ({ onShowContactDetails, isMobile = false, conversationId }: ChatTopBarProps) => {
    // screenshot-matched colors
    const headerBg = 'bg-[#222225]';
    const border = 'border-[#2a2f36]';
    const soft = 'text-[#98a2b3]';
    const strong = 'text-[#e6eaf2]';

    // Fetch conversation data if conversationId is provided
    const { conversation } = useChatMessages(conversationId || null);

    // Default values if no conversation data
    const contactName = conversation?.contact.name || 'Test one';
    const contactAvatar = conversation?.contact.avatar || '🙂';
    const contactRole = conversation?.contact.role || 'Customer';
    const contactCompany = conversation?.contact.company || '';

    return (
        <div className={`${headerBg} border-b ${border} px-3 py-2`}>
            <div className="flex items-center justify-between">
                {/* LEFT: avatar + name + Customer chip with right arrow */}
                <div className="flex items-center gap-3">
                    {/* Contact avatar */}
                    {conversation ? (
                        <img
                            src={contactAvatar}
                            alt={contactName}
                            className="w-7 h-7 rounded-full"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ffb84a] to-[#ff9b2f] flex items-center justify-center text-[#0e1116] text-sm font-bold">
                            🙂
                        </div>
                    )}

                    {/* Name + role chip */}
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${strong}`}>{contactName}</span>
                        {contactCompany && (
                            <span className={`text-xs ${soft}`}>({contactCompany})</span>
                        )}

                        <button
                            className={`inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md border ${border} ${soft} hover:bg-[#1a2029]`}
                            title="Role"
                        >
                            <span className="inline-flex items-center gap-1">
                                <span>{contactRole}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                        </button>
                    </div>
                </div>

                {/* RIGHT: presence user -> name -> chevron, then actions */}
                <div className="flex items-center gap-2">
                    {/* Mobile: Info button for contact details */}
                    {isMobile && (
                        <button
                            onClick={onShowContactDetails}
                            className={`p-2 rounded-md hover:bg-[#1a2029] ${soft}`}
                            title="Contact Details"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    )}

                    {/* Presence avatar (blue circle + green dot) */}
                    <div className="relative">
                        <div className="w-7 h-7 rounded-full bg-[#1f3bff]/25 border border-[#2b3e75] flex items-center justify-center">
                            <User className="w-4 h-4 text-[#5aa8ff]" />
                        </div>
                        <div className="absolute -right-0 -bottom-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#222225]" />
                    </div>

                    {/* Agent name + chevron */}
                    <div className="flex items-center gap-1">
                        <span className={`text-sm ${strong}`}>Faisal BH</span>
                        <ChevronDown className="w-4 h-4 text-[#7b8696]" />
                    </div>

                    {/* Controls - hide some on mobile to save space */}
                    {!isMobile && (
                        <>
                            <button className={`p-2 rounded-md hover:bg-[#1a2029] ${soft}`} title="Search">
                                <Search className="w-4 h-4" />
                            </button>

                            <button className={`p-2 rounded-md hover:bg-[#1a2029] ${soft}`} title="Snooze / Timer">
                                <Timer className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    <div className="flex items-center">
                        <button className={`p-2 rounded-md hover:bg-[#1a2029] ${soft}`} title="Call">
                            <Phone className="w-4 h-4" />
                        </button>
                        <ChevronDown className="w-4 h-4 text-[#7b8696] -ml-1" />
                    </div>

                    {/* Open button with paper icon */}
                    <button
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-md border border-[#2e3947] text-[#b6c8ff] bg-[#1f2632] hover:bg-[#243042]"
                        title="Status"
                    >
                        <FileText className="w-4 h-4" />
                        <span>Open</span>
                    </button>

                    {/* Three dots - hide on mobile since we have info button */}
                    {!isMobile && (
                        <button
                            className={`p-2 rounded-md hover:bg-[#1a2029] ${soft}`}
                            title="More"
                            onClick={onShowContactDetails}
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatTopBar;
