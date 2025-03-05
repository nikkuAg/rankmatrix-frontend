import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Seat Matrix | RankMatrix',
  description: 'Seat Matrix for all colleges and branches participating in JoSAA counselling',
};

const SeatMatrix = () => {
  return (
    <FeatureLayout title={'Seat Matrix'}>
      <Typography>Testing</Typography>
    </FeatureLayout>
  );
};

export default SeatMatrix;
