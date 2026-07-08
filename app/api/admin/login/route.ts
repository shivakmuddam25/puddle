// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '@/lib/auth-helpers';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, password_hash, role, is_active')
      .eq('email', email.toLowerCase())
      .single();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    if (!user.is_active) {
      return NextResponse.json({ error: 'Account is disabled' }, { status: 401 });
    }
    
    const isAdmin = user.role === 'admin' || user.role === 'super_admin';
    
    if (!isAdmin) {
      const { data: userRoles } = await supabaseAdmin
        .from('user_roles')
        .select('roles(name)')
        .eq('user_id', user.id)
        .eq('is_active', true);
      
      const hasAdminRole = userRoles?.some(ur => ur.roles?.name === 'admin' || ur.roles?.name === 'super_admin');
      
      if (!hasAdminRole) {
        return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
      }
    }
    
    const isValid = await verifyPassword(password, user.password_hash);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    const response = NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      user: { id: user.id, email: user.email, role: user.role }
    });
    
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}