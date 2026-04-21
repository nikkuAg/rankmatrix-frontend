import { sendGAEvent } from '@next/third-parties/google';

export const sendAnalyticsEvent = ({ action, category, label, value }) => {
  sendGAEvent('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
