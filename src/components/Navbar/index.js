import Link from 'next/link';
import styles from './Navbar.module.css';

export const Navbar = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <Link href="/" prefetch={false} aria-label="RankMatrix home" className={styles.logo}>
        <span aria-hidden="true" className={styles.logoImage} />
        <span>RankMatrix</span>
      </Link>
      <nav aria-label="Primary navigation" className={styles.navigation}>
        {[
          ['/predict', 'Workspace'],
          ['/ranks', 'Cutoffs'],
          ['/seat-matrix', 'Seat matrix'],
          ['/colleges', 'Colleges'],
          ['/branches', 'Branches'],
          ['/guides', 'Field guide'],
        ].map(([href, label]) => (
          <Link href={href} key={href} prefetch={false}>
            {label}
          </Link>
        ))}
      </nav>
      <Link prefetch={false} href="/predict" className={`${styles.cta} button primary`}>
        Build your choices <span aria-hidden="true">↗</span>
      </Link>
    </div>
  </header>
);
