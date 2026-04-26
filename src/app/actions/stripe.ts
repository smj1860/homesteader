
'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27' as any,
});

/**
 * Creates a Stripe Checkout Session for a subscription or one-time purchase.
 * @param priceId The Stripe Price ID for the product.
 * @param mode 'subscription' for recurring plans or 'payment' for single credits.
 */
export async function createCheckoutSession(priceId: string, mode: 'subscription' | 'payment') {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe Secret Key is not configured.');
  }

  const headerList = await headers();
  const origin = headerList.get('origin');

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session.');
  }
}
