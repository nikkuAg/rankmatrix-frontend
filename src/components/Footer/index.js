import Link from 'next/link';
import styles from './Footer.module.css';

const TOOL_LINKS = [
  { label: 'College & Branch Predictor', href: '/predict' },
  { label: 'Opening & Closing Ranks', href: '/ranks' },
  { label: 'Seat Matrix', href: '/seat-matrix' },
  { label: 'Participating Colleges', href: '/colleges' },
  { label: 'Participating Branches', href: '/branches' },
];

const GUIDE_LINKS = [
  { label: 'All guides', href: '/guides' },
  { label: 'What is JoSAA counselling', href: '/guides/what-is-josaa-counselling' },
  { label: 'JEE college & branch predictor', href: '/guides/jee-main-college-predictor' },
  { label: 'Opening & closing ranks', href: '/guides/josaa-opening-and-closing-ranks' },
  { label: 'JEE Main vs Advanced vs JoSAA', href: '/guides/jee-main-vs-advanced-vs-josaa' },
  { label: 'Seat matrix explained', href: '/guides/josaa-seat-matrix' },
  { label: 'JoSAA counselling rounds', href: '/guides/josaa-counselling-rounds' },
  { label: 'Reservation categories', href: '/guides/josaa-reservation-categories' },
  { label: 'Choice filling strategy', href: '/guides/josaa-choice-filling-strategy' },
];

const REFERENCE_LINKS = [
  { label: 'Official JoSAA site', href: 'https://josaa.nic.in' },
  { label: 'JEE Main (NTA)', href: 'https://jeemain.nta.nic.in' },
  { label: 'JEE Advanced', href: 'https://jeeadv.ac.in' },
  { label: 'CSAB', href: 'https://csab.nic.in' },
];

const SITE_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms of use', href: '/terms' },
];

const NavList = ({ heading, links, external = false }) => (
  <nav aria-label={heading}>
    <h2 className={styles.heading}>{heading}</h2>
    <ul className={styles.links}>
      {links.map(({ label, href }) => (
        <li key={href}>
          {external ? (
            <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ) : (
            <Link className={styles.link} href={href} prefetch={false}>
              {label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            <span className={styles.logo} role="img" aria-label="RankMatrix" />
            <span className={styles.brandName}>RankMatrix</span>
          </div>
          <p className={styles.statement}>Evidence for a decision that belongs to you.</p>
          <p className={styles.description}>
            A free JoSAA &amp; JEE counselling companion built on official JoSAA data. No signup or
            contact details required to use the tools.
          </p>
          <div className={styles.social}>
            <a
              className={styles.link}
              href="https://github.com/nikkuAg"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="RankMatrix maker on GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27" />
              </svg>
            </a>
            <a
              className={styles.link}
              href="https://www.linkedin.com/in/ag-divyansh/"
              target="_blank"
              rel="noopener noreferrer author"
              aria-label="RankMatrix maker on LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
        </div>
        <NavList heading="Tools" links={TOOL_LINKS} />
        <NavList heading="Guides" links={GUIDE_LINKS} />
        <NavList heading="Reference" links={REFERENCE_LINKS} external />
        <NavList heading="Site" links={SITE_LINKS} />
      </div>
      <div className={styles.bottom}>
        <p className={styles.byline}>
          &copy; {new Date().getFullYear()} RankMatrix &middot; Built by{' '}
          <a
            href="https://www.linkedin.com/in/ag-divyansh/"
            target="_blank"
            rel="noopener noreferrer author"
          >
            Divyansh Agarwal
          </a>
        </p>
        <p className={styles.disclaimer}>
          Not affiliated with JoSAA, JEE, NTA, the IITs, NITs, IIITs, or GFTIs. Cutoff and seat
          observations come from JoSAA; NIRF figures come from NIRF. Predictor outputs are our
          calculations. Verify schedules, rules, and cutoffs on the official sources before making
          admission decisions.
        </p>
      </div>
      <div className={styles.wordmarkCrop} data-footer-reveal="visible" aria-hidden="true">
        <p className={styles.wordmark} data-footer-wordmark>
          rankmatrix
        </p>
      </div>
    </div>
  </footer>
);
