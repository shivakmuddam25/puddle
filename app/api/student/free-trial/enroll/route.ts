// app/api/student/free-trial/enroll/route.ts
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
    const { studentId, gradeLevel, boardId } = await req.json();

    console.log('Free trial enrollment request:', { studentId, gradeLevel, boardId, userId: decoded.userId });

    if (!studentId || !gradeLevel) {
      return NextResponse.json({ error: 'Student ID and grade level required' }, { status: 400 });
    }

    // Verify parent has access to this student
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    const { data: relationship, error: relError } = await supabaseAdmin
      .from('family_relationships')
      .select('id')
      .eq('parent_id', parentProfile.id)
      .eq('student_id', studentId)
      .single();

    if (relError || !relationship) {
      return NextResponse.json({ error: 'Unauthorized - This child does not belong to you' }, { status: 403 });
    }

    // Check if free trial is still available (before Dec 31)
    const now = new Date();
    const currentYear = now.getFullYear();
    const dec31 = new Date(currentYear, 11, 31);
    
    if (now > dec31) {
      return NextResponse.json({ 
        error: 'Free trial is only available until December 31st' 
      }, { status: 403 });
    }

    // Check if student already has an active subscription for this grade
    const { data: existingSubscription } = await supabaseAdmin
      .from('course_subscriptions')
      .select('id, is_active, end_date')
      .eq('student_id', studentId)
      .eq('grade_level', gradeLevel)
      .eq('is_active', true)
      .single();

    if (existingSubscription) {
      return NextResponse.json({ 
        error: 'You already have an active subscription for this grade. It expires on ' + new Date(existingSubscription.end_date).toLocaleDateString()
      }, { status: 400 });
    }

    // Check if student already has a free trial for this grade
    const { data: existingTrial } = await supabaseAdmin
      .from('free_trial_enrollments')
      .select('id, end_date')
      .eq('student_id', studentId)
      .eq('grade_level', gradeLevel)
      .single();

    if (existingTrial) {
      const endDate = new Date(existingTrial.end_date);
      if (endDate > now) {
        return NextResponse.json({ 
          error: 'You already have an active free trial. It expires on ' + endDate.toLocaleDateString()
        }, { status: 400 });
      } else {
        // Reactivate expired trial (update end date)
        const newEndDate = new Date();
        newEndDate.setDate(newEndDate.getDate() + 14);
        
        const { error: updateError } = await supabaseAdmin
          .from('free_trial_enrollments')
          .update({
            end_date: newEndDate.toISOString(),
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingTrial.id);
        
        if (updateError) throw updateError;
        
        // Log the reactivation
        await supabaseAdmin
          .from('access_logs')
          .insert({
            student_id: studentId,
            user_id: decoded.userId,
            action: 'free_trial_reactivated',
            details: { grade_level: gradeLevel, trial_id: existingTrial.id, end_date: newEndDate.toISOString() },
            ip_address: req.headers.get('x-forwarded-for'),
            user_agent: req.headers.get('user-agent')
          });
        
        return NextResponse.json({ 
          success: true, 
          message: 'Free trial reactivated!',
          trial: {
            id: existingTrial.id,
            grade_level: gradeLevel,
            end_date: newEndDate.toISOString(),
            days_left: 14
          }
        });
      }
    }

    // Calculate end date (14 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    // Create free trial enrollment
    const { data: trial, error } = await supabaseAdmin
      .from('free_trial_enrollments')
      .insert({
        student_id: studentId,
        grade_level: gradeLevel,
        board_id: boardId || null,
        start_date: now.toISOString(),
        end_date: endDate.toISOString(),
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Free trial creation error:', error);
      return NextResponse.json({ error: 'Failed to create free trial: ' + error.message }, { status: 500 });
    }

    // Log the enrollment
    await supabaseAdmin
      .from('access_logs')
      .insert({
        student_id: studentId,
        user_id: decoded.userId,
        action: 'free_trial_start',
        details: { 
          grade_level: gradeLevel, 
          trial_id: trial.id,
          end_date: endDate.toISOString()
        },
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent')
      });

    return NextResponse.json({ 
      success: true, 
      trial: {
        id: trial.id,
        grade_level: trial.grade_level,
        end_date: trial.end_date,
        days_left: 14
      },
      message: 'Free trial started! Your child now has 14 days of access.'
    });

  } catch (error) {
    console.error('Free trial enrollment error:', error);
    return NextResponse.json({ error: 'Failed to start free trial: ' + (error as Error).message }, { status: 500 });
  }
}