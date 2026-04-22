'use client';

import React from 'react';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { Box, Link as MuiLink, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

const TOOL_LINKS = [
  { label: 'College Predictor', href: '/predict' },
  { label: 'Opening & Closing Ranks', href: '/ranks' },
  { label: 'Seat Matrix', href: '/seat-matrix' },
  { label: 'Participating Colleges', href: '/colleges' },
  { label: 'Participating Branches', href: '/branches' },
];

const GUIDE_LINKS = [
  { label: 'All guides', href: '/guides' },
  { label: 'What is JoSAA counselling', href: '/guides/what-is-josaa-counselling' },
  { label: 'JEE Main college predictor', href: '/guides/jee-main-college-predictor' },
  { label: 'Opening & closing ranks', href: '/guides/josaa-opening-and-closing-ranks' },
  { label: 'JEE Main vs Advanced vs JoSAA', href: '/guides/jee-main-vs-advanced-vs-josaa' },
  { label: 'Seat matrix explained', href: '/guides/josaa-seat-matrix' },
  { label: 'JoSAA counselling rounds', href: '/guides/josaa-counselling-rounds' },
];

const REFERENCE_LINKS = [
  { label: 'Official JoSAA site', href: 'https://josaa.nic.in' },
  { label: 'JEE Main (NTA)', href: 'https://jeemain.nta.nic.in' },
  { label: 'JEE Advanced', href: 'https://jeeadv.ac.in' },
  { label: 'CSAB', href: 'https://csab.nic.in' },
];

const SECTION_HEADING_SX = {
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  opacity: 0.55,
  mb: 2,
};

const linkSx = {
  color: 'inherit',
  opacity: 0.72,
  fontSize: '0.95rem',
  lineHeight: 1.4,
  textDecoration: 'none',
  transition: 'opacity 150ms ease',
  '&:hover': { opacity: 1, textDecoration: 'none' },
  '&:focus-visible': { opacity: 1, outline: '2px solid currentColor', outlineOffset: 3 },
};

const NavList = ({ ariaLabel, heading, children }) => (
  <Box component="nav" aria-label={ariaLabel}>
    <Typography component="h2" sx={SECTION_HEADING_SX}>
      {heading}
    </Typography>
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.25 }}>
      {children}
    </Box>
  </Box>
);

export const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const surface = isDark ? theme.palette.primary.dark : theme.palette.text.main;
  const hairline = 'rgba(255, 255, 255, 0.1)';

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        backgroundColor: surface,
        color: theme.palette.text.light,
        borderTop: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 6 }, pt: { xs: 6, md: 8 }, pb: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1.4fr 1fr 1.3fr 1fr',
            },
            gap: { xs: 5, md: 6 },
          }}
        >
          <Stack gap={2.5}>
            <Stack direction="row" alignItems="center" gap={1.25}>
              <Box
                aria-hidden
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '10px',
                  background: theme.palette.primary.main,
                  color: theme.palette.text.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  letterSpacing: '-0.02em',
                }}
              >
                R
              </Box>
              <Typography
                component="span"
                sx={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}
              >
                RankMatrix
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: '0.95rem',
                lineHeight: 1.65,
                opacity: 0.72,
                maxWidth: 320,
              }}
            >
              A free JoSAA &amp; JEE counselling companion built on official JoSAA data. No signup,
              no phone number, no email, no marketing spam.
            </Typography>
            <Stack direction="row" gap={2} sx={{ mt: 0.5 }}>
              <MuiLink
                href="https://github.com/nikkuAg"
                target="_blank"
                rel="noopener noreferrer me"
                aria-label="RankMatrix maker on GitHub"
                sx={{
                  ...linkSx,
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'inherit',
                  '& svg': { fontSize: 22 },
                }}
              >
                <GitHub />
              </MuiLink>
              <MuiLink
                href="https://www.linkedin.com/in/ag-divyansh/"
                target="_blank"
                rel="noopener noreferrer author"
                aria-label="RankMatrix maker on LinkedIn"
                sx={{
                  ...linkSx,
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'inherit',
                  '& svg': { fontSize: 22 },
                }}
              >
                <LinkedIn />
              </MuiLink>
            </Stack>
          </Stack>

          <NavList ariaLabel="Tools" heading="Tools">
            {TOOL_LINKS.map((link) => (
              <li key={link.href}>
                <MuiLink component={Link} href={link.href} sx={linkSx}>
                  {link.label}
                </MuiLink>
              </li>
            ))}
          </NavList>

          <NavList ariaLabel="Guides" heading="Guides">
            {GUIDE_LINKS.map((link) => (
              <li key={link.href}>
                <MuiLink component={Link} href={link.href} sx={linkSx}>
                  {link.label}
                </MuiLink>
              </li>
            ))}
          </NavList>

          <NavList ariaLabel="Reference" heading="Reference">
            {REFERENCE_LINKS.map((link) => (
              <li key={link.href}>
                <MuiLink href={link.href} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                  {link.label}
                </MuiLink>
              </li>
            ))}
          </NavList>
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            pt: 3,
            borderTop: `1px solid ${hairline}`,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 3 },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          <Typography sx={{ fontSize: '0.8rem', opacity: 0.55, lineHeight: 1.5 }}>
            © {new Date().getFullYear()} RankMatrix · Built by{' '}
            <MuiLink
              href="https://www.linkedin.com/in/ag-divyansh/"
              target="_blank"
              rel="noopener noreferrer author"
              sx={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              Divyansh Agarwal
            </MuiLink>
          </Typography>
          <Typography
            sx={{
              fontSize: '0.75rem',
              opacity: 0.5,
              lineHeight: 1.55,
              maxWidth: 720,
              textAlign: { xs: 'left', md: 'right' },
            }}
          >
            Not affiliated with JoSAA, JEE, NTA, the IITs, NITs, IIITs, or GFTIs. All data is
            sourced from public JoSAA publications. Verify schedules, rules, and cutoffs on the
            official sources before making admission decisions.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
