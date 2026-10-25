'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useDebounce } from '@/utils/debounceHook';

export function SearchBox({ onChange, defaultValue = '' }) {
  const id = useId();
  const [search, setSearch] = useState(defaultValue);
  const debounced = useDebounce(search, 500);
  const callback = useRef(onChange);
  useEffect(() => {
    callback.current = onChange;
  }, [onChange]);
  useEffect(() => {
    callback.current(debounced);
  }, [debounced]);
  return (
    <label className="field search" htmlFor={id}>
      Search by any keyword
      <input
        id={id}
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Institute, programme or code"
      />
    </label>
  );
}
