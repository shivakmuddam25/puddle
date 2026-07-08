// app/api/admin/reactivate-student/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { studentId, subscriptionId } = await req.json();

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }

    // Get subscription details
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single();

    if (subError || !subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    // Reactivate the subscription
    await supabaseAdmin
      .from('course_subscriptions')
      .update({ 
        is_active: true,
        deactivated_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriptionId);

    // Reactivate student profile
    await supabaseAdmin
      .from('student_profiles')
      .update({ 
        is_active: true,
        subscription_status: 'active',
        subscription_id: subscriptionId,
        updated_at: new Date().toISOString()
      })
      .eq('id', studentId);

    // Get user_id and reactivate user
    const { data: studentProfile } = await supabaseAdmin
      .from('student_profiles')
      .select('user_id')
      .eq('id', studentId)
      .single();

    if (studentProfile) {
      await supabaseAdmin
        .from('users')
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq('id', studentProfile.user_id);
    }

    // Log reactivation
    await supabaseAdmin
      .from('access_logs')
      .insert({
        student_id: studentId,
        user_id: decoded.userId,
        action: 'subscription_reactivated',
        details: {
          subscription_id: subscriptionId,
          previous_end_date: subscription.end_date
        },
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent')
      });

    return NextResponse.json({
      success: true,
      message: 'Student reactivated successfully',
      subscription: {
        id: subscription.id,
        end_date: subscription.end_date
      }
    });

  } catch (error) {
    console.error('Reactivation error:', error);
    return NextResponse.json({ error: 'Failed to reactivate student' }, { status: 500 });
  }
}