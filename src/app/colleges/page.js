import React from 'react';
import { CollegeList } from '@/components/CollegeList';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';

const PAGE_URL = '/colleges';
const DESCRIPTION =
  'Full list of JoSAA participating colleges — IITs, NITs, IIITs, and GFTIs — with filters, search, and NIRF rankings. Built on official JoSAA data. Free, no signup required, and we never ask for your phone number or email.';

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
    <FeatureLayout title={'Participating Colleges'} maxWidth={'xl'}>
      <CollegeList />
    </FeatureLayout>
  );
};

export default College;
