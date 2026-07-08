// app/api/student/subscription-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }

    // Verify parent has access to this student (if not admin)
    if (decoded.role !== 'admin') {
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
    }

    // First, run the expired subscriptions check
    await supabaseAdmin.rpc('check_and_update_expired_subscriptions');

    const now = new Date();
    const currentYear = now.getFullYear();
    const dec31 = new Date(currentYear, 11, 31);

    // Check for active subscription
    const { data: subscription } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*')
      .eq('student_id', studentId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (subscription && new Date(subscription.end_date) >= now && !subscription.completed) {
      // Update last access check
      await supabaseAdmin
        .from('student_profiles')
        .update({ last_access_check: now.toISOString() })
        .eq('id', studentId);
      
      return NextResponse.json({
        hasAccess: true,
        isFreeTrial: false,
        subscriptionType: subscription.billing_cycle,
        subscriptionEndDate: subscription.end_date,
        gradeLevel: subscription.grade_level,
        completed: subscription.completed,
        isActive: true
      });
    }

    // Check for free trial (only before Dec 31)
    if (now <= dec31) {
      const { data: freeTrial } = await supabaseAdmin
        .from('free_trial_enrollments')
        .select('*')
        .eq('student_id', studentId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (freeTrial && new Date(freeTrial.end_date) >= now) {
        // Check if free trial was already used (expired previously)
        const { data: usedTrial } = await supabaseAdmin
          .from('free_trial_enrollments')
          .select('id')
          .eq('student_id', studentId)
          .eq('grade_level', freeTrial.grade_level)
          .lt('end_date', now)
          .limit(1);
        
        const freeTrialUsed = usedTrial && usedTrial.length > 0;
        
        return NextResponse.json({
          hasAccess: true,
          isFreeTrial: true,
          freeTrialEndDate: freeTrial.end_date,
          gradeLevel: freeTrial.grade_level,
          daysLeft: Math.ceil((new Date(freeTrial.end_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
          freeTrialUsed: freeTrialUsed
        });
      }
    }

    // Check if student has ever had a subscription (for tracking)
    const { data: pastSubscription } = await supabaseAdmin
      .from('course_subscriptions')
      .select('id')
      .eq('student_id', studentId)
      .limit(1)
      .single();

    // Check if free trial was ever used
    const { data: pastFreeTrial } = await supabaseAdmin
      .from('free_trial_enrollments')
      .select('id')
      .eq('student_id', studentId)
      .limit(1)
      .single();

    return NextResponse.json({
      hasAccess: false,
      isFreeTrial: false,
      freeTrialUsed: pastFreeTrial !== null,
      hadSubscription: pastSubscription !== null,
      message: 'No active subscription or free trial'
    });

  } catch (error) {
    console.error('Subscription status error:', error);
    return NextResponse.json({ error: 'Failed to get subscription status' }, { status: 500 });
  }
}