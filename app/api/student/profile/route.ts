import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
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
    
    if (decoded.role !== 'student') {
      return NextResponse.json(
        { error: 'Forbidden - Student access required' },
        { status: 403 }
      );
    }

    // Get user data
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', decoded.sub)
      .single();

    if (userError || !user) {
      console.error('User error:', userError);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get student profile
    const { data: studentProfile, error: profileError } = await supabaseAdmin
      .from('student_profiles')
      .select(`
        *,
        parent_profiles (
          users (
            name,
            email
          )
        )
      `)
      .eq('user_id', decoded.sub)
      .single();

    // Get parent info if available
    let parentInfo = null;
    if (studentProfile?.parent_profiles?.users) {
      parentInfo = {
        name: studentProfile.parent_profiles.users.name,
        email: studentProfile.parent_profiles.users.email
      };
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.display_name || `${user.first_name} ${user.last_name}`.trim() || user.username,
        userType: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username
      },
      profile: {
        id: studentProfile?.id,
        grade: studentProfile?.grade,
        dateOfBirth: studentProfile?.date_of_birth,
        school: studentProfile?.school,
        createdAt: studentProfile?.created_at
      },
      parent: parentInfo
    });
  } catch (error: any) {
    console.error('Error in GET /api/student/profile:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}