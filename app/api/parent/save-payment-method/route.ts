import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function detectCardBrand(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.startsWith('4')) return 'Visa';
  if (cleaned.startsWith('5')) return 'Mastercard';
  if (cleaned.startsWith('3')) return 'Amex';
  if (cleaned.startsWith('6')) return 'Discover';
  return 'Card';
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { paymentMethod, upiId, cardDetails, setAsDefault } = await req.json();

    // Get parent profile
    const { data: parentProfile } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();

    if (!parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Check if method already exists
    let existingMethod = null;
    if (paymentMethod === 'upi' && upiId) {
      const { data: existing } = await supabaseAdmin
        .from('saved_payment_methods')
        .select('id')
        .eq('parent_id', parentProfile.id)
        .eq('payment_type', 'upi')
        .eq('upi_id', upiId)
        .maybeSingle();
      existingMethod = existing;
    } else if (paymentMethod === 'card' && cardDetails?.number) {
      const cleanedNumber = cardDetails.number.replace(/\s/g, '');
      const last4 = cleanedNumber.slice(-4);
      const { data: existing } = await supabaseAdmin
        .from('saved_payment_methods')
        .select('id')
        .eq('parent_id', parentProfile.id)
        .eq('payment_type', 'card')
        .eq('card_last4', last4)
        .maybeSingle();
      existingMethod = existing;
    }

    if (existingMethod) {
      return NextResponse.json({ error: 'Payment method already saved' }, { status: 400 });
    }

    // Determine if this should be default (if no other methods exist)
    const { count } = await supabaseAdmin
      .from('saved_payment_methods')
      .select('*', { count: 'exact', head: true })
      .eq('parent_id', parentProfile.id);

    const isDefault = setAsDefault === true || count === 0;

    const methodData: any = {
      parent_id: parentProfile.id,
      payment_type: paymentMethod,
      is_default: isDefault,
    };

    if (paymentMethod === 'card' && cardDetails) {
      const cleanedNumber = cardDetails.number.replace(/\s/g, '');
      const last4 = cleanedNumber.slice(-4);
      methodData.card_last4 = last4;
      methodData.card_brand = detectCardBrand(cleanedNumber);
      methodData.card_holder_name = cardDetails.name;
      methodData.card_expiry = cardDetails.expiry;
      methodData.masked_details = `**** **** **** ${last4}`;
    } else if (paymentMethod === 'upi' && upiId) {
      methodData.upi_id = upiId;
      methodData.masked_details = upiId;
    }

    const { error: insertError } = await supabaseAdmin
      .from('saved_payment_methods')
      .insert(methodData);

    if (insertError) {
      console.error('Error saving payment method:', insertError);
      return NextResponse.json({ error: 'Failed to save payment method' }, { status: 500 });
    }

    // If this is set as default and there were other methods, update them
    if (isDefault && count > 0) {
      await supabaseAdmin
        .from('saved_payment_methods')
        .update({ is_default: false })
        .eq('parent_id', parentProfile.id)
        .neq('payment_type', paymentMethod === 'card' ? 'upi' : 'card'); // simple: all others
      // Actually we need to exclude the newly inserted one – easier: set all to false, then set the new one to true
      await supabaseAdmin
        .from('saved_payment_methods')
        .update({ is_default: false })
        .eq('parent_id', parentProfile.id);
      await supabaseAdmin
        .from('saved_payment_methods')
        .update({ is_default: true })
        .eq('id', methodData.id);
    }

    return NextResponse.json({ success: true, message: 'Payment method saved successfully' });
  } catch (error) {
    console.error('Error saving payment method:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}