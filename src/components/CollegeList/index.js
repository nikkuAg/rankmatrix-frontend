'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ChipFilter } from '@/components/ChipFilter';
import { NoDataComponent } from '@/components/NoData';
import { PaginationBox } from '@/components/PaginationBox';
import { SearchBox } from '@/components/SearchBox';
import { Spinner } from '@/components/Spinner';
import { TableSortCell } from '@/components/TableSortCell';
import { SORT_ORDER } from '@/constants';
import { COLLEGE_TYPES } from '@/constants/josaa';
import { useLazyGetCollegeDataQuery } from '@/store/queries/college';
import {
  updateFilters,
  updateOrdering,
  updatePageNumber,
  updateSearchValue,
} from '@/store/slices/college';
import { stopLoading } from '@/store/slices/loader';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { useIsMobile } from '../../utils/screenSizeHook';
import { TableLayout } from '../TableLayout';

export const CollegeList = () => {
  const [getCollegeData, { data, isLoading, isFetching }] = useLazyGetCollegeDataQuery();
  const collegeReqData = useSelector((state) => state.college);
  const theme = useTheme();
  const isMobile650 = useIsMobile(650);
  const dispatch = useDispatch();
  const [expandedNirf, setExpandedNirf] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const nirfYears = useMemo(() => {
    if (!data?.data?.length) return [];
    return data.data[0].nirfRanks.map((rank) => rank.year);
  }, [data]);

  useEffect(() => {
    getCollegeData(collegeReqData);
  }, [collegeReqData, getCollegeData]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(stopLoading());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (sortField) {
      if (sortOrder === SORT_ORDER.ASC) {
        dispatch(updateOrdering(sortField));
      } else if (sortOrder === SORT_ORDER.DESC) {
        dispatch(updateOrdering(`-${sortField}`));
      }
      sendAnalyticsEvent({
        action: 'sort_applied',
        category: 'college_list',
        label: 'College List sort',
        value: { sortField, sortOrder },
      });
    } else {
      dispatch(updateOrdering(null));
    }
  }, [sortField, sortOrder, dispatch]);

  const handleCollegeTypeChange = (filterValues) => {
    dispatch(updateFilters({ type: filterValues }));
    sendAnalyticsEvent({
      action: 'college_type_applied',
      category: 'college_list',
      label: 'College List filters',
      value: filterValues,
    });
  };

  const handleSearchChange = (searchValue) => {
    if (collegeReqData.search !== searchValue) {
      dispatch(updateSearchValue(searchValue));
      sendAnalyticsEvent({
        action: 'search',
        category: 'college_list',
        label: 'College List Search',
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
      category: 'college_list',
      label: 'College List page Change',
      value: page,
    });
  };

  const handleExpandNIRF = () => {
    setExpandedNirf(!expandedNirf);
    sendAnalyticsEvent({
      action: 'expand_nirf',
      category: 'college_list',
      label: 'College List NIRF Expanded',
      value: !expandedNirf,
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
        {!isLoading && !isFetching && data?.totalPages > 1 && (
          <PaginationBox
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            start={data.startIndex}
            end={data.endIndex}
            totalItems={data.totalItems}
          />
        )}
        {isLoading || isFetching ? (
          <Spinner sx={{ width: '6rem' }} />
        ) : (
          <Stack flexGrow={1}>
            {!sortField && (
              <Typography
                variant="p"
                alignSelf={'flex-end'}
                fontWeight={300}
                color={theme.palette.gray.dark}
              >
                *Data sorted by latest NIRF year
              </Typography>
            )}
            <TableLayout>
              <Table aria-label="college-table">
                <TableHead>
                  <TableRow>
                    <TableCell>College Code</TableCell>
                    <TableSortCell
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                      title="College Name"
                      field="name"
                      showFilter={false}
                    />
                    <TableCell>College Type</TableCell>
                    <TableSortCell
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                      title="State"
                      field="state"
                      showFilter={false}
                    />
                    <TableCell
                      colSpan={expandedNirf ? nirfYears.length : 1}
                      sx={{
                        transition: 'all 0.3s ease',
                        borderRight: '0px !important',
                      }}
                    >
                      <Button
                        onClick={handleExpandNIRF}
                        color="inherit"
                        sx={{ textTransform: 'none' }}
                      >
                        NIRF Rank{expandedNirf ? 's' : ` (${nirfYears[0]})`}
                        {expandedNirf ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedNirf && (
                    <TableRow>
                      <TableCell colSpan={4} />
                      {nirfYears.map((year, i) => (
                        <TableCell
                          key={year}
                          sx={
                            i === nirfYears.length - 1 && {
                              borderRight: '0px !important',
                            }
                          }
                        >
                          {year}
                        </TableCell>
                      ))}
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {data?.data?.length > 0 ? (
                    data?.data?.map((college, i) => (
                      <TableRow
                        key={college.code}
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
                        <TableCell>{college.code}</TableCell>
                        <TableCell>{college.name}</TableCell>
                        <TableCell>{college.type}</TableCell>
                        <TableCell>{college.state}</TableCell>
                        {!expandedNirf && (
                          <TableCell
                            sx={{
                              borderRight: '0px !important',
                              transition: 'all 0.3s ease',
                              ...(expandedNirf && {
                                colSpan: nirfYears.length,
                              }),
                            }}
                          >
                            {college.nirfRanks.find((rank) => rank.year === nirfYears[0])?.rank ||
                              '-'}
                          </TableCell>
                        )}
                        {expandedNirf &&
                          nirfYears.map((year, i) => (
                            <TableCell
                              key={year}
                              sx={
                                i === nirfYears.length - 1 && {
                                  borderRight: '0px !important',
                                }
                              }
                            >
                              {college.nirfRanks.find((rank) => rank.year === year)?.rank || '-'}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <NoDataComponent colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableLayout>
          </Stack>
        )}
        {!isLoading && !isFetching && data?.totalPages > 1 && (
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
