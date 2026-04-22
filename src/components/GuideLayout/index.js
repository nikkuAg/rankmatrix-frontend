'use client';

import React from 'react';
import {
  Box,
  Breadcrumbs,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

const AUTHOR = {
  name: 'Divyansh Agarwal',
  github: 'https://github.com/nikkuAg',
  linkedin: 'https://www.linkedin.com/in/ag-divyansh/',
};

export const GuideLayout = ({
  title,
  description,
  lastUpdated,
  readingTimeMinutes,
  breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
  ],
  children,
}) => {
  const theme = useTheme();
  return (
    <Box component="article" width="100%" sx={{ backgroundColor: theme.background.main }}>
      <Box
        component="header"
        width="100%"
        px={{ xs: 3, md: 6 }}
        pt={{ xs: 3, md: 5 }}
        pb={{ xs: 3, md: 4 }}
        sx={{ backgroundColor: theme.background.dark }}
      >
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
                sx={{ color: 'inherit' }}
              >
                {crumb.name}
              </MuiLink>
            ),
          )}
        </Breadcrumbs>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.9rem', md: '2.5rem' },
            fontWeight: 700,
            lineHeight: 1.15,
            color: theme.palette.text.main,
            maxWidth: 820,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            component="p"
            sx={{
              mt: 2,
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: theme.palette.text.main,
              opacity: 0.85,
              maxWidth: 820,
            }}
          >
            {description}
          </Typography>
        )}
        <Stack
          direction="row"
          gap={1.5}
          flexWrap="wrap"
          alignItems="center"
          sx={{ mt: 3, color: theme.palette.text.main, opacity: 0.75, fontSize: '0.9rem' }}
        >
          <span>
            By{' '}
            <MuiLink
              href={AUTHOR.linkedin}
              target="_blank"
              rel="noopener noreferrer author"
              sx={{ color: 'inherit', textDecorationColor: 'currentColor' }}
            >
              {AUTHOR.name}
            </MuiLink>
          </span>
          {lastUpdated && <span>· Updated {lastUpdated}</span>}
          {readingTimeMinutes && <span>· {readingTimeMinutes} min read</span>}
        </Stack>
      </Box>

      <Box
        px={{ xs: 3, md: 6 }}
        py={{ xs: 4, md: 6 }}
        sx={{
          maxWidth: 820,
          '& h2': {
            fontSize: { xs: '1.4rem', md: '1.75rem' },
            fontWeight: 700,
            lineHeight: 1.25,
            mt: 5,
            mb: 2,
            color: theme.palette.text.main,
          },
          '& h3': {
            fontSize: { xs: '1.15rem', md: '1.3rem' },
            fontWeight: 600,
            lineHeight: 1.3,
            mt: 4,
            mb: 1.5,
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
          '& strong': { fontWeight: 600 },
          '& a': {
            color: theme.palette.primary.main,
            textDecorationColor: theme.palette.primary.light,
          },
          '& blockquote': {
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 0.5,
            my: 3,
            color: theme.palette.text.main,
            opacity: 0.9,
            fontStyle: 'italic',
            backgroundColor: theme.background.dark,
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            my: 3,
            fontSize: '0.95rem',
          },
          '& th, & td': {
            border: `1px solid ${theme.palette.gray.light}`,
            padding: '0.6rem 0.8rem',
            textAlign: 'left',
          },
          '& th': { backgroundColor: theme.background.dark, fontWeight: 600 },
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
            fontSize: '0.875rem',
            color: theme.palette.text.main,
            opacity: 0.9,
          }}
        >
          <Typography component="p" sx={{ fontWeight: 600, mb: 1 }}>
            A quick note from the maker
          </Typography>
          <Typography component="p" sx={{ fontSize: '0.875rem', lineHeight: 1.65 }}>
            RankMatrix is built by{' '}
            <MuiLink href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer author">
              Divyansh Agarwal
            </MuiLink>{' '}
            (
            <MuiLink href={AUTHOR.github} target="_blank" rel="noopener noreferrer me">
              GitHub
            </MuiLink>
            ), an independent developer. It is free to use, it never asks for your phone number or
            email, and it will never send you marketing calls or spam. This guide is for
            informational purposes only. RankMatrix is not affiliated with JoSAA, JEE, NTA, the
            IITs, NITs, IIITs, or GFTIs. Always verify the latest schedule, rules, and cutoffs on
            the official{' '}
            <MuiLink href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
              JoSAA website
            </MuiLink>{' '}
            before making any admission decision.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
