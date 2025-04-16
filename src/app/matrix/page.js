import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Prediction Matrix | RankMatrix',
  description:
    'Prediction Matrix is a feature to provided you a various kind of matrix to help you is making decision for JoSAA counselling',
};

const Matrix = () => {
  return (
    <FeatureLayout title={'Prediction Matrix'}>
      <Typography>Coming Soon</Typography>
    </FeatureLayout>
  );
};

export default Matrix;
