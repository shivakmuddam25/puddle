import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// For Next.js 14, params is a Promise
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ childId: string }> }
) {
  try {
    // Await the params Promise
    const { childId } = await params;
    
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    
    if (decoded.role !== 'parent') {
      return NextResponse.json({ error: 'Forbidden - Parent access required' }, { status: 403 });
    }

    // Verify parent has access to this child
    const { data: relationship } = await supabaseAdmin
      .from('family_relationships')
      .select(`
        parent_id,
        student_profiles (
          id,
          user_id,
          grade,
          date_of_birth,
          school,
          created_at,
          users!inner (
            id,
            email,
            username,
            first_name,
            last_name,
            display_name,
            created_at
          )
        )
      `)
      .eq('student_id', childId)
      .single();

    if (!relationship) {
      return NextResponse.json({ 
        error: 'Child not found or access denied',
        childId: childId
      }, { status: 404 });
    }

    // Get child progress data
    const { data: progressData } = await supabaseAdmin
      .from('student_progress')
      .select('*')
      .eq('student_id', childId)
      .order('last_activity', { ascending: false })
      .limit(1)
      .single();

    const child = relationship.student_profiles;
    
    return NextResponse.json({
      success: true,
      child: {
        id: child.id,
        userId: child.user_id,
        name: child.users.display_name || 
              `${child.users.first_name} ${child.users.last_name}`.trim() ||
              child.users.username,
        email: child.users.email,
        username: child.users.username,
        firstName: child.users.first_name,
        lastName: child.users.last_name,
        grade: child.grade,
        dateOfBirth: child.date_of_birth,
        school: child.school,
        createdAt: child.created_at,
        userCreatedAt: child.users.created_at
      },
      progress: progressData ? {
        overallScore: progressData.overall_score || 0,
        hoursStudied: progressData.total_hours_studied || 0,
        completedLessons: progressData.completed_lessons || 0,
        lastActivity: progressData.last_activity,
        courseName: progressData.course_name || 'General Studies',
        activeCourses: Math.min(Math.ceil((progressData.completed_lessons || 0) / 10), 5)
      } : {
        overallScore: 0,
        hoursStudied: 0,
        completedLessons: 0,
        lastActivity: null,
        courseName: 'No active course',
        activeCourses: 0
      }
    });
  } catch (error: any) {
    console.error('Error in GET /api/parent/children/[childId]:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ childId: string }> }
) {
  try {
    // Await the params Promise
    const { childId } = await params;
    
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    
    if (decoded.role !== 'parent') {
      return NextResponse.json({ error: 'Forbidden - Parent access required' }, { status: 403 });
    }

    const updates = await request.json();

    // Verify parent has access to this child
    const { data: relationship } = await supabaseAdmin
      .from('family_relationships')
      .select('parent_id')
      .eq('student_id', childId)
      .single();

    if (!relationship) {
      return NextResponse.json({ 
        error: 'Child not found or access denied',
        childId: childId 
      }, { status: 404 });
    }

    // Update child profile
    const updateData: any = {};
    if (updates.grade !== undefined) updateData.grade = updates.grade;
    if (updates.school !== undefined) updateData.school = updates.school;
    if (updates.dateOfBirth !== undefined) updateData.date_of_birth = updates.dateOfBirth;

    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('student_profiles')
        .update(updateData)
        .eq('id', childId);

      if (updateError) {
        console.error('Error updating child profile:', updateError);
        return NextResponse.json(
          { error: 'Failed to update child profile' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Child profile updated successfully',
      updates: updateData
    });
  } catch (error: any) {
    console.error('Error in PUT /api/parent/children/[childId]:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}