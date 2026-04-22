import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides/josaa-counselling-rounds';
const TITLE = 'JoSAA counselling rounds: how they work';
const DESCRIPTION =
  'Choice filling, mock allocations, the five to six regular rounds, freeze / float / slide, and the withdrawal and reporting cycle — the full JoSAA round-by-round process laid out in order.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'How many rounds does JoSAA run?',
    answer:
      'JoSAA typically runs five to six rounds of seat allocation each year. One or two mock rounds happen before the real allocation starts, to give candidates a preview of what their preference list would yield against the current aggregate choices of all candidates. The real rounds begin after choice filling closes.',
  },
  {
    question: 'What does freeze, float, and slide mean in JoSAA?',
    answer:
      'These are the three options you choose after being allocated a seat in a round. Freeze accepts the seat as final — you are out of the pool and guaranteed that seat. Float keeps you in the pool to consider any higher preference across any institute. Slide keeps you in the pool but restricts upgrades to higher-priority branches at the same institute you were allocated. Freeze ends your participation; float and slide continue it.',
  },
  {
    question: 'Can I change my choice list once the rounds begin?',
    answer:
      'Generally no. The choice list is locked after choice filling closes. What you can change between rounds is your freeze / float / slide response to the seat you were just allocated, your decision to withdraw, and whether you pay the acceptance fee to stay in the process.',
  },
  {
    question: 'What happens if I miss the seat acceptance window?',
    answer:
      'If you do not pay the seat acceptance fee and report within the window JoSAA specifies for your round, your allocation is cancelled and the seat is released back into the pool for the next round. You also lose your participation for subsequent rounds unless JoSAA explicitly allows re-entry, which is uncommon.',
  },
  {
    question: 'What is CSAB and when does it start?',
    answer:
      'CSAB (Central Seat Allocation Board) is a separate counselling body that runs special rounds after JoSAA concludes, to fill seats left vacant at NITs, IIITs, and GFTIs. CSAB is only for those three institute groups — IIT seats are not part of CSAB. It starts after the final JoSAA round and gives candidates who were not allocated through JoSAA (or who want to upgrade) another chance.',
  },
  {
    question: 'If my seat gets cancelled in JoSAA, can I still apply through CSAB?',
    answer:
      'Generally yes, as long as you did not have an active seat accepted in the final JoSAA round. CSAB sets its own registration window each year and has its own eligibility rules; refer to the official CSAB notification for the current year before counting on it.',
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA rounds',
    'JoSAA freeze float slide',
    'JoSAA mock allocation',
    'JoSAA choice filling',
    'JoSAA reporting',
    'CSAB special rounds',
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

export default function JoSAACounsellingRoundsGuide() {
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
          { name: 'Counselling rounds', path: PAGE_URL },
        ]}
      >
        <h2>The process in one diagram-free sentence</h2>
        <p>
          You register, you fill an ordered preference list, JoSAA publishes mock allocations you
          can react to, then JoSAA runs five to six real rounds of allocation — in each of which you
          are offered a seat, you decide whether to freeze / float / slide / withdraw, and the next
          round adjusts for everyone&apos;s choices.
        </p>

        <h2>Stage 1 — Registration</h2>
        <p>
          The JoSAA portal opens for registration after both JEE Main and JEE Advanced results are
          out, typically in June. Registration requires:
        </p>
        <ul>
          <li>Your JEE Main application number and password.</li>
          <li>JEE Advanced application credentials (if you qualified).</li>
          <li>Scanned category / PwD certificates, if applicable.</li>
          <li>A valid email and mobile — used only for JoSAA login and notifications.</li>
        </ul>
        <p>
          Once you register, your rank, category, and state are pulled in automatically from the
          exam records.
        </p>

        <h2>Stage 2 — Choice filling</h2>
        <p>
          This is where most of your thinking happens. You build an ordered list of institute-branch
          combinations you are open to. The key rules:
        </p>
        <ul>
          <li>
            Order matters. JoSAA will always try to give you your #1 before your #2. If your #3 is
            achievable and your #1 and #2 are not in your rank range, you get your #3.
          </li>
          <li>
            You can add as many choices as you want. Large lists do not reduce your chance at a top
            choice; they only add fallbacks.
          </li>
          <li>
            Choices you do not list cannot be allocated to you. If you only list IITs and your JEE
            Advanced rank does not qualify anywhere, you will not be allocated anything — even if
            your JEE Main rank would have comfortably got you an NIT or IIIT you simply did not
            list.
          </li>
          <li>
            You can save and edit your choice list freely through the choice-filling window. When
            the window closes, your list is locked and becomes input to the allocation algorithm.
          </li>
        </ul>

        <h2>Stage 3 — Mock allocations</h2>
        <p>
          JoSAA publishes one or two mock allocations before the real rounds begin. A mock shows
          what the algorithm would have allocated you given the current aggregate preferences of all
          registered candidates. Two things to do with a mock:
        </p>
        <ul>
          <li>
            If your mock allocation is what you expected and you are happy with it, leave your
            choice list as is.
          </li>
          <li>
            If the mock allocates something you do not want (or nothing at all), reorder or extend
            your choice list before the next window closes.
          </li>
        </ul>
        <p>
          Mocks are informational — they do not lock anything in. But they are the single best
          calibration exercise between your planning (via a{' '}
          <AppLink href="/predict">predictor</AppLink>) and the actual JoSAA result.
        </p>

        <h2>Stage 4 — The rounds themselves</h2>
        <p>
          After choice filling and mocks, JoSAA runs five to six rounds of real allocation. Typical
          cycle per round:
        </p>
        <ol>
          <li>
            <strong>Allocation published.</strong> You see your allocated institute and branch for
            that round, or &quot;not allocated&quot; if your preferences could not be matched.
          </li>
          <li>
            <strong>Seat acceptance window.</strong> Pay the seat acceptance fee within a specific
            window — typically two to three days. Without this step your allocation is cancelled.
          </li>
          <li>
            <strong>Response window.</strong> You choose one of: <strong>freeze</strong>,{' '}
            <strong>float</strong>, <strong>slide</strong>, or <strong>withdraw</strong>.
          </li>
          <li>
            <strong>Document upload / verification.</strong> Upload scanned documents for
            verification; institute verifiers may raise queries you need to respond to.
          </li>
          <li>
            <strong>Next round runs.</strong> The algorithm reallocates based on freezes, floats,
            slides, and withdrawals; publishes the new allocation; the cycle repeats.
          </li>
        </ol>

        <h2>Freeze, float, slide — decision tree</h2>
        <h3>Freeze</h3>
        <p>
          You are satisfied with the allocated seat. You take yourself out of the pool. Your
          allocation is final — you will not be considered for anything else in later rounds. Go
          this path when the allocated seat is at or near the top of your list.
        </p>
        <h3>Float</h3>
        <p>
          You accept the seat temporarily but want to be considered for <em>any</em> higher
          preference, including at other institutes. If a higher-priority seat opens up in a later
          round, you will be moved to it and lose the current one. If nothing better opens up, you
          keep the current allocation. Go this path if you are comfortable with the current seat but
          would prefer a higher-ranked option if it becomes reachable.
        </p>
        <h3>Slide</h3>
        <p>
          Narrower than float. You stay in the pool but only for higher-priority branches at the
          same institute you were just allocated. Go this path when you are happy with the institute
          but would prefer a different branch there.
        </p>
        <h3>Withdraw</h3>
        <p>
          You reject the allocation entirely and exit JoSAA. Usually done only if you are certain
          you will not attend any of your listed choices and want to pursue state counselling, CSAB,
          or a different path. Withdrawing is largely irreversible within the same JoSAA year.
        </p>

        <h2>Reporting and fees</h2>
        <p>
          After the final round, whoever has a frozen seat (or an accepted float/slide allocation)
          moves to institute-level reporting. Typical steps:
        </p>
        <ul>
          <li>Pay the balance fees per the institute&apos;s schedule.</li>
          <li>Produce physical original documents for verification.</li>
          <li>Complete registration at the institute as a full undergraduate student.</li>
        </ul>
        <p>
          Missing institute-level reporting can cancel the seat even after JoSAA has allocated and
          you have paid the acceptance fee. Watch deadlines closely.
        </p>

        <h2>Withdrawal, cancellation, and CSAB</h2>
        <p>After the final JoSAA round, two things can still happen:</p>
        <ul>
          <li>
            <strong>Withdrawal window.</strong> Some years JoSAA opens a final withdrawal window for
            candidates who want to exit and try CSAB. Check the current-year JoSAA notice.
          </li>
          <li>
            <strong>CSAB special rounds.</strong> CSAB runs its own rounds to fill vacant NIT / IIIT
            / GFTI seats after JoSAA concludes. If you were not allocated through JoSAA, or if you
            withdrew from an unattractive allocation, you can register for CSAB and try again. IIT
            seats are not part of CSAB.
          </li>
        </ul>

        <h2>A small checklist for each round</h2>
        <ul>
          <li>Log in on the first day the round result is out. Do not wait until the last day.</li>
          <li>Confirm the seat-acceptance fee is paid before the window closes.</li>
          <li>Choose freeze / float / slide thoughtfully. There is no &quot;safe&quot; default.</li>
          <li>Upload any requested documents without delay. Verifier queries can eat a day.</li>
          <li>Keep your login credentials in a secure note, not a screenshot.</li>
        </ul>

        <h2>Related reading</h2>
        <ul>
          <li>
            <AppLink href="/guides/what-is-josaa-counselling">What is JoSAA counselling</AppLink> —
            the full process in broad strokes.
          </li>
          <li>
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              Opening and closing ranks
            </AppLink>{' '}
            — why cutoffs drift across rounds.
          </li>
          <li>
            <AppLink href="/guides/josaa-seat-matrix">Seat matrix</AppLink> — what every category,
            quota, and seat pool means.
          </li>
          <li>
            <AppLink href="/predict">College predictor</AppLink> — the planning tool you will want
            before choice filling.
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
