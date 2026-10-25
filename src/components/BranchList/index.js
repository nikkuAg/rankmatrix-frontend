'use client';

import React, { useEffect, useState } from 'react';
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
import { catalogueState } from '@/utils/catalogue.mjs';
import { COLLEGE_FILTER_LABELS } from '@/utils/instituteIdentity.mjs';
import { sendAnalyticsEvent } from '../../utils/analyticEvent';
import { TableLayout } from '../TableLayout';

export const BranchList = ({ initialData }) => {
  const [getBranchData, branchQuery] = useLazyGetBranchDataQuery();
  const { data: filtersData } = useGetBranchFiltersQuery();
  const branchReqData = useSelector((state) => state.branch);
  const { data, isLoading } = catalogueState(branchReqData, branchQuery, initialData);
  const dispatch = useDispatch();
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
      parameters: { selected_count: filterValues.length },
    });
  };

  const handleFilter = (filterValues, field) => {
    if (filterValues.length > 0) {
      dispatch(updateFilters({ [field]: filterValues }));
      sendAnalyticsEvent({
        action: 'filters_applied',
        category: 'branch_list',
        label: 'Branch List Filters',
        parameters: { field, selected_count: filterValues.length },
      });
    } else {
      dispatch(removeFilters(field));
      sendAnalyticsEvent({
        action: 'filters_removed',
        category: 'branch_list',
        label: 'Branch List Filters remove',
        parameters: { field },
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
        parameters: { state: searchValue ? 'set' : 'cleared' },
      });
    }
  };

  const handleSort = (field) => {
    sendAnalyticsEvent({
      action: 'sort_applied',
      category: 'branch_list',
      label: 'Branch List sort',
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
      category: 'branch_list',
      label: 'Branch List page Change',
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
            defaultSelected={branchReqData.filters?.institute__type || Object.keys(COLLEGE_TYPES)}
          />
          <SearchBox
            defaultValue={branchReqData.search || ''}
            onChange={handleSearchChange}
            width={{ xs: '100%', sm: '35%' }}
          />
        </div>
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
          <div className="tool-stack">
            <TableLayout>
              <table className="programme-directory" aria-label="Participating programmes">
                <thead>
                  <tr>
                    <th scope="col">Branch code</th>
                    <TableSortCell
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                      title="Branch name"
                      field="branch__name"
                      showFilter={false}
                    />
                    <TableSortCell
                      sortField={sortField}
                      sortOrder={sortOrder}
                      handleSort={handleSort}
                      title="Degree"
                      field="branch__degree"
                      filterTitle={'Filter by degree'}
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
                      filterTitle={'Filter by duration'}
                      filterValues={filtersData?.duration}
                      onApplyFilter={(filterValues) =>
                        handleFilter(filterValues, 'branch__course_duration')
                      }
                      defaultSelected={branchReqData.filters.branch__course_duration}
                      hideBorderRight={true}
                    />
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.length > 0 ? (
                    data?.data?.map((branch) => (
                      <tr key={branch.code}>
                        <td>{branch.code}</td>
                        <td>
                          {branch.slug ? (
                            <AppLink href={`/branches/${branch.slug}`}>{branch.name}</AppLink>
                          ) : (
                            branch.name
                          )}
                        </td>
                        <td>{branch.degree}</td>
                        <td>{branch.courseDuration} years</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <NoDataComponent colSpan={4} />
                    </tr>
                  )}
                </tbody>
              </table>
            </TableLayout>
          </div>
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
      </div>
    </div>
  );
};
