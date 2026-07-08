// app/api/admin/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth-helpers';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, password, secretKey } = await req.json();
    
    // Security check
    if (secretKey !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Generate hash using your existing function
    const hashedPassword = await hashPassword(password);
    
    console.log('Generated hash:', hashedPassword);
    
    // Update the user's password
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ 
        password_hash: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq('email', email.toLowerCase())
      .select();
    
    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successfully',
      user: data
    });
    
  } catch (error) {
    console.error('Reset error:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}