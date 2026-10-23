import { sendGAEvent } from '@next/third-parties/google';
import { analyticsPayload } from './analyticsPayload.mjs';

export const sendAnalyticsEvent = ({ action, category, label, value }) => {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent('event', action, analyticsPayload({ category, label, value }));
};
