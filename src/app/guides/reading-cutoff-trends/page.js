import Link from 'next/link';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PATH = '/guides/reading-cutoff-trends';
const TITLE = 'How to compare JoSAA cutoff changes without mixing rank lists';
const DESCRIPTION =
  'A worked example of round-wise and year-wise closing-rank changes, with checks for quota, category, seat pool, missing data and source coverage.';
const DATE = '2026-10-24';
export const metadata = buildMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  type: 'article',
  publishedTime: DATE,
  modifiedTime: DATE,
});

export default function ReadingCutoffTrends() {
  const structuredData = [
    articleJsonLd({ path: PATH, title: TITLE, description: DESCRIPTION, datePublished: DATE }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides' },
      { name: 'Reading cutoff trends', path: PATH },
    ]),
  ];
  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
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
          { name: 'Reading cutoff trends', path: PATH },
        ]}
      >
        <h2>What a change in closing rank actually tells you</h2>
        <p>
          A closing rank describes the last admitted rank in a particular allocation slice. A larger
          number means the recorded closing rank increased; it does not by itself explain demand,
          make a programme better or worse, or tell you the probability of admission next year.
        </p>
        <h2>Start with one comparable slice</h2>
        <ol>
          <li>
            Choose the same institute and programme, including degree and duration, from the{' '}
            <Link href="/colleges" prefetch={false}>
              college directory
            </Link>{' '}
            or{' '}
            <Link href="/branches" prefetch={false}>
              programme directory
            </Link>
            .
          </li>
          <li>
            Match the exam and rank list. OPEN rows use CRL; reserved-category rows use the
            corresponding category rank. Main and Advanced numbers are not interchangeable. Read the{' '}
            <Link href="/guides/josaa-opening-and-closing-ranks" prefetch={false}>
              rank-list explanation
            </Link>{' '}
            before comparing.
          </li>
          <li>
            Keep category, quota and seat pool fixed. HS, OS, AI and other quota codes describe
            separate observations. A quota appearing in a table does not establish eligibility.
          </li>
          <li>
            For a year-to-year comparison, use the same round. Each quota can have a different
            latest stored round; do not silently compare one year&apos;s round 5 with another
            year&apos;s round 6.
          </li>
        </ol>
        <h2>A worked example with hypothetical numbers</h2>
        <p>
          The figures below are invented arithmetic examples for one programme, Open category,
          Gender-Neutral pool and HS quota. They are not published cutoffs for any institute.
        </p>
        <div
          className="table-scroll"
          role="region"
          aria-label="Hypothetical cutoff observations"
          tabIndex={0}
        >
          <table className="compact-table">
            <caption>Hypothetical matched observations</caption>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Round</th>
                <th scope="col">Closing rank</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025</td>
                <td>1</td>
                <td>10,000</td>
              </tr>
              <tr>
                <td>2025</td>
                <td>5</td>
                <td>12,000</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>5</td>
                <td>11,500</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            Within 2025, the closing-rank number increased by 2,000 between the first and last
            recorded rounds: 12,000 − 10,000.
          </li>
          <li>At the same round 5 across years, it increased by 500: 12,000 − 11,500.</li>
          <li>
            If round 5 were absent from 2024, the matched comparison would be unavailable. Using a
            different round or substituting zero would create a misleading change.
          </li>
        </ul>
        <p>
          Neither difference is an admission probability. The endpoints do not show what happened at
          missing intermediate rounds. Changes to programmes, eligibility rules or rank-list
          definitions can also limit historical comparisons.
        </p>
        <h2>Read the recorded-movement section on a programme page</h2>
        <p>
          Open a college, then a programme&apos;s deep cutoff page. Its analysis keeps every
          available quota separate for Open category and Gender-Neutral rows. It labels the first
          and last rounds actually on file and compares the previous calendar year only at the same
          ending round. Other categories and pools remain in the detailed tables. Missing or
          conflicting rows do not become numerical conclusions.
        </p>
        <h2>Check the source and the coverage</h2>
        <p>
          Compare the exact slice with the{' '}
          <a href="https://josaa.nic.in/or-cr/" target="_blank" rel="noopener noreferrer">
            official JoSAA opening and closing ranks
          </a>
          . A displayed year is not an import timestamp or proof that every round is present. Check
          the{' '}
          <a href="https://josaa.nic.in/seat-matrix/" target="_blank" rel="noopener noreferrer">
            official seat matrix
          </a>{' '}
          separately; cutoff movement alone does not establish a seat increase or decrease.
        </p>
        <h2>Turn the comparison into a research checklist</h2>
        <ul>
          <li>
            Use the{' '}
            <Link href="/ranks" prefetch={false}>
              cutoff explorer
            </Link>{' '}
            to select the year, round, quota, category and pool explicitly.
          </li>
          <li>
            Use the{' '}
            <Link href="/seat-matrix" prefetch={false}>
              seat-matrix tool
            </Link>{' '}
            to inspect seat observations, then verify current restrictions with JoSAA.
          </li>
          <li>
            Use the{' '}
            <Link href="/predict" prefetch={false}>
              college and branch predictor
            </Link>{' '}
            for a limited historical shortlist, not a guaranteed or probability-based list. Its
            selection method is explained in the{' '}
            <Link href="/methodology" prefetch={false}>
              predictor methodology
            </Link>
            .
          </li>
          <li>
            Order eligible choices by your preferences. The{' '}
            <Link href="/guides/josaa-choice-filling-strategy" prefetch={false}>
              choice-filling guide
            </Link>{' '}
            explains how to use research without treating past cutoffs as promises.
          </li>
        </ul>
      </GuideLayout>
    </>
  );
}
