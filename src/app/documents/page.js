import React from 'react';
import { Typography } from '@mui/material';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

const PAGE_URL = '/documents';
const DESCRIPTION =
  'Key documents, forms, and official notices every JoSAA candidate should keep handy — sourced from the official JoSAA website. Coming soon on RankMatrix.';

export const metadata = {
  title: 'JoSAA Counselling Documents',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Counselling Documents',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Counselling Documents | RankMatrix',
    description: DESCRIPTION,
  },
};

const Documents = () => {
  return (
    <FeatureLayout title={'Important Documents'}>
      <Typography>Coming soon</Typography>
    </FeatureLayout>
  );
};

export default Documents;
