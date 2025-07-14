import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Event } from '@/models/Event';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  const { title, description, date, venue, imageUrl } = await req.json();

  const updated = await Event.findByIdAndUpdate(
    id,
    { title, description, date, venue, imageUrl },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json({ event: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  const deleted = await Event.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Deleted successfully' });
}
