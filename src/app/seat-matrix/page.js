import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { SeatList } from '@/components/SeatList';

export const metadata = {
  title: 'Seat Matrix | RankMatrix',
  description: 'Seat Matrix for all colleges and branches participating in JoSAA counselling',
};

const SeatMatrix = () => {
  return (
    <FeatureLayout title={'Seat Matrix'}>
      <SeatList />
    </FeatureLayout>
  );
};

export default SeatMatrix;
