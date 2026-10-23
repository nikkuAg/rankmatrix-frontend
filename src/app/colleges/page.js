import React from 'react';
import { CollegeList } from '@/components/CollegeList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { SeoDirectory } from '@/components/SeoDirectory';
import { apis } from '@/constants/apis';
import { faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';
import { fetchInitialCatalogue } from '@/utils/seoApi';

const PAGE_URL = '/colleges';
const DESCRIPTION =
  'Browse JoSAA participating IITs, NITs, IIITs and GFTIs. Compare branches, published cutoffs, seats and NIRF ranks to build your college shortlist.';

const FAQS = [
  {
    question: 'Which colleges participate in JoSAA counselling?',
    answer:
      'JoSAA allocates seats at participating IITs, NITs, IIEST Shibpur, IIITs and other participating Government Funded Technical Institutes. Membership and programmes can change by year. Browse the directory below and verify the current official participating-institute list before filling choices.',
  },
  {
    question: 'Are state engineering colleges included in JoSAA?',
    answer:
      'JoSAA covers its published participating-institute list, not every engineering college in India. Many state and private colleges use separate counselling or admission processes. Check the admission route published by the institute you are considering.',
  },
  {
    question: 'What is NIRF and why is it shown here?',
    answer:
      'NIRF is the National Institutional Ranking Framework, published annually by the Ministry of Education. It ranks engineering institutes on research, teaching, outcomes, and other parameters. RankMatrix shows stored NIRF ranks and years as one reference. Verify the ranking category and source; this is not a programme-specific placement prediction.',
  },
  {
    question: 'Can I filter colleges by type?',
    answer:
      'Yes. The filter chips at the top of the colleges table let you narrow to IITs, NITs, IIITs, or GFTIs individually or in any combination, and the search box matches institute name, display code, state, type or city.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Colleges: IIT, NIT, IIIT & GFTI List',
  description: DESCRIPTION,
});

const College = async () => {
  const initialData = await fetchInitialCatalogue(apis.college.search);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Participating Colleges'} maxWidth={'xl'}>
        <CollegeList initialData={initialData} />
      </FeatureLayout>
      <SeoDirectory kind="institutes" faqs={FAQS} />
    </>
  );
};

export default College;
