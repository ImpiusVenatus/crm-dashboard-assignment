'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ConversationList from './ConversationList';
import ChatInterface from './ChatInterface';
import ContactDetails from './ContactDetails';
import TopBanner from './TopBanner';
import ChatTopBar from './ChatTopBar';
import LeftRail from './LeftRail';
import { Menu, X, MessageSquare, Users, MessageCircleMore, ChevronLeft } from 'lucide-react';
import MobileRailMenu from './MobileRailMenu';

const Dashboard = () => {
    const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
    const [showContactDetails, setShowContactDetails] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [conversationListWidth, setConversationListWidth] = useState(400);

    // Mobile state
    const [isMobile, setIsMobile] = useState(false);
    const [mobileView, setMobileView] = useState<'chat' | 'conversations' | 'sidebar'>('chat');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        if (isMobile && selectedConversation) setMobileView('chat');
    }, [selectedConversation, isMobile]);

    const handleMobileViewChange = (view: 'chat' | 'conversations' | 'sidebar') => {
        setMobileView(view);
        setShowMobileMenu(false);
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex">
            {!isMobile && <LeftRail />}

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBanner />

                {/* Mobile header */}
                {isMobile && (
                    <div className="bg-[#222225] border-b border-[#2a2f36] px-3 py-2 flex items-center justify-between">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="p-2 rounded-md hover:bg-[#1a2029] text-[#8e98a8]"
                        >
                            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <h1 className="text-sm font-semibold text-[#e6eaf2]">CRM Dashboard</h1>
                        <div className="w-10" />
                    </div>
                )}

                {/* Vertical Mobile Rail Menu (drawer) */}
                {isMobile && showMobileMenu && (
                    <MobileRailMenu
                        onClose={() => setShowMobileMenu(false)}
                        onBackToChat={() => {
                            setShowMobileMenu(false);
                            setMobileView('chat');
                        }}
                        onShowConversations={() => {
                            setShowMobileMenu(false);
                            setMobileView('conversations');
                        }}
                        onShowInbox={() => {
                            setShowMobileMenu(false);
                            setMobileView('sidebar');
                        }}
                    />
                )}
                <div className="flex-1 flex overflow-hidden">
                    {/* Desktop sidebar */}
                    {!isMobile && (
                        <Sidebar
                            collapsed={sidebarCollapsed}
                            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                        />
                    )}

                    {/* ---------- FIX: render a Mobile Inbox panel when mobileView === 'sidebar' ---------- */}
                    {isMobile && mobileView === 'sidebar' && (
                        <div className="w-full bg-[#222225] border-r border-[#2a2f36] flex flex-col">
                            <div className="p-4 border-b border-[#2a2f36] flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-[#e6eaf2]">Inbox</h2>
                                <button
                                    onClick={() => handleMobileViewChange('chat')}
                                    className="px-3 py-1.5 flex items-center text-sm text-[#5aa8ff] hover:text-[#8ab4ff] hover:bg-[#1a2029] rounded-md transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Back to Chat
                                </button>
                            </div>

                            {/* Your mobile inbox content */}
                            <div className="flex-1 p-4 space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-[#e6eaf2]">Filters</h3>
                                    <div className="grid grid-cols-1 gap-1">
                                        {[
                                            { label: 'All', active: true },
                                            { label: 'Mine', active: false },
                                            { label: 'Unassigned', active: false },
                                            { label: 'Incoming Calls', active: false },
                                        ].map((f) => (
                                            <div
                                                key={f.label}
                                                className={`text-[11px] px-2 py-1.5 rounded-md cursor-pointer transition-colors ${f.active
                                                    ? 'bg-[#363C45] text-white'
                                                    : 'text-[#8e98a8] hover:text-[#cbd3e0] hover:bg-[#363C45]'
                                                    }`}
                                            >
                                                {f.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-[#e6eaf2]">Lifecycle</h3>
                                    <div className="space-y-1">
                                        {[
                                            { label: 'New Lead', emoji: '🆕' },
                                            { label: 'Hot Lead', emoji: '🔥' },
                                            { label: 'Payment', emoji: '💰' },
                                            { label: 'Customer', emoji: '🧑‍💼' },
                                        ].map((s) => (
                                            <div
                                                key={s.label}
                                                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1a2029] cursor-pointer"
                                            >
                                                <span className="text-xs text-[#c3cad6]">
                                                    <span className="mr-1">{s.emoji}</span>
                                                    {s.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-[#e6eaf2]">Team Inbox</h3>
                                    <div className="text-[11px] text-[#8e98a8] px-2 py-1.5 rounded-md">
                                        No inboxes created
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-[#e6eaf2]">Custom Inbox</h3>
                                    <div className="text-[11px] text-[#8e98a8] px-2 py-1.5 rounded-md">
                                        No inboxes created
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* ---------- END FIX ---------- */}

                    {/* Conversation List */}
                    <ConversationList
                        width={conversationListWidth}
                        onConversationSelect={setSelectedConversation}
                        selectedConversation={selectedConversation}
                        isMobile={isMobile}
                        onBackToChat={() => setMobileView('chat')}
                    />

                    {/* RIGHT REGION (chat + details) */}
                    {(!isMobile || mobileView === 'chat') && (
                        <div className="flex-1 flex flex-col min-w-0">
                            <ChatTopBar
                                onShowContactDetails={() => setShowContactDetails(true)}
                                isMobile={isMobile}
                                conversationId={selectedConversation || undefined}
                            />
                            <div className="flex-1 flex min-w-0">
                                {selectedConversation && (
                                    <ChatInterface conversationId={selectedConversation} isMobile={isMobile} />
                                )}
                                {showContactDetails && (
                                    <ContactDetails
                                        onClose={() => setShowContactDetails(false)}
                                        isMobile={isMobile}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile bottom nav (unchanged) */}
                {isMobile && (
                    <div className="bg-[#222225] border-t border-[#2a2f36] px-4 py-2">
                        <div className="flex items-center justify-around">
                            <button
                                onClick={() => handleMobileViewChange('chat')}
                                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${mobileView === 'chat'
                                    ? 'text-[#5aa8ff] bg-[#1a2029]'
                                    : 'text-[#8e98a8] hover:text-[#e6eaf2]'
                                    }`}
                            >
                                <MessageSquare className="w-5 h-5" />
                                <span className="text-xs">Chat</span>
                            </button>
                            <button
                                onClick={() => handleMobileViewChange('conversations')}
                                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${mobileView === 'conversations'
                                    ? 'text-[#5aa8ff] bg-[#1a2029]'
                                    : 'text-[#8e98a8] hover:text-[#e6eaf2]'
                                    }`}
                            >
                                <MessageCircleMore className="w-5 h-5" />
                                <span className="text-xs">Conversations</span>
                            </button>
                            <button
                                onClick={() => handleMobileViewChange('sidebar')}
                                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${mobileView === 'sidebar'
                                    ? 'text-[#5aa8ff] bg-[#1a2029]'
                                    : 'text-[#8e98a8] hover:text-[#e6eaf2]'
                                    }`}
                            >
                                <Users className="w-5 h-5" />
                                <span className="text-xs">Inbox</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
