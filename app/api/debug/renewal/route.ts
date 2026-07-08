// app/api/debug/renewal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    const gradeLevel = searchParams.get('gradeLevel');
    
    if (!studentId || !gradeLevel) {
      return NextResponse.json({ error: 'Student ID and grade level required' }, { status: 400 });
    }
    
    // Get active subscriptions
    const { data: activeSubscriptions } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*')
      .eq('student_id', studentId)
      .eq('grade_level', parseInt(gradeLevel))
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    // Get all subscriptions
    const { data: allSubscriptions } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*')
      .eq('student_id', studentId)
      .eq('grade_level', parseInt(gradeLevel))
      .order('created_at', { ascending: false });
    
    // Get student profile
    const { data: studentProfile } = await supabaseAdmin
      .from('student_profiles')
      .select('*')
      .eq('id', studentId)
      .single();
    
    // Get recent payments
    const { data: recentPayments } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('payment_date', { ascending: false })
      .limit(5);
    
    return NextResponse.json({
      studentId,
      gradeLevel,
      activeSubscriptions: activeSubscriptions || [],
      allSubscriptions: allSubscriptions || [],
      studentProfile,
      recentPayments,
      activeCount: activeSubscriptions?.length || 0,
      totalCount: allSubscriptions?.length || 0
    });
    
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}