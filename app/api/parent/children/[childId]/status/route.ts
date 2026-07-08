// app/api/parent/children/[childId]/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ childId: string }> }
) {
  try {
    // Await the params object
    const { childId } = await params;
    
    const token = req.cookies.get('auth_token')?.value;
    
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
    
    const { isActive } = await req.json();
    
    if (isActive === undefined) {
      return NextResponse.json({ error: 'isActive field is required' }, { status: 400 });
    }
    
    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.sub)
      .single();
    
    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }
    
    // Verify this child belongs to the parent
    const { data: relationship, error: relError } = await supabaseAdmin
      .from('family_relationships')
      .select('student_id')
      .eq('parent_id', parentProfile.id)
      .eq('student_id', childId)
      .single();
    
    if (relError || !relationship) {
      return NextResponse.json({ error: 'Child not found or unauthorized' }, { status: 404 });
    }
    
    // Get student profile to get user_id
    const { data: studentProfile, error: studentError } = await supabaseAdmin
      .from('student_profiles')
      .select('user_id')
      .eq('id', childId)
      .single();
    
    if (studentError || !studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }
    
    // Update student profile status
    const { error: updateProfileError } = await supabaseAdmin
      .from('student_profiles')
      .update({ 
        is_active: isActive,
        updated_at: new Date().toISOString()
      })
      .eq('id', childId);
    
    if (updateProfileError) {
      console.error('Error updating student profile status:', updateProfileError);
      return NextResponse.json({ error: 'Failed to update child status' }, { status: 500 });
    }
    
    // Update users table status
    const { error: updateUserError } = await supabaseAdmin
      .from('users')
      .update({ 
        is_active: isActive,
        updated_at: new Date().toISOString()
      })
      .eq('id', studentProfile.user_id);
    
    if (updateUserError) {
      console.error('Error updating user status:', updateUserError);
      return NextResponse.json({ error: 'Failed to update user status' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Child ${isActive ? 'activated' : 'deactivated'} successfully`,
      isActive
    });
    
  } catch (error) {
    console.error('Error updating child status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}