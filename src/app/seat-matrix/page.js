import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { SeatList } from '@/components/SeatList';
import { faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/seat-matrix';
const DESCRIPTION =
  'JoSAA seat matrix for every year — how many seats each college and branch offers across categories and seat pools (Open, OBC-NCL, SC, ST, EWS, Female-only). Official JoSAA data, free to explore, no signup needed.';

const FAQS = [
  {
    question: 'What is the JoSAA seat matrix?',
    answer:
      'The official count, published by JoSAA before counselling begins, of how many seats each participating institute offers in each branch, broken down by category, quota (HS, OS, AI), and seat pool (Gender-Neutral, Female-only). Every seat allocated during counselling comes from a specific cell of this matrix.',
  },
  {
    question: 'How is a branch split between HS and OS quota at an NIT?',
    answer:
      'Roughly half of each NIT branch is reserved for Home State (HS) candidates and the other half for Other State (OS) candidates. The exact split is published in the JoSAA seat matrix and can vary by institute and by branch.',
  },
  {
    question: 'What are supernumerary seats?',
    answer:
      'Supernumerary seats are reservations added on top of the regular seat matrix rather than carved out of it. EWS reservation and the Female-only pool at IITs are both supernumerary — they expand the total seat count instead of reducing the Open pool.',
  },
  {
    question: 'Does the seat matrix change during JoSAA counselling?',
    answer:
      'No. Once counselling begins, the total seat count per cell is fixed for that year. What changes between rounds is the number of vacant seats in each cell as candidates freeze, float, slide, or withdraw. This is why closing ranks move round-over-round even though the seat count does not.',
  },
  {
    question: 'What does the "change in seats" view show?',
    answer:
      "It compares the current year's seat count with the previous year's seat count for each institute-branch-category combination, so you can spot branches where seats have been added, removed, or redistributed. Changes in seat count often correlate with small cutoff movements in the same direction.",
  },
];

export const metadata = {
  title: 'JoSAA Seat Matrix — Year-wise Seat Availability',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA seat matrix',
    'JoSAA seats year wise',
    'college seat availability',
    'JEE engineering admission seats',
    'JoSAA category wise seats',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA Seat Matrix — Year-wise Seat Availability',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA Seat Matrix | RankMatrix',
    description: DESCRIPTION,
  },
};

const SeatMatrix = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Seat Matrix'}>
        <SeatList />
      </FeatureLayout>
    </>
  );
};

export default SeatMatrix;
