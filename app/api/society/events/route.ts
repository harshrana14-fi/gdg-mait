// app/api/society/events/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Event } from '@/models/Event';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, date, venue, imageUrl, createdBy } = body;

    const newEvent = await Event.create({
      title,
      description,
      date,
      venue,
      imageUrl,
      createdBy,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
