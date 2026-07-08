// app/api/admin/support-tickets/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = req.cookies.get('admin_token')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(adminToken, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;

    const { data: ticket, error } = await supabaseAdmin
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
      .eq('id', id)
      .single();

    if (error || !ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const { data: messages } = await supabaseAdmin
      .from('support_ticket_messages')
      .select('*')
      .eq('ticket_id', id)
      .order('created_at', { ascending: true });

    return NextResponse.json({
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        created_at: ticket.created_at,
        updated_at: ticket.updated_at,
        admin_response: ticket.admin_response,
        responded_at: ticket.responded_at,
        resolved_at: ticket.resolved_at,
        parent_name: ticket.parent_profiles.users.display_name,
        parent_email: ticket.parent_profiles.users.email,
        student_name: ticket.student_profiles?.users?.display_name || null
      },
      messages: messages || []
    });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminToken = req.cookies.get('admin_token')?.value;
    if (!adminToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(adminToken, JWT_SECRET) as any;
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const { status, adminResponse, priority } = await req.json();

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (adminResponse !== undefined) {
      updateData.admin_response = adminResponse;
      updateData.responded_at = new Date().toISOString();
    }
    if (status === 'resolved') updateData.resolved_at = new Date().toISOString();

    const { error } = await supabaseAdmin
      .from('support_tickets')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;

    // If admin response is added, also insert a message
    if (adminResponse) {
      await supabaseAdmin
        .from('support_ticket_messages')
        .insert({
          ticket_id: id,
          sender_type: 'admin',
          message: adminResponse
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}