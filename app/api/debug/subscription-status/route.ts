// app/api/debug/subscription-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');
    
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }
    
    // Get all subscriptions for this student
    const { data: subscriptions, error } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    // Get student profile
    const { data: studentProfile } = await supabaseAdmin
      .from('student_profiles')
      .select('*')
      .eq('id', studentId)
      .single();
    
    // Get payments for this student
    const { data: payments } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('payment_date', { ascending: false });
    
    return NextResponse.json({
      studentId,
      studentProfile,
      subscriptions: subscriptions || [],
      payments: payments || [],
      subscriptionCount: subscriptions?.length || 0
    });
    
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}