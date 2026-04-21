import React from 'react';
import { BranchList } from '@/components/BranchList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

const PAGE_URL = '/branches';
const DESCRIPTION =
  'Every engineering branch offered through JoSAA counselling — CSE, ECE, EE, ME, CE and more — across IITs, NITs, IIITs, and GFTIs. Built on official JoSAA data. Free, no signup, no marketing spam.';

export const metadata = {
  title: 'JoSAA Engineering Branches — Full List',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA engineering branches',
    'CSE ECE ME CE branch list',
    'branches offered in JoSAA',
    'JEE counselling branches',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Engineering Branches — Every Program',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Engineering Branches | RankMatrix',
    description: DESCRIPTION,
  },
};

const Branch = () => {
  return (
    <FeatureLayout title={'Participating Branches'}>
      <BranchList />
    </FeatureLayout>
  );
};

export default Branch;
