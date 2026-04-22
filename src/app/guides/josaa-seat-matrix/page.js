import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides/josaa-seat-matrix';
const TITLE = 'JoSAA seat matrix: categories, quotas, seat pools';
const DESCRIPTION =
  'What the JoSAA seat matrix actually is, what every category and quota and seat pool column means, how seats are distributed across them, and why this matters when you plan your JoSAA choice list.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'What is the JoSAA seat matrix?',
    answer:
      'The seat matrix is the official count, published by JoSAA before counselling begins, of how many seats each participating institute offers in each branch, broken down by category (Open, OBC-NCL, SC, ST, EWS, PwD), quota (HS, OS, AI), and seat pool (Gender-Neutral, Female-only). Every seat allocated during counselling comes from a specific cell of that matrix.',
  },
  {
    question: 'What is the difference between HS, OS, and AI quota?',
    answer:
      "HS (Home State) quota seats at an NIT are reserved for candidates whose home state matches the NIT's state. OS (Other State) quota seats at the same NIT are for candidates from any other state. AI (All India) quota applies to IITs, IIITs, and GFTIs, where seats are not split by state — every candidate competes in the same pool regardless of domicile. Roughly half of each NIT branch is HS and half is OS; the exact split is in the published seat matrix.",
  },
  {
    question: 'What are Gender-Neutral and Female-only seat pools?',
    answer:
      'Gender-Neutral seats are open to any candidate. Female-only seats are supernumerary — added on top of the Gender-Neutral matrix specifically to raise female representation, particularly at IITs. Female candidates are considered automatically for both pools and get the better outcome; male candidates are considered only for the Gender-Neutral pool.',
  },
  {
    question: 'How are reservations applied on top of the seat matrix?',
    answer:
      'The category reservations (OBC-NCL, SC, ST, EWS, PwD) are applied per branch per quota. For example, a given branch at an NIT might have 50 HS seats split as 25 Open, 13 OBC-NCL, 7 SC, 4 ST, with 5 EWS supernumerary and a further PwD reservation within each category. Exact numbers come from the official seat matrix that JoSAA publishes each year.',
  },
  {
    question: 'Does the seat matrix change during counselling?',
    answer:
      'The published seat matrix is fixed for a given year once counselling starts — numbers do not move between rounds. What changes between rounds is the number of vacant seats in each cell as candidates freeze, float, slide, or withdraw. That is why closing ranks move round-over-round even though the seat count itself does not.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA seat matrix',
    'JoSAA category wise seats',
    'HS OS AI quota JoSAA',
    'Gender Neutral Female only seats',
    'NIT seat matrix',
    'IIT seat matrix',
    'EWS OBC SC ST reservation JEE',
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

export default function JoSAASeatMatrixGuide() {
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
        readingTimeMinutes={8}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'Seat matrix', path: PAGE_URL },
        ]}
      >
        <h2>What the seat matrix is</h2>
        <p>
          The JoSAA seat matrix is the authoritative ledger of how many engineering seats exist and
          who they are reserved for. Before each counselling year begins, JoSAA publishes the full
          matrix: every institute, every branch, every category, every quota, every seat pool.
          During the counselling rounds, JoSAA allocates seats out of this matrix — one cell of it
          at a time — until all candidates are allocated or all seats are exhausted.
        </p>
        <p>
          On RankMatrix, the full matrix is browsable at{' '}
          <AppLink href="/seat-matrix">Seat Matrix</AppLink>.
        </p>

        <h2>The five axes you need to understand</h2>
        <p>
          Every seat is described by five attributes. Your JoSAA preference list is effectively a
          set of filters on these:
        </p>
        <ul>
          <li>
            <strong>Institute</strong> — which IIT, NIT, IIIT, or GFTI.
          </li>
          <li>
            <strong>Branch</strong> — CSE, ECE, ME, CE, and so on. Each institute offers a specific
            menu of branches.
          </li>
          <li>
            <strong>Category</strong> — Open, OBC-NCL, SC, ST, EWS, plus PwD sub-categories.
          </li>
          <li>
            <strong>Quota</strong> — HS, OS, or AI. Determines whether your home state qualifies you
            for the seat.
          </li>
          <li>
            <strong>Seat pool</strong> — Gender-Neutral or Female-only.
          </li>
        </ul>
        <p>
          Every cutoff number JoSAA publishes is pinned to a specific combination of these five
          axes. Read the cutoff against the combination that will actually apply to you.
        </p>

        <h2>Categories, in detail</h2>
        <ul>
          <li>
            <strong>Open</strong> — the general merit category. Any candidate can be considered
            against Open cutoffs; reserved-category candidates can also be considered here and will
            be allocated an Open seat if their rank is good enough.
          </li>
          <li>
            <strong>OBC-NCL</strong> — Other Backward Classes, Non-Creamy Layer. Central government
            OBC list; a valid non-creamy-layer certificate is required at reporting.
          </li>
          <li>
            <strong>SC</strong> — Scheduled Castes.
          </li>
          <li>
            <strong>ST</strong> — Scheduled Tribes.
          </li>
          <li>
            <strong>EWS</strong> — Economically Weaker Sections. A supernumerary reservation;
            specific income and asset criteria apply.
          </li>
          <li>
            <strong>PwD</strong> — Persons with Disabilities. This is a <em>sub</em>-reservation
            within each of the above categories — there is no separate PwD-only seat pool outside
            the main categories.
          </li>
        </ul>
        <p>
          JoSAA considers every candidate for all categories they qualify for and gives them the
          best outcome. If you are OBC-NCL and your rank is also good enough to get an Open seat,
          you may be allocated the Open seat instead.
        </p>

        <h2>Quota, in detail</h2>
        <h3>HS — Home State (NITs only)</h3>
        <p>
          At every NIT, roughly half of each branch&apos;s seats are reserved for candidates whose
          home state matches the NIT&apos;s state. Home state is defined by the board that issued
          your class-12 certificate, not by where you currently live. HS quota cutoffs are usually
          looser than OS quota cutoffs for the same branch, because the HS pool is smaller.
        </p>
        <h3>OS — Other State (NITs only)</h3>
        <p>
          The other half of each NIT branch. Open to candidates from any state except the NIT&apos;s
          home state. OS competition is nationwide, which is why OS cutoffs at good NITs are usually
          very tight.
        </p>
        <h3>AI — All India (IITs, IIITs, GFTIs)</h3>
        <p>
          No state split. Every candidate competes in the same pool regardless of domicile. IITs,
          IIITs, and most GFTIs use AI quota.
        </p>

        <h2>Seat pool, in detail</h2>
        <h3>Gender-Neutral</h3>
        <p>
          The main seat pool. Open to any candidate regardless of gender. Most of the seat matrix is
          Gender-Neutral.
        </p>
        <h3>Female-only</h3>
        <p>
          Supernumerary seats, created to raise female representation, particularly at IITs. These
          are <em>added</em> on top of the Gender-Neutral matrix, not carved out of it. A female
          candidate is considered for both pools simultaneously and gets the better outcome.
          Female-only cutoffs are usually later (larger rank numbers) than Gender-Neutral cutoffs
          for the same branch, which effectively expands the options available to female candidates.
        </p>

        <h2>How to read a seat matrix row</h2>
        <p>
          A single seat matrix row tells you, for a specific institute-branch-category-quota-pool
          combination, how many seats exist. If you are planning, the numbers matter in two ways:
        </p>
        <ul>
          <li>
            <strong>Absolute count</strong> — branches with very few seats in your category will
            have sharper competition; cutoffs move faster with any candidate movement. A four-seat
            cell is more volatile than a forty-seat cell.
          </li>
          <li>
            <strong>Change year-over-year</strong> — when a branch&apos;s seat count goes up,
            cutoffs typically loosen slightly; when it goes down, cutoffs typically tighten.
            RankMatrix shows a &quot;change in seats&quot; view in the{' '}
            <AppLink href="/seat-matrix">Seat Matrix</AppLink> table so you can spot these shifts.
          </li>
        </ul>

        <h2>How the matrix and the cutoff tables relate</h2>
        <p>
          The seat matrix tells you <em>how many</em> seats exist. The{' '}
          <AppLink href="/guides/josaa-opening-and-closing-ranks">
            opening and closing ranks
          </AppLink>{' '}
          table tells you <em>which</em> ranks actually got those seats in past years. Together they
          tell you two different things:
        </p>
        <ul>
          <li>
            If a branch has very few seats in your category and the closing rank is tight, your
            margin for error is small. A few points on the exam change the outcome.
          </li>
          <li>
            If a branch has many seats in your category and the closing rank is well below your
            rank, you can reasonably expect to get it.
          </li>
        </ul>

        <h2>Planning your choice list using the matrix</h2>
        <ul>
          <li>
            Start with the <AppLink href="/predict">college predictor</AppLink> to get a rank-based
            shortlist.
          </li>
          <li>
            For each shortlisted institute-branch, open the{' '}
            <AppLink href="/seat-matrix">Seat Matrix</AppLink> and check seat count in your category
            + quota + pool.
          </li>
          <li>
            Watch for supernumerary seats (EWS, Female-only). They can meaningfully expand your
            options if you qualify.
          </li>
          <li>
            Avoid single-seat cells as top choices unless you are certain about your rank. Keep them
            as upside choices in the middle of your list instead.
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
