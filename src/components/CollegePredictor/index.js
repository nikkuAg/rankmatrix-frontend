'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { useLazyGetpredictionDataQuery } from '../../store/queries/prediction';
import { NoDataComponent } from '../NoData';
import { Spinner } from '../Spinner';
import { TableLayout } from '../TableLayout';
import { TableSortCell } from '../TableSortCell';
import { FormModal } from './formModal';

export const CollegePredictor = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState(null);
  const [
    getPredictionData,
    { data: rankData, isLoading: isRanksLoading, isFetching: isRanksFetching },
  ] = useLazyGetpredictionDataQuery();

  return (
    <>
      <FormModal
        open={open}
        setOpen={setOpen}
        setFormData={setFormData}
        getPredictionData={getPredictionData}
        defaultValues={formData}
      />
      <Box width={'100%'} height={'100%'} py={2}>
        <Stack spacing={2} height={'100%'}>
          <Stack direction={'row'}>
            <Button
              sx={{
                width: 'fit-content',
                color: theme.palette.text.main,
                backgroundColor: theme.palette.primary.light,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.light,
                },
              }}
              onClick={() => setOpen(true)}
            >
              {formData ? 'Update' : 'Add'} Prediction Details
            </Button>
          </Stack>
          {formData == null && (
            <Box
              width={'100%'}
              height={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <NoDataComponent text="Please add prediction details" />
            </Box>
          )}
          {formData != null && (
            <>
              {isRanksFetching || isRanksLoading ? (
                <Spinner sx={{ width: '6rem' }} />
              ) : (
                <Stack flexGrow={1}>
                  <TableLayout showTable={rankData?.data?.length > 0}>
                    <Table aria-label="rank-table">
                      <TableHead>
                        <TableRow>
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Institute Name"
                            field="institute__name"
                            showFilter={false}
                            showSort={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Institute Type"
                            field="institute__type"
                            showFilter={false}
                            showSort={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Branch Degree"
                            field="branch__degree"
                            showFilter={false}
                            showSort={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Branch Name"
                            field="branch__name"
                            showFilter={false}
                            showSort={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Category"
                            field="category"
                            showFilter={false}
                            showSort={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Quota"
                            field="quota"
                            showSort={false}
                            showFilter={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Seat Pool"
                            field="seat_pool"
                            showSort={false}
                            showFilter={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Opening Rank"
                            field="opening_rank"
                            showFilter={false}
                            showRangeFilter={false}
                            showSort={false}
                          />
                          <TableSortCell
                            sortField={''}
                            sortOrder={''}
                            handleSort={() => {}}
                            title="Closing Rank"
                            field="closing_rank"
                            showFilter={false}
                            hideBorderRight={true}
                            showRangeFilter={false}
                          />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rankData?.length > 0 ? (
                          rankData?.map((rank, i) => (
                            <TableRow
                              key={`${rank.institute.code}_${rank.branch.code}_${rank.category}_${rank.quota}_${rank.seatPool}`}
                              sx={{
                                '&:hover': {
                                  backgroundColor: theme.palette.primary.light,
                                },
                                ...(i === rankData.length - 1 && {
                                  '& td': {
                                    borderBottom: '0px !important',
                                  },
                                }),
                              }}
                            >
                              <TableCell>{rank.institute.name}</TableCell>
                              <TableCell>{rank.institute.type}</TableCell>
                              <TableCell>{rank.branch.degree}</TableCell>
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
                            <NoDataComponent colSpan={9} text="Prediction data does not exists" />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableLayout>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};
