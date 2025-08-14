'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ConversationList from './ConversationList';
import ChatInterface from './ChatInterface';
import ContactDetails from './ContactDetails';
import TopBanner from './TopBanner';
import ChatTopBar from './ChatTopBar';

// NEW: import the separated LeftRail component
import LeftRail from './LeftRail';

const Dashboard = () => {
    const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
    const [showContactDetails, setShowContactDetails] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [conversationListWidth, setConversationListWidth] = useState(400);

    return (
        <div className="h-screen w-screen overflow-hidden flex">
            {/* Far-left rail (reaches the very top) */}
            <LeftRail />

            {/* Right side: banner + app */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBanner />

                <div className="flex-1 flex overflow-hidden">
                    <Sidebar
                        collapsed={sidebarCollapsed}
                        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />

                    <ConversationList
                        onSelectConversation={setSelectedConversation}
                        selectedConversation={selectedConversation}
                        width={conversationListWidth}
                        onWidthChange={setConversationListWidth}
                    />

                    {/* RIGHT REGION (fills remaining width) */}
                    <div className="flex-1 flex flex-col min-w-0">
                        <ChatTopBar onShowContactDetails={() => setShowContactDetails(true)} />

                        <div className="flex-1 flex min-w-0">
                            {selectedConversation && (
                                <ChatInterface conversationId={selectedConversation} />
                            )}
                            {showContactDetails && (
                                <ContactDetails onClose={() => setShowContactDetails(false)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
