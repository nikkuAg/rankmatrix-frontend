import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { OfficialRuleNotes } from '@/components/OfficialRuleNotes';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/josaa-opening-and-closing-ranks';
const TITLE = 'JoSAA opening and closing ranks, explained';
const DESCRIPTION =
  'Learn what opening and closing ranks mean, which rank list to compare and how category, quota, seat pool and round affect JoSAA cutoffs.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'What is the difference between opening rank and closing rank?',
    answer:
      'Opening and closing ranks describe the best and last allocated ranks for the stated institute, programme, year, round, category, quota and seat pool. Compare the same rank list; allocation does not by itself establish completed admission.',
  },
  {
    question: 'Is my JEE Main rank the same as the JoSAA rank used in these tables?',
    answer:
      'Match both the exam and the seat category of the cutoff row. OPEN-seat cutoffs use the Common Rank List (CRL); EWS, OBC-NCL, SC and ST cutoffs use the respective category rank; PwD cutoffs use the PwD rank within the respective category. Compare JEE Main ranks for NIT, IIIT and other GFTI programmes, and JEE Advanced ranks for IIT and participating IISc programmes. A rank from one list cannot be substituted for a rank from another list when comparing a published cutoff.',
  },
  {
    question: 'Why do closing ranks change from round to round?',
    answer:
      'Because candidates keep moving. In each round, some candidates freeze their seat (remove themselves from the pool), some float or slide (stay in the pool hoping for a better allocation), some withdraw entirely, and some who were not allocated earlier now get allocated as vacancies open. The direction and size of changes must be checked in the published rows; a later round does not guarantee a higher closing-rank number.',
  },
  {
    question: "Which round's closing rank should I use when planning my JoSAA choices?",
    answer:
      'Compare the round relevant to your planning alongside earlier rounds and years. The final published round provides a historical endpoint, not a safety threshold or a guaranteed forecast. Use the actual published schedule rather than assuming a sixth round exists.',
  },
  {
    question: 'Can closing ranks go up dramatically year-over-year?',
    answer:
      'Cutoffs can change substantially. Possible influences include seat matrix reshuffle at a given institute, a new branch created or merged, a reservation rule update, or a big swing in exam difficulty that shifts the overall rank distribution. The size and direction of movement must be checked in the published data; there is no universal percentage bound.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Opening vs Closing Rank Explained',
  description: DESCRIPTION,
  type: 'article',
  publishedTime: PUBLISHED,
  modifiedTime: '2026-10-26',
});

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: '2026-10-26',
  }),
  faqJsonLd(FAQS),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: TITLE, path: PAGE_URL },
  ]),
];

