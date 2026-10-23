'use client';

import React from 'react';
import { Box, Grid2, Stack, useTheme } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { DeferredCalendar } from '@/components/DashboardSections/Calendar/DeferredCalendar';
import { FeatureBox } from '@/components/DashboardSections/FeatureBox';
import { Updates } from '@/components/DashboardSections/Updates';

const HomeIntro = () => {
  const theme = useTheme();
  return (
    <Box
      component="section"
      aria-label="About RankMatrix"
      sx={{
        backgroundColor: theme.background.dark,
        borderTop: `1px solid ${
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,41,66,0.08)'
        }`,
        px: { xs: 3, md: 6 },
        py: { xs: 5, md: 7 },
      }}
    >
      <Box
        sx={{
          maxWidth: 820,
          mx: 'auto',
          color: theme.palette.text.main,
          '& h1, & h2': {
            fontSize: { xs: '1.4rem', md: '1.65rem' },
            fontWeight: 700,
            mt: 4,
            mb: 1.5,
            lineHeight: 1.25,
          },
          '& h2:first-of-type': { mt: 0 },
          '& p': { fontSize: '1rem', lineHeight: 1.7, my: 1.5, opacity: 0.9 },
          '& ul': { pl: 3, my: 1.5 },
          '& li': { fontSize: '1rem', lineHeight: 1.7, mb: 0.75, opacity: 0.9 },
          '& a': {
            color: theme.palette.primary.main,
            textDecorationColor: theme.palette.primary.light,
          },
        }}
      >
        <h2>Plan your JoSAA choices with published rank and seat data</h2>
        <p>
          RankMatrix turns a JEE Main or JEE Advanced rank into a clear, ordered list of realistic
          college-and-branch options for JoSAA counselling. It covers every IIT, NIT, IIIT, and GFTI
          in the JoSAA pool, uses the same opening and closing ranks JoSAA itself publishes, and
          asks for nothing personal — no signup, no phone number, no email, no marketing spam. The
          site is built and maintained by an <AppLink href="/about">IIT Roorkee alumnus</AppLink>{' '}
          who went through the same counselling process.
        </p>

        <h2>What you can do here</h2>
        <ul>
          <li>
            Use the <AppLink href="/predict">JEE college &amp; branch predictor</AppLink> to find
            institute-branch combinations realistically reachable for your rank, category, and
            quota.
          </li>
          <li>
            Browse <AppLink href="/ranks">opening and closing ranks</AppLink> across rounds for
            every JoSAA branch and institute.
          </li>
          <li>
            Check the published <AppLink href="/seat-matrix">seat matrix</AppLink> to see how many
            seats your category actually has at a given institute.
          </li>
          <li>
            Browse <AppLink href="/colleges">participating colleges</AppLink> and{' '}
            <AppLink href="/branches">participating branches</AppLink> with their cutoff trends.
          </li>
          <li>
            Read the <AppLink href="/guides">JoSAA guides</AppLink> for plain-English explainers on
            counselling rounds, choice filling, and how the allocation algorithm actually works.
          </li>
        </ul>

        <h2>Where the data comes from</h2>
        <p>
          Every number on RankMatrix originates from JoSAA&apos;s public publications: historical
          opening and closing ranks per institute-branch-category-round, the official seat matrix,
          and the canonical participating-institute list. The year and round shown with each result
          identify the historical data being used. For the full walkthrough of how the predictor
          turns this data into projections — and where its assumptions can break — see the{' '}
          <AppLink href="/methodology">methodology page</AppLink>.
        </p>

        <h2>What RankMatrix is not</h2>
        <p>
          Not an official source, not a coaching service, and not a guarantee. Predictions are
          projections from past cutoffs; real allocations depend on the current year&apos;s
          applicant pool. Always verify the latest schedule, eligibility, and cutoffs on the
          official{' '}
          <Box
            component="a"
            href="https://josaa.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.primary.main }}
          >
            JoSAA website
          </Box>{' '}
          before locking any choice. RankMatrix is not affiliated with JoSAA, JEE, NTA, the IITs,
          NITs, IIITs, or GFTIs — it is an independent, free tool. Read the full{' '}
          <AppLink href="/terms">terms of use</AppLink> and{' '}
          <AppLink href="/privacy">privacy policy</AppLink> for the details.
        </p>
      </Box>
    </Box>
  );
};

const Home = () => (
  <Stack width="100%">
    <Box component="header" sx={{ px: { xs: 3, md: 6 }, py: { xs: 3, md: 4 } }}>
      <Box component="h1" sx={{ m: 0, fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1.2 }}>
        Free JEE Main &amp; Advanced College Predictor and JoSAA Cutoffs
      </Box>
      <p>
        Use your JEE rank to explore college and branch options. Compare published JoSAA cutoffs and
        seat data without signing up.
      </p>
      <AppLink href="/predict">Find colleges for my rank</AppLink>
    </Box>
    <Grid2 container columns={12} spacing={2} sx={{ p: 2, alignItems: 'start' }}>
      <Grid2 size={{ xs: 12, md: 3 }} sx={{ order: { xs: 2, md: 1 } }}>
        <Updates />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
        <FeatureBox />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 3 }} sx={{ order: 3, minHeight: 450 }}>
        <DeferredCalendar />
      </Grid2>
    </Grid2>
    <HomeIntro />
  </Stack>
);

export default Home;
