import React from 'react';
import { BranchList } from '@/components/BranchList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/branches';
const DESCRIPTION =
  'Every engineering branch offered through JoSAA counselling — CSE, ECE, EE, ME, CE and more — across IITs, NITs, IIITs, and GFTIs. Built on official JoSAA data. Free, no signup, no marketing spam.';

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

export const metadata = {
  title: 'JoSAA Engineering Branches — Full List',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA engineering branches',
    'CSE ECE ME CE branch list',
    'branches offered in JoSAA',
    'JEE counselling branches',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Engineering Branches — Every Program',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Engineering Branches | RankMatrix',
    description: DESCRIPTION,
  },
};

const Branch = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Participating Branches'}>
        <BranchList />
      </FeatureLayout>
    </>
  );
};

export default Branch;
