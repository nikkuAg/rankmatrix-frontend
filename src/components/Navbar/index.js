import Link from 'next/link';
import { Icon } from '@/components/Icon';
import styles from './Navbar.module.css';

const researchLinks = [
  ['/colleges', 'Colleges'],
  ['/branches', 'Programmes'],
  ['/seat-matrix', 'Seat matrix'],
];
const NavLink = ({ href, children }) => (
  <Link href={href} prefetch={false}>
    {children}
  </Link>
);

export const Navbar = () => (
  <header className={styles.header} data-site-header>
    <div className={styles.inner}>
      <Link href="/" prefetch={false} aria-label="RankMatrix home" className={styles.logo}>
        <span aria-hidden="true" className={styles.logoImage} />
        <span>RankMatrix</span>
      </Link>
      <nav aria-label="Primary navigation" className={styles.navigation}>
        <NavLink href="/predict">Predictor</NavLink>
        <NavLink href="/ranks">Cutoffs</NavLink>
        <details className={styles.explore} data-site-menu>
          <summary>
            Explore <Icon name="chevronDown" className="disclosure-chevron" />
          </summary>
          <div className={styles.dropdown}>
            <p className="eyebrow">Know your options</p>
            {researchLinks.map(([href, label]) => (
              <NavLink href={href} key={href}>
                {label} <Icon name="arrowUpRight" />
              </NavLink>
            ))}
          </div>
        </details>
        <NavLink href="/guides">Guides</NavLink>
      </nav>
      <Link prefetch={false} href="/predict" className={`${styles.cta} button primary`}>
        Open workspace <Icon name="arrowUpRight" />
      </Link>
      <details className={styles.mobileMenu} data-site-menu>
        <summary aria-label="Navigation menu">
          <Icon name="menu" className={styles.menuIcon} />
          <Icon name="close" className={styles.closeIcon} />
        </summary>
        <nav aria-label="Mobile navigation">
          <NavLink href="/predict">Predictor & choices</NavLink>
          <NavLink href="/ranks">Historical cutoffs</NavLink>
          {researchLinks.map(([href, label]) => (
            <NavLink href={href} key={href}>
              {label}
            </NavLink>
          ))}
          <NavLink href="/guides">Guides</NavLink>
          <NavLink href="/methodology">Our methodology</NavLink>
          <NavLink href="/about">About RankMatrix</NavLink>
        </nav>
      </details>
    </div>
  </header>
);
