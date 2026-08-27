// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== hashPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '30d',
    });

    return NextResponse.json(
      { success: true, token, userId: user.id, email: user.email },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}