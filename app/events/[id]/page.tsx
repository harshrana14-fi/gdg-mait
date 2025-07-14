import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import EventCertificateCard from '@/components/EventCertificateCard';

interface EventPageProps {
  params: {
    id: string;
  };
}

interface EventType {
  title: string;
  banner: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default async function EventPage({ params }: EventPageProps) {
  const docRef = doc(db, 'events', params.id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return notFound();

  const event = snapshot.data();

  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full rounded-lg h-64 object-cover mb-6"
        />
        <h1 className="text-4xl font-bold text-blue-800 mb-4">{event.title}</h1>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {event.date}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Time:</strong> {event.time}</p>
        <p className="text-sm text-gray-600 mb-6"><strong>Venue:</strong> {event.venue}</p>

        {/* ✅ Fix: Explicitly cast to EventType */}
        <EventCertificateCard event={event as EventType} />
      </div>
    </main>
  );
}
