import React, { useState, useEffect } from 'react';
import { getConversations, sendMessage, markConversationAsRead } from '../../services/messageService';

const GuestCommunication = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const fetchedConversations = await getConversations();
      setConversations(fetchedConversations);
      setError('');
    } catch (err) {
      setError('Failed to load conversations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    if (conversation.unreadCount > 0) {
      try {
        await markConversationAsRead(conversation.id);
        fetchConversations();
      } catch (err) {
        console.error('Error marking conversation as read:', err);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedConversation || !message.trim()) return;

    try {
      await sendMessage(selectedConversation.id, message);
      setMessage('');
      fetchConversations();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelectConversation(conv)}
              className={`p-3 rounded-lg cursor-pointer ${
                selectedConversation?.id === conv.id
                  ? 'bg-purple-100'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{conv.guest.name}</span>
                {conv.unreadCount > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 bg-white rounded-lg shadow p-4">
        {selectedConversation ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Chat with {selectedConversation.guest.name}
            </h2>
            <div className="h-96 overflow-y-auto mb-4 space-y-2">
              {selectedConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === 'host' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.senderId === 'host'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs opacity-75">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-gray-500">
            Select a conversation to start chatting
          </p>
        )}
      </div>
    </div>
  );
};

export default GuestCommunication;