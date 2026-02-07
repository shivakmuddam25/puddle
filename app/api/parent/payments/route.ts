import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase'; // Change this

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    if (decoded.role !== 'parent') { // Changed
      return NextResponse.json(
        { error: 'Forbidden - Parent access required' },
        { status: 403 }
      );
    }

    // Get parent profile ID
    const { data: parentProfile, error: parentError } = await supabaseAdmin // Change
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.sub) // Changed
      .single();

    if (parentError || !parentProfile) {
      console.error('Parent profile error:', parentError);
      return NextResponse.json(
        { error: 'Parent profile not found' },
        { status: 404 }
      );
    }

    // Rest of your code using supabaseAdmin...
    // ...
  } catch (error: any) {
    console.error('Error in GET /api/parent/payments:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}