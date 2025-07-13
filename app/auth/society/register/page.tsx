'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaUniversity } from 'react-icons/fa';

import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function SocietyRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    societyName: '',
    fullName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { societyName, fullName, email, password } = formData;
    if (!societyName || !fullName || !email || !password) {
      return alert('⚠️ Please fill all fields');
    }

    try {
      setLoading(true);

      // 1. Register user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Store society profile
      await addDoc(collection(db, 'societies'), {
        uid: user.uid,
        societyName,
        fullName,
        email,
        createdAt: Timestamp.now(),
      });

      alert('✅ Society registered successfully!');
      router.push('/dashboard/society');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        alert(`❌ Registration failed: ${err.message}`);
      } else {
        alert('❌ Registration failed due to unknown error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-purple-100">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">Society Registration</h2>
        <p className="text-gray-600 text-center mb-6">
          Register your MAIT society to publish events and engage the campus community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded-lg overflow-hidden px-3">
            <FaUniversity className="text-gray-400 mr-2" />
            <input
              type="text"
              name="societyName"
              placeholder="Society Name (e.g., GDSC MAIT)"
              value={formData.societyName}
              onChange={handleChange}
              className="w-full py-3 outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden px-3">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="fullName"
              placeholder="Coordinator Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full py-3 outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden px-3">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Official Society Email"
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
              placeholder="Create Password"
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
            {loading ? 'Registering...' : 'Register Society'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already registered?{' '}
          <Link href="/auth/society/login" className="text-purple-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
