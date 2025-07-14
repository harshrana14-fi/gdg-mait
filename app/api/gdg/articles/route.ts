// app/api/gdg/articles/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for testing - replace with your actual database query
    const mockArticles = [
      {
        title: 'Getting Started with GDG MAIT',
        meta: {
          description: 'Learn about Google Developer Group at MAIT and how to get involved in our community.'
        }
      },
      {
        title: 'Upcoming Tech Events at MAIT',
        meta: {
          description: 'Join us for workshops, hackathons, and developer meetups throughout the semester.'
        }
      },
      {
        title: 'Student Life at MAIT College',
        meta: {
          description: 'Discover campus facilities, clubs, and academic programs at Maharaja Agrasen Institute of Technology.'
        }
      }
    ];

    return NextResponse.json(mockArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}