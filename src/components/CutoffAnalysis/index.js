import { cutoffAnalysis, rankChangeText } from '@/utils/cutoffAnalysis.mjs';

const rank = (value) => value.toLocaleString('en-IN');

export function CutoffAnalysis({ rows, year }) {
  const analysis = cutoffAnalysis(rows, year);
  return (
    <section aria-labelledby="cutoff-analysis-title">
      <h2 id="cutoff-analysis-title">How the recorded closing ranks changed</h2>
      <p>
        Follow the <a href="/guides/reading-cutoff-trends">worked cutoff-comparison example</a> to
        interpret rank-number changes, then verify your exact slice in the{' '}
        <a href="/ranks">cutoff explorer</a>.
      </p>
      <p>
        This comparison uses Open category (stored as General), Gender-Neutral rows only, with each
        quota kept separate. It describes stored observations, not demand, admission chances or your
        eligibility. Other categories and seat pools remain in the detailed tables below.
      </p>
      {analysis.length ? (
        <>
          <div className="table-scroll">
            <table>
              <caption>JoSAA {year}: first to last recorded round, by quota</caption>
              <thead>
                <tr>
                  <th scope="col">Quota</th>
                  <th scope="col">Recorded rounds</th>
                  <th scope="col">First recorded closing rank</th>
                  <th scope="col">Last recorded closing rank</th>
                  <th scope="col">Rank-number change</th>
                  <th scope="col">Same round in {year - 1}</th>
                </tr>
              </thead>
              <tbody>
                {analysis.map((item) => (
                  <tr key={item.quota}>
                    <th scope="row">{item.quota}</th>
                    <td>{item.roundCount} on file</td>
                    <td>
                      Round {item.first.round}: {rank(item.first.closingRank)}
                    </td>
                    <td>
                      Round {item.last.round}: {rank(item.last.closingRank)}
                    </td>
                    <td>
                      {item.roundChange === null
                        ? 'One round only'
                        : rankChangeText(item.roundChange)}
                    </td>
                    <td>
                      {item.previousYear ? (
                        <>
                          Round {item.last.round}: {rank(item.previousYear.closingRank)};{' '}
                          {rankChangeText(item.yearChange)} in {year}
                        </>
                      ) : (
                        'No matching row on file'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            “Up” means a larger closing-rank number; “down” means a smaller one. We compare
            {` ${year - 1} and ${year}`} only at the same round, quota, category and seat pool. A
            year&apos;s latest stored round may not be its official final round. Missing rounds are
            not filled in, and the change between endpoints does not imply that ranks moved in the
            same direction at every round. Changes to eligibility or rank-list definitions can also
            limit comparisons between years; the numbers alone do not explain why a cutoff changed.
          </p>
        </>
      ) : (
        <p>
          No unambiguous matching rows are available for this comparison. Read the stored rows
          below; missing or conflicting data is not a zero cutoff.
        </p>
      )}
    </section>
  );
}
