// app/api/admin/check-expired/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Run the expiration check
    const { error } = await supabaseAdmin.rpc('check_and_update_expired_subscriptions');
    
    if (error) {
      throw error;
    }

    // Get count of expired subscriptions processed
    const { data: expiredCount } = await supabaseAdmin
      .from('course_subscriptions')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', false)
      .not('deactivated_at', 'is', null);

    return NextResponse.json({
      success: true,
      message: 'Expired subscriptions check completed',
      expiredProcessed: expiredCount?.count || 0,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Expiration check error:', error);
    return NextResponse.json({ error: 'Failed to check expired subscriptions' }, { status: 500 });
  }
}