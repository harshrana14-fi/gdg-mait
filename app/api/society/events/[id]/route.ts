import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Event } from '@/models/Event';

/**
 * Update an event by ID
 */
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = context.params;
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
  } catch (error) {
    console.error('[PUT /api/society/events/:id]', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

/**
 * Delete an event by ID
 */
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = context.params;
    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/society/events/:id]', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
