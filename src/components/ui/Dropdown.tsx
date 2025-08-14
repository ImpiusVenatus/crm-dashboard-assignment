'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export type Option = { label: string; value: string; icon?: React.ReactNode };

function useClickAway(ref: React.RefObject<HTMLElement>, onAway: () => void) {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) onAway();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref, onAway]);
}

const menuVariants = {
    hidden: { opacity: 0, y: -6, scale: 0.98, pointerEvents: 'none' as const },
    visible: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' as const },
};

export default function Dropdown({
    value,
    onChange,
    options,
    placeholder = 'Select…',
    buttonClass = '',
    menuClass = '',
    align = 'left',
    maxHeight = 220,
}: {
    value?: string;
    onChange: (v: string) => void;
    options: Option[];
    placeholder?: string;
    buttonClass?: string;
    menuClass?: string;
    align?: 'left' | 'right';
    maxHeight?: number;
}) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapRef as React.RefObject<HTMLElement>, () => setOpen(false));

    const current = useMemo(() => options.find(o => o.value === value), [options, value]);
    const btnRef = useRef<HTMLButtonElement>(null);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
        if (e.key === 'Enter' || e.key === ' ') setOpen(prev => !prev);
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !open) setOpen(true);
    };

    return (
        <div className="relative" ref={wrapRef}>
            <button
                ref={btnRef}
                type="button"
                onClick={() => setOpen(o => !o)}
                onKeyDown={onKeyDown}
                className={`w-full inline-flex items-center justify-between gap-2 py-1.5 ${buttonClass}`}
                aria-expanded={open}
            >
                <span className="inline-flex items-center gap-2 truncate">
                    {current?.icon}
                    <span className="truncate">{current?.label ?? placeholder}</span>
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
                    <ChevronDown className="w-4 h-4 text-[#7b8696]" />
                </motion.span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className={`absolute z-50 min-w-[12rem] ${align === 'right' ? 'right-0' : 'left-0'} ${menuClass}`}
                    >
                        <div
                            className={`rounded-xl border border-[#2a2f36] bg-[#222225] shadow-2xl overflow-hidden`}
                            style={{ maxHeight, overflowY: 'auto' }}
                        >
                            {options.map(opt => {
                                const selected = opt.value === value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${selected ? 'bg-[#1f2632] text-[#cfe1ff]' : 'text-[#e6eaf2] hover:bg-[#1a2029]'
                                            }`}
                                        onClick={() => {
                                            onChange(opt.value);
                                            setOpen(false);
                                        }}
                                    >
                                        {opt.icon}
                                        <span className="flex-1">{opt.label}</span>
                                        {selected && <Check className="w-4 h-4 text-[#8ab4ff]" />}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
