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
            fontFamily: 'var(--font-poppins-italic)',
            opacity: 0.9,
          },
        }}
      >
        <h2>How to read the predictor output</h2>
        <p>
          Each row is a stored (institute, programme, category, quota, seat pool) cutoff comparison.
          The backend selects rows using its search-window priorities and displays them by opening
          rank. This is not an admission-probability ranking or a recommended choice order.
        </p>
        <p>
          IIT and participating IISc programme rows use JEE Advanced ranks; other rows use the
          applicable JEE Main rank list. Do not compare numbers from different exams or category
          rank lists as one competitiveness scale. The requested result limit can omit other
          relevant options, so inspect the underlying cutoff data and your genuine preferences
          before building a choice list.
        </p>

        <h2>Which rank should I compare with a JoSAA cutoff?</h2>
        <p>
          First match the exam and rank list: participating IIT and IISc programmes use JEE
          Advanced; NIT, IIIT and other NIT+ seats use JEE Main. OPEN cutoffs refer to the Common
          Rank List (CRL); reserved categories use their corresponding category ranks. Match the
          category, PwD status, quota, seat pool, year and round shown in the row. A percentile is
          not a rank.
        </p>
        <h2>A hypothetical cutoff comparison</h2>
        <p>
          If a row has an opening rank of 8,000 and closing rank of 10,000, a rank of 9,000 in the
          same rank list falls within that historical interval. A rank of 11,000 is outside it.
          These illustrative numbers do not describe any institute or predict a future allocation.
          Check actual <AppLink href="/ranks">JoSAA cutoffs</AppLink> and the{' '}
          <AppLink href="/seat-matrix">seat matrix</AppLink> for your exact filters.
        </p>

        <h2>How to use the list</h2>
        <ol>
          <li>Verify the exam, rank list, category, quota and seat pool for each comparison.</li>
          <li>
            Use <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink> or the
            <AppLink href="/colleges"> institute directory</AppLink> to inspect the stored year,
            round and programme details. The predictor table does not currently provide row links or
            display its dataset year and round.
          </li>
          <li>
            Check multiple comparable years and the published seat matrix. A historical interval is
            not a guarantee, and the tool does not assign safe, realistic or ambitious labels.
          </li>
          <li>
            Arrange eligible choices by your genuine preferences, rather than copying the predictor
            display order. Confirm eligibility and complete choice filling on the official JoSAA
            portal.
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
