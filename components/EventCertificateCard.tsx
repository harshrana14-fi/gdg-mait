'use client';

import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface EventType {
  title: string;
  banner: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function EventCertificateCard({ event }: { event: EventType }) {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <div className="mt-6 bg-yellow-100 p-4 rounded-lg text-center text-yellow-800">
        Please log in to download your participation certificate.
      </div>
    );
  }

  const userName = user.displayName || 'Participant';

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          event: event.title,
        }),
      });

      if (!res.ok) {
        alert('Failed to generate certificate.');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${userName}-certificate.pdf`;
      a.click();
    } catch (err) {
      console.error(err);
      alert('Error generating certificate.');
    } finally {
      setLoading(false);
    }
  };

  if (event.status !== 'completed') return null;

  return (
    <div className="mt-6 bg-blue-50 p-6 rounded-xl text-center border border-blue-200">
      <p className="text-lg font-medium text-blue-800 mb-4">
        🎉 This event has ended. Download your certificate below!
      </p>
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`bg-blue-600 text-white px-6 py-3 rounded-lg transition ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        {loading ? 'Generating...' : '🎓 Download Certificate'}
      </button>
    </div>
  );
}
