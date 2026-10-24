'use client';

import { useTheme } from '@mui/material/styles';
import usePagination from '@mui/material/usePagination';
import styles from './CollegePagination.module.css';

export function CollegePagination({
  currentPage,
  totalPages,
  onPageChange,
  start,
  end,
  totalItems,
}) {
  const theme = useTheme();
  const { items } = usePagination({
    page: currentPage,
    count: totalPages,
    onChange: (_, value) => onPageChange(value),
  });
  return (
    <div
      className={styles.wrapper}
      style={{
        '--rm-pagination-text': theme.palette.text.main,
        '--rm-pagination-selected-text': theme.palette.text.light,
        '--rm-pagination-primary': theme.palette.primary.main,
        '--rm-pagination-light': theme.palette.gray.light,
        '--rm-pagination-dark': theme.palette.gray.dark,
      }}
    >
      <nav aria-label="pagination navigation">
        <ul className={styles.items}>
          {items.map(({ page, type, selected, ...props }, index) => (
            <li key={index}>
              {type === 'start-ellipsis' || type === 'end-ellipsis' ? (
                <span className={styles.ellipsis}>…</span>
              ) : (
                <button
                  type="button"
                  {...props}
                  className={`${styles.page} ${type !== 'page' ? styles.arrow : ''}`}
                  aria-current={selected ? 'page' : undefined}
                  aria-label={
                    type === 'page'
                      ? `${selected ? 'page' : 'Go to page'} ${page}`
                      : `Go to ${type} page`
                  }
                >
                  {type === 'page' ? (
                    page
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d={
                          type === 'previous'
                            ? 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'
                            : 'M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z'
                        }
                      />
                    </svg>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <p className={styles.count}>
        Showing results: {start} - {end} of {totalItems}
      </p>
    </div>
  );
}
