import React from 'react';
import { RankList } from '@/components/RankList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { ToolAnswers } from '@/components/ToolAnswers';
import { faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/ranks';
const DESCRIPTION =
  'Compare JoSAA opening and closing ranks by college, branch, year, round, category and quota. Explore historical IIT, NIT, IIIT and GFTI cutoffs.';

const FAQS = [
  {
    question: 'What is the difference between an opening rank and a closing rank?',
    answer:
      'The opening rank is the rank of the first (best-ranked) candidate admitted to a given institute-branch-category-seat-pool in a JoSAA round. The closing rank is the last (worst-ranked) candidate admitted. Together they bound the range of ranks that got admitted that round.',
  },
  {
    question: 'What is the difference between HS, OS, and AI quota?',
    answer:
      'HS means Home State, OS means Other State and AI means All India. Quota availability and state-code eligibility depend on the institute and the applicable JoSAA rules. Match the exact quota shown in the cutoff row; some institutes have additional quota codes.',
  },
  {
    question: 'Why do closing ranks change between rounds?',
    answer:
      'Because candidates keep moving. Each round, some freeze their seat, some float or slide for a better allocation, some withdraw, and some previously unallocated candidates now get allocated. The resulting cutoff can change, but a later round does not guarantee a more favourable closing rank for every seat type.',
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

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Opening & Closing Ranks by Year and Round',
  description: DESCRIPTION,
});

const Ranks = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Opening & Closing Ranks'}>
        <RankList />
      </FeatureLayout>
      <ToolAnswers
        title="How to compare JoSAA opening and closing ranks"
        description="Opening rank is the first admitted rank and closing rank the last admitted rank within the exact allocation slice shown. Compare like-for-like rank lists, quotas and categories."
        faqs={FAQS}
      />
    </>
  );
};

export default Ranks;
