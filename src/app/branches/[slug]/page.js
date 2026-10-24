import React from 'react';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { AppLink } from '@/components/AppLink';
import { DataPageLayout } from '@/components/DataPageLayout';
import { DataSourceNotes } from '@/components/DataSourceNotes';
import { summaryRows } from '@/utils/cutoffSummaries.mjs';
import { groupInstitutesByExam } from '@/utils/examGroups.mjs';
import { instituteType } from '@/utils/instituteIdentity.mjs';
import { breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata, programmeTitleName } from '@/utils/metadata.mjs';
import { fetchBranchSeo } from '@/utils/seoApi';

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = 'https://www.rankmatrix.in';

export async function generateStaticParams() {
  // Render and cache on first request; avoid hundreds of DB-heavy build requests.
  return [];
}

async function loadBranch(slug) {
  return fetchBranchSeo(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await loadBranch(slug);
  if (!data) notFound();
  return buildMetadata({
    path: `/branches/${slug}`,
    title: `${programmeTitleName(data)}: Colleges & JoSAA Cutoffs`,
    description: `Compare ${data.institutes?.length ?? 0} JoSAA colleges offering ${data.name} (${data.degree}, ${data.courseDuration} years). Explore published cutoffs and institute details.`,
    index: Boolean(data.institutes?.length),
  });
}

const formatRank = (value) => (value == null ? '—' : value.toLocaleString('en-IN'));

const buildFaqs = (data) => {
  const instituteCount = data.institutes?.length ?? 0;
  const iitCount = data.institutes?.filter((i) => instituteType(i) === 'IIT').length ?? 0;
  const iiscCount = data.institutes?.filter((i) => instituteType(i) === 'IISc').length ?? 0;
  const nitCount = data.institutes?.filter((i) => instituteType(i) === 'NIT').length ?? 0;
  return [
    {
      question: `How many colleges offer ${data.name} through JoSAA?`,
      answer: `${instituteCount} JoSAA participating institutes offer ${data.name} through the ${data.degree} programme${iitCount || nitCount || iiscCount ? ` — including ${iitCount} IIT${iitCount === 1 ? '' : 's'} and ${nitCount} NIT${nitCount === 1 ? '' : 's'}${iiscCount ? ' and IISc' : ''}` : ''}. Full list with the latest cutoff data is on this page.`,
    },
    {
      question: `What is the duration of a ${data.name} programme?`,
      answer: `Most institutes offer ${data.name} as a ${data.courseDuration}-year ${data.degree} programme. A few institutes may offer dual-degree variants; check the specific institute's deep page for programme-specific details.`,
    },
    {
      question: `Which rank do I need for ${data.name} at the top colleges?`,
      answer: `Cutoffs vary dramatically by institute. The tables show Open category, Gender-Neutral closing ranks, grouped by exam. JEE Advanced and JEE Main ranks are different scales; match the year, quota and round before comparing. For a rank-based shortlist across all colleges and branches, use the RankMatrix College & Branch Predictor.`,
    },
    {
      question: `Do I need JEE Advanced for ${data.name}?`,
      answer: `IIT and IISc programmes in JoSAA use JEE Advanced. NIT, IIIT, and GFTI seats for ${data.name} are allocated from the JEE Main rank list through JoSAA.`,
    },
  ];
};

export default async function BranchPage({ params }) {
  const { slug } = await params;
  const data = await loadBranch(slug);
  if (!data) notFound();

  const faqs = buildFaqs(data);
  const canonicalPath = `/branches/${slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const instituteGroups = groupInstitutesByExam(data.institutes || []);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${data.name}: participating colleges and JoSAA cutoffs`,
      description: `Compare ${data.degree} programmes in ${data.name} across participating institutes.`,
      url: canonicalUrl,
      inLanguage: 'en-IN',
    },
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(obj) }}
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
          { label: `Programme code ${data.code}` },
          { label: `${data.courseDuration} years` },
          { label: `${data.institutes?.length ?? 0} colleges` },
        ]}
        lastUpdated={data.latestYear ? `JoSAA ${data.latestYear}` : 'Year not available'}
      >
        <h2>About {data.name}</h2>
        <p>
          {data.name} is offered through JoSAA counselling at {data.institutes?.length ?? 0}{' '}
          participating institutes in the stored catalogue. Admission is merit-based — IIT and IISc
          seats are allocated from the JEE Advanced rank list; NIT, IIIT, and GFTI seats use JEE
          Main. Every institute below takes the branch through the {data.degree},{' '}
          {data.courseDuration}
          -year programme.
        </p>
        <p>
          The tables show the latest stored JoSAA year&apos;s Open category, Gender-Neutral cutoffs,
          grouped by admission exam and listed alphabetically within each group. JEE Advanced and
          JEE Main ranks are different scales and must not be compared numerically. Even within one
          exam, match the year, rank list, quota and round before comparing. Each quota shows its
          own latest available round. A lower closing rank does not by itself establish that a
          college is better.
        </p>

        <h2>Colleges offering {data.name}</h2>
        {instituteGroups.length === 0 ? (
          <p>RankMatrix currently has no participating institutes on file for this programme.</p>
        ) : (
          instituteGroups.map((group) => (
            <section key={group.id} id={`exam-${group.id}`}>
              <h3>{group.title}</h3>
              <Box className="table-scroll">
                <table>
                  <caption>
                    {data.name}: {group.title}. Open category, Gender-Neutral seat pool.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Institute</th>
                      <th scope="col">Type</th>
                      <th scope="col">State</th>
                      <th scope="col">NIRF rank</th>
                      <th scope="col">Quota / round</th>
                      <th scope="col">Opening rank</th>
                      <th scope="col">Closing rank</th>
                      <th scope="col">Deep cutoffs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.institutes.flatMap((institute) =>
                      summaryRows(institute).map((summary) => (
                        <tr key={`${institute.code}-${summary?.quota ?? 'missing'}`}>
                          <td>
                            <AppLink href={`/colleges/${institute.slug}`}>{institute.name}</AppLink>
                          </td>
                          <td>{instituteType(institute)}</td>
                          <td>{institute.state}</td>
                          <td>
                            {institute.latestNirfRank
                              ? `${institute.latestNirfRank} (${institute.latestNirfYear})`
                              : '—'}
                          </td>
                          <td>
                            {summary?.quota ?? '—'} / {summary?.round ?? '—'}
                          </td>
                          <td>{formatRank(summary?.openingRank)}</td>
                          <td>{formatRank(summary?.closingRank)}</td>
                          <td>
                            <AppLink href={`/colleges/${institute.slug}/${slug}`}>
                              Cutoffs at {institute.displayCode || institute.name}
                            </AppLink>
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </Box>
            </section>
          ))
        )}

        <DataSourceNotes
          cutoffYears={(data.institutes || []).flatMap((institute) =>
            institute.cutoffSummaries.map((row) => row.year),
          )}
          nirfYears={(data.institutes || [])
            .filter((institute) => institute.latestNirfRank != null)
            .map((institute) => institute.latestNirfYear)}
        />
        <h2>Using this data</h2>
        <ul>
          <li>
            For a limited historical college and branch shortlist, use the{' '}
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
