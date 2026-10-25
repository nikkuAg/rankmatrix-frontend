import styles from './GuideLayout.module.css';
import { articleSections, withHeadingAnchors } from './headingAnchors';

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
  variant = 'article',
  eyebrow,
  headerNote,
  breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
  ],
  children,
}) => {
  const Heading = headingLevel;
  const isLibrary = variant === 'library';
  const isFeature = ['about', 'contact', 'methodology'].includes(variant);
  const { content, headings } = withHeadingAnchors(children);
  const sections = articleSections(content);
  const hasContents = !isLibrary && headings.length > 1;
  const currentPage = breadcrumbs[breadcrumbs.length - 1]?.name;
  const isGuide = breadcrumbs.some((crumb) => crumb.path === '/guides');
  const label = eyebrow || (isGuide ? 'A RankMatrix guide' : currentPage);
  return (
    <article className={`${styles.article} ${variant === 'article' ? '' : styles[variant] || ''}`}>
      <header className={styles.header}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <ol>
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path}>
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <a href={crumb.path}>{crumb.name}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.headingRow}>
          <div>
            {label && <p className={styles.eyebrow}>{label}</p>}
            <Heading className={styles.title}>{title}</Heading>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {headerNote && <aside className={styles.headerNote}>{headerNote}</aside>}
        </div>
        <div className={styles.meta}>
          <span>
            By{' '}
            <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer author">
              {AUTHOR.name}
            </a>
          </span>
          {lastUpdated && <span>Updated {lastUpdated}</span>}
          {readingTimeMinutes && <span>{readingTimeMinutes} min read</span>}
        </div>
      </header>
      <div
        className={`${styles.readingLayout} ${!hasContents || isFeature ? styles.fullLayout : ''}`}
      >
        {hasContents && (
          <nav className={isFeature ? styles.jumpLinks : styles.contents} aria-label="On this page">
            <p className={styles.contentsLabel}>On this page</p>
            <ol>
              {headings.map((heading, index) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {heading.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={`${styles.content} ${isLibrary ? '' : 'prose'}`}>
          {isLibrary ? (
            children
          ) : (
            <div className={styles.sections}>
              {sections.map((section, index) => (
                <section
                  className={styles.section}
                  aria-labelledby={section.id}
                  key={section.id || `introduction-${index}`}
                  data-section={index + 1}
                >
                  {section.children}
                </section>
              ))}
            </div>
          )}
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
      </div>
    </article>
  );
};
