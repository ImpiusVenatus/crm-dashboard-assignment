'use client';

export type Conversation = {
    id: string;
    contact: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        status: 'online' | 'offline' | 'away';
        lastSeen: string;
    };
    lastMessage: {
        text: string;
        timestamp: string;
        sender: 'contact' | 'agent';
        type: 'text' | 'image' | 'file' | 'system';
    };
    status: 'open' | 'closed' | 'pending' | 'resolved';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignedTo?: string;
    tags: string[];
    unreadCount: number;
    createdAt: string;
    updatedAt: string;
};

// Enhanced conversation data with realistic CRM scenarios
const mockConversations: Conversation[] = [
    {
        id: 'conv-001',
        contact: {
            id: 'c1',
            name: 'Sarah Johnson',
            email: 'sarah.j@techcorp.com',
            avatar: 'https://i.pravatar.cc/150?img=1',
            status: 'online',
            lastSeen: '2 minutes ago'
        },
        lastMessage: {
            text: 'Hi! I have a question about your premium plan features.',
            timestamp: '2025-01-15T10:30:00Z',
            sender: 'contact',
            type: 'text'
        },
        status: 'open',
        priority: 'high',
        assignedTo: 'Faisal BH',
        tags: ['premium', 'billing'],
        unreadCount: 2,
        createdAt: '2025-01-15T09:00:00Z',
        updatedAt: '2025-01-15T10:30:00Z'
    },
    {
        id: 'conv-002',
        contact: {
            id: 'c2',
            name: 'Mike Chen',
            email: 'mike.chen@startup.io',
            avatar: 'https://i.pravatar.cc/150?img=2',
            status: 'offline',
            lastSeen: '1 hour ago'
        },
        lastMessage: {
            text: 'Thanks for the quick response! Issue resolved.',
            timestamp: '2025-01-15T09:15:00Z',
            sender: 'agent',
            type: 'text'
        },
        status: 'resolved',
        priority: 'medium',
        assignedTo: 'Faisal BH',
        tags: ['support', 'resolved'],
        unreadCount: 0,
        createdAt: '2025-01-15T08:00:00Z',
        updatedAt: '2025-01-15T09:15:00Z'
    },
    {
        id: 'conv-003',
        contact: {
            id: 'c3',
            name: 'Emma Rodriguez',
            email: 'emma.r@enterprise.com',
            avatar: 'https://i.pravatar.cc/150?img=3',
            status: 'away',
            lastSeen: '30 minutes ago'
        },
        lastMessage: {
            text: 'Can you help me with the API integration?',
            timestamp: '2025-01-15T10:00:00Z',
            sender: 'contact',
            type: 'text'
        },
        status: 'pending',
        priority: 'urgent',
        assignedTo: 'Faisal BH',
        tags: ['api', 'integration', 'enterprise'],
        unreadCount: 1,
        createdAt: '2025-01-15T09:30:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
    },
    {
        id: 'conv-004',
        contact: {
            id: 'c4',
            name: 'David Kim',
            email: 'david.k@upgrade.com',
            avatar: 'https://i.pravatar.cc/150?img=4',
            status: 'online',
            lastSeen: '15 minutes ago'
        },
        lastMessage: {
            text: 'I need to upgrade my subscription plan.',
            timestamp: '2025-01-15T09:45:00Z',
            sender: 'contact',
            type: 'text'
        },
        status: 'open',
        priority: 'medium',
        assignedTo: 'Faisal BH',
        tags: ['upgrade', 'subscription'],
        unreadCount: 1,
        createdAt: '2025-01-15T09:00:00Z',
        updatedAt: '2025-01-15T09:45:00Z'
    },
    {
        id: 'conv-005',
        contact: {
            id: 'c5',
            name: 'Lisa Thompson',
            email: 'lisa.t@feedback.com',
            avatar: 'https://i.pravatar.cc/150?img=5',
            status: 'offline',
            lastSeen: '2 hours ago'
        },
        lastMessage: {
            text: 'The new feature is working perfectly!',
            timestamp: '2025-01-15T08:30:00Z',
            sender: 'contact',
            type: 'text'
        },
        status: 'closed',
        priority: 'low',
        assignedTo: 'Faisal BH',
        tags: ['feature', 'positive'],
        unreadCount: 0,
        createdAt: '2025-01-15T07:00:00Z',
        updatedAt: '2025-01-15T08:30:00Z'
    }
];

export default function useConversations(limit = 10) {
    // For now, return mock data directly since the API doesn't exist
    // In production, you'd implement actual API fetching here
    return {
        loading: false,
        error: null,
        items: mockConversations.slice(0, limit),
        total: mockConversations.length
    };
}
