'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Search, ChevronDown, Zap, Target, DollarSign, UserCheck, Globe, Plus,
    PanelLeftClose, PanelRightClose, Inbox, User, UserMinus, PhoneIncoming, ChevronLeft
} from 'lucide-react';

interface SidebarProps {
    collapsed: boolean;
    onToggleCollapse: () => void;
    fullWidth?: boolean;
    isMobile?: boolean;
    onBackToChat?: () => void;
}

const Sidebar = ({
    collapsed,
    onToggleCollapse,
    fullWidth = false,
    isMobile = false,
    onBackToChat,
}: SidebarProps) => {
    const [expanded, setExpanded] = useState({ lifecycle: true, team: true, custom: true });
    const toggle = (k: keyof typeof expanded) => setExpanded(p => ({ ...p, [k]: !p[k] }));

    const bg = 'bg-[#222225]';
    const border = 'border border-[#2a2f36]';
    const strongText = 'text-[#d7dce6]';

    const lifecycle = [
        { icon: Zap, label: 'New Lead', emoji: '🆕', color: 'text-[#5aa8ff]' },
        { icon: Target, label: 'Hot Lead', emoji: '🔥', color: 'text-[#ff9f47]' },
        { icon: DollarSign, label: 'Payment', emoji: '💰', color: 'text-[#54d186]' },
        { icon: UserCheck, label: 'Customer', emoji: '🧑‍💼', color: 'text-[#b390ff]' },
    ];

    const targetWidth = fullWidth ? '100%' : (collapsed ? 64 : 320);

    return (
        <motion.aside
            initial={{ width: targetWidth }}
            animate={{ width: targetWidth }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            /* 👇 ensure the sidebar itself stretches to the parent’s height */
            className={`h-full ${bg} ${border} border-l-0 border-t-0 border-b-0 flex flex-col flex-shrink-0 overflow-hidden min-w-0`}
            style={{ width: fullWidth ? '100%' : undefined }}
        >
            {/* Header */}
            <div className={`flex-shrink-0 ${border} border-x-0 border-t-0`}>
                <div className="p-3">
                    <div className="flex items-center justify-between">
                        {fullWidth ? (
                            <>
                                <div className="flex items-center gap-2">
                                    {onBackToChat && (
                                        <button
                                            onClick={onBackToChat}
                                            className="px-2 py-1.5 flex items-center text-sm text-[#5aa8ff] hover:text-[#8ab4ff] hover:bg-[#1a2029] rounded-md transition-colors"
                                            title="Back to Chat"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-1" />
                                            Back to Chat
                                        </button>
                                    )}
                                    <h2 className={`text-sm font-semibold ${strongText}`}>Inbox</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Search className="w-4 h-4 text-[#7b8696] hover:text-[#cfd6e3] cursor-pointer" />
                                </div>
                            </>
                        ) : !collapsed ? (
                            <>
                                <h2 className={`text-sm font-semibold ${strongText}`}>Inbox</h2>
                                <div className="flex items-center gap-2">
                                    <Search className="w-4 h-4 text-[#7b8696] hover:text-[#cfd6e3] cursor-pointer" />
                                    <motion.div
                                        className={`flex-shrink-0 ${border} border-x-0 border-b-0 p-3`}
                                        animate={{ padding: collapsed ? 12 : 16 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <motion.button
                                                whileHover={{ opacity: 0.85 }}
                                                whileTap={{ opacity: 0.7 }}
                                                onClick={onToggleCollapse}
                                                title="Collapse Sidebar"
                                                className="text-[#8e98a8] hover:text-[#e7ecf5]"
                                            >
                                                <PanelLeftClose />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </div>
                            </>
                        ) : (
                            <motion.button
                                whileHover={{ opacity: 0.85 }}
                                whileTap={{ opacity: 0.7 }}
                                onClick={onToggleCollapse}
                                title="Expand Sidebar"
                                className="text-[#8e98a8] hover:text-[#e7ecf5] p-3"
                            >
                                <PanelRightClose />
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main (scroll area) */}
            {/* 👇 allow this region to actually fill and scroll within the full-height aside */}
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-2">
                <AnimatePresence initial={false}>
                    {(!collapsed || fullWidth) && (
                        <motion.div
                            key="filters"
                            initial={{ opacity: 0, y: 12, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 8, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="rounded-xl p-3 mb-3"
                        >
                            <div className="grid grid-cols-1 gap-1">
                                {[
                                    { label: 'All', icon: Inbox, active: true },
                                    { label: 'Mine', icon: User, active: false },
                                    { label: 'Unassigned', icon: UserMinus, active: false },
                                    { label: 'Incoming Calls', icon: PhoneIncoming, active: false },
                                ].map((f) => {
                                    const Icon = f.icon;
                                    return (
                                        <div
                                            key={f.label}
                                            className={`flex items-center gap-2 text-[11px] px-2 py-1.5 rounded-md cursor-pointer transition-colors
                      ${f.active ? 'bg-[#363C45] text-white' : 'text-[#8e98a8] hover:text-[#cbd3e0] hover:bg-[#363C45]'}`}
                                        >
                                            <Icon className="w-4 h-4 text-[#7b8696]" />
                                            <span>{f.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Lifecycle */}
                <AnimatePresence initial={false}>
                    {(!collapsed || fullWidth) && (
                        <motion.div
                            key="lifecycle"
                            initial={{ opacity: 0, y: 12, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 8, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="rounded-xl p-3 mb-3"
                        >
                            <button onClick={() => toggle('lifecycle')} className="w-full flex items-center justify-between">
                                <h3 className={`text-[12px] font-semibold ${strongText}`}>Lifecycle</h3>
                                <motion.div animate={{ rotate: expanded.lifecycle ? 180 : 0 }} transition={{ duration: 0.16 }}>
                                    <ChevronDown className="w-4 h-4 text-[#7b8696]" />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {expanded.lifecycle && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="mt-2 space-y-1 overflow-hidden"
                                    >
                                        {lifecycle.map((s, i) => (
                                            <motion.div
                                                key={s.label}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04, duration: 0.16 }}
                                                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1a2029] cursor-pointer"
                                            >
                                                <span className="text-xs text-[#c3cad6]">
                                                    <span className="mr-1">{s.emoji}</span>
                                                    {s.label}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Team Inbox */}
                <AnimatePresence initial={false}>
                    {(!collapsed || fullWidth) && (
                        <motion.div
                            key="team"
                            initial={{ opacity: 0, y: 12, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 8, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="rounded-xl p-3 mb-3"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#7b8696]" />
                                    <h3 className={`text-[12px] font-semibold ${strongText}`}>Team Inbox</h3>
                                </div>
                                <button className="flex items-center gap-1 text-[11px] text-[#7b8696] hover:text-[#cfd6e3]">
                                    <Plus className="w-4 h-4" />
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-2 text-[11px] text-[#8e98a8] px-2 py-1.5 rounded-md">No inboxes created</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Custom Inbox */}
                <AnimatePresence initial={false}>
                    {(!collapsed || fullWidth) && (
                        <motion.div
                            key="custom"
                            initial={{ opacity: 0, y: 12, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 8, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="rounded-xl p-3"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-[#7b8696]" />
                                    <h3 className={`text-[12px] font-semibold ${strongText}`}>Custom Inbox</h3>
                                </div>
                                <button className="flex items-center gap-1 text-[11px] text-[#7b8696] hover:text-[#cfd6e3]">
                                    <Plus className="w-4 h-4" />
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-2 text-[11px] text-[#8e98a8] px-2 py-1.5 rounded-md">No inboxes created</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
