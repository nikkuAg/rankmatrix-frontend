import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/guides/jee-main-vs-advanced-vs-josaa';
const TITLE = 'JEE Main vs JEE Advanced vs JoSAA';
const DESCRIPTION =
  'Three different things that get conflated constantly. Who conducts what, which ranks go where, and how they fit together to decide your IIT, NIT, IIIT, or GFTI admission.';
const PUBLISHED = '2026-04-23';

const FAQS = [
  {
    question: 'Is JEE Main and JoSAA the same thing?',
    answer:
      'No. JEE Main is an entrance exam conducted by the NTA. JoSAA is a counselling and seat allocation process that uses JEE Main ranks (plus JEE Advanced ranks for IITs) to allocate seats at centrally funded engineering institutes. You sit JEE Main to get a rank; you register with JoSAA to get a seat.',
  },
  {
    question: 'Do I have to clear JEE Advanced to get into an NIT?',
    answer:
      'No. NIT admission is based on your JEE Main rank, not JEE Advanced. JEE Advanced is only required for IIT seats. A JEE Main rank is sufficient for NITs, IIITs, and GFTIs through JoSAA.',
  },
  {
    question: 'If I qualify JEE Advanced but not JEE Main, can I still join JoSAA?',
    answer:
      'This situation is essentially impossible: JEE Advanced eligibility itself requires you to be among the top JEE Main scorers in the year you appear. If you cleared JEE Advanced you already have a JEE Main qualification. You will enter JoSAA with both ranks, and the system will consider you for IIT seats (JEE Advanced rank) and NIT/IIIT/GFTI seats (JEE Main rank) together.',
  },
  {
    question: 'Can I skip JoSAA and apply to an IIT directly?',
    answer:
      'No. There is no direct-apply route for IITs for Indian undergraduate admission. Every seat at every IIT is allocated through JoSAA. The IIT you may prefer cannot offer you a seat outside of JoSAA even if your JEE Advanced rank is very good.',
  },
  {
    question: 'Do state engineering colleges participate in JoSAA?',
    answer:
      'No. JoSAA covers only the centrally funded institutes — IITs, NITs, IIITs, and GFTIs. State engineering colleges are filled through state-level counselling (WBJEE, MHT-CET, KCET, TNEA, and similar) using separate rank lists and separate application portals.',
  },
  {
    question: 'Is NTA the same as JoSAA?',
    answer:
      "No. NTA (National Testing Agency) conducts JEE Main as an exam body. It has no role in seat allocation. JoSAA is a separate authority constituted to run counselling for centrally funded institutes, and it consumes NTA's JEE Main rank list as an input.",
  },
];

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JEE Main vs JEE Advanced',
    'JEE Main vs JoSAA',
    'JEE Advanced vs JoSAA',
    'JEE Main JEE Advanced difference',
    'JoSAA JEE Main',
    'JoSAA JEE Advanced',
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

