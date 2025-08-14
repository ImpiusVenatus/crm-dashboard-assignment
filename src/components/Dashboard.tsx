'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ConversationList from './ConversationList';
import ChatInterface from './ChatInterface';
import ContactDetails from './ContactDetails';
import TopBanner from './TopBanner';
import ChatTopBar from './ChatTopBar';
import LeftRail from './LeftRail';
import { Menu, X, MessageSquare, Users, MessageCircleMore } from 'lucide-react';
import MobileRailMenu from './MobileRailMenu';

const Dashboard = () => {
    const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
    const [showContactDetails, setShowContactDetails] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [conversationListWidth, setConversationListWidth] = useState(400);

    // ------- MOBILE STATE (restored) -------
    const [isMobile, setIsMobile] = useState(false);
    const [mobileView, setMobileView] = useState<'chat' | 'conversations' | 'sidebar'>('chat');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // when you pick a conversation on mobile, snap to chat view
    useEffect(() => {
        if (isMobile && selectedConversation) setMobileView('chat');
    }, [isMobile, selectedConversation]);

    const handleMobileViewChange = (view: 'chat' | 'conversations' | 'sidebar') => {
        setMobileView(view);
        setShowMobileMenu(false);
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex">
            {/* Left rail hidden on mobile, visible on desktop */}
            {!isMobile && <LeftRail />}

            {/* Right side: banner + app */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                <TopBanner />

                {/* Mobile header (menu button) */}
                {isMobile && (
                    <div className="bg-[#222225] border-b border-[#2a2f36] px-3 py-2 flex items-center justify-between">
                        <button
                            onClick={() => setShowMobileMenu((v) => !v)}
                            className="p-2 rounded-md hover:bg-[#1a2029] text-[#8e98a8]"
                        >
                            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <h1 className="text-sm font-semibold text-[#e6eaf2]">CRM Dashboard</h1>
                        <div className="w-10" />
                    </div>
                )}

                {/* Mobile rail drawer (vertical), matches your LeftRail */}
                {isMobile && showMobileMenu && (
                    <MobileRailMenu
                        onClose={() => setShowMobileMenu(false)}
                        onBackToChat={() => handleMobileViewChange('chat')}
                        onShowConversations={() => handleMobileViewChange('conversations')}
                        onShowInbox={() => handleMobileViewChange('sidebar')}
                    />
                )}

                {/* Workspace row */}
                <div className="flex-1 flex overflow-hidden min-h-0">
                    {/* Sidebar (desktop only) */}
                    {!isMobile && (
                        <Sidebar
                            collapsed={sidebarCollapsed}
                            onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
                        />
                    )}

                    {/* Conversation list (desktop + mobile when that tab is active) */}
                    {(!isMobile || mobileView === 'conversations') && (
                        <ConversationList
                            onSelectConversation={setSelectedConversation}
                            selectedConversation={selectedConversation}
                            width={isMobile ? '100%' : conversationListWidth}
                            onWidthChange={setConversationListWidth}
                            isMobile={isMobile}
                            onBackToChat={() => handleMobileViewChange('chat')}
                        />
                    )}

                    {/* Right region: Chat + Contact details */}
                    {(!isMobile || mobileView === 'chat') && (
                        <div className="flex-1 flex flex-col min-w-0 min-h-0">
                            <ChatTopBar
                                onShowContactDetails={() => setShowContactDetails(true)}
                                isMobile={isMobile}
                                conversationId={selectedConversation ?? undefined}
                            />

                            <div className="flex-1 flex min-w-0 min-h-0">
                                {selectedConversation && <ChatInterface conversationId={selectedConversation} />}

                                {/* Contact panel (collapsible on desktop; full-screen modal on mobile via its own prop) */}
                                {showContactDetails && (
                                    <ContactDetails
                                        onClose={() => setShowContactDetails(false)}
                                        isMobile={isMobile}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {isMobile && mobileView === 'sidebar' && (
                        <div className="w-full min-w-0 min-h-0">
                            <Sidebar
                                collapsed={false}
                                onToggleCollapse={() => { }}
                                fullWidth
                                isMobile
                                onBackToChat={() => handleMobileViewChange('chat')}
                            />
                        </div>
                    )}

                </div>

                {/* Mobile bottom nav (restored) */}
                {isMobile && (
                    <div className="bg-[#222225] border-t border-[#2a2f36] px-4 py-2">
                        <div className="flex items-center justify-around">
                            <button
                                onClick={() => handleMobileViewChange('chat')}
                                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${mobileView === 'chat' ? 'text-[#5aa8ff] bg-[#1a2029]' : 'text-[#8e98a8] hover:text-[#e6eaf2]'
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
