import React from 'react';
import { RankList } from '@/components/RankList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

export const metadata = {
  title: 'Opening & Closing Ranks | RankMatrix',
  description:
    'Opening & Closing Ranks for all colleges and branches participating in JoSAA counselling',
};

const Ranks = () => {
  return (
    <FeatureLayout title={'Opening & Closing Ranks'}>
      <RankList />
    </FeatureLayout>
  );
};

export default Ranks;
