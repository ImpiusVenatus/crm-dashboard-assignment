'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
    BookOpen,
    LayoutDashboard,
    Briefcase,
    Users,
    Megaphone,
    Share2,
    BarChart3,
    Settings,
    Bell,
    MessageCircleQuestion,
    CheckCheck,
    User,
} from 'lucide-react';

type ItemKey =
    | 'topPurple'
    | 'dashboard'
    | 'bag'
    | 'contacts'
    | 'announce'
    | 'network'
    | 'analytics'
    | 'settings'
    | 'profile'
    | 'bell'
    | 'faq'
    | 'doubleTick';

type RailItem = {
    key: ItemKey;
    icon: LucideIcon;
    label: string;
    active?: boolean;
    tint?: 'blue' | 'purple';
};

const palette = {
    railBg: 'bg-[#101113]',
    railBorder: 'border-r border-[#1c2330]',
    idle: 'text-[#8e98a8]',
    hover: 'hover:text-[#e3e8f2] hover:bg-[#1a2029]',
    activeBlue: {
        bar: 'bg-[#2f6bff]',
        icon: 'text-[#76a7ff]',
        bg: 'bg-[#0f1726]',
        border: 'border-[#203052]',
    },
    activePurple: {
        bar: 'bg-[#9c6bff]',
        icon: 'text-[#c3b3ff]',
        bg: 'bg-[#14122a]',
        border: 'border-[#2a2850]',
    },
};

function ActiveItemWrap({
    children,
    tint = 'blue',
}: {
    children: React.ReactNode;
    tint?: 'blue' | 'purple';
}) {
    const t = tint === 'purple' ? palette.activePurple : palette.activeBlue;
    return <div className={`relative ${t.bg} ${t.border} border rounded-lg`}>{children}</div>;
}

function RailButton({
    icon: Icon,
    label,
    active,
    tint = 'blue',
    showLeftBar = false,
}: {
    icon: LucideIcon;
    label: string;
    active?: boolean;
    tint?: 'blue' | 'purple';
    showLeftBar?: boolean;
}) {
    const t = tint === 'purple' ? palette.activePurple : palette.activeBlue;

    const content = (
        <button
            title={label}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-150 ${active ? '' : palette.hover
                }`}
        >
            <Icon className={`w-5 h-5 ${active ? t.icon : palette.idle}`} />
        </button>
    );

    return (
        <div className="relative w-10">
            {showLeftBar && (
                <span className={`absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded ${t.bar}`} />
            )}
            {active ? <ActiveItemWrap tint={tint}>{content}</ActiveItemWrap> : content}
        </div>
    );
}

export default function LeftRail() {

    return (
        <div className={`w-16 ${palette.railBg} ${palette.railBorder} flex flex-col items-center py-3 gap-4 flex-shrink-0`}>
            {/* BRAND: “M” at the top */}
            <div className="w-10 h-10 rounded-lg bg-[#2F2F32] border border-[#2b3e75] flex items-center justify-center">
                <span className="text-[#9eb6ff] font-semibold">M</span>
            </div>

            {/* Divider below brand */}
            <div className="w-8 h-px my-1 bg-[#1f2632]" />

            {/* Purple item + tiny progress bar */}
            <div className="flex flex-col items-center gap-2">
                <RailButton icon={BookOpen} label="Top" active tint="purple" />
                <div className="w-4 h-[3px] rounded bg-[#9c6bff]" />
            </div>

            {/* Main vertical stack */}
            <div className="flex flex-col items-center gap-3 mt-1">
                <RailButton icon={LayoutDashboard} label="Dashboard" />
                <RailButton icon={Briefcase} label="Bag" active tint="blue" showLeftBar />
                <RailButton icon={Users} label="Contacts" />
                <RailButton icon={Megaphone} label="Announcement" />
                <RailButton icon={Share2} label="Network" />
                <RailButton icon={BarChart3} label="Analytics" />
                <RailButton icon={Settings} label="Settings" />
            </div>

            <div className="flex-1" />

            {/* Bottom cluster: Profile (human icon), Bell, FAQ, Double tick */}
            <div className="flex flex-col items-center gap-3">
                {/* Profile bubble (human icon) with blue bg + green dot */}
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#0049C7] border border-[#2b3e75] flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#101113]" />
                </div>

                <RailButton icon={Bell} label="Notifications" />
                <RailButton icon={MessageCircleQuestion} label="FAQ" />
                <CheckCheck className='text-[#4589FE]' />
            </div>
        </div>
    );
}
