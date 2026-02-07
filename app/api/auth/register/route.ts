import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase'; // Use admin client

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, childName, userType, ...additionalData } = await request.json();

    // Validate input
    if (!name || !email || !password || userType !== 'parent') {
      return NextResponse.json(
        { error: 'Name, email, password are required and user must be parent' },
        { status: 400 }
      );
    }

    // Check if user already exists using admin client
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 12);

    // Split name into first and last name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Generate username from email
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + Date.now().toString().slice(-4);

    // Create user using admin client (bypasses RLS)
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        username: username,
        password_hash: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        role: userType,
        is_active: true,
        is_verified: false,
        is_email_verified: false
      })
      .select()
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return NextResponse.json(
        { error: userError.message || 'Failed to create user' },
        { status: 500 }
      );
    }

    // Get parent role
    const { data: parentRole } = await supabaseAdmin
      .from('roles')
      .select('id')
      .eq('name', 'parent')
      .single();

    // Assign parent role to user
    if (parentRole) {
      await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userData.id,
          role_id: parentRole.id,
          is_active: true,
          assigned_at: new Date().toISOString()
        });
    }

    // Create parent profile using admin client
    const { data: parentData, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .insert({
        user_id: userData.id,
        phone: additionalData?.phone,
        address: additionalData?.address
      })
      .select()
      .single();

    if (parentError) {
      console.error('Error creating parent profile:', parentError);
      // Rollback: delete the user if parent profile creation fails
      await supabaseAdmin.from('users').delete().eq('id', userData.id);
      return NextResponse.json(
        { error: parentError.message || 'Failed to create parent profile' },
        { status: 500 }
      );
    }

    // Create JWT token
	const token = jwt.sign(
	  {
		sub: userData.id,           // Standard JWT field for subject/user ID
		email: userData.email,
		role: userData.role,        // Use 'role' not 'userType'
		name: userData.display_name || name
	  },
	  JWT_SECRET,
	  { 
		expiresIn: '7d',
		issuer: 'puddle-app'
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
        id: userData.id,
        email: userData.email,
        name: userData.display_name || name,
        userType: userData.role,
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username
      },
      profile: parentData,
      message: 'Registration successful'
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}