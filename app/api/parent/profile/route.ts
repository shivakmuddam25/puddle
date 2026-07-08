// app/api/parent/profile/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    const url = new URL(req.url);
    const timestamp = url.searchParams.get('_t'); // Get timestamp from query
    
    console.log('=== PROFILE GET ENDPOINT ===');
    console.log('Timestamp:', timestamp);
    console.log('Token exists:', !!token);
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.userId || decoded.sub;
    console.log('User ID:', userId);
    
    // Force fresh query by disabling cache at Supabase level
    const { data: parent, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors
    
    console.log('Parent profile from DB:', parent);
    console.log('Parent profile error:', parentError);
    
    // Get user data for name and email
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('email, display_name, first_name, last_name')
      .eq('id', userId)
      .maybeSingle();
    
    console.log('User from DB:', user);
    
    // Construct name from available fields
    const name = user?.display_name || 
                 (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}`.trim() : 
                 user?.first_name || '');
    
    const responseData = {
      id: parent?.id,
      name: name,
      email: user?.email || '',
      phone: parent?.phone || '',
      address: parent?.address || '',
      emailNotifications: parent?.email_notifications ?? true,
      paymentReminders: parent?.payment_reminders ?? true,
      weeklyReports: parent?.weekly_reports ?? false
    };
    
    console.log('Sending response:', responseData);
    
    // Add cache-control headers to prevent caching
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    
  } catch (error) {
    console.error('Error fetching parent profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const body = await req.json();
    
    console.log('=== PROFILE PUT ENDPOINT ===');
    console.log('Saving parent settings:', body);
    
    const { phone, address, emailNotifications, paymentReminders, weeklyReports } = body;
    const userId = decoded.userId || decoded.sub;
    
    // First, check if parent profile exists
    const { data: existingProfile, error: fetchError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    console.log('Existing profile:', existingProfile);
    
    let updateResult;
    
    if (!existingProfile) {
      // Create new parent profile
      console.log('Creating new parent profile...');
      const insertData = {
        user_id: userId,
        phone: phone || null,
        address: address || null,
        email_notifications: emailNotifications !== undefined ? emailNotifications : true,
        payment_reminders: paymentReminders !== undefined ? paymentReminders : true,
        weekly_reports: weeklyReports !== undefined ? weeklyReports : false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('Insert data:', insertData);
      
      const { error: insertError } = await supabaseAdmin
        .from('parent_profiles')
        .insert(insertData);
      
      if (insertError) {
        console.error('Error creating parent profile:', insertError);
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
      }
      console.log('Parent profile created successfully');
    } else {
      // Update existing parent profile
      const updateData: any = {
        updated_at: new Date().toISOString()
      };
      
      if (phone !== undefined) updateData.phone = phone || null;
      if (address !== undefined) updateData.address = address || null;
      if (emailNotifications !== undefined) updateData.email_notifications = emailNotifications;
      if (paymentReminders !== undefined) updateData.payment_reminders = paymentReminders;
      if (weeklyReports !== undefined) updateData.weekly_reports = weeklyReports;
      
      console.log('Updating parent profile with:', updateData);
      
      const { error: updateError } = await supabaseAdmin
        .from('parent_profiles')
        .update(updateData)
        .eq('user_id', userId);
      
      if (updateError) {
        console.error('Error updating parent profile:', updateError);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
      }
      console.log('Parent profile updated successfully');
    }
    
    // Fetch the updated data to return (force fresh query)
    const { data: updatedParent, error: fetchUpdatedError } = await supabaseAdmin
      .from('parent_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    console.log('Updated parent data from DB:', updatedParent);
    
    // Get user data
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('email, display_name, first_name, last_name')
      .eq('id', userId)
      .maybeSingle();
    
    const name = user?.display_name || 
                 (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}`.trim() : 
                 user?.first_name || '');
    
    const responseData = {
      success: true,
      message: 'Settings saved successfully',
      data: {
        id: updatedParent?.id,
        name: name,
        email: user?.email || '',
        phone: updatedParent?.phone || '',
        address: updatedParent?.address || '',
        emailNotifications: updatedParent?.email_notifications ?? true,
        paymentReminders: updatedParent?.payment_reminders ?? true,
        weeklyReports: updatedParent?.weekly_reports ?? false
      }
    };
    
    console.log('Saving response:', responseData);
    
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      }
    });
    
  } catch (error) {
    console.error('Error updating parent profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}