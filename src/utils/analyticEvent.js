import { analyticsPayload } from './analyticsPayload.mjs';
import { queueAnalyticsEvent } from './analyticsTransport.mjs';

export const sendAnalyticsEvent = ({ action, category, label, value, parameters }) => {
  queueAnalyticsEvent(
    typeof window === 'undefined' ? null : window,
    process.env.NEXT_PUBLIC_GA_ID,
    action,
    analyticsPayload({ category, label, value, parameters }),
  );
};
