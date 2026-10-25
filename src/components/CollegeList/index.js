'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableSkeleton } from '@/components/Spinner/TableSkeleton';
import { SORT_ORDER } from '@/constants';
import { useLazyGetCollegeDataQuery } from '@/store/queries/college';
import {
  updateFilters,
  updateOrdering,
  updatePageNumber,
  updateSearchValue,
} from '@/store/slices/college';
import { catalogueState } from '@/utils/catalogue.mjs';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { CollegeControls } from './CollegeControls';
import { CollegeHeader } from './CollegeHeader';
import styles from './CollegeList.module.css';
import { CollegePagination } from './CollegePagination';
import { CollegeRows } from './CollegeRows';

export const CollegeList = ({ initialData }) => {
  const [getCollegeData, collegeQuery] = useLazyGetCollegeDataQuery();
  const collegeReqData = useSelector((state) => state.college);
  const { data, isLoading } = catalogueState(collegeReqData, collegeQuery, initialData);
  const dispatch = useDispatch();
  const [expandedNirf, setExpandedNirf] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    if (expandedNirf || !historyVisible) return;
    const timeout = setTimeout(() => setHistoryVisible(false), 420);
    return () => clearTimeout(timeout);
  }, [expandedNirf, historyVisible]);

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
    setHistoryVisible(
      !expandedNirf || !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    setExpandedNirf(!expandedNirf);
    sendAnalyticsEvent({
      action: 'expand_nirf',
      category: 'college_list',
      label: 'College List NIRF Expanded',
      parameters: { state: expandedNirf ? 'collapsed' : 'expanded' },
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <CollegeControls
          onTypeChange={handleCollegeTypeChange}
          onSearchChange={handleSearchChange}
          defaultSelected={collegeReqData.filters?.type}
          defaultSearch={collegeReqData.search || ''}
        />
        {!isLoading && data?.totalPages > 1 && (
          <CollegePagination
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
          <div className={styles.results}>
            {!sortField && <span className={styles.note}>*Data sorted by latest NIRF year</span>}
            <div className={styles.tableContainer}>
              <table
                aria-label="Participating colleges"
                className={styles.table}
                data-history-expanded={expandedNirf}
                style={{ '--nirf-extra-columns': Math.max(nirfYears.length - 1, 0) }}
              >
                <colgroup>
                  <col className={styles.codeColumn} />
                  <col className={styles.nameColumn} />
                  <col className={styles.typeColumn} />
                  <col className={styles.stateColumn} />
                  <col className={styles.latestColumn} />
                  {historyVisible &&
                    nirfYears
                      .slice(1)
                      .map((year) => <col key={year} className={styles.historyColumn} />)}
                </colgroup>
                <CollegeHeader
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  expandedNirf={historyVisible}
                  historyExpanded={expandedNirf}
                  nirfYears={nirfYears}
                  onExpand={handleExpandNIRF}
                />
                <CollegeRows
                  colleges={data?.data}
                  expandedNirf={historyVisible}
                  nirfYears={nirfYears}
                />
              </table>
            </div>
          </div>
        )}
        {!isLoading && data?.totalPages > 1 && (
          <CollegePagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            start={data.startIndex}
            end={data.endIndex}
            totalItems={data.totalItems}
          />
        )}
      </div>
    </div>
  );
};
