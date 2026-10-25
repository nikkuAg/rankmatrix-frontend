import React from 'react';
import { GuideLayout } from '@/components/GuideLayout';
import { breadcrumbJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/contact';
const TITLE = 'Contact';
const DESCRIPTION =
  'Report a bug, flag a JoSAA data error or suggest a feature. Find contact details for the developer of RankMatrix.';
const CONTACT_EMAIL = 'a.divyansh.25@gmail.com';

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'Contact RankMatrix: Feedback & Data Corrections',
  description: DESCRIPTION,
});

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `https://www.rankmatrix.in${PAGE_URL}`,
  name: TITLE,
  description: DESCRIPTION,
};

const jsonLd = [
  contactJsonLd,
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: PAGE_URL },
  ]),
];

export default function Contact() {
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
        variant="contact"
        eyebrow="Contact / corrections"
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated="May 2026"
        readingTimeMinutes={1}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: PAGE_URL },
        ]}
      >
        <p>
          RankMatrix is a one-person project. The fastest way to reach the maker is by email or on
          one of the social profiles below. Bug reports, data corrections, missing institutes,
          broken cutoff entries, and feature ideas are all welcome.
        </p>

        <h2>Email</h2>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          For data correction requests, please include the page URL and a link or screenshot of the
          official source you are comparing against — that makes the fix loop almost instant.
        </p>
        <ol>
          <li>
            <strong>The page URL</strong> — identify the institute, programme or tool.
          </li>
          <li>
            <strong>The allocation context</strong> — year, round, category, quota and seat pool.
          </li>
          <li>
            <strong>The observation</strong> — explain what appears incorrect.
          </li>
          <li>
            <strong>The official source</strong> — include the publication you checked.
          </li>
        </ol>
        <p>Do not send passwords, identity documents or unnecessary personal information.</p>

        <h2>GitHub</h2>
        <p>
          Code, issues, and feature requests can also go to the maker&apos;s GitHub:{' '}
          <a href="https://github.com/nikkuAg" target="_blank" rel="noopener noreferrer me">
            github.com/nikkuAg
          </a>
          .
        </p>

        <h2>LinkedIn</h2>
        <p>
          For professional queries, collaborations, or anything that does not fit a bug tracker:{' '}
          <a
            href="https://www.linkedin.com/in/ag-divyansh/"
            target="_blank"
            rel="noopener noreferrer author"
          >
            linkedin.com/in/ag-divyansh
          </a>
          .
        </p>

        <h2>What this is not for</h2>
        <p>
          RankMatrix is not an admission consultancy. The site cannot tell you which college to
          pick, run a personalised counselling session, or intervene in your JoSAA registration. For
          anything specific to your candidature — eligibility, documentation, reporting, payment —
          please refer to the official{' '}
          <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
            JoSAA portal
          </a>
          .
        </p>
      </GuideLayout>
    </>
  );
}
