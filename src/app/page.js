'use client';

import React from 'react';
import { Box, Grid2, Stack, useTheme } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { EventCalendar } from '@/components/DashboardSections/Calendar';
import { FeatureBox } from '@/components/DashboardSections/FeatureBox';
import { Updates } from '@/components/DashboardSections/Updates';
import { useGetSiteContentsQuery } from '@/store/queries/siteContent';
import { useIsMobile } from '@/utils/screenSizeHook';

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
          '& h2': {
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
        <h2>A free JEE college and branch predictor, built on official JoSAA data</h2>
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
            Check the live <AppLink href="/seat-matrix">seat matrix</AppLink> to see how many seats
            your category actually has at a given institute.
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
          and the canonical participating-institute list. Data is re-ingested when JoSAA releases
          updates and pages are revalidated within a day. For the full walkthrough of how the
          predictor turns this data into projections — and where its assumptions can break — see the{' '}
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

const Home = () => {
  const isMobile800 = useIsMobile(800);
  const isMobile485 = useIsMobile(485);

  const { isSuccess } = useGetSiteContentsQuery();

  return (
    <Stack width="100%">
      <HomeIntro />
      <Grid2
        container
        columns={isMobile485 ? 1 : isMobile800 ? 2 : { xs: 2, sm: 7, md: 8, lg: 10 }}
        rowSpacing={1}
        columnSpacing={1}
        p={2}
      >
        {isSuccess && (
          <>
            {!isMobile485 && (
              <Grid2 size={isMobile800 ? 1 : { xs: 1, sm: 2, lg: 2.25 }}>
                <Updates />
              </Grid2>
            )}
            {!isMobile800 && (
              <Grid2 size={{ sm: 3, md: 4, lg: 5.5 }}>
                <FeatureBox />
              </Grid2>
            )}
            <Grid2 size={isMobile485 || isMobile800 ? 1 : { xs: 1, sm: 2, lg: 2.25 }}>
              <EventCalendar />
            </Grid2>
            {isMobile800 && (
              <Grid2 size={2}>
                <FeatureBox />
              </Grid2>
            )}
            {isMobile485 && (
              <Grid2 size={1}>
                <Updates />
              </Grid2>
            )}
          </>
        )}
      </Grid2>
    </Stack>
  );
};

export default Home;
