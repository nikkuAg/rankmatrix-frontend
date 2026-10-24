'use client';

import { useId } from 'react';

export function Dropdown({
  label,
  id,
  selectedValue,
  handleChange,
  listData = [],
  disabled = false,
}) {
  const generatedId = useId();
  return (
    <label className="field" htmlFor={id || generatedId}>
      {label}
      <select
        id={id || generatedId}
        disabled={disabled}
        value={selectedValue ?? ''}
        onChange={(event) => {
          const value =
            listData.find((item) => String(item.value) === event.target.value)?.value ?? '';
          handleChange({ target: { value } });
        }}
      >
        <option value="" disabled>
          {label}
        </option>
        {listData.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
