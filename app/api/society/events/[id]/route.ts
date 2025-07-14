import { connectDB } from '@/lib/mongoose';
import { Event } from '@/models/Event';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { title, description, date, venue, imageUrl } = await req.json();

  const updated = await Event.findByIdAndUpdate(
    params.id,
    { title, description, date, venue, imageUrl },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json({ event: updated });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await Event.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Deleted successfully' });
}
