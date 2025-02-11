'use client';
import React, { useEffect } from 'react';
import { useGetAnnouncementsQuery } from '../../../store/queries/announcement';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loader';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ContentListCard } from '../ContentListCard';

export const Updates = () => {
  const { data, isError, isLoading } = useGetAnnouncementsQuery();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, isLoading]);

  console.log(data, isLoading);

  return (
    <Box
      width="100%"
      padding={1}
      sx={{
        backgroundColor: theme.palette.secondary[20],
        borderRadius: '5px',
      }}
    >
      <ContentListCard />
    </Box>
  );
};
