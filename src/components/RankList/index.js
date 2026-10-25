'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { programmeExam } from '@/utils/choices.mjs';
import { useDebounce } from '@/utils/debounceHook';
import { COLLEGE_FILTER_LABELS } from '@/utils/instituteIdentity.mjs';
import { quotaLabel } from '@/utils/quotaLabel.mjs';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { ChipFilter } from '../ChipFilter';
import { Dropdown } from '../Dropdown';
import { NoDataComponent } from '../NoData';
import { PaginationBox } from '../PaginationBox';
import { SearchBox } from '../SearchBox';
import { TableSkeleton } from '../Spinner/TableSkeleton';
import { TableLayout } from '../TableLayout';
import { TableSortCell } from '../TableSortCell';

export const RankList = () => {
  const dispatch = useDispatch();

  const rankReqData = useDebounce(
    useSelector((state) => state.rank),
    50,
  );
  const [sortField, setSortField] = useState('opening_rank');
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);

  const {
    data: filterData,
    isLoading: isFiltersLoading,
    isFetching: isFiltersFetching,
  } = useGetRankFiltersQuery();

  const [getRankData, { data: rankData, isLoading: isRanksLoading, isFetching: isRanksFetching }] =
    useLazyGetRankDataQuery();

  const yearList = useMemo(() => {
    if (!filterData?.length) return [];
    return filterData.map((data) => ({ label: data.year, value: data.year }));
  }, [filterData]);

  const yearData = useMemo(() => {
    if (!rankReqData.year || !filterData?.length) return null;
    return filterData.find((data) => data.year === rankReqData.year) ?? null;
  }, [rankReqData.year, filterData]);

  const roundList = useMemo(() => {
    if (!yearData?.round) return [];
    return yearData.round.map((round) => ({ label: `Round ${round}`, value: round }));
  }, [yearData]);

  const rangeValues = useMemo(() => {
    if (!yearData) return [];
    return [yearData.min, yearData.max];
  }, [yearData]);

  const rangeDefaultValues = useMemo(() => {
    const result = { openingRank: null, closingRank: null };
    if (rankReqData.filters?.opening_rank) {
      result.openingRank = [
        rankReqData.filters.opening_rank.gte,
        rankReqData.filters.opening_rank.lte,
      ];
    }
    if (rankReqData.filters?.closing_rank) {
      result.closingRank = [
        rankReqData.filters.closing_rank.gte,
        rankReqData.filters.closing_rank.lte,
      ];
    }
    return result;
  }, [rankReqData.filters]);

  useEffect(() => {
    if (filterData?.length > 0) {
      const lastYearData = filterData[filterData.length - 1];
      dispatch(updateYear(lastYearData.year));
      const rounds = lastYearData.round;
      if (rounds?.length) {
        dispatch(updateFilters({ round: rounds[rounds.length - 1] }));
      }
    }
  }, [filterData, dispatch]);

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

  const handleCollegeTypeChange = (filterValues) => {
    dispatch(updateFilters({ institute__type: filterValues }));
    sendAnalyticsEvent({
      action: 'college_type_applied',
      category: 'rank_list',
      label: 'Rank List filters',
      parameters: { selected_count: filterValues.length },
    });
  };

  const handleSearchChange = (searchValue) => {
    if (rankReqData.search !== searchValue) {
      dispatch(updateSearchValue(searchValue));
      sendAnalyticsEvent({
        action: 'search',
        category: 'rank_list',
        label: 'Rank List Search',
        parameters: { state: searchValue ? 'set' : 'cleared' },
      });
    }
  };

  const handleYearChange = (e) => {
    dispatch(updateYear(e.target.value));
    dispatch(removeFilters('round'));
    sendAnalyticsEvent({
      action: 'year_changed',
      category: 'rank_list',
      label: 'Rank List Search',
      value: Number(e.target.value),
    });
  };

  const handleRoundChange = (e) => {
    dispatch(updateFilters({ round: e.target.value }));
    sendAnalyticsEvent({
      action: 'round_changed',
      category: 'rank_list',
      label: 'Rank List Search',
      value: Number(e.target.value),
    });
  };

  const handleSort = (field) => {
    sendAnalyticsEvent({
      action: 'sort_applied',
      category: 'rank_list',
      label: 'Rank List sort',
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

  const handleFilter = (filterValues, field) => {
    if (filterValues.length > 0) {
      dispatch(updateFilters({ [field]: filterValues }));
      sendAnalyticsEvent({
        action: 'filters_applied',
        category: 'rank_list',
        label: 'Rank List Filters',
        parameters: { field, selected_count: filterValues.length },
      });
    } else {
      dispatch(removeFilters(field));
      sendAnalyticsEvent({
        action: 'filters_removed',
        category: 'rank_list',
        label: 'Rank List Filters remove',
        parameters: { field },
      });
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
    sendAnalyticsEvent({
      action: 'filter_range_applied',
      category: 'rank_list',
      label: 'Rank List Filters',
      parameters: { field },
    });
  };

  const handlePageChange = (page) => {
    dispatch(updatePageNumber(page));
    sendAnalyticsEvent({
      action: 'page_change',
      category: 'rank_list',
      label: 'Rank List page Change',
      value: page,
    });
  };

  return (
    <div className="tool-content">
      <div className="tool-stack">
        <div className="toolbar">
          <ChipFilter
            filterList={Object.keys(COLLEGE_TYPES)}
            labels={COLLEGE_FILTER_LABELS}
            onChange={handleCollegeTypeChange}
            defaultSelected={rankReqData.filters?.institute__type || Object.keys(COLLEGE_TYPES)}
          />
          <SearchBox defaultValue={rankReqData.search || ''} onChange={handleSearchChange} />
        </div>
        {isFiltersFetching || isFiltersLoading ? (
          <TableSkeleton rows={10} columns={6} />
        ) : (
          <>
            <div className="toolbar">
              <Dropdown
                label={'Select year'}
                id={'select-year'}
                listData={yearList.sort((a, b) => b.value - a.value)}
                selectedValue={rankReqData.year}
                handleChange={handleYearChange}
              />
              <Dropdown
                label={'Select round'}
                id={'select-round'}
                listData={roundList}
                selectedValue={rankReqData?.filters?.round || ''}
                handleChange={handleRoundChange}
                disabled={roundList.length === 0}
              />
            </div>
            {rankReqData.filters?.round &&
              !isRanksFetching &&
              !isRanksLoading &&
              rankData?.totalPages > 1 && (
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
                <TableSkeleton rows={10} columns={6} />
              ) : (
                <div className="tool-stack">
                  <TableLayout showTable={rankData?.data?.length > 0}>
                    <table className="result-table" aria-label="Opening and closing ranks">
                      <thead>
                        <tr>
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Institute name"
                            field="institute__name"
                            showFilter={false}
                          />
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Programme"
                            field="branch__name"
                            showFilter={false}
                          />
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Category"
                            field="category"
                            filterTitle={'Filter by category'}
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
                            filterTitle={'Filter by quota'}
                            filterValues={Object.values(QUOTAS).map((value) => ({
                              value,
                              label: quotaLabel(value),
                            }))}
                            onApplyFilter={(filterValues) => handleFilter(filterValues, 'quota')}
                            defaultSelected={rankReqData.filters.quota}
                          />
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Seat pool"
                            field="seat_pool"
                            filterTitle={'Filter by seat pool'}
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
                            title="Opening rank"
                            field="opening_rank"
                            showFilter={false}
                            showRangeFilter={true}
                            filterTitle={'Filter by opening rank'}
                            filterValues={rangeValues}
                            onApplyFilter={(v) => handleRangeFilter(v, 'opening_rank')}
                            defaultSelected={rangeDefaultValues.openingRank || rangeValues}
                          />
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Closing rank"
                            field="closing_rank"
                            showFilter={false}
                            hideBorderRight={true}
                            showRangeFilter={true}
                            filterTitle={'Filter by closing rank'}
                            filterValues={rangeValues}
                            onApplyFilter={(v) => handleRangeFilter(v, 'closing_rank')}
                            defaultSelected={rangeDefaultValues.closingRank || rangeValues}
                          />
                        </tr>
                      </thead>
                      <tbody>
                        {rankData?.data?.length > 0 ? (
                          rankData?.data?.map((rank) => (
                            <tr
                              key={`${rank.institute.code}_${rank.branch.code}_${rank.category}_${rank.quota}_${rank.seatPool}`}
                            >
                              <td>
                                {rank.institute.name}
                                <small className="cell-detail">
                                  {programmeExam(rank.institute)}
                                </small>
                              </td>
                              <td>
                                {rank.branch.name}
                                <small className="cell-detail">
                                  {rank.branch.degree} · {rank.branch.courseDuration} years
                                </small>
                              </td>
                              <td>{rank.category}</td>
                              <td>{quotaLabel(rank.quota)}</td>
                              <td>{rank.seatPool}</td>
                              <td>{rank.openingRank}</td>
                              <td>{rank.closingRank}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <NoDataComponent colSpan={7} />
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </TableLayout>
                </div>
              )
            ) : (
              <NoDataComponent text="Select a year and round to view the opening and closing ranks" />
            )}
            {rankReqData.filters?.round &&
              !isRanksFetching &&
              !isRanksLoading &&
              rankData?.totalPages > 1 && (
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
      </div>
    </div>
  );
};
