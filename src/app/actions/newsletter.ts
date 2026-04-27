'use server';

/**
 * Subscribes an email to the Grain & Grit newsletter via Beehiiv.
 *
 * Required environment variables:
 *   BEEHIIV_API_KEY         — from app.beehiiv.com → Settings → API
 *   BEEHIIV_PUBLICATION_ID  — from app.beehiiv.com → Settings → Publication (looks like pub_xxxxxxxx)
 */
export async function subscribeToNewsletter(email: string) {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address.');
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId  = process.env.BEEHIIV_PUBLICATION_ID;

  // ── Fallback for local dev without Beehiiv keys ───────────────────────
  if (!apiKey || !pubId) {
    console.log(`[Newsletter] No Beehiiv keys set — would have subscribed: ${email}`);
    return { success: true };
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'steadcraft-app',
        utm_medium: 'website',
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('[Newsletter] Beehiiv error:', res.status, text);
    // Don't surface Beehiiv errors to the user — just swallow and succeed
    // (duplicate subscriptions return 400 but that's fine)
    if (res.status !== 400) {
      throw new Error('Could not subscribe at this time. Please try again.');
    }
  }

  return { success: true };
}
