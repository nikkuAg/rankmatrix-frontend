'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SORT_ORDER } from '@/constants';
import { CATEGORIES, COLLEGE_TYPES, QUOTAS, SEAT_POOLS } from '@/constants/josaa';
import { useGetRankFiltersQuery, useLazyGetRankDataQuery } from '@/store/queries/rank';
import {
  removeFilters,
  updateFilters,
  updateOrdering,
  updatePageNumber,
  updateSearchValue,
  updateYear,
} from '@/store/slices/rank';
import { useDebounce } from '@/utils/debounceHook';
import { useIsMobile } from '../../utils/screenSizeHook';
import { ChipFilter } from '../ChipFilter';
import { Dropdown } from '../Dropdown';
import { NoDataComponent } from '../NoData';
import { PaginationBox } from '../PaginationBox';
import { SearchBox } from '../SearchBox';
import { Spinner } from '../Spinner';
import { TableLayout } from '../TableLayout';
import { TableSortCell } from '../TableSortCell';

export const RankList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile650 = useIsMobile(650);

  const rankReqData = useDebounce(
    useSelector((state) => state.rank),
    50,
  );
  const [yearList, setYearList] = useState([]);
  const [roundList, setRoundList] = useState([]);
  const [rangeValues, setRangeValues] = useState([]);
  const [rangeDefaultValues, setRangeDefaultValues] = useState({
    openingRank: null,
    closingRank: null,
  });
  const [sortField, setSortField] = useState('opening_rank');
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);

  const {
    data: filterData,
    isLoading: isFiltersLoading,
    isFetching: isFiltersFetching,
  } = useGetRankFiltersQuery();

  const [getRankData, { data: rankData, isLoading: isRanksLoading, isFetching: isRanksFetching }] =
    useLazyGetRankDataQuery();

  useEffect(() => {
    if (filterData?.length > 0) {
      setYearList(
        filterData.map((data) => ({
          label: data.year,
          value: data.year,
        })),
      );
      dispatch(updateYear(filterData[filterData.length - 1].year));
      if (filterData.some((data) => data.year === filterData[filterData.length - 1].year)) {
        const rounds = filterData.filter(
          (data) => data.year === filterData[filterData.length - 1].year,
        )[0].round;
        dispatch(updateFilters({ round: rounds[rounds.length - 1] }));
      }
    }
  }, [filterData, dispatch]);

  useEffect(() => {
    if (rankReqData.year && filterData.some((data) => data.year === rankReqData.year)) {
      const yearData = filterData.filter((data) => data.year === rankReqData.year)[0];
      setRoundList(
        yearData.round?.map((round) => ({
          label: `Round ${round}`,
          value: round,
        })),
      );
      setRangeValues([yearData.min, yearData.max]);
    }
  }, [rankReqData.year, filterData]);

  useEffect(() => {
    if (sortField) {
      if (sortOrder === SORT_ORDER.ASC) {
        dispatch(updateOrdering(sortField));
      } else if (sortOrder === SORT_ORDER.DESC) {
        dispatch(updateOrdering(`-${sortField}`));
      }
    } else {
      dispatch(updateOrdering(null));
    }
  }, [sortField, sortOrder, dispatch]);

  useEffect(() => {
    if (!isFiltersFetching && !isFiltersLoading && rankReqData?.filters?.round) {
      getRankData(rankReqData);
    }
  }, [rankReqData, getRankData, isFiltersFetching, isFiltersLoading]);

  useEffect(() => {
    if (rankReqData.filters) {
      if (rankReqData.filters.opening_rank) {
        setRangeDefaultValues((prev) => ({
          ...prev,
          openingRank: [rankReqData.filters.opening_rank.gte, rankReqData.filters.opening_rank.lte],
        }));
      }
      if (rankReqData.filters.closing_rank) {
        setRangeDefaultValues((prev) => ({
          ...prev,
          closingRank: [rankReqData.filters.closing_rank.gte, rankReqData.filters.closing_rank.lte],
        }));
      }
    }
  }, [rankReqData.filters]);

  const handleCollegeTypeChange = (filterValues) => {
    dispatch(updateFilters({ institute__type: filterValues }));
  };

  const handleSearchChange = (searchValue) => {
    if (rankReqData.search !== searchValue) {
      dispatch(updateSearchValue(searchValue));
    }
  };

  const handleYearChange = (e) => {
    dispatch(updateYear(e.target.value));
    dispatch(removeFilters('round'));
  };

  const handleRoundChange = (e) => {
    dispatch(updateFilters({ round: e.target.value }));
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
    } else {
      dispatch(removeFilters(field));
    }
  };

  const handleRangeFilter = (filterValue, field) => {
    dispatch(
      updateFilters({
        [field]: {
          gte: filterValue[0],
          lte: filterValue[1],
        },
      }),
    );
  };

  const handlePageChange = (page) => {
    dispatch(updatePageNumber(page));
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
          <Spinner sx={{ width: '6rem' }} />
        ) : (
          <>
            <Stack direction={'row'} gap={2} alignItems={'center'}>
              <Dropdown
                label={'Select Year'}
                id={'select-year'}
                listData={yearList}
                selectedValue={rankReqData.year}
                handleChange={handleYearChange}
                width={isMobile650 ? '40%' : '20%'}
              />
              <Dropdown
                label={'Select Round'}
                id={'select-round'}
                listData={roundList}
                selectedValue={rankReqData?.filters?.round || ''}
                handleChange={handleRoundChange}
                disabled={roundList.length === 0}
                width={isMobile650 ? '40%' : '20%'}
              />
            </Stack>
            {!isRanksFetching && !isRanksLoading && rankData?.totalPages > 1 && (
              <PaginationBox
                currentPage={rankData.page}
                totalPages={rankData.totalPages}
                onPageChange={handlePageChange}
                start={rankData.startIndex}
                end={rankData.endIndex}
                totalItems={rankData.totalItems}
              />
            )}
            {rankReqData.filters?.round ? (
              isRanksFetching || isRanksLoading ? (
                <Spinner sx={{ width: '6rem' }} />
              ) : (
                <Stack flexGrow={1}>
                  <TableLayout showTable={rankData?.data?.length > 0}>
                    <Table aria-label="rank-table">
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
                            defaultSelected={rankReqData.filters.category}
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
                            defaultSelected={rankReqData.filters.quota}
                          />
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Seat Pool"
                            field="seat_pool"
                            filterTitle={'Filter by Seat Pool'}
                            filterValues={Object.values(SEAT_POOLS)}
                            onApplyFilter={(filterValues) =>
                              handleFilter(filterValues, 'seat_pool')
                            }
                            defaultSelected={rankReqData.filters.seat_pool}
                          />
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Opening Rank"
                            field="opening_rank"
                            showFilter={false}
                            showRangeFilter={true}
                            filterTitle={'Filter by Opening Rank'}
                            filterValues={rangeValues}
                            onApplyFilter={(v) => handleRangeFilter(v, 'opening_rank')}
                            defaultSelected={rangeDefaultValues.openingRank || rangeValues}
                          />
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Closing Rank"
                            field="closing_rank"
                            showFilter={false}
                            hideBorderRight={true}
                            showRangeFilter={true}
                            filterTitle={'Filter by Closing Rank'}
                            filterValues={rangeValues}
                            onApplyFilter={(v) => handleRangeFilter(v, 'closing_rank')}
                            defaultSelected={rangeDefaultValues.closingRank || rangeValues}
                          />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rankData?.data?.length > 0 ? (
                          rankData?.data?.map((rank, i) => (
                            <TableRow
                              key={`${rank.institute.code}_${rank.branch.code}_${rank.category}_${rank.quota}_${rank.seatPool}`}
                              sx={{
                                '&:hover': {
                                  backgroundColor: theme.palette.primary.light,
                                },
                                ...(i === rankData.data.length - 1 && {
                                  '& td': {
                                    borderBottom: '0px !important',
                                  },
                                }),
                              }}
                            >
                              <TableCell>{rank.institute.name}</TableCell>
                              <TableCell>{rank.branch.name}</TableCell>
                              <TableCell>{rank.category}</TableCell>
                              <TableCell>{rank.quota}</TableCell>
                              <TableCell>{rank.seatPool}</TableCell>
                              <TableCell>{rank.openingRank}</TableCell>
                              <TableCell sx={{ borderRight: '0px !important' }}>
                                {rank.closingRank}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <NoDataComponent colSpan={7} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableLayout>
                </Stack>
              )
            ) : (
              <NoDataComponent text="Select a year and round to view the opening and closing ranks" />
            )}
            {!isRanksFetching && !isRanksLoading && rankData?.totalPages > 1 && (
              <PaginationBox
                currentPage={rankData.page}
                totalPages={rankData.totalPages}
                onPageChange={handlePageChange}
                start={rankData.startIndex}
                end={rankData.endIndex}
                totalItems={rankData.totalItems}
              />
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
