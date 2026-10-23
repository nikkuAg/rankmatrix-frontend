import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { OfficialRuleNotes } from '@/components/OfficialRuleNotes';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/josaa-seat-matrix';
const TITLE = 'JoSAA seat matrix: categories, quotas, seat pools';
const DESCRIPTION =
  'Read the JoSAA seat matrix with confidence. Understand category, HS, OS and AI quotas, gender seat pools and how to compare programme seats.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'What is the JoSAA seat matrix?',
    answer:
      'The seat matrix is the official count, published by JoSAA before counselling begins, of how many seats each participating institute offers in each branch, broken down by category (Open, OBC-NCL, SC, ST, EWS, PwD), quota (such as HS, OS or AI), and seat pool (Gender-Neutral, Female-only). Every seat allocated during counselling comes from a specific cell of that matrix.',
  },
  {
    question: 'What is the difference between HS, OS, and AI quota?',
    answer:
      'HS, OS and AI mean Home State, Other State and All India. Match the quota shown in the actual programme matrix. The source note explains where to verify eligibility.',
  },
  {
    question: 'What are Gender-Neutral and Female-only seat pools?',
    answer:
      'Gender-Neutral seats are open to any candidate. The female-only pool can include supernumerary seats; inspect the exact programme matrix. Female candidates are considered automatically for both pools and get the better outcome; male candidates are considered only for the Gender-Neutral pool.',
  },
  {
    question: 'How are reservations applied on top of the seat matrix?',
    answer:
      'Read the category and PwD columns of the official programme matrix directly. Do not reconstruct the published integer seat counts using a hypothetical percentage split.',
  },
  {
    question: 'Does the seat matrix change during counselling?',
    answer:
      'Use the latest official publication and any corrections. A historical seat matrix is not a live vacancy count; allocations and vacancies change between rounds.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Seat Matrix: Categories, Quotas & Seat Pools',
  description: DESCRIPTION,
  type: 'article',
  publishedTime: PUBLISHED,
  modifiedTime: '2026-10-23',
});

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: '2026-10-23',
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(obj) }}
        />
      ))}
      <GuideLayout
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated="23 October 2026"
        readingTimeMinutes={8}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'Seat matrix', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
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
            <strong>Quota</strong> — the exact published code. Stored rows include AI, HS, OS, GO,
            LA, JK and AP; check eligibility in the official rules.
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
            Check the programme-specific category and seat-pool counts in the official matrix; the
            note above links to the governing rules.
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
        <h3>HS — Home State</h3>
        <p>
          Use the state-code eligibility rule in the official-source note above, including its
          exceptions.
        </p>
        <h3>OS — Other State</h3>
        <p>
          Other State eligibility follows the institute-specific rules. Do not infer a universal
          split or cutoff relationship from this label.
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
          This pool can include supernumerary seats. Eligible female candidates can be considered
          for both pools under the applicable rules. Read the actual programme counts; do not assume
          every Female-only seat is additional or that one pool always has a larger closing rank.
        </p>

        <h2>How to read a seat matrix row</h2>
        <p>
          A row records seats for one year, institute, programme, category, quota and pool. It is a
          stored count, not live vacancies or a forecast of admission.
        </p>
        <p>
          The change view subtracts the previous stored year for that same slice. A missing
          previous-year row is treated as zero by the backend, so a positive change is not proof
          that seats were added. Verify the source before interpreting it.
        </p>
        <p>
          Historical cutoffs describe allocated ranks. Compare the same rank list and allocation
          slice; seat counts alone do not establish whether a rank will receive an offer.
        </p>

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
          <li>Check all category, PwD and seat-pool rows for which you are eligible.</li>
          <li>
            Seat count helps you understand the available options, but your final choice order
            should reflect your preferences rather than an assumed allocation probability.
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
