import React from 'react';
import { CollegeList } from '@/components/CollegeList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/colleges';
const DESCRIPTION =
  'Full list of JoSAA participating colleges — IITs, NITs, IIITs, and GFTIs — with filters, search, and NIRF rankings. Built on official JoSAA data. Free, no signup required, and we never ask for your phone number or email.';

const FAQS = [
  {
    question: 'Which colleges participate in JoSAA counselling?',
    answer:
      'JoSAA allocates seats at all Indian Institutes of Technology (IITs), all National Institutes of Technology (NITs), the centrally funded Indian Institutes of Information Technology (IIITs), and a set of Government Funded Technical Institutes (GFTIs) including IIEST Shibpur, SPA Delhi, and several central universities.',
  },
  {
    question: 'Are state engineering colleges included in JoSAA?',
    answer:
      'No. State engineering colleges are filled through state-level counselling (WBJEE, MHT-CET, KCET, TNEA, and similar), not JoSAA. JoSAA covers only centrally funded institutes.',
  },
  {
    question: 'What is NIRF and why is it shown here?',
    answer:
      'NIRF is the National Institutional Ranking Framework, published annually by the Ministry of Education. It ranks engineering institutes on research, teaching, outcomes, and other parameters. RankMatrix lists the NIRF Engineering rank next to each institute as one input into your preference ordering — higher-ranked institutes usually correlate with stronger placements and peer groups.',
  },
  {
    question: 'Can I filter colleges by type?',
    answer:
      'Yes. The filter chips at the top of the colleges table let you narrow to IITs, NITs, IIITs, or GFTIs individually or in any combination, and the search box filters by institute name or code.',
  },
];

export const metadata = {
  title: 'JoSAA Participating Colleges — IITs, NITs, IIITs & GFTIs',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA participating colleges',
    'IIT NIT IIIT GFTI list',
    'JoSAA colleges 2025',
    'engineering colleges JEE Main',
    'JoSAA counselling colleges',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Participating Colleges — Explore Every Institute',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Participating Colleges | RankMatrix',
    description: DESCRIPTION,
  },
};

const College = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Participating Colleges'} maxWidth={'xl'}>
        <CollegeList />
      </FeatureLayout>
    </>
  );
};

export default College;
