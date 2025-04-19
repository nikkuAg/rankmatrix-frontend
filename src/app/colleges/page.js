import React from 'react';
import { CollegeList } from '@/components/CollegeList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'List of JoSAA Participating Colleges – RankMatrix',
  description:
    'Browse the complete list of colleges participating in JoSAA counselling including IITs, NITs, IIITs, and GFTIs.',
  openGraph: {
    title: 'JoSAA Participating Colleges – Explore All Institutes',
    description:
      'Get the full list of institutes available through JoSAA based on JEE Main and JEE Advanced.',
    url: 'https://rankmatrix.in/colleges',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Participating Institutes – RankMatrix',
    description:
      'Find all JoSAA colleges including IITs, NITs, IIITs, GFTIs based on your preferences.',
  },
  keywords: [
    'JoSAA Participating Colleges',
    'IITs NITs IIITs GFTIs List',
    'JOSAA',
    'Engineering Colleges JEE Main',
  ],
};

const College = () => {
  return (
    <FeatureLayout title={'Participating Colleges'} maxWidth={'xl'}>
      <CollegeList />
    </FeatureLayout>
  );
};

export default College;
