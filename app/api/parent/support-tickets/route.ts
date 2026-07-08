// app/api/parent/support-tickets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId || decoded.sub;

    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Fetch tickets
    const { data: tickets, error } = await supabaseAdmin
	  .from('support_tickets')
	  .select(`
		*,
		student_profiles!left (
		  users (
			display_name
		  )
		)
	  `)
	  .eq('parent_id', parentProfile.id)
	  .order('created_at', { ascending: false });

	if (error) throw error;

	// Transform to include student_name
	const formattedTickets = (tickets || []).map(ticket => ({
	  ...ticket,
	  student_name: ticket.student_profiles?.users?.display_name || null,
	  student_profiles: undefined // remove nested object to keep response clean
	}));

	return NextResponse.json({ tickets: formattedTickets });
	
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId || decoded.sub;

    const { subject, description, studentId, priority } = await req.json();

    if (!subject || !description) {
      return NextResponse.json({ error: 'Subject and description are required' }, { status: 400 });
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

    // Verify student belongs to parent if provided
    if (studentId) {
      const { data: relationship } = await supabaseAdmin
        .from('family_relationships')
        .select('id')
        .eq('parent_id', parentProfile.id)
        .eq('student_id', studentId)
        .single();

      if (!relationship) {
        return NextResponse.json({ error: 'Student not found or unauthorized' }, { status: 403 });
      }
    }

    const { data: ticket, error } = await supabaseAdmin
      .from('support_tickets')
      .insert({
        parent_id: parentProfile.id,
        student_id: studentId || null,
        subject,
        description,
        priority: priority || 'medium',
        status: 'open'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}