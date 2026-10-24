export function directoryNavigationHref(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return null;
  const anchor = event.target?.closest?.('a[href]');
  if (
    !anchor ||
    !event.currentTarget.contains(anchor) ||
    anchor.hasAttribute('download') ||
    (anchor.target && anchor.target !== '_self')
  )
    return null;
  const href = anchor.getAttribute('href');
  return /^\/(?:colleges|branches)\/[^/]+\/?$/.test(href || '') ? href : null;
}
