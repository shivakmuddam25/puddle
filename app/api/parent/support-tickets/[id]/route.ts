// app/api/parent/support-tickets/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId || decoded.sub;

    const { id } = await params;

    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Get ticket and verify ownership
    const { data: ticket, error } = await supabaseAdmin
	  .from('support_tickets')
	  .select(`
		*,
		student_profiles!left (
		  users (
			display_name
		  )
		)
	  `)
	  .eq('id', id)
	  .eq('parent_id', parentProfile.id)
	  .single();

	if (error || !ticket) {
	  return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
	}

	// Transform to include student_name
	const formattedTicket = {
	  ...ticket,
	  student_name: ticket.student_profiles?.users?.display_name || null,
	  student_profiles: undefined
	};

    // Get messages
    const { data: messages } = await supabaseAdmin
      .from('support_ticket_messages')
      .select('*')
      .eq('ticket_id', id)
      .order('created_at', { ascending: true });

    return NextResponse.json({ ticket, messages: messages || [] });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId || decoded.sub;

    const { id } = await params;
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Verify ticket belongs to parent
    const { data: ticket, error: ticketError } = await supabaseAdmin
      .from('support_tickets')
      .select('id, status')
      .eq('id', id)
      .eq('parent_id', parentProfile.id)
      .single();

    if (ticketError || !ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Insert message
    const { error: insertError } = await supabaseAdmin
      .from('support_ticket_messages')
      .insert({
        ticket_id: id,
        sender_type: 'parent',
        message
      });

    if (insertError) throw insertError;

    // If ticket was closed, reopen? Optional.
    if (ticket.status === 'closed') {
      await supabaseAdmin
        .from('support_tickets')
        .update({ status: 'open', updated_at: new Date().toISOString() })
        .eq('id', id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding reply:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}