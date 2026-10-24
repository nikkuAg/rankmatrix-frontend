'use client';

import React, { Suspense } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { Navbar } from '@/components/Navbar';
import { SnackBar } from '@/components/Snackbar';

export const RankMatrixLayout = ({ children, footer }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.background.main,
        width: '100%',
        minHeight: '100dvh',
      }}
    >
      <Stack minHeight="100dvh" width="100%">
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute',
            left: -10000,
            '&:focus': { left: 16, top: 8, zIndex: 1500, p: 2, bgcolor: 'background.paper' },
          }}
        >
          Skip to content
        </Box>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <Box component="main" id="main-content" tabIndex={-1} flexGrow={1}>
          <Suspense fallback={null}>{children}</Suspense>
        </Box>
        <Suspense fallback={null}>{footer}</Suspense>
        <Suspense fallback={null}>
          <SnackBar />
        </Suspense>
      </Stack>
    </Box>
  );
};
