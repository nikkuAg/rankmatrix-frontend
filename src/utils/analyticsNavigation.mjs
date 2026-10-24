export function navigationDestination(pathname) {
  const fixed = {
    '/': 'home',
    '/predict': 'predictor',
    '/ranks': 'cutoffs',
    '/seat-matrix': 'seats',
    '/colleges': 'colleges',
    '/branches': 'branches',
    '/guides': 'guides',
    '/about': 'about',
    '/methodology': 'methodology',
    '/contact': 'contact',
    '/privacy': 'privacy',
    '/terms': 'terms',
  };
  const path = pathname.replace(/\/$/, '') || '/';
  if (fixed[path]) return fixed[path];
  if (/^\/colleges\/[^/]+\/[^/]+$/.test(path)) return 'institute_programme';
  if (/^\/colleges\/[^/]+$/.test(path)) return 'institute';
  if (/^\/branches\/[^/]+$/.test(path)) return 'programme';
  if (/^\/guides\/[^/]+$/.test(path)) return 'guide';
  return null;
}

export function analyticsNavigation(event, location) {
  const anchor = event.target?.closest?.('a[href]');
  if (!anchor || anchor.closest('[data-analytics-handled]') || anchor.hasAttribute('download'))
    return null;
  let url;
  try {
    url = new URL(anchor.getAttribute('href'), location.href);
  } catch {
    return null;
  }
  if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash))
    return null;
  const destination = navigationDestination(url.pathname);
  if (!destination) return null;
  return {
    source: anchor.closest('footer')
      ? 'footer'
      : anchor.closest('header,nav[aria-label="Primary navigation"]')
        ? 'header'
        : 'content',
    destination_type: destination,
  };
}
