import clientPromise from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET() {
  try {
    const prompt = `
You are helping create structured JSON data for the GDG MAIT (Google Developer Group at Maharaja Agrasen Institute of Technology) platform.

Please return the following in **valid JSON only**:

{
  "categories": [
    {
      "category": "Events",
      "articles": [
        {
          "title": "Hack the Future 2025",
          "slug": "hack-the-future-2025",
          "meta": { "description": "24-hour Hackathon hosted by GDG MAIT" },
          "media": { "images": ["https://gdgmait.vercel.app/images/hackathon.jpg"] },
          "content": "Join us for an intense 24-hour hackathon focused on solving real-world problems using AI, Web, and Mobile development."
        }
      ]
    },
    {
      "category": "Getting Started",
      "articles": [
        {
          "title": "What is GDG MAIT?",
          "slug": "what-is-gdg-mait",
          "meta": { "description": "Learn about our mission and how to join." },
          "media": { "images": ["https://gdgmait.vercel.app/images/gdg-banner.jpg"] },
          "content": "GDG MAIT is a Google Developer Group community that hosts tech events, workshops, and hackathons to help students grow technically and professionally."
        }
      ]
    }
  ]
}
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log('RAW RESPONSE:\n', text);
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON object found in Gemini response');
    }

    const json = JSON.parse(jsonMatch[0]);
    console.log('PARSED JSON:\n', JSON.stringify(json, null, 2));

    const client = await clientPromise;
    const db = client.db('gdgmait');
    const collection = db.collection('articles');

    for (const category of json.categories) {
      for (const article of category.articles) {
        await collection.updateOne(
          { slug: article.slug },
          {
            $set: {
              ...article,
              category: category.category,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
      }
    }

    return NextResponse.json(json);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Gemini failed:', err);
    return NextResponse.json(
      { error: 'Gemini failed', details: err.message },
      { status: 500 }
    );
  }
}
