import React from 'react';

export function NoDataComponent({ colSpan, text = 'No results match the selected filters.' }) {
  const Container = colSpan === undefined ? 'div' : 'td';
  return (
    <Container {...(colSpan === undefined ? {} : { colSpan })}>
      <div className="empty-state">
        <p>{text}</p>
      </div>
    </Container>
  );
}
