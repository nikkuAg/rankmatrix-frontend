import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { faqJsonLd } from '@/utils/jsonLd';
import { CollegePredictor } from '../../components/CollegePredictor';

const PAGE_URL = '/predict';
const DESCRIPTION =
  'Free JEE Main & Advanced college predictor. Enter your rank, category, and home state — we cross-reference your score with historical JoSAA opening and closing ranks and return the colleges and branches you are likely to get. No signup, no phone number, no email, no marketing spam.';

const FAQS = [
  {
    question: 'Is the RankMatrix JEE Main college predictor free?',
    answer:
      'Yes. The predictor is entirely free, with no paid tier, no paywall, and no premium counselling upsell. It never asks for payment, now or later.',
  },
  {
    question: 'Do I need to create an account or enter my phone number?',
    answer:
      'No. There is no signup, no login, no phone number, no email, and no OTP. You type your JEE rank and the other inputs, click Predict, and see your results. Nothing is collected from you.',
  },
  {
    question: 'What inputs does the predictor need?',
    answer:
      'Your JEE Main rank, your category (General, EWS, OBC-NCL, SC, ST, with PwD sub-category if applicable), your home state, and optionally your JEE Advanced rank if you qualified. You can also tune how wide a cutoff delta the results span and how many colleges to show.',
  },
  {
    question: 'Where does the predictor get its data?',
    answer:
      'From the public JoSAA opening and closing rank publications. RankMatrix ingests multiple recent years of official JoSAA data and matches your inputs against historical closing ranks for each institute-branch-category-quota-pool combination.',
  },
  {
    question: 'How accurate is the prediction?',
    answer:
      'It reflects what the JoSAA algorithm would have done historically, not what it will do this year. Year-over-year cutoffs can shift by several hundred ranks due to exam difficulty, seat matrix changes, and candidate preferences. Treat the output as a ranked shortlist to plan around, not a guarantee of admission.',
  },
  {
    question: 'Does it work for JEE Advanced ranks and IIT admission?',
    answer:
      'Yes. If you enter your JEE Advanced rank along with your JEE Main rank, the results include IITs matched against the JEE Advanced rank, as well as NITs / IIITs / GFTIs matched against the JEE Main rank.',
  },
];

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Predict Your College'}>
        <CollegePredictor />
      </FeatureLayout>
    </>
  );
};

export default Predict;
