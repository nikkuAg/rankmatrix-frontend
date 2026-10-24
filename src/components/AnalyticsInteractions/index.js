'use client';

import { useEffect } from 'react';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import { analyticsNavigation } from '@/utils/analyticsNavigation.mjs';

export function AnalyticsInteractions() {
  useEffect(() => {
    const onClick = (event) => {
      // One navigation event, including keyboard activation and middle-click.
      if (event.type === 'auxclick' && event.button !== 1) return;
      const parameters = analyticsNavigation(event, window.location);
      if (parameters)
        sendAnalyticsEvent({
          action: 'navigation_clicked',
          category: 'navigation',
          label: 'Internal link activated',
          parameters,
        });
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('auxclick', onClick, true);
    };
  }, []);
  return null;
}
