'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SORT_ORDER } from '@/constants';
import { CATEGORIES, COLLEGE_TYPES, QUOTAS, SEAT_POOLS } from '@/constants/josaa';
import { useGetSeatFiltersQuery, useLazyGetSeatDataQuery } from '@/store/queries/seats';
import {
  removeFilters,
  removeIncreaseFilter,
  setIncreaseFilter,
  updateFilters,
  updateOrdering,
  updatePageNumber,
  updateSearchValue,
} from '@/store/slices/seats';
import { useDebounce } from '@/utils/debounceHook';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { useIsMobile } from '../../utils/screenSizeHook';
import { ChipFilter } from '../ChipFilter';
import { NoDataComponent } from '../NoData';
import { PaginationBox } from '../PaginationBox';
import { SearchBox } from '../SearchBox';
import { TableSkeleton } from '../Spinner/TableSkeleton';
import { TableLayout } from '../TableLayout';
import { TableSortCell } from '../TableSortCell';

export const SeatList = () => {
  const INCREASE = 'increase';
  const theme = useTheme();
  const isMobile650 = useIsMobile(650);
  const isMobile800 = useIsMobile(800);

  const dispatch = useDispatch();
  const seatReqData = useDebounce(
    useSelector((state) => state.seat),
    50,
  );
  const [selectedTab, setSelectedTab] = useState(null);
  const [increaseBtnSelected, setIncreaseBtnSelected] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const {
    data: filterData,
    isLoading: isFiltersLoading,
    isFetching: isFiltersFetching,
  } = useGetSeatFiltersQuery();

  const [getSeatData, { data: seatData, isLoading: isSeatsLoading, isFetching: isSeatsFetching }] =
    useLazyGetSeatDataQuery();

  const defaultYear = filterData?.years?.[0];
  const tabValue = selectedTab ?? defaultYear ?? null;

  const increaseTabBtnText = useMemo(() => {
    if (!defaultYear) return null;
    return `Seat change from JoSAA ${defaultYear - 1} to JoSAA ${defaultYear}`;
  }, [defaultYear]);

  useEffect(() => {
    if (!tabValue && !increaseBtnSelected) return;
    if (increaseBtnSelected) {
      if (defaultYear) dispatch(setIncreaseFilter(defaultYear));
      dispatch(removeFilters('year'));
    } else {
      dispatch(updateFilters({ year: tabValue }));
      dispatch(removeIncreaseFilter());
    }
  }, [tabValue, increaseBtnSelected, defaultYear, dispatch]);

  useEffect(() => {
    if (sortField) {
      if (sortOrder === SORT_ORDER.ASC) {
        dispatch(updateOrdering(sortField));
      } else if (sortOrder === SORT_ORDER.DESC) {
        dispatch(updateOrdering(`-${sortField}`));
      }
      sendAnalyticsEvent({
        action: 'sort_applied',
        category: 'seat_list',
        label: 'Seat List sort',
        value: { sortField, sortOrder },
      });
    } else {
      dispatch(updateOrdering(null));
    }
  }, [sortField, sortOrder, dispatch]);

  useEffect(() => {
    if (!isFiltersFetching && !isFiltersLoading) {
      getSeatData(seatReqData);
    }
  }, [seatReqData, getSeatData, isFiltersFetching, isFiltersLoading]);

  const handleCollegeTypeChange = (filterValues) => {
    dispatch(updateFilters({ institute__type: filterValues }));
    sendAnalyticsEvent({
      action: 'college_type_applied',
      category: 'seat_list',
      label: 'Seat List filters',
      value: filterValues,
    });
  };

  const handleSearchChange = (searchValue) => {
    if (seatReqData.search !== searchValue) {
      dispatch(updateSearchValue(searchValue));
      sendAnalyticsEvent({
        action: 'search',
        category: 'seat_list',
        label: 'Seat List Search',
        value: searchValue,
      });
    }
  };

  const handleTabChange = (value) => {
    if (value === INCREASE) {
      setSelectedTab(null);
      setIncreaseBtnSelected(true);
      sendAnalyticsEvent({
        action: 'tab_increase_clicked',
        category: 'seat_list',
        label: 'Seat List tab',
        value: value,
      });
    } else {
      setSelectedTab(value);
      setIncreaseBtnSelected(false);
      sendAnalyticsEvent({
        action: 'tab_clicked',
        category: 'seat_list',
        label: 'Seat List tab',
        value: value,
      });
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      if (sortOrder === SORT_ORDER.ASC) {
        setSortOrder(SORT_ORDER.DESC);
      } else if (sortOrder === SORT_ORDER.DESC) {
        setSortOrder(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortOrder(SORT_ORDER.ASC);
    }
  };

  const handleFilter = (filterValues, field) => {
    if (filterValues.length > 0) {
      dispatch(updateFilters({ [field]: filterValues }));
      sendAnalyticsEvent({
        action: 'filters_applied',
        category: 'seat_list',
        label: 'Seat List Filters',
        value: { filterValues, field },
      });
    } else {
      dispatch(removeFilters(field));
      sendAnalyticsEvent({
        action: 'filters_removed',
        category: 'seat_list',
        label: 'Seat List Filters remove',
        value: { field },
      });
    }
  };

  const handlePageChange = (page) => {
    dispatch(updatePageNumber(page));
    sendAnalyticsEvent({
      action: 'page_change',
      category: 'seat_list',
      label: 'Seat List page Change',
      value: page,
    });
  };

  return (
    <Box width={'100%'} height={'100%'} py={2}>
      <Stack spacing={2} height={'100%'}>
        <Stack
          direction={isMobile650 ? 'column' : 'row'}
          justifyContent={'space-between'}
          gap={2}
          alignItems={isMobile650 ? 'flex-start' : 'center'}
        >
          <ChipFilter
            filterList={Object.keys(COLLEGE_TYPES)}
            onChange={handleCollegeTypeChange}
            defaultSelected={Object.keys(COLLEGE_TYPES)}
          />
          <SearchBox onChange={handleSearchChange} width={isMobile650 ? '100%' : '35%'} />
        </Stack>
        {isFiltersFetching || isFiltersLoading ? (
          <TableSkeleton rows={10} columns={6} />
        ) : (
          <>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
              <Tabs
                value={tabValue}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable-josaa-seat-matrix-year"
                onChange={(e, value) => {
                  handleTabChange(value);
                }}
              >
                {filterData.years?.map((year, idx) => (
                  <Tab
                    value={year}
                    label={`JoSAA ${year}`}
                    key={idx}
                    sx={{
                      ':hover': {
                        color: theme.palette.primary.main,
                      },
                      ...(theme.palette.mode === 'dark' && {
                        '&.Mui-selected': {
                          color: theme.palette.primary.light,
                        },
                      }),
                    }}
                  />
                ))}
              </Tabs>
              <Tabs
                value={increaseBtnSelected && INCREASE}
                sx={{ width: isMobile800 ? '45%' : '20%' }}
                onChange={() => {
                  handleTabChange(INCREASE);
                }}
              >
                <Tab
                  wrapped
                  label={increaseTabBtnText}
                  value={INCREASE}
                  sx={{
                    width: '100%',
                    ':hover': {
                      color: theme.palette.primary.main,
                    },
                    ...(theme.palette.mode === 'dark' && {
                      '&.Mui-selected': {
                        color: theme.palette.primary.light,
                      },
                    }),
                  }}
                />
              </Tabs>
            </Stack>
            {!isSeatsFetching && !isSeatsLoading && seatData?.totalPages > 1 && (
              <PaginationBox
                currentPage={seatData.page}
                totalPages={seatData.totalPages}
                onPageChange={handlePageChange}
                start={seatData.startIndex}
                end={seatData.endIndex}
                totalItems={seatData.totalItems}
              />
            )}
            {isSeatsFetching || isSeatsLoading ? (
              <TableSkeleton rows={10} columns={7} />
            ) : (
              <Stack flexGrow={1}>
                <TableLayout showTable={seatData?.data?.length > 0}>
                  <Table aria-label="college-table">
                    <TableHead>
                      <TableRow>
                        <TableSortCell
                          sortField={sortField}
                          sortOrder={sortOrder}
                          handleSort={handleSort}
                          title="Institute Name"
                          field="institute__name"
                          showFilter={false}
                        />
                        <TableSortCell
                          sortField={sortField}
                          sortOrder={sortOrder}
                          handleSort={handleSort}
                          title="Branch Name"
                          field="branch__name"
                          showFilter={false}
                        />
                        <TableSortCell
                          sortField={sortField}
                          sortOrder={sortOrder}
                          handleSort={handleSort}
                          title="Category"
                          field="category"
                          filterTitle={'Filter by Category'}
                          filterValues={Object.values(CATEGORIES)}
                          onApplyFilter={(filterValues) => handleFilter(filterValues, 'category')}
                          defaultSelected={seatReqData.filters.category}
                        />
                        <TableSortCell
                          sortField={sortField}
                          sortOrder={sortOrder}
                          handleSort={handleSort}
                          title="Quota"
                          field="quota"
                          filterTitle={'Filter by Quota'}
                          filterValues={Object.values(QUOTAS)}
                          onApplyFilter={(filterValues) => handleFilter(filterValues, 'quota')}
                          defaultSelected={seatReqData.filters.quota}
                        />
                        <TableSortCell
                          sortField={sortField}
                          sortOrder={sortOrder}
                          handleSort={handleSort}
                          title="Seat Pool"
                          field="seat_pool"
                          filterTitle={'Filter by Seat Pool'}
                          filterValues={Object.values(SEAT_POOLS)}
                          onApplyFilter={(filterValues) => handleFilter(filterValues, 'seat_pool')}
                          defaultSelected={seatReqData.filters.seat_pool}
                        />
                        {increaseBtnSelected ? (
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Changes in Seats"
                            field="change_in_seats"
                            showFilter={false}
                            hideBorderRight={true}
                          />
                        ) : (
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Available Seats"
                            field="available_seats"
                            showFilter={false}
                            hideBorderRight={true}
                          />
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {seatData?.data?.length > 0 ? (
                        seatData?.data?.map((seat, i) => (
                          <TableRow
                            key={`${seat.institute.code}_${seat.branch.code}_${seat.category}_${seat.quota}_${seat.seatPool}`}
                            sx={{
                              '&:hover': {
                                backgroundColor: theme.palette.primary.light,
                              },
                              ...(i === seatData.data.length - 1 && {
                                '& td': {
                                  borderBottom: '0px !important',
                                },
                              }),
                            }}
                          >
                            <TableCell>{seat.institute.name}</TableCell>
                            <TableCell>{seat.branch.name}</TableCell>
                            <TableCell>{seat.category}</TableCell>
                            <TableCell>{seat.quota}</TableCell>
                            <TableCell>{seat.seatPool}</TableCell>
                            <TableCell sx={{ borderRight: '0px !important' }}>
                              {increaseBtnSelected ? seat.changeInSeats : seat.availableSeats}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <NoDataComponent colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableLayout>
              </Stack>
            )}
            {!isSeatsFetching && !isSeatsLoading && seatData?.totalPages > 1 && (
              <PaginationBox
                currentPage={seatData.page}
                totalPages={seatData.totalPages}
                onPageChange={handlePageChange}
                start={seatData.startIndex}
                end={seatData.endIndex}
                totalItems={seatData.totalItems}
              />
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
