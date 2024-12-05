// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    guest: { id: '1', name: 'John Smith' },
    lastMessage: 'When can I check in?',
    unreadCount: 2,
    messages: [
      { id: '1', content: 'Hi, I\'m interested in booking', senderId: 'guest', timestamp: '2024-03-10T10:00:00Z' },
      { id: '2', content: 'Welcome! How can I help?', senderId: 'host', timestamp: '2024-03-10T10:05:00Z' },
      { id: '3', content: 'When can I check in?', senderId: 'guest', timestamp: '2024-03-10T10:10:00Z' }
    ]
  },
  {
    id: '2',
    guest: { id: '2', name: 'Sarah Johnson' },
    lastMessage: 'Thanks for the great stay!',
    unreadCount: 0,
    messages: [
      { id: '1', content: 'Thanks for the great stay!', senderId: 'guest', timestamp: '2024-03-09T15:00:00Z' },
      { id: '2', content: 'You\'re welcome! Please visit again!', senderId: 'host', timestamp: '2024-03-09T15:30:00Z' }
    ]
  }
];

export const getConversations = async () => {
  try {
    // Return mock data instead of making API call
    return Promise.resolve(mockConversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
};

export const getConversation = async (id: string) => {
  try {
    const conversation = mockConversations.find(c => c.id === id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return Promise.resolve(conversation);
  } catch (error) {
    console.error(`Error fetching conversation ${id}:`, error);
    throw error;
  }
};

export const sendMessage = async (conversationId: string, content: string) => {
  try {
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const newMessage = {
      id: Date.now().toString(),
      content,
      senderId: 'host',
      timestamp: new Date().toISOString()
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = content;

    return Promise.resolve(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const markConversationAsRead = async (id: string) => {
  try {
    const conversation = mockConversations.find(c => c.id === id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    conversation.unreadCount = 0;
    return Promise.resolve(conversation);
  } catch (error) {
    console.error(`Error marking conversation ${id} as read:`, error);
    throw error;
  }
};