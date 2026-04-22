'use client';

import React from 'react';
import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

export const DataPageLayout = ({
  breadcrumbs = [],
  title,
  subtitle,
  badges = [],
  lastUpdated,
  children,
}) => {
  const theme = useTheme();
  return (
    <Box component="main" width="100%" sx={{ backgroundColor: theme.background.main }}>
      <Box
        component="header"
        px={{ xs: 3, md: 6 }}
        pt={{ xs: 3, md: 5 }}
        pb={{ xs: 3, md: 4 }}
        sx={{ backgroundColor: theme.background.dark }}
      >
        {breadcrumbs.length > 0 && (
          <Breadcrumbs sx={{ mb: 2, color: theme.palette.text.main, opacity: 0.75 }}>
            {breadcrumbs.map((crumb, i) =>
              i === breadcrumbs.length - 1 ? (
                <Typography key={crumb.path} color="inherit" sx={{ fontWeight: 500 }}>
                  {crumb.name}
                </Typography>
              ) : (
                <MuiLink
                  key={crumb.path}
                  component={Link}
                  href={crumb.path}
                  underline="hover"
                  sx={{ color: `${theme.palette.text.main} !important`, opacity: 0.8 }}
                >
                  {crumb.name}
                </MuiLink>
              ),
            )}
          </Breadcrumbs>
        )}
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.9rem', md: '2.5rem' },
            fontWeight: 700,
            lineHeight: 1.15,
            color: theme.palette.text.main,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            component="p"
            sx={{
              mt: 2,
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: theme.palette.text.main,
              opacity: 0.85,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </Typography>
        )}
        {badges.length > 0 && (
          <Box sx={{ mt: 2.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {badges.map((badge) => (
              <Chip
                key={badge.label}
                label={badge.label}
                size="small"
                sx={{
                  backgroundColor: `${theme.palette.primary.main}20`,
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  border: `1px solid ${theme.palette.primary.main}40`,
                }}
              />
            ))}
          </Box>
        )}
        {lastUpdated && (
          <Typography
            sx={{
              mt: 2,
              color: theme.palette.text.main,
              opacity: 0.6,
              fontSize: '0.85rem',
            }}
          >
            Last updated {lastUpdated} · By{' '}
            <MuiLink
              href="https://www.linkedin.com/in/ag-divyansh/"
              target="_blank"
              rel="noopener noreferrer author"
              sx={{ color: 'inherit !important', textDecorationColor: 'currentColor' }}
            >
              Divyansh Agarwal
            </MuiLink>
          </Typography>
        )}
      </Box>
      <Box
        px={{ xs: 3, md: 6 }}
        py={{ xs: 4, md: 6 }}
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          '& h2': {
            fontSize: { xs: '1.4rem', md: '1.65rem' },
            fontWeight: 700,
            lineHeight: 1.25,
            mt: 5,
            mb: 2,
            color: theme.palette.text.main,
          },
          '& h3': {
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            fontWeight: 600,
            lineHeight: 1.3,
            mt: 3,
            mb: 1,
            color: theme.palette.text.main,
          },
          '& p': {
            fontSize: '1rem',
            lineHeight: 1.7,
            my: 2,
            color: theme.palette.text.main,
          },
          '& ul, & ol': {
            pl: 3,
            my: 2,
            color: theme.palette.text.main,
          },
          '& li': {
            fontSize: '1rem',
            lineHeight: 1.7,
            mb: 1,
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            my: 3,
            fontSize: '0.92rem',
          },
          '& th, & td': {
            border: `1px solid ${theme.palette.gray.light}`,
            padding: '0.55rem 0.75rem',
            textAlign: 'left',
            verticalAlign: 'top',
          },
          '& th': { backgroundColor: theme.background.dark, fontWeight: 600 },
          '& .table-scroll': {
            width: '100%',
            overflowX: 'auto',
          },
        }}
      >
        {children}
        <Divider sx={{ my: 5 }} />
        <Box
          sx={{
            backgroundColor: theme.background.dark,
            borderRadius: 2,
            px: 3,
            py: 2.5,
            fontSize: '0.8rem',
            color: theme.palette.text.main,
            opacity: 0.85,
          }}
        >
          Data on this page is sourced from public JoSAA publications and cleaned for easier
          reference. RankMatrix is an independent project and is not affiliated with JoSAA, JEE,
          NTA, the IITs, NITs, IIITs, or GFTIs. Verify all schedules, rules, and cutoffs on the
          official{' '}
          <MuiLink
            href="https://josaa.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: `${theme.palette.primary.main} !important` }}
          >
            JoSAA website
          </MuiLink>{' '}
          before making admission decisions.
        </Box>
      </Box>
    </Box>
  );
};
