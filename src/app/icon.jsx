import { ImageResponse } from 'next/og';
import { BrandMark } from '@/components/BrandMark';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2350d8',
        }}
      >
        <BrandMark size={192} />
      </div>
    ),
    { ...size },
  );
}
