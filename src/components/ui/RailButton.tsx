'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

export const mobileRailPalette = {
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
    const t = tint === 'purple' ? mobileRailPalette.activePurple : mobileRailPalette.activeBlue;
    return <div className={`relative ${t.bg} ${t.border} border rounded-lg`}>{children}</div>;
}

export default function RailButton({
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
    const t = tint === 'purple' ? mobileRailPalette.activePurple : mobileRailPalette.activeBlue;

    const content = (
        <button
            title={label}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-150 ${active ? '' : mobileRailPalette.hover}`}
        >
            <Icon className={`w-5 h-5 ${active ? t.icon : mobileRailPalette.idle}`} />
        </button>
    );

    return (
        <div className="relative w-10">
            {showLeftBar && <span className={`absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded ${t.bar}`} />}
            {active ? <ActiveItemWrap tint={tint}>{content}</ActiveItemWrap> : content}
        </div>
    );
}
