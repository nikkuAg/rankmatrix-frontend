import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';
import { CollegePredictor } from '../../components/CollegePredictor';
import { PredictPageContent } from './content';

const PAGE_URL = '/predict';
const DESCRIPTION =
  'Find college and branch options for your JEE Main or Advanced rank. Compare historical JoSAA cutoffs by category and quota. Free, no signup.';

const FAQS = [
  {
    question: 'Can I use JEE Main percentile instead of rank?',
    answer:
      'The predictor accepts rank values, not percentile scores. Use the exam and rank list matching your selected seat category. Do not enter a percentile into a rank field.',
  },
  {
    question: 'Does this predict state counselling or CSAB special-round results?',
    answer:
      'The current predictor compares JoSAA data. It does not model separate state counselling or CSAB special rounds. Check the admission authority and dataset before using a cutoff comparison.',
  },
  {
    question: 'Is the RankMatrix JEE college & branch predictor free?',
    answer:
      'Yes. The predictor is entirely free, with no paid tier, no paywall, and no premium counselling upsell. It never asks for payment, now or later.',
  },
  {
    question: 'Do I need to create an account or enter my phone number?',
    answer:
      'No. There is no signup, no login, no phone number, no email, and no OTP. You type your JEE rank and the other inputs, click Predict, and see your results. Personal contact details are not required; see the privacy policy for analytics and advertising information.',
  },
  {
    question: 'What inputs does the predictor need?',
    answer:
      'Your JEE Main rank, your category (General, EWS, OBC-NCL, SC, ST, with PwD sub-category if applicable), your home state, and optionally your JEE Advanced rank if you qualified. You can also tune how wide a cutoff delta the results span and how many colleges to show.',
  },
  {
    question: 'Where does the predictor get its data?',
    answer:
      'From the public JoSAA opening and closing rank publications. RankMatrix stores historical JoSAA data. The current predictor uses its configured latest rank model and maximum stored round; older years are available in the rank explorer and detail pages.',
  },
  {
    question: 'How accurate is the prediction?',
    answer:
      'It compares your inputs with stored historical cutoffs; it does not simulate JoSAA or estimate an admission probability. Year-over-year cutoffs can shift by several hundred ranks due to exam difficulty, seat matrix changes, and candidate preferences. Treat the output as a ranked shortlist to plan around, not a guarantee of admission.',
  },
  {
    question: 'Does it work for JEE Advanced ranks and IIT admission?',
    answer:
      'Yes. If you enter your JEE Advanced rank along with your JEE Main rank, the search can match participating IIT and IISc programme rows against the JEE Advanced rank and NIT / IIIT / GFTI rows against the JEE Main rank. Selection priorities and the requested result count determine which options actually appear; every institute group is not guaranteed a place in the shortlist.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'Free JEE Main & Advanced College Predictor',
  description: DESCRIPTION,
});

const Predict = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout
        title="Your college & choice workspace"
        description="Explore historical comparisons for both exams. Save programmes, inspect their records and prepare your own preference order."
      >
        <CollegePredictor />
      </FeatureLayout>
      <PredictPageContent faqs={FAQS} />
    </>
  );
};

export default Predict;
