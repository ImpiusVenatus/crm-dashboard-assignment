'use client';

import {
    X, ChevronLeft,
    BookOpen, LayoutDashboard, Briefcase, Users, Megaphone, Share2, BarChart3, Settings,
    MessageSquare, User, Bell, MessageCircleQuestion, CheckCheck
} from 'lucide-react';
import RailButton, { mobileRailPalette } from './ui/RailButton';

export default function MobileRailMenu({
    onClose,
    onBackToChat,
    onShowConversations,
    onShowInbox,
}: {
    onClose: () => void;
    onBackToChat: () => void;
    onShowConversations: () => void;
    onShowInbox: () => void;
}) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50">
            <aside className={`h-full w-80 max-w-[80vw] bg-[#222225] border-r ${mobileRailPalette ? 'border-[#2a2f36]' : ''} flex flex-col`}>
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#2a2f36] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Brand “M” */}
                        <div className="w-10 h-10 rounded-lg bg-[#2F2F32] border border-[#2b3e75] flex items-center justify-center">
                            <span className="text-[#9eb6ff] font-semibold">M</span>
                        </div>
                        <span className="text-sm font-semibold text-[#e6eaf2]">Main Menu</span>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-md hover:bg-[#1a2029] text-[#8e98a8]">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* QUICK ACTIONS */}
                <div className="p-4 space-y-2">
                    <button
                        onClick={onBackToChat}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a2029] text-[#5aa8ff] border border-[#2a2f36]"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Chat</span>
                    </button>
                    <button
                        onClick={onShowConversations}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a2029] text-[#e6eaf2]"
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>Conversations</span>
                    </button>
                    <button
                        onClick={onShowInbox}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a2029] text-[#e6eaf2]"
                    >
                        <Users className="w-4 h-4" />
                        <span>Inbox</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#1f2632] mx-4 my-2" />

                {/* VERTICAL RAIL (icon + text rows) */}
                <div className="px-4 flex flex-col gap-3">
                    {/* Purple item + tiny progress bar */}
                    <div className="flex items-center gap-3">
                        <RailButton icon={BookOpen} label="Knowledge Base" active tint="purple" />
                        <span className="text-sm text-[#e6eaf2]">Knowledge Base</span>
                    </div>

                    {/* Main stack */}
                    <div className="flex items-center gap-3">
                        <RailButton icon={LayoutDashboard} label="Dashboard" />
                        <span className="text-sm text-[#e6eaf2]">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <RailButton icon={Briefcase} label="Projects" active tint="blue" showLeftBar />
                        <span className="text-sm text-[#e6eaf2]">Projects</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <RailButton icon={Users} label="Contacts" />
                        <span className="text-sm text-[#e6eaf2]">Contacts</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <RailButton icon={Megaphone} label="Announcements" />
                        <span className="text-sm text-[#e6eaf2]">Announcements</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <RailButton icon={Share2} label="Network" />
                        <span className="text-sm text-[#e6eaf2]">Network</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <RailButton icon={BarChart3} label="Analytics" />
                        <span className="text-sm text-[#e6eaf2]">Analytics</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <RailButton icon={Settings} label="Settings" />
                        <span className="text-sm text-[#e6eaf2]">Settings</span>
                    </div>

                    <div className="flex-1" />
                </div>

                {/* Bottom cluster */}
                <div className="px-4 pb-4 mt-auto">
                    <div className="flex items-center gap-3">
                        {/* Profile bubble with blue bg + green dot */}
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-[#0049C7] border border-[#2b3e75] flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#222225]" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <RailButton icon={Bell} label="Notifications" />
                            </div>
                            <div className="flex items-center gap-2">
                                <RailButton icon={MessageCircleQuestion} label="FAQ" />
                            </div>
                            <div className="w-10 h-10 rounded-lg flex flex-col items-center justify-center">
                                <CheckCheck className="w-5 h-5 text-[#4589FE]" />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
