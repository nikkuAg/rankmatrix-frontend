import Link from 'next/link';
import styles from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <div className={styles.top}>
        <Link href="/" prefetch={false} aria-label="RankMatrix home" className={styles.logo}>
          <span role="img" aria-label="Logo" className={styles.logoImage} />
          <span className={styles.title}>RankMatrix</span>
        </Link>
        <ThemeToggle />
      </div>
      <nav aria-label="Primary navigation" className={styles.navigation}>
        {[
          ['/predict', 'College predictor'],
          ['/ranks', 'Cutoffs'],
          ['/seat-matrix', 'Seat matrix'],
          ['/colleges', 'Colleges'],
          ['/guides', 'Guides'],
        ].map(([href, label]) => (
          <Link href={href} key={href} prefetch={false}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);
