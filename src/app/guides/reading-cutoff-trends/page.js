import Link from 'next/link';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PATH = '/guides/reading-cutoff-trends';
const TITLE = 'How to compare JoSAA cutoff changes without mixing rank lists';
const DESCRIPTION =
  'A worked JoSAA 2025 example of round-wise cutoff movement, plus a repeatable checklist for comparing rank lists, quota, category, seat pool and source coverage.';
const DATE = '2026-11-06';
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
    articleJsonLd({
      path: PATH,
      title: TITLE,
      description: DESCRIPTION,
      datePublished: '2026-10-24',
      dateModified: DATE,
    }),
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
        lastUpdated="6 November 2026"
        readingTimeMinutes={5}
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
            If either matching row is absent, report the comparison as unavailable rather than
            substituting zero.
          </li>
        </ol>
        <h2>Worked example: IIT Bhubaneswar Civil Engineering, JoSAA 2025</h2>
        <p>
          This is one published slice: IIT Bhubaneswar, Civil Engineering (4-year B.Tech), AI
          quota, OPEN category and Gender-Neutral pool. The table shows the opening rank, closing
          rank and change in closing-rank number from the previous round. The official archive calls
          the category OPEN; RankMatrix displays it as General. For an IIT programme, use the
          applicable JEE Advanced rank list.
        </p>
        <div
          className="table-scroll"
          role="region"
          aria-label="JoSAA 2025 IIT Bhubaneswar Civil Engineering ranks by round"
          tabIndex={0}
        >
          <table className="compact-table">
            <caption>
              JoSAA 2025, IIT Bhubaneswar Civil Engineering, AI / OPEN / Gender-Neutral
            </caption>
            <thead>
              <tr>
                <th scope="col">Round</th>
                <th scope="col">Opening rank</th>
                <th scope="col">Closing rank</th>
                <th scope="col">Closing-rank change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>10,063</td>
                <td>13,957</td>
                <td>—</td>
              </tr>
              <tr>
                <td>2</td>
                <td>10,486</td>
                <td>14,422</td>
                <td>+465</td>
              </tr>
              <tr>
                <td>3</td>
                <td>10,486</td>
                <td>14,467</td>
                <td>+45</td>
              </tr>
              <tr>
                <td>4</td>
                <td>10,486</td>
                <td>14,467</td>
                <td>0</td>
              </tr>
              <tr>
                <td>5</td>
                <td>10,486</td>
                <td>14,467</td>
                <td>0</td>
              </tr>
              <tr>
                <td>6</td>
                <td>10,922</td>
                <td>16,156</td>
                <td>+1,689</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          From Round 1 to Round 6, the closing-rank number increased by 2,199
          (16,156 − 13,957). The path was not smooth: it changed by 465 in Round 2 and 45 in Round
          3, stayed the same in Rounds 4 and 5, then changed by 1,689 in Round 6. These are
          differences between published endpoints; they do not explain why allocations changed.
        </p>
        <ul>
          <li>
            A rank of 14,200 is numerically outside the Round 1 endpoints and inside the Round 2
            endpoints for this slice. That comparison alone does not show whether a particular
            candidate received or accepted an allocation.
          </li>
          <li>
            A closing-rank number changing does not by itself establish that seats were added,
            removed or left vacant. Check the matching year&apos;s seat matrix and allocation rules
            before drawing those conclusions.
          </li>
        </ul>
        <p>
          Reproduce the example using JoSAA&apos;s{' '}
          <a
            href="https://josaa.admissions.nic.in/applicant/seatmatrix/openingclosingrankarchieve.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            previous-years opening and closing rank archive
          </a>
          : select 2025, each round, Indian Institute of Technology, Indian Institute of Technology
          Bhubaneswar, Civil Engineering, and OPEN. Compare the same quota and seat pool in every
          round. The official page states that Open-seat ranks represent CRL; ranks from different
          lists must not be mixed.
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
