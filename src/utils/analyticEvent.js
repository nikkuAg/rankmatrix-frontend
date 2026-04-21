import { sendGAEvent } from '@next/third-parties/google';

export const sendAnalyticsEvent = ({ action, category, label, value }) => {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
