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
      'No. Delta controls the percentage range around your rank used to search historical cutoffs. It is not an admission probability or a safe/risky label. The predictor does not reproduce official allocation, average earlier years or predict other candidates.',
  },
  {
    question: 'Which historical cutoffs does the predictor use?',
    answer:
      'It searches the latest year configured in RankMatrix and the highest round stored for that year, excluding preparatory-course rows. It matches your selected categories, seat pools and quota filters. IIT and IISc comparisons use the Advanced rank you supply for each category; other institute comparisons use that category’s Main rank. Results retain their category and opening rank; their order is not a ranking of college quality or admission chance.',
  },
  {
    question: 'What inputs should I provide?',
    answer:
      'Select one or more categories and enter a Main rank and optional Advanced rank for each. Use CRL for General / OPEN and the corresponding category or PwD rank for each other selection. Choose your seat pools, quotas, state, delta and result limit. Separate architecture/planning paper-rank inputs are not available.',
  },
  {
    question: 'Will Advanced display all matching IIT and IISc programmes?',
    answer:
      'No. The shortlist prioritises matching groups and stops at the selected result limit, so it can omit programmes or even an entire exam group. Adding an Advanced rank enables that historical comparison; it does not guarantee a complete list or establish eligibility. Main and Advanced ranks cannot be used to rank colleges against each other.',
  },
  {
    question: 'What are the quota and pool limitations?',
    answer:
      'You can select multiple seat pools and quotas. Selecting Female-only alone does not include Gender-Neutral rows; select both if you want to compare both. State matching recognises some spelling aliases, but does not establish every Union Territory mapping or special-quota eligibility. Missing rows may reflect stored data, filters or the result limit, rather than an absence of official cutoffs.',
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
        lastUpdated="26 October 2026"
        readingTimeMinutes={4}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'JEE college & branch predictor', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
        <h2>Is this an admission probability?</h2>
        <p>{FAQS[0].answer}</p>
        <h2>{FAQS[1].question}</h2>
        <p>{FAQS[1].answer}</p>
        <h2>What inputs should I provide?</h2>
        <p>{FAQS[2].answer}</p>
        <h2>Will Advanced display all matching IIT and IISc programmes?</h2>
        <p>{FAQS[3].answer}</p>
        <h2>What are the quota and pool limitations?</h2>
        <p>{FAQS[4].answer}</p>
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
