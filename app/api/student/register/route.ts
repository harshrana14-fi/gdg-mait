import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  await connectDB();

  const existing = await Student.findOne({ email });
  if (existing) return NextResponse.json({ error: 'User exists' }, { status: 400 });

  const hashedPassword = await hashPassword(password);
  const user = await Student.create({ name, email, password: hashedPassword });

  return NextResponse.json({ user: { name: user.name, email: user.email } });
}
