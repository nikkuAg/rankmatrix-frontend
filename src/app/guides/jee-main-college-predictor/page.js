import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides/jee-main-college-predictor';
const TITLE = 'JEE college & branch predictor: how it works';
const DESCRIPTION =
  'What a JEE college and branch predictor actually does under the hood, which inputs matter (JEE Main or JEE Advanced rank, category, home state), what it cannot tell you, and how to read its results without being misled.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'How accurate is a JEE college & branch predictor?',
    answer:
      'A predictor is only as accurate as the historical data and the model used to project it forward. A good predictor uses multiple past years of official JoSAA opening and closing ranks and applies a delta to account for year-over-year cutoff movement. It cannot guarantee an outcome — actual cutoffs can move by several hundred ranks from one year to the next based on exam difficulty, seat-matrix changes, and how other candidates fill their preferences. Treat it as a ranked shortlist of likely colleges and branches to plan around, not a guarantee.',
  },
  {
    question: 'What inputs do I need to use the RankMatrix JEE college & branch predictor?',
    answer:
      'Your JEE Main rank, your category (General, EWS, OBC-NCL, SC, ST, with PwD sub-category if applicable), your home state, and optionally your JEE Advanced rank if you qualified. If you want more options, you can also set how wide a cutoff delta to include and how many results to show. That is the complete input set.',
  },
  {
    question: 'Do I need to enter my phone number or email?',
    answer:
      'No. RankMatrix never asks for your phone number, email, name, or any identifying information to run a prediction. You type your rank, you get a prediction, nothing is sent anywhere you have to worry about.',
  },
  {
    question: 'Why does the predictor show colleges where the closing rank is above mine?',
    answer:
      'The tool deliberately spreads results above and below your rank by a configurable "delta" percentage. Showing some colleges where last year you would have been a few ranks short is useful because next-year cutoffs may be slightly looser, or because less-popular branches at those colleges may still be in reach. The results are your shortlist of "safe", "realistic", and "ambitious" options, not a pass/fail list.',
  },
  {
    question: 'Should I fill my JoSAA preference list in the same order the predictor shows?',
    answer:
      'Not blindly. The predictor orders by rank proximity, not by your preferences. Your actual JoSAA choice list should be ordered by what you most want to attend, top to bottom — because JoSAA will always try to give you your #1 before your #2. Use the predictor to assemble a shortlist, then manually reorder that shortlist by personal preference.',
  },
  {
    question: 'Can a JEE college & branch predictor replace JoSAA counselling?',
    answer:
      'No. The predictor is a planning aid. Actual admission only happens through the official JoSAA portal — you still need to register, fill the choice list, participate in rounds, and respond to allocations within the JoSAA windows. No third-party tool can grant you a seat.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JEE college & branch predictor',
    'JEE college and branch predictor',
    'JEE college predictor',
    'JEE branch predictor',
    'JoSAA college predictor',
    'how JEE college predictor works',
    'JEE Main college predictor',
    'JEE Advanced college predictor',
    'best JEE college predictor',
    'free JEE predictor no signup',
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

export default function JeeMainCollegePredictorGuide() {
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
        lastUpdated="April 2026"
        readingTimeMinutes={6}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'JEE college & branch predictor', path: PAGE_URL },
        ]}
      >
        <h2>What a JEE college &amp; branch predictor is</h2>
        <p>
          A JEE college and branch predictor is a tool that answers a single question:{' '}
          <em>
            given my JEE Main or JEE Advanced rank, my category, and my home state, which JoSAA
            colleges and branches am I likely to be admitted to?
          </em>{' '}
          It does not grant seats. It does not run the JoSAA allocation. It just lines up what the
          JoSAA allocation <em>would</em> have looked like for your profile based on past trends, so
          you can plan your real preference list with the right expectations.
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
          be queried against your inputs in milliseconds. You can explore the raw underlying numbers
          in <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink>.
        </p>

        <h2>What happens when you hit Predict</h2>
        <p>The algorithm, explained without jargon:</p>
        <ol>
          <li>Take your JEE rank, category, and home state from the form.</li>
          <li>
            Pull the historical closing ranks for every institute-branch combination that your
            category and home state qualify for. For NITs, home-state candidates have a different
            cutoff column than out-of-state candidates; the tool respects that.
          </li>
          <li>
            Apply a <strong>delta</strong> window — a few percent above and below each closing rank
            — to account for year-to-year movement. This is what makes the result a shortlist rather
            than a binary match.
          </li>
          <li>
            Return the list sorted by how close each college-branch&apos;s historical closing rank
            is to yours, most comfortable first.
          </li>
        </ol>
        <p>
          The window is adjustable. A wider delta surfaces more ambitious options; a narrower delta
          keeps the list closer to what is historically safe for your rank.
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
            <strong>It cannot account for late seat-matrix changes.</strong> JoSAA publishes the
            final seat matrix for a given year only in May/June of that year. Predictors project
            from previous-year seat counts; if the matrix changes materially, the projection moves.
          </li>
        </ul>

        <h2>How to read the results</h2>
        <p>Group the predictor output into three buckets in your head as you scan it:</p>
        <ul>
          <li>
            <strong>Safe</strong> — colleges where your rank is comfortably inside last year&apos;s
            closing rank with room to spare. High chance even if cutoffs tighten this year.
          </li>
          <li>
            <strong>Realistic</strong> — colleges where your rank is within a small delta of last
            year&apos;s closing rank. Most likely outcome, assuming an average year.
          </li>
          <li>
            <strong>Ambitious</strong> — colleges where last year you would have been a few ranks
            short. Worth putting on the list in case cutoffs loosen this year or seats open up in
            later rounds.
          </li>
        </ul>
        <p>
          Your JoSAA choice list should include a spread of all three. A list composed entirely of
          ambitious choices risks leaving you unallocated; a list composed entirely of safe choices
          may lock you in below your actual ceiling.
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
            Know your home state for JoSAA purposes — this is the state of the board that issued
            your class-12 certificate.
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
