import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase'; // Use admin client

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json();

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

    // Verify password
    const bcrypt = await import('bcryptjs');
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login using admin client
    await supabaseAdmin
      .from('users')
      .update({ 
        last_login_at: new Date().toISOString(),
        last_active_at: new Date().toISOString()
      })
      .eq('id', user.id);

    // Get user profile based on role
    let profile = null;
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
    }

    // Create JWT token
	const token = jwt.sign(
	  {
		sub: user.id,           // Standard JWT field
		email: user.email,
		role: user.role,        // Use 'role' not 'userType'
		name: user.display_name || `${user.first_name} ${user.last_name}`.trim() || user.username
	  },
	  JWT_SECRET,
	  { 
		expiresIn: '7d',
		issuer: 'puddle-app',
		audience: 'puddle-web'
	  }
	);

    // Set HTTP-only cookie
    (await cookies()).set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

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