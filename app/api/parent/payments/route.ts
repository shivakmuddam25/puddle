import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper to detect card brand
function detectCardBrand(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.startsWith('4')) return 'Visa';
  if (cleaned.startsWith('5')) return 'Mastercard';
  if (cleaned.startsWith('3')) return 'Amex';
  if (cleaned.startsWith('6')) return 'Discover';
  return 'Card';
}

// GET: Fetch payments and saved payment methods
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Fetch payments
    const { data: payments } = await supabaseAdmin
      .from('payments')
      .select(`
        *,
        student_profiles (
          users (
            display_name
          )
        )
      `)
      .eq('parent_id', parentProfile.id)
      .order('payment_date', { ascending: false })
      .limit(20);

    // Fetch saved payment methods
    const { data: savedMethods } = await supabaseAdmin
      .from('saved_payment_methods')
      .select('*')
      .eq('parent_id', parentProfile.id)
      .order('is_default', { ascending: false });

    // Transform payments to include child name
    const transformedPayments = (payments || []).map(payment => ({
      ...payment,
      child_name: payment.student_profiles?.users?.display_name || null
    }));

    return NextResponse.json({
      payments: transformedPayments,
      savedMethods: savedMethods || []
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Create a new payment and handle subscription
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const {
      amount,
      childId,
      description,
      paymentMethod,
      saveMethod,
      upiId,
      cardDetails,
      planId,
      billingCycle,
      gradeLevel,
      isRenewal
    } = await req.json();

    console.log('Payment request:', { amount, childId, description, paymentMethod, planId, billingCycle, gradeLevel, isRenewal });

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Get parent profile
    const { data: parentProfile, error: parentError } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();

    if (parentError || !parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Generate invoice number and transaction ID
    const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Create payment record
    const { data: payment, error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        parent_id: parentProfile.id,
        student_id: childId || null,
        amount: amount,
        currency: 'INR',
        description: description || 'Course Payment',
        status: 'completed',
        invoice_number: invoiceNumber,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        payment_date: new Date().toISOString()
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Payment creation error:', paymentError);
      return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
    }

    // Handle subscription (new or renewal)
    let subscription = null;
    let isNewSubscription = true;

    if (planId && childId && gradeLevel && billingCycle) {
      console.log('Processing subscription for:', { childId, planId, gradeLevel, billingCycle, isRenewal });

      try {
        // Check for existing active subscription for this specific grade
        const { data: existingSubscription, error: existingError } = await supabaseAdmin
          .from('course_subscriptions')
          .select('*')
          .eq('student_id', childId)
          .eq('grade_level', gradeLevel)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        const now = new Date();

        if (existingSubscription && existingSubscription.id && (isRenewal === true || existingSubscription.is_active === true)) {
          // RENEWAL: Extend existing subscription
          const currentEndDate = new Date(existingSubscription.end_date);
          const currentEndDateValid = !isNaN(currentEndDate.getTime());

          let newEndDate: Date;
          if (currentEndDateValid && currentEndDate > now) {
            newEndDate = new Date(currentEndDate);
          } else {
            newEndDate = new Date(now);
          }

          if (billingCycle === 'monthly') {
            newEndDate.setDate(newEndDate.getDate() + 30);
          } else {
            newEndDate.setFullYear(newEndDate.getFullYear() + 1);
          }

          const newEndDateISO = newEndDate.toISOString();

          const { data: updatedSubscription, error: updateError } = await supabaseAdmin
            .from('course_subscriptions')
            .update({
              end_date: newEndDateISO,
              updated_at: now.toISOString(),
              auto_renew: true,
              payment_id: payment.id
            })
            .eq('id', existingSubscription.id)
            .select()
            .single();

          if (!updateError && updatedSubscription) {
            subscription = updatedSubscription;
            isNewSubscription = false;
            console.log('Subscription renewed:', { id: subscription.id, new_end_date: newEndDateISO });
          }
        }

        // If no existing subscription or renewal failed, create new subscription
        if (!subscription) {
          const startDate = new Date();
          const endDate = new Date();
          if (billingCycle === 'monthly') {
            endDate.setDate(endDate.getDate() + 30);
          } else {
            endDate.setFullYear(endDate.getFullYear() + 1);
          }

          const { data: newSubscription, error: subError } = await supabaseAdmin
            .from('course_subscriptions')
            .insert({
              student_id: childId,
              plan_id: planId,
              grade_level: gradeLevel,
              billing_cycle: billingCycle,
              start_date: startDate.toISOString(),
              end_date: endDate.toISOString(),
              payment_id: payment.id,
              is_active: true,
              auto_renew: true,
              completed: false,
              was_auto_renewed: false
            })
            .select()
            .single();

          if (!subError && newSubscription) {
            subscription = newSubscription;
            console.log('New subscription created:', { id: subscription.id, grade_level: gradeLevel });
          } else if (subError) {
            console.error('Subscription creation error:', subError);
          }
        }

        // Update student profile if subscription created
        if (subscription) {
          await supabaseAdmin
            .from('student_profiles')
            .update({
              is_active: true,
              subscription_status: 'active',
              updated_at: now.toISOString()
            })
            .eq('id', childId);

          const { data: studentProfile } = await supabaseAdmin
            .from('student_profiles')
            .select('user_id')
            .eq('id', childId)
            .single();

          if (studentProfile) {
            await supabaseAdmin
              .from('users')
              .update({ is_active: true, updated_at: now.toISOString() })
              .eq('id', studentProfile.user_id);
          }
        }
      } catch (subscriptionError) {
        console.error('Subscription processing error:', subscriptionError);
        // Continue – we still return success for the payment
      }
    }

    // Save payment method if requested
    if (saveMethod) {
      try {
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

        if (!existingMethod) {
          const { count } = await supabaseAdmin
            .from('saved_payment_methods')
            .select('*', { count: 'exact', head: true })
            .eq('parent_id', parentProfile.id);

          const methodData: any = {
            parent_id: parentProfile.id,
            payment_type: paymentMethod,
            is_default: count === 0
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

          const { error: saveError } = await supabaseAdmin
            .from('saved_payment_methods')
            .insert(methodData);
          if (saveError) console.error('Error saving payment method:', saveError);
        }
      } catch (saveMethodError) {
        console.error('Save method error:', saveMethodError);
      }
    }

    // Build response
    let successMessage = 'Payment successful! Transaction recorded.';
    if (subscription) {
      if (!isNewSubscription) {
        successMessage = `Payment successful! Subscription renewed until ${new Date(subscription.end_date).toLocaleDateString()}`;
      } else {
        successMessage = `Payment successful! Subscription activated until ${new Date(subscription.end_date).toLocaleDateString()}`;
      }
    }

    return NextResponse.json({
      success: true,
      message: successMessage,
      payment: {
        id: payment.id,
        amount: payment.amount,
        description: payment.description,
        status: payment.status,
        invoice_number: payment.invoice_number,
        transaction_id: payment.transaction_id,
        payment_method: payment.payment_method
      },
      subscription: subscription ? {
        id: subscription.id,
        grade_level: subscription.grade_level,
        start_date: subscription.start_date,
        end_date: subscription.end_date,
        billing_cycle: subscription.billing_cycle,
        is_renewal: !isNewSubscription
      } : null
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: Set default payment method
export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { methodId, setDefault } = await req.json();

    if (!methodId || !setDefault) {
      return NextResponse.json({ error: 'Method ID required' }, { status: 400 });
    }

    // Get parent profile
    const { data: parentProfile } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();

    if (!parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Verify method belongs to parent
    const { data: method } = await supabaseAdmin
      .from('saved_payment_methods')
      .select('id')
      .eq('id', methodId)
      .eq('parent_id', parentProfile.id)
      .single();

    if (!method) {
      return NextResponse.json({ error: 'Payment method not found' }, { status: 404 });
    }

    // Remove default from all methods
    await supabaseAdmin
      .from('saved_payment_methods')
      .update({ is_default: false })
      .eq('parent_id', parentProfile.id);

    // Set the selected method as default
    const { error: updateError } = await supabaseAdmin
      .from('saved_payment_methods')
      .update({ is_default: true })
      .eq('id', methodId)
      .eq('parent_id', parentProfile.id);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to set default payment method' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating payment method:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Remove saved payment method
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { searchParams } = new URL(req.url);
    const methodId = searchParams.get('id');

    if (!methodId) {
      return NextResponse.json({ error: 'Method ID required' }, { status: 400 });
    }

    // Get parent profile
    const { data: parentProfile } = await supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', decoded.userId || decoded.sub)
      .single();

    if (!parentProfile) {
      return NextResponse.json({ error: 'Parent profile not found' }, { status: 404 });
    }

    // Verify method belongs to parent
    const { data: method } = await supabaseAdmin
      .from('saved_payment_methods')
      .select('id')
      .eq('id', methodId)
      .eq('parent_id', parentProfile.id)
      .single();

    if (!method) {
      return NextResponse.json({ error: 'Payment method not found' }, { status: 404 });
    }

    // Delete the method
    const { error: deleteError } = await supabaseAdmin
      .from('saved_payment_methods')
      .delete()
      .eq('id', methodId)
      .eq('parent_id', parentProfile.id);

    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete payment method' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting payment method:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}