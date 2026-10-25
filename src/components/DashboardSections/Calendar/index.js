'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { useGetSiteContentsQuery } from '@/store/queries/siteContent';
import styles from './Calendar.module.css';

const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export function EventCalendar() {
  const { data, isLoading, isError } = useGetSiteContentsQuery();
  const events = data?.event ?? [];
  const [month, setMonth] = useState(() => dateKey(new Date()).slice(0, 7));
  const [selected, setSelected] = useState(null);
  const [focused, setFocused] = useState(() => dateKey(new Date()));
  const dates = useRef(null);
  const keyboardMove = useRef(false);
  useEffect(() => {
    if (keyboardMove.current) {
      dates.current?.querySelector(`[data-date="${focused}"]`)?.focus();
      keyboardMove.current = false;
    }
  }, [focused]);
  const [year, index] = month.split('-').map(Number);
  const first = new Date(year, index - 1, 1);
  const count = new Date(year, index, 0).getDate();
  const valid = events.filter((event) => !Number.isNaN(new Date(event.startDate).getTime()));
  const contains = (event, key) =>
    dateKey(new Date(event.startDate)) <= key &&
    dateKey(new Date(event.endDate || event.startDate)) >= key;
  const visible = valid.filter((event) =>
    selected
      ? contains(event, selected)
      : dateKey(new Date(event.startDate)) <= `${month}-${count}` &&
        dateKey(new Date(event.endDate || event.startDate)) >= `${month}-01`,
  );
  function changeMonth(value) {
    if (!value) return;
    setMonth(value);
    setSelected(null);
    setFocused(`${value}-01`);
  }
  function shift(offset) {
    changeMonth(dateKey(new Date(year, index - 1 + offset, 1)).slice(0, 7));
  }
  function navigateDate(event, key) {
    const [year, month, day] = key.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const offsets = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -date.getDay(),
      End: 6 - date.getDay(),
    };
    if (event.key in offsets) date.setDate(day + offsets[event.key]);
    else if (event.key === 'PageUp' || event.key === 'PageDown') {
      const nextMonth = month - 1 + (event.key === 'PageUp' ? -1 : 1);
      date.setDate(1);
      date.setMonth(nextMonth);
      date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));
    } else return;
    event.preventDefault();
    const next = dateKey(date);
    if (next.slice(0, 7) !== key.slice(0, 7)) changeMonth(next.slice(0, 7));
    keyboardMove.current = true;
    setFocused(next);
  }
  return (
    <section className={styles.calendar}>
      <h2>Important dates</h2>
      <div className={styles.controls}>
        <button
          type="button"
          className="icon-button"
          aria-label="Previous month"
          onClick={() => shift(-1)}
        >
          <Icon name="arrowLeft" />
        </button>
        <label className="field">
          Month
          <input type="month" value={month} onChange={(event) => changeMonth(event.target.value)} />
        </label>
        <button
          type="button"
          className="icon-button"
          aria-label="Next month"
          onClick={() => shift(1)}
        >
          <Icon name="arrowRight" />
        </button>
      </div>
      <div ref={dates} className={styles.days} role="group" aria-label="Calendar dates">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <span key={day} className={styles.weekday}>
            {day}
          </span>
        ))}
        {Array.from({ length: first.getDay() }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}
        {Array.from({ length: count }, (_, index) => {
          const key = `${month}-${String(index + 1).padStart(2, '0')}`;
          const hasEvent = valid.some((event) => contains(event, key));
          return (
            <button
              type="button"
              key={key}
              data-date={key}
              tabIndex={focused === key ? 0 : -1}
              aria-current={dateKey(new Date()) === key ? 'date' : undefined}
              onFocus={() => setFocused(key)}
              onKeyDown={(event) => navigateDate(event, key)}
              aria-pressed={selected === key}
              aria-label={`${key}${hasEvent ? ', event scheduled' : ''}`}
              className={hasEvent ? styles.event : undefined}
              onClick={() => setSelected((previous) => (previous === key ? null : key))}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      {selected && (
        <button type="button" className="button small" onClick={() => setSelected(null)}>
          Show whole month
        </button>
      )}
      <div className={styles.events}>
        {visible.length ? (
          visible.map((event, index) => (
            <article key={`${event.title}-${index}`}>
              <span>
                {new Date(event.startDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })}
                {event.endDate &&
                  ` – ${new Date(event.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`}
              </span>
              <p>{event.title}</p>
            </article>
          ))
        ) : (
          <p className="muted" role="status">
            {isLoading
              ? 'Loading published dates…'
              : isError
                ? 'Published dates are temporarily unavailable. Check the official schedule below.'
                : `No published events for this ${selected ? 'date' : 'month'}.`}
          </p>
        )}
      </div>
      <a href="https://josaa.nic.in/schedule/" target="_blank" rel="noopener noreferrer">
        Verify the official JoSAA schedule <Icon name="arrowUpRight" />
      </a>
    </section>
  );
}
