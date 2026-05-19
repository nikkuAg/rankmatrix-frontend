import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides/josaa-choice-filling-strategy';
const TITLE = 'JoSAA choice filling strategy — how to order your preference list';
const DESCRIPTION =
  'A practical, opinionated guide to filling your JoSAA choice list — the order that matters, the freeze/float/slide decision, common mistakes to avoid, and how to use the predictor output without overcommitting.';
const PUBLISHED = '2026-05-19';

const FAQS = [
  {
    question: 'How many choices should I fill in JoSAA?',
    answer:
      'There is no minimum number, but a complete preference list typically has 30 to 100 entries. The right number depends on your rank: a top-1000 rank can stay short (10-30 ambitious choices), while a rank past 50,000 usually benefits from a longer list (60-150 entries) covering multiple branches across NITs, IIITs, and GFTIs to make sure something gets allocated.',
  },
  {
    question: 'Does the order of choices actually matter?',
    answer:
      'Yes. JoSAA is a single-offer algorithm: in every round, you are offered the highest-listed seat you qualify for, and nothing lower is considered. Putting a safer option above an ambitious one means you lock the safer option and never see the ambitious one. Order is the single most consequential decision in JoSAA.',
  },
  {
    question: 'What is the difference between freeze, float, and slide?',
    answer:
      'After a seat is allocated, freeze accepts it as final (you stop participating in later rounds). Float keeps you in the running for any higher preference in your list. Slide keeps you in the running for any higher branch at the same institute. The most defensive choice is freeze; the most ambitious is float; slide is a middle ground.',
  },
  {
    question: 'Should I fill choices outside my comfort zone?',
    answer:
      'Yes — but only if you would actually accept those seats. Putting a long-shot at the top costs nothing if you would happily take it; putting a college-branch you would refuse anywhere on the list is a real risk, because JoSAA cannot tell whether you mean it.',
  },
  {
    question: 'Can I edit my choices after locking?',
    answer:
      'No. Once you lock your choices in the JoSAA portal, the list is final for the entire counselling cycle. You can edit freely until the locking deadline; after that, the only adjustments come from float, slide, freeze, and withdrawal during reporting.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA choice filling',
    'JoSAA preference order',
    'JoSAA strategy',
    'JoSAA freeze float slide',
    'JoSAA choice locking',
    'JoSAA choice list strategy',
    'JEE counselling strategy',
  ],
  openGraph: {
    type: 'article',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
  }),
  faqJsonLd(FAQS),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: TITLE, path: PAGE_URL },
  ]),
];

