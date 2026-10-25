import { AppLink } from '@/components/AppLink';
import { FaqList, ReferenceItem, ReferencePanel } from '@/components/ReferencePanel';

export function PredictPageContent({ faqs }) {
  return (
    <ReferencePanel
      title="Read the evidence. Make your choice."
      description="Rank lists, examples and limitations — alongside the tool, whenever you need them."
      label="How to read your predictor output"
    >
      <ReferenceItem title="How to read the predictor output">
        <p>
          Each row is a stored (institute, programme, category, quota, seat pool) cutoff comparison.
          The backend selects rows using its search-window priorities and displays them by opening
          rank. This is not an admission-probability ranking or a recommended choice order.
        </p>
        <p>
          IIT and participating IISc programme rows use JEE Advanced ranks; other rows use the
          applicable JEE Main rank list. Do not compare numbers from different exams or category
          rank lists as one competitiveness scale. The requested result limit can omit other
          relevant options, so inspect the underlying cutoff data and your genuine preferences
          before building a choice list.
        </p>
      </ReferenceItem>
      <ReferenceItem title="Which rank should I compare with a JoSAA cutoff?">
        <p>
          First match the exam and rank list: participating IIT and IISc programmes use JEE
          Advanced; NIT, IIIT and other NIT+ seats use JEE Main. OPEN cutoffs refer to the Common
          Rank List (CRL); reserved categories use their corresponding category ranks. Match the
          category, PwD status, quota, seat pool, year and round shown in the row. A percentile is
          not a rank.
        </p>
      </ReferenceItem>
      <ReferenceItem title="A hypothetical cutoff comparison">
        <p>
          If a row has an opening rank of 8,000 and closing rank of 10,000, a rank of 9,000 in the
          same rank list falls within that historical interval. A rank of 11,000 is outside it.
          These illustrative numbers do not describe any institute or predict a future allocation.
          Check actual <AppLink href="/ranks">JoSAA cutoffs</AppLink> and the{' '}
          <AppLink href="/seat-matrix">seat matrix</AppLink> for your exact filters.
        </p>
      </ReferenceItem>
      <ReferenceItem title="How to use the list">
        <ol>
          <li>Verify the exam, rank list, category, quota and seat pool for each comparison.</li>
          <li>
            Use <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink> or the
            <AppLink href="/colleges"> institute directory</AppLink> to inspect the stored year,
            round and programme details. The predictor provides programme links and the returned
            round, but its dataset year is not supplied. Verify the year on the full historical data
            page.
          </li>
          <li>
            Check multiple comparable years and the published seat matrix. A historical interval is
            not a guarantee, and the tool does not assign safe, realistic or ambitious labels.
          </li>
          <li>
            Arrange eligible choices by your genuine preferences, rather than copying the predictor
            display order. Confirm eligibility and complete choice filling on the official JoSAA
            portal.
          </li>
        </ol>
      </ReferenceItem>
      <ReferenceItem title="What the predictor cannot tell you">
        <p>
          Historical cutoffs are a strong signal but not a forecast. The predictor cannot model this
          year&apos;s applicant pool, sudden branch-popularity shifts (e.g. AI/ML across the
          system), seat-matrix changes mid-cycle, or your personal eligibility nuances (domicile
          documentation, EWS recency, PwD certification). For the full walkthrough of the
          assumptions and limits, see the <AppLink href="/methodology">methodology page</AppLink>;
          for what the actual JoSAA algorithm does, the{' '}
          <AppLink href="/guides/josaa-counselling-rounds">counselling rounds guide</AppLink> covers
          the mechanics.
        </p>
      </ReferenceItem>
      <ReferenceItem title="Related reading">
        <ul>
          <li>
            <AppLink href="/guides/jee-main-college-predictor">
              JEE college &amp; branch predictor: how it works
            </AppLink>{' '}
            — the long version of what this page does.
          </li>
          <li>
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              Opening and closing ranks explained
            </AppLink>{' '}
            — the numbers behind every row of the predictor output.
          </li>
          <li>
            <AppLink href="/guides/josaa-seat-matrix">JoSAA seat matrix explained</AppLink> — what
            the category and quota columns mean.
          </li>
        </ul>
      </ReferenceItem>
      <FaqList faqs={faqs} />
    </ReferencePanel>
  );
}
