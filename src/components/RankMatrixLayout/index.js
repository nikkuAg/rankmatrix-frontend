'use client';
import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import { Navbar } from '../Navbar';
import { SnackBar } from '../Snackbar';

export const RankMatrixLayout = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.background.default,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Stack>
        <Navbar />
        {children}
        <SnackBar />
      </Stack>
    </Box>
  );
};
