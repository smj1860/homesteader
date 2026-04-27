'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27' as any,
});

/**
 * Creates a Stripe Checkout Session for a subscription or one-time purchase.
 * @param priceId    The Stripe Price ID.
 * @param mode       'subscription' | 'payment'
 * @param withTrial  If true, applies a 30-day free trial. Card collected but not charged until day 31.
 */
export async function createCheckoutSession(
  priceId: string,
  mode: 'subscription' | 'payment',
  withTrial = false,
) {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Stripe Secret Key is not configured.');

  const headerList = await headers();
  const origin = headerList.get('origin');

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode,
    ...(withTrial && mode === 'subscription'
      ? {
          subscription_data: {
            trial_period_days: 30,
            trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
          },
          payment_method_collection: 'always',
        }
      : {}),
    success_url: `${origin}/account?upgraded=true`,
    cancel_url: `${origin}/pricing`,
  });

  return { url: session.url };
}

/**
 * Creates a Stripe Billing Portal session so users can manage/cancel their subscription.
 * @param customerId  The Stripe customer ID stored on the user's row.
 */
export async function createBillingPortalSession(customerId: string) {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Stripe Secret Key is not configured.');

  const headerList = await headers();
  const origin = headerList.get('origin');

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/account`,
  });

  return { url: session.url };
}
