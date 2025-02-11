'use client';
import React, { useEffect } from 'react';
import { useGetSiteContentsQuery } from '../../../store/queries/siteContent';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loader';
import { Box, useTheme } from '@mui/material';
import { ContentListCard } from '../ContentListCard';
import { SITE_CONTENT } from '@/constants/siteContent';

export const Updates = () => {
  const { data, isError, isLoading, isSuccess } = useGetSiteContentsQuery();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, isLoading]);

  return (
    isSuccess && (
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
    )
  );
};
