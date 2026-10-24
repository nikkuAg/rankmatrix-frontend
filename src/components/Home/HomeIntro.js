import { AppLink } from '@/components/AppLink';

export function HomeIntro() {
  return (
    <section className="reading-section prose" aria-label="About RankMatrix">
      {' '}
      <h2>Plan your JoSAA choices with published rank and seat data</h2>
      <p>
        RankMatrix compares your inputs with stored JoSAA cutoffs to build a limited
        college-and-branch shortlist. It does not certify eligibility or calculate admission
        probability. Contact details and signup are not required. The site is built and maintained
        by an <AppLink href="/about">IIT Roorkee alumnus</AppLink> who went through the same
        counselling process.
      </p>
      <h2>What you can do here</h2>
      <ul>
        <li>
          Use the <AppLink href="/predict">JEE college &amp; branch predictor</AppLink> to find
          historical institute-branch comparisons for your rank, category and quota.
        </li>
        <li>
          Browse <AppLink href="/ranks">opening and closing ranks</AppLink> across rounds for stored
          JoSAA branches and institutes.
        </li>
        <li>
          Check the published <AppLink href="/seat-matrix">seat matrix</AppLink> to see how many
          seats your category actually has at a given institute.
        </li>
        <li>
          Browse <AppLink href="/colleges">participating colleges</AppLink> and{' '}
          <AppLink href="/branches">participating branches</AppLink> with their cutoff trends.
        </li>
        <li>
          Read the <AppLink href="/guides">JoSAA guides</AppLink> for plain-English explainers on
          counselling rounds, choice filling, and how the allocation algorithm actually works.
        </li>
      </ul>
      <h2>Where the data comes from</h2>
      <p>
        Cutoff and seat records are sourced from JoSAA publications; NIRF ranks are a separate
        dataset. Historical opening and closing ranks per institute-branch-category-round, the
        official seat matrix, and the stored participating-institute list are available for
        reference. Use the rank explorer and detail pages to check the stored year and round; the
        predictor does not supply its dataset year. For how the predictor compares this data with
        your inputs — and where its assumptions can break — see the{' '}
        <AppLink href="/methodology">methodology page</AppLink>.
      </p>
      <h2>What RankMatrix is not</h2>
      <p>
        Not an official source, not a coaching service, and not a guarantee. Predictions are
        projections from past cutoffs; real allocations depend on the current year&apos;s applicant
        pool. Always verify the latest schedule, eligibility, and cutoffs on the official{' '}
        <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
          JoSAA website
        </a>{' '}
        before locking any choice. RankMatrix is not affiliated with JoSAA, JEE, NTA, the IITs,
        NITs, IIITs, or GFTIs — it is an independent, free tool. Read the full{' '}
        <AppLink href="/terms">terms of use</AppLink> and{' '}
        <AppLink href="/privacy">privacy policy</AppLink> for the details.
      </p>
    </section>
  );
}
