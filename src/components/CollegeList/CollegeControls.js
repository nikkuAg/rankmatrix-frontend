'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { COLLEGE_TYPES } from '@/constants/josaa';
import { useDebounce } from '@/utils/debounceHook';
import { COLLEGE_FILTER_LABELS } from '@/utils/instituteIdentity.mjs';
import styles from './CollegeControls.module.css';

const types = Object.keys(COLLEGE_TYPES);
export function CollegeControls({ onTypeChange, onSearchChange, defaultSelected = types, defaultSearch = '' }) {
  const theme = useTheme();
  const id = useId();
  const [selected, setSelected] = useState(defaultSelected);
  const [search, setSearch] = useState(defaultSearch);
  const initialSelected = useRef(defaultSelected);
  const debouncedTypes = useDebounce(selected, 500);
  const debouncedSearch = useDebounce(search, 500);
  const callbacks = useRef({ onTypeChange, onSearchChange });
  useEffect(() => {
    callbacks.current = { onTypeChange, onSearchChange };
  }, [onTypeChange, onSearchChange]);
  useEffect(() => {
    if (debouncedTypes !== initialSelected.current) callbacks.current.onTypeChange(debouncedTypes);
  }, [debouncedTypes]);
  useEffect(() => {
    callbacks.current.onSearchChange(debouncedSearch);
  }, [debouncedSearch]);
  return (
    <div
      className={styles.controls}
      style={{
        '--rm-control-text': theme.palette.text.main,
        '--rm-control-primary': theme.palette.primary.main,
        '--rm-control-selected': theme.palette.primary.light,
        '--rm-control-border':
          theme.palette.mode === 'dark' ? theme.palette.gray.dark : theme.palette.gray.main,
        '--rm-control-label': theme.palette.gray.dark,
        '--rm-control-focus':
          theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
        '--rm-control-shadow': theme.palette.shadow.main,
      }}
    >
      <div className={styles.chips}>
        {types.map((type) => (
          <button
            type="button"
            key={type}
            aria-pressed={selected.includes(type)}
            onClick={() =>
              setSelected((previous) =>
                previous.includes(type)
                  ? previous.filter((item) => item !== type)
                  : [...previous, type],
              )
            }
          >
            {COLLEGE_FILTER_LABELS[type] || type}
          </button>
        ))}
      </div>
      <div className={styles.search}>
        <label htmlFor={id}>Search by any keyword</label>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
          />
        </svg>
        <input
          id={id}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </div>
  );
}
