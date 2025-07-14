'use client';

import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) return <p>Loading...</p>;

  return <h1 className="text-xl">Welcome, {user.name}</h1>;
}
