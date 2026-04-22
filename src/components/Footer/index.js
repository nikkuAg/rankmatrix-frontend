'use client';

import React from 'react';
import { GitHub, LinkedIn } from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
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

const linkSx = (theme) => ({
  color: theme.palette.text.light,
  opacity: 0.85,
  fontSize: '0.9rem',
  textDecoration: 'none',
  '&:hover': { opacity: 1, textDecoration: 'underline' },
});

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.light,
        px: { xs: 3, md: 6 },
        pt: { xs: 4, md: 5 },
        pb: 3,
        mt: 6,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        gap={{ xs: 4, md: 6 }}
      >
        <Stack gap={1.5} sx={{ maxWidth: 360 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.25rem' }}>RankMatrix</Typography>
          <Typography sx={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>
            A free JoSAA / JEE counselling companion built on official JoSAA data. No signup, no
            phone number, no email, no marketing spam.
          </Typography>
          <Stack direction="row" gap={0.5} sx={{ mt: 1 }}>
            <IconButton
              component="a"
              href="https://github.com/nikkuAg"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="RankMatrix maker on GitHub"
              sx={{ color: theme.palette.text.light }}
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/ag-divyansh/"
              target="_blank"
              rel="noopener noreferrer author"
              aria-label="RankMatrix maker on LinkedIn"
              sx={{ color: theme.palette.text.light }}
            >
              <LinkedIn fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Stack gap={1.25} sx={{ minWidth: 180 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Tools</Typography>
          {TOOL_LINKS.map((link) => (
            <MuiLink key={link.href} component={Link} href={link.href} sx={linkSx(theme)}>
              {link.label}
            </MuiLink>
          ))}
        </Stack>

        <Stack gap={1.25} sx={{ minWidth: 220 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Guides</Typography>
          {GUIDE_LINKS.map((link) => (
            <MuiLink key={link.href} component={Link} href={link.href} sx={linkSx(theme)}>
              {link.label}
            </MuiLink>
          ))}
        </Stack>

        <Stack gap={1.25} sx={{ minWidth: 180 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Reference</Typography>
          <MuiLink
            href="https://josaa.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx(theme)}
          >
            Official JoSAA site
          </MuiLink>
          <MuiLink
            href="https://jeemain.nta.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx(theme)}
          >
            JEE Main (NTA)
          </MuiLink>
          <MuiLink
            href="https://jeeadv.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx(theme)}
          >
            JEE Advanced
          </MuiLink>
          <MuiLink
            href="https://csab.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            sx={linkSx(theme)}
          >
            CSAB
          </MuiLink>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: theme.palette.text.light, opacity: 0.2 }} />

      <Typography sx={{ fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.6 }}>
        RankMatrix is an independent project and is not affiliated with JoSAA, JEE, NTA, the IITs,
        NITs, IIITs, or GFTIs. All rank, seat, and institute data is sourced from public JoSAA
        publications and reorganised for easier reference. Verify any schedule, rule, or cutoff on
        the official sources before making admission decisions.
      </Typography>
    </Box>
  );
};
