import Link from 'next/link';
import styles from './Layout.module.css';

export const FeatureLayout = ({ children, title, description }) => (
  <div className={styles.feature}>
    <header className={styles.featureHeader}>
      <nav className={styles.featureBreadcrumb} aria-label="Breadcrumb">
        <Link href="/" prefetch={false}>
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>
      <h1>{title}</h1>
      {description && <p className={styles.featureDescription}>{description}</p>}
    </header>
    <div className={styles.featureContent}>{children}</div>
  </div>
);
