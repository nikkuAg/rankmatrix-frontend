export function TableSkeleton({ rows = 10, columns = 5 }) {
  return (
    <div className="skeleton table-surface" role="status" aria-label="Loading results">
      <span className="sr-only">Loading results</span>
      {Array.from({ length: rows }, (_, row) => (
        <div className="skeleton-row" key={row} aria-hidden="true">
          {Array.from({ length: columns }, (_, column) => (
            <span key={column} />
          ))}
        </div>
      ))}
    </div>
  );
}
