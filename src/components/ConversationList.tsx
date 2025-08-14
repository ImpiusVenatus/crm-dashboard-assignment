'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    RefreshCw,
    ChevronDown,
    User2Icon,
    ChevronLeft,
    Clock,
    Tag,
    AlertCircle,
    CheckCircle,
    Clock3,
    XCircle,
} from 'lucide-react';
import useConversations from '../hooks/useConversations';
import type { Conversation } from '../hooks/useConversations';

interface ConversationListProps {
    onSelectConversation: (conversationId: string) => void;
    selectedConversation: string | null;
    width: number | string;
    onWidthChange: (width: number) => void;
    isMobile?: boolean;
    onBackToChat?: () => void;
}

const MIN_W = 260;
const MAX_W = 520;

const ConversationList = ({
    width,
    onWidthChange,
    isMobile = false,
    onBackToChat,
}: ConversationListProps) => {
    const [activeTab, setActiveTab] = useState<'chats' | 'calls'>('chats');
    const [showUnreplied, setShowUnreplied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // Fetch conversations using the hook
    const { items: conversations, loading, error } = useConversations(20);

    // --- Resize logic (relative to this column's left edge) ---
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isMobile) return; // Disable resize on mobile
        setIsDragging(true);
        e.preventDefault();
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!isDragging || !wrapperRef.current || isMobile) return;
            const rect = wrapperRef.current.getBoundingClientRect();
            const newW = e.clientX - rect.left;
            const clamped = Math.max(MIN_W, Math.min(MAX_W, newW));
            onWidthChange(clamped);
        };
        const onUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
            return () => {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onUp);
            };
        }
    }, [isDragging, onWidthChange, isMobile]);

    // --- Colors ---
    const panelBg = 'bg-[#222225]';
    const headerBg = 'bg-[#222225]';
    const border = 'border-[#2a2f36]';
    const soft = 'text-[#98a2b3]';
    const strong = 'text-[#e6eaf2]';
    const hoverRow = 'hover:bg-[#1a2029]';

    // Helper function to get status icon and color
    const getStatusInfo = (status: string, priority: string) => {
        const statusConfig = {
            open: { icon: Clock3, color: 'text-[#5aa8ff]', bg: 'bg-[#5aa8ff]/10' },
            pending: { icon: Clock, color: 'text-[#ff9f47]', bg: 'bg-[#ff9f47]/10' },
            resolved: { icon: CheckCircle, color: 'text-[#54d186]', bg: 'bg-[#54d186]/10' },
            closed: { icon: XCircle, color: 'text-[#8e98a8]', bg: 'bg-[#8e98a8]/10' }
        };

        const priorityConfig = {
            urgent: { icon: AlertCircle, color: 'text-[#ff6b6b]', bg: 'bg-[#ff6b6b]/10' },
            high: { icon: AlertCircle, color: 'text-[#ff9f47]', bg: 'bg-[#ff9f47]/10' },
            medium: { icon: Clock, color: 'text-[#5aa8ff]', bg: 'bg-[#5aa8ff]/10' },
            low: { icon: CheckCircle, color: 'text-[#8e98a8]', bg: 'bg-[#8e98a8]/10' }
        };

        return {
            status: statusConfig[status as keyof typeof statusConfig] || statusConfig.open,
            priority: priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
        };
    };

    // Helper function to format time
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            const minutes = Math.floor(diffInHours * 60);
            return `${minutes}m ago`;
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    return (
        <div
            ref={wrapperRef}
            className="flex"
            style={{ width: isMobile ? '100%' : width }}
        >
            <div className={`flex-1 ${panelBg} flex flex-col min-w-0 border-r ${border}`}>
                {/* Top header: Tabs */}
                <div className={`${headerBg} pt-3`}>
                    {/* Mobile Back Button */}
                    {isMobile && onBackToChat && (
                        <div className="px-3 pb-2 border-b border-[#2a2f36] flex items-center justify-between">
                            <button
                                onClick={onBackToChat}
                                className="px-3 py-1.5 text-sm text-[#5aa8ff] hover:text-[#8ab4ff] hover:bg-[#1a2029] rounded-md transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back to Chat
                            </button>
                            <h2 className="text-lg font-semibold text-[#e6eaf2]">Conversations</h2>
                            <div className="w-20" /> {/* Spacer for centering */}
                        </div>
                    )}

                    <div className={`flex justify-between border-b ${border} px-3`}>
                        <div className="flex gap-8">
                            {[
                                { key: 'chats', label: 'Chats' },
                                { key: 'calls', label: 'Calls' },
                            ].map((t) => {
                                const active = activeTab === (t.key as 'chats' | 'calls');
                                return (
                                    <button
                                        key={t.key}
                                        onClick={() => setActiveTab(t.key as 'chats' | 'calls')}
                                        className={`relative pb-2 flex items-center gap-2 ${active ? 'text-[#8ab4ff]' : `${soft} hover:text-[#cfd6e3]`
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{t.label}</span>
                                        {/* Blue underline indicator */}
                                        {active && (
                                            <motion.span
                                                layoutId="conv-tab-underline"
                                                className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#5aa8ff] rounded"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>


                        <div className="flex items-center gap-2">
                            <button className={`p-1.5 rounded-md ${hoverRow} ${soft}`} title="Filter">
                                <User2Icon className="w-4 h-4" />
                            </button>
                            <button className={`p-1.5 rounded-md ${hoverRow} ${soft}`} title="Search">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Toolbar row */}
                    <div className="flex items-center justify-between px-2 py-3">
                        <div className="flex items-center gap-4">
                            {/* Filter button like "Open, Newest" */}
                            <button
                                className={`flex items-center gap-1.5 py-1 ${soft}`}
                            >
                                <span className="text-sm">Open, Newest</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Unreplied toggle */}
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={showUnreplied}
                                        onChange={(e) => setShowUnreplied(e.target.checked)}
                                    />
                                    <div
                                        className={`w-9 h-5 rounded-full transition-colors flex items-center ${showUnreplied ? 'bg-[#5aa8ff]' : 'bg-[#2b3340]'
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${showUnreplied ? 'translate-x-5' : 'translate-x-1'
                                                }`}
                                        />
                                    </div>
                                </div>
                                <span className={`${soft} text-sm`}>Unreplied</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Status strip: Last updated + refresh on right */}
                <div className={`px-3 !bg-[#2F2F32] py-2 border-b ${border} ${panelBg} text-xs ${soft} flex items-center justify-between`}>
                    <span>Last updated a few seconds ago</span>
                    <button className={`p-1 rounded ${hoverRow}`} title="Refresh">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                {/* List area */}
                <div className="flex-1 overflow-y-auto min-h-0">
                    {loading ? (
                        <div className="p-4 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5aa8ff] mx-auto"></div>
                            <p className="text-sm text-[#8e98a8] mt-2">Loading conversations...</p>
                        </div>
                    ) : error ? (
                        <div className="p-4 text-center">
                            <AlertCircle className="w-8 h-8 text-[#ff6b6b] mx-auto mb-2" />
                            <p className="text-sm text-[#8e98a8]">Error loading conversations</p>
                        </div>
                    ) : conversations.length === 0 ? (
                        <div className="p-4 text-center">
                            <p className="text-sm text-[#9aa6b2]">No conversations to show</p>
                        </div>
                    ) : (
                        <div className="p-2">
                            {conversations.map((conversation) => {
                                const statusInfo = getStatusInfo(conversation.status, conversation.priority);
                                const StatusIcon = statusInfo.status.icon;
                                const PriorityIcon = statusInfo.priority.icon;

                                return (
                                    <motion.div
                                        key={conversation.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors ${hoverRow} border border-transparent hover:border-[#2a2f36]`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Contact Avatar */}
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={conversation.contact.avatar}
                                                    alt={conversation.contact.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#222225] ${conversation.contact.status === 'online' ? 'bg-[#22c55e]' :
                                                    conversation.contact.status === 'away' ? 'bg-[#ff9f47]' : 'bg-[#8e98a8]'
                                                    }`} />
                                            </div>

                                            {/* Conversation Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className={`text-sm font-medium ${strong} truncate`}>
                                                        {conversation.contact.name}
                                                    </h4>
                                                    <span className={`text-xs ${soft}`}>
                                                        {formatTime(conversation.lastMessage.timestamp)}
                                                    </span>
                                                </div>

                                                <p className={`text-sm ${soft} truncate mb-2`}>
                                                    {conversation.lastMessage.text}
                                                </p>

                                                {/* Status and Priority Badges */}
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${statusInfo.status.color} ${statusInfo.status.bg}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {conversation.status}
                                                    </div>

                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${statusInfo.priority.color} ${statusInfo.priority.bg}`}>
                                                        <PriorityIcon className="w-3 h-3" />
                                                        {conversation.priority}
                                                    </div>

                                                    {conversation.unreadCount > 0 && (
                                                        <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5aa8ff] text-white text-xs font-medium">
                                                            {conversation.unreadCount}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tags */}
                                                {conversation.tags.length > 0 && (
                                                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                                                        {conversation.tags.slice(0, 3).map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-[#1a2029] text-[#8e98a8] border border-[#2a2f36]"
                                                            >
                                                                <Tag className="w-3 h-3" />
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {conversation.tags.length > 3 && (
                                                            <span className="text-xs text-[#8e98a8]">
                                                                +{conversation.tags.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Resize Handle - hidden on mobile */}
            {!isMobile && (
                <div
                    onMouseDown={handleMouseDown}
                    className={`w-1 ${isDragging ? 'bg-[#5aa8ff]' : 'bg-[#2a2f36]'} hover:bg-[#5aa8ff] cursor-col-resize`}
                />
            )}
        </div>
    );
};

export default ConversationList;
