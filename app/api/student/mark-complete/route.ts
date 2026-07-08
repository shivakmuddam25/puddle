// app/api/student/mark-complete/route.ts
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
    const { studentId, gradeLevel } = await req.json();

    if (!studentId || !gradeLevel) {
      return NextResponse.json({ error: 'Student ID and grade level required' }, { status: 400 });
    }

    // Verify parent has access to this student
    const { data: parentProfile } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId)
      .single();

    if (parentProfile) {
      const { data: relationship } = await supabaseAdmin
        .from('family_relationships')
        .select('id')
        .eq('parent_id', parentProfile.id)
        .eq('student_id', studentId)
        .single();

      if (!relationship) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    }

    // Update subscription to completed
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('course_subscriptions')
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('student_id', studentId)
      .eq('grade_level', gradeLevel)
      .eq('is_active', true)
      .select()
      .single();

    if (subError && subError.code !== 'PGRST116') {
      console.error('Error updating subscription:', subError);
    }

    // Update or create course completion record
    const { data: completion, error: compError } = await supabaseAdmin
      .from('course_completion')
      .upsert({
        student_id: studentId,
        grade_level: gradeLevel,
        subscription_id: subscription?.id,
        progress_percentage: 100,
        completed: true,
        completed_at: new Date().toISOString(),
        manually_completed: true,
        completed_by: decoded.userId,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'student_id,grade_level'
      })
      .select()
      .single();

    if (compError) {
      console.error('Error creating completion record:', compError);
    }

    // Log the completion
    await supabaseAdmin
      .from('access_logs')
      .insert({
        student_id: studentId,
        user_id: decoded.userId,
        action: 'course_completed',
        details: { grade_level: gradeLevel, subscription_id: subscription?.id },
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent')
      });

    return NextResponse.json({
      success: true,
      message: 'Course marked as completed successfully!'
    });

  } catch (error) {
    console.error('Mark complete error:', error);
    return NextResponse.json({ error: 'Failed to mark course as completed' }, { status: 500 });
  }
}