import React from 'react';
import { BranchList } from '@/components/BranchList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'List of Engineering Branches in JoSAA – RankMatrix',
  description:
    'Explore all engineering branches offered through JoSAA counselling across various institutions.',
  openGraph: {
    title: 'JoSAA Branches – Complete List of Programs',
    description: 'Discover all branches like CSE, ECE, ME, CE, EE offered via JoSAA counselling.',
    url: 'https://rankmatrix.in/branches',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Branches – JoSAA Programs',
    description: 'Explore all available engineering streams in JoSAA participating institutes.',
  },
  keywords: [
    'JoSAA Engineering Branches',
    'CSE ECE ME CE Branch List',
    'Branches Offered in JoSAA',
  ],
};

const Branch = () => {
  return (
    <FeatureLayout title={'Participating Branches'}>
      <BranchList />
    </FeatureLayout>
  );
};

export default Branch;
