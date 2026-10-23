import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { OfficialRuleNotes } from '@/components/OfficialRuleNotes';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/jee-main-college-predictor';
const TITLE = 'JEE college & branch predictor: how it works';
const DESCRIPTION =
  'Learn which ranks and filters a JEE college predictor uses, how to interpret historical cutoffs and how to turn results into a college shortlist.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'Is this an admission probability?',
    answer:
      'No. Delta defines a search window, not a probability or safe/risky threshold. The endpoint compares historical rows; it does not reproduce official allocation, average earlier years or predict other candidates.',
  },
  {
    question: 'What does the endpoint actually query?',
    answer:
      'The configured latest-year model and its global latest round are used, with preparatory rows excluded. Category and pool are exact filters. The backend IIT bucket includes IISc and uses Advanced bounds; other rows use Main bounds. Selected rows are displayed by opening rank after selection tiers and the result cap.',
  },
  {
    question: 'What inputs should I provide?',
    answer:
      'The form sends Main rank, optional Advanced rank, category, seat pool, state, delta and result limit. Use the rank list matching the selected category. It does not accept separate CRL/category ranks or separate architecture/planning paper ranks.',
  },
  {
    question: 'Will Advanced display all matching IIT and IISc programmes?',
    answer:
      'No. The limit and selection tiers can omit alternatives, including an exam group. Adding a rank enables that historical comparison; it is not a completeness or eligibility guarantee. Main and Advanced numerical ranks are not a cross-exam quality ranking.',
  },
  {
    question: 'What are the quota and pool limitations?',
    answer:
      'A selected female-only pool does not automatically include Gender-Neutral rows. Exact state matching does not encode every Union Territory mapping or special quota. Missing rows can reflect stored data or filtering, not official nonpublication.',
  },
  {
    question: 'How should I use the results?',
    answer:
      'Use the shortlist for research. Inspect matching year, round, quota, category and pool in detailed tables; verify current programme restrictions, documents and seats at official sources. Historical cutoff movement has no universal safe margin.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JEE College Predictor: Inputs, Accuracy & Limits',
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

export default function JeeMainCollegePredictorGuide() {
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
          { name: 'JEE college & branch predictor', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
        <h2>Is this an admission probability?</h2>
        <p>
          No. Delta defines a search window, not a probability or safe/risky threshold. The endpoint
          compares historical rows; it does not reproduce official allocation, average earlier years
          or predict other candidates.
        </p>
        <h2>What does the endpoint actually query?</h2>
        <p>
          The configured latest-year model and its global latest round are used, with preparatory
          rows excluded. Category and pool are exact filters. The backend IIT bucket includes IISc
          and uses Advanced bounds; other rows use Main bounds. Selected rows are displayed by
          opening rank after selection tiers and the result cap.
        </p>
        <h2>What inputs should I provide?</h2>
        <p>
          The form sends Main rank, optional Advanced rank, category, seat pool, state, delta and
          result limit. Use the rank list matching the selected category. It does not accept
          separate CRL/category ranks or separate architecture/planning paper ranks.
        </p>
        <h2>Will Advanced display all matching IIT and IISc programmes?</h2>
        <p>
          No. The limit and selection tiers can omit alternatives, including an exam group. Adding a
          rank enables that historical comparison; it is not a completeness or eligibility
          guarantee. Main and Advanced numerical ranks are not a cross-exam quality ranking.
        </p>
        <h2>What are the quota and pool limitations?</h2>
        <p>
          A selected female-only pool does not automatically include Gender-Neutral rows. Exact
          state matching does not encode every Union Territory mapping or special quota. Missing
          rows can reflect stored data or filtering, not official nonpublication.
        </p>
        <h2>How should I use the results?</h2>
        <p>
          Use the shortlist for research. Inspect matching year, round, quota, category and pool in
          detailed tables; verify current programme restrictions, documents and seats at official
          sources. Historical cutoff movement has no universal safe margin.
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
