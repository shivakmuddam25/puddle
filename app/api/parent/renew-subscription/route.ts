// app/api/parent/renew-subscription/route.ts
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
    const { subscriptionId, billingCycle } = await req.json();

    if (!subscriptionId || !billingCycle) {
      return NextResponse.json({ error: 'Subscription ID and billing cycle required' }, { status: 400 });
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

    // Get subscription details
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*, student_profiles!inner(*)')
      .eq('id', subscriptionId)
      .single();

    if (subError || !subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    // Verify parent has access to this student
    const { data: relationship } = await supabaseAdmin
      .from('family_relationships')
      .select('id')
      .eq('parent_id', parentProfile.id)
      .eq('student_id', subscription.student_id)
      .single();

    if (!relationship) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Calculate new end date
    const now = new Date();
    const currentEndDate = new Date(subscription.end_date);
    const startFrom = currentEndDate > now ? currentEndDate : now;
    const newEndDate = new Date(startFrom);
    
    if (billingCycle === 'monthly') {
      newEndDate.setMonth(newEndDate.getMonth() + 1);
    } else {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
    }

    // Update subscription
    const { data: updatedSubscription, error: updateError } = await supabaseAdmin
      .from('course_subscriptions')
      .update({
        end_date: newEndDate.toISOString(),
        updated_at: now.toISOString(),
        auto_renew: true
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (updateError) {
      console.error('Renewal error:', updateError);
      return NextResponse.json({ error: 'Failed to renew subscription' }, { status: 500 });
    }

    // Log renewal
    await supabaseAdmin
      .from('access_logs')
      .insert({
        student_id: subscription.student_id,
        user_id: decoded.userId,
        action: 'subscription_renewed',
        details: {
          subscription_id: subscriptionId,
          old_end_date: subscription.end_date,
          new_end_date: newEndDate.toISOString(),
          billing_cycle: billingCycle
        }
      });

    return NextResponse.json({
      success: true,
      subscription: {
        id: updatedSubscription.id,
        end_date: updatedSubscription.end_date,
        billing_cycle: updatedSubscription.billing_cycle
      },
      message: `Subscription renewed successfully! New end date: ${newEndDate.toLocaleDateString()}`
    });

  } catch (error) {
    console.error('Renewal error:', error);
    return NextResponse.json({ error: 'Failed to renew subscription' }, { status: 500 });
  }
}