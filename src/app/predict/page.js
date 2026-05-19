import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { faqJsonLd } from '@/utils/jsonLd';
import { CollegePredictor } from '../../components/CollegePredictor';
import { PredictPageContent } from './content';

const PAGE_URL = '/predict';
const DESCRIPTION =
  'Free JEE college & branch predictor for JoSAA counselling. Enter your JEE Main or JEE Advanced rank, category, and home state — we return the exact colleges and branches you are likely to get, based on official JoSAA opening and closing ranks. No signup, no phone number, no email, no marketing spam.';

const FAQS = [
  {
    question: 'Is the RankMatrix JEE college & branch predictor free?',
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
  title: 'JEE College & Branch Predictor — Free JoSAA Tool, No Signup',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JEE college & branch predictor',
    'JEE college and branch predictor',
    'JEE college predictor',
    'JEE branch predictor',
    'JoSAA college predictor',
    'JoSAA college and branch predictor',
    'JEE Main college predictor',
    'JEE Advanced college predictor',
    'IIT college predictor',
    'NIT college predictor',
    'IIIT college predictor',
    'GFTI college predictor',
    'free JEE college predictor',
    'JEE predictor without signup',
    'best college and branch for my JEE rank',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JEE College & Branch Predictor — Free, No Signup',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JEE College & Branch Predictor | RankMatrix',
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
      <PredictPageContent faqs={FAQS} />
    </>
  );
};

export default Predict;
