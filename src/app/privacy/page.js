import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { breadcrumbJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/privacy';
const TITLE = 'Privacy Policy';
const DESCRIPTION =
  'How RankMatrix handles your data — what is collected, what is not, and what is stored only on your own device. Plain-English privacy policy.';
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
    { name: 'Privacy Policy', path: PAGE_URL },
  ]),
];

export default function Privacy() {
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
        readingTimeMinutes={5}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: PAGE_URL },
        ]}
      >
        <h2>The short version</h2>
        <p>
          RankMatrix is built to be useful without asking for anything personal. There is no signup,
          no phone number, no email collection, and no user account. The site does not run a
          database of users — anything you type into the predictor or filters lives only in your own
          browser&apos;s local storage so you do not have to retype it next time.
        </p>
        <p>The only third parties involved are:</p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — anonymised usage analytics so the maker can see
            which pages and features are being used.
          </li>
          <li>
            <strong>Vercel</strong> — the hosting platform that serves the site, which automatically
            processes basic request metadata (IP, user agent, request URL) to deliver and protect
            the service.
          </li>
          <li>
            <strong>Google AdSense</strong> — used to display ads on the site (or will be, once the
            site is approved). AdSense uses cookies to serve ads.
          </li>
        </ul>
        <p>
          The longer policy below explains each of these, what data they touch, how to opt out, and
          your rights under GDPR (EU/UK) and India&apos;s DPDP Act.
        </p>

        <h2>Who this policy applies to</h2>
        <p>
          This policy applies to{' '}
          <MuiLink href="https://rankmatrix.in" target="_blank" rel="noopener noreferrer">
            rankmatrix.in
          </MuiLink>{' '}
          (&ldquo;RankMatrix&rdquo;, &ldquo;the site&rdquo;, &ldquo;we&rdquo;), an independent
          project run by Divyansh Agarwal. It does not apply to any third-party site that RankMatrix
          links to — those have their own policies.
        </p>

        <h2>What RankMatrix does not collect</h2>
        <p>
          RankMatrix does <strong>not</strong>:
        </p>
        <ul>
          <li>
            Ask for your name, phone number, email, or any other personal contact information.
          </li>
          <li>Run user accounts, logins, or sessions.</li>
          <li>Store anything you type into the predictor, filters, or search boxes on a server.</li>
          <li>Sell, rent, or share data with marketing partners or admission consultancies.</li>
          <li>Send you marketing calls, marketing emails, or push notifications.</li>
        </ul>

        <h2>What is stored only on your device</h2>
        <p>
          To make the experience smooth and avoid forcing you to retype the same inputs across
          sessions, the site saves a small amount of state in your browser&apos;s local storage:
        </p>
        <ul>
          <li>
            <strong>Predictor inputs</strong> — your last entered rank, category, gender pool, and
            home state, so the predictor remembers them on your next visit.
          </li>
          <li>
            <strong>UI preferences</strong> — for example, light vs dark theme.
          </li>
          <li>
            <strong>Recent filters</strong> — last-used filters on list pages such as Opening &amp;
            Closing Ranks or Seat Matrix, so reload does not wipe them.
          </li>
        </ul>
        <p>
          This data lives only in your browser. RankMatrix&apos;s servers do not read or store it.
          You can clear it at any time by clearing site data for rankmatrix.in in your
          browser&apos;s settings.
        </p>

        <h2>Analytics</h2>
        <h3>Google Analytics</h3>
        <p>
          RankMatrix uses Google Analytics 4 to understand which pages and features are used and to
          spot bugs in the user flow. Google Analytics records usage events such as pageviews, time
          on page, screen size, country, and referrer. It uses cookies (or browser storage in
          equivalent form) to do this. The data is processed by Google in line with{' '}
          <MuiLink
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s privacy policy
          </MuiLink>
          .
        </p>
        <p>
          IP-anonymisation is used where Google supports it. RankMatrix does not link analytics data
          to any personal identifier (because none is collected).
        </p>

        <h3>Vercel</h3>
        <p>
          The site is hosted on Vercel. As is standard for any web host, Vercel processes basic
          request metadata — your IP address, user agent, request URL, and timestamp — to deliver
          the page and protect the service from abuse. Vercel may also collect aggregate performance
          and traffic statistics for the deployment owner. See{' '}
          <MuiLink
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel&apos;s privacy policy
          </MuiLink>{' '}
          for details.
        </p>

        <h2>Advertising (Google AdSense)</h2>
        <p>
          RankMatrix uses Google AdSense to display ads. (The AdSense loader script is included on
          the site for the purposes of Google&apos;s site-verification review; ad units may not be
          live on every page yet.) When ads are served:
        </p>
        <ul>
          <li>
            Google and its partners may use cookies to serve ads based on your prior visits to this
            and other sites.
          </li>
          <li>
            Personalised advertising via the DoubleClick / Google ad cookie can be turned off at{' '}
            <MuiLink
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              google.com/settings/ads
            </MuiLink>
            .
          </li>
          <li>
            For non-Google vendors, opt-out controls are available at{' '}
            <MuiLink
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info/choices
            </MuiLink>
            .
          </li>
          <li>
            For users in the EU/UK, RankMatrix relies on Google&apos;s consent management; you can
            review and withdraw consent through Google&apos;s tools above.
          </li>
        </ul>
        <p>
          Google&apos;s use of cookies for ads is governed by{' '}
          <MuiLink
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s ad policy
          </MuiLink>
          .
        </p>

        <h2>Cookies</h2>
        <p>
          RankMatrix itself sets no first-party cookies for tracking. Cookies on the site come from:
        </p>
        <ul>
          <li>Google Analytics — for usage measurement.</li>
          <li>Google AdSense — for ad serving.</li>
        </ul>
        <p>
          You can block cookies in your browser. The site will still work without analytics or ads —
          the predictor, ranks, and seat matrix do not depend on cookies.
        </p>

        <h2>Children</h2>
        <p>
          JoSAA candidates are typically 17 or older. RankMatrix is not directed at children under
          13 and does not knowingly collect any data from them. If you believe a minor has provided
          information through any feedback channel, please email so it can be deleted.
        </p>

        <h2>Your rights</h2>
        <p>
          Because RankMatrix does not collect personal data, there is normally nothing identifiable
          to access, correct, or delete. Where applicable law (such as GDPR for EU/UK residents or
          India&apos;s DPDP Act) gives you rights over data processed about you — including the
          right to access, correct, or erase data, or to object to processing — you can exercise
          those rights by emailing{' '}
          <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>. For Google Analytics
          and AdSense data, exercising rights against Google directly via the tools linked above is
          usually faster.
        </p>

        <h2>Data retention</h2>
        <p>
          RankMatrix retains no personal data of its own. Google Analytics and AdSense retain data
          per Google&apos;s default retention settings; see Google&apos;s policies above.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes — for example, when ad units actually start serving, or if a new
          third-party service is added — the change will be reflected on this page with an updated
          &ldquo;Updated&rdquo; date at the top. Material changes will be summarised in the change
          history below.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy or about how data is handled can be sent to{' '}
          <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>. Other ways to reach
          out are listed on the <AppLink href="/contact">contact page</AppLink>.
        </p>
      </GuideLayout>
    </>
  );
}
