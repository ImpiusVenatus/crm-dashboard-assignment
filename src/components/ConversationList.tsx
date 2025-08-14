'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Search, 
    Grid3X3, 
    Filter, 
    MoreHorizontal, 
    Clock3, 
    Clock, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    ChevronLeft
} from 'lucide-react';
import useConversations from '../hooks/useConversations';

interface ConversationListProps {
    width: number | string;
    onConversationSelect: (conversationId: string) => void;
    selectedConversation: string | null;
    isMobile?: boolean;
    onBackToChat?: () => void;
}

const ConversationList = ({ 
    width, 
    onConversationSelect, 
    selectedConversation, 
    isMobile = false,
    onBackToChat 
}: ConversationListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [displayCount, setDisplayCount] = useState(10); // Start with 10 conversations
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastConversationRef = useRef<HTMLDivElement | null>(null);

    const { items: conversations, loading, error, total } = useConversations(50); // Load more initially

    // Filter conversations based on search and filters
    const filteredConversations = conversations.filter(conv => {
        const matchesSearch = conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             conv.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             conv.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || conv.priority === filterPriority;
        
        return matchesSearch && matchesStatus && matchesPriority;
    });

    // Display only the first displayCount conversations
    const displayedConversations = filteredConversations.slice(0, displayCount);

    // Lazy loading callback
    const lastConversationRefCallback = useCallback((node: HTMLDivElement | null) => {
        if (lastConversationRef.current) {
            lastConversationRef.current = null;
        }
        
        if (node) {
            lastConversationRef.current = node;
            
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            
            observerRef.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && displayCount < filteredConversations.length && !isLoadingMore) {
                    setIsLoadingMore(true);
                    // Simulate loading delay
                    setTimeout(() => {
                        setDisplayCount(prev => Math.min(prev + 10, filteredConversations.length));
                        setIsLoadingMore(false);
                    }, 500);
                }
            });
            
            observerRef.current.observe(node);
        }
    }, [displayCount, filteredConversations.length, isLoadingMore]);

    // Cleanup observer on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

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

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
        
        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInHours * 60);
            return `${diffInMinutes}m ago`;
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5aa8ff]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full text-red-400">
                <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Error loading conversations</div>
                    <div className="text-sm text-gray-400">Please try again later</div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full flex flex-col bg-[#1a1d21] border-r border-[#2a2f36]"
            style={{ width: typeof width === 'number' ? `${width}px` : width }}
        >
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-[#2a2f36]">
                {isMobile && onBackToChat && (
                    <button
                        onClick={onBackToChat}
                        className="flex items-center gap-2 text-[#9fb3d9] hover:text-white mb-3 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm">Back to Chat</span>
                    </button>
                )}
                
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Inbox</h2>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-[#2a2f36] rounded-lg transition-colors">
                            <Search className="w-4 h-4 text-[#9fb3d9]" />
                        </button>
                        <button className="p-2 hover:bg-[#2a2f36] rounded-lg transition-colors">
                            <Grid3X3 className="w-4 h-4 text-[#9fb3d9]" />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9fb3d9]" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#2a2f36] border border-[#3a3b3e] rounded-lg text-white placeholder-[#9fb3d9] focus:outline-none focus:border-[#5aa8ff]"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-4">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-1 bg-[#2a2f36] border border-[#3a3b3e] rounded text-white text-sm focus:outline-none focus:border-[#5aa8ff]"
                    >
                        <option value="all">All Status</option>
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="px-3 py-1 bg-[#2a2f36] border border-[#3a3b3e] rounded text-white text-sm focus:outline-none focus:border-[#5aa8ff]"
                    >
                        <option value="all">All Priority</option>
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {displayedConversations.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-[#9fb3d9]">
                        <div className="text-center">
                            <div className="text-lg font-semibold mb-2">No conversations found</div>
                            <div className="text-sm">Try adjusting your search or filters</div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1 p-2">
                        {displayedConversations.map((conversation, index) => {
                            const statusInfo = getStatusInfo(conversation.status, conversation.priority);
                            const isLast = index === displayedConversations.length - 1;
                            
                            return (
                                <div
                                    key={conversation.id}
                                    ref={isLast ? lastConversationRefCallback : null}
                                    onClick={() => onConversationSelect(conversation.id)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-[#2a2f36] ${
                                        selectedConversation === conversation.id ? 'bg-[#2a2f36] border border-[#5aa8ff]' : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={conversation.contact.avatar}
                                            alt={conversation.contact.name}
                                            className="w-10 h-10 rounded-full flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-medium text-white truncate">
                                                    {conversation.contact.name}
                                                </h3>
                                                <span className="text-xs text-[#9fb3d9]">
                                                    {formatTime(conversation.lastMessage.timestamp)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#9fb3d9] truncate mb-2">
                                                {conversation.lastMessage.text}
                                            </p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${statusInfo.status.bg} ${statusInfo.status.color}`}>
                                                    {conversation.status}
                                                </span>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${statusInfo.priority.bg} ${statusInfo.priority.color}`}>
                                                    {conversation.priority}
                                                </span>
                                                {conversation.tags.slice(0, 2).map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-2 py-1 rounded text-xs bg-[#2a2f36] text-[#9fb3d9]"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {conversation.unreadCount > 0 && (
                                                    <span className="px-2 py-1 rounded-full text-xs bg-[#ff6b6b] text-white font-medium">
                                                        {conversation.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {/* Loading more indicator */}
                        {isLoadingMore && (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5aa8ff]"></div>
                                <span className="ml-2 text-sm text-[#9fb3d9]">Loading more...</span>
                            </div>
                        )}
                        
                        {/* Show more button if there are more conversations to load */}
                        {displayCount < filteredConversations.length && !isLoadingMore && (
                            <button
                                onClick={() => {
                                    setIsLoadingMore(true);
                                    setTimeout(() => {
                                        setDisplayCount(prev => Math.min(prev + 10, filteredConversations.length));
                                        setIsLoadingMore(false);
                                    }, 500);
                                }}
                                className="w-full p-3 text-center text-[#5aa8ff] hover:bg-[#2a2f36] rounded-lg transition-colors"
                            >
                                Load More Conversations
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Resize handle - disabled on mobile */}
            {!isMobile && (
                <div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#5aa8ff] transition-colors" />
            )}
        </motion.div>
    );
};

export default ConversationList;
