// app/api/admin/generate-hash/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth-helpers';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }
    
    // Use your existing hashPassword function
    const hashedPassword = await hashPassword(password);
    
    return NextResponse.json({ 
      success: true, 
      password: password,
      hash: hashedPassword 
    });
  } catch (error) {
    console.error('Error generating hash:', error);
    return NextResponse.json({ error: 'Failed to generate hash' }, { status: 500 });
  }
}