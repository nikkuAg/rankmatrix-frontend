'use client';

import React, { useEffect, useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { stopLoading } from '@/store/slices/loader';
import { COLLEGE_TYPES } from '../../constants/josaa';
import { useLazyGetCollegeDataQuery } from '../../store/queries/college';
import {
  removeFilters,
  updateFilters,
  updateOrdering,
  updatePageNumber,
  updateSearchValue,
} from '../../store/slices/college';
import { ChipFilter } from '../ChipFilter';
import { PaginationBox } from '../PaginationBox';
import { SearchBox } from '../SearchBox';
import { Spinner } from '../Spinner';
import { TableSortCell } from '../TableSortCell';

export const CollegeList = () => {
  const [getCollegeData, { data, isLoading, isFetching }] = useLazyGetCollegeDataQuery();
  const collegeReqData = useSelector((state) => state.college);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [nirfYears, setNirfYears] = useState([]);
  const [expandedNirf, setExpandedNirf] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    getCollegeData(collegeReqData);
  }, [collegeReqData, getCollegeData]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(stopLoading());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (data?.data?.length > 0) {
      const nirfRanks = data?.data[0].nirfRanks;
      setNirfYears(nirfRanks.map((rank) => rank.year));
    }
  }, [data]);

  useEffect(() => {
    if (sortField) {
      if (sortOrder === 'asc') {
        dispatch(updateOrdering(sortField));
      } else if (sortOrder === 'desc') {
        dispatch(updateOrdering(`-${sortField}`));
      }
    } else {
      dispatch(updateOrdering(null));
    }
  }, [sortField, sortOrder, dispatch]);

  const handleCollegeTypeChange = (filterValues) => {
    if (filterValues.length > 0) {
      dispatch(updateFilters({ type: filterValues }));
    } else {
      dispatch(removeFilters('type'));
    }
  };

  const handleSearchChange = (searchValue) => {
    dispatch(updateSearchValue(searchValue));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortOrder(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (page) => {
    dispatch(updatePageNumber(page));
  };

  return (
    <Box width={'100%'} height={'100%'} p={2}>
      <Stack spacing={2} height={'100%'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <ChipFilter filterList={Object.keys(COLLEGE_TYPES)} onChange={handleCollegeTypeChange} />
          <SearchBox onChange={handleSearchChange} width={'35%'} />
        </Stack>
        {!isLoading && !isFetching && data?.totalPages > 1 && (
          <PaginationBox
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            start={data.startIndex}
            end={data.endIndex}
          />
        )}
        {isLoading || isFetching ? (
          <Spinner sx={{ width: '100%', height: '100%' }} />
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
            <TableContainer
              component={Box}
              width={'100%'}
              borderRadius={'12px'}
              bgcolor={theme.background.default}
              boxShadow={`0px 0px 28px 0px ${theme.palette.shadow.main}`}
              overflow={'auto'}
            >
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
                    />
                    <TableCell>College Type</TableCell>
                    <TableSortCell
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                      title="State"
                      field="state"
                    />
                    <TableCell
                      colSpan={expandedNirf ? nirfYears.length : 1}
                      sx={{
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Button
                        onClick={() => setExpandedNirf(!expandedNirf)}
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
                      {nirfYears.map((year) => (
                        <TableCell key={year}>{year}</TableCell>
                      ))}
                    </TableRow>
                  )}
                </TableHead>
                <TableBody>
                  {data?.data?.map((college) => (
                    <TableRow key={college.code}>
                      <TableCell>{college.code}</TableCell>
                      <TableCell>{college.name}</TableCell>
                      <TableCell>{college.type}</TableCell>
                      <TableCell>{college.state}</TableCell>
                      {!expandedNirf && (
                        <TableCell
                          sx={{
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
                        nirfYears.map((year) => (
                          <TableCell key={year}>
                            {college.nirfRanks.find((rank) => rank.year === year)?.rank || '-'}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
        {!isLoading && !isFetching && data?.totalPages > 1 && (
          <PaginationBox
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            start={data.startIndex}
            end={data.endIndex}
          />
        )}
      </Stack>
    </Box>
  );
};
