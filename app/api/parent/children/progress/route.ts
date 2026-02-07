import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No authentication token provided' },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid or expired authentication token' },
        { status: 401 }
      );
    }
    
    // Check if user has parent role
    if (decoded.role !== 'parent') {
      return NextResponse.json(
        { error: 'Forbidden - Parent access required' },
        { status: 403 }
      );
    }

    // Get parent profile ID
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.sub)
      .single();

    if (parentError || !parentProfile) {
      console.error('Parent profile error:', parentError);
      return NextResponse.json(
        { error: 'Parent profile not found. Please complete your profile setup.' },
        { status: 404 }
      );
    }

    // Get children through family relationships with their progress
    const { data: relationships, error: relationshipsError } = await supabaseAdmin
      .from('family_relationships')
      .select(`
        student_id,
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
            display_name
          ),
          student_progress (
            id,
            overall_score,
            total_hours_studied,
            completed_lessons,
            last_activity,
            course_name
          )
        )
      `)
      .eq('parent_id', parentProfile.id);

    if (relationshipsError) {
      console.error('Error fetching relationships:', relationshipsError);
      return NextResponse.json(
        { error: 'Failed to fetch children data. Please try again.' },
        { status: 500 }
      );
    }

    // Process children data with progress
    const children = (relationships || []).map(rel => {
      const student = rel.student_profiles;
      const progress = student.student_progress?.[0] || {};
      
      // Calculate active courses based on completed lessons
      const activeCourses = progress.completed_lessons 
        ? Math.min(Math.ceil(progress.completed_lessons / 10), 5) // Max 5 courses
        : 1;
      
      return {
        id: student.id,
        userId: student.user_id,
        name: student.users.display_name || 
              `${student.users.first_name} ${student.users.last_name}`.trim() ||
              student.users.username,
        email: student.users.email,
        username: student.users.username,
        firstName: student.users.first_name,
        lastName: student.users.last_name,
        grade: student.grade,
        dateOfBirth: student.date_of_birth,
        school: student.school,
        createdAt: student.created_at,
        progress: {
          overallScore: progress.overall_score || 0,
          hoursStudied: progress.total_hours_studied || 0,
          completedLessons: progress.completed_lessons || 0,
          lastActivity: progress.last_activity,
          courseName: progress.course_name || 'General Studies',
          activeCourses: activeCourses
        }
      };
    });

    // Calculate overall statistics
    const overallStats = children.reduce(
      (stats, child) => {
        stats.totalChildren++;
        stats.totalProgress += child.progress.overallScore;
        stats.totalHoursStudied += child.progress.hoursStudied;
        stats.totalCompletedLessons += child.progress.completedLessons;
        stats.totalActiveCourses += child.progress.activeCourses;
        return stats;
      },
      {
        totalChildren: 0,
        totalProgress: 0,
        totalHoursStudied: 0,
        totalCompletedLessons: 0,
        totalActiveCourses: 0,
        averageProgress: 0,
        averageHoursPerChild: 0
      }
    );

    // Calculate averages
    if (overallStats.totalChildren > 0) {
      overallStats.averageProgress = Math.round(overallStats.totalProgress / overallStats.totalChildren);
      overallStats.averageHoursPerChild = Math.round(overallStats.totalHoursStudied / overallStats.totalChildren);
    }

    return NextResponse.json({
      success: true,
      children: children,
      stats: overallStats,
      summary: {
        totalChildren: overallStats.totalChildren,
        averageProgress: overallStats.averageProgress,
        totalStudyHours: overallStats.totalHoursStudied,
        totalActiveCourses: overallStats.totalActiveCourses
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in GET /api/parent/children/progress:', error);
    
    // Return proper error response
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint to update child progress (if needed)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    if (decoded.role !== 'parent') {
      return NextResponse.json(
        { error: 'Forbidden - Parent access required' },
        { status: 403 }
      );
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.studentId || !data.courseName) {
      return NextResponse.json(
        { error: 'Student ID and course name are required' },
        { status: 400 }
      );
    }

    // Check if parent has access to this student
    const { data: relationship } = await supabaseAdmin
      .from('family_relationships')
      .select('id')
      .eq('parent_id', decoded.sub)
      .eq('student_id', data.studentId)
      .single();

    if (!relationship) {
      return NextResponse.json(
        { error: 'Access denied to this student' },
        { status: 403 }
      );
    }

    // Update or create progress record
    const { data: progress, error: progressError } = await supabaseAdmin
      .from('student_progress')
      .upsert({
        student_id: data.studentId,
        course_name: data.courseName,
        overall_score: data.overallScore || 0,
        total_hours_studied: data.hoursStudied || 0,
        completed_lessons: data.completedLessons || 0,
        last_activity: new Date().toISOString()
      }, {
        onConflict: 'student_id,course_name'
      })
      .select()
      .single();

    if (progressError) {
      console.error('Error updating progress:', progressError);
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully',
      progress: progress
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error in POST /api/parent/children/progress:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}