// app/api/cron/check-expired/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// This endpoint should be protected with a secret key
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET;
    
    if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Run the expiration check
    const { error } = await supabaseAdmin.rpc('check_and_update_expired_subscriptions');
    
    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Expired subscriptions check completed',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Failed to check expired subscriptions' }, { status: 500 });
  }
}