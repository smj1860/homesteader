"use client"

import { Navigation } from "@/components/Navigation"
import { Leaf } from "lucide-react"
import Link from "next/link"

const LAST_UPDATED = "April 26, 2025"
const CONTACT_EMAIL = "support@rootstock.app"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-3xl px-4 pt-12">

        {/* Header */}
        <div className="mb-12 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5 fill-current" />
            </div>
            <span className="font-headline text-xl font-bold text-primary">Rootstock</span>
          </div>
          <h1 className="font-headline text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          <div className="h-px w-full bg-border/40" />
        </div>

        <div className="space-y-10 text-foreground/80">

          <section className="space-y-3 text-sm leading-relaxed">
            <p>
              Rootstock is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using Rootstock, you agree to the practices described here.
            </p>
          </section>

          <Section title="1. Information We Collect">
            <p><strong className="text-foreground">Account information.</strong> When you create an account, we collect your email address and a hashed version of your password. You may optionally provide a username and ZIP code.</p>
            <p><strong className="text-foreground">Usage data.</strong> We collect information about how you interact with Rootstock, including the projects you generate, categories you browse, and features you use. This helps us improve the service.</p>
            <p><strong className="text-foreground">Build log content.</strong> When you create a build log entry, we store the note text, any photos you upload, and whether you marked the entry public or private.</p>
            <p><strong className="text-foreground">Inventory data.</strong> Items you add to your homestead inventory are stored in your account.</p>
            <p><strong className="text-foreground">Payment information.</strong> If you subscribe to Rootstock Pro, payment is handled by Stripe. We do not store your credit card number, expiry date, or CVV. We receive confirmation of successful payments and your subscription status from Stripe.</p>
            <p><strong className="text-foreground">Anonymous sessions.</strong> If you use Rootstock as a guest, we assign a temporary anonymous session. No personally identifiable information is collected unless you create a full account.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and improve the Rootstock service.</li>
              <li>Personalise your experience, including displaying your inventory when generating project guides.</li>
              <li>Process payments and manage your subscription.</li>
              <li>Send transactional emails such as password resets (we do not send marketing emails unless you subscribe to the Homestead Weekly newsletter).</li>
              <li>Monitor for abuse, fraud, and security threats.</li>
              <li>Analyse aggregate usage patterns to improve AI output quality and app features.</li>
            </ul>
            <p>We do not sell your personal data to third parties. We do not use your data to train AI models.</p>
          </Section>

          <Section title="3. AI Processing">
            <p>
              When you generate a project guide or use the inventory detection feature, your inputs — including any photos you upload and your project description — are sent to third-party AI providers (currently Groq and Google AI) to generate a response. These providers process your data under their own privacy policies and terms. We encourage you to review them:
            </p>
            <ul>
              <li>
                <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                  Groq Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                  Google Privacy Policy
                </a>
              </li>
            </ul>
            <p>
              We do not send your full account profile or personally identifiable information to AI providers. Only the content of your specific request (project description, photo, or question) is transmitted.
            </p>
          </Section>

          <Section title="4. Data Storage and Security">
            <p>
              Your data is stored in Supabase, a managed database platform. Data is encrypted at rest and in transit using industry-standard TLS. Authentication is handled by Supabase Auth with secure password hashing.
            </p>
            <p>
              Access to your data within our database is governed by Row Level Security (RLS) policies — meaning your data can only be accessed by your own authenticated session, not by other users.
            </p>
            <p>
              No security system is perfect. While we take reasonable measures to protect your data, we cannot guarantee absolute security. If you believe your account has been compromised, contact us immediately.
            </p>
          </Section>

          <Section title="5. Photos and Images">
            <p>
              Photos you upload for inventory detection or build log entries are stored as part of your account data. If a build log entry is marked public, its associated photo will be visible to other users and anyone with the shareable link.
            </p>
            <p>
              Photos submitted for AI inventory detection are sent to our AI providers for analysis and are not permanently stored by those providers beyond the scope of the individual request.
            </p>
          </Section>

          <Section title="6. Public Build Logs">
            <p>
              If you mark a build log entry as public, the following information becomes visible to all Rootstock users and anyone with the shareable link: your username, the project title, your note, any attached photo, the category and subcategory, and the date posted.
            </p>
            <p>
              Your email address is never displayed publicly. You can change a public log back to private at any time from the Project Journal view.
            </p>
          </Section>

          <Section title="7. Newsletter">
            <p>
              If you subscribe to the Homestead Weekly newsletter via the sign-up form on our home page, we collect your email address for that purpose only. You can unsubscribe at any time using the link in any newsletter email.
            </p>
          </Section>

          <Section title="8. Cookies and Local Storage">
            <p>
              Rootstock uses browser local storage and session storage to maintain your login session and temporarily store generated project data within a session. We do not use third-party advertising cookies or tracking pixels.
            </p>
          </Section>

          <Section title="9. Third-Party Services">
            <p>Rootstock uses the following third-party services, each with their own privacy practices:</p>
            <ul>
              <li><strong className="text-foreground">Supabase</strong> — database and authentication</li>
              <li><strong className="text-foreground">Vercel</strong> — hosting and edge infrastructure</li>
              <li><strong className="text-foreground">Stripe</strong> — payment processing</li>
              <li><strong className="text-foreground">Groq</strong> — AI inference (primary)</li>
              <li><strong className="text-foreground">Google AI</strong> — AI inference (fallback)</li>
            </ul>
          </Section>

          <Section title="10. Data Retention">
            <p>
              We retain your account data for as long as your account is active. If you delete your account, your personal data will be removed from our database within 30 days. Public build log entries you have shared may be retained in anonymised form for a period after deletion.
            </p>
            <p>
              You may request deletion of your account and associated data at any time by emailing us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline hover:text-primary/80">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>
              Rootstock is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="12. Your Rights">
            <p>Depending on your location, you may have rights including:</p>
            <ul>
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to correct inaccurate data.</li>
              <li>The right to request deletion of your data.</li>
              <li>The right to data portability.</li>
              <li>The right to object to or restrict certain processing.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline hover:text-primary/80">
                {CONTACT_EMAIL}
              </a>. We will respond within 30 days.
            </p>
          </Section>

          <Section title="13. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the &quot;Last updated&quot; date at the top of this page. Continued use of Rootstock after changes are posted constitutes your acceptance of the revised policy.
            </p>
          </Section>

          <Section title="14. Contact">
            <p>
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline hover:text-primary/80">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </Section>

          <div className="h-px w-full bg-border/40 pt-4" />
          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>Rootstock &mdash; {LAST_UPDATED}</span>
            <Link href="/terms" className="text-primary hover:underline">Terms of Service →</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-headline text-lg font-bold text-foreground">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-foreground/80">{children}</div>
    </section>
  )
}