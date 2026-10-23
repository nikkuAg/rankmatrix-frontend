export function isInitialCatalogueRequest(request) {
  return (
    request.page === 1 &&
    request.pageSize === 25 &&
    !request.search &&
    !request.ordering &&
    Object.keys(request.filters || {}).length === 0
  );
}
