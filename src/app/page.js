'use client';

import React, { useEffect } from 'react';
import { Grid2 } from '@mui/material';
import { useDispatch } from 'react-redux';
import { EventCalendar } from '@/components/DashboardSections/Calendar';
import { FeatureBox } from '@/components/DashboardSections/FeatureBox';
import { Updates } from '@/components/DashboardSections/Updates';
import { useGetSiteContentsQuery } from '@/store/queries/siteContent';
import { startLoading, stopLoading } from '@/store/slices/loader';
import { useIsMobile } from '@/utils/screenSizeHook';

const Home = () => {
  const isMobile = useIsMobile();
  const { isLoading, isSuccess } = useGetSiteContentsQuery();

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
      p={2}
      height={'100%'}
    >
      {isSuccess && (
        <>
          <Grid2 size={{ xs: 1, sm: 1.5, lg: 2 }}>
            <Updates />
          </Grid2>
          {!isMobile && (
            <Grid2 size={{ sm: 2, lg: 5 }}>
              <FeatureBox />
            </Grid2>
          )}
          <Grid2 size={{ xs: 1, sm: 1.5, lg: 2 }}>
            <EventCalendar />
          </Grid2>
          {isMobile && (
            <Grid2 size={2}>
              <FeatureBox />
            </Grid2>
          )}
        </>
      )}
    </Grid2>
  );
};

export default Home;
