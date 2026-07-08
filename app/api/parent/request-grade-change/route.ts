// app/api/parent/request-grade-change/route.ts
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
    const { studentId, fromGrade, toGrade, reason } = await req.json();

    if (!studentId || !fromGrade || !toGrade) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Verify relationship
    const { data: relationship, error: relError } = await supabaseAdmin
      .from('family_relationships')
      .select('id')
      .eq('parent_id', parentProfile.id)
      .eq('student_id', studentId)
      .single();

    if (relError || !relationship) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get student info
    const { data: student } = await supabaseAdmin
      .from('student_profiles')
      .select('users(email, display_name)')
      .eq('id', studentId)
      .single();

    // Check if student already has an active subscription for the new grade
    const { data: existingSubscription } = await supabaseAdmin
      .from('course_subscriptions')
      .select('id')
      .eq('student_id', studentId)
      .eq('grade_level', toGrade)
      .eq('is_active', true)
      .single();

    if (existingSubscription) {
      return NextResponse.json({
        error: 'Student already has an active subscription for grade ' + toGrade
      }, { status: 400 });
    }

    // Create grade change request
    const { data: request, error: requestError } = await supabaseAdmin
      .from('grade_change_requests')
      .insert({
        student_id: studentId,
        parent_id: parentProfile.id,
        from_grade_level: fromGrade,
        to_grade_level: toGrade,
        reason: reason || null,
        status: 'pending',
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent')
      })
      .select()
      .single();

    if (requestError) {
      console.error('Grade change request error:', requestError);
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }

    // Log the request
    await supabaseAdmin
      .from('access_logs')
      .insert({
        student_id: studentId,
        user_id: decoded.userId,
        action: 'grade_change_request',
        details: {
          request_id: request.id,
          from_grade: fromGrade,
          to_grade: toGrade,
          reason: reason
        },
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent')
      });

    return NextResponse.json({
      success: true,
      requestId: request.id,
      message: 'Grade change request submitted successfully. Support will review and contact you within 2-3 business days.'
    });

  } catch (error) {
    console.error('Grade change request error:', error);
    return NextResponse.json({ error: 'Failed to submit grade change request' }, { status: 500 });
  }
}