'use client';

import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { SnackBar } from '@/components/Snackbar';
import { FullPageSpinner } from '@/components/Spinner/FullPage';
import { useIsScreenAllowed } from '@/utils/screenSizeHook';

export const RankMatrixLayout = ({ children }) => {
  const theme = useTheme();
  const isAllowed = useIsScreenAllowed();
  return (
    <Box
      sx={{
        backgroundColor: theme.background.main,
        width: '100vw',
        height: '100vh',
      }}
    >
      {isAllowed ? (
        <Stack height={'100%'} width={'100%'}>
          <Navbar />
          <Box flexGrow={1}>{children}</Box>
          <Footer />
          <SnackBar />
          <FullPageSpinner />
        </Stack>
      ) : (
        <Typography
          color={theme.palette.warning.main}
          p="auto"
          display="flex"
          alignItems="center"
          height="100%"
          textAlign="center"
        >
          Device Screen Size not supported. Try with some larger device
        </Typography>
      )}
    </Box>
  );
};
