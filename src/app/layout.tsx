import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseProvider } from '@/supabase';
import { SustainDataProvider } from '@/hooks/sustain-data-provider';

export const metadata: Metadata = {
  title: {
    default: 'SteadCraft — The Homestead Is Our Craft',
    template: '%s | SteadCraft',
  },
  description:
    'AI-powered project guides for homesteaders and DIYers. Build, grow, and repair with confidence — step-by-step instructions for every skill level.',
  keywords: [
    'homesteading', 'DIY', 'project guides', 'homestead',
    'self-sufficiency', 'farming', 'building', 'repair', 'AI assistant',
  ],
  authors: [{ name: 'SteadCraft' }],
  creator: 'SteadCraft',
  metadataBase: new URL('https://thesteadcraft.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thesteadcraft.com',
    siteName: 'SteadCraft',
    title: 'SteadCraft — The Homestead Is Our Craft',
    description: 'AI-powered project guides for homesteaders and DIYers. Build, grow, and repair with confidence.',
    images: [{ url: '/android-chrome-512x512.png', width: 512, height: 512, alt: 'SteadCraft Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'SteadCraft — The Homestead Is Our Craft',
    description: 'AI-powered project guides for homesteaders and DIYers.',
    images: ['/android-chrome-512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png',  sizes: '16x16',   type: 'image/png' },
      { url: '/favicon-32x32.png',  sizes: '32x32',   type: 'image/png' },
      { url: '/favicon-48x48.png',  sizes: '48x48',   type: 'image/png' },
      { url: '/favicon-96x96.png',  sizes: '96x96',   type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/favicon-32x32.png' }],
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F3EB' },
    { media: '(prefers-color-scheme: dark)',  color: '#264228' },
  ],
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
        <meta name="msapplication-TileColor" content="#264228" />
        <meta name="msapplication-TileImage" content="/favicon-256x256.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
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
