'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import Lottie from 'lottie-react';
import animationDataDark from './loader_dark.json';
import animationData from './loader.json';

export const Spinner = ({ sx }) => {
  const theme = useTheme();
  return (
    <Box sx={sx}>
      <Lottie
        animationData={theme.palette.mode === 'dark' ? animationDataDark : animationData}
        loop={true}
      />
    </Box>
  );
};
