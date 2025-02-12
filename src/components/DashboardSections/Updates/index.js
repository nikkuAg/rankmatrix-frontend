'use client';
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { ContentListCard } from '../ContentListCard';
import { SITE_CONTENT } from '@/constants/siteContent';

export const Updates = () => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      padding={1}
      sx={{
        backgroundColor: theme.palette.primary[10],
        borderRadius: '5px',
      }}
    >
      <ContentListCard title={'Updates'} contentType={SITE_CONTENT.UPDATES} />
      <ContentListCard
        title={'Important Links'}
        contentType={SITE_CONTENT.LINKS}
      />
    </Box>
  );
};
