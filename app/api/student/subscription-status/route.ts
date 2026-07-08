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
    const checkGrade = searchParams.get('gradeLevel');

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }

    // Verify access - check if user has permission to view this student
    if (decoded.role !== 'admin') {
      // Check if user is a parent with access to this student
      const { data: parentProfile, error: parentError } = await supabaseAdmin
        .from('parent_profiles')
        .select('id')
        .eq('user_id', decoded.userId)
        .single();

      if (!parentError && parentProfile) {
        const { data: relationship, error: relError } = await supabaseAdmin
          .from('family_relationships')
          .select('id')
          .eq('parent_id', parentProfile.id)
          .eq('student_id', studentId)
          .single();

        if (relError || !relationship) {
          return NextResponse.json({ error: 'Unauthorized - No access to this student' }, { status: 403 });
        }
      } else {
        // If not a parent, check if it's the student themselves
        const { data: studentProfile, error: studentError } = await supabaseAdmin
          .from('student_profiles')
          .select('user_id')
          .eq('id', studentId)
          .single();

        if (studentError || !studentProfile) {
          return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        if (studentProfile.user_id !== decoded.userId) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }
      }
    }

    // Get student profile to check current grade
    const { data: studentProfile, error: profileError } = await supabaseAdmin
      .from('student_profiles')
      .select('grade_level, subscription_status, is_active, user_id')
      .eq('id', studentId)
      .single();

    if (profileError || !studentProfile) {
      console.error('Student profile error:', profileError);
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const dec31 = new Date(currentYear, 11, 31);
    const isFreeTrialAvailable = now <= dec31;

    // Get all active subscriptions for this student
    const { data: subscriptions, error: subError } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*')
      .eq('student_id', studentId)
      .eq('is_active', true)
      .gte('end_date', now.toISOString())
      .order('created_at', { ascending: false });

    if (subError) {
      console.error('Subscription fetch error:', subError);
    }

    // Get free trial if available
    let freeTrial = null;
    if (isFreeTrialAvailable) {
      const { data: trial, error: trialError } = await supabaseAdmin
        .from('free_trial_enrollments')
        .select('*')
        .eq('student_id', studentId)
        .eq('is_active', true)
        .gte('end_date', now.toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (!trialError && trial) {
        freeTrial = trial;
      }
    }

    // Check if student has ever had a free trial
    const { data: pastFreeTrial, error: pastTrialError } = await supabaseAdmin
      .from('free_trial_enrollments')
      .select('id')
      .eq('student_id', studentId)
      .limit(1)
      .maybeSingle();

    const freeTrialUsed = pastFreeTrial !== null;

    // Build active grades list from subscriptions
    const activeGrades = (subscriptions || []).map(sub => ({
      gradeLevel: sub.grade_level,
      subscriptionId: sub.id,
      endDate: sub.end_date,
      startDate: sub.start_date,
      billingCycle: sub.billing_cycle,
      paymentId: sub.payment_id,
      autoRenew: sub.auto_renew
    }));

    // Add free trial to active grades if it exists
    if (freeTrial) {
      activeGrades.push({
        gradeLevel: freeTrial.grade_level,
        subscriptionId: freeTrial.id,
        endDate: freeTrial.end_date,
        startDate: freeTrial.start_date,
        billingCycle: 'free_trial',
        paymentId: null,
        autoRenew: false
      });
    }

    // Check if there's an active subscription for the requested grade
    let hasSubscriptionForRequestedGrade = false;
    let requestedGradeSubscription = null;
    
    if (checkGrade) {
      const targetGrade = parseInt(checkGrade);
      hasSubscriptionForRequestedGrade = activeGrades.some(
        g => g.gradeLevel === targetGrade && g.billingCycle !== 'free_trial'
      );
      requestedGradeSubscription = activeGrades.find(
        g => g.gradeLevel === targetGrade
      );
    }

    // Check if the requested grade matches the student's current grade
    const isGradeChanged = checkGrade && studentProfile && 
      parseInt(checkGrade) !== studentProfile.grade_level;

    // Determine overall access status
    let hasAccess = false;
    let reason = null;
    let isFreeTrialActive = false;
    let freeTrialEndDate = null;

    // Check free trial first
    if (freeTrial && checkGrade) {
      const targetGrade = parseInt(checkGrade);
      if (freeTrial.grade_level === targetGrade) {
        hasAccess = true;
        isFreeTrialActive = true;
        freeTrialEndDate = freeTrial.end_date;
      }
    }

    // Check subscription for specific grade
    if (!hasAccess && checkGrade) {
      if (hasSubscriptionForRequestedGrade) {
        hasAccess = true;
        isFreeTrialActive = false;
      } else if (isGradeChanged) {
        hasAccess = false;
        reason = 'grade_changed';
      } else {
        hasAccess = false;
        reason = 'no_subscription';
      }
    } else if (!checkGrade) {
      // Overall access (any active subscription)
      hasAccess = activeGrades.length > 0;
    }

    // Get the most recent subscription end date (for backward compatibility)
    const latestSubscription = subscriptions && subscriptions.length > 0 ? subscriptions[0] : null;

    // Build response
    const response = {
      success: true,
      hasAccess,
      reason,
      isGradeChanged: isGradeChanged || false,
      isFreeTrial: isFreeTrialActive,
      freeTrialEndDate,
      freeTrialUsed,
      subscriptionEndDate: latestSubscription?.end_date || null,
      studentCurrentGrade: studentProfile.grade_level,
      requestedGrade: checkGrade ? parseInt(checkGrade) : null,
      activeGrades: activeGrades,
      activeSubscriptions: subscriptions || [],
      totalActiveGrades: activeGrades.length,
      hasSubscriptionForRequestedGrade,
      requestedGradeSubscription,
      studentProfile: {
        isActive: studentProfile.is_active,
        subscriptionStatus: studentProfile.subscription_status
      },
      timestamp: now.toISOString()
    };

    console.log('Subscription status response:', {
      studentId,
      checkGrade,
      hasAccess,
      activeGradesCount: activeGrades.length,
      isGradeChanged
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('Subscription status error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get subscription status',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}