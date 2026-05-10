import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { breadcrumbJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/terms';
const TITLE = 'Terms of Use';
const DESCRIPTION =
  'Plain-English terms for using RankMatrix — including the unofficial-data disclaimer, no-warranty notice, and limitation of liability.';
const EFFECTIVE_DATE = 'May 10, 2026';
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

const jsonLd = [
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Terms of Use', path: PAGE_URL },
  ]),
];

export default function Terms() {
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
        lastUpdated={EFFECTIVE_DATE}
        readingTimeMinutes={4}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms', path: PAGE_URL },
        ]}
      >
        <h2>The short version</h2>
        <p>
          RankMatrix is a free, independent tool. It is not an official source. Predictions and
          cutoff data are projections from public JoSAA publications, not guarantees. By using the
          site you agree to the terms below.
        </p>

        <h2>1. About RankMatrix</h2>
        <p>
          RankMatrix is operated by Divyansh Agarwal as an independent project (
          &ldquo;RankMatrix&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). The site is not affiliated
          with, endorsed by, or sponsored by JoSAA, JEE, NTA, the IITs, NITs, IIITs, GFTIs, or any
          government body. References to those names are descriptive, not promotional.
        </p>

        <h2>2. Unofficial data, no admission decisions</h2>
        <p>
          All data on RankMatrix — including opening and closing ranks, seat matrix figures,
          participating-institute lists, and predictor outputs — is sourced from public JoSAA
          publications and presented in a more usable form. It is provided for informational
          purposes only.
        </p>
        <p>
          <strong>
            You must verify the latest schedule, eligibility, rules, and cutoffs on the official{' '}
            <MuiLink href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
              JoSAA website
            </MuiLink>{' '}
            before making any admission decision.
          </strong>{' '}
          Where data on RankMatrix differs from JoSAA&apos;s official source, the official source
          governs.
        </p>

        <h2>3. The predictor is a projection, not a guarantee</h2>
        <p>
          The JEE college and branch predictor projects what allocations might look like based on
          historical cutoffs and the inputs you provide. Real allocations depend on the current
          year&apos;s applicant pool, branch popularity, seat-matrix changes, and JoSAA&apos;s
          allocation algorithm — all of which the predictor cannot know in advance. Treat predictor
          output as a starting point for thinking, not as a promise of admission. See the{' '}
          <AppLink href="/methodology">methodology page</AppLink> for what the predictor does and
          does not do.
        </p>

        <h2>4. Permitted use</h2>
        <p>
          You can use RankMatrix to research and plan your own JoSAA participation, share specific
          pages with friends or family, and link to it from your own site or social profile. You
          must not:
        </p>
        <ul>
          <li>Scrape or bulk-download the site in a way that overloads the service.</li>
          <li>
            Republish or resell the site&apos;s data as if it were your own, or strip the source
            attribution.
          </li>
          <li>
            Use the site or its outputs to mislead candidates — for example, to falsely guarantee
            admission as part of a paid service.
          </li>
          <li>Attempt to break, probe, or interfere with the site&apos;s security or hosting.</li>
        </ul>

        <h2>5. Third-party services and links</h2>
        <p>
          RankMatrix uses Google Analytics, hosting from Vercel, and Google AdSense for advertising.
          See the <AppLink href="/privacy">privacy policy</AppLink> for what each does and how to
          opt out where applicable.
        </p>
        <p>
          The site links to external resources, including the official JoSAA, JEE, and NTA websites.
          RankMatrix does not control those sites and is not responsible for their content,
          policies, or availability.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The underlying data on RankMatrix originates from public JoSAA publications. The site
          design, written content (guides, explanations, FAQ entries), code, and visual elements are
          the work of the maker and protected by applicable copyright. You may quote or link short
          excerpts with attribution; please do not copy whole guides verbatim onto other sites.
        </p>

        <h2>7. No warranties</h2>
        <p>
          RankMatrix is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
          warranty of any kind, express or implied. The maker does not warrant that the site will be
          uninterrupted, error-free, secure against every threat, or that any specific information
          will be complete, accurate, or up to date for your situation.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, RankMatrix and its maker are not liable for any
          loss or damage — including loss of admission opportunity, financial loss, or any indirect
          or consequential loss — arising from your use of the site, reliance on its data or
          predictions, or inability to access it. If you make an admission decision, you do so on
          the basis of your own judgement and the official JoSAA portal, not RankMatrix.
        </p>

        <h2>9. Changes to the site and these terms</h2>
        <p>
          The site evolves. Features may be added, modified, or removed. These terms may be updated
          to reflect changes in services, applicable law, or operational reality. Material changes
          will be reflected on this page with an updated &ldquo;Updated&rdquo; date. Continued use
          of the site after changes are posted constitutes acceptance.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These terms are governed by the laws of India, without regard to conflict-of-law rules.
          Disputes that cannot be resolved by direct contact will be subject to the exclusive
          jurisdiction of the courts at the maker&apos;s primary place of residence in India.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>, or via the channels
          listed on the <AppLink href="/contact">contact page</AppLink>.
        </p>
      </GuideLayout>
    </>
  );
}
