import React from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { GuideLayout } from '@/components/GuideLayout';
import { breadcrumbJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides';
const DESCRIPTION =
  'Plain-English guides to JoSAA counselling, JEE Main and JEE Advanced admissions, opening and closing ranks, the seat matrix, and using the RankMatrix college predictor. Free, no signup, no spam — built by a student, for students.';

export const metadata = {
  title: 'JoSAA & JEE Counselling Guides',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA counselling guide',
    'JEE Main counselling guide',
    'JEE Advanced counselling',
    'JoSAA rounds explained',
    'JoSAA seat matrix guide',
    'JEE college predictor how it works',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'JoSAA & JEE Counselling Guides — RankMatrix',
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoSAA & JEE Counselling Guides | RankMatrix',
    description: DESCRIPTION,
  },
};

const GUIDES = [
  {
    slug: 'what-is-josaa-counselling',
    title: 'What is JoSAA counselling?',
    summary:
      'The full picture: who runs JoSAA, which institutes participate, how a seat gets allocated, and what candidates do in each round.',
    readingTimeMinutes: 7,
  },
  {
    slug: 'jee-main-college-predictor',
    title: 'JEE Main college predictor: how it works',
    summary:
      'What a college predictor actually does, how it uses opening and closing ranks, what it can and cannot tell you, and how to read the results sensibly.',
    readingTimeMinutes: 6,
  },
  {
    slug: 'josaa-opening-and-closing-ranks',
    title: 'JoSAA opening and closing ranks, explained',
    summary:
      'What these ranks mean, how they differ from your JEE rank, why they move round-over-round, and how to use them to plan your JoSAA choice list.',
    readingTimeMinutes: 7,
  },
  {
    slug: 'jee-main-vs-advanced-vs-josaa',
    title: 'JEE Main vs JEE Advanced vs JoSAA',
    summary:
      'Three different things that get conflated constantly. Who conducts what, which ranks go where, and how they fit together for IIT/NIT/IIIT admission.',
    readingTimeMinutes: 6,
  },
  {
    slug: 'josaa-seat-matrix',
    title: 'JoSAA seat matrix: categories, quotas, seat pools',
    summary:
      'Open, OBC-NCL, SC, ST, EWS, PwD, Female-only, HS, OS, AI — what every column of the seat matrix means and why it matters for your choices.',
    readingTimeMinutes: 8,
  },
  {
    slug: 'josaa-counselling-rounds',
    title: 'JoSAA counselling rounds: how they work',
    summary:
      'Choice filling, mock allocations, regular rounds, freeze/float/slide, and the withdrawal and reporting cycle — laid out in order.',
    readingTimeMinutes: 7,
  },
];

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Guides', path: PAGE_URL },
]);

export default function GuidesHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <GuideLayout
        title="JoSAA & JEE counselling guides"
        description="Straightforward, no-spam explainers built around the questions JEE aspirants actually ask — from someone who built the tool they're reading them in."
      >
        <p>
          JoSAA counselling is the single process through which almost every government engineering
          seat in India is allocated — IITs via JEE Advanced, NITs / IIITs / GFTIs via JEE Main. The
          rules are well documented on the official JoSAA site, but that documentation is written
          for operators, not candidates. These guides translate the important bits into plain
          English, connect them to what you will actually see in the RankMatrix tools, and point at
          official sources wherever you should double-check.
        </p>
        <p>
          Every guide below is free, with no signup, no phone number, no email capture, and no
          retargeting. If something is still unclear after reading one, the relevant tool — Opening
          &amp; Closing Ranks, Seat Matrix, Participating Colleges, or the Predictor — is one click
          away.
        </p>

        <Stack gap={2} sx={{ mt: 4 }}>
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`${PAGE_URL}/${guide.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'transparent',
                  p: 2.5,
                  transition: 'border-color 120ms, background-color 120ms',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <Typography component="h2" sx={{ fontSize: '1.2rem', fontWeight: 600, mb: 1 }}>
                  {guide.title}
                </Typography>
                <Typography component="p" sx={{ fontSize: '0.95rem', lineHeight: 1.6, mb: 1.5 }}>
                  {guide.summary}
                </Typography>
                <Box sx={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  {guide.readingTimeMinutes} min read
                </Box>
              </Card>
            </Link>
          ))}
        </Stack>
      </GuideLayout>
    </>
  );
}
