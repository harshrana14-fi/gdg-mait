import { connectDB } from '@/lib/mongoose';
import { Event } from '@/models/Event';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await connectDB();
  const createdBy = req.nextUrl.searchParams.get('createdBy');
  if (!createdBy) {
    return NextResponse.json({ error: 'Missing society email' }, { status: 400 });
  }

  const events = await Event.find({ createdBy }).sort({ date: -1 });
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { title, description, date, venue, imageUrl, createdBy } = await req.json();

  if (!title || !description || !date || !venue || !createdBy) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const event = await Event.create({ title, description, date, venue, imageUrl, createdBy });
  return NextResponse.json({ event }, { status: 201 });
}
