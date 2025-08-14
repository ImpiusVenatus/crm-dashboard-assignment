'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type Sender = 'user' | 'contact' | 'system';
export type Kind = 'note' | 'event' | 'text';

export interface FeedMessage {
    id: string;
    text: string;
    sender: Sender;
    timestamp: Date;
    kind: Kind;
}

type ApiComment = { id: number; name: string; email: string; body: string };

const PAGE_SIZE = 30; // tune as you like

export default function useChatFeed(conversationId: string) {
    const [messages, setMessages] = useState<FeedMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingOlder, setLoadingOlder] = useState(false);

    // avoid duplicate fetches for the same page
    const fetchedPages = useRef<Set<number>>(new Set());

    const mapChunk = (data: ApiComment[], now: number): FeedMessage[] => {
        const mapped: FeedMessage[] = data.map((c, i) => ({
            id: String(c.id),
            text: c.body.replace(/\s+/g, ' ').trim(),
            sender: (i % 3 === 0 ? 'user' : 'contact') as Sender,
            timestamp: new Date(now - (data.length - i) * 60_000),
            kind: 'text',
        }));

        for (let i = 10; i < mapped.length; i += 10) {
            mapped.splice(i, 0, {
                id: `sys-${mapped[i]?.id ?? i}-openclose`,
                text: i % 20 === 0 ? 'Conversation opened by you' : 'Conversation closed by you',
                sender: 'system',
                timestamp: new Date(now - (mapped.length - i) * 60_000 + 30_000),
                kind: 'event',
            });
            mapped.splice(i + 1, 0, {
                id: `note-${mapped[i]?.id ?? i}-assign`,
                text: i % 20 === 0 ? 'Assigned to you' : 'You unassigned this person',
                sender: 'system',
                timestamp: new Date(now - (mapped.length - i) * 60_000 + 40_000),
                kind: 'note',
            });
        }
        return mapped;
    };

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                fetchedPages.current.clear();
                setPage(0);

                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/comments?_start=0&_limit=${PAGE_SIZE}`,
                    { cache: 'no-store' }
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: ApiComment[] = await res.json();

                const now = Date.now();
                const chunk = mapChunk(data, now);

                if (!alive) return;
                setMessages(chunk);
                setHasMore(true);
                fetchedPages.current.add(0);
            } catch (e: any) {
                if (!alive) return;
                setError(e?.message || 'Failed to load messages');
                setMessages([]);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [conversationId]);

    const fetchOlder = useCallback(async () => {
        if (loadingOlder) return;
        const nextPage = (page ?? 0) + 1;
        if (fetchedPages.current.has(nextPage)) return;

        try {
            setLoadingOlder(true);

            const start = nextPage * PAGE_SIZE;
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${PAGE_SIZE}`,
                { cache: 'no-store' }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data: ApiComment[] = await res.json();

            if (data.length === 0) {
                setHasMore(false);
                return;
            }

            const now = Date.now() - nextPage * 3_600_000;
            const chunk = mapChunk(data, now);

            setMessages(prev => [...chunk, ...prev]);
            fetchedPages.current.add(nextPage);
            setPage(nextPage);
        } finally {
            setLoadingOlder(false);
        }
    }, [loadingOlder, page]);

    return {
        messages,
        loading,
        error,
        hasMore,
        loadingOlder,
        fetchOlder,
    };
}
