import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { CollegePredictor } from '../../components/CollegePredictor';

const PAGE_URL = '/predict';
const DESCRIPTION =
  'Free JEE Main & Advanced college predictor. Enter your rank, category, and home state — we cross-reference your score with historical JoSAA opening and closing ranks and return the colleges and branches you are likely to get. No signup, no phone number, no email, no marketing spam.';

export const metadata = {
  title: 'JEE Main College Predictor — Free JoSAA Rank Predictor',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JEE Main college predictor',
    'JEE Advanced college predictor',
    'JoSAA college prediction tool',
    'best college for my rank',
    'free JEE rank predictor',
    'JoSAA predictor without signup',
    'rank to college mapper',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JEE Main College Predictor — Free, No Signup',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JEE College Predictor | RankMatrix',
    description: DESCRIPTION,
  },
};

const Predict = () => {
  return (
    <FeatureLayout title={'Predict Your College'}>
      <CollegePredictor />
    </FeatureLayout>
  );
};

export default Predict;
