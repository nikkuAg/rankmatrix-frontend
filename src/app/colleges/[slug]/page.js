import React from 'react';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { AppLink } from '@/components/AppLink';
import { DataPageLayout } from '@/components/DataPageLayout';
import { summaryRows } from '@/utils/cutoffSummaries.mjs';
import { admissionRankLabel, instituteType } from '@/utils/instituteIdentity.mjs';
import { breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata, instituteTitleName } from '@/utils/metadata.mjs';
import { fetchInstituteSeo } from '@/utils/seoApi';

// Rebuild a given page at most once per day (86400 s); cheap for low-change data.
export const revalidate = 86400;
// Pages not known at build time (e.g. new institutes added mid-year) are
// generated on first request and then cached.
export const dynamicParams = true;

const SITE_URL = 'https://www.rankmatrix.in';
const INSTITUTE_TYPE_LABEL = {
  IIT: 'Indian Institute of Technology',
  IISc: 'Indian Institute of Science',
  NIT: 'National Institute of Technology',
  IIIT: 'Indian Institute of Information Technology',
  GFTI: 'Government Funded Technical Institute',
};

export async function generateStaticParams() {
  // Render and cache on first request; avoid hundreds of DB-heavy build requests.
  return [];
}

async function loadInstitute(slug) {
  return fetchInstituteSeo(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await loadInstitute(slug);
  if (!data) notFound();
  const name = instituteTitleName(data);
  const year = data.latestYear ? ` ${data.latestYear}` : '';
  return buildMetadata({
    path: `/colleges/${slug}`,
    title: `${name} JoSAA Cutoffs${year}, Branches & Seats`,
    description: `Compare ${name} JoSAA cutoffs${year}, branches, seats and NIRF rank history. Explore opening and closing ranks before filling your counselling choices.`,
  });
}

const formatRank = (value) => (value == null ? '—' : value.toLocaleString('en-IN'));

const buildFaqs = (data) => {
  const typeLabel = INSTITUTE_TYPE_LABEL[instituteType(data)] || instituteType(data);
  const branchCount = data.branches?.length ?? 0;
  const latestNirf = data.nirfRanks?.[0];

  return [
    {
      question: `Where is ${data.name} located?`,
      answer: `${data.name} is located in ${data.city}, ${data.state}. Its institution family is ${typeLabel}; it participates in JoSAA counselling for admission to its undergraduate engineering programmes.`,
    },
    {
      question: `How many branches does ${data.name} offer through JoSAA?`,
      answer: `The stored active-programme catalogue lists ${branchCount} programmes for ${data.name}. This count does not certify the complete official offering for a particular counselling year; inspect the current official programme list.`,
    },
    {
      question: `What is the NIRF rank of ${data.name}?`,
      answer: latestNirf
        ? `${data.name} was ranked ${latestNirf.rank} in the stored NIRF rankings for ${latestNirf.year}. Full NIRF history is shown below.`
        : `${data.name} does not have a recent stored NIRF ranking published on RankMatrix. Check the official NIRF site for the latest.`,
    },
    {
      question: `Which rank should I compare for ${data.name}?`,
      answer: `Use the RankMatrix College & Branch Predictor and compare ${admissionRankLabel(data)} ranks with the historical closing ranks listed on this page for each branch. Match the quota, category, pool and rank list. Historical comparisons do not establish current eligibility or guarantee admission.`,
    },
  ];
};

const relatedTypeCopy = (type) => {
  switch (type) {
    case 'IISc':
      return 'IISc is the Indian Institute of Science, not an IIT. Its participating JoSAA programmes use JEE Advanced ranks.';
    case 'IIT':
      return 'Indian Institutes of Technology (IITs) admit students through JEE Advanced. Other IITs can be compared side by side from the Participating Colleges table.';
    case 'NIT':
      return 'National Institutes of Technology (NITs) admit through JEE Main and use a programme-specific quota structure, which can include Home State, Other State and additional codes. Compare other NITs in the Participating Colleges table.';
    case 'IIIT':
      return 'Indian Institutes of Information Technology (IIITs) focus on computing and adjacent disciplines. Admission uses JEE Main ranks through JoSAA.';
    case 'GFTI':
      return 'Government Funded Technical Institutes (GFTIs) is an umbrella category for government-funded institutes beyond the IIT / NIT / IIIT groups, each with its own focus area.';
    default:
      return null;
  }
};

export default async function InstitutePage({ params }) {
  const { slug } = await params;
  const data = await loadInstitute(slug);
  if (!data) notFound();

  const typeLabel = INSTITUTE_TYPE_LABEL[instituteType(data)] || instituteType(data);
  const latestNirf = data.nirfRanks?.[0];
  const faqs = buildFaqs(data);
  const canonicalPath = `/colleges/${slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const sortedNirf = [...(data.nirfRanks || [])].sort((a, b) => b.year - a.year);
  const sortedBranches = [...(data.branches || [])].sort((a, b) => a.name.localeCompare(b.name));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollegeOrUniversity',
      name: data.name,
      alternateName: data.displayCode,
      url: canonicalUrl,
      sameAs: data.url || undefined,
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.city,
        addressRegion: data.state,
        addressCountry: 'IN',
      },
      description: `${data.name} (${typeLabel}) is in ${data.city}, ${data.state}, with participating JoSAA programmes.`,
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Colleges', path: '/colleges' },
      { name: data.name, path: canonicalPath },
    ]),
    faqJsonLd(faqs),
  ];

  const relatedCopy = relatedTypeCopy(instituteType(data));

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
          { name: data.name, path: canonicalPath },
        ]}
        title={data.name}
        subtitle={`${typeLabel} · ${data.city}, ${data.state}`}
        badges={[
          { label: typeLabel },
          { label: data.state },
          ...(latestNirf ? [{ label: `NIRF ${latestNirf.rank} (${latestNirf.year})` }] : []),
          ...(data.totalSeats
            ? [
                {
                  label: `${data.totalSeats.toLocaleString('en-IN')} stored active-programme seats`,
                },
              ]
            : []),
        ]}
        lastUpdated={data.latestYear ? `JoSAA ${data.latestYear}` : 'Year not available'}
      >
        <h2>About {data.name}</h2>
        <p>
          {data.name} ({data.displayCode}) is located in {data.city}, {data.state}. Its institution
          family is {typeLabel}. For participating JoSAA programmes, compare{' '}
          {`${admissionRankLabel(data)} ranks`}, subject to the programme&apos;s requirements.
        </p>
        {relatedCopy && <p>{relatedCopy}</p>}
        <p>
          Below you will find the stored programme list for {data.name}, each with the most recent
          round&apos;s opening and closing rank for the Open category, Gender-Neutral seat pool. For
          multi-year trends on any specific branch, open the branch&apos;s deep cutoff page.
        </p>

        {sortedNirf.length > 0 && (
          <>
            <h2>stored NIRF rank history</h2>
            <Box className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>stored NIRF rank</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedNirf.map((nirf) => (
                    <tr key={nirf.year}>
                      <td>{nirf.year}</td>
                      <td>{formatRank(nirf.rank)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </>
        )}

        <h2>Branches offered at {data.name}</h2>
        <p>
          Headline closing ranks below are from the latest stored JoSAA year, Open category,
          Gender-Neutral seat pool, at the latest available allocation round, with each available
          quota shown separately. Click any branch name to open a deep page with year-wise,
          category-wise cutoff trends and the stored seat matrix for that branch. Programme seat
          totals include all categories, quotas and pools and are repeated for context; they are not
          seats in the quota row.
        </p>
        {sortedBranches.length === 0 ? (
          <p>No active branches listed for this institute in the latest cycle.</p>
        ) : (
          <Box className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Degree</th>
                  <th>Duration</th>
                  <th>Quota / round</th>
                  <th>Opening rank</th>
                  <th>Closing rank</th>
                  <th>Programme seats (all quotas and pools)</th>
                </tr>
              </thead>
              <tbody>
                {sortedBranches.flatMap((branch) =>
                  summaryRows(branch).map((summary) => (
                    <tr key={`${branch.code}-${summary?.quota ?? 'missing'}`}>
                      <td>
                        <AppLink href={`${canonicalPath}/${branch.slug}`}>{branch.name}</AppLink>
                      </td>
                      <td>{branch.degree}</td>
                      <td>{branch.courseDuration}y</td>
                      <td>
                        {summary?.quota ?? '—'} / {summary?.round ?? '—'}
                      </td>
                      <td>{formatRank(summary?.openingRank)}</td>
                      <td>{formatRank(summary?.closingRank)}</td>
                      <td>{branch.totalSeatsLatestYear ?? '—'}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </Box>
        )}

        <h2>Using this data</h2>
        <ul>
          <li>
            For a limited historical college and branch shortlist, use the{' '}
            <AppLink href="/predict">College &amp; Branch Predictor</AppLink>.
          </li>
          <li>
            To browse all JoSAA participating colleges, head to{' '}
            <AppLink href="/colleges">Participating Colleges</AppLink>.
          </li>
          <li>
            To understand how to read opening and closing ranks, see the{' '}
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              opening and closing ranks guide
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
