'use client';

import { SITE_CONTENT } from '@/constants/siteContent';
import { ContentListCard } from './ContentListCard';

export const Updates = () => (
  <div className="tool-stack">
    <ContentListCard title="Updates" contentType={SITE_CONTENT.UPDATES} />
    <ContentListCard title="Important links" contentType={SITE_CONTENT.LINKS} />
  </div>
);
