import { ImageResponse } from 'next/og';
import { BrandMark } from '@/components/BrandMark';

export const alt = 'RankMatrix: free JEE college & branch predictor with official JoSAA data';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Manrope, the site font, fetched as TTF (the format the image renderer reads).
// If Google Fonts is unreachable the image still renders in the default font.
async function manrope(weight) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return { name: 'Manrope', data: await (await fetch(url)).arrayBuffer(), weight };
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const fonts = (await Promise.all([500, 700].map(manrope))).filter(Boolean);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#2350d8',
          color: '#ffffff',
          fontFamily: fonts.length ? 'Manrope' : 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <BrandMark size={76} />
          <div style={{ fontSize: 44, fontWeight: 700 }}>RankMatrix</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, maxWidth: 1000 }}>
            Free JEE college &amp; branch predictor.
          </div>
          <div style={{ fontSize: 40, fontWeight: 500, color: '#dce6ff', lineHeight: 1.25 }}>
            Built on official JoSAA data.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 28,
            borderTop: '2px solid rgba(255, 255, 255, 0.35)',
            fontSize: 28,
            color: '#dce6ff',
          }}
        >
          <div style={{ display: 'flex' }}>No signup. No phone number or email.</div>
          <div style={{ color: '#ffffff', fontWeight: 700 }}>rankmatrix.in</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
