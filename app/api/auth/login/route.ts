// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json();

    console.log('Login attempt:', { email, userType }); // Debug log

    // Validate input
    if (!email || !password || !userType) {
      return NextResponse.json(
        { error: 'Email, password, and user type are required' },
        { status: 400 }
      );
    }

    // Get user from database using admin client
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('role', userType)
      .eq('is_active', true)
      .single();

    if (userError || !user) {
      console.error('User not found or inactive:', userError);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('User found:', { id: user.id, email: user.email, role: user.role });

    // Verify password
    const bcrypt = await import('bcryptjs');
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      console.error('Invalid password for user:', user.email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await supabaseAdmin
      .from('users')
      .update({ 
        last_login_at: new Date().toISOString(),
        last_active_at: new Date().toISOString()
      })
      .eq('id', user.id);

    // Get user profile based on role
    let profile = null;
    let grade = null;
    let gradeLevel = null;
    let board = null;
    let boardId = null;
    let school = null;
    
    if (userType === 'parent') {
      const { data: parentProfile } = await supabaseAdmin
        .from('parent_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      profile = parentProfile;
    } else if (userType === 'student') {
      const { data: studentProfile } = await supabaseAdmin
        .from('student_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      profile = studentProfile;
      grade = studentProfile?.grade || null;
      gradeLevel = studentProfile?.grade_level || null;
      board = studentProfile?.board || null;
      boardId = studentProfile?.board_id || null;
      school = studentProfile?.school || null;
    }

    // Create JWT token with all necessary fields
    const tokenPayload = {
      sub: user.id,
      userId: user.id,
      email: user.email,
      role: user.role,
      userType: user.role,
      name: user.display_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username
    };
    
    console.log('Creating token with payload:', tokenPayload);
    
    const token = jwt.sign(
      tokenPayload,
      JWT_SECRET,
      { 
        expiresIn: '7d',
        issuer: 'puddle-app',
        audience: 'puddle-web'
      }
    );

    console.log('Token created successfully');

    // Set HTTP-only cookie
    (await cookies()).set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.display_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username,
      userType: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      grade: grade,
      gradeLevel: gradeLevel,
      board: board,
      boardId: boardId,
      school: school
    };

    console.log('Sending response with token');

    // Return token in response body for client-side storage
    return NextResponse.json({
      success: true,
      token: token, // Make sure token is always included
      user: userResponse,
      profile,
      message: 'Login successful'
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}