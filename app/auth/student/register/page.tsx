'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function StudentRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState({
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

    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      return alert('⚠️ Please fill all fields');
    }

    try {
      setLoading(true);

      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Add student data to Firestore
      await addDoc(collection(db, 'students'), {
        uid: user.uid,
        fullName,
        email,
        createdAt: Timestamp.now(),
      });

      alert('✅ Student registered successfully!');
      router.push('/dashboard/student');
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Student Registration</h2>
        <p className="text-gray-600 text-center mb-6">
          Join the MAIT Developers Platform to explore and participate in exclusive college events.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded-lg overflow-hidden px-3">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
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
              placeholder="Email (College ID preferred)"
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
            className="bg-blue-700 hover:bg-blue-800 text-white w-full py-3 rounded-xl text-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register as Student'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/student/login" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
