'use client';

import React, { useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { COLLEGE_TYPES } from '@/constants/josaa';
import { useGetSeatFiltersQuery } from '@/store/queries/seats';
import {
  removeIncreaseFilter,
  setIncreaseFilter,
  updateFilters,
  updateSearchValue,
} from '@/store/slices/seats';
import { ChipFilter } from '../ChipFilter';
import { SearchBox } from '../SearchBox';
import { Spinner } from '../Spinner';

export const SeatList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const seatReqData = useSelector((state) => state.seat);
  console.log(theme);
  const [tabValue, setTabValue] = useState();
  const [increaseTabBtnText, setIncreaseTabBtnText] = useState(null);
  const {
    data: filterData,
    isLoading: isFiltersLoading,
    isFetching: isFiltersFetching,
  } = useGetSeatFiltersQuery();

  useEffect(() => {
    if (filterData?.years?.length > 0) {
      setTabValue(filterData.years[0]);
      setIncreaseTabBtnText(
        `Seat change from JoSAA ${filterData.years[0]} to JoSAA ${filterData.years[0] - 1}`,
      );
    }
  }, [filterData]);

  useEffect(() => {
    if (tabValue) {
      if (tabValue === 'increase') {
        dispatch(setIncreaseFilter(filterData.years[0]));
      } else {
        dispatch(updateFilters({ year: filterValues }));
        dispatch(removeIncreaseFilter());
      }
    }
  }, [tabValue]);

  const handleCollegeTypeChange = (filterValues) => {
    dispatch(updateFilters({ institute__type: filterValues }));
  };

  const handleSearchChange = (searchValue) => {
    dispatch(updateSearchValue(searchValue));
  };

  console.log(seatReqData);

  return (
    <Box width={'100%'} height={'100%'} py={2}>
      <Stack spacing={2} height={'100%'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <ChipFilter
            filterList={Object.keys(COLLEGE_TYPES)}
            onChange={handleCollegeTypeChange}
            defaultSelected={Object.keys(COLLEGE_TYPES)}
          />
          <SearchBox onChange={handleSearchChange} width={'35%'} />
        </Stack>
        {isFiltersFetching || isFiltersLoading ? (
          <Spinner sx={{ width: '100%', height: '100%' }} />
        ) : (
          <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
            <Tabs
              value={tabValue}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable-josaa-seat-matrix-year"
              onChange={(e, value) => setTabValue(value)}
            >
              {filterData.years?.map((year, idx) => (
                <Tab value={year} label={`JoSAA ${year}`} key={idx} />
              ))}
            </Tabs>
            <Tabs
              value={tabValue}
              sx={{ width: '20%' }}
              onChange={(e, value) => setTabValue(value)}
            >
              <Tab
                wrapped
                label={increaseTabBtnText}
                value={'increase'}
                sx={{
                  width: '100%',
                }}
              />
            </Tabs>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
