'use client';

import React from 'react';
import styles from './CollegePagination.module.css';

export function CollegePagination({
  currentPage,
  totalPages,
  onPageChange,
  start,
  end,
  totalItems,
}) {
  const pages = Array.from(
    new Set(
      [1, totalPages, currentPage - 1, currentPage, currentPage + 1].filter(
        (page) => page >= 1 && page <= totalPages,
      ),
    ),
  ).sort((a, b) => a - b);
  return (
    <div className={styles.wrapper}>
      <p className={styles.count}>
        <strong>
          {start || 0}–{end || 0}
        </strong>{' '}
        of {totalItems || 0} results
      </p>
      <nav aria-label="pagination navigation">
        <ul className={styles.items}>
          <li>
            <button
              type="button"
              className={styles.arrow}
              disabled={currentPage <= 1}
              aria-label="Go to previous page"
              onClick={() => onPageChange(currentPage - 1)}
            >
              ← <span>Previous</span>
            </button>
          </li>
          {pages.map((page, index) => (
            <React.Fragment key={page}>
              {index > 0 && page - pages[index - 1] > 1 && (
                <li className={styles.ellipsis} aria-hidden="true">
                  …
                </li>
              )}
              <li>
                <button
                  type="button"
                  className={styles.page}
                  aria-current={page === currentPage ? 'page' : undefined}
                  aria-label={`${page === currentPage ? 'page' : 'Go to page'} ${page}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            </React.Fragment>
          ))}
          <li>
            <button
              type="button"
              className={styles.arrow}
              disabled={currentPage >= totalPages}
              aria-label="Go to next page"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span>Next</span> →
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
