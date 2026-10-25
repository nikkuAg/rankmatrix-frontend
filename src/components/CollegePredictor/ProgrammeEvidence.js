import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { programmeExam } from '@/utils/choices.mjs';
import { admissionRankLabel, instituteType } from '@/utils/instituteIdentity.mjs';
import styles from './Workspace.module.css';

export function ProgrammeEvidence({ programme, preference }) {
  if (!programme)
    return (
      <aside className={styles.evidence}>
        <p className="eyebrow">The evidence desk</p>
        <h2>A closer look.</h2>
        <p className="muted">
          Select a programme to inspect all its returned allocation records, then check the full
          historical data.
        </p>
      </aside>
    );
  const { institute, branch, records } = programme;
  return (
    <aside className={styles.evidence} aria-label="Selected programme evidence">
      <div className={styles.evidenceTop}>
        <span className="eyebrow">
          {preference ? `Preference ${preference}` : 'Selected programme'}
        </span>
        <span className="badge">{programmeExam(institute)}</span>
      </div>
      <h2>{branch.name}</h2>
      <p>{institute.name}</p>
      <p className={styles.degree}>
        {instituteType(institute)} · {branch.degree} · {branch.courseDuration} years
      </p>
      <p className={styles.rankContext}>
        Compare with {admissionRankLabel(institute)}. OPEN uses CRL; reserved categories use their
        respective rank lists.
      </p>
      <h3>
        Historical allocation records <span>({records.length})</span>
      </h3>
      <p className={styles.recordNote}>
        Dataset year is not supplied by the predictor. Keep each category, quota, pool and round
        separate.
      </p>
      <div className={styles.allocationRecords}>
        {records.map((record, index) => (
          <section
            className={styles.allocationRecord}
            key={`${record.category}-${record.quota}-${record.seatPool}-${record.round}-${index}`}
            aria-label={`Allocation record ${index + 1}`}
          >
            <dl className={styles.recordScope}>
              <div>
                <dt>Category / rank list</dt>
                <dd>
                  {record.category} ·{' '}
                  {['General', 'OPEN'].includes(record.category) ? 'CRL' : 'category rank'}
                </dd>
              </div>
              <div>
                <dt>Quota</dt>
                <dd>{record.quota}</dd>
              </div>
              <div>
                <dt>Seat pool</dt>
                <dd>{record.seatPool}</dd>
              </div>
              <div>
                <dt>Round</dt>
                <dd>{record.round ?? 'Not supplied'}</dd>
              </div>
            </dl>
            <dl className={styles.rankPair}>
              <div>
                <dt>Opening rank</dt>
                <dd>{record.openingRank?.toLocaleString('en-IN') ?? 'Not supplied'}</dd>
              </div>
              <div>
                <dt>Closing rank</dt>
                <dd>{record.closingRank?.toLocaleString('en-IN') ?? 'Not supplied'}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
      {institute.slug && branch.slug && (
        <Link
          href={`/colleges/${institute.slug}/${branch.slug}`}
          prefetch={false}
          className="button"
        >
          Explore full programme history <Icon name="arrowUpRight" />
        </Link>
      )}
      <p className={styles.recordNote}>
        Saved evidence is a snapshot of returned comparisons, not a live eligibility check.{' '}
        <a href="https://josaa.nic.in/or-cr/" target="_blank" rel="noopener noreferrer">
          Verify official historical records <Icon name="arrowUpRight" />
        </a>
      </p>
    </aside>
  );
}
