'use client';
import { Box, Grid2 } from '@mui/material';
import { useIsMobile } from '../utils/screenSizeHook';
import { Updates } from '../components/DashboardSections/Updates';
import { EventCalendar } from '@/components/DashboardSections/Calendar';
import { useDispatch } from 'react-redux';
import { useGetSiteContentsQuery } from '@/store/queries/siteContent';
import { startLoading, stopLoading } from '@/store/slices/loader';
import React, { useEffect } from 'react';

const Home = () => {
  const isMobile = useIsMobile();
  const { data, isLoading, isSuccess } = useGetSiteContentsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, isLoading]);

  return (
    <Grid2
      container
      columns={{ xs: 2, sm: 5, lg: 9 }}
      rowSpacing={1}
      columnSpacing={1}
    >
      {isSuccess && (
        <>
          <Grid2 size={{ xs: 1, sm: 1.5, lg: 2 }}>
            <Updates />
          </Grid2>
          {!isMobile && (
            <Grid2 size={{ sm: 2, lg: 5 }}>
              <Box>Heu</Box>
            </Grid2>
          )}
          <Grid2 size={{ xs: 1, sm: 1.5, lg: 2 }}>
            <EventCalendar />
          </Grid2>
          {isMobile && (
            <Grid2 size={2}>
              <Box>Heuuu</Box>
            </Grid2>
          )}
        </>
      )}
    </Grid2>
  );
};

export default Home;
