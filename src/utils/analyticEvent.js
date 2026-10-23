import { analyticsPayload } from './analyticsPayload.mjs';

export const sendAnalyticsEvent = ({ action, category, label, value }) => {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // The standard gtag queue retains events until the deferred library loads.
  // Arguments objects preserve Google's queue format.
  function enqueue() {
    window.dataLayer.push(arguments);
  }
  enqueue('event', action, analyticsPayload({ category, label, value }));
};
