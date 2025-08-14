'use client';

export default function FlagBD({ className = 'w-4 h-4 rounded-sm' }: { className?: string }) {
    return (
        <svg viewBox="0 0 160 100" className={className} aria-label="Bangladesh Flag">
            <rect width="160" height="100" fill="#006a4e" />
            <circle cx="70" cy="50" r="28" fill="#f42a41" />
        </svg>
    );
}
