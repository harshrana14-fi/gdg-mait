'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaImage, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function UploadEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
  });

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerFile) return alert('Please upload a banner image.');

    setUploading(true);

    try {
      // 1. Upload banner to Firebase Storage
      const bannerRef = ref(storage, `banners/${Date.now()}_${bannerFile.name}`);
      await uploadBytes(bannerRef, bannerFile);
      const bannerURL = await getDownloadURL(bannerRef);

      // 2. Store event data in Firestore
      await addDoc(collection(db, 'events'), {
        ...formData,
        banner: bannerURL,
        createdAt: Timestamp.now(),
      });

      alert('✅ Event uploaded successfully!');
      router.push('/dashboard/society');
    } catch (err) {
      console.error('Error uploading event:', err);
      alert('❌ Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-purple-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl p-10 rounded-3xl border border-purple-100">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Upload New Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. HackMAIT 2025"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ring-purple-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Event Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your event, agenda, prizes, etc."
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ring-purple-300 resize-none"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 flex items-center gap-2">
                <FaCalendarAlt /> Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ring-purple-300"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 flex items-center gap-2">
                <FaClock /> Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ring-purple-300"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block font-semibold mb-1 flex items-center gap-2">
              <FaMapMarkerAlt /> Venue
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g. Seminar Hall, Block D"
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 ring-purple-300"
            />
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block font-semibold mb-1 flex items-center gap-2">
              <FaImage /> Event Banner
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Preview"
                className="mt-4 rounded-lg shadow w-full max-h-64 object-cover"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl text-lg font-semibold w-full disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Submit Event'}
          </button>
        </form>
      </div>
    </main>
  );
}