export default function JoSAAChoiceFillingStrategy() {
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <GuideLayout
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated="May 2026"
        readingTimeMinutes={9}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'Choice filling strategy', path: PAGE_URL },
        ]}
      >
        <h2>The one rule that decides everything</h2>
        <p>
          JoSAA&apos;s allocation algorithm is brutally simple: in every round, for every candidate,
          walk down their preference list and stop at the first seat the candidate qualifies for.
          Offer that seat. Done.
        </p>
        <p>
          That means a single rule governs the whole exercise:{' '}
          <strong>order your choices by genuine preference, not by likelihood.</strong> The
          algorithm reads top-down, and anything below your top qualifying seat is never even
          considered.
        </p>

        <h2>The three buckets to populate</h2>
        <p>
          A good preference list is built from three buckets, layered top to bottom. The layering is
          the strategy; the bucket assignment comes from the{' '}
          <AppLink href="/predict">predictor</AppLink> output.
        </p>

        <h3>1. Stretch picks (top of the list)</h3>
        <p>
          (Institute, branch) combinations where your rank is past the closing rank by a small
          margin — say within 5-10%. These are seats you would happily take if a late-round opening
          surfaces them. Putting them at the top costs you nothing if you do not get them and
          rewards you handsomely if you do.
        </p>
        <p>
          <strong>Limit:</strong> 5-15 entries. More than that becomes noise: any stretch past ~30%
          of the closing rank realistically never opens.
        </p>

        <h3>2. Target picks (the boundary, middle of the list)</h3>
        <p>
          The actual decision space. Combinations where your rank is within striking distance of the
          closing rank — slightly below it or just above. This is where you put the institute-branch
          combinations you genuinely want, in genuine order of preference. Round-over-round churn
          will decide which of these you end up with.
        </p>
        <p>
          <strong>Limit:</strong> 15-50 entries depending on rank. Higher ranks have fewer boundary
          options; lower ranks have more.
        </p>

        <h3>3. Floor anchors (bottom of the list)</h3>
        <p>
          Seats you are comfortably inside the closing rank for — by 10% or more. These are
          guarantees in case nothing higher works. Always include enough of them that you definitely
          get <em>something</em> you can live with.
        </p>
        <p>
          <strong>Limit:</strong> 5-20 entries. Make sure at least the bottom 3-5 are entries you
          can genuinely accept if everything else falls through.
        </p>

        <h2>How to actually build the list</h2>
        <ol>
          <li>
            <strong>Run the predictor.</strong> Get the comprehensive list of seats segmented by
            stretch / boundary / comfortable for your category, gender pool, and quota.
          </li>
          <li>
            <strong>Filter ruthlessly.</strong> Drop entries you would never accept — wrong city,
            wrong programme type, branch you cannot stomach. JoSAA does not know what you would
            refuse; you have to leave it off the list.
          </li>
          <li>
            <strong>Order each bucket by genuine preference.</strong> Within stretch, list the seat
            you would most love at the top. Within target, list seats in the order you would
            actually want them. Within floor, list the least-bad acceptable seat at the very bottom.
          </li>
          <li>
            <strong>Concatenate: stretch → target → floor.</strong> The whole list, top to bottom,
            should read as a single sequence in descending preference. The algorithm will respect
            that order.
          </li>
          <li>
            <strong>Sanity-check the bottom.</strong> The very last entry should be an option you
            would still report to. If it is not, drop it; otherwise you may end up locked into
            something you cannot accept.
          </li>
        </ol>

        <h2>Freeze, float, slide — the round-by-round decision</h2>
        <p>
          After every round in which you are allocated a seat, JoSAA asks you what to do with it.
          The three options are:
        </p>
        <ul>
          <li>
            <strong>Freeze.</strong> Accept this seat as final. You stop participating in further
            rounds. Choose this when the allocation is good enough and you do not want to risk
            something worse.
          </li>
          <li>
            <strong>Float.</strong> Hold the seat as a fallback and keep participating; the
            algorithm continues looking for anything higher on your preference list in subsequent
            rounds. If nothing higher opens, you keep this seat at the end.
          </li>
          <li>
            <strong>Slide.</strong> A middle ground available only when you have been allocated a
            seat at an institute; you hold the institute but keep trying for a better branch at the
            same institute. Other institutes higher up your list are no longer considered.
          </li>
        </ul>
        <p>
          A useful heuristic: <strong>freeze if you got a target-bucket pick or a stretch</strong>;{' '}
          <strong>float if you got a floor anchor</strong> and you have target picks above it;
          <strong>slide</strong> is rare in practice but useful if your institute is your priority
          and branch is negotiable.
        </p>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Sorting by likelihood instead of preference.</strong> The single most common
            mistake. Putting your safest pick at the top guarantees you get that pick and nothing
            higher will be looked at.
          </li>
          <li>
            <strong>Filling too few choices.</strong> A short list is fine if all of them are seats
            you would accept and at least the last few are safely inside your cutoff range. A short
            list with only ambitious entries can result in no allocation at all, forcing you into
            CSAB later or out of central counselling entirely.
          </li>
          <li>
            <strong>Filling too many marginal choices.</strong> Padding the list with seats you
            would refuse anyway is worse than useless — it dilutes ordering thinking and risks
            locking you into something unsuitable.
          </li>
          <li>
            <strong>Listing branches you cannot tolerate &ldquo;just in case&rdquo;.</strong> If you
            list it, JoSAA assumes you mean it. Do not include a branch you would actually withdraw
            from; the cost of a withdrawal is real (fees, time, a place lost to a candidate who
            would have stayed).
          </li>
          <li>
            <strong>Freezing too early.</strong> If you have target picks above your current
            allocation, float gives them a chance to come through. Freeze only when the current
            allocation is genuinely as good as you want.
          </li>
          <li>
            <strong>Missing the lock deadline.</strong> An unlocked choice list at the deadline is
            treated as locked at whatever state it is in. Lock explicitly once the list is
            finalised.
          </li>
        </ul>

        <h2>What to do after locking</h2>
        <p>Once you have locked your choices, JoSAA takes over. You will see:</p>
        <ol>
          <li>
            <strong>Mock allocation(s)</strong> — one or two non-binding previews of what your list
            would currently allocate, based on everyone&apos;s preferences as they stand. Use them
            to re-order before locking if needed.
          </li>
          <li>
            <strong>Round 1 allocation</strong> — the first real allocation. From here on, each
            round you decide freeze / float / slide on the offer, or skip (which is treated as
            float).
          </li>
          <li>
            <strong>Reporting and payment</strong> — within the window JoSAA specifies, you complete
            document verification and pay the seat-acceptance fee. Missing the window forfeits the
            seat.
          </li>
        </ol>
        <p>
          For the detailed round-by-round walk-through, see the{' '}
          <AppLink href="/guides/josaa-counselling-rounds">JoSAA counselling rounds guide</AppLink>.
          For how to read predictor output without overcommitting, see the{' '}
          <AppLink href="/methodology">methodology page</AppLink>.
        </p>

        <h2>Related guides and tools</h2>
        <ul>
          <li>
            <AppLink href="/predict">JEE college &amp; branch predictor</AppLink> — generates the
            stretch / target / floor segmentation for your rank.
          </li>
          <li>
            <AppLink href="/guides/josaa-counselling-rounds">JoSAA counselling rounds</AppLink> —
            mechanics of every round including freeze/float/slide timing.
          </li>
          <li>
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              Opening and closing ranks explained
            </AppLink>{' '}
            — what the numbers behind your bucketing actually mean.
          </li>
          <li>
            <AppLink href="/guides/josaa-reservation-categories">
              JoSAA reservation categories explained
            </AppLink>{' '}
            — your category determines which pools your rank competes in.
          </li>
        </ul>

        <h2>Common questions</h2>
        {FAQS.map((faq) => (
          <React.Fragment key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </React.Fragment>
        ))}
      </GuideLayout>
    </>
  );
}
