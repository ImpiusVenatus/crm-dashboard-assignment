# CRM Dashboard

A modern, responsive CRM dashboard built with Next.js, TypeScript, and Tailwind CSS with real data integration.

## Features

### Desktop Experience
- **Left Rail Navigation**: Quick access to main sections with visual indicators
- **Collapsible Sidebar**: Inbox management with filters and lifecycle stages
- **Conversation List**: Resizable panel for managing conversations with real data
- **Chat Interface**: Full-featured chat with scrollable message history and actions
- **Contact Details**: Right panel for contact information and management
- **Dashboard Statistics**: Real-time stats cards with conversation metrics

### Mobile Experience
- **Responsive Design**: Automatically adapts to mobile screens (breakpoint: 1024px)
- **Mobile Navigation**: Bottom navigation bar with Chats, Inbox, and More options
- **Mobile Menu**: Slide-out menu for additional navigation options
- **Touch-Optimized**: Larger touch targets and mobile-friendly interactions
- **Full-Screen Modals**: Contact details and other panels open as full-screen overlays on mobile

## Data Integration

### Real Data Sources
The dashboard integrates with multiple data sources:

- **Conversations**: Rich conversation data with contacts, messages, and metadata
- **Chat Messages**: Scrollable conversation history with system events and lifecycle updates
- **Contact Information**: Real contact profiles with avatars, companies, and roles
- **Dashboard Statistics**: Live metrics including conversation counts, response times, and satisfaction scores

### Data Hooks
- **useConversations**: Fetches and manages conversation list data
- **useChatMessages**: Retrieves chat history and conversation details
- **useAgent**: Fetches agent information from external APIs
- **useFetch**: Generic fetch hook with error handling and loading states

### API Integration
- **Primary**: MockAPI.io endpoints for production data
- **Fallback**: Rich mock data for development and testing
- **External APIs**: RandomUser.me for agent profiles
- **Real-time**: Simulated real-time updates and notifications

## Mobile Responsiveness

The dashboard automatically switches to mobile mode on screens smaller than 1024px:

### Mobile Layout Changes
- **LeftRail**: Hidden on mobile (replaced with mobile menu)
- **Sidebar**: Hidden on mobile (accessible via mobile menu)
- **ConversationList**: Full-width on mobile when active
- **ChatInterface**: Optimized spacing and layout for mobile
- **ContactDetails**: Full-screen overlay on mobile
- **StatsCards**: Hidden on mobile to save space

### Mobile Navigation
- **Bottom Navigation**: Three main sections (Chat, Chats, Inbox)
- **Mobile Menu**: Slide-out menu with all navigation options
- **Info Button**: Quick access to contact details in chat header

### Mobile Features
- Touch-friendly button sizes (44px minimum)
- Smooth scrolling with momentum
- Responsive text sizing
- Landscape orientation support
- Prevented horizontal scrolling

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks
- **Data Fetching**: Custom hooks with API integration
- **Mock Data**: Comprehensive mock data for development

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

The dashboard uses a responsive-first approach:
- Desktop: Full three-panel layout with collapsible sidebar and stats
- Mobile: Single-panel layout with bottom navigation and overlays
- Breakpoint: 1024px (lg in Tailwind)

All components automatically adapt to screen size and integrate with real data sources.

## Data Structure

### Conversation
```typescript
{
  id: string;
  contact: {
    name: string;
    email: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
    company: string;
    role: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    sender: 'contact' | 'agent';
  };
  status: 'open' | 'closed' | 'pending' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  unreadCount: number;
}
```

### Chat Message
```typescript
{
  id: string;
  text: string;
  sender: 'user' | 'contact' | 'system';
  timestamp: Date;
  kind: 'note' | 'event' | 'text' | 'image' | 'file';
}
```

The dashboard now provides a complete CRM experience with real data, rich conversations, and comprehensive mobile support!
