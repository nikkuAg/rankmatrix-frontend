'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import styles from './MultiSelect.module.css';

export function MultiSelect({
  name,
  label,
  options,
  value,
  onChange,
  placeholder,
  allLabel,
  help,
  invalid,
  errorId,
}) {
  const id = useId();
  const root = useRef(null);
  const trigger = useRef(null);
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const selected = options.filter((option) => value.includes(option.value));
  const summary =
    selected.length === options.length && allLabel
      ? allLabel
      : selected.length > 2
        ? `${selected[0].label} +${selected.length - 1}`
        : selected.map((option) => option.label).join(', ');

  useEffect(() => {
    if (!open) return;
    function dismiss(event) {
      if (!root.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  function toggle() {
    const rect = trigger.current.getBoundingClientRect();
    setAbove(window.innerHeight - rect.bottom < 300 && rect.top > window.innerHeight - rect.bottom);
    setOpen(!open);
  }

  return (
    <div
      className={styles.field}
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current.focus();
        }
      }}
    >
      <label id={`${id}-label`} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control}>
        <button
          ref={trigger}
          id={id}
          type="button"
          data-selection={name}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={`${id}-options`}
          aria-labelledby={`${id}-label ${id}-value`}
          aria-describedby={
            [help && `${id}-help`, invalid && errorId].filter(Boolean).join(' ') || undefined
          }
          data-invalid={invalid || undefined}
          onClick={toggle}
        >
          <span id={`${id}-value`} className={selected.length ? undefined : styles.placeholder}>
            {summary || placeholder || 'Select options'}
          </span>
          <Icon name="chevronDown" />
        </button>
        <div id={`${id}-options`} className={styles.panel} hidden={!open} data-above={above}>
          <div className={styles.actions}>
            <button type="button" onClick={() => onChange(options.map((option) => option.value))}>
              Select all
            </button>
            <button type="button" onClick={() => onChange([])}>
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                trigger.current.focus();
              }}
            >
              Done
            </button>
          </div>
          <div className={styles.options} role="group" aria-labelledby={`${id}-label`}>
            {options.map((option) => (
              <label className={styles.option} key={option.value}>
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={(event) =>
                    onChange(
                      event.target.checked
                        ? options
                            .filter(
                              (item) => value.includes(item.value) || item.value === option.value,
                            )
                            .map((item) => item.value)
                        : value.filter((item) => item !== option.value),
                    )
                  }
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {help && <small id={`${id}-help`}>{help}</small>}
    </div>
  );
}
