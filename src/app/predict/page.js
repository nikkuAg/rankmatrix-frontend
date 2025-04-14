import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { CollegePredictor } from '../../components/CollegePredictor';

export const metadata = {
  title: 'Predict Your College | RankMatrix',
  description:
    'Predict Your College is a feature to provided you a list of possible branch and college based on NIRF ranks that you can get for JoSAA counselling',
};

const Predict = () => {
  return (
    <FeatureLayout title={'Predict Your College'}>
      <CollegePredictor />
    </FeatureLayout>
  );
};

export default Predict;
