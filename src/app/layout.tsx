import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseProvider } from '@/supabase';
import { SustainDataProvider } from '@/hooks/sustain-data-provider';

// ── Viewport (themeColor moved here per Next.js 14+ recommendation) ──────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F3EB' },
    { media: '(prefers-color-scheme: dark)',  color: '#264228' },
  ],
};

// ── Site-wide metadata ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  'SteadCraft — The Homestead Is Our Craft',
    template: '%s | SteadCraft',
  },
  description:
    'AI-powered project guides for homesteaders and DIYers. Build, grow, and repair with confidence — step-by-step instructions for every skill level.',
  keywords: [
    'homesteading', 'DIY', 'project guides', 'homestead',
    'self-sufficiency', 'farming', 'building', 'repair', 'AI assistant',
    'suburban homesteading', 'off-grid', 'gardening', 'food preservation',
  ],
  authors:  [{ name: 'SteadCraft' }],
  creator:  'SteadCraft',
  metadataBase: new URL('https://thesteadcraft.com'),

  // ── Open Graph ──────────────────────────────────────────────────────────────
  // Points to opengraph-image.tsx which renders at 1200×630 — correct for all
  // social platforms. The android-chrome PNG is intentionally NOT used here
  // because it is 512×512 and will produce a blurry/cropped card preview.
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://thesteadcraft.com',
    siteName:    'SteadCraft',
    title:       'SteadCraft — The Homestead Is Our Craft',
    description: 'AI-powered project guides for homesteaders and DIYers. Build, grow, and repair with confidence.',
    images: [
      {
        url:    '/opengraph-image',
        width:  1200,
        height: 630,
        alt:    'SteadCraft — The Homestead Is Our Craft',
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  // summary_large_image shows the full 1200×630 banner instead of a tiny icon.
  twitter: {
    card:        'summary_large_image',
    title:       'SteadCraft — The Homestead Is Our Craft',
    description: 'AI-powered project guides for homesteaders and DIYers. Build, grow, and repair with confidence.',
    images:      ['/opengraph-image'],
  },

  // ── Icons ───────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon-16x16.png',   sizes: '16x16',   type: 'image/png' },
      { url: '/favicon-32x32.png',   sizes: '32x32',   type: 'image/png' },
      { url: '/favicon-48x48.png',   sizes: '48x48',   type: 'image/png' },
      { url: '/favicon-96x96.png',   sizes: '96x96',   type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/favicon-32x32.png' }],
  },

  manifest: '/site.webmanifest',
};

// ── WebSite JSON-LD schema ────────────────────────────────────────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:        'SteadCraft',
  url:         'https://thesteadcraft.com',
  description: 'AI-powered project guides for homesteaders and DIYers.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type':       'EntryPoint',
      urlTemplate:   'https://thesteadcraft.com/projects?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="msapplication-TileColor"  content="#264228" />
        <meta name="msapplication-TileImage"  content="/favicon-256x256.png" />
        <meta name="msapplication-config"     content="/browserconfig.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <SupabaseProvider>
          <SustainDataProvider>
            {children}
            <Toaster />
          </SustainDataProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
