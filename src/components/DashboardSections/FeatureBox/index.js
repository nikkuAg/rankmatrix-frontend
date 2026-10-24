'use client';

import Link from 'next/link';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import styles from './FeatureBox.module.css';

const features = [
  ['Predict Your College', '/predict', 'Start with your rank. Build a list you can make your own.'],
  [
    'Opening & Closing Ranks',
    '/ranks',
    'Read historical cutoffs with the right exam and allocation context.',
  ],
  ['Seat Matrix', '/seat-matrix', 'Check category, quota and seat pool before comparing intake.'],
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
];
export function FeatureBox() {
  return (
    <div className={styles.grid}>
      {features.map(([title, href, description], index) => (
        <Link
          key={href}
          href={href}
          prefetch={false}
          className={styles.card}
          data-analytics-handled="tool_opened"
          onClick={() =>
            sendAnalyticsEvent({
              action: 'tool_opened',
              category: 'navigation',
              label: title,
              value: 1,
            })
          }
        >
          <span className={styles.number}>
            0{index + 1}
            <span aria-hidden="true">↗</span>
          </span>
          <h3>{title}</h3>
          <p>{description}</p>
        </Link>
      ))}
    </div>
  );
}
