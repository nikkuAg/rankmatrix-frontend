import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { breadcrumbJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/privacy';
const TITLE = 'Privacy Policy';
const DESCRIPTION =
  'Read how RankMatrix handles browser storage, analytics, advertising and technical request data, and how to contact us about privacy.';
const EFFECTIVE_DATE = '24 October 2026';
const CONTACT_EMAIL = 'a.divyansh.25@gmail.com';

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'Privacy Policy',
  description: DESCRIPTION,
});

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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(obj) }}
        />
      ))}
      <GuideLayout
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated={EFFECTIVE_DATE}
        readingTimeMinutes={3}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: PAGE_URL },
        ]}
      >
        <h2>Using the tools</h2>
        <p>You do not need an account or contact details to use RankMatrix. Predictor ranks,
          category, seat pool, state and settings are sent to our backend when you submit the form.
          Search text, filters, sorting and pagination are also sent when you use data tables.</p>
        <p>Inputs do not stay only on your device. The backend processes requests and temporarily
          caches results. Hosting and network services may record technical data such as IP
          addresses, request times, URLs, errors and browser information. Do not enter names,
          contact details or sensitive information in search fields.</p>
        <h2>Storage on your device</h2>
        <p>Predictor form settings and theme preferences use browser local storage. Table filters
          and loaded results are held in application memory, rather than permanently saved as
          preferences. Your browser&apos;s site-data controls can remove saved settings. Clearing
          browser storage does not remove information already processed by servers or providers.</p>
        <h2>Providers, analytics and advertising</h2>
        <p>Microsoft Azure services host the website, backend and database. Vercel may also
          process technical request data when you visit a retained Vercel deployment.
          These providers handle technical request data to operate the service. Google Analytics
          can be enabled through deployment configuration. When loaded, it can process page visits,
          device information, cookies and interaction events. Reviewed custom events use aggregate
          counts and static labels rather than sending ranks, states, categories or search text
          as event values.</p>
        <p>Google AdSense is the intended advertising provider. If advertising scripts are enabled,
          Google and its partners may process request/device information and use cookies or similar
          identifiers. Verification meta tags and ads.txt alone do not load ads. We do not claim
          all requests are anonymous, cookies are absent, or Google automatically supplies all
          consent controls a deployment may require.</p>
        <p>See the <MuiLink href="https://policies.google.com/privacy" target="_blank"
          rel="noopener noreferrer">Google privacy policy</MuiLink>,{' '}
          <MuiLink href="https://vercel.com/legal/privacy-policy" target="_blank"
          rel="noopener noreferrer">Vercel privacy policy</MuiLink> and{' '}
          <MuiLink href="https://privacy.microsoft.com/privacystatement" target="_blank"
          rel="noopener noreferrer">Microsoft privacy statement</MuiLink> for provider practices.</p>
        <h2>Retention and requests</h2>
        <p>Browser settings remain until cleared or replaced. Cache expiry is separate from hosting
          logs, analytics retention and provider backups; we do not promise all server data
          disappears when a cache expires. Contact us about information associated with a request
          or a privacy concern. Do not send passwords, identity documents or unnecessary sensitive
          details. Email correspondence is processed by the email provider and may be kept to respond.</p>
        <p>Contact: <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>.
          Requests depend on information we can identify and applicable requirements. Not having
          an account does not make a privacy request irrelevant.</p>
        <h2>Changes and related information</h2>
        <p>The date above records this page&apos;s review, not a dataset import. Changes to tools or
          optional services should be reflected here. See the{' '}
          <AppLink href="/terms">terms of use</AppLink> for data and prediction limitations.</p>
      </GuideLayout>
    </>
  );
}
