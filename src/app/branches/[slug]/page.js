import React from 'react';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { AppLink } from '@/components/AppLink';
import { DataPageLayout } from '@/components/DataPageLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';
import { fetchBranchSeo, fetchSeoSlugs } from '@/utils/seoApi';

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = 'https://rankmatrix.in';

export async function generateStaticParams() {
  try {
    const data = await fetchSeoSlugs();
    if (!data?.branches) return [];
    return data.branches.map((branch) => ({ slug: branch.slug }));
  } catch {
    return [];
  }
}

async function loadBranch(slug) {
  try {
    return await fetchBranchSeo(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await loadBranch(slug);
  if (!data) return { title: 'Branch not found' };
  const title = `${data.name} (${data.degree}) — JoSAA Colleges, Cutoffs & Seats`;
  const description = `Every JoSAA participating college offering ${data.name} through ${data.degree} (${data.courseDuration}-year programme), with opening and closing ranks from the latest counselling year. Built on official JoSAA data.`;
  const canonicalPath = `/branches/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    keywords: [
      data.name,
      `${data.name} colleges`,
      `${data.name} cutoff`,
      `${data.name} JoSAA`,
      `${data.degree} ${data.name}`,
      `JEE Main ${data.name} colleges`,
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
  const instituteCount = data.institutes?.length ?? 0;
  const iitCount = data.institutes?.filter((i) => i.type === 'IIT').length ?? 0;
  const nitCount = data.institutes?.filter((i) => i.type === 'NIT').length ?? 0;
  return [
    {
      question: `How many colleges offer ${data.name} through JoSAA?`,
      answer: `${instituteCount} JoSAA participating institutes offer ${data.name} through the ${data.degree} programme${iitCount || nitCount ? ` — including ${iitCount} IIT${iitCount === 1 ? '' : 's'} and ${nitCount} NIT${nitCount === 1 ? '' : 's'}` : ''}. Full list with the latest cutoff data is on this page.`,
    },
    {
      question: `What is the duration of a ${data.name} programme?`,
      answer: `Most institutes offer ${data.name} as a ${data.courseDuration}-year ${data.degree} programme. A few institutes may offer dual-degree variants; check the specific institute's deep page for programme-specific details.`,
    },
    {
      question: `Which rank do I need for ${data.name} at the top colleges?`,
      answer: `Cutoffs vary dramatically by institute. The table below shows the latest Open category, Gender-Neutral closing rank per institute. For a rank-based shortlist across all colleges and branches, use the RankMatrix College & Branch Predictor.`,
    },
    {
      question: `Do I need JEE Advanced for ${data.name}?`,
      answer: `You need JEE Advanced only for IIT seats. NIT, IIIT, and GFTI seats for ${data.name} are allocated from the JEE Main rank list through JoSAA.`,
    },
  ];
};

const sortInstitutes = (list) =>
  [...list].sort((a, b) => {
    const rankA = a.latestClosingRank ?? Number.POSITIVE_INFINITY;
    const rankB = b.latestClosingRank ?? Number.POSITIVE_INFINITY;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name);
  });

export default async function BranchPage({ params }) {
  const { slug } = await params;
  const data = await loadBranch(slug);
  if (!data) notFound();

  const faqs = buildFaqs(data);
  const canonicalPath = `/branches/${slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const institutes = sortInstitutes(data.institutes || []);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: data.name,
      description: `${data.name} (${data.degree}, ${data.courseDuration} years) offered through JoSAA counselling at Indian centrally funded technical institutes.`,
      provider: {
        '@type': 'Organization',
        name: 'JoSAA participating institutes',
        url: 'https://josaa.nic.in',
      },
      url: canonicalUrl,
      inLanguage: 'en-IN',
    },
    articleJsonLd({
      path: canonicalPath,
      title: `${data.name} — JoSAA Colleges, Cutoffs & Seats`,
      description: `Colleges offering ${data.name} through JoSAA, with opening and closing ranks.`,
      datePublished: '2026-04-23',
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Branches', path: '/branches' },
      { name: data.name, path: canonicalPath },
    ]),
    faqJsonLd(faqs),
  ];

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
          { name: 'Branches', path: '/branches' },
          { name: data.name, path: canonicalPath },
        ]}
        title={data.name}
        subtitle={`${data.degree} · ${data.courseDuration}-year programme`}
        badges={[
          { label: data.degree },
          { label: `${data.courseDuration} years` },
          { label: `${data.institutes?.length ?? 0} colleges` },
        ]}
        lastUpdated={data.latestYear ? `JoSAA ${data.latestYear}` : 'April 2026'}
      >
        <h2>About {data.name}</h2>
        <p>
          {data.name} is offered through JoSAA counselling at {data.institutes?.length ?? 0}{' '}
          centrally funded Indian institutes. Admission is merit-based — IIT seats are allocated
          from the JEE Advanced rank list; NIT, IIIT, and GFTI seats use JEE Main. Every institute
          below takes the branch through the {data.degree}, {data.courseDuration}
          -year programme.
        </p>
        <p>
          The table shows the latest JoSAA counselling year&apos;s Open category, Gender-Neutral
          closing rank for each institute offering this branch, sorted by how competitive the cutoff
          is. Click any institute name to see its full branch list, NIRF history, and other branches
          on offer.
        </p>

        <h2>Colleges offering {data.name}</h2>
        {institutes.length === 0 ? (
          <p>No institutes currently list this branch in the latest JoSAA cycle.</p>
        ) : (
          <Box className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Institute</th>
                  <th>Type</th>
                  <th>State</th>
                  <th>NIRF rank</th>
                  <th>Opening rank</th>
                  <th>Closing rank</th>
                  <th>Deep cutoffs</th>
                </tr>
              </thead>
              <tbody>
                {institutes.map((institute) => (
                  <tr key={institute.code}>
                    <td>
                      <AppLink href={`/colleges/${institute.slug}`}>{institute.name}</AppLink>
                    </td>
                    <td>{institute.type}</td>
                    <td>{institute.state}</td>
                    <td>
                      {institute.latestNirfRank
                        ? `${institute.latestNirfRank} (${institute.latestNirfYear})`
                        : '—'}
                    </td>
                    <td>{formatRank(institute.latestOpeningRank)}</td>
                    <td>{formatRank(institute.latestClosingRank)}</td>
                    <td>
                      <AppLink href={`/colleges/${institute.slug}/${slug}`}>View</AppLink>
                    </td>
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
            <AppLink href="/predict">College &amp; Branch Predictor</AppLink>.
          </li>
          <li>
            To browse all engineering branches offered through JoSAA, head to{' '}
            <AppLink href="/branches">Participating Branches</AppLink>.
          </li>
          <li>
            To understand how categories, quotas, and seat pools interact with cutoffs, see the{' '}
            <AppLink href="/guides/josaa-seat-matrix">seat matrix guide</AppLink>.
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
