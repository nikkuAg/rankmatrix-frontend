import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/josaa-home-state-quota';
const SHORT_ANSWER =
  'In JoSAA, Home State (HS) seats at an NIT, IIEST Shibpur or PEC Chandigarh are only for candidates whose state code of eligibility is the state where the institute is located, and Other State (OS) seats are for candidates from every other state and union territory. Your state code is the state where you first appeared for Class XII, not where you live; IITs, IIITs and most other institutes have only All India (AI) seats.';
const TITLE = 'Home State, Other State and All India quota in JoSAA';
const DESCRIPTION =
  'What HS, OS and AI quota mean in JoSAA, how your state code of eligibility is decided, which institutes split seats by state, and the special rules for NIT Goa, NIT Srinagar and states without an NIT.';
const PUBLISHED = '2026-11-17';
const RULES_URL = 'https://josaa.nic.in/information-bulletin/';

const FAQS = [
  {
    question: 'What does HS, OS and AI quota mean in JoSAA?',
    answer:
      'HS is Home State quota, OS is Other State quota and AI is All India quota. HS seats are only for candidates whose state code of eligibility matches the institute’s state; OS seats are for everyone else; AI seats have no state condition.',
  },
  {
    question: 'How is my state code of eligibility decided?',
    answer:
      'It is the code of the state from where you first appeared for the Class XII (or equivalent) examination. It does not depend on your native place or where you live. If you took an improvement exam from a different state, the state of your first attempt still counts.',
  },
  {
    question: 'Which institutes have Home State and Other State quotas?',
    answer:
      'Under the 2026 business rules, NITs, IIEST Shibpur and PEC Chandigarh split seats into HS and OS. Assam University Silchar, BIT and Puducherry Technological University split seats into HS and AI. Every other participating institute, including the IITs and IIITs, has only AI seats.',
  },
  {
    question: 'Is it always a 50:50 split between Home State and Other State seats?',
    answer:
      'The 2026 rules state a 50% Home State share only for NIT Goa and NIT Srinagar. For other institutes, read the exact HS and OS seat counts for each programme in the seat matrix rather than assuming a split.',
  },
  {
    question: 'I studied Class XII abroad. Which state am I from?',
    answer:
      'For Indian nationals who passed Class XII from an institution abroad, the state code is decided by the permanent address in India given in the passport. OCI/PIO candidates who passed Class XII abroad are eligible for OS and AI seats but not HS seats.',
  },
  {
    question: 'Can I compete for both HS and OS seats?',
    answer:
      'No. Each NIT treats you as either a Home State candidate (if its state matches your state code) or an Other State candidate. You compete for HS seats at the NIT in your home state and for OS seats at NITs in other states.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Home State vs Other State Quota (HS, OS, AI)',
  description:
    'HS, OS and AI quota in JoSAA explained: how your state code is set, which institutes split seats by state, and the NIT Goa and NIT Srinagar rules.',
  type: 'article',
  publishedTime: PUBLISHED,
  modifiedTime: PUBLISHED,
});

const jsonLd = [
  articleJsonLd({
    path: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  }),
  faqJsonLd(FAQS),
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: TITLE, path: PAGE_URL },
  ]),
];

export default function JoSAAHomeStateQuotaGuide() {
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
        shortAnswer={SHORT_ANSWER}
        title={TITLE}
        description={DESCRIPTION}
        lastUpdated="17 November 2026"
        readingTimeMinutes={5}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: 'HS, OS and AI quota', path: PAGE_URL },
        ]}
      >
        <h2>Your state code of eligibility</h2>
        <p>
          For NIT+ seats, JoSAA gives every candidate a state code of eligibility. It is the code of
          the state from where you first appeared for the Class XII (or equivalent) examination. It
          does not depend on your native place or where you live: the business rules give the
          example of a candidate who sits Class XII in Delhi while living in Noida, whose state code
          is Delhi, not Uttar Pradesh.
        </p>
        <ul>
          <li>
            <strong>Improvement exam in another state:</strong> the state of your first Class XII
            attempt still counts.
          </li>
          <li>
            <strong>Class XII passed abroad (Indian nationals):</strong> the state is taken from the
            permanent address in India in your passport.
          </li>
          <li>
            <strong>OCI/PIO candidates who passed Class XII abroad:</strong> eligible for Other
            State and All India seats, but not Home State seats.
          </li>
        </ul>

        <h2>Which institutes split seats by state</h2>
        <p>The 2026 business rules (rule 11) set out three arrangements:</p>
        <ul>
          <li>
            <strong>Home State and Other State:</strong> NITs, IIEST Shibpur and PEC Chandigarh.
          </li>
          <li>
            <strong>Home State and All India:</strong> Assam University Silchar, BIT, and Puducherry
            Technological University.
          </li>
          <li>
            <strong>All India only:</strong> every other participating institute, including the
            IITs, IISc and the IIITs.
          </li>
        </ul>
        <p>
          Ghani Khan Choudhary Institute of Engineering and Technology, Malda is a special case: its
          Home State quota covers candidates from Arunachal Pradesh, Assam, Nagaland, Manipur,
          Meghalaya, Mizoram, Sikkim and Tripura.
        </p>

        <h2>NIT Goa, NIT Srinagar and states without an NIT</h2>
        <p>
          NIT Goa and NIT Srinagar have 50% Home State seats, shared in fixed proportions. At NIT
          Goa, 80% of the Home State seats are for candidates from Goa and 20% for Daman & Diu,
          Dadra & Nagar Haveli and Lakshadweep. At NIT Srinagar, 90% are for candidates from Jammu &
          Kashmir and 10% for Ladakh.
        </p>
        <p>
          Candidates from a state or union territory without its own NIT get Home State quota at:
        </p>
        <ul>
          <li>Andaman and Nicobar Islands: NIT Puducherry</li>
          <li>Lakshadweep, Daman and Diu, Dadra and Nagar Haveli: NIT Goa</li>
          <li>Chandigarh: NIT Delhi</li>
          <li>Ladakh: NIT Srinagar</li>
        </ul>

        <h2>How to use quotas when you compare cutoffs</h2>
        <p>
          HS and OS cutoffs for the same programme are separate allocation rows and can be very
          different. Compare your rank only with the quota you actually belong to at that institute:
          HS at the NIT in your home state, OS at NITs elsewhere, AI everywhere else. In the{' '}
          <AppLink href="/ranks">opening and closing ranks explorer</AppLink> and the{' '}
          <AppLink href="/seat-matrix">seat matrix</AppLink>, filter by quota before reading a
          number. The seat matrix gives the exact HS and OS seat count for each programme; do not
          assume a fixed split.
        </p>

        <h2>Official source</h2>
        <p>
          Summarised from the <a href={RULES_URL}>JoSAA 2026 business rules</a>, rules 8 and 11–13.
          Rules can change between years; check the current business rules and the{' '}
          <a href="https://josaa.nic.in/seat-matrix/">official seat matrix</a> before filling
          choices. Related guides:{' '}
          <AppLink href="/guides/josaa-seat-matrix">reading the seat matrix</AppLink> and{' '}
          <AppLink href="/guides/josaa-reservation-categories">reservation categories</AppLink>.
        </p>

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
