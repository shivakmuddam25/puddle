import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    if (decoded.role !== 'student') {
      return NextResponse.json(
        { error: 'Forbidden - Student access required' },
        { status: 403 }
      );
    }

    // Mock data - replace with actual database query
    const mockCourses = [
      {
        id: '1',
        name: 'Mathematics - Grade 10',
        description: 'Complete mathematics course for grade 10 students',
        progress: 75,
        next_lesson: 'Algebra Basics',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Physics - JEE Preparation',
        description: 'Advanced physics concepts for JEE aspirants',
        progress: 60,
        next_lesson: 'Optics',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Chemistry',
        description: 'Comprehensive chemistry course',
        progress: 45,
        next_lesson: 'Organic Chemistry',
        created_at: new Date().toISOString()
      }
    ];

    return NextResponse.json({
      success: true,
      courses: mockCourses
    });
  } catch (error: any) {
    console.error('Error in GET /api/student/courses:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}