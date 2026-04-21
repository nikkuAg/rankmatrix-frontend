import { ImageResponse } from 'next/og';

export const alt = 'RankMatrix — Free JEE college predictor with official JoSAA data';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f766e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#14b8a6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -0.5 }}>RankMatrix</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            Free JEE college predictor.
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              color: '#cbd5e1',
              lineHeight: 1.2,
              maxWidth: 1000,
            }}
          >
            Built on official JoSAA data.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', gap: 20 }}>
            <span>No signup</span>
            <span>·</span>
            <span>No phone or email</span>
            <span>·</span>
            <span>Zero marketing spam</span>
          </div>
          <div style={{ color: '#5eead4', fontWeight: 600 }}>rankmatrix.in</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
