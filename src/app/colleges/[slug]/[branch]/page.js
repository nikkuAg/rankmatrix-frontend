import React from 'react';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { AppLink } from '@/components/AppLink';
import { CutoffAnalysis } from '@/components/CutoffAnalysis';
import { DataPageLayout } from '@/components/DataPageLayout';
import { DataSourceNotes } from '@/components/DataSourceNotes';
import { cutoffSummaries } from '@/utils/cutoffSummaries.mjs';
import { instituteType } from '@/utils/instituteIdentity.mjs';
import { breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata, instituteTitleName, programmeTitleName } from '@/utils/metadata.mjs';
import { fetchInstituteBranchSeo } from '@/utils/seoApi';

export const revalidate = 86400;
// Intentionally empty — combinations are many; generate on first request
// via ISR and cache thereafter. Keeps build times sane.
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

const SITE_URL = 'https://www.rankmatrix.in';

async function loadData(instituteSlug, branchSlug) {
  return fetchInstituteBranchSeo(instituteSlug, branchSlug);
}

export async function generateMetadata({ params }) {
  const { slug, branch } = await params;
  const data = await loadData(slug, branch);
  if (!data) notFound();
  const name = instituteTitleName(data.institute);
  const year = data.yearsAvailable?.[0] ? ` ${data.yearsAvailable[0]}` : '';
  return buildMetadata({
    path: `/colleges/${slug}/${branch}`,
    title: `${name} ${programmeTitleName(data.branch)} Cutoffs${year}`,
    description: `${name} ${programmeTitleName(data.branch)}: compare JoSAA opening and closing ranks by year, round, category and quota, plus published seat data.`,
    index: Boolean(data.cutoffs?.length),
  });
}

const formatRank = (value) => (value == null ? '—' : value.toLocaleString('en-IN'));

const buildFaqs = (data, summaries) => {
  const years = data.yearsAvailable || [];
  return [
    {
      question: `What was the ${data.branch.name} closing rank at ${data.institute.name}?`,
      answer: summaries.length
        ? summaries
            .map(
              (row) =>
                `JoSAA ${row.year}, Round ${row.round}, Open category, Gender-Neutral seat pool, ${row.quota} quota: opening rank ${formatRank(row.openingRank)}, closing rank ${formatRank(row.closingRank)}.`,
            )
            .join(' ')
        : 'RankMatrix has no matching Open category, Gender-Neutral summary on file for this combination. Other categories or years may still have rows below. This does not establish whether official data has been published.',
    },
    {
      question: `Which JoSAA years are covered on this page?`,
      answer:
        years.length > 0
          ? `The cutoffs table below includes ${years.length} year${years.length === 1 ? '' : 's'} of data: ${years.join(', ')}. For full methodology, read the opening and closing ranks guide.`
          : 'RankMatrix currently has no cutoff rows on file for this institute and programme. Check the official JoSAA publications for available data.',
    },
    {
      question: `How do home state and other state quotas work at this institute?`,
      answer:
        'Use the quota column in each row: AI means All India, HS means Home State and OS means Other State. Other institute-specific quotas may also appear. State-code eligibility follows the applicable JoSAA business rules; do not infer it from the school board or your current address.',
    },
    {
      question: `Will my JEE rank qualify for ${data.branch.name} at ${data.institute.name}?`,
      answer: `Compare your rank against the closing ranks below from the most recent two to three years. Use the same exam, rank list, category, quota and seat pool for the comparison. Historical closing ranks do not guarantee admission or quantify your probability. Use the RankMatrix College & Branch Predictor for a rank-based shortlist across all JoSAA colleges.`,
    },
  ];
};

const groupCutoffsByYear = (cutoffs) => {
  const byYear = new Map();
  cutoffs.forEach((row) => {
    if (!byYear.has(row.year)) byYear.set(row.year, []);
    byYear.get(row.year).push(row);
  });
  return [...byYear.entries()].sort(([a], [b]) => b - a);
};

