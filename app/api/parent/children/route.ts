// app/api/parent/children/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
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

    // Get parent profile ID
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Get children through family relationships
    const { data: relationships, error: relationshipsError } = await supabaseAdmin
      .from('family_relationships')
      .select(`
        student_id,
        student_profiles (
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
          created_at,
          users!inner (
            id,
            email,
            username,
            first_name,
            last_name,
            display_name,
            is_active
          )
        )
      `)
      .eq('parent_id', parentProfile.id);

    if (relationshipsError) {
      console.error('Error fetching relationships:', relationshipsError);
      return NextResponse.json({ error: 'Failed to fetch children' }, { status: 500 });
    }

    const children = (relationships || []).map(rel => ({
      id: rel.student_profiles.id,
      userId: rel.student_profiles.user_id,
      name: rel.student_profiles.users.display_name || 
            `${rel.student_profiles.users.first_name || ''} ${rel.student_profiles.users.last_name || ''}`.trim() ||
            rel.student_profiles.users.username,
      email: rel.student_profiles.users.email,
      username: rel.student_profiles.users.username,
      firstName: rel.student_profiles.users.first_name,
      lastName: rel.student_profiles.users.last_name,
      grade: rel.student_profiles.grade || '',
      gradeLevel: rel.student_profiles.grade_level || 0,
      board: rel.student_profiles.board || '',
      boardId: rel.student_profiles.board_id || '',
      school: rel.student_profiles.school || '',
      gender: rel.student_profiles.gender || '',
      dateOfBirth: rel.student_profiles.date_of_birth || '',
      isActive: rel.student_profiles.is_active !== false,
      progress: 0,
      activeCourses: 0,
      createdAt: rel.student_profiles.created_at
    }));

    return NextResponse.json({ success: true, children });
  } catch (error: any) {
    console.error('Error in GET /api/parent/children:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const { name, email, password, grade, school, gender } = await request.json();

    console.log('Adding child:', { name, email, grade, school, gender });

    // Validate required fields
    if (!name || !email || !password || !grade) {
      return NextResponse.json({ error: 'Name, email, password, and grade are required' }, { status: 400 });
    }
    
    // Validate gender
    if (!gender || !['male', 'female', 'other'].includes(gender)) {
      return NextResponse.json({ error: 'Valid gender is required (male, female, or other)' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Split name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create student user
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        username: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + '_student',
        password_hash: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        display_name: name,
        gender: gender,
        role: 'student',
        is_active: true
      })
      .select()
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return NextResponse.json({ error: 'Failed to create user account' }, { status: 500 });
    }

    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();

    if (parentError || !parentProfile) {
      console.error('Parent profile error:', parentError);
      await supabaseAdmin.from('users').delete().eq('id', newUser.id);
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Extract grade level
    const gradeMatch = grade.match(/\d+/);
    const gradeLevel = gradeMatch ? parseInt(gradeMatch[0]) : 0;

    // Create student profile
    const { data: studentProfile, error: profileError } = await supabaseAdmin
      .from('student_profiles')
      .insert({
        user_id: newUser.id,
        grade: grade,
        grade_level: gradeLevel,
        school: school || null,
        gender: gender,
        parent_id: parentProfile.id,
        is_active: true
      })
      .select()
      .single();

    if (profileError) {
      console.error('Error creating student profile:', profileError);
      await supabaseAdmin.from('users').delete().eq('id', newUser.id);
      return NextResponse.json({ error: 'Failed to create student profile' }, { status: 500 });
    }

    // Create family relationship
    const { error: relationshipError } = await supabaseAdmin
      .from('family_relationships')
      .insert({
        parent_id: parentProfile.id,
        student_id: studentProfile.id,
        relationship_type: 'parent'
      });

    if (relationshipError) {
      console.error('Error creating relationship:', relationshipError);
      await supabaseAdmin.from('student_profiles').delete().eq('id', studentProfile.id);
      await supabaseAdmin.from('users').delete().eq('id', newUser.id);
      return NextResponse.json({ error: 'Failed to link child' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Child added successfully!',
      child: {
        id: studentProfile.id,
        userId: newUser.id,
        name: name,
        email: email,
        grade: grade,
        gradeLevel: gradeLevel,
        gender: gender,
        school: school || '',
        isActive: true
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/parent/children:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}