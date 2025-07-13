// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center px-6 lg:px-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            MAIT Developers Platform
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            One place to explore, organize and participate in every tech, cultural and academic event happening at Maharaja Agrasen Institute of Technology.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link href="/auth/student/register">
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300">
                Join as Student
              </button>
            </Link>
            <Link href="/auth/society/register">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 border">
                Register Your Society
              </button>
            </Link>
          </div>
        </div>

        {/* Background image / illustration */}
        <Image
          src="/images/hero-illustration.png"
          alt="hero background"
          width={600}
          height={600}
          className="absolute bottom-0 right-10 hidden md:block"
        />
      </section>

      {/* Features / About Section */}
      <section className="py-24 bg-white px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Why MAIT Developers Platform?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A single hub for students and societies to grow together through impactful events and seamless participation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Centralized Events',
              desc: 'No more scattered promotions – find all upcoming and past events from all societies in one place.',
              icon: '📅',
            },
            {
              title: 'Society Tools',
              desc: 'Societies can create, publish, manage and view analytics of their events via a dedicated dashboard.',
              icon: '🏛️',
            },
            {
              title: 'Instant Registration',
              desc: 'Students can register for events in a click, save them to profile, and get participation reminders.',
              icon: '🚀',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Let’s Build MAIT’s Developer Community Together!</h2>
        <p className="max-w-2xl mx-auto text-lg">
          Whether you’re part of a tech society, cultural club or just a curious student – join us and power up your campus experience.
        </p>
        <div className="mt-8">
          <Link href="/auth/student/register">
            <button className="bg-white text-blue-800 font-bold py-3 px-6 rounded-xl hover:scale-105 transition">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
