// app/api/admin/setup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth-helpers';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, password, secretKey } = await req.json();
    
    // Security: Check secret key (add this to your .env.local)
    if (secretKey !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if admin already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();
    
    if (existingUser) {
      // Update existing user's password
      const hashedPassword = await hashPassword(password);
      
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ 
          password_hash: hashedPassword,
          role: 'admin',
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('email', email.toLowerCase());
      
      if (updateError) {
        throw updateError;
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Admin password updated successfully',
        email: email
      });
    }
    
    // Create new admin user
    const hashedPassword = await hashPassword(password);
    
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        username: email.split('@')[0],
        password_hash: hashedPassword,
        first_name: 'Admin',
        last_name: 'User',
        display_name: 'Administrator',
        role: 'admin',
        is_active: true,
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (userError) {
      throw userError;
    }
    
    // Assign admin role if roles table exists
    const { data: role } = await supabaseAdmin
      .from('roles')
      .select('id')
      .eq('name', 'admin')
      .single();
    
    if (role) {
      await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: user.id,
          role_id: role.id,
          is_active: true,
          assigned_at: new Date().toISOString()
        });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin created successfully',
      email: user.email
    });
    
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}