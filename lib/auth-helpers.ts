// lib/auth-helpers.ts
import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function createUser(
  email: string, 
  password: string, 
  name: string, 
  userType: 'parent' | 'student',
  additionalData?: any
) {
  const hashedPassword = await hashPassword(password);
  
  // First, insert into users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      email,
      name,
      password_hash: hashedPassword,
      user_type: userType
    })
    .select()
    .single();

  if (userError) {
    console.error('Error creating user:', userError);
    throw new Error(userError.message);
  }

  // Then create specific profile based on user type
  if (userType === 'parent') {
    const { data: parentData, error: parentError } = await supabase
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
      await supabase.from('users').delete().eq('id', userData.id);
      throw new Error(parentError.message);
    }

    return { ...userData, profile: parentData };
  } else if (userType === 'student') {
    const { data: studentData, error: studentError } = await supabase
      .from('student_profiles')
      .insert({
        user_id: userData.id,
        grade: additionalData?.grade,
        date_of_birth: additionalData?.dateOfBirth,
        parent_id: additionalData?.parentId
      })
      .select()
      .single();

    if (studentError) {
      console.error('Error creating student profile:', studentError);
      await supabase.from('users').delete().eq('id', userData.id);
      throw new Error(studentError.message);
    }

    return { ...userData, profile: studentData };
  }

  return userData;
}

export async function authenticateUser(email: string, password: string, userType: 'parent' | 'student') {
  // First, get the user
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('user_type', userType)
    .single();

  if (userError || !user) {
    return { error: 'Invalid credentials' };
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    return { error: 'Invalid credentials' };
  }

  // Get user profile based on type
  let profile = null;
  if (userType === 'parent') {
    const { data: parentProfile } = await supabase
      .from('parent_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    profile = parentProfile;
  } else if (userType === 'student') {
    const { data: studentProfile } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    profile = studentProfile;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.user_type,
      createdAt: user.created_at
    },
    profile
  };
}