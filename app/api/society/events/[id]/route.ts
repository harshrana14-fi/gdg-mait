import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const body = await req.json();

    // Do your event update logic here (e.g., DB call)
    // For now, we're just returning the received data
    return new Response(
      JSON.stringify({
        message: `Successfully updated event with ID: ${id}`,
        data: body,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Failed to update event.',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
