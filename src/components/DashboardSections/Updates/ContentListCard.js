'use client';

import { SITE_CONTENT } from '@/constants/siteContent';
import { useGetSiteContentsQuery } from '@/store/queries/siteContent';
import styles from './Updates.module.css';

export function ContentListCard({ title, contentType }) {
  const { data, isLoading, isError } = useGetSiteContentsQuery();
  const items = data?.[contentType] ?? [];
  return (
    <section className={styles.card}>
      <h2>{title}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {contentType === SITE_CONTENT.UPDATES ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                <a
                  className={styles.officialLink}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.url}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">
          {isLoading
            ? 'Loading notices.'
            : isError
              ? 'Notices are temporarily unavailable.'
              : 'No published items here yet.'}{' '}
          Check the <a href="https://josaa.nic.in/">official JoSAA website</a> for the latest
          notices.
        </p>
      )}
    </section>
  );
}
