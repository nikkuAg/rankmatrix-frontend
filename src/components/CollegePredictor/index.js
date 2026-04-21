'use client';

import React, { useEffect, useState } from 'react';
import { Download } from '@mui/icons-material';
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
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { downloadCSV } from '../../utils/downloadCSV';
import { loadPredictorFormData, savePredictorFormData } from '../../utils/formStorage';
import { NoDataComponent } from '../NoData';
import { Spinner } from '../Spinner';
import { TableLayout } from '../TableLayout';
import { TableSortCell } from '../TableSortCell';
import { FormModal } from './formModal';

export const CollegePredictor = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState(null);
  // undefined = localStorage not yet inspected (hold modal render to avoid
  // rendering FormModal with empty defaults before the read resolves).
  // After mount we set it to either the stored values or null.
  const [savedDefaults, setSavedDefaults] = useState(undefined);
  const [
    getPredictionData,
    { data: rankData, isLoading: isRanksLoading, isFetching: isRanksFetching },
  ] = useLazyGetpredictionDataQuery();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration-safe localStorage read
    setSavedDefaults(loadPredictorFormData());
  }, []);

  const handleFormSubmit = (data) => {
    setFormData(data);
    savePredictorFormData(data);
  };

  const handleOpenForm = () => {
    setOpen(true);
    sendAnalyticsEvent({
      action: `${formData ? 'update' : 'add'}_form_open_clicked`,
      category: 'college_predictor',
      label: 'College predictor form open',
      value: 1,
    });
  };

  const handleDownload = () => {
    const data = [];
    rankData.forEach((item) => {
      data.push({
        institute: item.institute.name,
        instituteType: item.institute.type,
        branch: item.branch.name,
        degree: item.branch.degree,
        duration: item.branch.courseDuration,
        quota: item.quota,
        category: item.category,
        seatPool: item.seatPool,
        openingRank: item.openingRank,
        closingRank: item.closingRank,
      });
    });
    downloadCSV(data);
    sendAnalyticsEvent({
      action: 'csv_download',
      category: 'college_predictor',
      label: 'College predictor download CSV',
      value: 1,
    });
  };

  return (
    <>
      {savedDefaults !== undefined && (
        <FormModal
          open={open}
          setOpen={setOpen}
          setFormData={handleFormSubmit}
          getPredictionData={getPredictionData}
          defaultValues={formData ?? savedDefaults}
        />
      )}
      <Box width={'100%'} height={'100%'} py={2}>
        <Stack spacing={2} height={'100%'}>
          <Stack direction={'row'} justifyContent={'space-between'}>
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
              onClick={handleOpenForm}
            >
              {formData ? 'Update' : 'Add'} Prediction Details
            </Button>
            {rankData?.length > 0 && (
              <Button
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.dark,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                  },
                }}
                onClick={handleDownload}
                variant="outlined"
                startIcon={<Download />}
              >
                Download
              </Button>
            )}
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
                  <TableLayout showTable={rankData?.length > 0}>
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
                            <NoDataComponent
                              colSpan={9}
                              text="Prediction data does not exists for the provided details"
                            />
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
