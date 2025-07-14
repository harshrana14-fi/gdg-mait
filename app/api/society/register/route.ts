import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Society } from '@/models/Society';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    await connectDB();

    const existing = await Society.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Society already exists.' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const society = await Society.create({ name, email, password: hashedPassword });

    return NextResponse.json({
      user: { name: society.name, email: society.email },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
