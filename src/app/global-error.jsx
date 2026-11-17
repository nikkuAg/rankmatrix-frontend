'use client';

import Link from 'next/link';

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#f5f7fb',
          color: '#0f1f3a',
          fontFamily: 'system-ui,sans-serif',
        }}
      >
        <main style={{ maxWidth: 680, margin: '15vh auto', padding: 32 }}>
          <p style={{ color: '#2350d8' }}>RankMatrix</p>
          <h1>Something interrupted this page.</h1>
          <p>Please try again. Your saved choices remain in this browser.</p>
          <button
            onClick={reset}
            style={{
              padding: '12px 20px',
              background: '#2350d8',
              color: '#ffffff',
              border: 0,
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          <p>
            <Link prefetch={false} href="/" style={{ color: '#2350d8' }}>
              Return home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
