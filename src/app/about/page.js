import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { breadcrumbJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/about';
const TITLE = 'About RankMatrix';
const DESCRIPTION =
  'Meet the maker of RankMatrix and learn why it offers free JEE college predictions, JoSAA cutoffs and seat data without requiring signup.';

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'About RankMatrix: Data, Purpose & Founder',
  description: DESCRIPTION,
});

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `https://www.rankmatrix.in${PAGE_URL}`,
  name: TITLE,
  description: DESCRIPTION,
  mainEntity: {
    '@type': 'Person',
    name: 'Divyansh Agarwal',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Technology Roorkee',
    },
    jobTitle: 'Software Development Engineer',
    sameAs: ['https://github.com/nikkuAg', 'https://www.linkedin.com/in/ag-divyansh/'],
  },
};

const jsonLd = [
  aboutJsonLd,
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: PAGE_URL },
  ]),
];

export default function About() {
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
        lastUpdated="May 2026"
        readingTimeMinutes={4}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: PAGE_URL },
        ]}
      >
        <h2>What RankMatrix is</h2>
        <p>
          RankMatrix is a free JEE college and branch predictor for JoSAA counselling. It works with
          both JEE Main and JEE Advanced ranks, uses the participating institutes and programmes in
          our stored catalogue.
        </p>
        <p>
          The aim is narrow on purpose: help an aspirant turn a JEE rank into a clear, ordered list
          of realistic college-and-branch choices, without the friction that most counselling tools
          ship with. No signup or contact details are required to use the tools. Submitted inputs
          reach the backend; see the privacy policy for storage and service-provider details.
        </p>

        <h2>Why this exists</h2>
        <p>
          I went through JoSAA myself. The data you actually need to make a sensible choice list —
          last year&apos;s closing ranks, seat counts for your category, branch-level cutoff trends
          across rounds — is technically published by JoSAA, but it is scattered across PDFs,
          downloadable spreadsheets, and pages that are not built for the question you are trying to
          answer at midnight before choice locking:{' '}
          <em>given my rank, what is realistic, and in what order should I list it?</em>
        </p>
        <p>
          Most of the tools that try to answer that question wall the data behind a phone number, a
          newsletter signup, or an aggressive sales funnel. That is the gap RankMatrix is trying to
          close. The same official data, organised around the actual decision, with no toll booths.
        </p>

        <h2>Who built it</h2>
        <p>
          RankMatrix is built and maintained by{' '}
          <MuiLink
            href="https://www.linkedin.com/in/ag-divyansh/"
            target="_blank"
            rel="noopener noreferrer author"
          >
            Divyansh Agarwal
          </MuiLink>{' '}
          (
          <MuiLink href="https://github.com/nikkuAg" target="_blank" rel="noopener noreferrer me">
            GitHub
          </MuiLink>
          ), an IIT Roorkee alumnus working as a software development engineer. The site is an
          independent side project, not a company. It is not affiliated with JoSAA, JEE, NTA, the
          IITs, NITs, IIITs, or GFTIs. Every claim on the site is checkable against the official
          source.
        </p>

        <h2>Where the data comes from</h2>
        <p>The data on RankMatrix is sourced from public JoSAA publications:</p>
        <ul>
          <li>
            <strong>Opening and closing ranks</strong> per institute, branch, category, gender pool,
            and round — from JoSAA&apos;s historical cutoff reports.
          </li>
          <li>
            <strong>Seat matrix</strong> — institute-by-institute, branch-by-branch seat counts per
            category — from the official JoSAA seat matrix release.
          </li>
          <li>
            <strong>Participating institutes</strong> — the canonical list JoSAA publishes each
            counselling cycle.
          </li>
        </ul>
        <p>
          For details on how the predictor uses this data — and where its predictions can be wrong —
          see the <AppLink href="/methodology">methodology page</AppLink>.
        </p>

        <h2>What RankMatrix is not</h2>
        <ul>
          <li>
            <strong>Not an official source.</strong> Always confirm the latest schedule,
            eligibility, and cutoffs on{' '}
            <MuiLink href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
              josaa.nic.in
            </MuiLink>{' '}
            before making any admission decision.
          </li>
          <li>
            <strong>Not a coaching service or admission consultancy.</strong> RankMatrix does not
            sell counselling sessions, mentorship, or paid plans. There is nothing to upsell.
          </li>
          <li>
            <strong>Not a guarantee.</strong> Predictions are projections from historical data; real
            allocations depend on the current year&apos;s applicant pool, which nobody can know in
            advance.
          </li>
        </ul>

        <h2>How RankMatrix is funded</h2>
        <p>
          The site is currently funded out of pocket. To keep it free and signup-free at scale, it
          will eventually run a small number of non-intrusive Google AdSense placements, kept well
          away from the primary tools. There are no paid plans, no premium tiers, no &ldquo;unlock
          your full predictor&rdquo; gates, and no plans to introduce any. If that ever changes, it
          will be visible on this page first.
        </p>

        <h2>Get in touch</h2>
        <p>
          Bug reports, missing data, broken links, feature ideas, or just feedback — please send
          them. The fastest channels are listed on the{' '}
          <AppLink href="/contact">contact page</AppLink>. Direct corrections to the data are
          especially welcome: if a rank, seat count, or participating-institute entry looks wrong,
          tell me and I will check it against the official source and fix it.
        </p>
      </GuideLayout>
    </>
  );
}
