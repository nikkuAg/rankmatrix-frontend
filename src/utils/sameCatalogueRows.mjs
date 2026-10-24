export function sameCatalogueRows(previous, next) {
  return (
    previous.expandedNirf === next.expandedNirf &&
    JSON.stringify(previous.nirfYears) === JSON.stringify(next.nirfYears) &&
    JSON.stringify(previous.colleges) === JSON.stringify(next.colleges)
  );
}