export default function JoSAAOpeningAndClosingRanksGuide() {
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(obj) }}
        />
      ))}
      <GuideLayout
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated="26 October 2026"
        readingTimeMinutes={7}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'Opening & closing ranks', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
        <h2>The short definition</h2>
        <p>
          A published JoSAA cutoff row describes the ranks allocated seats for the stated institute,
          programme, year, round, category, quota and seat pool. The best rank in that allocation
          range is the <strong>opening rank</strong>; the last rank is the <strong>closing rank</strong>.
          Allocation does not establish completed admission: candidates must still meet the
          applicable eligibility, verification, payment and reporting requirements. Compare only
          published rows with matching rank lists and allocation conditions.
        </p>
        <p>
          On RankMatrix, the full year-wise and round-wise table is at{' '}
          <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink>.
        </p>

        <h2>How to read an opening/closing rank row</h2>
        <p>A single row in the JoSAA ranks dataset carries seven pieces of information:</p>
        <ul>
          <li>
            <strong>Institute</strong> — e.g. IIT Bombay, NIT Trichy, IIIT Allahabad.
          </li>
          <li>
            <strong>Branch</strong> — Computer Science and Engineering, Electronics, Mechanical,
            etc.
          </li>
          <li>
            <strong>Category</strong> — Open, OBC-NCL, SC, ST, EWS, plus PwD variants.
          </li>
          <li>
            <strong>Quota</strong> — HS (Home State), OS (Other State), AI (All India). NITs split
            seats along this axis; IITs and IIITs generally do not.
          </li>
          <li>
            <strong>Seat pool</strong> — Gender-Neutral or Female-only. The supernumerary
            Female-only pool was introduced at IITs to raise female representation and has its own
            cutoffs.
          </li>
          <li>
            <strong>Opening rank</strong> — best allocated rank in the stated cutoff row.
          </li>
          <li>
            <strong>Closing rank</strong> — last allocated rank in the stated cutoff row.
          </li>
        </ul>
        <p>
          Select the year and an actually recorded round. The number of rounds and available slices
          can vary.
        </p>

        <h2>A hypothetical comparison</h2>
        <p>
          If a row records opening rank 8,000 and closing rank 10,000, rank 9,000 in the same rank
          list lies inside that historical interval. Rank 11,000 lies outside it. These invented
          figures describe no institute and predict no future allocation. Match the year, round,
          quota, category and pool before comparing.
        </p>

        <h2>Why closing ranks drift between rounds</h2>
        <p>
          The number of rounds follows the published schedule for that year. Each round can have a
          different closing rank for the same programme and allocation slice. The drift is caused by
          three flows of movement:
        </p>
        <ul>
          <li>
            <strong>Upgrades.</strong> A candidate allocated their #3 choice in Round 1 may float or
            slide into their #1 in Round 3 if those seats open up. Their Round 1 seat then goes to
            another eligible candidate; check the recorded cutoff rather than assuming its
            direction.
          </li>
          <li>
            <strong>Freezes and withdrawals.</strong> Withdrawals can release seats. Freezing
            retains a seat and stops upgrades; freezing does not itself create a vacancy.
          </li>
          <li>
            <strong>No-shows.</strong> Allocated candidates who miss the reporting / fee payment
            window lose their seat. Those seats re-enter the pool in the next round.
          </li>
        </ul>
        <p>
          Do not rely on a guaranteed direction of movement. Compare the actual round-wise rows for
          the same category, quota and pool, and check the current allocation rules.
        </p>

        <h2>Quota cutoffs: compare the exact label</h2>
        <p>
          HS, OS and AI mean Home State, Other State and All India. Stored rows can also include GO,
          LA, JK and AP. Availability and eligibility vary by institute and year. Neither code order
          nor a larger closing rank establishes eligibility or an admission chance. Check the
          official rules linked above.
        </p>

        <h2>Seat-pool cutoffs: Gender-Neutral and Female-only</h2>
        <p>
          Each institute-branch-category combination has a Gender-Neutral closing rank and a
          separate Female-only closing rank when that pool is offered. Eligible female candidates
          should compare both pools using the correct category and rank list. Do not ignore either
          pool or assume the same relationship between their cutoffs in every programme.
        </p>

        <h2>Practical rules of thumb</h2>
        <ul>
          <li>
            <strong>Compare at least two years.</strong> One year of data is a single data point,
            not a trend.
          </li>
          <li>
            <strong>Check the final published round</strong> for a historical endpoint. Do not treat
            it as a safety guarantee or assume every year has six rounds.
          </li>
          <li>
            <strong>Use Round 1 closing ranks for early allocations</strong> — if you want to freeze
            early and move on with life, aim for institutes where your rank is inside the Round 1
            closing rank.
          </li>
          <li>
            <strong>Do not mix rank lists.</strong> JEE Main CRL against NIT/IIIT/GFTI cutoffs; JEE
            Advanced rank against IIT cutoffs. They are separate universes.
          </li>
          <li>
            <strong>Match the rank list.</strong> Compare OPEN cutoffs with CRL and
            reserved-category cutoffs with the corresponding category rank; their numeric values are
            not interchangeable.
          </li>
        </ul>

        <h2>Where these numbers come from</h2>
        <p>
          RankMatrix sources opening and closing ranks from the public JoSAA publications released
          at the end of each round. Imports may be incomplete or contain errors; verify important
          figures against the official source. For the official archive go to{' '}
          <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
            josaa.nic.in
          </a>
          .
        </p>

        <h2>Related tools and guides</h2>
        <ul>
          <li>
            <AppLink href="/guides/reading-cutoff-trends">Worked cutoff-change example</AppLink> —
            compare matching rounds and understand missing observations before interpreting a trend.
          </li>
          <li>
            <AppLink href="/ranks">Opening &amp; Closing Ranks table</AppLink> — the full
            year/round/category/quota/pool filterable view.
          </li>
          <li>
            <AppLink href="/predict">College &amp; Branch Predictor</AppLink> — match your rank with
            a limited set of historical institute-programme rows.
          </li>
          <li>
            <AppLink href="/guides/josaa-seat-matrix">
              Seat matrix, categories, quotas, seat pools
            </AppLink>{' '}
            — what every column in the cutoff table actually means.
          </li>
        </ul>

        <h2>Common questions</h2>
        {FAQS.map((faq) => (
          <React.Fragment key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </React.Fragment>
        ))}
      </GuideLayout>
    </>
  );
}
