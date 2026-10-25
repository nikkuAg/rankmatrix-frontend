import Link from 'next/link';
import { withHeadingAnchors } from '@/components/GuideLayout/headingAnchors';
import { Icon } from '@/components/Icon';
import styles from './DataPageLayout.module.css';

export function DataPageLayout({
  breadcrumbs = [],
  title,
  subtitle,
  badges = [],
  lastUpdated,
  children,
}) {
  const { content, headings } = withHeadingAnchors(children, { prefix: 'evidence' });
  const sections = [...headings, { id: 'data-sources-title', title: 'Sources & coverage' }];
  if (breadcrumbs.length > 3)
    sections.splice(1, 0, { id: 'cutoff-analysis-title', title: 'Cutoff movement' });
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumbs}>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path}>
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link prefetch={false} href={crumb.path}>
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {badges.length > 0 && (
          <div className="chips">
            {badges.map((badge) => (
              <span className="badge" key={badge.label}>
                {badge.label}
              </span>
            ))}
          </div>
        )}
        {lastUpdated && (
          <p className={styles.meta}>
            Data coverage: {lastUpdated} · By{' '}
            <a
              href="https://www.linkedin.com/in/ag-divyansh/"
              target="_blank"
              rel="noopener noreferrer author"
            >
              Divyansh Agarwal
            </a>
          </p>
        )}
      </header>
      <div className={styles.body}>
        <aside className={styles.rail}>
          <nav aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ol>
              {sections.map(({ id, title: label }) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    {label.startsWith('About ')
                      ? 'Overview'
                      : label.startsWith('Branches offered')
                        ? 'Programmes & cutoffs'
                        : label.startsWith('Colleges offering')
                          ? 'Participating colleges'
                          : label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Link href="/predict" prefetch={false} className={styles.action}>
            Build your choice list <Icon name="arrowUpRight" />
          </Link>
          <details data-accordion className={styles.source}>
            <summary>
              Sources &amp; independence <Icon name="chevronDown" className="disclosure-chevron" />
            </summary>
            <p>
              Cutoff and seat observations are compiled from JoSAA publications; NIRF figures come
              from NIRF. Stored coverage can be incomplete. RankMatrix is an independent project and
              is not affiliated with JoSAA, JEE, NTA, the IITs, NITs, IIITs, or GFTIs. Verify all
              schedules, rules, and cutoffs on the official{' '}
              <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
                JoSAA website
              </a>{' '}
              before making admission decisions.
            </p>
          </details>
        </aside>
        <div className={`${styles.content} prose`}>{content}</div>
      </div>
    </article>
  );
}
