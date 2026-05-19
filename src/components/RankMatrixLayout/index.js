'use client';

import React from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { SnackBar } from '@/components/Snackbar';

export const RankMatrixLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme.background.main,
        width: '100%',
        minHeight: '100dvh',
      }}
    >
      <Stack minHeight="100dvh" width="100%">
        <Navbar />
        <Box component="section" flexGrow={1}>
          {children}
        </Box>
        <Footer />
        <SnackBar />
      </Stack>
    </Box>
  );
};
