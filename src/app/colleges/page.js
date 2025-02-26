import React from 'react';
import { CollegeList } from '@/components/CollegeList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Participating Colleges | RankMatrix',
  description:
    'List of colleges participating in JoSAA counselling for admission in engineering colleges',
};

const College = () => {
  return (
    <FeatureLayout title={'Participating Colleges'} maxWidth={'lg'}>
      <CollegeList />
    </FeatureLayout>
  );
};

export default College;
