'use client';

import Link from 'next/link';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import styles from './FeatureBox.module.css';

const features = [
  // [heading, href, description, analytics label (kept stable so reports stay comparable)]
  [
    'Cutoffs',
    '/ranks',
    'Opening and closing ranks for every college and branch, round by round.',
    'Opening & Closing Ranks',
  ],
  [
    'Colleges',
    '/colleges',
    'Every IIT, NIT, IIIT and GFTI, with its branches and cutoffs.',
    'Participating Colleges',
  ],
  [
    'Branches',
    '/branches',
    'Pick a branch and see every college that offers it.',
    'Participating Branches',
  ],
  ['Seats', '/seat-matrix', 'How many seats each college has in each category.', 'Seat Matrix'],
];
export function ToolLink({ href, label, className, children }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      data-analytics-handled="tool_opened"
      onClick={() =>
        sendAnalyticsEvent({ action: 'tool_opened', category: 'navigation', label, value: 1 })
      }
    >
      {children}
    </Link>
  );
}
export function FeatureBox() {
  return (
    <div className={styles.grid}>
      {features.map(([title, href, description, label]) => (
        <ToolLink key={href} href={href} className={styles.card} label={label}>
          <h3>{title}</h3>
          <p>{description}</p>
        </ToolLink>
      ))}
    </div>
  );
}
