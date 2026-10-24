'use client';

import React from 'react';
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
        {sortField === field && <span aria-hidden="true">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
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
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d={
                  expandedNirf
                    ? 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'
                    : 'M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z'
                }
              />
            </svg>
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
