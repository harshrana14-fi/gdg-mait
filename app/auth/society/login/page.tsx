'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock } from 'react-icons/fa';

import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SocietyLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      return alert('⚠️ Please fill in all fields');
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      alert('✅ Logged in successfully!');
      router.push('/dashboard/society');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        alert(`❌ Login failed: ${err.message}`);
      } else {
        alert('❌ Login failed due to unknown error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-purple-100">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">Society Login</h2>
        <p className="text-gray-600 text-center mb-6">
          Access your dashboard to upload, edit and manage society events at MAIT.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded-lg overflow-hidden px-3">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Official Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden px-3">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-800 text-white w-full py-3 rounded-xl text-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Not registered yet?{' '}
          <Link href="/auth/society/register" className="text-purple-600 font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </main>
  );
}
