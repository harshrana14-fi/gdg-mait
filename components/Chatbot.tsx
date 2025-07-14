'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: '👋 Hi there! Ask me anything about GDG MAIT, events, or MAIT College.',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch articles from your MongoDB collection via API route
  const fetchArticles = async (): Promise<string> => {
    try {
      const res = await fetch('/api/gdg/articles');
      const articles = await res.json();

      if (!articles || articles.length === 0) return 'No GDG articles available.';

      return articles
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((a: any) => `- ${a.title}: ${a.meta?.description || ''}`)
        .join('\n');
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      return 'Unable to load articles.';
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages: Message[] = [...messages, { role: 'user', text: input }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const articlesText = await fetchArticles();

    const prompt = `
You are an intelligent AI assistant for GDG MAIT (Google Developer Group at Maharaja Agrasen Institute of Technology, Delhi).

You help users with:
- Information about GDG MAIT
- MAIT college campus and academics
- How to join or participate in GDG events
- GDG MAIT articles and updates

Here are some helpful articles:
${articlesText}

Now, answer the user's question:
"${input}"
`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const reply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I couldn’t generate a proper response.';

      setMessages([...updatedMessages, { role: 'ai', text: reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...updatedMessages,
        { role: 'ai', text: '❌ Oops! Something went wrong while contacting Gemini.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[340px] rounded-2xl shadow-xl bg-white border border-gray-300 text-black">
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-2xl font-bold text-sm">
        💬 GDG MAIT Chatbot
      </div>

      <div className="h-[300px] overflow-y-auto px-4 py-3 space-y-3 text-sm scroll-smooth">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[85%] ${
              msg.role === 'user'
                ? 'bg-blue-100 ml-auto text-right'
                : 'bg-gray-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-xs text-gray-400 italic">Typing...</div>}
      </div>

      <div className="flex border-t border-gray-200">
        <input
          type="text"
          placeholder="Ask something..."
          className="flex-1 p-2 text-sm outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
