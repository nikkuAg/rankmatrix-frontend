'use client';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Navbar } from '../Navbar';
import { SnackBar } from '../Snackbar';
import { useIsScreenAllowed } from '../../utils/screenSizeHook';

export const RankMatrixLayout = ({ children }) => {
  const theme = useTheme();
  const isAllowed = useIsScreenAllowed();
  return (
    <Box
      sx={{
        backgroundColor: theme.background.default,
        width: '100vw',
        height: '100vh',
      }}
    >
      {isAllowed ? (
        <Stack>
          <Navbar />
          <Box p={2}>{children}</Box>
          <SnackBar />
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