export default function JeeMainVsAdvancedVsJoSAAGuide() {
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
          { name: 'JEE Main vs Advanced vs JoSAA', path: PAGE_URL },
        ]}
      >
        <h2>The one-paragraph summary</h2>
        <p>
          <strong>JEE Main</strong> is an exam. <strong>JEE Advanced</strong> is a different
          (harder) exam that only the top JEE Main scorers are eligible to sit.{' '}
          <strong>JoSAA</strong> is not an exam at all — it is the counselling process that takes
          the ranks from those two exams and allocates actual college seats. Each of the three is
          run by a different body, and they happen in order: JEE Main, then JEE Advanced, then JoSAA
          counselling.
        </p>

        <h2>Who runs what</h2>
        <table>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Run by</th>
              <th>Type</th>
              <th>Produces</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JEE Main</td>
              <td>National Testing Agency (NTA)</td>
              <td>Entrance exam (two sessions)</td>
              <td>JEE Main rank list (CRL + category ranks)</td>
            </tr>
            <tr>
              <td>JEE Advanced</td>
              <td>One of the IITs (rotating annually)</td>
              <td>Entrance exam (single attempt)</td>
              <td>JEE Advanced rank list (CRL + category ranks)</td>
            </tr>
            <tr>
              <td>JoSAA counselling</td>
              <td>Joint Seat Allocation Authority</td>
              <td>Seat allocation process</td>
              <td>Your allocated institute and branch</td>
            </tr>
          </tbody>
        </table>

        <h2>JEE Main, in one screen</h2>
        <ul>
          <li>
            Conducted by <strong>NTA</strong> twice a year (typically January and April sessions).
          </li>
          <li>Three-hour paper-based (computer-based) exam in Physics, Chemistry, Mathematics.</li>
          <li>
            The better of your two session scores is used to produce your final JEE Main percentile
            and rank.
          </li>
          <li>
            Your JEE Main rank is the input for:
            <ul>
              <li>JoSAA seat allocation at NITs, IIITs, and GFTIs.</li>
              <li>
                Eligibility for JEE Advanced — only the top JEE Main scorers qualify to sit JEE
                Advanced.
              </li>
              <li>
                State-level counselling in some states that use JEE Main as their entrance rank.
              </li>
            </ul>
          </li>
        </ul>

        <h2>JEE Advanced, in one screen</h2>
        <ul>
          <li>
            Conducted by the <strong>IIT system</strong>; one IIT rotates in as the organising
            institute each year.
          </li>
          <li>
            Two papers of three hours each, same subjects (Physics, Chemistry, Mathematics) but
            significantly harder.
          </li>
          <li>
            Only the top JEE Main qualifiers (the exact cutoff is published by JoSAA each year) are
            eligible to register.
          </li>
          <li>
            Your JEE Advanced rank is the <em>only</em> input JoSAA uses for IIT seat allocation.
            JEE Main rank is irrelevant for IITs once you have a JEE Advanced rank.
          </li>
        </ul>

        <h2>JoSAA, in one screen</h2>
        <ul>
          <li>A counselling authority, not an exam body. No exam, no paper, no test.</li>
          <li>
            Runs a single allocation process that uses the JEE Main rank list for NIT / IIIT / GFTI
            seats and the JEE Advanced rank list for IIT seats.
          </li>
          <li>
            You register on josaa.nic.in, submit an ordered preference list, and participate in five
            to six rounds of seat allocation.
          </li>
          <li>
            The full process is covered in the{' '}
            <AppLink href="/guides/what-is-josaa-counselling">JoSAA counselling guide</AppLink> and
            the <AppLink href="/guides/josaa-counselling-rounds">rounds walkthrough</AppLink>.
          </li>
        </ul>

        <h2>How the three fit together — a timeline</h2>
        <ol>
          <li>
            <strong>JEE Main session 1 (typically January).</strong> Sit the exam. Get a percentile.
            Session result is published a few weeks later.
          </li>
          <li>
            <strong>JEE Main session 2 (typically April).</strong> Sit again to improve your score
            if you want. Final JEE Main rank is published based on the better of the two sessions.
          </li>
          <li>
            <strong>JEE Advanced registration.</strong> If your JEE Main rank is within the
            eligibility cutoff, you can register for JEE Advanced.
          </li>
          <li>
            <strong>JEE Advanced exam.</strong> Typically held in late May or early June. Rank list
            published shortly after.
          </li>
          <li>
            <strong>JoSAA counselling opens.</strong> Usually in June, after both JEE Main and JEE
            Advanced results are out. You register, fill choices, participate in rounds.
          </li>
          <li>
            <strong>Seat allocated, reporting, and classes begin.</strong>
          </li>
        </ol>
        <p>
          Exact dates move year to year. The ordering never does. For current-year dates, always
          refer to the official JEE Main (NTA), JEE Advanced, and JoSAA notifications.
        </p>

        <h2>Which rank goes where — a quick lookup</h2>
        <table>
          <thead>
            <tr>
              <th>I want admission to&hellip;</th>
              <th>Rank used</th>
              <th>How</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IITs</td>
              <td>JEE Advanced rank</td>
              <td>JoSAA counselling (mandatory)</td>
            </tr>
            <tr>
              <td>NITs</td>
              <td>JEE Main rank</td>
              <td>JoSAA counselling, then CSAB special rounds for vacant seats</td>
            </tr>
            <tr>
              <td>IIITs</td>
              <td>JEE Main rank</td>
              <td>JoSAA counselling, then CSAB special rounds for vacant seats</td>
            </tr>
            <tr>
              <td>GFTIs</td>
              <td>JEE Main rank</td>
              <td>JoSAA counselling, then CSAB special rounds for vacant seats</td>
            </tr>
            <tr>
              <td>State engineering colleges</td>
              <td>State entrance rank or JEE Main rank (varies by state)</td>
              <td>State-level counselling — not JoSAA</td>
            </tr>
          </tbody>
        </table>

        <h2>Common points of confusion</h2>
        <ul>
          <li>
            <strong>&quot;JEE Main is my rank list.&quot;</strong> You have <em>two</em> rank
            numbers in JEE Main: a Common Rank List (CRL) position and a category rank (for OBC-NCL,
            EWS, SC, ST, PwD candidates). JoSAA uses both — your CRL for Open-category seats, your
            category rank for reserved seats — and gives you whichever gets you the better
            allocation.
          </li>
          <li>
            <strong>&quot;I cleared JEE Advanced so I can skip JEE Main.&quot;</strong> You cannot
            have a JEE Advanced rank without first having a qualifying JEE Main rank. If you have a
            JEE Advanced rank, you automatically have JEE Main eligibility for JoSAA as well.
          </li>
          <li>
            <strong>&quot;JoSAA will rank me based on my preference.&quot;</strong> No. Ranks come
            from JEE Main / Advanced. Your preference list only changes <em>which</em>
            institute-branch you are considered for in each round; it does not change your rank.
          </li>
        </ul>

        <h2>Related guides</h2>
        <ul>
          <li>
            <AppLink href="/guides/what-is-josaa-counselling">What is JoSAA counselling</AppLink>
          </li>
          <li>
            <AppLink href="/guides/josaa-counselling-rounds">JoSAA counselling rounds</AppLink>
          </li>
          <li>
            <AppLink href="/guides/josaa-opening-and-closing-ranks">
              Opening and closing ranks explained
            </AppLink>
          </li>
          <li>
            <AppLink href="/guides/jee-main-college-predictor">
              How the college predictor works
            </AppLink>
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
