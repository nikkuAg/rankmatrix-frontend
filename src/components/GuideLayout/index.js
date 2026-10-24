import styles from './GuideLayout.module.css';

const AUTHOR = {
  name: 'Divyansh Agarwal',
  github: 'https://github.com/nikkuAg',
  linkedin: 'https://www.linkedin.com/in/ag-divyansh/',
};

export const GuideLayout = ({
  title,
  description,
  lastUpdated,
  readingTimeMinutes,
  headingLevel = 'h1',
  breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
  ],
  children,
}) => {
  const Heading = headingLevel;
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
          <ol>
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path}>
                {i === breadcrumbs.length - 1 ? (
                  <span>{crumb.name}</span>
                ) : (
                  <a href={crumb.path}>{crumb.name}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Heading className={styles.title}>{title}</Heading>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.meta}>
          <span>
            By{' '}
            <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer author">
              {AUTHOR.name}
            </a>
          </span>
          {lastUpdated && <span>· Updated {lastUpdated}</span>}
          {readingTimeMinutes && <span>· {readingTimeMinutes} min read</span>}
        </div>
      </header>
      <div className={`${styles.content} prose`}>
        {children}
        <hr className={styles.divider} />
        <aside className={styles.maker}>
          <p className={styles.makerTitle}>A quick note from the maker</p>
          <p className={styles.makerText}>
            RankMatrix is built by{' '}
            <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer author">
              Divyansh Agarwal
            </a>{' '}
            (
            <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer me">
              GitHub
            </a>
            ), an independent developer. It is free to use, it never asks for your phone number or
            email, and it will never send you marketing calls or spam. This guide is for
            informational purposes only. RankMatrix is not affiliated with JoSAA, JEE, NTA, the
            IITs, NITs, IIITs, or GFTIs. Always verify the latest schedule, rules, and cutoffs on
            the official{' '}
            <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
              JoSAA website
            </a>{' '}
            before making any admission decision.
          </p>
        </aside>
      </div>
    </article>
  );
};
