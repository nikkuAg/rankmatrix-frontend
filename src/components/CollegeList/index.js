'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ChipFilter } from '@/components/ChipFilter';
import { PaginationBox } from '@/components/PaginationBox';
import { SearchBox } from '@/components/SearchBox';
import { TableSkeleton } from '@/components/Spinner/TableSkeleton';
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
import { catalogueState } from '@/utils/catalogue.mjs';
import { COLLEGE_FILTER_LABELS } from '@/utils/instituteIdentity.mjs';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { TableLayout } from '../TableLayout';
import { CollegeRows } from './CollegeRows';

export const CollegeList = ({ initialData }) => {
  const [getCollegeData, collegeQuery] = useLazyGetCollegeDataQuery();
  const collegeReqData = useSelector((state) => state.college);
  const { data, isLoading } = catalogueState(collegeReqData, collegeQuery, initialData);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [expandedNirf, setExpandedNirf] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const nirfYears = useMemo(() => {
    if (!data?.data?.length) return [];
    return [
      ...new Set(
        data.data.flatMap((college) => (college.nirfRanks || []).map((rank) => rank.year)),
      ),
    ].sort((a, b) => b - a);
  }, [data]);

  useEffect(() => {
    getCollegeData(collegeReqData);
  }, [collegeReqData, getCollegeData]);

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

  const handleCollegeTypeChange = (filterValues) => {
    dispatch(updateFilters({ type: filterValues }));
    sendAnalyticsEvent({
      action: 'college_type_applied',
      category: 'college_list',
      label: 'College List filters',
      parameters: { selected_count: filterValues.length },
    });
  };

  const handleSearchChange = (searchValue) => {
    if (collegeReqData.search !== searchValue) {
      dispatch(updateSearchValue(searchValue));
      sendAnalyticsEvent({
        action: 'search',
        category: 'college_list',
        label: 'College List Search',
        parameters: { state: searchValue ? 'set' : 'cleared' },
      });
    }
  };

  const handleSort = (field) => {
    sendAnalyticsEvent({
      action: 'sort_applied',
      category: 'college_list',
      label: 'College List sort',
      parameters: {
        field,
        direction:
          sortField === field ? (sortOrder === SORT_ORDER.ASC ? 'desc' : 'cleared') : 'asc',
      },
    });
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
      parameters: { state: expandedNirf ? 'collapsed' : 'expanded' },
    });
  };

  return (
    <Box width={'100%'} height={'100%'} py={2}>
      <Stack spacing={2} height={'100%'}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={'space-between'}
          gap={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <ChipFilter
            filterList={Object.keys(COLLEGE_TYPES)}
            labels={COLLEGE_FILTER_LABELS}
            onChange={handleCollegeTypeChange}
            defaultSelected={Object.keys(COLLEGE_TYPES)}
          />
          <SearchBox onChange={handleSearchChange} width={{ xs: '100%', sm: '35%' }} />
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
              <Table aria-label="Participating colleges" sx={{ minWidth: 680 }}>
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
                        NIRF Rank{expandedNirf ? 's' : nirfYears[0] ? ` (${nirfYears[0]})` : ''}
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
                <CollegeRows
                  colleges={data?.data}
                  expandedNirf={expandedNirf}
                  nirfYears={nirfYears}
                />
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
