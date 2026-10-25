'use client';

import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/utils/debounceHook';

export function ChipFilter({ filterList, labels = {}, onChange, defaultSelected = [] }) {
  const [selected, setSelected] = useState(defaultSelected);
  const initial = useRef(selected);
  const debounced = useDebounce(selected, 500);
  const callback = useRef(onChange);
  useEffect(() => {
    callback.current = onChange;
  }, [onChange]);
  useEffect(() => {
    if (debounced !== initial.current) callback.current(debounced);
  }, [debounced]);
  return (
    <div className="chips" role="group" aria-label="Institute types">
      {filterList.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={selected.includes(value)}
          onClick={() =>
            setSelected((previous) =>
              previous.includes(value)
                ? previous.filter((item) => item !== value)
                : [...previous, value],
            )
          }
        >
          {labels[value] || value}
        </button>
      ))}
    </div>
  );
}
