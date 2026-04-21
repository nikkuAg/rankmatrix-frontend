import React from 'react';
import { RankList } from '@/components/RankList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

const PAGE_URL = '/ranks';
const DESCRIPTION =
  'JoSAA opening and closing ranks for every college, branch, category, and seat pool — year-wise and round-wise. Plan your JoSAA choices with real historical cutoffs sourced from the official JoSAA website. Free, no signup.';

export const metadata = {
  title: 'JoSAA Opening & Closing Ranks — Year & Round Wise',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA opening rank',
    'JoSAA closing rank',
    'JEE Main cutoff rank',
    'JoSAA round wise ranks',
    'JEE Advanced cutoff',
    'JoSAA previous year cutoff',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Opening & Closing Ranks — Historical Cutoff Trends',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Opening & Closing Ranks | RankMatrix',
    description: DESCRIPTION,
  },
};

const Ranks = () => {
  return (
    <FeatureLayout title={'Opening & Closing Ranks'}>
      <RankList />
    </FeatureLayout>
  );
};

export default Ranks;
