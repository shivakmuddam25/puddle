// app/api/student/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    
    console.log('Profile API - Token exists:', !!token);
    
    if (!token) {
      console.log('Profile API - No token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
      console.log('Profile API - Decoded token:', { userId: decoded.userId, role: decoded.role });
    } catch (jwtError) {
      console.error('Profile API - JWT verification failed:', jwtError);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get student profile with user details - FIXED QUERY
    const { data: studentProfile, error: profileError } = await supabaseAdmin
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
        is_active,
        subscription_status,
        created_at,
        users!inner (
          id,
          email,
          display_name,
          first_name,
          last_name,
          is_active 
        )
      `)
      .eq('user_id', decoded.userId)
      .maybeSingle();

    console.log('Profile API - Query result:', { 
      found: !!studentProfile, 
      userId: decoded.userId,
      error: profileError?.message
    });

    if (profileError) {
      console.error('Profile API - Database error:', profileError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!studentProfile) {
      console.log('Profile API - No student profile found for user:', decoded.userId);
      
      // Check if this user is a parent
      const { data: parentProfile, error: parentError } = await supabaseAdmin
        .from('parent_profiles')
        .select('id')
        .eq('user_id', decoded.userId)
        .maybeSingle();

      console.log('Profile API - Parent check:', { isParent: !!parentProfile });

      if (!parentError && parentProfile) {
        return NextResponse.json({ 
          error: 'Parent access - please specify child ID',
          isParent: true 
        }, { status: 400 });
      }

      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Get active subscriptions
    const { data: subscriptions, error: subError } = await supabaseAdmin
      .from('course_subscriptions')
      .select('*')
      .eq('student_id', studentProfile.id)
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (subError) {
      console.error('Profile API - Subscription error:', subError);
    }

    const responseData = {
      id: studentProfile.id,
      userId: studentProfile.user_id,
      name: studentProfile.users.display_name || 
            `${studentProfile.users.first_name || ''} ${studentProfile.users.last_name || ''}`.trim(),
      email: studentProfile.users.email,
      grade: studentProfile.grade || `Grade ${studentProfile.grade_level}`,
      gradeLevel: studentProfile.grade_level,
      board: studentProfile.board || '',
      boardId: studentProfile.board_id || '',
      school: studentProfile.school || '',
      gender: studentProfile.gender || '',
      dateOfBirth: studentProfile.date_of_birth || '',
      isActive: studentProfile.is_active && studentProfile.users.user_active,
      subscriptionStatus: studentProfile.subscription_status || 'inactive',
      activeSubscriptions: subscriptions || [],
      activeGrades: (subscriptions || []).map(s => ({
        gradeLevel: s.grade_level,
        subscriptionId: s.id,
        endDate: s.end_date,
        startDate: s.start_date,
        billingCycle: s.billing_cycle
      }))
    };

    console.log('Profile API - Returning data for:', responseData.email, 'grade:', responseData.gradeLevel);
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Profile API - Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}