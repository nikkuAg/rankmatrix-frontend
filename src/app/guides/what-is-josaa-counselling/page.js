import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides/what-is-josaa-counselling';
const TITLE = 'What is JoSAA counselling?';
const DESCRIPTION =
  'JoSAA runs the single admission process that allocates seats across all IITs, NITs, IIITs, and centrally funded technical institutes using JEE Main and JEE Advanced ranks. Here is exactly how it works.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'What is JoSAA in simple terms?',
    answer:
      'JoSAA, the Joint Seat Allocation Authority, is the body that runs the common counselling and seat allocation process for admission to the IITs, NITs, IIITs, and other centrally funded technical institutes. Instead of each institute running its own admission, JoSAA pools all the seats and allocates them using your JEE Main or JEE Advanced rank, your category, your home state, and the preferences you submit.',
  },
  {
    question: 'Who conducts JoSAA counselling?',
    answer:
      'JoSAA is an authority constituted by the Ministry of Education, Government of India. It uses JEE Advanced ranks for IIT seats and JEE Main ranks for NIT, IIIT, and GFTI seats. The counselling is conducted entirely online on the official josaa.nic.in portal.',
  },
  {
    question: 'Do I need to register separately for JoSAA after JEE Main or Advanced?',
    answer:
      'Yes. Your JEE Main or JEE Advanced result makes you eligible, but you still need to register on the JoSAA portal, fill a preference list of college-and-branch combinations, and participate in the rounds of seat allocation. Without JoSAA registration you cannot be allocated a seat even if your rank qualifies.',
  },
  {
    question: 'Can I get an IIT without JEE Advanced?',
    answer:
      'No. IIT seats are allocated strictly from the JEE Advanced rank list. JEE Main qualifies you for JoSAA allocation at NITs, IIITs, and GFTIs; to be eligible for IIT seats you must have also qualified JEE Advanced.',
  },
  {
    question: 'Is JoSAA the same as CSAB?',
    answer:
      'No. JoSAA runs the main counselling for IITs, NITs, IIITs, and GFTIs together. CSAB (Central Seat Allocation Board) handles the special rounds that fill any seats left vacant at NITs, IIITs, and GFTIs after JoSAA rounds conclude. IIT seats are not part of CSAB — they are handled exclusively by JoSAA.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'what is JoSAA',
    'JoSAA counselling',
    'JoSAA 2026',
    'JoSAA explained',
    'IIT NIT IIIT GFTI counselling',
    'JEE Main counselling process',
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

export default function WhatIsJoSAACounselling() {
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
        readingTimeMinutes={7}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'What is JoSAA', path: PAGE_URL },
        ]}
      >
        <h2>The short answer</h2>
        <p>
          JoSAA — the Joint Seat Allocation Authority — is the single body that allocates
          undergraduate engineering seats across India&apos;s centrally funded technical institutes.
          If you are aiming for an IIT, an NIT, an IIIT, or one of the GFTIs (Government Funded
          Technical Institutes) via JEE Main or JEE Advanced, JoSAA is the counselling process that
          decides which college and branch you actually get.
        </p>
        <p>
          One registration. One merged preference list. One algorithm. Multiple rounds. That is
          JoSAA in a line.
        </p>

        <h2>What JoSAA does (and what it does not)</h2>
        <p>JoSAA does three things:</p>
        <ul>
          <li>
            <strong>Pools seats</strong> from every participating institute into one allocation
            pipeline, so candidates do not have to apply to each institute separately.
          </li>
          <li>
            <strong>Runs the allocation</strong> using the standard rank-based seat allocation
            algorithm on your JEE Main or JEE Advanced rank, category, home state, gender pool, and
            the preference list you submit.
          </li>
          <li>
            <strong>Publishes the result</strong> — opening and closing ranks, seat matrix, and your
            round-by-round allocation — on the official portal.
          </li>
        </ul>
        <p>
          JoSAA does <strong>not</strong> conduct JEE Main or JEE Advanced; those exams are
          administered by NTA and the IITs respectively. It also does not handle state-level
          engineering counselling (WBJEE, MHT-CET, KCET, and so on) — those are run by the
          respective states. JoSAA is strictly for the centrally funded institutes listed below.
        </p>

        <h2>Institutes that participate</h2>
        <p>Participating institutes change slightly year to year, but the groups are stable:</p>
        <ul>
          <li>
            <strong>IITs</strong> — all 23 Indian Institutes of Technology. Seat allocation at IITs
            uses the JEE Advanced rank list only.
          </li>
          <li>
            <strong>NITs</strong> — all 31 National Institutes of Technology, spread across every
            state. NIT seats come from the JEE Main rank list.
          </li>
          <li>
            <strong>IIITs</strong> — both the centrally funded Indian Institutes of Information
            Technology and the newer IIITs set up in public-private partnership. JEE Main
            rank-based.
          </li>
          <li>
            <strong>GFTIs</strong> — other Government Funded Technical Institutes, including
            universities and institutes like SPA Delhi, IIEST Shibpur, and a set of central
            universities. Also JEE Main rank-based.
          </li>
        </ul>
        <p>
          For the canonical list of institutes participating in any given year, see{' '}
          <AppLink href="/colleges">Participating Colleges</AppLink> on RankMatrix.
        </p>

        <h2>How a seat actually gets allocated</h2>
        <p>
          Think of JoSAA as a merging exercise between two inputs: a merit list (who gets priority)
          and a preference list (what each candidate wants, in order).
        </p>
        <ol>
          <li>
            <strong>Register</strong> on the JoSAA portal after JEE Main / JEE Advanced results are
            declared.
          </li>
          <li>
            <strong>Fill choices.</strong> Candidates build an ordered list of (institute, branch)
            combinations from the seat matrix. You can order hundreds of choices. Order matters:
            your #1 will be tried before your #2.
          </li>
          <li>
            <strong>Mock allocations.</strong> JoSAA publishes one or two mock rounds so you can see
            what the algorithm would allocate given the current preferences across all candidates,
            and adjust your choice list before the real rounds begin.
          </li>
          <li>
            <strong>Rounds of allocation.</strong> In each round, the algorithm assigns every
            candidate the best seat on their list that they qualify for, given their category, home
            state, seat pool, and available vacancies. Typical JoSAA counselling runs five to six
            rounds.
          </li>
          <li>
            <strong>Accept, freeze, float, or slide.</strong> Each time you are allocated a seat,
            you choose what to do with it. <em>Freeze</em> locks it in; <em>float</em> and{' '}
            <em>slide</em> let you keep participating in later rounds in the hope of moving up your
            preference list.
          </li>
          <li>
            <strong>Report and pay fees.</strong> Inside the window specified by JoSAA, you confirm
            acceptance by paying the seat acceptance fee and, in the final round, physically or
            digitally reporting to the allocated institute.
          </li>
        </ol>
        <p>
          A round-by-round walk-through is in the{' '}
          <AppLink href="/guides/josaa-counselling-rounds">JoSAA counselling rounds guide</AppLink>.
        </p>

        <h2>How your JEE rank is used</h2>
        <p>JoSAA does not re-rank anyone. It uses two existing rank lists:</p>
        <ul>
          <li>
            <strong>JEE Advanced rank list</strong> — for IIT seats. Produced by the IIT that
            conducts JEE Advanced that year.
          </li>
          <li>
            <strong>JEE Main rank list</strong> — for NITs, IIITs, and GFTIs. Produced by NTA based
            on the JEE Main sessions and normalisation.
          </li>
        </ul>
        <p>
          For each round of allocation, the algorithm walks candidates in ascending order of rank
          (lower rank = higher priority), checks their preference list, and hands them the best
          available seat consistent with their category and quota. That is why the closing rank at a
          given institute-branch tends to slide a bit from round to round as candidates accept,
          reject, or move: some seats free up, and the next-in-line candidate gets them. See the{' '}
          <AppLink href="/guides/josaa-opening-and-closing-ranks">
            opening and closing ranks guide
          </AppLink>{' '}
          for how to read those trends.
        </p>

        <h2>Who is eligible for JoSAA</h2>
        <p>
          Eligibility rules come from the institutes themselves; JoSAA applies them. The essentials,
          which do not usually change year to year:
        </p>
        <ul>
          <li>
            You must have a valid <strong>JEE Main</strong> rank to be considered for NIT / IIIT /
            GFTI seats, and a valid <strong>JEE Advanced</strong> rank on top of that to be
            considered for IIT seats.
          </li>
          <li>
            You must meet the age and class-12 performance requirements set by the respective
            institute group. IITs and NITs publish specific 12<sup>th</sup>-board cutoff criteria
            each year.
          </li>
          <li>
            Reservation benefits (OBC-NCL, SC, ST, EWS, PwD) apply as claimed in your JEE Main /
            Advanced application; documentation must hold up at reporting.
          </li>
          <li>
            Home-state allocation for NITs uses the state listed on your class-12 certificate. If
            you moved states during school, the board that issued your certificate decides your home
            state for JoSAA purposes.
          </li>
        </ul>

        <h2>The tools you will actually use during JoSAA</h2>
        <p>
          Knowing how the process works is one half; the other half is choosing well. The pieces of
          data that change decisions in practice are:
        </p>
        <ul>
          <li>
            <strong>Past opening and closing ranks</strong> per institute-branch-category-round —
            available in <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink>.
          </li>
          <li>
            <strong>Seat matrix</strong> to see how many seats your category actually has at a given
            institute — <AppLink href="/seat-matrix">Seat Matrix</AppLink>.
          </li>
          <li>
            <strong>Rank-to-college prediction</strong> before you finalise the preference order —{' '}
            <AppLink href="/predict">JEE College &amp; Branch Predictor</AppLink>.
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
