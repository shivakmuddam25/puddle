import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      userType,
      dateOfBirth,
      childName,
      grade,
      school,
      ...additionalData
    } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (userType !== 'parent' && userType !== 'student') {
      return NextResponse.json(
        { error: 'Invalid user type. Must be "parent" or "student"' },
        { status: 400 }
      );
    }

    // Student age validation
    if (userType === 'student') {
      if (!dateOfBirth) {
        return NextResponse.json(
          { error: 'Date of birth is required for student registration' },
          { status: 400 }
        );
      }
      const age = calculateAge(dateOfBirth);
      if (age < 18) {
        return NextResponse.json(
          { error: 'You must be at least 18 years old to register without a parent' },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
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

    // Parse name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Generate username
    const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') +
      Date.now().toString().slice(-4);

    // Create user in `users` table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        username,
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

    // Assign role
    const { data: roleData } = await supabaseAdmin
      .from('roles')
      .select('id')
      .eq('name', userType)
      .single();

    if (roleData) {
      await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userData.id,
          role_id: roleData.id,
          is_active: true,
          assigned_at: new Date().toISOString()
        });
    }

    // Create profile based on userType
    let profileData = null;
    if (userType === 'parent') {
      const { data, error } = await supabaseAdmin
        .from('parent_profiles')
        .insert({
          user_id: userData.id,
          phone: additionalData?.phone,
          address: additionalData?.address,
          child_name: childName
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating parent profile:', error);
        await supabaseAdmin.from('users').delete().eq('id', userData.id);
        return NextResponse.json(
          { error: error.message || 'Failed to create parent profile' },
          { status: 500 }
        );
      }
      profileData = data;
    } else {
      // student
      const { data, error } = await supabaseAdmin
        .from('student_profiles')
        .insert({
          user_id: userData.id,
          date_of_birth: dateOfBirth,
          grade: grade || null,
          school: school || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating student profile:', error);
        await supabaseAdmin.from('users').delete().eq('id', userData.id);
        return NextResponse.json(
          { error: error.message || 'Failed to create student profile' },
          { status: 500 }
        );
      }
      profileData = data;
    }

    // Generate JWT
    const token = jwt.sign(
      {
        sub: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.display_name || name
      },
      JWT_SECRET,
      { expiresIn: '7d', issuer: 'puddle-app' }
    );

    // Set HTTP‑only cookie
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
      profile: profileData,
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