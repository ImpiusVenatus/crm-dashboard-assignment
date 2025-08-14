'use client';
import useFetch from './useFetch';

export type Agent = {
    name: { first: string; last: string };
    picture: { thumbnail: string; medium: string };
};

type RandomUserResponse = { results: Agent[] };

export default function useAgent() {
    // one random user; cache-busting kept to RandomUser defaults
    const { data, error, loading } = useFetch<RandomUserResponse>('https://randomuser.me/api/?inc=name,picture&noinfo');
    const agent = data?.results?.[0];

    return {
        loading,
        error,
        name: agent ? `${agent.name.first} ${agent.name.last}` : 'Agent',
        avatar: agent?.picture?.thumbnail,
    };
}
