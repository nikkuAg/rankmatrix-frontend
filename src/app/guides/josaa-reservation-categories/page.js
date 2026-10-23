import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { OfficialRuleNotes } from '@/components/OfficialRuleNotes';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/josaa-reservation-categories';
const TITLE = 'JoSAA reservation categories explained — GE, OBC-NCL, SC, ST, EWS, PwD';
const DESCRIPTION =
  'Understand JoSAA category labels, PwD status and seat pools. Learn how to match your rank list with the correct category and quota cutoff.';
const PUBLISHED = '2026-05-19';

const FAQS = [
  {
    question: 'Which category should I claim in JoSAA?',
    answer:
      'You claim the category you registered for in JEE Main or JEE Advanced — JoSAA inherits it. If you qualify for OBC-NCL, SC, ST, EWS, or PwD with valid documentation, claiming the reservation gives you both a general-pool offer and a category-pool offer in each round; JoSAA picks whichever is more favourable for you.',
  },
  {
    question: 'What is the difference between OBC and OBC-NCL?',
    answer:
      'JoSAA only recognises OBC-NCL, the Non-Creamy Layer subset of the central OBC list. If your family income exceeds the limit defined by the Ministry of Social Justice, you fall outside the NCL bracket and must compete in the general pool. The NCL certificate has to be from the current financial year at the time of reporting.',
  },
  {
    question: 'Does EWS reservation also apply to IITs?',
    answer:
      'Yes. EWS is a central reservation that applies across IITs, NITs, IIITs, and GFTIs in JoSAA. You need a valid EWS certificate issued in the format specified by the Ministry, dated as required by the latest JoSAA business rules — typically issued in the current financial year.',
  },
  {
    question: 'How do female-only supernumerary seats work?',
    answer:
      'Female-only pools can include supernumerary seats at multiple institute groups. See the official-source note and the programme seat matrix on this page.',
  },
  {
    question: 'Can I switch from a category-pool seat to a general-pool seat in a later round?',
    answer:
      'JoSAA always offers you the best seat your rank qualifies for in each round, considering both general and category pools. You do not switch manually — if your general-pool eligibility for a higher preference opens up in a later round (because of category-pool churn), the algorithm moves you to it automatically.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Categories: OPEN, EWS, OBC-NCL, SC, ST & PwD',
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

export default function JoSAAReservationCategories() {
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
          { name: 'Reservation categories', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
        <h2>The short version</h2>
        <p>
          JoSAA allocates seats from two parallel pools running side by side: a general (open) pool
          that anyone can compete in, and category pools — OBC-NCL, SC, ST, EWS, and PwD — that
          reserve seats for eligible candidates. Each round, the algorithm offers you the best seat
          from <em>either</em> pool you qualify for. You never have to choose between your
          reservation and the open list; JoSAA picks whichever is more favourable.
        </p>

        <h2>The categories, one by one</h2>

        <h3>GE — General / Open</h3>
        <p>
          The unreserved pool. Anyone can compete here, regardless of category. If you have no
          reservation to claim, this is your only pool. If you have a reservation, you still compete
          here as well — the algorithm just picks the better of your two offers each round.
        </p>

        <h3>OBC-NCL — Other Backward Classes, Non-Creamy Layer</h3>
        <p>
          27% of central reservation. JoSAA only recognises the Non-Creamy Layer subset of the
          central OBC list — not state OBC lists. The NCL certificate must be on the format
          prescribed by the Ministry of Social Justice and Empowerment, issued within the window
          specified by JoSAA business rules (typically the current financial year). State OBC
          certificates and creamy-layer OBC certificates are not accepted; candidates with those
          compete in the general pool.
        </p>

        <h3>SC — Scheduled Caste</h3>
        <p>
          15% of central reservation. Eligibility follows the central SC list. The caste certificate
          must be from a competent authority in the prescribed format. There is no income cap — SC
          reservation is unconditional on income.
        </p>

        <h3>ST — Scheduled Tribe</h3>
        <p>
          7.5% of central reservation. Same structure as SC: eligibility from the central ST list,
          no income cap, caste certificate from a competent authority.
        </p>

        <h3>EWS — Economically Weaker Sections</h3>
        <p>
          10% of central reservation, introduced from JEE 2019 onwards. EWS is for candidates who do{' '}
          <em>not</em> already fall under OBC-NCL, SC, or ST, and whose family income and asset
          holdings are below the limits notified by the central government. The EWS certificate must
          be on the prescribed central format and dated within the period JoSAA accepts (typically
          issued in the current financial year). State-issued EWS certificates not on the central
          format are rejected.
        </p>

        <h3>PwD — Persons with Disability</h3>
        <p>
          5% horizontal reservation across the other categories — meaning a PwD candidate also has
          to be in GE, OBC-NCL, SC, ST, or EWS, and reservation applies on top. Eligibility requires
          a disability of 40% or more, certified by a UDID-recognised authority on Form V or
          equivalent. JoSAA verifies the certificate at reporting; any mismatch can invalidate the
          allotment.
        </p>

        <h2>Quota: home state vs other state vs all-India</h2>
        <p>
          On top of category, NIT seats are split by quota — Home State (HS), Other State (OS), and
          All-India (AI) for some special categories.
        </p>
        <ul>
          <li>
            Use the state-code eligibility rule in the official-source note above, including its
            exceptions.
          </li>
          <li>
            <strong>OS</strong>: the remaining 50% of NIT seats go to candidates whose home state
            does not match.
          </li>
          <li>
            <strong>AI</strong>: IITs, IIITs (centrally funded), and most GFTIs do not have an HS/OS
            split — they allocate purely on all-India rank within each category pool.
          </li>
        </ul>
        <p>
          Use the state-code eligibility rule in the official-source note above, including its
          exceptions.
        </p>

        <h2>Female-only supernumerary seats (IITs)</h2>
        <p>
          To improve gender diversity, IITs run a supernumerary female-only seat pool. These seats
          are over and above the regular seat matrix and are allocated only to female candidates.
          The pool is reported alongside the regular seat matrix as a Female (F) sub-pool against
          the Gender-Neutral (GN) sub-pool. Allocation happens in the same JoSAA rounds.
        </p>
        <p>
          Check the programme-specific category and seat-pool counts in the official matrix; the
          note above links to the governing rules.
        </p>

        <h2>How the algorithm uses all this</h2>
        <p>
          In each round, for every (institute, branch) combination on your preference list, the
          algorithm checks each pool you are eligible for — your category pool, your gender pool,
          your quota (HS / OS / AI) — and looks at whether your rank clears the cutoff for any of
          them. You are offered the highest-ranked preference where any pool clears.
        </p>
        <p>
          That is why two candidates with the same JEE rank but different categories can be offered
          very different seats in the same round. The category pool and quota effectively change the
          rank you are competing against for any given seat.
        </p>

        <h2>Documentation: get it right at registration</h2>
        <p>
          Check the current category-change, certificate-validity and verification provisions on the
          official portal. A documentation problem can affect eligibility and seat retention; do not
          assume an automatic transfer to another category or a replacement allocation.
        </p>
        <ul>
          <li>Get your OBC-NCL / EWS certificate issued in the current financial year.</li>
          <li>Use the central format — not the state format — for OBC-NCL and EWS.</li>
          <li>
            For SC / ST, the caste certificate has to be from a competent authority in the
            prescribed format.
          </li>
          <li>
            For PwD, secure your UDID and Form V (or equivalent) ahead of registration; the
            verification at reporting is strict.
          </li>
        </ul>

        <h2>Related guides and tools</h2>
        <ul>
          <li>
            <AppLink href="/guides/josaa-seat-matrix">
              JoSAA seat matrix: categories, quotas, seat pools
            </AppLink>{' '}
            — the columns of the matrix in detail.
          </li>
          <li>
            <AppLink href="/guides/josaa-counselling-rounds">JoSAA counselling rounds</AppLink> —
            how the algorithm runs each round.
          </li>
          <li>
            <AppLink href="/seat-matrix">Live JoSAA seat matrix</AppLink> on RankMatrix.
          </li>
          <li>
            <AppLink href="/predict">JEE college &amp; branch predictor</AppLink> — uses category
            and quota to filter your eligible seats.
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
