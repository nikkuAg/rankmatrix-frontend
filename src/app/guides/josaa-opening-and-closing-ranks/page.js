import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides/josaa-opening-and-closing-ranks';
const TITLE = 'JoSAA opening and closing ranks, explained';
const DESCRIPTION =
  'What JoSAA opening and closing ranks actually mean, how they differ from your JEE Main or Advanced rank, why they move between rounds, and how to use them to plan your preference list.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'What is the difference between opening rank and closing rank?',
    answer:
      'The opening rank of an institute-branch in a given round is the rank of the first (best-ranked) candidate who accepted a seat in that allocation. The closing rank is the rank of the last (worst-ranked) candidate who accepted a seat. Together they define the range of ranks that actually got admitted to that combination in that round.',
  },
  {
    question: 'Is my JEE Main rank the same as the JoSAA rank used in these tables?',
    answer:
      'For NIT / IIIT / GFTI allocations, JoSAA uses your JEE Main CRL (Common Rank List) or your category rank — whichever gives you a better shot under each seat pool. For IIT allocations, JoSAA uses your JEE Advanced rank. The opening and closing ranks published for each institute group use whichever rank list that institute admits from, so you compare JEE Main ranks against NIT/IIIT/GFTI cutoffs and JEE Advanced ranks against IIT cutoffs.',
  },
  {
    question: 'Why do closing ranks change from round to round?',
    answer:
      'Because candidates keep moving. In each round, some candidates freeze their seat (remove themselves from the pool), some float or slide (stay in the pool hoping for a better allocation), some withdraw entirely, and some who were not allocated earlier now get allocated as vacancies open. As the higher-priority seats get locked in, the closing rank of each institute-branch drifts toward a later (higher-numbered) candidate. That drift is why Round 1 and Round 6 closing ranks are not the same number.',
  },
  {
    question: "Which round's closing rank should I use when planning my JoSAA choices?",
    answer:
      'The last-round closing rank is the most conservative and the one most people quote for "which branch I can get". But for an aggressive JoSAA strategy, also look at the Round 1 closing rank — if you are close to that, you have a good shot at being allocated early and having the option to freeze. A two-year window is more reliable than any single year.',
  },
  {
    question: 'Can closing ranks go up dramatically year-over-year?',
    answer:
      'Yes, though it is uncommon. Large moves usually happen when something structural changes: seat matrix reshuffle at a given institute, a new branch created or merged, a reservation rule update, or a big swing in exam difficulty that shifts the overall rank distribution. Most year-to-year moves are within a few percent of the previous year.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA opening rank',
    'JoSAA closing rank',
    'JEE Main cutoff rank',
    'JoSAA round wise ranks',
    'JEE Advanced closing rank',
    'NIT closing rank',
    'IIT closing rank',
  ],
  openGraph: {
    type: 'article',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <GuideLayout
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated="April 2026"
        readingTimeMinutes={7}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'Opening & closing ranks', path: PAGE_URL },
        ]}
      >
        <h2>The short definition</h2>
        <p>
          At the end of every JoSAA round, each institute-branch-category-seat pool combination has
          a range of ranks of candidates who actually got admitted. The best-ranked candidate in
          that range is the <strong>opening rank</strong>. The worst-ranked candidate is the{' '}
          <strong>closing rank</strong>. JoSAA publishes both, for every combination, for every
          round. That is the canonical dataset every JEE aspirant plans against.
        </p>
        <p>
          On RankMatrix, the full year-wise and round-wise table is at{' '}
          <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink>.
        </p>

        <h2>How to read an opening/closing rank row</h2>
        <p>A single row in the JoSAA ranks dataset carries seven pieces of information:</p>
        <ul>
          <li>
            <strong>Institute</strong> — e.g. IIT Bombay, NIT Trichy, IIIT Hyderabad.
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
            <strong>Opening rank</strong> — first candidate admitted in that round.
          </li>
          <li>
            <strong>Closing rank</strong> — last candidate admitted in that round.
          </li>
        </ul>
        <p>
          You also pick a year and a round, because a given combination has six cutoffs in a year —
          one for each round JoSAA runs.
        </p>

        <h2>A quick worked example</h2>
        <p>
          Suppose your JEE Main CRL is 8,500, you are Open category, and your home state is
          Maharashtra. You want to know whether you can get CSE at NIT Surathkal.
        </p>
        <ul>
          <li>
            Pull the Open-category, AI-quota, Gender-Neutral seat pool row for{' '}
            <em>NIT Surathkal &times; CSE</em> across the last two years.
          </li>
          <li>
            If the closing rank is around 700–1000 in Round 6, you are well outside. If it is around
            8000–9000, you are on the edge. If it is around 12,000+, you are comfortably inside.
          </li>
          <li>
            Now repeat for HS-quota if Maharashtra were the home state of the institute (it is not
            for NIT Surathkal, which is in Karnataka) — for NIT Surathkal you would look at OS-quota
            as a Maharashtra candidate.
          </li>
        </ul>
        <p>
          The <AppLink href="/predict">predictor</AppLink> does this walk for every institute-branch
          combination at once; the <AppLink href="/ranks">ranks table</AppLink> is where you go to
          study one combination in depth.
        </p>

        <h2>Why closing ranks drift between rounds</h2>
        <p>
          JoSAA runs five to six rounds of allocation. The same institute-branch will have six
          closing ranks in a single year, usually moving monotonically later (larger rank numbers)
          as rounds progress. The drift is caused by three flows of movement:
        </p>
        <ul>
          <li>
            <strong>Upgrades.</strong> A candidate allocated their #3 choice in Round 1 may float or
            slide into their #1 in Round 3 if those seats open up. Their Round 1 seat then goes to
            the next-in-rank candidate, pushing that branch&apos;s closing rank higher.
          </li>
          <li>
            <strong>Freezes and withdrawals.</strong> Some candidates lock in their seat early
            (freeze) or leave the process (withdraw), opening up seats for candidates ranked below
            them who then fill the vacancy.
          </li>
          <li>
            <strong>No-shows.</strong> Allocated candidates who miss the reporting / fee payment
            window lose their seat. Those seats re-enter the pool in the next round.
          </li>
        </ul>
        <p>
          The direction is almost always &quot;closing rank gets larger with each round&quot; —
          meaning branches become <em>more</em> reachable in later rounds, not less. If your rank
          just missed a Round 1 cutoff, do not give up: Round 3 or Round 5 may be in range.
        </p>

        <h2>HS vs OS vs AI — the quota that trips everyone up</h2>
        <p>
          At NITs, the seat matrix is split between <strong>Home State (HS)</strong> and{' '}
          <strong>Other State (OS)</strong> quotas: roughly half of each branch is reserved for
          candidates whose home state matches the NIT&apos;s state. This is why the same branch at
          the same NIT often has two different closing ranks — one for HS candidates, one for OS
          candidates — and the HS closing rank is usually later (a better chance for you).
        </p>
        <p>
          IITs, IIITs, and GFTIs generally do not split on state; they use the{' '}
          <strong>All India (AI)</strong> quota. Read the cutoff against the quota that will
          actually apply to you.
        </p>

        <h2>Seat-pool cutoffs: Gender-Neutral and Female-only</h2>
        <p>
          Each institute-branch-category combination has a Gender-Neutral closing rank and a
          separate Female-only closing rank. The Female-only seats are supernumerary — added on top
          of the regular matrix — and their closing ranks are typically later than the
          Gender-Neutral ones for the same branch. Female candidates are considered in both pools
          and get the better outcome, so they only need to plan against the Gender-Neutral column;
          the Female-only column expands their options.
        </p>

        <h2>Practical rules of thumb</h2>
        <ul>
          <li>
            <strong>Compare at least two years.</strong> One year of data is a single data point,
            not a trend.
          </li>
          <li>
            <strong>Use Round 6 closing ranks for safety assessments</strong> — they are the outer
            limit of who got the seat.
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
            <strong>Remember the category.</strong> Open-category cutoffs are almost always the
            strictest. If you are eligible for a reservation category, look at both cutoffs — JoSAA
            gives you the better outcome.
          </li>
        </ul>

        <h2>Where these numbers come from</h2>
        <p>
          RankMatrix sources opening and closing ranks from the public JoSAA publications released
          at the end of each round. The data is cleaned and structured but not altered — the
          underlying numbers are exactly what JoSAA published. For the official archive go to{' '}
          <MuiLink href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
            josaa.nic.in
          </MuiLink>
          .
        </p>

        <h2>Related tools and guides</h2>
        <ul>
          <li>
            <AppLink href="/ranks">Opening &amp; Closing Ranks table</AppLink> — the full
            year/round/category/quota/pool filterable view.
          </li>
          <li>
            <AppLink href="/predict">College predictor</AppLink> — match your rank against all
            institute-branch cutoffs at once.
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
