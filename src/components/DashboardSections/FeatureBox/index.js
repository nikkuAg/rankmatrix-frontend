'use client';

import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import styles from './FeatureBox.module.css';

const features = [
  [
    'Opening & Closing Ranks',
    '/ranks',
    'Read historical cutoffs with the right exam and allocation context.',
  ],
  [
    'Participating Colleges',
    '/colleges',
    'Explore institutes, programmes and observed NIRF history.',
  ],
  [
    'Participating Branches',
    '/branches',
    'Compare programmes without mixing degrees or rank scales.',
  ],
  ['Seat Matrix', '/seat-matrix', 'Check category, quota and seat pool before comparing intake.'],
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
      {features.map(([title, href, description], index) => (
        <ToolLink key={href} href={href} className={styles.card} label={title}>
          <span className={styles.number}>
            0{index + 1}
            <Icon name="arrowUpRight" />
          </span>
          <h3>{title}</h3>
          <p>{description}</p>
        </ToolLink>
      ))}
    </div>
  );
}
