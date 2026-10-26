import { AppLink } from '@/components/AppLink';
import { ReferenceItem, ReferencePanel } from '@/components/ReferencePanel';

export function HomeIntro() {
  return (
    <ReferencePanel
      title="Know what you’re comparing."
      label="About RankMatrix"
      description="Free JEE Main & Advanced College Predictor and JoSAA Cutoffs. No signup. Clear sources and limits."
    >
      <ReferenceItem title="Plan your JoSAA choices with published rank and seat data">
        <p>
          RankMatrix compares your inputs with stored JoSAA cutoffs to build a limited
          college-and-branch shortlist. It does not certify eligibility or calculate admission
          probability. Contact details and signup are not required. The site is built and maintained
          by an <AppLink href="/about">IIT Roorkee alumnus</AppLink> who went through the same
          counselling process.
        </p>
      </ReferenceItem>
      <ReferenceItem title="What you can do here">
        <ul>
          <li>
            Use the <AppLink href="/predict">JEE college &amp; branch predictor</AppLink> to find
            historical institute-branch comparisons for your rank, category and quota.
          </li>
          <li>
            Browse <AppLink href="/ranks">opening and closing ranks</AppLink> across rounds for
            stored JoSAA branches and institutes.
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
      </ReferenceItem>
      <ReferenceItem title="Where the data comes from">
        <p>
          We extract published opening and closing ranks, seat counts, and college and branch
          details from public JoSAA publications. This dataset contains cutoff records, not
          individual candidates&apos; personal records. NIRF ranks are a separate dataset.
          RankMatrix builds its own tools and explanations around these facts. Use the rank explorer
          and detail pages to check the stored year and round; the predictor does not supply its
          dataset year. For how the predictor compares this data with your inputs — and where its
          assumptions can break — see the <AppLink href="/methodology">methodology page</AppLink>.
        </p>
      </ReferenceItem>
      <ReferenceItem title="What RankMatrix is not">
        <p>
          RankMatrix is an independent planning tool. Its predictor compares past cutoffs; it does
          not run JoSAA&apos;s tools, allocate seats, or guarantee admission. Always verify the
          latest schedule, eligibility, and cutoffs on the official{' '}
          <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
            JoSAA website
          </a>{' '}
          before locking any choice. RankMatrix is not affiliated with JoSAA, JEE, NTA, the IITs,
          NITs, IIITs, or GFTIs — it is an independent, free tool. Read the full{' '}
          <AppLink href="/terms">terms of use</AppLink> and{' '}
          <AppLink href="/privacy">privacy policy</AppLink> for the details.
        </p>
      </ReferenceItem>
    </ReferencePanel>
  );
}
