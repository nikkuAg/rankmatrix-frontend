import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

const PAGE_URL = '/test-choices';
const DESCRIPTION =
  'Dry-run your JoSAA choice list before you submit. Paste in your preferences and see a colour-coded projection of which ones you are likely to get based on historical cutoffs. Coming soon on RankMatrix.';

export const metadata = {
  title: 'Test Your JoSAA Choices',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Test Your JoSAA Choices — Dry-run Your Choice Order',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Your JoSAA Choices | RankMatrix',
    description: DESCRIPTION,
  },
};

const TestChoice = () => {
  return (
    <FeatureLayout title={'Test Your JoSAA Choices'}>
      <Typography>Coming soon</Typography>
    </FeatureLayout>
  );
};

export default TestChoice;
