import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { SeatList } from '@/components/SeatList';

const PAGE_URL = '/seat-matrix';
const DESCRIPTION =
  'JoSAA seat matrix for every year — how many seats each college and branch offers across categories and seat pools (Open, OBC-NCL, SC, ST, EWS, Female-only). Official JoSAA data, free to explore, no signup needed.';

export const metadata = {
  title: 'JoSAA Seat Matrix — Year-wise Seat Availability',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA seat matrix',
    'JoSAA seats year wise',
    'college seat availability',
    'JEE engineering admission seats',
    'JoSAA category wise seats',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Seat Matrix — Year-wise Seat Availability',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Seat Matrix | RankMatrix',
    description: DESCRIPTION,
  },
};

const SeatMatrix = () => {
  return (
    <FeatureLayout title={'Seat Matrix'}>
      <SeatList />
    </FeatureLayout>
  );
};

export default SeatMatrix;
