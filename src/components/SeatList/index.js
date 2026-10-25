'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { programmeExam } from '@/utils/choices.mjs';
import { useDebounce } from '@/utils/debounceHook';
import { COLLEGE_FILTER_LABELS } from '@/utils/instituteIdentity.mjs';
import { quotaLabel } from '@/utils/quotaLabel.mjs';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { ChipFilter } from '../ChipFilter';
import { NoDataComponent } from '../NoData';
import { PaginationBox } from '../PaginationBox';
import { SearchBox } from '../SearchBox';
import { TableSkeleton } from '../Spinner/TableSkeleton';
import { TableLayout } from '../TableLayout';
import { TableSortCell } from '../TableSortCell';

export const SeatList = () => {
  const INCREASE = 'increase';

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
      parameters: { selected_count: filterValues.length },
    });
  };

  const handleSearchChange = (searchValue) => {
    if (seatReqData.search !== searchValue) {
      dispatch(updateSearchValue(searchValue));
      sendAnalyticsEvent({
        action: 'search',
        category: 'seat_list',
        label: 'Seat List Search',
        parameters: { state: searchValue ? 'set' : 'cleared' },
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
    sendAnalyticsEvent({
      action: 'sort_applied',
      category: 'seat_list',
      label: 'Seat List sort',
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
        category: 'seat_list',
        label: 'Seat List Filters',
        parameters: { field, selected_count: filterValues.length },
      });
    } else {
      dispatch(removeFilters(field));
      sendAnalyticsEvent({
        action: 'filters_removed',
        category: 'seat_list',
        label: 'Seat List Filters remove',
        parameters: { field },
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
    <div className="tool-content">
      <div className="tool-stack">
        <div className="toolbar">
          <ChipFilter
            filterList={Object.keys(COLLEGE_TYPES)}
            labels={COLLEGE_FILTER_LABELS}
            onChange={handleCollegeTypeChange}
            defaultSelected={seatReqData.filters?.institute__type || Object.keys(COLLEGE_TYPES)}
          />
          <SearchBox defaultValue={seatReqData.search || ''} onChange={handleSearchChange} />
        </div>
        {isFiltersFetching || isFiltersLoading ? (
          <TableSkeleton rows={10} columns={6} />
        ) : (
          <>
            <div className="toolbar">
              <div className="chips" role="group" aria-label="Seat data year">
                {filterData?.years?.map((year) => (
                  <button
                    key={year}
                    type="button"
                    aria-pressed={!increaseBtnSelected && tabValue === year}
                    onClick={() => handleTabChange(year)}
                  >
                    JoSAA {year}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="button"
                aria-pressed={increaseBtnSelected}
                onClick={() => handleTabChange(INCREASE)}
              >
                {increaseTabBtnText}
              </button>
            </div>
            {increaseBtnSelected && (
              <p className="notice">
                The comparison treats missing prior-year records as zero. A positive change does not
                by itself confirm that new seats were added. Verify the underlying yearly seat
                records.
              </p>
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
            {isSeatsFetching || isSeatsLoading ? (
              <TableSkeleton rows={10} columns={7} />
            ) : (
              <div className="tool-stack">
                <TableLayout showTable={seatData?.data?.length > 0}>
                  <table className="result-table" aria-label="Programme seats">
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
                          filterTitle={'Filter by category'}
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
                          filterTitle={'Filter by quota'}
                          filterValues={Object.values(QUOTAS).map((value) => ({
                            value,
                            label: quotaLabel(value),
                          }))}
                          onApplyFilter={(filterValues) => handleFilter(filterValues, 'quota')}
                          defaultSelected={seatReqData.filters.quota}
                        />
                        <TableSortCell
                          sortField={sortField}
                          sortOrder={sortOrder}
                          handleSort={handleSort}
                          title="Seat pool"
                          field="seat_pool"
                          filterTitle={'Filter by seat pool'}
                          filterValues={Object.values(SEAT_POOLS)}
                          onApplyFilter={(filterValues) => handleFilter(filterValues, 'seat_pool')}
                          defaultSelected={seatReqData.filters.seat_pool}
                        />
                        {increaseBtnSelected ? (
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Changes in seats"
                            field="change_in_seats"
                            showFilter={false}
                            hideBorderRight={true}
                          />
                        ) : (
                          <TableSortCell
                            sortField={sortField}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                            title="Available seats"
                            field="available_seats"
                            showFilter={false}
                            hideBorderRight={true}
                          />
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {seatData?.data?.length > 0 ? (
                        seatData?.data?.map((seat) => (
                          <tr
                            key={`${seat.institute.code}_${seat.branch.code}_${seat.category}_${seat.quota}_${seat.seatPool}`}
                          >
                            <td>
                              {seat.institute.name}
                              <small className="cell-detail">{programmeExam(seat.institute)}</small>
                            </td>
                            <td>
                              {seat.branch.name}
                              <small className="cell-detail">
                                {seat.branch.degree} · {seat.branch.courseDuration} years
                              </small>
                            </td>
                            <td>{seat.category}</td>
                            <td>{quotaLabel(seat.quota)}</td>
                            <td>{seat.seatPool}</td>
                            <td>
                              {increaseBtnSelected ? seat.changeInSeats : seat.availableSeats}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <NoDataComponent colSpan={6} />
                        </tr>
                      )}
                    </tbody>
                  </table>
                </TableLayout>
              </div>
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
      </div>
    </div>
  );
};
