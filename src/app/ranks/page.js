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
      'The opening rank is the rank of the first (best-ranked) candidate admitted to a given institute-branch-category-quota-seat-pool in a JoSAA round. The closing rank is the last (worst-ranked) candidate admitted. Together they bound the range of ranks that got admitted that round.',
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
      'Gender-Neutral is the main seat pool, open to any candidate. The Female-only pool can include supernumerary seats. Female candidates can be considered for both pools under the applicable JoSAA rules; match the pool shown in each cutoff row.',
  },
  {
    question: 'Where does RankMatrix get these cutoff numbers?',
    answer:
      'RankMatrix stores data sourced from public JoSAA round-wise opening and closing rank publications. Imports and page refreshes are separate; verify important figures against the official publication and report discrepancies with the year, round and filters.',
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
      <FeatureLayout
        title="Opening & Closing Ranks"
        description="Explore historical JoSAA cutoffs by institute, programme and allocation context. Compare the same exam and rank list."
      >
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
