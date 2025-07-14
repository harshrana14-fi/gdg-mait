import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a friendly assistant for GDG MAIT (Google Developer Group at Maharaja Agrasen Institute of Technology, Delhi).
Help users with:
- What GDG MAIT is
- How to join GDG MAIT
- Upcoming tech events or hackathons
- Info about MAIT college

User's question:
"${userMessage}"
`;

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1024,
      },
    });

    const text = result.response.text();

    return NextResponse.json({ reply: text });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Gemini route error:', error);
    return NextResponse.json(
      { error: 'Gemini API error', details: error.message },
      { status: 500 }
    );
  }
}
