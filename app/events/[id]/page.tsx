'use client';

import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import React from 'react';

// Define the event type
interface EventType {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  banner: string;
}

// Mock event data
const mockEventData: Record<string, EventType> = {
  '1': {
    title: 'TechFest 2025',
    description: 'Join the biggest technical event of MAIT! Featuring hackathons, speaker sessions, and coding battles.',
    date: '2025-08-15',
    time: '10:00 AM',
    venue: 'Main Auditorium, MAIT',
    banner: '/images/techfest-banner.png',
  },
  '2': {
    title: 'Design Day',
    description: 'A showcase of creativity. Presentations, workshops and live UI/UX critiques.',
    date: '2025-09-01',
    time: '2:00 PM',
    venue: 'Block D, Seminar Hall',
    banner: '/images/uiux-day.png',
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
  const event = mockEventData[eventId as string];

  if (!event) {
    return <div className="p-10 text-red-500 text-xl">Event not found.</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
        <img src={event.banner} alt={event.title} className="w-full h-72 object-cover" />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">{event.title}</h1>
          <div className="flex flex-col sm:flex-row gap-4 text-gray-600 text-sm mb-6">
            <div className="flex items-center gap-2">
              <FaCalendarAlt /> <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock /> <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> <span>{event.venue}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{event.description}</p>

          <button
            onClick={() => alert('✅ You have been registered!')}
            className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl text-lg font-semibold"
          >
            Register for this Event
          </button>
        </div>
      </div>
    </main>
  );
}
