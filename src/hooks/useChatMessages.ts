'use client';

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'contact' | 'system';
    timestamp: Date;
    kind: 'text' | 'note' | 'event' | 'image' | 'file' | 'system';
    metadata?: {
        type?: string;
        value?: string;
    };
}

export interface Contact {
    name: string;
    avatar: string;
    role: string;
    company: string;
}

export interface ConversationData {
    id: string;
    contact: Contact;
    messages: ChatMessage[];
    status: 'open' | 'closed' | 'pending' | 'resolved';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    tags: string[];
    assignedTo: string;
    createdAt: Date;
    lastActivity: Date;
}

// Rich conversation data with scrollable message history
export const mockConversationData: Record<string, ConversationData> = {
    'conv-001': {
        id: 'conv-001',
        contact: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            role: 'Product Manager',
            company: 'TechCorp Solutions'
        },
        messages: [
            // Recent messages (last 24 hours)
            {
                id: 'msg-001',
                text: 'Hi! I have a question about your premium plan features.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
                kind: 'text'
            },
            {
                id: 'msg-002',
                text: 'Hello Sarah! Welcome to our support. I\'d be happy to help you with any questions about our premium plan.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 28), // 28 min ago
                kind: 'text'
            },
            {
                id: 'msg-003',
                text: 'Great! I\'m particularly interested in the advanced analytics and API access features.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 min ago
                kind: 'text'
            },
            {
                id: 'msg-004',
                text: 'Perfect! Our premium plan includes unlimited API calls, real-time analytics dashboard, and priority support.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 22), // 22 min ago
                kind: 'text'
            },
            {
                id: 'msg-005',
                text: 'That sounds exactly what we need. Can you send me the pricing details?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 min ago
                kind: 'text'
            },
            {
                id: 'msg-006',
                text: 'Absolutely! I\'ll send you a detailed pricing breakdown and feature comparison.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 18), // 18 min ago
                kind: 'text'
            },
            {
                id: 'msg-007',
                text: 'Also, do you offer any enterprise discounts for larger teams?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
                kind: 'text'
            },
            {
                id: 'msg-008',
                text: 'Yes, we do! For teams of 10+ users, we offer volume discounts and dedicated account management.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 12), // 12 min ago
                kind: 'text'
            },
            {
                id: 'msg-009',
                text: 'Perfect! Can we schedule a demo call for next week?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 min ago
                kind: 'text'
            },
            {
                id: 'msg-010',
                text: 'Of course! I\'ll send you a calendar link with available slots.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 min ago
                kind: 'text'
            },
            {
                id: 'msg-011',
                text: 'Thanks! Looking forward to it.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
                kind: 'text'
            },
            {
                id: 'msg-012',
                text: 'You\'re welcome! Is there anything else I can help you with today?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 min ago
                kind: 'text'
            },
            {
                id: 'msg-013',
                text: 'Actually yes, one more thing - do you have any case studies from similar companies?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 min ago
                kind: 'text'
            },
            {
                id: 'msg-014',
                text: 'Great question! I\'ll share some relevant case studies with you.',
                sender: 'user',
                timestamp: new Date(Date.now()), // now
                kind: 'text'
            },

            // Yesterday's messages
            {
                id: 'msg-015',
                text: 'Lifecycle Stage New Lead updated to Hot Lead by you',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                kind: 'system'
            },
            {
                id: 'msg-016',
                text: 'Contact assigned to you',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30), // 1 day ago
                kind: 'system'
            },
            {
                id: 'msg-017',
                text: 'Contact created from website form',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 60), // 1 day ago
                kind: 'system'
            },
            {
                id: 'msg-018',
                text: 'Previous conversation history loaded',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 90), // 1 day ago
                kind: 'system'
            },
            {
                id: 'msg-019',
                text: 'Contact profile updated with company information',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 120), // 1 day ago
                kind: 'system'
            },

            // Earlier this week
            {
                id: 'msg-020',
                text: 'Hi there! I saw your product demo at the tech conference last week.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
                kind: 'text'
            },
            {
                id: 'msg-021',
                text: 'Hello! Yes, I remember meeting you there. How can I help?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 15), // 3 days ago
                kind: 'text'
            },
            {
                id: 'msg-022',
                text: 'I was really impressed with the demo. We\'re looking for a solution like yours.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 30), // 3 days ago
                kind: 'text'
            },
            {
                id: 'msg-023',
                text: 'That\'s great to hear! What specific challenges are you trying to solve?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 45), // 3 days ago
                kind: 'text'
            },
            {
                id: 'msg-024',
                text: 'We need better customer insights and automation for our support team.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60), // 3 days ago
                kind: 'text'
            },
            {
                id: 'msg-025',
                text: 'Perfect! Our platform specializes in exactly that.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 75), // 3 days ago
                kind: 'text'
            },

            // Last week
            {
                id: 'msg-026',
                text: 'Conversation opened by you',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
                kind: 'system'
            },
            {
                id: 'msg-027',
                text: 'Hi! I found your company through a Google search.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 10), // 1 week ago
                kind: 'text'
            },
            {
                id: 'msg-028',
                text: 'Welcome! How can I assist you today?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 20), // 1 week ago
                kind: 'text'
            },
            {
                id: 'msg-029',
                text: 'I\'m looking for a CRM solution for our startup.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 30), // 1 week ago
                kind: 'text'
            },
            {
                id: 'msg-030',
                text: 'Great choice! We have several options that work well for startups.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 40), // 1 week ago
                kind: 'text'
            },
            {
                id: 'msg-031',
                text: 'Can you tell me more about your pricing?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 50), // 1 week ago
                kind: 'text'
            },
            {
                id: 'msg-032',
                text: 'Of course! We offer flexible plans starting at $29/month.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60), // 1 week ago
                kind: 'text'
            },

            // Two weeks ago
            {
                id: 'msg-033',
                text: 'Previous conversation history loaded',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
                kind: 'system'
            },
            {
                id: 'msg-034',
                text: 'Hi! I have a technical question about your API.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 10), // 2 weeks ago
                kind: 'text'
            },
            {
                id: 'msg-035',
                text: 'Hello! I\'d be happy to help with your API question.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 20), // 2 weeks ago
                kind: 'text'
            },
            {
                id: 'msg-036',
                text: 'I\'m getting a 404 error when trying to access the user endpoint.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 30), // 2 weeks ago
                kind: 'text'
            },
            {
                id: 'msg-037',
                text: 'Let me check that for you. Can you share the exact URL you\'re calling?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 40), // 2 weeks ago
                kind: 'text'
            },
            {
                id: 'msg-038',
                text: 'Sure, it\'s: https://api.yourcompany.com/v1/users/123',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 50), // 2 weeks ago
                kind: 'text'
            },
            {
                id: 'msg-039',
                text: 'I see the issue! The endpoint should be /v2/users, not /v1.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 60), // 2 weeks ago
                kind: 'text'
            },
            {
                id: 'msg-040',
                text: 'Ah, that makes sense! Thanks for the help.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 70), // 2 weeks ago
                kind: 'text'
            },
            {
                id: 'msg-041',
                text: 'You\'re welcome! Let me know if you need anything else.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14 + 1000 * 60 * 80), // 2 weeks ago
                kind: 'text'
            },

            // One month ago
            {
                id: 'msg-042',
                text: 'Contact created from website form',
                sender: 'system',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
                kind: 'system'
            },
            {
                id: 'msg-043',
                text: 'Hi! I\'m interested in your enterprise plan.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 10), // 1 month ago
                kind: 'text'
            },
            {
                id: 'msg-044',
                text: 'Hello! Thank you for your interest in our enterprise solution.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 20), // 1 month ago
                kind: 'text'
            },
            {
                id: 'msg-045',
                text: 'Can you tell me about your security features?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 30), // 1 month ago
                kind: 'text'
            },
            {
                id: 'msg-046',
                text: 'Absolutely! We have SOC 2 Type II compliance, end-to-end encryption, and enterprise-grade security.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 40), // 1 month ago
                kind: 'text'
            },
            {
                id: 'msg-047',
                text: 'That sounds perfect for our compliance requirements.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 50), // 1 month ago
                kind: 'text'
            },
            {
                id: 'msg-048',
                text: 'Great! Would you like me to schedule a security review call?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 + 1000 * 60 * 60), // 1 month ago
                kind: 'text'
            }
        ],
        status: 'open',
        priority: 'high',
        tags: ['premium', 'billing', 'enterprise'],
        assignedTo: 'Faisal BH',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        lastActivity: new Date(Date.now())
    },
    'conv-002': {
        id: 'conv-002',
        contact: {
            name: 'Mike Chen',
            avatar: 'https://i.pravatar.cc/150?img=2',
            company: 'Startup.io',
            role: 'CTO'
        },
        messages: [
            {
                id: 'msg-001',
                text: 'Hi! I have a question about your webhook integration.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
                kind: 'text'
            },
            {
                id: 'msg-002',
                text: 'Hello Mike! I\'d be happy to help with your webhook question.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5),
                kind: 'text'
            },
            {
                id: 'msg-003',
                text: 'What specific issue are you experiencing?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 10),
                kind: 'text'
            },
            {
                id: 'msg-004',
                text: 'The webhook is not triggering when orders are placed.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 15),
                kind: 'text'
            },
            {
                id: 'msg-005',
                text: 'Let me check your webhook configuration.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 20),
                kind: 'text'
            },
            {
                id: 'msg-006',
                text: 'I found the issue! Your webhook URL has an extra slash at the end.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 25),
                kind: 'text'
            },
            {
                id: 'msg-007',
                text: 'Thanks for the quick response! Issue resolved.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 30),
                kind: 'text'
            }
        ],
        status: 'resolved',
        priority: 'medium',
        tags: ['support', 'resolved', 'webhook'],
        assignedTo: 'Faisal BH',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 30)
    },
    'conv-003': {
        id: 'conv-003',
        contact: {
            name: 'Emma Rodriguez',
            avatar: 'https://i.pravatar.cc/150?img=3',
            company: 'Enterprise Corp',
            role: 'Technical Lead'
        },
        messages: [
            {
                id: 'msg-001',
                text: 'Can you help me with the API integration?',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 30),
                kind: 'text'
            },
            {
                id: 'msg-002',
                text: 'Absolutely! I\'d be happy to help with your API integration.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 28),
                kind: 'text'
            },
            {
                id: 'msg-003',
                text: 'What specific part are you having trouble with?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 25),
                kind: 'text'
            },
            {
                id: 'msg-004',
                text: 'The authentication flow is a bit confusing for our team.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 20),
                kind: 'text'
            },
            {
                id: 'msg-005',
                text: 'I understand! Let me send you our detailed authentication guide.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 15),
                kind: 'text'
            },
            {
                id: 'msg-006',
                text: 'I\'ve attached the documentation. It includes code examples in multiple languages.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 10),
                kind: 'text'
            }
        ],
        status: 'pending',
        priority: 'urgent',
        tags: ['api', 'integration', 'enterprise', 'authentication'],
        assignedTo: 'Faisal BH',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        lastActivity: new Date(Date.now() - 1000 * 60 * 10)
    },
    'conv-004': {
        id: 'conv-004',
        contact: {
            name: 'David Kim',
            avatar: 'https://i.pravatar.cc/150?img=4',
            company: 'Upgrade.com',
            role: 'Product Manager'
        },
        messages: [
            {
                id: 'msg-001',
                text: 'I need to upgrade my subscription plan.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 45),
                kind: 'text'
            },
            {
                id: 'msg-002',
                text: 'Hello David! I\'d be happy to help you upgrade your plan.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 40),
                kind: 'text'
            },
            {
                id: 'msg-003',
                text: 'What features are you looking for in the upgrade?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 35),
                kind: 'text'
            },
            {
                id: 'msg-004',
                text: 'I need the advanced analytics and team collaboration features.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 30),
                kind: 'text'
            },
            {
                id: 'msg-005',
                text: 'Perfect! That\'s our Professional plan. Let me show you the pricing.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 25),
                kind: 'text'
            }
        ],
        status: 'open',
        priority: 'medium',
        tags: ['upgrade', 'subscription'],
        assignedTo: 'Faisal BH',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        lastActivity: new Date(Date.now() - 1000 * 60 * 25)
    },
    'conv-005': {
        id: 'conv-005',
        contact: {
            name: 'Lisa Thompson',
            avatar: 'https://i.pravatar.cc/150?img=5',
            company: 'Feedback.com',
            role: 'Customer Success'
        },
        messages: [
            {
                id: 'msg-001',
                text: 'Hi! I just wanted to say the new feature is working perfectly!',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
                kind: 'text'
            },
            {
                id: 'msg-002',
                text: 'That\'s wonderful to hear, Lisa! We\'re glad you\'re enjoying it.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5),
                kind: 'text'
            },
            {
                id: 'msg-003',
                text: 'Is there anything else you\'d like us to improve?',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 10),
                kind: 'text'
            },
            {
                id: 'msg-004',
                text: 'Not at the moment! Everything is working great.',
                sender: 'contact',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 15),
                kind: 'text'
            },
            {
                id: 'msg-005',
                text: 'Perfect! Feel free to reach out if you need anything.',
                sender: 'user',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 20),
                kind: 'text'
            }
        ],
        status: 'closed',
        priority: 'low',
        tags: ['feature', 'positive'],
        assignedTo: 'Faisal BH',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 20)
    }
};

export default function useChatMessages(conversationId: string | null) {
    if (!conversationId) {
        return {
            loading: false,
            error: null,
            conversation: null,
            messages: []
        };
    }

    const conversation = mockConversationData[conversationId];

    if (!conversation) {
        return {
            loading: false,
            error: new Error('Conversation not found'),
            conversation: null,
            messages: []
        };
    }

    return {
        loading: false,
        error: null,
        conversation,
        messages: conversation.messages
    };
}

