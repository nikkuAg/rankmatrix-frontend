import React from 'react';
import { RankList } from '@/components/RankList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Opening and Closing Ranks for JoSAA | Year & Round Wise | RankMatrix',
  description:
    'Explore opening and closing ranks for all branches and colleges in JoSAA from multiple years and rounds.',
  openGraph: {
    title: 'JoSAA Cutoff Ranks – Year & Round Wise Trends',
    description:
      'Visualize cutoff trends and plan your JoSAA choices smartly using past opening and closing ranks.',
    url: 'https://rankmatrix.in/ranks',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Cutoff Rank Trends',
    description: 'Get historical data of opening and closing ranks for JoSAA counselling.',
  },
  keywords: [
    'JoSAA Opening Rank',
    'JoSAA Closing Rank',
    'Cutoff Rank JEE Main',
    'JoSAA Round Wise Ranks',
    'JEE Advanced Cutoff',
  ],
};

const Ranks = () => {
  return (
    <FeatureLayout title={'Opening & Closing Ranks'}>
      <RankList />
    </FeatureLayout>
  );
};

export default Ranks;
