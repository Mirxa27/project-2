import React, { useState, useEffect } from 'react';
import { getConversations, sendMessage } from '../services/messageService';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      const fetchedConversations = await getConversations();
      setConversations(fetchedConversations);
    };
    fetchConversations();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConversation && message.trim()) {
      await sendMessage(selectedConversation.id, message);
      setMessage('');
      // Refresh the conversation to show the new message
      const updatedConversation = await getConversations(selectedConversation.id);
      setSelectedConversation(updatedConversation);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Conversations</h2>
          <ul className="space-y-2">
            {conversations.map((conv: any) => (
              <li
                key={conv.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedConversation?.id === conv.id ? 'bg-purple-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedConversation(conv)}
              >
                {conv.otherUser.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          {selectedConversation ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Conversation with {selectedConversation.otherUser.name}
              </h2>
              <div className="bg-white p-4 rounded-lg shadow-md h-96 overflow-y-auto mb-4">
                {selectedConversation.messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`mb-2 ${
                      msg.senderId === 'currentUser' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        msg.senderId === 'currentUser'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      {msg.content}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow p-2 border rounded-l"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition duration-300"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <p>Select a conversation to start messaging</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;