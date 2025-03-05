import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Important Documents | RankMatrix',
  description: 'Important Documents for JoSAA Counselling',
};

const Documents = () => {
  return (
    <FeatureLayout title={'Important Documents'}>
      <Typography>Testing</Typography>
    </FeatureLayout>
  );
};

export default Documents;
