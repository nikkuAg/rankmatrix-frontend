import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { GuideLayout } from '@/components/GuideLayout';
import { breadcrumbJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/contact';
const TITLE = 'Contact';
const DESCRIPTION =
  'Get in touch with the maker of RankMatrix — for bug reports, data corrections, feedback, and feature requests.';
const CONTACT_EMAIL = 'a.divyansh.25@gmail.com';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: `${TITLE} | RankMatrix`,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | RankMatrix`,
    description: DESCRIPTION,
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `https://rankmatrix.in${PAGE_URL}`,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <GuideLayout
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
          <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>
        </p>
        <p>
          For data correction requests, please include the page URL and a link or screenshot of the
          official source you are comparing against — that makes the fix loop almost instant.
        </p>

        <h2>GitHub</h2>
        <p>
          Code, issues, and feature requests can also go to the maker&apos;s GitHub:{' '}
          <MuiLink href="https://github.com/nikkuAg" target="_blank" rel="noopener noreferrer me">
            github.com/nikkuAg
          </MuiLink>
          .
        </p>

        <h2>LinkedIn</h2>
        <p>
          For professional queries, collaborations, or anything that does not fit a bug tracker:{' '}
          <MuiLink
            href="https://www.linkedin.com/in/ag-divyansh/"
            target="_blank"
            rel="noopener noreferrer author"
          >
            linkedin.com/in/ag-divyansh
          </MuiLink>
          .
        </p>

        <h2>What this is not for</h2>
        <p>
          RankMatrix is not an admission consultancy. The site cannot tell you which college to
          pick, run a personalised counselling session, or intervene in your JoSAA registration. For
          anything specific to your candidature — eligibility, documentation, reporting, payment —
          please refer to the official{' '}
          <MuiLink href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
            JoSAA portal
          </MuiLink>
          .
        </p>
      </GuideLayout>
    </>
  );
}
