'use client';

import { FilterBox } from '../FilterBox';
import styles from './TableSortCell.module.css';

export function TableSortCell({
  sortField,
  sortOrder,
  handleSort,
  title,
  field,
  filterValues = [],
  filterTitle,
  showFilter = true,
  onApplyFilter,
  defaultSelected = [],
  showRangeFilter = false,
  showSort = true,
}) {
  return (
    <th
      scope="col"
      aria-sort={
        showSort && sortField === field
          ? sortOrder === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      <FilterBox
        filterTitle={filterTitle || title}
        filterValue={filterValues}
        showFilter={showFilter}
        onApplyFilter={onApplyFilter}
        defaultSelected={defaultSelected}
        showRangeFilter={showRangeFilter}
      >
        {showSort ? (
          <button type="button" className={styles.sort} onClick={() => handleSort(field)}>
            {title}
            <span aria-hidden="true">
              {sortField === field ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
            </span>
          </button>
        ) : (
          title
        )}
      </FilterBox>
    </th>
  );
}
