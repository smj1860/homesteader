import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/ssr';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27' as any,
});

// ── Supabase admin client (service role — never exposed to browser) ──────────
function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
}

// ── Update user premium status by Stripe customer ID or email ────────────────
async function setPremium(
  customerId: string,
  isPremium: boolean,
  trialEndsAt?: number | null,
) {
  const supabase = supabaseAdmin();

  // First try to find user by stripe_customer_id column (fastest)
  // Fall back to looking up the customer email from Stripe → match Supabase auth user
  let userId: string | null = null;

  const { data: byCustomer } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle();

  if (byCustomer?.id) {
    userId = byCustomer.id;
  } else {
    // Retrieve customer from Stripe to get their email
    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
    if (customer.email) {
      const { data: authUser } = await supabase.auth.admin.getUserByEmail(customer.email);
      if (authUser?.user) {
        userId = authUser.user.id;
        // Persist the mapping so future events are instant
        await supabase
          .from('users')
          .update({ stripe_customer_id: customerId })
          .eq('id', userId);
      }
    }
  }

  if (!userId) {
    console.error('Webhook: could not resolve user for customer', customerId);
    return;
  }

  const update: Record<string, unknown> = { is_premium: isPremium };
  if (trialEndsAt !== undefined) {
    update.trial_ends_at = trialEndsAt ? new Date(trialEndsAt * 1000).toISOString() : null;
  }

  const { error } = await supabase.from('users').update(update).eq('id', userId);
  if (error) console.error('Webhook: supabase update failed', error);
}

// ── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ── Trial or direct subscription started ───────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.customer) {
          // Fetch subscription to check trial status
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          const trialEnd = sub.trial_end ?? null;
          await setPremium(session.customer as string, true, trialEnd);
        }
        break;
      }

      // ── Subscription updated (trial → active, cancelled, paused, etc.) ─
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const isActive = sub.status === 'active' || sub.status === 'trialing';
        await setPremium(
          sub.customer as string,
          isActive,
          sub.trial_end,
        );
        break;
      }

      // ── Subscription ended / cancelled / trial cancelled ───────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await setPremium(sub.customer as string, false, null);
        break;
      }

      // ── Payment failed — grace period handled by Stripe dunning ────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        // Only revoke after final failure (attempt_count is configurable in Stripe)
        if ((invoice as any).attempt_count >= 3 && invoice.customer) {
          await setPremium(invoice.customer as string, false, null);
        }
        break;
      }

      default:
        // Unhandled event — return 200 so Stripe doesn't retry
        break;
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// Stripe sends raw bodies — disable Next.js body parsing
export const config = { api: { bodyParser: false } };
