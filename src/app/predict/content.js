'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { AppLink } from '@/components/AppLink';

export const PredictPageContent = ({ faqs }) => {
  const theme = useTheme();
  return (
    <Box
      component="section"
      aria-label="How to read your predictor output"
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
          '& h3': {
            fontSize: { xs: '1.1rem', md: '1.2rem' },
            fontWeight: 600,
            mt: 3,
            mb: 1,
            lineHeight: 1.3,
          },
          '& p': { fontSize: '1rem', lineHeight: 1.7, my: 1.5, opacity: 0.92 },
          '& ul, & ol': { pl: 3, my: 1.5 },
          '& li': { fontSize: '1rem', lineHeight: 1.7, mb: 0.75, opacity: 0.92 },
          '& strong': { fontWeight: 600 },
          '& a': {
            color: theme.palette.primary.main,
            textDecorationColor: theme.palette.primary.light,
          },
          '& blockquote': {
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 0.5,
            my: 2.5,
            fontStyle: 'italic',
            opacity: 0.9,
          },
        }}
      >
        <h2>How to read the predictor output</h2>
        <p>
          The result table is sorted from the most competitive institute-branch combinations you can
          realistically reach down to the safer ones. Each row is an (institute, branch, category,
          quota, seat pool) combination paired with the latest historical opening rank (OR) and
          closing rank (CR) that JoSAA published. Your rank&apos;s relationship to those two numbers
          tells you how reliable a target a given seat is.
        </p>

        <h3>The three buckets to think about</h3>
        <ul>
          <li>
            <strong>Comfortable</strong> — your rank is well inside the closing rank from previous
            cycles (typically by roughly 10% or more). These are seats you would normally expect to
            get if you list them high; they are useful as floor anchors on your preference list.
          </li>
          <li>
            <strong>Boundary</strong> — your rank is within striking distance of the closing rank,
            either above it by a small margin or just below it. This is where the actual decision
            sits: trends, branch popularity, and seat-matrix changes year-on-year decide whether the
            seat will fall to you or just past you.
          </li>
          <li>
            <strong>Stretch</strong> — your rank is past the closing rank. The seat was not
            historically reachable for your slice, but it can still be worth listing for ambition or
            for a late-round float.
          </li>
        </ul>

        <h2>A worked example</h2>
        <p>
          Suppose you are a JEE Main rank 8,500 candidate, OBC-NCL category, Gender-Neutral pool,
          home state Maharashtra, and you also have a JEE Advanced rank of 6,200. The predictor
          might surface something like:
        </p>
        <blockquote>
          IIT Roorkee — Mechanical Engineering — OBC-NCL — GN — OR 5,890 / CR 6,310 —{' '}
          <em>boundary</em>
          <br />
          NIT Trichy — Electronics &amp; Communication — OBC-NCL — OS — GN — OR 9,200 / CR 11,400 —{' '}
          <em>comfortable</em>
          <br />
          IIIT Hyderabad — Computer Science — OBC-NCL — GN — OR 4,100 / CR 5,800 — <em>stretch</em>
        </blockquote>
        <p>How to read this:</p>
        <ul>
          <li>
            <strong>IIT Roorkee Mechanical</strong> is right on the boundary — your JEE Advanced
            rank (6,200) is just inside the closing rank (6,310). You should list it high but not
            count on it; if the closing rank tightens by even 50 places this year, you miss.
          </li>
          <li>
            <strong>NIT Trichy ECE</strong> is comfortable for your JEE Main rank (8,500) against a
            CR of 11,400. If you list it above your stretch options, you should get it; it makes a
            solid floor.
          </li>
          <li>
            <strong>IIIT Hyderabad CSE</strong> is a stretch — 8,500 is well past 5,800. Listing it
            costs nothing if you place it above your safer options, but do not expect it; it goes
            either in mock allocation or late rounds if at all.
          </li>
        </ul>

        <h2>How to actually use the list</h2>
        <ol>
          <li>
            <strong>Pick three or four floor anchors</strong> from the &ldquo;comfortable&rdquo;
            bucket. These guarantee you something acceptable.
          </li>
          <li>
            <strong>Stack your real targets in the boundary bucket</strong>, in genuine order of
            preference — not in order of likelihood. JoSAA&apos;s algorithm only ever offers you the
            highest-listed seat you qualify for; getting the order right is the entire game.
          </li>
          <li>
            <strong>Put a few stretch picks at the top</strong> if you would genuinely accept them.
            They will only be offered to you if a seat opens up; if not, the algorithm moves to your
            next choice.
          </li>
          <li>
            <strong>Cross-check trends, not single numbers.</strong> Click into a row to see how the
            closing rank moved across the last three years. A steadily-tightening seat is riskier
            than a one-off bad year.
          </li>
        </ol>

        <h2>What the predictor cannot tell you</h2>
        <p>
          Historical cutoffs are a strong signal but not a forecast. The predictor cannot model this
          year&apos;s applicant pool, sudden branch-popularity shifts (e.g. AI/ML across the
          system), seat-matrix changes mid-cycle, or your personal eligibility nuances (domicile
          documentation, EWS recency, PwD certification). For the full walkthrough of the
          assumptions and limits, see the <AppLink href="/methodology">methodology page</AppLink>;
          for what the actual JoSAA algorithm does, the{' '}
          <AppLink href="/guides/josaa-counselling-rounds">counselling rounds guide</AppLink> covers
          the mechanics.
        </p>

        <h2>Related reading</h2>
        <ul>
          <li>
            <AppLink href="/guides/jee-main-college-predictor">
              JEE college &amp; branch predictor: how it works
            </AppLink>{' '}
            — the long version of what this page does.
          </li>
          <li>
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              Opening and closing ranks explained
            </AppLink>{' '}
            — the numbers behind every row of the predictor output.
          </li>
          <li>
            <AppLink href="/guides/josaa-seat-matrix">JoSAA seat matrix explained</AppLink> — what
            the category and quota columns mean.
          </li>
        </ul>

        <h2>Common questions</h2>
        {faqs.map((faq) => (
          <React.Fragment key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};
