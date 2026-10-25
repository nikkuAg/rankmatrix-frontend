import Link from 'next/link';
import styles from '@/components/GuideLayout/GuideLayout.module.css';
import { Icon } from '@/components/Icon';

export const metadata = {
  title: { absolute: 'Page Not Found | RankMatrix' },
  description:
    'This RankMatrix page could not be found. Browse colleges, branches or JoSAA guides.',
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <section className={`${styles.article} ${styles.recovery}`}>
      <div className={styles.recoveryLayout}>
        <div className={styles.errorCode} aria-hidden="true">
          404
          <span>
            One link.
            <br />A different direction.
          </span>
        </div>
        <div>
          <p className={styles.eyebrow}>Find your next step</p>
          <h1>Page not found</h1>
          <p>
            The address may be incorrect, or this institute or programme is not in our current
            catalogue.
          </p>
          <ul className={styles.recoveryLinks}>
            <li>
              <Link href="/colleges" prefetch={false} className="button primary">
                Browse participating colleges
              </Link>
            </li>
            <li>
              <Link href="/branches" prefetch={false} className="button">
                Compare engineering branches
              </Link>
            </li>
            <li>
              <Link href="/guides" prefetch={false}>
                Read JoSAA counselling guides
              </Link>
            </li>
            <li>
              <Link href="/" prefetch={false}>
                Return to RankMatrix home
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <aside className={styles.recoveryNote}>
        <h2>Have a working page with a data discrepancy?</h2>
        <p>
          A missing page and an unavailable request are different states. If you can open a record
          but its data appears incorrect, include the page URL and the official source when
          reporting it.
        </p>
        <Link href="/contact" prefetch={false}>
          Report a discrepancy <Icon name="arrowRight" />
        </Link>
      </aside>
    </section>
  );
}
