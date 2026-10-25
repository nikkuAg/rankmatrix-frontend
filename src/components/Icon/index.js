const paths = {
  arrowRight: 'M4 12h16m-6-6 6 6-6 6',
  arrowLeft: 'M20 12H4m6-6-6 6 6 6',
  arrowUpRight: 'M6 18 18 6M6 6h12v12',
  arrowDown: 'M12 4v16m-6-6 6 6 6-6',
  arrowUp: 'M12 20V4m-6 6 6-6 6 6',
  chevronDown: 'm6 9 6 6 6-6',
  chevronRight: 'm9 6 6 6-6 6',
  chevronLeft: 'm15 6-6 6 6 6',
  plus: 'M12 5v14M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  undo: 'M9 4 4 9l5 5M4 9h10a6 6 0 0 1 0 12',
  sort: 'M8 20V4m-4 4 4-4 4 4m4-4v16m-4-4 4 4 4-4',
  grip: 'M8 5h.01M16 5h.01M8 12h.01M16 12h.01M8 19h.01M16 19h.01',
  filter: 'M4 6h16M7 12h10M10 18h4',
};

export function Icon({ name, className = '' }) {
  return (
    <svg
      className={`ui-icon ${className}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === 'grip' ? 3 : 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
