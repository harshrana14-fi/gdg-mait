import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('gdgmait'); // change if your DB name is different
    const collection = db.collection('articles');

    const articles = await collection
      .find({})
      .sort({ updatedAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      articles.map(({ _id, ...rest }) => rest) // remove _id if not needed
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', details: error.message },
      { status: 500 }
    );
  }
}
