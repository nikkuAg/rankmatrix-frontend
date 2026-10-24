'use client';

import { useRef, useState } from 'react';
import styles from './FilterBox.module.css';

export function FilterBox({
  children,
  filterTitle,
  filterValue = [],
  showFilter = true,
  onApplyFilter,
  defaultSelected = [],
  showRangeFilter = false,
}) {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [selected, setSelected] = useState(defaultSelected);
  const [draft, setDraft] = useState(defaultSelected);
  const [error, setError] = useState('');
  const active = showRangeFilter
    ? selected.some((value, index) => value !== filterValue[index])
    : selected.length > 0;
  function close() {
    dialog.current.close();
    trigger.current.focus();
  }
  function apply(event) {
    event.preventDefault();
    if (
      showRangeFilter &&
      (!draft.every((value) => value !== '' && Number.isFinite(Number(value))) ||
        Number(draft[0]) > Number(draft[1]))
    ) {
      setError('Enter a valid minimum and maximum rank.');
      return;
    }
    const values = showRangeFilter ? draft.map(Number) : draft;
    setSelected(values);
    onApplyFilter?.(values);
    close();
  }
  return (
    <div className={styles.cell}>
      {children}
      {(showFilter || showRangeFilter) && (
        <>
          <button
            ref={trigger}
            type="button"
            className={`${styles.trigger} ${active ? styles.active : ''}`}
            aria-label={`${filterTitle}: ${active ? 'filter active' : 'filter'}`}
            aria-haspopup="dialog"
            onClick={() => {
              setDraft([...selected]);
              setError('');
              dialog.current.showModal();
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 5h18M6 12h12M9 19h6" />
            </svg>
            {active && <span className={styles.dot} />}
          </button>
          <dialog
            ref={dialog}
            className={styles.dialog}
            aria-label={filterTitle}
            onClose={() => trigger.current?.focus()}
            onClick={(event) => {
              if (event.target === dialog.current) close();
            }}
          >
            <form onSubmit={apply}>
              <header>
                <h2>{filterTitle}</h2>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Close filter"
                  onClick={close}
                >
                  ×
                </button>
              </header>
              {showRangeFilter ? (
                <div className={styles.range}>
                  {['Minimum rank', 'Maximum rank'].map((label, index) => (
                    <label className="field" key={label}>
                      {label}
                      <input
                        type="number"
                        required
                        min={filterValue[0]}
                        max={filterValue[1]}
                        step="1"
                        value={draft[index] ?? filterValue[index] ?? ''}
                        onChange={(event) =>
                          setDraft((previous) => [
                            index === 0 ? event.target.value : previous[0],
                            index === 1 ? event.target.value : previous[1],
                          ])
                        }
                      />
                    </label>
                  ))}
                </div>
              ) : (
                <div className={styles.options}>
                  {filterValue.map((item) => {
                    const value = typeof item === 'object' ? item.value : item;
                    return (
                      <label key={value}>
                        <input
                          type="checkbox"
                          checked={draft.includes(value)}
                          onChange={() =>
                            setDraft((previous) =>
                              previous.includes(value)
                                ? previous.filter((item) => item !== value)
                                : [...previous, value],
                            )
                          }
                        />
                        {typeof item === 'object' ? item.label : item}
                      </label>
                    );
                  })}
                </div>
              )}
              {error && <p role="alert">{error}</p>}
              <footer>
                <button
                  type="button"
                  className="button"
                  onClick={() => setDraft(showRangeFilter ? [...filterValue] : [])}
                >
                  Clear
                </button>
                <button className="button primary" type="submit">
                  Apply filter
                </button>
              </footer>
            </form>
          </dialog>
        </>
      )}
    </div>
  );
}
