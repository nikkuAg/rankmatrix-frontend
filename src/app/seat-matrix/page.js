import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { SeatList } from '@/components/SeatList';

export const metadata = {
  title: 'JoSAA Seat Matrix – Compare Seats Across Years | RankMatrix',
  description:
    'Analyze seat availability across institutes and branches over different years in JoSAA counselling.',
  openGraph: {
    title: 'JoSAA Seat Matrix – Year-wise Seat Availability',
    description:
      'Check seat distribution across IITs, NITs, IIITs, and GFTIs from past JoSAA counselling rounds.',
    url: 'https://rankmatrix.in/seat-matrix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Seat Matrix Data',
    description: 'Get detailed seat availability data for each college and branch in JoSAA.',
  },
  keywords: [
    'JoSAA Seat Matrix',
    'JoSAA Seats Year Wise',
    'College Seat Availability',
    'Engineering Admission Stats',
  ],
};

const SeatMatrix = () => {
  return (
    <FeatureLayout title={'Seat Matrix'}>
      <SeatList />
    </FeatureLayout>
  );
};

export default SeatMatrix;
