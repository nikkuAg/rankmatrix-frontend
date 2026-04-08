'use client';

import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useIsMobile } from '../../utils/screenSizeHook';

export const FeatureLayout = ({ children, title }) => {
  const theme = useTheme();
  const isMobile650 = useIsMobile(650);
  return (
    <Stack height={'100%'}>
      <Box
        width={'100%'}
        bgcolor={theme.palette.primary.main}
        color={theme.palette.text.light}
        px={4}
        py={5}
      >
        <Typography variant={'h4'} fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Box width={'100%'} flexGrow={1} px={isMobile650 ? 0 : 4}>
        {children}
      </Box>
    </Stack>
  );
};
