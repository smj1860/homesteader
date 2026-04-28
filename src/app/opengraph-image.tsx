import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SteadCraft — The Homestead Is Our Craft'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F7F3EB',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Background texture — subtle radial gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 60% 40%, rgba(38,66,40,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Top rule */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            right: 80,
            height: 2,
            backgroundColor: '#A88032',
            opacity: 0.6,
          }}
        />

        {/* Bottom rule */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            right: 80,
            height: 2,
            backgroundColor: '#A88032',
            opacity: 0.6,
          }}
        />

        {/* Corner diamonds */}
        {[
          { top: 52, left: 72 },
          { top: 52, right: 72 },
          { bottom: 52, left: 72 },
          { bottom: 52, right: 72 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              backgroundColor: '#A88032',
              transform: 'rotate(45deg)',
              ...pos,
            }}
          />
        ))}

        {/* Icon — leaf mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 96,
            height: 96,
            borderRadius: 24,
            backgroundColor: '#264228',
            marginBottom: 32,
          }}
        >
          {/* Simple leaf SVG inline */}
          <svg
            width="54"
            height="54"
            viewBox="0 0 24 24"
            fill="#F7F3EB"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2C12 3 9 3 7 5l-.5.5C6 6 5.5 7 5.5 7.5S5.75 8.5 6 9c.48.78 1 1 1 1s.5-2 2.5-3c1.5-1 3-1 5-1s3 .5 4.5 2C17 8 17 8 17 8z" />
          </svg>
        </div>

        {/* EST */}
        <div
          style={{
            fontSize: 14,
            letterSpacing: '0.3em',
            color: '#3C5E40',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          EST. MMXXV
        </div>

        {/* Main wordmark */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#264228',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          STEADCRAFT
        </div>

        {/* Gold rule under wordmark */}
        <div
          style={{
            width: 480,
            height: 2,
            backgroundColor: '#A88032',
            marginBottom: 20,
            opacity: 0.8,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: '#3C5E40',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          The Homestead Is Our Craft
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            fontSize: 16,
            color: '#A88032',
            letterSpacing: '0.1em',
          }}
        >
          thesteadcraft.com
        </div>
      </div>
    ),
    { ...size }
  )
}
