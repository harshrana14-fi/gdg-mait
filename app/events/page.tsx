'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface EventData {
  id: string;
  title: string;
  date: string;
  venue: string;
  banner: string;
}

const sampleEvents: EventData[] = [
  {
    id: '1',
    title: 'TechFest 2025',
    date: '2025-08-15',
    venue: 'Main Auditorium, MAIT',
    banner: '/images/techfest-banner.png',
  },
  {
    id: '2',
    title: 'Design Day',
    date: '2025-09-01',
    venue: 'Block D, Seminar Hall',
    banner: '/images/uiux-day.png',
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    setEvents(sampleEvents); // Later: fetch from Firebase
  }, []);

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-white to-blue-50">
      <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">Explore Upcoming Events</h1>
      <p className="text-center text-gray-600 mb-12">
        Discover tech talks, hackathons, design jams and more happening at MAIT!
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition"
          >
            <img src={event.banner} alt={event.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-bold text-blue-900">{event.title}</h2>
              <div className="flex items-center text-gray-500 text-sm mt-2 gap-3">
                <FaRegCalendarAlt /> <span>{event.date}</span>
                <FaMapMarkerAlt /> <span>{event.venue}</span>
              </div>
              <p className="mt-3 text-blue-700 font-semibold">View Details →</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
