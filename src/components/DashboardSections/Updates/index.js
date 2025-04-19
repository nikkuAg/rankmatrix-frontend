'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { SITE_CONTENT } from '@/constants/siteContent';
import { useIsMobile } from '../../../utils/screenSizeHook';
import { ContentListCard } from './ContentListCard';

export const Updates = () => {
  const theme = useTheme();
  const isMobile = useIsMobile(800);
  return (
    <Box
      width="100%"
      height={isMobile ? '100%' : '80%'}
      sx={{
        backgroundColor: theme.background.dark,
        borderRadius: '12px',
        boxShadow: `0px 0px 15px -6px ${theme.palette.shadow.main}`,
        color: theme.palette.text.main,
      }}
    >
      <ContentListCard height={'40%'} title={'Updates'} contentType={SITE_CONTENT.UPDATES} />
      <ContentListCard height={'60%'} title={'Important Links'} contentType={SITE_CONTENT.LINKS} />
    </Box>
  );
};
