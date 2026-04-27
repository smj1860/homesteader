'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27' as any,
});

/**
 * Creates a Stripe Checkout Session for a subscription or one-time purchase.
 * @param priceId   The Stripe Price ID for the product.
 * @param mode      'subscription' | 'payment'
 * @param withTrial If true, applies a 30-day free trial. No charge until day 31.
 *                  Stripe still collects the card at checkout but does not charge it.
 */
export async function createCheckoutSession(
  priceId: string,
  mode: 'subscription' | 'payment',
  withTrial = false,
) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe Secret Key is not configured.');
  }

  const headerList = await headers();
  const origin = headerList.get('origin');

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode,
      // Trial: collect card now, first charge after 30 days
      ...(withTrial && mode === 'subscription'
        ? {
            subscription_data: {
              trial_period_days: 30,
              trial_settings: {
                end_behavior: { missing_payment_method: 'cancel' },
              },
            },
            payment_method_collection: 'always',
          }
        : {}),
      success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session.');
  }
}
