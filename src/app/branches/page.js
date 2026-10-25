import React from 'react';
import { BranchList } from '@/components/BranchList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { SeoDirectory } from '@/components/SeoDirectory';
import { apis } from '@/constants/apis';
import { faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';
import { fetchInitialCatalogue } from '@/utils/seoApi';

const PAGE_URL = '/branches';
const DESCRIPTION =
  'Find engineering programmes offered through JoSAA. Compare colleges, degrees, course duration and branch-wise opening and closing ranks.';

const FAQS = [
  {
    question: 'What engineering branches are offered through JoSAA?',
    answer:
      'JoSAA lists every undergraduate engineering programme offered by its participating institutes — from core disciplines like Computer Science, Electrical, Mechanical, Civil, Chemical, and Electronics, to specialisations like Materials, Metallurgy, Aerospace, Biotechnology, Engineering Physics, and Architecture.',
  },
  {
    question: 'What is the difference between a branch and a degree?',
    answer:
      'A branch is the specific programme of study (for example, Computer Science and Engineering). A degree is the qualification awarded at the end — typically B.Tech, B.E., B.Arch, or a dual-degree B.Tech + M.Tech. A single branch can be offered in multiple degree formats at different institutes.',
  },
  {
    question: 'Can I filter branches by course duration?',
    answer:
      'Yes. The filter controls on the branches page let you narrow by degree type (B.Tech, B.Arch, dual degree, etc.) and by course duration (4 years, 5 years, etc.) so you can compare only programmes that match the timeframe you are planning around.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'Engineering Branches & JoSAA College Cutoffs',
  description: DESCRIPTION,
});

const Branch = async () => {
  const initialData = await fetchInitialCatalogue(apis.branch.search);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout
        title="Participating Branches"
        description="Explore programmes by degree and course duration, then inspect the institutes and historical cutoffs for each option."
      >
        <BranchList initialData={initialData} />
      </FeatureLayout>
      <SeoDirectory kind="branches" faqs={FAQS} />
    </>
  );
};

export default Branch;
