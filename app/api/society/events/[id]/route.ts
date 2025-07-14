import { NextRequest, NextResponse } from 'next/server';

// Example GET handler — safe to leave or remove if unused
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  // Example response — you can replace this with actual logic
  return NextResponse.json({
    message: `Fetching event with ID: ${id}`,
  });
}
