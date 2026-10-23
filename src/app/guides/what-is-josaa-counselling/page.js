import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { OfficialRuleNotes } from '@/components/OfficialRuleNotes';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/what-is-josaa-counselling';
const TITLE = 'What is JoSAA counselling?';
const DESCRIPTION =
  'Learn what JoSAA does, which institutes participate and how registration, choice filling and seat allocation connect to JEE Main and Advanced ranks.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'What does JoSAA do?',
    answer:
      'JoSAA coordinates seat allocation for participating programmes at IITs, IISc and the NIT+ system. It uses eligible rank lists, programme choices and seat-allocation rules; it is not an entrance examination.',
  },
  {
    question: 'Does a JEE result guarantee eligibility or a seat?',
    answer:
      'No. You must meet the applicable examination, Class XII, category, programme and document requirements, register and submit choices on time. An exam result or historical cutoff alone does not establish admission eligibility.',
  },
  {
    question: 'Are all IIT admissions through JoSAA?',
    answer:
      'No. These guides concern participating JoSAA programmes. Institutes can have other programmes or admission channels; check the specific official programme page.',
  },
  {
    question: 'Is JoSAA the same as CSAB?',
    answer:
      'No. CSAB Special Rounds are a separate process for participating NIT+ vacancies with separate registration and rules. Do not assume a JoSAA registration or payment completes CSAB requirements.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'What Is JoSAA Counselling? Admission Process Guide',
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

export default function WhatIsJoSAACounselling() {
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
          { name: 'What is JoSAA', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
        <h2>Which institutions participate?</h2>
        <p>
          The 2026 rules distinguish IITs and IISc from the NIT+ system: NITs, IIEST, IIITs and
          Other-GFTIs. Government funding can be central or state, full or partial. Use the official
          participating-institute and programme lists for the cycle; a RankMatrix catalogue count is
          not a completeness certificate.
        </p>
        <h2>From examination results to allocation</h2>
        <p>
          Participating IIT and IISc programmes use JEE Advanced rank lists. NIT+ programmes use the
          applicable JEE Main paper and rank list. Eligibility also depends on the programme and
          candidate; architecture and planning must not be treated as interchangeable with a B.Tech
          rank.
        </p>
        <h2>What to do on the official portal</h2>
        <p>
          Read the current eligibility rules and schedule, register, review available programmes,
          and save your genuine preference order. Check the locking deadline. If provisionally
          allocated a seat, follow the portal instructions for the available acceptance option,
          documents, payments and verification queries. Allocation alone does not finish admission.
        </p>
        <h2>How RankMatrix helps</h2>
        <p>
          Compare stored historical cutoffs and seats to research choices. Match the year, round,
          quota, category and seat pool. Missing data is not proof that a programme or seat does not
          exist. Complete current eligibility and reporting checks through official sources.
        </p>
        <h2>Official sources and further reading</h2>
        <p>
          Reviewed against the{' '}
          <a href="https://josaa.nic.in/information-bulletin/">2026 JoSAA business rules</a>,
          especially the sections on rank lists, allocation sequence, registration, verification and
          acceptance options. Check the{' '}
          <a href="https://josaa.nic.in/">current official schedule and notices</a> and{' '}
          <a href="https://jeeadv.ac.in/foreign.html">JEE Advanced nationality rules</a>
          for your circumstances. This review date is not a dataset import date.
        </p>
        <p>
          Continue with{' '}
          <AppLink href="/guides/josaa-opening-and-closing-ranks">cutoff interpretation</AppLink>,{' '}
          <AppLink href="/guides/josaa-seat-matrix">seat-matrix definitions</AppLink> or the{' '}
          <AppLink href="/predict">historical predictor</AppLink>.
        </p>
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
