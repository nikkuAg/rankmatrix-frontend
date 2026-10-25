import React from 'react';
import Link from 'next/link';
import { GuideLayout } from '@/components/GuideLayout';
import styles from '@/components/GuideLayout/GuideLayout.module.css';
import { breadcrumbJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides';
const DESCRIPTION =
  'Understand JoSAA counselling, choice filling, rank lists, quotas and seat allocation. Use practical guides alongside college cutoffs and prediction tools.';

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Counselling & JEE Admission Guides',
  description: DESCRIPTION,
});

const GUIDES = [
  {
    slug: 'reading-cutoff-trends',
    title: 'How to compare cutoff changes',
    summary:
      'A worked example of round-wise and year-wise closing-rank movement without mixing quotas, categories, pools or rank lists.',
    readingTimeMinutes: 4,
  },
  {
    slug: 'what-is-josaa-counselling',
    title: 'What is JoSAA counselling?',
    summary:
      'The full picture: who runs JoSAA, which institutes participate, how a seat gets allocated, and what candidates do in each round.',
    readingTimeMinutes: 7,
  },
  {
    slug: 'jee-main-college-predictor',
    title: 'JEE college & branch predictor: how it works',
    summary:
      'What a JEE college and branch predictor actually does, how it uses JoSAA opening and closing ranks, what it can and cannot tell you, and how to read the results sensibly.',
    readingTimeMinutes: 6,
  },
  {
    slug: 'josaa-opening-and-closing-ranks',
    title: 'JoSAA opening and closing ranks, explained',
    summary:
      'What these ranks mean, how they differ from your JEE rank, why they move round-over-round, and how to use them to plan your JoSAA choice list.',
    readingTimeMinutes: 7,
  },
  {
    slug: 'jee-main-vs-advanced-vs-josaa',
    title: 'JEE Main vs JEE Advanced vs JoSAA',
    summary:
      'Three different things that get conflated constantly. Who conducts what, which ranks go where, and how they fit together for IIT/NIT/IIIT admission.',
    readingTimeMinutes: 6,
  },
  {
    slug: 'josaa-seat-matrix',
    title: 'JoSAA seat matrix: categories, quotas, seat pools',
    summary:
      'Open, OBC-NCL, SC, ST, EWS, PwD, Female-only, HS, OS, AI — what every column of the seat matrix means and why it matters for your choices.',
    readingTimeMinutes: 8,
  },
  {
    slug: 'josaa-counselling-rounds',
    title: 'JoSAA counselling rounds: how they work',
    summary:
      'Choice filling, mock allocations, regular rounds, freeze/float/slide, and the withdrawal and reporting cycle — laid out in order.',
    readingTimeMinutes: 7,
  },
  {
    slug: 'josaa-reservation-categories',
    title: 'JoSAA reservation categories explained',
    summary:
      'GE, OBC-NCL, SC, ST, EWS, PwD — what each pool means, how home-state and other-state quotas overlay on top, and how the algorithm uses your category in each round.',
    readingTimeMinutes: 8,
  },
  {
    slug: 'josaa-choice-filling-strategy',
    title: 'JoSAA choice filling strategy',
    summary:
      'A practical, opinionated guide to ordering your preference list — matching historical data, checking eligibility, freeze/float/slide and reporting.',
    readingTimeMinutes: 9,
  },
];

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Guides', path: PAGE_URL },
]);

const READING_PATHS = [
  {
    id: 'read-your-rank',
    title: 'Read your rank',
    description: 'Understand what a cutoff can—and cannot—tell you.',
    slugs: [
      'josaa-opening-and-closing-ranks',
      'reading-cutoff-trends',
      'jee-main-vs-advanced-vs-josaa',
    ],
  },
  {
    id: 'understand-allocation',
    title: 'Understand allocation',
    description: 'Keep categories, quotas and seat pools distinct.',
    slugs: ['what-is-josaa-counselling', 'josaa-seat-matrix', 'josaa-reservation-categories'],
  },
  {
    id: 'prepare-your-choices',
    title: 'Prepare your choices',
    description: 'Put the evidence into a preference order you would accept.',
    slugs: [
      'jee-main-college-predictor',
      'josaa-choice-filling-strategy',
      'josaa-counselling-rounds',
    ],
  },
];

export default function GuidesHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      <GuideLayout
        title="JoSAA & JEE counselling guides"
        description="Straightforward, no-spam explainers built around the questions JEE aspirants actually ask — from someone who built the tool they're reading them in."
        variant="library"
        eyebrow="The counselling library"
        headerNote={
          <>
            <span>Already have your rank?</span>
            <a href="#read-your-rank">Start with rank interpretation ↓</a>
            <span>Nine guides · no account needed</span>
          </>
        }
      >
        <nav className={styles.jumpLinks} aria-label="Reading paths">
          <ol>
            {READING_PATHS.map((path, index) => (
              <li key={path.id}>
                <a href={`#${path.id}`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {path.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.libraryGrid}>
          {READING_PATHS.map((path, index) => (
            <section
              className={styles.libraryPath}
              id={path.id}
              aria-labelledby={`${path.id}-title`}
              key={path.id}
            >
              <header>
                <span className={styles.chapter} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 id={`${path.id}-title`}>{path.title}</h2>
                <p>{path.description}</p>
              </header>
              <div>
                {path.slugs
                  .map((slug) => GUIDES.find((guide) => guide.slug === slug))
                  .map((guide) => (
                    <Link
                      className={styles.guideRow}
                      href={`${PAGE_URL}/${guide.slug}`}
                      prefetch={false}
                      key={guide.slug}
                    >
                      <div>
                        <h3>{guide.title}</h3>
                        <p>{guide.summary}</p>
                        <small>{guide.readingTimeMinutes} min read</small>
                      </div>
                      <span className={styles.guideArrow} aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <div className={styles.libraryIntro}>
          <p>
            JoSAA allocates seats at its published participating institutes. State counselling and
            other admission authorities run separate processes outside JoSAA. The rules are well
            documented on the official JoSAA site, but that documentation is written for operators,
            not candidates. These guides translate the important bits into plain English, connect
            them to what you will actually see in the RankMatrix tools, and point at official
            sources wherever you should double-check.
          </p>
          <p>
            Every guide here is free, and no account or contact details are required to read it. See
            the{' '}
            <Link href="/privacy" prefetch={false}>
              privacy policy
            </Link>{' '}
            for browser storage, Analytics and optional advertising information. If something is
            still unclear after reading one, the relevant tool &mdash; Opening &amp; Closing Ranks,
            Seat Matrix, Participating Colleges, or the Predictor &mdash; is one click away.
          </p>
        </div>
        <section className={styles.libraryNext}>
          <div>
            <p className={styles.eyebrow}>The source of the rules</p>
            <h2>Verify the current official instructions.</h2>
            <p>
              Guides explain the context. The published schedule, eligibility rules and programme
              restrictions govern your participation.
            </p>
          </div>
          <a
            className="button"
            href="https://josaa.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JoSAA official portal ↗
          </a>
        </section>
      </GuideLayout>
    </>
  );
}