export default async function InstituteBranchPage({ params }) {
  const { slug, branch } = await params;
  const data = await loadData(slug, branch);
  if (!data) notFound();

  const canonicalPath = `/colleges/${slug}/${branch}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const latestYear = data.yearsAvailable?.[0];
  const latestYearRows = data.cutoffs.filter((r) => r.year === latestYear);
  const summaries = cutoffSummaries(latestYearRows, latestYear);
  const faqs = buildFaqs(data, summaries);

  const yearGroups = groupCutoffsByYear(data.cutoffs);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: `${data.branch.name} opening and closing ranks at ${data.institute.name}`,
      description: `JoSAA opening and closing ranks and seat matrix for ${data.branch.name} at ${data.institute.name}, spanning the ${data.yearsAvailable?.length || 0} most recent counselling years.`,
      url: canonicalUrl,
      keywords: [data.institute.name, data.branch.name, 'JoSAA', 'opening rank', 'closing rank'],
      creator: {
        '@type': 'Organization',
        name: 'Joint Seat Allocation Authority (JoSAA)',
        url: 'https://josaa.nic.in/',
      },
      publisher: { '@type': 'Organization', name: 'RankMatrix', url: SITE_URL },
      creditText: 'JoSAA source observations compiled and presented by RankMatrix.',
      isAccessibleForFree: true,
      isBasedOn: 'https://josaa.nic.in/or-cr/',
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Colleges', path: '/colleges' },
      { name: data.institute.name, path: `/colleges/${slug}` },
      { name: data.branch.name, path: canonicalPath },
    ]),
    faqJsonLd(faqs),
  ];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(obj) }}
        />
      ))}
      <DataPageLayout
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Colleges', path: '/colleges' },
          { name: data.institute.name, path: `/colleges/${slug}` },
          { name: data.branch.name, path: canonicalPath },
        ]}
        title={`${data.branch.name} at ${data.institute.name}`}
        subtitle={`${data.branch.degree} · ${data.branch.courseDuration}-year programme · JoSAA counselling`}
        badges={[
          { label: instituteType(data.institute) },
          { label: `Programme code ${data.branch.code}` },
          { label: data.institute.state },
          { label: `${data.yearsAvailable?.length || 0} years of data` },
        ]}
        lastUpdated={latestYear ? `JoSAA ${latestYear}` : 'Year not available'}
      >
        <h2>Summary</h2>
        <p>
          Open category, Gender-Neutral seat pool. Each available quota is shown separately at its
          latest recorded round in JoSAA {latestYear || 'the latest stored year'}. Quota labels do
          not establish your eligibility.
        </p>
        {summaries.length ? (
          <Box className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Quota</th>
                  <th>Round</th>
                  <th>Opening rank</th>
                  <th>Closing rank</th>
                </tr>
              </thead>
              <tbody>
                {summaries.map((row) => (
                  <tr key={row.quota}>
                    <td>{row.quota}</td>
                    <td>{row.round}</td>
                    <td>{formatRank(row.openingRank)}</td>
                    <td>{formatRank(row.closingRank)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          <p>
            RankMatrix has no matching Open category, Gender-Neutral summary on file. Other
            categories or years may have rows below.
          </p>
        )}

        <CutoffAnalysis rows={data.cutoffs} year={latestYear} />

        <h2>Opening and closing ranks by year</h2>
        {yearGroups.length === 0 ? (
          <p>No cutoff rows are currently on file in RankMatrix for this combination.</p>
        ) : (
          yearGroups.map(([year, rows]) => (
            <React.Fragment key={year}>
              <h3>JoSAA {year}</h3>
              <Box className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Round</th>
                      <th>Quota</th>
                      <th>Category</th>
                      <th>Seat pool</th>
                      <th>Opening rank</th>
                      <th>Closing rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={`${year}-${i}`}>
                        <td>{row.round}</td>
                        <td>{row.quota}</td>
                        <td>{row.category}</td>
                        <td>{row.seatPool}</td>
                        <td>{formatRank(row.openingRank)}</td>
                        <td>{formatRank(row.closingRank)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </React.Fragment>
          ))
        )}

        <h2>Latest seat matrix {latestYear ? `(${latestYear})` : ''}</h2>
        {data.seats && data.seats.length > 0 ? (
          <Box className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Quota</th>
                  <th>Category</th>
                  <th>Seat pool</th>
                  <th>Seats</th>
                </tr>
              </thead>
              <tbody>
                {data.seats.map((row, i) => (
                  <tr key={i}>
                    <td>{row.quota}</td>
                    <td>{row.category}</td>
                    <td>{row.seatPool}</td>
                    <td>{row.availableSeats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          <p>
            RankMatrix has no seat rows on file for this combination in the cutoff year shown. Check
            the official seat matrix for the latest release.
          </p>
        )}

        <DataSourceNotes
          cutoffYears={data.cutoffs.map((row) => row.year)}
          seatYears={(data.seats || []).map((row) => row.year)}
          includeSeats
        />
        <h2>Source and rank-list interpretation</h2>
        <p>
          Source:{' '}
          <a href="https://josaa.nic.in/or-cr/" target="_blank" rel="noopener noreferrer">
            official JoSAA opening and closing ranks
          </a>
          . IIT and IISc cutoffs use JEE Advanced ranks; NIT+ cutoffs use the applicable JEE Main
          rank list. Compare OPEN rows with CRL and reserved-category rows with the corresponding
          category rank. Match the year, round, quota and seat pool before comparing. RankMatrix
          reproduces historical data; the current JoSAA rules and published results remain
          authoritative.
        </p>
        <h2>Using this data</h2>
        <ul>
          <li>
            For your rank&apos;s full shortlist across JoSAA, use the{' '}
            <AppLink href="/predict">College &amp; Branch Predictor</AppLink>.
          </li>
          <li>
            To compare {data.branch.name} at other institutes, see{' '}
            <AppLink href={`/branches/${branch}`}>{data.branch.name}</AppLink>.
          </li>
          <li>
            To see every branch offered at {data.institute.name}, go to{' '}
            <AppLink href={`/colleges/${slug}`}>{data.institute.name}</AppLink>.
          </li>
          <li>
            To understand the columns above, read the{' '}
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              opening &amp; closing ranks guide
            </AppLink>
            .
          </li>
        </ul>

        <h2>Frequently asked questions</h2>
        {faqs.map((faq) => (
          <React.Fragment key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </React.Fragment>
        ))}
      </DataPageLayout>
    </>
  );
}
