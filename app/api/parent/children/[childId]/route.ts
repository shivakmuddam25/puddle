// app/api/parent/children/[childId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ childId: string }> }
) {
  try {
    const { childId } = await params;
    const token = req.cookies.get('auth_token')?.value;
    
    console.log('GET child profile - childId:', childId);
    console.log('GET child profile - token exists:', !!token);
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    console.log('Decoded token:', { userId: decoded.userId, sub: decoded.sub });
    
    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();
    
    console.log('Parent profile:', parentProfile);
    
    if (parentError || !parentProfile) {
      console.error('Parent profile error:', parentError);
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }
    
    // Get child profile - removed the parent_id filter temporarily to debug
    const { data: child, error: childError } = await supabaseAdmin
      .from('student_profiles')
      .select(`
        id,
        user_id,
        grade,
        grade_level,
        board,
        board_id,
        school,
        gender,
        date_of_birth,
        created_at,
        users!inner (
          id,
          email,
          username,
          first_name,
          last_name,
          display_name
        )
      `)
      .eq('id', childId);
    
    console.log('Raw child query result:', child);
    console.log('Child query error:', childError);
    
    if (childError || !child || child.length === 0) {
      console.error('Child error:', childError);
      return NextResponse.json({ error: 'Child not found' }, { status: 404 });
    }
    
    const childData = child[0];
    
    // Verify child belongs to parent
    const { data: relationship, error: relError } = await supabaseAdmin
      .from('family_relationships')
      .select('student_id')
      .eq('parent_id', parentProfile.id)
      .eq('student_id', childId)
      .single();
    
    console.log('Relationship check:', { relationship, relError });
    
    if (relError || !relationship) {
      console.error('Child does not belong to this parent');
      return NextResponse.json({ error: 'Child not found or unauthorized' }, { status: 404 });
    }
    
    const responseData = {
      success: true,
      child: {
        id: childData.id,
        userId: childData.user_id,
        name: childData.users.display_name || `${childData.users.first_name || ''} ${childData.users.last_name || ''}`.trim(),
        email: childData.users.email,
        firstName: childData.users.first_name,
        lastName: childData.users.last_name,
        username: childData.users.username,
        grade: childData.grade || '',
        gradeLevel: childData.grade_level || 0,
        board: childData.board || '',
        boardId: childData.board_id || '',
        gender: childData.gender || '',
        school: childData.school || '',
        dateOfBirth: childData.date_of_birth || '',
        createdAt: childData.created_at
      }
    };
    
    console.log('Sending response:', responseData);
    
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    
  } catch (error) {
    console.error('Error fetching child:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// app/api/parent/children/[childId]/route.ts - Update the PUT method

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ childId: string }> }
) {
  try {
    const { childId } = await params;
    const token = req.cookies.get('auth_token')?.value;
    const body = await req.json();
    
    console.log('PUT - Updating child with data:', body);
    console.log('PUT - childId:', childId);
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();
    
    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }
    
    // Verify child belongs to parent
    const { data: relationship, error: relError } = await supabaseAdmin
      .from('family_relationships')
      .select('student_id')
      .eq('parent_id', parentProfile.id)
      .eq('student_id', childId)
      .single();
    
    if (relError || !relationship) {
      return NextResponse.json({ error: 'Child not found or unauthorized' }, { status: 404 });
    }
    
    // Get current child to get user_id and current grade
    const { data: currentChild, error: currentError } = await supabaseAdmin
      .from('student_profiles')
      .select('user_id, grade_level')
      .eq('id', childId)
      .single();
    
    if (currentError || !currentChild) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }
    
    // Check if grade has changed
    const gradeChanged = body.gradeLevel !== undefined && body.gradeLevel !== currentChild.grade_level;
    
    // If grade changed, invalidate all active subscriptions
    if (gradeChanged) {
      console.log('Grade changed from', currentChild.grade_level, 'to', body.gradeLevel);
      console.log('Invalidating existing subscriptions...');
      
      // Deactivate all active subscriptions for this student
      const { error: deactivateError } = await supabaseAdmin
        .from('course_subscriptions')
        .update({ 
          is_active: false, 
          deactivated_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deactivation_reason: 'grade_change'
        })
        .eq('student_id', childId)
        .eq('is_active', true);
      
      if (deactivateError) {
        console.error('Error deactivating subscriptions:', deactivateError);
      } else {
        console.log('All active subscriptions deactivated');
      }
      
      // Deactivate free trials for this student
      const { error: deactivateTrialError } = await supabaseAdmin
        .from('free_trial_enrollments')
        .update({ 
          is_active: false, 
          updated_at: new Date().toISOString(),
          deactivation_reason: 'grade_change'
        })
        .eq('student_id', childId)
        .eq('is_active', true);
      
      if (deactivateTrialError) {
        console.error('Error deactivating free trials:', deactivateTrialError);
      }
      
      // Update student profile status to inactive
      await supabaseAdmin
        .from('student_profiles')
        .update({ 
          is_active: false,
          subscription_status: 'inactive',
          updated_at: new Date().toISOString()
        })
        .eq('id', childId);
      
      // Deactivate the user
      await supabaseAdmin
        .from('users')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentChild.user_id);
      
      // Log the grade change
      await supabaseAdmin
        .from('access_logs')
        .insert({
          student_id: childId,
          user_id: decoded.userId,
          action: 'grade_change_invalidated_subscriptions',
          details: {
            old_grade: currentChild.grade_level,
            new_grade: body.gradeLevel,
            subscriptions_deactivated: true,
            free_trials_deactivated: true
          },
          ip_address: req.headers.get('x-forwarded-for'),
          user_agent: req.headers.get('user-agent')
        });
    }
    
    // Update student_profiles
    const updateData: any = {
      updated_at: new Date().toISOString()
    };
    
    if (body.grade !== undefined && body.grade !== '') updateData.grade = body.grade;
    if (body.gradeLevel !== undefined && body.gradeLevel !== 0) updateData.grade_level = body.gradeLevel;
    if (body.board !== undefined) updateData.board = body.board;
    if (body.boardId !== undefined && body.boardId !== '') updateData.board_id = body.boardId;
    if (body.school !== undefined) updateData.school = body.school;
    if (body.gender !== undefined && body.gender !== '') updateData.gender = body.gender;
    if (body.dateOfBirth !== undefined && body.dateOfBirth !== '') updateData.date_of_birth = body.dateOfBirth;
    
    // If grade changed, also reset subscription status
    if (gradeChanged) {
      updateData.subscription_status = 'inactive';
      updateData.subscription_id = null;
    }
    
    const { error: updateError } = await supabaseAdmin
      .from('student_profiles')
      .update(updateData)
      .eq('id', childId);
    
    if (updateError) {
      console.error('Error updating student profile:', updateError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
    
    // Update users table
    if (body.name && body.name !== '') {
      const nameParts = body.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const { error: userUpdateError } = await supabaseAdmin
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          display_name: body.name,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentChild.user_id);
      
      if (userUpdateError) {
        console.error('Error updating user:', userUpdateError);
      }
    }
    
    if (body.gender && body.gender !== '') {
      const { error: genderUpdateError } = await supabaseAdmin
        .from('users')
        .update({ 
          gender: body.gender,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentChild.user_id);
      
      if (genderUpdateError) {
        console.error('Error updating user gender:', genderUpdateError);
      }
    }
    
    // Fetch updated data to return
    const { data: updatedChild, error: fetchError } = await supabaseAdmin
      .from('student_profiles')
      .select(`
        id,
        user_id,
        grade,
        grade_level,
        board,
        board_id,
        school,
        gender,
        date_of_birth,
        subscription_status,
        users!inner (
          id,
          email,
          username,
          first_name,
          last_name,
          display_name
        )
      `)
      .eq('id', childId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching updated child:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch updated data' }, { status: 500 });
    }
    
    const responseData = {
      success: true,
      message: gradeChanged ? 'Child updated successfully. Previous subscriptions have been invalidated.' : 'Child updated successfully',
      gradeChanged: gradeChanged,
      child: {
        id: updatedChild.id,
        userId: updatedChild.user_id,
        name: updatedChild.users.display_name || `${updatedChild.users.first_name || ''} ${updatedChild.users.last_name || ''}`.trim(),
        email: updatedChild.users.email,
        firstName: updatedChild.users.first_name,
        lastName: updatedChild.users.last_name,
        username: updatedChild.users.username,
        grade: updatedChild.grade || '',
        gradeLevel: updatedChild.grade_level || 0,
        board: updatedChild.board || '',
        boardId: updatedChild.board_id || '',
        gender: updatedChild.gender || '',
        school: updatedChild.school || '',
        dateOfBirth: updatedChild.date_of_birth || '',
        subscriptionStatus: updatedChild.subscription_status
      }
    };
    
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    
  } catch (error) {
    console.error('Error updating child:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}