'use server';

/**
 * Subscribes an email to the Rootstock newsletter.
 */
export async function subscribeToNewsletter(email: string) {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address.');
  }

  // NOTE: This server action is mocked for the MVP. 
  // In a production environment, you would use a service like Resend or Mailchimp via their Fetch API. 
  console.log(`Newsletter subscription received for: ${email}`);
  
  // Simulation of successful registration
  return { success: true };
}
