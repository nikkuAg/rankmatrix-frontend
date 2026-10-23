import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/methodology';
const TITLE = 'How the RankMatrix college predictor uses JoSAA cutoffs';
const DESCRIPTION =
  'Learn how RankMatrix compares your JEE rank with historical JoSAA cutoffs, which filters it uses and why predictions cannot guarantee admission.';
const PUBLISHED = '2026-05-10';

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'How the JEE College Predictor Works',
  description: DESCRIPTION,
  type: 'article',
  publishedTime: PUBLISHED,
  modifiedTime: '2026-10-23',
});

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: '2026-10-23',
  }),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Methodology', path: PAGE_URL },
  ]),
];

export default function Methodology() {
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
        lastUpdated="23 October 2026"
        readingTimeMinutes={5}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Methodology', path: PAGE_URL },
        ]}
      >
        <h2>What the predictor does</h2>
        <p>
          RankMatrix builds a shortlist by comparing your inputs with recorded JoSAA opening and
          closing ranks. It does not calculate a probability of admission, simulate the full JoSAA
          allocation process or forecast a future closing rank. The explanation below follows the
          current backend implementation.
        </p>
        <h2>Inputs and comparison window</h2>
        <p>
          The request includes JEE Main rank, optional JEE Advanced rank, category, seat pool,
          state-code input, a percentage delta and a result count. The backend computes a lower
          bound by rounding down rank × (1 − delta / 100), and an upper bound by rounding up rank ×
          (1 + delta / 100). A wider delta is a wider search window, not a confidence level.
        </p>
        <p>
          For example, rank 10,000 with delta 10 gives a 9,000–11,000 window. These are hypothetical
          input bounds, not published cutoffs or an assertion of admission chances. Use the rank
          from the same exam and category list as the cutoff row being compared.
        </p>
        <h2>Which year and round are used?</h2>
        <p>
          The predictor queries the backend&apos;s configured latest JoSAA rank model and its
          maximum stored round. It does not average several years or default to round four. Older
          years remain useful for manual comparisons in the{' '}
          <AppLink href="/ranks">rank explorer</AppLink> and institute–programme detail pages. A new
          model year needs imported data before it can produce useful predictions.
        </p>
        <h2>How rows are selected and ordered</h2>
        <ol>
          <li>
            Match category, seat pool and the maximum stored round; exclude preparatory-course rows.
          </li>
          <li>
            Use the Advanced-rank window for participating IIT and IISc programme rows and the
            Main-rank window for other rows. IISc is stored in the backend&apos;s IIT filter bucket;
            it is labelled separately in the interface.
          </li>
          <li>
            Identify home-quota institutes using stored institute-state and quota relationships.
          </li>
          <li>
            Prioritise rows whose opening/closing interval overlaps the input bounds, followed by
            additional rows above the window, using the backend&apos;s selection tiers.
          </li>
          <li>
            Limit to the requested count, then display the selected rows ordered by opening rank.
          </li>
        </ol>
        <p>
          The selection tiers are implementation priorities, not labels of safe, likely or
          guaranteed admission. The endpoint does not cross-check each result against current seat
          counts, perform document verification or evaluate every exceptional eligibility rule.
        </p>
        <h2>What to verify before filling choices</h2>
        <ul>
          <li>Match the exam, category rank list, quota and seat pool in every comparison.</li>
          <li>
            Inspect the year and round. A historical interval can change in a future allocation.
          </li>
          <li>
            Check the <AppLink href="/seat-matrix">published seat matrix</AppLink> and official
            programme restrictions.
          </li>
          <li>
            Arrange eligible choices by your genuine preferences. The shortlist is not a recommended
            preference order.
          </li>
        </ul>
        <h2>Sources, refreshes and corrections</h2>
        <p>
          Rank and seat data originate from{' '}
          <MuiLink href="https://josaa.nic.in/or-cr/">JoSAA publications</MuiLink>. Importing an
          official release and refreshing a cached web page are separate operations. Detail pages
          can revalidate daily, but that does not mean new official data have been imported daily. A
          displayed JoSAA year identifies the dataset, not the date of the last import. Please{' '}
          <AppLink href="/contact">report discrepancies</AppLink> with the exact year, round and
          filters.
        </p>
        <p>
          RankMatrix is an independent reference tool. Complete registration, choice filling,
          payments and reporting on the official portal under the current rules. See the{' '}
          <AppLink href="/terms">terms</AppLink> and{' '}
          <AppLink href="/privacy">privacy policy</AppLink>.
        </p>
      </GuideLayout>
    </>
  );
}
