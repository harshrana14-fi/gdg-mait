// models/Event.ts

import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  venue: String,
  imageUrl: String,
  createdBy: String,
});

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
