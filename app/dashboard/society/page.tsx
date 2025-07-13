'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPlus, FaUserFriends, FaRegCalendarAlt } from 'react-icons/fa';

// Define type for event
interface SocietyEvent {
  id: string;
  title: string;
  date: string;
  participants: number;
  banner: string;
}

// Dummy placeholder events
const mockEvents: SocietyEvent[] = [
  {
    id: '1',
    title: 'HackMAIT 2025',
    date: 'Aug 20, 2025',
    participants: 150,
    banner: '/images/hackmait-banner.png',
  },
  {
    id: '2',
    title: 'AI in Future Tech',
    date: 'Sep 5, 2025',
    participants: 90,
    banner: '/images/ai-tech-talk.png',
  },
];

export default function SocietyDashboard() {
  const [events, setEvents] = useState<SocietyEvent[]>([]);

  useEffect(() => {
    // In real app, fetch from backend
    setEvents(mockEvents);
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Welcome to Your Society Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Manage your upcoming and past events, track participation, and showcase your society’s presence at MAIT.
        </p>
      </header>

      {/* Upload Button */}
      <div className="mb-8">
        <Link href="/events/upload">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl text-md font-semibold flex items-center gap-2 transition">
            <FaPlus /> Create New Event
          </button>
        </Link>
      </div>

      {/* Events Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Your Published Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition"
            >
              <img
                src={event.banner}
                alt={event.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserFriends />
                    <span>{event.participants} participants</span>
                  </div>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-block mt-4 text-blue-700 font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
