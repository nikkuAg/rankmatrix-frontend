import styles from './Layout.module.css';

export const FeatureLayout = ({ children, title }) => (
  <div className={styles.feature}>
    <header className={styles.featureHeader}>
      <h1>{title}</h1>
    </header>
    <div className={styles.featureContent}>{children}</div>
  </div>
);
