'use client';

import React from 'react';
import { Icon } from '@/components/Icon';
import styles from './CollegeHeader.module.css';

export function CollegeHeader({
  sortField,
  sortOrder,
  handleSort,
  expandedNirf,
  nirfYears,
  onExpand,
}) {
  const sortCell = (title, field) => (
    <th
      scope="col"
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
        <th scope="col">College Code</th>
        {sortCell('College Name', 'name')}
        <th scope="col">College Type</th>
        {sortCell('State', 'state')}
        <th scope="col" colSpan={expandedNirf ? nirfYears.length || 1 : 1} className={styles.nirf}>
          <button
            type="button"
            className={styles.expand}
            onClick={onExpand}
            aria-expanded={expandedNirf}
          >
            NIRF Rank{expandedNirf ? 's' : nirfYears[0] ? ` (${nirfYears[0]})` : ''}
            <Icon name={expandedNirf ? 'chevronLeft' : 'chevronRight'} />
          </button>
        </th>
      </tr>
      {expandedNirf && (
        <tr>
          <th colSpan={4} />
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
