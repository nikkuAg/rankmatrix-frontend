import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'JoSAA Choices | RankMatrix',
  description:
    'Before submitting to JoSAA, try out test your josaa choices, and this will provide you a color code list of which choice you can get as per past trends.',
};

const TestChoice = () => {
  return (
    <FeatureLayout title={'Test Your JoSAA Choices'}>
      <Typography>Testing</Typography>
    </FeatureLayout>
  );
};

export default TestChoice;
