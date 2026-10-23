import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { OfficialRuleNotes } from '@/components/OfficialRuleNotes';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/jee-main-college-predictor';
const TITLE = 'JEE college & branch predictor: how it works';
const DESCRIPTION =
  'Learn which ranks and filters a JEE college predictor uses, how to interpret historical cutoffs and how to turn results into a college shortlist.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'How accurate is a JEE college & branch predictor?',
    answer:
      'A predictor depends on the stored data and its comparison rules. RankMatrix currently compares its configured latest-year rows using a delta search window; older years can be explored separately. It cannot guarantee an outcome — actual cutoffs can move by several hundred ranks from one year to the next based on exam difficulty, seat-matrix changes, and how other candidates fill their preferences. Treat it as a limited historical shortlist, not an admission probability or guarantee.',
  },
  {
    question: 'What inputs do I need to use the RankMatrix JEE college & branch predictor?',
    answer:
      'Your JEE Main rank, your category (General, EWS, OBC-NCL, SC, ST, with PwD sub-category if applicable), your home state, and optionally your JEE Advanced rank if you qualified. If you want more options, you can also set how wide a cutoff delta to include and how many results to show. That is the complete input set.',
  },
  {
    question: 'Do I need to enter my phone number or email?',
    answer:
      'No. RankMatrix never asks for your phone number, email, name, or any identifying information to run a prediction. Contact details are not required; the privacy policy explains analytics, advertising and technical request data.',
  },
  {
    question: 'Why does the predictor show colleges where the closing rank is above mine?',
    answer:
      'The configurable "delta" percentage controls a search window around your rank; selection tiers and the result limit determine which rows appear. Showing some colleges where last year you would have been a few ranks short is useful because next-year cutoffs may be slightly looser, or because less-popular branches at those colleges may still be in reach. The delta is a search window, not an admission-probability label or a pass/fail decision.',
  },
  {
    question: 'Should I fill my JoSAA preference list in the same order the predictor shows?',
    answer:
      'Not blindly. The backend selects rows using its search-window priorities and displays them by opening rank, not by your preferences. Your actual JoSAA choice list should be ordered by what you most want to attend, top to bottom — because JoSAA will always try to give you your #1 before your #2. Use the predictor to assemble a shortlist, then manually reorder that shortlist by personal preference.',
  },
  {
    question: 'Can a JEE college & branch predictor replace JoSAA counselling?',
    answer:
      'No. The predictor is a planning aid. Actual admission only happens through the official JoSAA portal — you still need to register, fill the choice list, participate in rounds, and respond to allocations within the JoSAA windows. No third-party tool can grant you a seat.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JEE College Predictor: Inputs, Accuracy & Limits',
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

export default function JeeMainCollegePredictorGuide() {
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
        readingTimeMinutes={6}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'JEE college & branch predictor', path: PAGE_URL },
        ]}
      >
        <OfficialRuleNotes />
        <h2>What a JEE college &amp; branch predictor is</h2>
        <p>
          A JEE college and branch predictor is a tool that answers a single question:{' '}
          <em>
            given my JEE Main or JEE Advanced rank, my category, and my home state, which JoSAA
            colleges and branches am I likely to be admitted to?
          </em>{' '}
          It does not grant seats. It does not run the JoSAA allocation. It provides historical
          comparisons rather than a simulation of the full allocation algorithm.
        </p>
        <p>
          If you want to try ours, <AppLink href="/predict">the RankMatrix predictor</AppLink> is on
          the site already — no signup, no spam, no phone number.
        </p>

        <h2>What data it uses</h2>
        <p>
          Every competent predictor is built on the same foundation: the{' '}
          <strong>official JoSAA opening and closing ranks</strong> published after each round of
          counselling. Those files are the ground truth. For every institute, every branch, every
          category, every seat pool, and every quota, JoSAA publishes the rank of the first
          candidate admitted (opening) and the last candidate admitted (closing) in each round.
        </p>
        <p>
          RankMatrix ingests multiple recent years of that data and stores it structured so it can
          be queried and compared with your inputs. You can explore the raw underlying numbers in{' '}
          <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink>.
        </p>

        <h2>What happens when you hit Predict</h2>
        <p>
          The current endpoint uses its configured latest JoSAA rank model and maximum stored round.
          It matches your category and seat pool, calculates a delta window around your input ranks
          and applies institute/quota selection tiers. IIT rows use the Advanced-rank window; other
          rows use the Main-rank window. The selected rows are displayed by opening rank.
        </p>
        <p>
          Delta controls the search window, not an admission probability. The endpoint does not
          average earlier years, guarantee document eligibility or automatically cross-check the
          current seat matrix. Read the{' '}
          <AppLink href="/methodology">implementation and limits</AppLink> before treating any
          shortlist as a counselling decision.
        </p>

        <h2>What a predictor cannot tell you</h2>
        <p>
          Every predictor, ours included, has hard limits. Knowing them keeps you from being
          surprised later.
        </p>
        <ul>
          <li>
            <strong>It cannot predict this year&apos;s cutoffs exactly.</strong> Cutoffs shift based
            on exam difficulty, the number of candidates, changes in the seat matrix (new branches
            added, seats redistributed), and JoSAA business rules that can change year to year. A
            shift of a few hundred ranks on a given branch is normal.
          </li>
          <li>
            <strong>It does not know your preference order.</strong> Only you know whether you would
            rather take CSE at a moderately ranked NIT or Electrical at a top-5 NIT. The tool gives
            you the shortlist; you order it.
          </li>
          <li>
            <strong>It does not know subjective factors</strong> — campus life, hostel conditions,
            location, placements by branch, personal fit. Talk to alumni and current students for
            those.
          </li>
          <li>
            <strong>It cannot account for late seat-matrix changes.</strong> The predictor uses
            stored rank rows and does not automatically cross-check each option against the current
            seat matrix. Verify the current official release and programme restrictions separately.
          </li>
        </ul>

        <h2>How to read the results</h2>
        <p>
          Compare each row with the same exam, rank list, category, quota and seat pool. Review the
          year and round in the rank explorer or institute detail pages: the predictor table does
          not currently show that provenance or offer clickable rows. A lower numerical rank is not
          a comparison across JEE Main and JEE Advanced.
        </p>
        <p>
          The tool does not assign safe, realistic or ambitious labels. Its result count and
          selection priorities can leave out relevant alternatives. Investigate the underlying
          historical data, check current eligibility and seat releases, then arrange choices by your
          own preferences. No historical cutoff guarantees an allocation.
        </p>

        <h2>The right mental model</h2>
        <p>
          The cleanest way to think about a college predictor is as a <em>market map</em>. It tells
          you where seats were priced (in rank terms) last year. It does not tell you where they
          will be priced next year — no one knows that until JoSAA publishes the results — but it
          narrows your attention to a reasonable range. Use that range, layer your personal
          preferences on top, and use the official JoSAA portal to do the actual application.
        </p>

        <h2>Before you run the predictor — a checklist</h2>
        <ul>
          <li>Have your JEE Main rank ready (category rank if you qualify for reservation).</li>
          <li>Know your category exactly as declared in your JEE Main application.</li>
          <li>
            Use the state-code eligibility rule in the official-source note above, including its
            exceptions.
          </li>
          <li>
            Have a rough idea of a few branches you are open to. &quot;I&apos;ll take anything&quot;
            leaves you optimising for nothing; &quot;only CSE at IIT Bombay&quot; leaves you
            optimising for luck.
          </li>
          <li>
            If you have a JEE Advanced rank, keep it handy too — it opens the IIT result set in
            addition to the JEE Main set.
          </li>
        </ul>

        <h2>Related tools on RankMatrix</h2>
        <ul>
          <li>
            <AppLink href="/predict">Predict your college</AppLink> — the predictor itself.
          </li>
          <li>
            <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink> — the raw historical data
            the predictor runs on.
          </li>
          <li>
            <AppLink href="/seat-matrix">Seat Matrix</AppLink> — how many seats each category
            actually has, per institute per branch.
          </li>
          <li>
            <AppLink href="/colleges">Participating Colleges</AppLink> — the full list of JoSAA
            institutes with NIRF rankings.
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
