'use client';

import React from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useThemeContext } from '@/theme/ThemeContext';

export const Navbar = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  return (
    <AppBar position="static" sx={{ py: 2, background: theme.background.main }} elevation={0}>
      <Box width="100%" px={{ xs: 2, md: 4 }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack
            component={Link}
            href="/"
            prefetch={false}
            aria-label="RankMatrix home"
            direction={'row'}
            gap={{ xs: 1, sm: 2 }}
            sx={{ textDecoration: 'none' }}
          >
            <Avatar
              alt="Logo"
              src={`${mode === 'dark' ? '/logo_dark.svg' : '/logo.svg'}`}
              variant="square"
            />
            <Typography
              component="span"
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2.125rem' },
                fontWeight: '500',
                display: 'flex',
                color: theme.palette.text.main,
              }}
            >
              RankMatrix
            </Typography>
          </Stack>
          <IconButton
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            onClick={toggleTheme}
            sx={{ color: theme.palette.text.main }}
          >
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Stack>
        <Box
          component="nav"
          aria-label="Primary navigation"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}
        >
          {[
            ['/predict', 'College predictor'],
            ['/ranks', 'Cutoffs'],
            ['/seat-matrix', 'Seat matrix'],
            ['/colleges', 'Colleges'],
            ['/guides', 'Guides'],
          ].map(([href, label]) => (
            <Box
              component={Link}
              key={href}
              href={href}
              prefetch={false}
              sx={{ color: 'text.primary', py: 0.5, textUnderlineOffset: '3px' }}
            >
              {label}
            </Box>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
};
