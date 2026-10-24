'use client';

import Link from 'next/link';

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#141816',
          color: '#f1f0e8',
          fontFamily: 'system-ui,sans-serif',
        }}
      >
        <main style={{ maxWidth: 680, margin: '15vh auto', padding: 32 }}>
          <p style={{ color: '#dcf68b' }}>RankMatrix</p>
          <h1>Something interrupted this page.</h1>
          <p>Please try again. Your saved choices remain in this browser.</p>
          <button
            onClick={reset}
            style={{
              padding: '12px 20px',
              background: '#dcf68b',
              color: '#141816',
              border: 0,
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          <p>
            <Link prefetch={false} href="/" style={{ color: '#dcf68b' }}>
              Return home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
