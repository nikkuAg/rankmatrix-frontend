import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/josaa-counselling-rounds';
const TITLE = 'JoSAA counselling rounds: how they work';
const DESCRIPTION =
  'Understand mock allocations, counselling rounds, freeze, float, slide and reporting. Learn how each step affects your JoSAA choices.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'How many rounds should I expect?',
    answer:
      'Use the published schedule for the relevant year and institute system. Do not assume every cycle or system has six rounds or identical reporting deadlines.',
  },
  {
    question: 'Can choices be changed after locking?',
    answer:
      'The 2026 rules allow the prescribed portal unlock process before the locking deadline. Saved choices lock at the deadline; do not assume editing is possible afterward. Check the live portal instructions.',
  },
  {
    question: 'Does doing nothing mean float?',
    answer:
      'No. Complete all applicable acceptance actions, documents, payments and verification responses within their individual deadlines. A provisional allotment or successful payment alone does not establish completed reporting. Inaction can cause loss of the seat and further participation.',
  },
  {
    question: 'What do freeze, float and slide mean?',
    answer:
      'Freeze stops further upgrades. Float considers higher preferences across institutes; slide considers higher preferences within the allocated institute. Availability, option changes and retention depend on the rules and completed reporting. Float/slide are not available in every situation, including the final round; freeze is not a reversible pause.',
  },
  {
    question: 'What follows the last allocation?',
    answer:
      'Withdrawal, exit, refunds, NIT+ partial admission fees and final institute reporting have separate conditions and deadlines. Follow the schedule and admitting institute instructions. CSAB Special Rounds require separate checks and registration; JoSAA participation does not complete those requirements.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Counselling Rounds: Freeze, Float & Slide',
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

export default function JoSAACounsellingRoundsGuide() {
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
          { name: 'Counselling rounds', path: PAGE_URL },
        ]}
      >
        <h2>How many rounds should I expect?</h2>
        <p>
          Use the published schedule for the relevant year and institute system. Do not assume every
          cycle or system has six rounds or identical reporting deadlines.
        </p>
        <h2>Can choices be changed after locking?</h2>
        <p>
          The 2026 rules allow the prescribed portal unlock process before the locking deadline.
          Saved choices lock at the deadline; do not assume editing is possible afterward. Check the
          live portal instructions.
        </p>
        <h2>Does doing nothing mean float?</h2>
        <p>
          No. Complete all applicable acceptance actions, documents, payments and verification
          responses within their individual deadlines. A provisional allotment or successful payment
          alone does not establish completed reporting. Inaction can cause loss of the seat and
          further participation.
        </p>
        <h2>What do freeze, float and slide mean?</h2>
        <p>
          Freeze stops further upgrades. Float considers higher preferences across institutes; slide
          considers higher preferences within the allocated institute. Availability, option changes
          and retention depend on the rules and completed reporting. Float/slide are not available
          in every situation, including the final round; freeze is not a reversible pause.
        </p>
        <h2>What follows the last allocation?</h2>
        <p>
          Withdrawal, exit, refunds, NIT+ partial admission fees and final institute reporting have
          separate conditions and deadlines. Follow the schedule and admitting institute
          instructions. CSAB Special Rounds require separate checks and registration; JoSAA
          participation does not complete those requirements.
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
