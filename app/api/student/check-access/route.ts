// app/api/student/check-access/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const studentId = decoded.userId;
    const { gradeLevel } = await req.json();

    if (!gradeLevel) {
      return NextResponse.json({ error: 'Grade level required' }, { status: 400 });
    }

    // Check access using the database function
    const { data, error } = await supabaseAdmin
      .rpc('check_student_access', {
        p_student_id: studentId,
        p_grade_level: gradeLevel
      });

    if (error) throw error;

    // Log access attempt
    await supabaseAdmin
      .from('access_logs')
      .insert({
        student_id: studentId,
        action: 'grade_access_check',
        details: { grade_level: gradeLevel, has_access: data },
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent')
      });

    return NextResponse.json({ 
      hasAccess: data,
      gradeLevel,
      message: data ? 'Access granted' : 'No active subscription or free trial'
    });

  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ error: 'Failed to check access' }, { status: 500 });
  }
}