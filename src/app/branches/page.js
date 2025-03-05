import React from 'react';
import { BranchList } from '@/components/BranchList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Participating Branches | RankMatrix',
  description:
    'List of branches participating in JoSAA counselling for admission in engineering colleges',
};

const Branch = () => {
  return (
    <FeatureLayout title={'Participating Branches'}>
      <BranchList />
    </FeatureLayout>
  );
};

export default Branch;
