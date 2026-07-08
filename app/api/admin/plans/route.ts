// app/api/admin/plans/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

async function verifyAdminToken(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')?.value;
  
  if (!adminToken) return null;
  
  try {
    const decoded = jwt.verify(adminToken, JWT_SECRET) as any;
    
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', decoded.userId)
      .single();
    
    if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: plans, error } = await supabaseAdmin
      .from('subscription_plans')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, plans: plans || [] });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { grade_range_start, grade_range_end, monthly_price, yearly_price, description, display_order } = await req.json();

    if (!grade_range_start || !grade_range_end || !monthly_price || !yearly_price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (grade_range_start > grade_range_end) {
      return NextResponse.json({ error: 'Invalid grade range' }, { status: 400 });
    }

    const { data: plan, error } = await supabaseAdmin
      .from('subscription_plans')
      .insert({
        grade_range_start,
        grade_range_end,
        monthly_price,
        yearly_price,
        description: description || null,
        display_order: display_order || 0,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, plan }, { status: 201 });
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, grade_range_start, grade_range_end, monthly_price, yearly_price, description, display_order, is_active } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 });
    }

    const updateData: any = { updated_at: new Date().toISOString() };
    if (grade_range_start !== undefined) updateData.grade_range_start = grade_range_start;
    if (grade_range_end !== undefined) updateData.grade_range_end = grade_range_end;
    if (monthly_price !== undefined) updateData.monthly_price = monthly_price;
    if (yearly_price !== undefined) updateData.yearly_price = yearly_price;
    if (description !== undefined) updateData.description = description;
    if (display_order !== undefined) updateData.display_order = display_order;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data: plan, error } = await supabaseAdmin
      .from('subscription_plans')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await verifyAdminToken(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('subscription_plans')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}