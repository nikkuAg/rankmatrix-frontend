import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/jee-main-vs-advanced-vs-josaa';
const TITLE = 'JEE Main vs JEE Advanced vs JoSAA';
const DESCRIPTION =
  'Understand how JEE Main, JEE Advanced and JoSAA fit together, which rank lists apply and how candidates reach IIT, NIT, IIIT and GFTI admission.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'Which exam applies to JoSAA programmes?',
    answer:
      'Participating IIT and IISc programmes use JEE Advanced. NIT+ programmes use the applicable JEE Main paper: Paper 1 for B.E./B.Tech, Paper 2A for B.Arch or Paper 2B for B.Planning. Check programme-specific requirements.',
  },
  {
    question: 'Must every Advanced candidate qualify through Main?',
    answer:
      'No universal statement is safe: foreign nationals and applicable OCI/PIO routes have different requirements. Use the current official nationality and eligibility instructions.',
  },
  {
    question: 'Are Main, Advanced and category ranks interchangeable?',
    answer:
      'No. Main and Advanced have different scales. OPEN rows use the applicable common rank list, while reserved/PwD rows can use corresponding category lists. Match the paper, rank list, year, round, quota and pool.',
  },
  {
    question: 'What does JoSAA add after examination results?',
    answer:
      'JoSAA is counselling, not another examination. It considers eligible rank lists, choices and available seats under allocation rules. A result alone does not establish admission eligibility or guarantee a seat.',
  },
  {
    question: 'What can RankMatrix compare?',
    answer:
      'The predictor accepts one Main rank and an optional Advanced rank for a selected category and pool. It does not collect separate CRL and category ranks or separate Paper 2 ranks, and cannot represent every admission route. Its result cap can omit alternatives.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JEE Main vs Advanced vs JoSAA: Key Differences',
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

export default function JeeMainVsAdvancedVsJoSAAGuide() {
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
          { name: 'JEE Main vs Advanced vs JoSAA', path: PAGE_URL },
        ]}
      >
        <h2>Which exam applies to JoSAA programmes?</h2>
        <p>
          Participating IIT and IISc programmes use JEE Advanced. NIT+ programmes use the applicable
          JEE Main paper: Paper 1 for B.E./B.Tech, Paper 2A for B.Arch or Paper 2B for B.Planning.
          Check programme-specific requirements.
        </p>
        <h2>Must every Advanced candidate qualify through Main?</h2>
        <p>
          No universal statement is safe: foreign nationals and applicable OCI/PIO routes have
          different requirements. Use the current official nationality and eligibility instructions.
        </p>
        <h2>Are Main, Advanced and category ranks interchangeable?</h2>
        <p>
          No. Main and Advanced have different scales. OPEN rows use the applicable common rank
          list, while reserved/PwD rows can use corresponding category lists. Match the paper, rank
          list, year, round, quota and pool.
        </p>
        <h2>What does JoSAA add after examination results?</h2>
        <p>
          JoSAA is counselling, not another examination. It considers eligible rank lists, choices
          and available seats under allocation rules. A result alone does not establish admission
          eligibility or guarantee a seat.
        </p>
        <h2>What can RankMatrix compare?</h2>
        <p>
          The predictor accepts one Main rank and an optional Advanced rank for a selected category
          and pool. It does not collect separate CRL and category ranks or separate Paper 2 ranks,
          and cannot represent every admission route. Its result cap can omit alternatives.
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
