'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import animationDataDark from './loader_dark.json';
import animationData from './loader.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

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
