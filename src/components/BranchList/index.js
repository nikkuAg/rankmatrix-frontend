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
import { AppLink } from '@/components/AppLink';
import { ChipFilter } from '@/components/ChipFilter';
import { NoDataComponent } from '@/components/NoData';
import { PaginationBox } from '@/components/PaginationBox';
import { SearchBox } from '@/components/SearchBox';
import { TableSkeleton } from '@/components/Spinner/TableSkeleton';
import { TableSortCell } from '@/components/TableSortCell';
import { SORT_ORDER } from '@/constants';
import { COLLEGE_TYPES } from '@/constants/josaa';
import { useGetBranchFiltersQuery, useLazyGetBranchDataQuery } from '@/store/queries/branch';
import {
  removeFilters,
  updateFilters,
  updateOrdering,
  updatePageNumber,
  updateSearchValue,
} from '@/store/slices/branch';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { useIsMobile } from '../../utils/screenSizeHook';
import { TableLayout } from '../TableLayout';

export const BranchList = () => {
  const theme = useTheme();
  const isMobile650 = useIsMobile(650);

  const [getBranchData, { data, isLoading: isBranchLoading, isFetching: isBranchFetching }] =
    useLazyGetBranchDataQuery();
  const {
    data: filtersData,
    isLoading: isFiltersLoading,
    isFetching: isFiltersFetching,
  } = useGetBranchFiltersQuery();
  const branchReqData = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const isLoading = isBranchFetching || isFiltersFetching || isBranchLoading || isFiltersLoading;
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    getBranchData(branchReqData);
  }, [branchReqData, getBranchData]);

  useEffect(() => {
    if (sortField) {
      if (sortOrder === SORT_ORDER.ASC) {
        dispatch(updateOrdering(sortField));
      } else if (sortOrder === SORT_ORDER.DESC) {
        dispatch(updateOrdering(`-${sortField}`));
      }
      sendAnalyticsEvent({
        action: 'sort_applied',
        category: 'branch_list',
        label: 'Branch List sort',
        value: { sortField, sortOrder },
      });
    } else {
      dispatch(updateOrdering(null));
    }
  }, [sortField, sortOrder, dispatch]);

  const handleCollegeTypeChange = (filterValues) => {
    dispatch(updateFilters({ institute__type: filterValues }));
    sendAnalyticsEvent({
      action: 'college_type_applied',
      category: 'branch_list',
      label: 'Branch List filters',
      value: filterValues,
    });
  };

  const handleFilter = (filterValues, field) => {
    if (filterValues.length > 0) {
      dispatch(updateFilters({ [field]: filterValues }));
      sendAnalyticsEvent({
        action: 'filters_applied',
        category: 'branch_list',
        label: 'Branch List Filters',
        value: { filterValues, field },
      });
    } else {
      dispatch(removeFilters(field));
      sendAnalyticsEvent({
        action: 'filters_removed',
        category: 'branch_list',
        label: 'Branch List Filters remove',
        value: { field },
      });
    }
  };

  const handleSearchChange = (searchValue) => {
    if (branchReqData.search !== searchValue) {
      dispatch(updateSearchValue(searchValue));
      sendAnalyticsEvent({
        action: 'search',
        category: 'branch_list',
        label: 'Branch List Search',
        value: searchValue,
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

  const handlePageChange = (page) => {
    dispatch(updatePageNumber(page));
    sendAnalyticsEvent({
      action: 'page_change',
      category: 'branch_list',
      label: 'Branch List page Change',
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
        {!isLoading && data?.totalPages > 1 && (
          <PaginationBox
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            start={data.startIndex}
            end={data.endIndex}
            totalItems={data.totalItems}
          />
        )}
        {isLoading ? (
          <TableSkeleton rows={10} columns={5} />
        ) : (
          <Stack flexGrow={1}>
            <TableLayout>
              <Table aria-label="college-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Branch Code</TableCell>
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
                      title="Degree"
                      field="branch__degree"
                      filterTitle={'Filter by Degree'}
                      filterValues={filtersData?.degree}
                      onApplyFilter={(filterValues) => handleFilter(filterValues, 'branch__degree')}
                      defaultSelected={branchReqData.filters.branch__degree}
                    />
                    <TableSortCell
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                      title="Duration"
                      field="branch__course_duration"
                      filterTitle={'Filter by Duration'}
                      filterValues={filtersData?.duration}
                      onApplyFilter={(filterValues) =>
                        handleFilter(filterValues, 'branch__course_duration')
                      }
                      defaultSelected={branchReqData.filters.branch__course_duration}
                      hideBorderRight={true}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data?.length > 0 ? (
                    data?.data?.map((branch, i) => (
                      <TableRow
                        key={branch.code}
                        sx={{
                          '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                          },
                          ...(i === data.data.length - 1 && {
                            '& td': {
                              borderBottom: '0px !important',
                            },
                          }),
                        }}
                      >
                        <TableCell>{branch.code}</TableCell>
                        <TableCell>
                          {branch.slug ? (
                            <AppLink href={`/branches/${branch.slug}`}>{branch.name}</AppLink>
                          ) : (
                            branch.name
                          )}
                        </TableCell>
                        <TableCell>{branch.degree}</TableCell>
                        <TableCell sx={{ borderRight: '0px !important' }}>
                          {branch.courseDuration} years
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <NoDataComponent colSpan={4} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableLayout>
          </Stack>
        )}
        {!isLoading && data?.totalPages > 1 && (
          <PaginationBox
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            start={data.startIndex}
            end={data.endIndex}
            totalItems={data.totalItems}
          />
        )}
      </Stack>
    </Box>
  );
};
