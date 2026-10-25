'use client';

import React from 'react';
import { Icon } from '@/components/Icon';
import styles from './CollegeHeader.module.css';

export function CollegeHeader({
  sortField,
  sortOrder,
  handleSort,
  expandedNirf,
  historyExpanded = expandedNirf,
  nirfYears,
  onExpand,
}) {
  const sortCell = (title, field) => (
    <th
      scope="col"
      rowSpan={expandedNirf ? 2 : 1}
      aria-sort={sortField === field ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button type="button" className={styles.sort} onClick={() => handleSort(field)}>
        {title}
        {sortField === field && <Icon name={sortOrder === 'asc' ? 'arrowUp' : 'arrowDown'} />}
      </button>
    </th>
  );
  return (
    <thead className={styles.header}>
      <tr>
        <th scope="col" rowSpan={expandedNirf ? 2 : 1}>
          College code
        </th>
        {sortCell('College name', 'name')}
        <th scope="col" rowSpan={expandedNirf ? 2 : 1}>
          College type
        </th>
        {sortCell('State', 'state')}
        <th
          scope={expandedNirf ? 'colgroup' : 'col'}
          colSpan={expandedNirf ? nirfYears.length || 1 : 1}
          className={styles.nirf}
        >
          <button
            type="button"
            className={styles.expand}
            onClick={onExpand}
            aria-expanded={historyExpanded}
          >
            NIRF rank{expandedNirf ? 's' : nirfYears[0] ? ` (${nirfYears[0]})` : ''}
            <Icon name="chevronRight" />
          </button>
        </th>
      </tr>
      {expandedNirf && (
        <tr className={styles.years}>
          {nirfYears.map((year) => (
            <th key={year} scope="col">
              {year}
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
}
