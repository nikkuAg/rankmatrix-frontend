export function isInitialCatalogueRequest(request) {
  return (
    request.page === 1 &&
    request.pageSize === 25 &&
    !request.search &&
    !request.ordering &&
    Object.keys(request.filters || {}).length === 0
  );
}

export function catalogueState(request, query, initialData) {
  // Lazy-query `data` can belong to a previous search. Even `currentData`
  // describes the last trigger until the effect triggers the new Redux args.
  const matches = JSON.stringify(request) === JSON.stringify(query.originalArgs);
  const fallback = isInitialCatalogueRequest(request) ? initialData : undefined;
  const data = matches ? (query.currentData ?? (query.isError ? undefined : fallback)) : fallback;
  return {
    data,
    isLoading:
      !data && Boolean(!matches || query.isUninitialized || query.isLoading || query.isFetching),
  };
}
