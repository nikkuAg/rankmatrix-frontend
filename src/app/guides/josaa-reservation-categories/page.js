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
    question: 'Is OPEN the same as the General candidate category?',
    answer:
      'No. OPEN describes a seat category. Eligible candidates from reserved categories can also be considered for OPEN seats under the applicable common rank list and allocation sequence.',
  },
  {
    question: 'Do reserved candidates receive two offers per round?',
    answer:
      'No. The official process considers eligible programme sections in its prescribed sequence and produces a provisional allocation. OPEN and reserved consideration do not mean two simultaneous offers to choose between.',
  },
  {
    question: 'Does income alone establish OBC-NCL eligibility?',
    answer:
      'No. Central-list membership, non-creamy-layer conditions and documentation must satisfy current requirements. Do not treat a single income threshold as a complete eligibility test.',
  },
  {
    question: 'Which certificates and dates are valid?',
    answer:
      'Use the current official formats, validity requirements and verification instructions for the category and cycle. Do not assume a generic current-financial-year rule, one document format, or automatic conversion after an invalid certificate.',
  },
  {
    question: 'How do category, quota and pool differ?',
    answer:
      'Seat categories include OPEN, GEN-EWS, OBC-NCL, SC, ST and relevant PwD subdivisions. Gender-Neutral and Female-only are pools; AI, HS, OS and additional institute codes are quotas. Match each dimension and its rank list separately.',
  },
  {
    question: 'Do the predictor filters cover every eligible pool and quota?',
    answer:
      'No. Eligible female candidates can be considered across applicable pools under official rules, but a single selected predictor pool does not implement that union. State matching does not encode every Union Territory or special quota mapping. Nationality and OCI/PIO status also affect eligibility.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Categories: OPEN, EWS, OBC-NCL, SC, ST & PwD',
  description: DESCRIPTION,
  type: 'article',
  publishedTime: PUBLISHED,
  modifiedTime: '2026-10-24',
});

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: '2026-10-24',
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
        lastUpdated="24 October 2026"
        readingTimeMinutes={4}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'Reservation categories', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
        <h2>Is OPEN the same as the General candidate category?</h2>
        <p>
          No. OPEN describes a seat category. Eligible candidates from reserved categories can also
          be considered for OPEN seats under the applicable common rank list and allocation
          sequence.
        </p>
        <h2>Do reserved candidates receive two offers per round?</h2>
        <p>
          No. The official process considers eligible programme sections in its prescribed sequence
          and produces a provisional allocation. OPEN and reserved consideration do not mean two
          simultaneous offers to choose between.
        </p>
        <h2>Does income alone establish OBC-NCL eligibility?</h2>
        <p>
          No. Central-list membership, non-creamy-layer conditions and documentation must satisfy
          current requirements. Do not treat a single income threshold as a complete eligibility
          test.
        </p>
        <h2>Which certificates and dates are valid?</h2>
        <p>
          Use the current official formats, validity requirements and verification instructions for
          the category and cycle. Do not assume a generic current-financial-year rule, one document
          format, or automatic conversion after an invalid certificate.
        </p>
        <h2>How do category, quota and pool differ?</h2>
        <p>
          Seat categories include OPEN, GEN-EWS, OBC-NCL, SC, ST and relevant PwD subdivisions.
          Gender-Neutral and Female-only are pools; AI, HS, OS and additional institute codes are
          quotas. Match each dimension and its rank list separately.
        </p>
        <h2>Do the predictor filters cover every eligible pool and quota?</h2>
        <p>
          No. Eligible female candidates can be considered across applicable pools under official
          rules, but a single selected predictor pool does not implement that union. State matching
          does not encode every Union Territory or special quota mapping. Nationality and OCI/PIO
          status also affect eligibility.
        </p>
        <h2>Official sources and related tools</h2>
        <p>
          Use the <a href="https://josaa.nic.in/information-bulletin/">2026 JoSAA business rules</a>
          for rank-list definitions, allocation sequence, registration, verification and acceptance
          options. Check the <a href="https://josaa.nic.in/">
            official schedule and notices
          </a> and <a href="https://jeeadv.ac.in/foreign.html">Advanced nationality requirements</a>
          . This page&apos;s review date is not a dataset import date.
        </p>
        <p>
          Explore <AppLink href="/ranks">stored cutoffs</AppLink>,{' '}
          <AppLink href="/seat-matrix">seat data</AppLink> and{' '}
          <AppLink href="/guides/what-is-josaa-counselling">the counselling overview</AppLink>.
        </p>
      </GuideLayout>
    </>
  );
}
