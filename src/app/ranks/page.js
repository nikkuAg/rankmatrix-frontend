import React from 'react';
import { RankList } from '@/components/RankList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/ranks';
const DESCRIPTION =
  'JoSAA opening and closing ranks for every college, branch, category, and seat pool — year-wise and round-wise. Plan your JoSAA choices with real historical cutoffs sourced from the official JoSAA website. Free, no signup.';

const FAQS = [
  {
    question: 'What is the difference between an opening rank and a closing rank?',
    answer:
      'The opening rank is the rank of the first (best-ranked) candidate admitted to a given institute-branch-category-seat-pool in a JoSAA round. The closing rank is the last (worst-ranked) candidate admitted. Together they bound the range of ranks that got admitted that round.',
  },
  {
    question: 'What is the difference between HS, OS, and AI quota?',
    answer:
      "HS (Home State) quota applies to NIT seats reserved for candidates whose home state matches the NIT's state. OS (Other State) quota applies to NIT seats for candidates from other states. AI (All India) quota applies to IITs, IIITs, and GFTIs, where seats are not split by state and every candidate competes in the same pool.",
  },
  {
    question: 'Why do closing ranks change between rounds?',
    answer:
      "Because candidates keep moving. Each round, some freeze their seat, some float or slide for a better allocation, some withdraw, and some previously unallocated candidates now get allocated. As higher-priority seats lock in, each institute-branch's closing rank drifts toward a later (higher-numbered) candidate.",
  },
  {
    question: 'What are Gender-Neutral and Female-only seat pools?',
    answer:
      'Gender-Neutral is the main seat pool, open to any candidate. Female-only is a supernumerary pool added on top of the Gender-Neutral matrix to raise female representation at IITs and other centrally funded institutes. Female candidates are considered for both pools and get the better outcome.',
  },
  {
    question: 'Where does RankMatrix get these cutoff numbers?',
    answer:
      'Directly from the public JoSAA round-wise opening and closing rank publications. The numbers are cleaned and structured for filtering and search, but not altered — they are exactly what JoSAA published.',
  },
];

export const metadata = {
  title: 'JoSAA Opening & Closing Ranks — Year & Round Wise',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA opening rank',
    'JoSAA closing rank',
    'JEE Main cutoff rank',
    'JoSAA round wise ranks',
    'JEE Advanced cutoff',
    'JoSAA previous year cutoff',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Opening & Closing Ranks — Historical Cutoff Trends',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Opening & Closing Ranks | RankMatrix',
    description: DESCRIPTION,
  },
};

const Ranks = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Opening & Closing Ranks'}>
        <RankList />
      </FeatureLayout>
    </>
  );
};

export default Ranks;
