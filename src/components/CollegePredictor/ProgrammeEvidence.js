import Link from 'next/link';
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
      <div className="notice">
        Compare with {admissionRankLabel(institute)}. OPEN uses CRL; reserved categories use their
        respective rank lists.
      </div>
      <h3>Historical allocation records</h3>
      <p className={styles.recordNote}>
        Dataset year is not supplied by the predictor. Keep each category, quota, pool and round
        separate.
      </p>
      <div className="table-scroll" role="region" aria-label="Allocation evidence" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Quota</th>
              <th scope="col">Pool</th>
              <th scope="col">Round</th>
              <th scope="col">Opening</th>
              <th scope="col">Closing</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={`${record.category}-${record.quota}-${record.seatPool}-${record.round}-${index}`}
              >
                <td>{record.category}</td>
                <td>{record.quota}</td>
                <td>{record.seatPool}</td>
                <td>{record.round ?? 'Not supplied'}</td>
                <td>{record.openingRank}</td>
                <td>{record.closingRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {institute.slug && branch.slug && (
        <Link
          href={`/colleges/${institute.slug}/${branch.slug}`}
          prefetch={false}
          className="button"
        >
          Explore full programme history ↗
        </Link>
      )}
      <p className={styles.recordNote}>
        Saved evidence is a snapshot of returned comparisons, not a live eligibility check.{' '}
        <a href="https://josaa.nic.in/or-cr/" target="_blank" rel="noopener noreferrer">
          Verify official historical records ↗
        </a>
      </p>
    </aside>
  );
}
