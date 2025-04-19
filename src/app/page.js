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
  const isMobile800 = useIsMobile(800);
  const isMobile485 = useIsMobile(485);

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
      columns={isMobile485 ? 1 : isMobile800 ? 2 : { xs: 2, sm: 7, md: 8, lg: 10 }}
      rowSpacing={1}
      columnSpacing={1}
      p={2}
      height={'100%'}
    >
      {isSuccess && (
        <>
          {!isMobile485 && (
            <Grid2 size={isMobile800 ? 1 : { xs: 1, sm: 2, lg: 2.25 }}>
              <Updates />
            </Grid2>
          )}
          {!isMobile800 && (
            <Grid2 size={{ sm: 3, md: 4, lg: 5.5 }}>
              <FeatureBox />
            </Grid2>
          )}
          <Grid2 size={isMobile485 || isMobile800 ? 1 : { xs: 1, sm: 2, lg: 2.25 }}>
            <EventCalendar />
          </Grid2>
          {isMobile800 && (
            <Grid2 size={2}>
              <FeatureBox />
            </Grid2>
          )}
          {isMobile485 && (
            <Grid2 size={1}>
              <Updates />
            </Grid2>
          )}
        </>
      )}
    </Grid2>
  );
};

export default Home;
