import { SnackBar } from '@/components/Snackbar';
import styles from './Layout.module.css';

export const RankMatrixLayout = ({ children, footer, navigation }) => (
  <div className={styles.shell}>
    <a href="#main-content" className={styles.skip}>
      Skip to content
    </a>
    {navigation}
    <main id="main-content" tabIndex={-1} className={styles.main}>
      {children}
    </main>
    {footer}
    <SnackBar />
  </div>
);
