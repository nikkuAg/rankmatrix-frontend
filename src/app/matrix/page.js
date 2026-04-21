import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

const PAGE_URL = '/matrix';
const DESCRIPTION =
  'Prediction Matrix — a visual grid that cross-references colleges, branches, and categories to help you decide your JoSAA choice order. Coming soon on RankMatrix.';

export const metadata = {
  title: 'Prediction Matrix',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Prediction Matrix — JoSAA Decision Helper',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prediction Matrix | RankMatrix',
    description: DESCRIPTION,
  },
};

const Matrix = () => {
  return (
    <FeatureLayout title={'Prediction Matrix'}>
      <Typography>Coming Soon</Typography>
    </FeatureLayout>
  );
};

export default Matrix;
