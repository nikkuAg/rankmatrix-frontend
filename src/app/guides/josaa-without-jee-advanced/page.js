import React from 'react';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/utils/jsonLd';
import { buildMetadata } from '@/utils/metadata.mjs';

const PAGE_URL = '/guides/josaa-without-jee-advanced';
const SHORT_ANSWER =
  'Yes. Anyone with a JEE Main rank who meets the Class XII requirement can register for JoSAA and be allocated seats at NITs, IIEST, IIITs and other government-funded institutes; only IIT and IISc seats need a JEE Advanced qualification. Seats are decided by rank, not marks: OPEN seats use the Common Rank List (CRL) and reserved seats use your category rank.';
const TITLE = 'Can you take part in JoSAA without JEE Advanced?';
const DESCRIPTION =
  'Who can join JoSAA counselling with only a JEE Main rank, the Class XII marks requirement, which rank list decides each seat, and why you are still allocated only one seat.';
const PUBLISHED = '2026-11-17';
const RULES_URL = 'https://josaa.nic.in/information-bulletin/';

const FAQS = [
  {
    question: 'Can I sit in JoSAA counselling without JEE Advanced, with JEE Main only?',
    answer:
      'Yes. A rank in the relevant JEE Main paper, together with the Class XII requirement, makes you eligible for NIT, IIEST, IIIT and Other-GFTI programmes through JoSAA. You need to qualify JEE Advanced only for IIT and IISc programmes.',
  },
  {
    question: 'Which rank is considered in JoSAA counselling?',
    answer:
      'IIT and IISc seats use JEE Advanced ranks; NIT+ seats use JEE Main ranks. Within each, OPEN seats use the Common Rank List (CRL), and GEN-EWS, OBC-NCL, SC, ST and PwD seats use the respective category rank list.',
  },
  {
    question: 'Does JoSAA use marks or rank?',
    answer:
      'Rank. Seats are allocated by comparing your rank in the applicable rank list with other candidates who chose the same programme. Your Class XII marks matter only as an eligibility condition, not for ordering candidates.',
  },
  {
    question: 'What Class XII marks do I need for NITs and IIITs?',
    answer:
      'Under the 2026 rules you must have passed Class XII with at least five subjects and either scored at least 75% aggregate (65% for SC, ST and PwD candidates) or be in the category-wise top 20 percentile of your board. For NIT+ seats, your first Class XII attempt must have been in 2024, 2025 or 2026.',
  },
  {
    question: 'If I qualify both JEE Main and JEE Advanced, do I get two seats?',
    answer:
      'No. You fill one combined choice list covering IIT and NIT+ programmes, and JoSAA allocates at most one seat from it: the highest choice your ranks qualify for.',
  },
  {
    question: 'Is JoSAA registration paid?',
    answer:
      'Registration and choice filling on the JoSAA portal are free. Fees apply later, when you accept an allocated seat.',
  },
];

export const metadata = buildMetadata({
  path: PAGE_URL,
  title: 'JoSAA Without JEE Advanced: Eligibility & Rank Used',
  description:
    'Yes, you can join JoSAA with only a JEE Main rank. See who is eligible, the Class XII marks rule, which rank decides each seat, and why you get one seat.',
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

export default function JoSAAWithoutJeeAdvancedGuide() {
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
          { name: 'JoSAA without JEE Advanced', path: PAGE_URL },
        ]}
      >
        <h2>Who can take part in JoSAA</h2>
        <p>
          The 2026 business rules (rule 4) list five ways to be eligible. You need to meet at least
          one:
        </p>
        <ul>
          <li>Qualified JEE Advanced, for programmes at IITs and IISc.</li>
          <li>Qualified JEE Advanced, for preparatory courses at IITs.</li>
          <li>
            A rank in JEE Main Paper 1 (B.E./B.Tech.), for B.E./B.Tech. programmes at NITs, IIEST,
            IIITs and Other-GFTIs.
          </li>
          <li>A rank in JEE Main Paper 2A, for B.Arch. programmes at those institutes.</li>
          <li>A rank in JEE Main Paper 2B, for B.Planning programmes at those institutes.</li>
        </ul>
        <p>
          So a JEE Main rank alone is enough to register and compete for NIT+ seats. JEE Advanced is
          needed only for IIT and IISc programmes. Each route also needs the Class XII requirement
          below, and individual programmes can add their own conditions.
        </p>

        <h2>The Class XII requirement</h2>
        <p>
          For both IITs and NIT+ institutes, you must have passed Class XII (or equivalent) with at
          least five subjects and meet one of two conditions:
        </p>
        <ul>
          <li>At least 75% aggregate marks (65% for SC, ST and PwD candidates), or</li>
          <li>
            Be within the category-wise top 20 percentile of successful candidates of your board in
            that year.
          </li>
        </ul>
        <p>
          For NIT+ seats there is one more condition: you must have first appeared for Class XII in
          2024, 2025 or 2026. For IITs and IISc, Physics, Chemistry and Mathematics must be
          compulsory subjects.
        </p>

        <h2>Which rank decides your seat</h2>
        <p>
          IIT and IISc seats are allocated on JEE Advanced ranks; NIT+ seats on JEE Main ranks.
          Within each exam, the business rules (rule 16) use separate rank lists:
        </p>
        <ul>
          <li>
            <strong>OPEN seats:</strong> the Common Rank List (CRL), which includes candidates of
            every category.
          </li>
          <li>
            <strong>GEN-EWS, OBC-NCL, SC and ST seats:</strong> the rank list for that category.
          </li>
          <li>
            <strong>PwD seats:</strong> the CRL-PwD list for OPEN-PwD, and the matching category PwD
            list for the others.
          </li>
        </ul>
        <p>
          JoSAA does not use marks to order candidates. When you compare yourself with past cutoffs,
          use the same rank list: a category rank against an OBC-NCL closing rank, your CRL against
          an OPEN closing rank. The{' '}
          <AppLink href="/guides/josaa-opening-and-closing-ranks">
            opening and closing ranks guide
          </AppLink>{' '}
          explains how to read those rows.
        </p>

        <h2>One choice list, one seat</h2>
        <p>
          If you are eligible through more than one exam, you still fill a single list of choices
          and JoSAA allocates at most one seat from it (rule 38). You can mix IIT and NIT+
          programmes in one list, in your genuine order of preference. Registration and choice
          filling are free.
        </p>

        <h2>Official source</h2>
        <p>
          Summarised from the <a href={RULES_URL}>JoSAA 2026 business rules</a>: rules 4, 16, 37–38
          and Annexures 2(a) and 2(b). Rules can change between years; check the current business
          rules before you register. To shortlist NIT+ programmes for your JEE Main rank, use the{' '}
          <AppLink href="/predict">college predictor</AppLink>.
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
