import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { CollegePredictor } from '../../components/CollegePredictor';

export const metadata = {
  title: 'Predict Your Best College & Branch – JEE Main College Predictor | RankMatrix',
  description:
    'Use our JEE Main college predictor tool to get personalized suggestions of colleges and branches based on your rank, category, and state.',
  openGraph: {
    title: 'JEE Main College Predictor – Find Your Best Fit',
    description:
      "Enter your rank and details to get the list of colleges and branches you're eligible for through JoSAA counselling.",
    url: 'https://rankmatrix.in/predict',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RankMatrix College Predictor',
    description: 'Personalized college prediction tool for JEE Mains aspirants using JoSAA data.',
  },
  keywords: [
    'JEE Main College Predictor',
    'JoSAA College Prediction Tool',
    'Best College for My Rank',
    'Engineering Admission Prediction',
    'Rank to College Mapper',
  ],
};

const Predict = () => {
  return (
    <FeatureLayout title={'Predict Your College'}>
      <CollegePredictor />
    </FeatureLayout>
  );
};

export default Predict;
