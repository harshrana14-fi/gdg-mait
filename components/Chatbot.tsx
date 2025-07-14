'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, Send, Minimize2, Maximize2, X, User, Bot, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: '👋 Hi there! I\'m your GDG MAIT assistant. Ask me anything about GDG MAIT, events, MAIT College, or how to get involved!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingMessage]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // REPLACE THE OLD fetchArticles FUNCTION WITH THIS FIXED VERSION
  const fetchArticles = async (): Promise<string> => {
  try {
    const res = await fetch('/api/gdg/articles');
    
    if (!res.ok) {
      console.error('Articles API returned:', res.status);
      return 'Unable to load articles at this time.';
    }
    
    const data = await res.json();
    console.log('Articles API response:', data); // Debug log
    
    // Handle different response structures
    const articles = Array.isArray(data) ? data : (data.articles || data.data || []);
    
    if (!Array.isArray(articles) || articles.length === 0) {
      return 'No GDG articles available at the moment.';
    }

    return articles
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((article: any) => {
        const title = article.title || 'Untitled';
        const description = article.meta?.description || article.description || '';
        return `- ${title}: ${description}`;
      })
      .join('\n');
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    return 'Unable to load articles. Please try again later.';
  }
};

  // Simulate typing animation
  const simulateTyping = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      const typingMsg: Message = {
        role: 'ai',
        text: '',
        timestamp: new Date(),
        isTyping: true,
      };
      
      setTypingMessage(typingMsg);
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          typingMsg.text = text.slice(0, index + 1);
          setTypingMessage({ ...typingMsg });
          index++;
        } else {
          clearInterval(interval);
          setTypingMessage(null);
          resolve();
        }
      }, 30);
    });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages: Message[] = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const articlesText = await fetchArticles();

      const prompt = `
You are an intelligent AI assistant for GDG MAIT (Google Developer Group at Maharaja Agrasen Institute of Technology, Delhi).

You help users with:
- Information about GDG MAIT events, activities, and community
- MAIT college campus, academics, and student life
- How to join or participate in GDG events and programs
- Technical guidance and career advice
- GDG MAIT articles and updates

Here are some helpful articles:
${articlesText}

Guidelines:
- Be friendly, helpful, and enthusiastic about GDG and technology
- Provide specific, actionable information when possible
- If you don't know something, suggest how they can find out more
- Keep responses concise but informative
- Use emojis sparingly but effectively

User's question: "${userMessage.text}"
`;

      const response = await axios.post('/api/chat', {
        message: prompt,
      });

      const reply = response.data.reply || 'Sorry, I couldnt generate any response.';

      // Simulate typing animation
      await simulateTyping(reply);

      const aiMessage: Message = {
        role: 'ai',
        text: reply,
        timestamp: new Date(),
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        role: 'ai',
        text: '❌ Oops! Something went wrong. Please check your connection and try again.',
        timestamp: new Date(),
      };

      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'ai',
        text: '👋 Hi there! I\'m your GDG MAIT assistant. Ask me anything about GDG MAIT, events, MAIT College, or how to get involved!',
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { text: 'Tell me about GDG MAIT', emoji: '🚀' },
    { text: 'Upcoming events', emoji: '📅' },
    { text: 'How to join?', emoji: '👥' },
    { text: 'About MAIT College', emoji: '🏫' },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${className}`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-[380px] rounded-2xl shadow-2xl bg-white border border-gray-200 text-black transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <div className="font-bold text-sm">GDG MAIT Assistant</div>
              <div className="text-xs opacity-90">Always here to help!</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={clearChat}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Clear chat"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      {!isMinimized && (
        <>
          <div className="h-[400px] overflow-y-auto px-4 py-3 space-y-3 text-sm scroll-smooth bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border-2 border-gray-200'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-gray-600" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {typingMessage && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 border-gray-200">
                    <Bot size={16} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <div className="p-3 rounded-2xl bg-white text-gray-800 rounded-bl-md border border-gray-200">
                      {typingMessage.text}
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {loading && !typingMessage && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 border-gray-200">
                    <Bot size={16} className="text-gray-600" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-600 mb-2">Quick actions:</div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(action.text)}
                    className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
                  >
                    {action.emoji} {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center p-3">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 text-sm outline-none bg-gray-100 rounded-full px-4 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;