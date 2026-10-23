import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/josaa-choice-filling-strategy';
const TITLE = 'JoSAA choice filling strategy — how to order your preference list';
const DESCRIPTION =
  'Build a JoSAA preference list using your interests and historical cutoffs. Learn how to order choices and avoid common counselling mistakes.';
const PUBLISHED = '2026-05-19';

const FAQS = [
  {
    question: 'How many choices should I fill in JoSAA?',
    answer:
      'There is no universal ideal length for a preference list. Include eligible programmes you would genuinely accept, in your own preference order. Historical cutoffs help you explore options but cannot ensure an allocation.',
  },
  {
    question: 'Does the order of choices actually matter?',
    answer:
      'Yes. JoSAA is a single-offer algorithm: in every round, you are offered the highest-listed seat you qualify for, and nothing lower is considered. Putting a safer option above an ambitious one means you lock the safer option and never see the ambitious one. Order is the single most consequential decision in JoSAA.',
  },
  {
    question: 'What is the difference between freeze, float, and slide?',
    answer:
      'After a seat is allocated, freeze accepts it as final (you stop participating in later rounds). Float keeps you in the running for any higher preference in your list. Slide keeps you in the running for any higher branch at the same institute. These are upgrade choices, not risk or admission-probability labels. Availability and seat retention depend on the current rules and completion of reporting.',
  },
  {
    question: 'Should I fill choices outside my comfort zone?',
    answer:
      'Yes — but only if you would actually accept those seats. Putting a long-shot at the top costs nothing if you would happily take it; putting a college-branch you would refuse anywhere on the list is a real risk, because JoSAA cannot tell whether you mean it.',
  },
  {
    question: 'Can I edit my choices after locking?',
    answer:
      'The 2026 rules allow an unlock request before the choice-filling deadline. After that deadline, choices cannot be edited. Use the official portal and current rules for the exact procedure.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Choice Filling: How to Order Your Choices',
  description: DESCRIPTION,
  type: 'article',
  publishedTime: PUBLISHED,
  modifiedTime: '2026-10-23',
});

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: '2026-10-23',
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(obj) }}
        />
      ))}
      <GuideLayout
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated="23 October 2026"
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

        <h2>Build one list in your genuine preference order</h2>
        <p>
          Use historical cutoffs to explore programmes you would accept. RankMatrix returns a
          limited shortlist, not a comprehensive list or stretch/target/floor labels. A cutoff
          margin is not an admission probability.
        </p>
        <ol>
          <li>Compare the same exam, rank list, year, round, category, quota and seat pool.</li>
          <li>Check programme restrictions and the current official seat matrix.</li>
          <li>Include only eligible programmes you would attend.</li>
          <li>
            Order the entire list by your preferences; do not concatenate probability buckets or
            copy predictor result order.
          </li>
        </ol>

        <h2>Freeze, float, slide — the round-by-round decision</h2>
        <p>
          When accepting a seat, choose an option available under the current rules. Float and slide
          are not available in every situation or round. The options mean:
        </p>
        <ul>
          <li>
            <strong>Freeze.</strong> Accept this seat as final. You stop participating in further
            rounds. Choose this when you do not want further upgrades; complete the required
            reporting and verification.
          </li>
          <li>
            <strong>Float.</strong> Hold the seat as a fallback and keep participating; the
            algorithm continues looking for anything higher on your preference list in subsequent
            rounds. Seat retention still requires completed acceptance, verification and reporting.
          </li>
          <li>
            <strong>Slide.</strong> A middle ground available only when you have been allocated a
            seat at an institute; you hold the institute but keep trying for a better branch at the
            same institute. Other institutes higher up your list are no longer considered.
          </li>
        </ul>
        <p>
          Choose freeze, float or slide by whether you want further upgrades and by the options
          available in that round. Read the current reporting requirements before confirming;
          historical cutoffs do not make a seat safe from eligibility or document issues.
        </p>

        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Sorting by likelihood instead of preference.</strong> The single most common
            mistake. Putting a less-preferred programme first can prevent an allocation to a
            programme you prefer but placed lower, if you qualify for both.
          </li>
          <li>
            <strong>Filling too few choices.</strong> A short list is fine if all of them are seats
            you would accept. Historical cutoffs cannot make a choice safe. A short list with only
            ambitious entries can result in no allocation at all, forcing you into CSAB later or out
            of central counselling entirely.
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
            round you decide freeze / float / slide on the offer, and complete the required
            acceptance steps. Do not treat inaction as float.
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
            <AppLink href="/predict">JEE college &amp; branch predictor</AppLink> — generates a
            historical cutoff shortlist for your inputs.
          </li>
          <li>
            <AppLink href="/guides/josaa-counselling-rounds">JoSAA counselling rounds</AppLink> —
            mechanics of every round including freeze/float/slide timing.
          </li>
          <li>
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              Opening and closing ranks explained
            </AppLink>{' '}
            — how to compare the stored rank rows.
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
