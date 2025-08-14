'use client';

import { useEffect, useRef, useState } from 'react';

type State<T> = { data?: T; error?: Error; loading: boolean };

export default function useFetch<T = unknown>(url?: string | null) {
    const [state, setState] = useState<State<T>>({ loading: !!url });
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (!url) return;
        abortRef.current?.abort();
        const ctrl = new AbortController();
        abortRef.current = ctrl;

        setState({ loading: true });

        fetch(url, { signal: ctrl.signal })
            .then(async (r) => {
                if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
                return (await r.json()) as T;
            })
            .then((data) => setState({ data, loading: false }))
            .catch((err) => {
                if (ctrl.signal.aborted) return;
                setState({ error: err as Error, loading: false });
            });

        return () => ctrl.abort();
    }, [url]);

    return state;
}
