import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { comparePasswords } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await Student.findOne({ email });
  if (!user || !(await comparePasswords(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ user: { name: user.name, email: user.email } });
}
