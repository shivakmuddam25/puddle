// app/api/admin/test-login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    console.log('Testing login for:', email);
    
    // Get user directly from Supabase
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
    
    if (error || !user) {
      console.log('User not found:', error);
      return NextResponse.json({ error: 'User not found', details: error }, { status: 404 });
    }
    
    console.log('User found:', {
      id: user.id,
      email: user.email,
      role: user.role,
      hasPassword: !!user.password_hash
    });
    
    // Test password
    const isValid = await bcrypt.compare(password, user.password_hash);
    console.log('Password valid:', isValid);
    
    // Check if admin
    const isAdmin = user.role === 'admin' || user.role === 'super_admin';
    console.log('Is admin:', isAdmin);
    
    return NextResponse.json({ 
      userExists: true,
      passwordValid: isValid,
      isAdmin: isAdmin,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        is_active: user.is_active
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}