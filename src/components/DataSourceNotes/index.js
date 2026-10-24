const years = (values) =>
  [...new Set(values.filter(Number.isSafeInteger))].sort((a, b) => b - a).join(', ');

export function DataSourceNotes({
  cutoffYears = [],
  seatYears = [],
  nirfYears = [],
  includeSeats = false,
}) {
  const cutoffCoverage = years(cutoffYears);
  const seatCoverage = years(seatYears);
  const nirfCoverage = years(nirfYears);
  return (
    <section aria-labelledby="data-sources-title">
      <h2 id="data-sources-title">Data sources, coverage and freshness</h2>
      <div className="table-scroll">
        <table>
          <caption>Where the figures on this page come from</caption>
          <thead>
            <tr>
              <th scope="col">Figures</th>
              <th scope="col">Stored years represented here</th>
              <th scope="col">Official source to verify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Opening and closing ranks</th>
              <td>{cutoffCoverage || 'No cutoff rows represented in this response'}</td>
              <td>
                <a href="https://josaa.nic.in/or-cr/" target="_blank" rel="noopener noreferrer">
                  JoSAA opening and closing ranks
                </a>
              </td>
            </tr>
            {includeSeats && (
              <tr>
                <th scope="row">Seat observations</th>
                <td>
                  {seatCoverage ||
                    'No row-level seat year supplied here; see the seat-table coverage label'}
                </td>
                <td>
                  <a
                    href="https://josaa.nic.in/seat-matrix/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    JoSAA seat matrix
                  </a>
                </td>
              </tr>
            )}
            {nirfCoverage && (
              <tr>
                <th scope="row">NIRF ranks</th>
                <td>{nirfCoverage}</td>
                <td>
                  <a href="https://www.nirfindia.org/" target="_blank" rel="noopener noreferrer">
                    NIRF official rankings
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p>
        A stored year identifies the observations shown, not the time they were imported or checked
        against the official portal. Import timestamps and source-file identifiers are not supplied
        with this response. Page refreshes and data imports are separate; do not assume every
        official release or round is already included.
      </p>
      {nirfCoverage && (
        <p>
          Check the NIRF ranking year, category and campus identity. An institute rank is not a
          programme-specific placement or admission measure.
        </p>
      )}
      <p>
        RankMatrix compiles the observations and calculates comparisons; the linked authorities
        publish the source figures. Missing rows are not zero seats or zero ranks. Read the{' '}
        <a href="/methodology">data and predictor methodology</a>, or{' '}
        <a href="/contact">report a discrepancy</a> with the page URL, year, round, category, quota
        and seat pool, plus the official source you checked.
      </p>
    </section>
  );
}
