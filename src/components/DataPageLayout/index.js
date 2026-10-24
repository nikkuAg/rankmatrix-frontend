import Link from 'next/link';
import styles from './DataPageLayout.module.css';

export function DataPageLayout({
  breadcrumbs = [],
  title,
  subtitle,
  badges = [],
  lastUpdated,
  children,
}) {
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
      <div className={`${styles.content} prose`}>
        {children}
        <hr />
        <aside className="notice">
          Cutoff and seat observations are compiled from JoSAA publications; NIRF figures come from
          NIRF. Stored coverage can be incomplete. RankMatrix is an independent project and is not
          affiliated with JoSAA, JEE, NTA, the IITs, NITs, IIITs, or GFTIs. Verify all schedules,
          rules, and cutoffs on the official{' '}
          <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
            JoSAA website
          </a>{' '}
          before making admission decisions.
        </aside>
      </div>
    </article>
  );
}
