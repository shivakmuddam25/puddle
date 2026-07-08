// app/api/admin/test-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    console.log('Testing password for:', email);
    
    // Get user from database
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, password_hash, role, is_active')
      .eq('email', email.toLowerCase())
      .single();
    
    if (error || !user) {
      console.log('User not found:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'User not found',
        details: error?.message 
      }, { status: 404 });
    }
    
    console.log('User found:', { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      hasHash: !!user.password_hash,
      hashLength: user.password_hash?.length
    });
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    console.log('Password valid:', isValid);
    
    return NextResponse.json({ 
      success: true, 
      userExists: true,
      passwordValid: isValid,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        is_active: user.is_active
      }
    });
    
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}