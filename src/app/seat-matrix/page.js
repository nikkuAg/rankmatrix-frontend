import React from 'react';
import { FeatureLayout } from '@/components/RankMatrixLayout/FeatureLayout';
import { SeatList } from '@/components/SeatList';
import { ToolAnswers } from '@/components/ToolAnswers';
import { faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/seat-matrix';
const DESCRIPTION =
  'Explore JoSAA seats by college, branch, year, category, quota and seat pool. Compare seat availability alongside historical admission cutoffs.';

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
      'Supernumerary seats are additional seats beyond a specified base intake. The female-only pool can include supernumerary seats. Read the current official seat matrix and business rules for the exact programme and category; do not assume every reserved seat is supernumerary.',
  },
  {
    question: 'Does the seat matrix change during JoSAA counselling?',
    answer:
      'The published matrix is the starting reference for seat availability. JoSAA may issue updates or corrections, so check the latest official publication. Vacancies and allocations also change between rounds; a historical matrix is not a live vacancy count.',
  },
  {
    question: 'What does the "change in seats" view show?',
    answer:
      "It compares the current year's seat count with the previous year's seat count for each institute-branch-category combination, so you can spot branches where seats have been added, removed, or redistributed. Changes in seat count often correlate with small cutoff movements in the same direction.",
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Seat Matrix: College & Category-wise Seats',
  description: DESCRIPTION,
});

const SeatMatrix = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(FAQS)) }}
      />
      <FeatureLayout title={'Seat Matrix'}>
        <SeatList />
      </FeatureLayout>
      <ToolAnswers
        title="How to use the JoSAA seat matrix"
        description="The seat matrix records available seats by institute, programme, category, quota and seat pool. Use it alongside historical cutoffs when preparing your choices."
        faqs={FAQS}
      />
    </>
  );
};

export default SeatMatrix;
