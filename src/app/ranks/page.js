import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Opening & Closing Ranks | RankMatrix',
  description:
    'Opening & Closing Ranks for all colleges and branches participating in JoSAA counselling',
};

const Ranks = () => {
  return (
    <FeatureLayout title={'Opening & Closing Ranks'}>
      <Typography>Testing</Typography>
    </FeatureLayout>
  );
};

export default Ranks;
