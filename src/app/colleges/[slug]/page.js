import React from 'react';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { AppLink } from '@/components/AppLink';
import { DataPageLayout } from '@/components/DataPageLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';
import { fetchInstituteSeo, fetchSeoSlugs } from '@/utils/seoApi';

// Rebuild a given page at most once per day (86400 s); cheap for low-change data.
export const revalidate = 86400;
// Pages not known at build time (e.g. new institutes added mid-year) are
// generated on first request and then cached.
export const dynamicParams = true;

const SITE_URL = 'https://rankmatrix.in';
const INSTITUTE_TYPE_LABEL = {
  IIT: 'Indian Institute of Technology',
  NIT: 'National Institute of Technology',
  IIIT: 'Indian Institute of Information Technology',
  GFTI: 'Government Funded Technical Institute',
};

export async function generateStaticParams() {
  try {
    const data = await fetchSeoSlugs();
    if (!data?.institutes) return [];
    return data.institutes.map((institute) => ({ slug: institute.slug }));
  } catch {
    return [];
  }
}

async function loadInstitute(slug) {
  try {
    return await fetchInstituteSeo(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await loadInstitute(slug);
  if (!data) {
    return { title: 'Institute not found' };
  }
  const typeLabel = INSTITUTE_TYPE_LABEL[data.type] || data.type;
  const title = `${data.name} — ${typeLabel} | JoSAA Cutoffs, Branches & Seats`;
  const description = `${data.name} (${data.displayCode}) is a ${typeLabel} located in ${data.city}, ${data.state}. Explore JoSAA opening and closing ranks, branch list, and seat matrix for ${data.name} — sourced from official JoSAA data.`;
  const canonicalPath = `/colleges/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    keywords: [
      data.name,
      `${data.name} cutoff`,
      `${data.name} JoSAA`,
      `${data.name} branches`,
      `${data.name} closing rank`,
      `${typeLabel} ${data.state}`,
    ],
    openGraph: {
      type: 'article',
      url: canonicalPath,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const formatRank = (value) => (value == null ? '—' : value.toLocaleString('en-IN'));

const buildFaqs = (data) => {
  const typeLabel = INSTITUTE_TYPE_LABEL[data.type] || data.type;
  const branchCount = data.branches?.length ?? 0;
  const latestNirf = data.nirfRanks?.[0];
  const latestYear = data.latestYear;

  return [
    {
      question: `Where is ${data.name} located?`,
      answer: `${data.name} is located in ${data.city}, ${data.state}. It is a ${typeLabel} and participates in JoSAA counselling for admission to its undergraduate engineering programmes.`,
    },
    {
      question: `How many branches does ${data.name} offer through JoSAA?`,
      answer: `${data.name} offers ${branchCount} undergraduate branches through JoSAA counselling${latestYear ? ` in the ${latestYear} counselling year` : ''}. The full list with cutoffs is on this page.`,
    },
    {
      question: `What is the NIRF rank of ${data.name}?`,
      answer: latestNirf
        ? `${data.name} was ranked ${latestNirf.rank} in the NIRF Engineering rankings for ${latestNirf.year}. Full NIRF history is shown below.`
        : `${data.name} does not have a recent NIRF Engineering ranking published on RankMatrix. Check the official NIRF site for the latest.`,
    },
    {
      question: `How do I know if my JEE rank qualifies for ${data.name}?`,
      answer: `Use the RankMatrix College Predictor and compare your JEE Main or JEE Advanced rank with the historical closing ranks listed on this page for each branch. Closing ranks shift year-over-year, so it is best to compare against the most recent two to three years.`,
    },
  ];
};

const relatedTypeCopy = (type) => {
  switch (type) {
    case 'IIT':
      return 'Indian Institutes of Technology (IITs) admit students through JEE Advanced. Other IITs can be compared side by side from the Participating Colleges table.';
    case 'NIT':
      return 'National Institutes of Technology (NITs) admit through JEE Main and use a split of Home State and Other State quota for each branch. Compare other NITs in the Participating Colleges table.';
    case 'IIIT':
      return 'Indian Institutes of Information Technology (IIITs) focus on computing and adjacent disciplines. Admission uses JEE Main ranks through JoSAA.';
    case 'GFTI':
      return 'Government Funded Technical Institutes (GFTIs) is an umbrella category for centrally funded institutes beyond the IIT / NIT / IIIT groups, each with its own focus area.';
    default:
      return null;
  }
};

export default async function InstitutePage({ params }) {
  const { slug } = await params;
  const data = await loadInstitute(slug);
  if (!data) notFound();

  const typeLabel = INSTITUTE_TYPE_LABEL[data.type] || data.type;
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
      description: `${data.name} is a ${typeLabel} in ${data.city}, ${data.state}, participating in JoSAA counselling.`,
    },
    articleJsonLd({
      path: canonicalPath,
      title: `${data.name} — JoSAA Cutoffs, Branches & Seats`,
      description: `JoSAA opening/closing ranks, branch list, and seat matrix for ${data.name}, built on official JoSAA data.`,
      datePublished: '2026-04-23',
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Colleges', path: '/colleges' },
      { name: data.name, path: canonicalPath },
    ]),
    faqJsonLd(faqs),
  ];

  const relatedCopy = relatedTypeCopy(data.type);

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
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
            ? [{ label: `${data.totalSeats.toLocaleString('en-IN')} seats` }]
            : []),
        ]}
        lastUpdated={data.latestYear ? `JoSAA ${data.latestYear}` : 'April 2026'}
      >
        <h2>About {data.name}</h2>
        <p>
          {data.name} ({data.displayCode}) is a {typeLabel} located in {data.city}, {data.state}. It
          participates in JoSAA counselling every year and allocates its undergraduate engineering
          seats through the common JoSAA seat-allocation process based on JEE Main or JEE Advanced
          ranks.
        </p>
        {relatedCopy && <p>{relatedCopy}</p>}
        <p>
          Below you will find the current list of branches offered at {data.name}, each with the
          most recent round&apos;s opening and closing rank for the Open category, Gender-Neutral
          seat pool. For multi-year trends on any specific branch, open the branch&apos;s deep
          cutoff page.
        </p>

        {sortedNirf.length > 0 && (
          <>
            <h2>NIRF Engineering rank history</h2>
            <Box className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>NIRF Engineering rank</th>
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
          Headline closing ranks below are from the latest JoSAA counselling year, Open category,
          Gender-Neutral seat pool, at the final allocation round. Click any branch name to open a
          deep page with year-wise, category-wise cutoff trends and the latest seat matrix for that
          branch.
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
                  <th>Opening rank</th>
                  <th>Closing rank</th>
                  <th>Seats</th>
                </tr>
              </thead>
              <tbody>
                {sortedBranches.map((branch) => (
                  <tr key={branch.code}>
                    <td>
                      <AppLink href={`${canonicalPath}/${branch.slug}`}>{branch.name}</AppLink>
                    </td>
                    <td>{branch.degree}</td>
                    <td>{branch.courseDuration}y</td>
                    <td>{formatRank(branch.latestOpeningRank)}</td>
                    <td>{formatRank(branch.latestClosingRank)}</td>
                    <td>{branch.totalSeatsLatestYear ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}

        <h2>Using this data</h2>
        <ul>
          <li>
            To predict which colleges and branches your rank qualifies for across JoSAA, use the{' '}
            <AppLink href="/predict">College Predictor</AppLink>.
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
