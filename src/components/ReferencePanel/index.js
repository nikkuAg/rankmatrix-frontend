import { Icon } from '@/components/Icon';
import styles from './ReferencePanel.module.css';

export function ReferencePanel({ title, description, children, label = 'Useful context' }) {
  return (
    <section className={styles.panel} aria-label={title}>
      <header className={styles.heading}>
        <div>
          <p className="eyebrow">{label}</p>
          <h2>{title}</h2>
        </div>
        {description && <p>{description}</p>}
      </header>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}

export function ReferenceItem({ title, children, wide = false }) {
  return (
    <details data-accordion className={`${styles.item} ${wide ? styles.wide : ''}`}>
      <summary>
        <h3>{title}</h3>
        <Icon name="plus" className="disclosure-icon" />
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}

export function FaqList({ faqs }) {
  return faqs.map(({ question, answer }) => (
    <ReferenceItem key={question} title={question}>
      <p>{answer}</p>
    </ReferenceItem>
  ));
}
