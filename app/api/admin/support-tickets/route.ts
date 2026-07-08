// app/api/admin/support-tickets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(req: NextRequest) {
  try {
    const adminToken = req.cookies.get('admin_token')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(adminToken, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all tickets with parent and student info
    const { data: tickets, error } = await supabaseAdmin
      .from('support_tickets')
      .select(`
        *,
        parent_profiles!inner (
          users!inner (email, display_name)
        ),
        student_profiles (
          users!inner (display_name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform to clean response
    const formatted = tickets.map(t => ({
      id: t.id,
      subject: t.subject,
      description: t.description,
      status: t.status,
      priority: t.priority,
      created_at: t.created_at,
      updated_at: t.updated_at,
      admin_response: t.admin_response,
      parent_name: t.parent_profiles.users.display_name,
      parent_email: t.parent_profiles.users.email,
      student_name: t.student_profiles?.users?.display_name || null
    }));

    return NextResponse.json({ tickets: formatted });
  } catch (error) {
    console.error('Error fetching admin tickets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}