import { NextRequest } from 'next/server';

// Define the expected context type
type Context = {
  params: {
    id: string;
  };
};

// PUT handler for updating an event by ID
export async function PUT(req: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    const body = await req.json();

    // Example update logic (replace with your actual DB or logic)
    // For now, just echoing back what was received
    return new Response(
      JSON.stringify({
        message: `Successfully updated event with ID ${id}`,
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
        message: 'Failed to update event',
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
