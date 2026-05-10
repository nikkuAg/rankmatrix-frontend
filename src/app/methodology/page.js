import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { AppLink } from '@/components/AppLink';
import { GuideLayout } from '@/components/GuideLayout';
import { articleJsonLd, breadcrumbJsonLd } from '@/utils/jsonLd';

const PAGE_URL = '/methodology';
const TITLE = 'How RankMatrix predicts JoSAA cutoffs';
const DESCRIPTION =
  'A plain-English walkthrough of how the RankMatrix predictor turns historical JoSAA cutoffs into a personalised college and branch list — including the math, the assumptions, and the failure modes you should know about.';
const PUBLISHED = '2026-05-10';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  keywords: [
    'JoSAA prediction methodology',
    'JEE college predictor methodology',
    'how cutoff prediction works',
    'JoSAA opening closing rank prediction',
    'rank to college projection',
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
    title: `${TITLE} | RankMatrix`,
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
  breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Methodology', path: PAGE_URL },
  ]),
];

export default function Methodology() {
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
        readingTimeMinutes={8}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Methodology', path: PAGE_URL },
        ]}
      >
        <h2>Why this page exists</h2>
        <p>
          A predictor that says &ldquo;you will get IIT Bombay CSE&rdquo; without showing its work
          is just confidence wrapped in a UI. RankMatrix tries to be the opposite of that: a
          predictor that tells you exactly what data it is using, what assumption it is making, and
          where its answer is least trustworthy. This page is the long version of that contract.
        </p>

        <h2>The data the predictor stands on</h2>
        <p>
          Every projection on RankMatrix derives from three official JoSAA datasets, refreshed each
          counselling cycle:
        </p>
        <ul>
          <li>
            <strong>Historical opening and closing ranks</strong> — for each (institute, branch,
            category, gender pool, quota, round) tuple, JoSAA publishes the rank of the first and
            last candidate to whom that seat was offered. RankMatrix ingests these for the most
            recent counselling years.
          </li>
          <li>
            <strong>Seat matrix</strong> — for the current cycle, JoSAA publishes how many seats
            each institute has per branch, broken down by category and quota (HS / OS / AI / GN /
            OBC-NCL / SC / ST / EWS, with PwD and gender-neutral / female-supernumerary sub-pools).
          </li>
          <li>
            <strong>Participating institutes</strong> — the canonical list of IITs, NITs, IIITs, and
            GFTIs running through JoSAA in the current cycle.
          </li>
        </ul>
        <p>
          You can browse the underlying data directly on{' '}
          <AppLink href="/ranks">Opening &amp; Closing Ranks</AppLink>,{' '}
          <AppLink href="/seat-matrix">Seat Matrix</AppLink>, and{' '}
          <AppLink href="/colleges">Participating Colleges</AppLink>.
        </p>

        <h2>How the predictor turns your rank into a list</h2>
        <p>
          You give the predictor a small set of inputs: your rank (JEE Main or JEE Advanced
          depending on which institutes you are targeting), category, gender pool, quota (home state
          vs other state for NITs), and any branch or institute filters you want to apply.
        </p>
        <p>The predictor then does five things, in order:</p>
        <ol>
          <li>
            <strong>Loads the relevant cutoff slice.</strong> For your category and gender pool, it
            pulls every (institute, branch, round) row from the historical cutoff dataset that
            matches your eligibility.
          </li>
          <li>
            <strong>Compares your rank against each closing rank.</strong> The closing rank is the
            rank of the last candidate who got that seat in the round under consideration; if your
            rank is at or better than the closing rank, that seat was historically reachable for
            someone in your slice.
          </li>
          <li>
            <strong>Buckets each seat by reachability.</strong> Every (institute, branch) pair ends
            up in one of three buckets relative to your rank — comfortably reachable, on the
            boundary, or out of reach. The boundary bucket is where most of your real decisions
            live, and that is where the predictor focuses the UI.
          </li>
          <li>
            <strong>Cross-checks the current seat matrix.</strong> Some institute-branch pairs from
            past cycles may have changed seat counts or no longer exist; the predictor drops options
            that have zero seats in the current matrix.
          </li>
          <li>
            <strong>Ranks the result.</strong> The default ordering is by closing rank, so the most
            competitive (institute, branch) you are likely to reach surfaces first. You can override
            the ordering and filter by institute, branch family, or location.
          </li>
        </ol>

        <h2>Which round&apos;s closing rank counts</h2>
        <p>
          JoSAA runs five to six rounds. The closing rank at a given (institute, branch, category)
          slides round to round as candidates accept, freeze, float, or slide their seats. Three
          conventions you will see across predictors:
        </p>
        <ul>
          <li>
            <strong>Final-round closing rank</strong> — the most permissive number. This is the rank
            of the last candidate who got the seat after every round of churn. Predictors using this
            make pages look more optimistic; in practice, very few people actually wait for the last
            round to lock in a seat.
          </li>
          <li>
            <strong>First-round closing rank</strong> — the most conservative. This is what would
            have been allocated if everyone froze on day one.
          </li>
          <li>
            <strong>A specific round</strong> — for example, round 4. This is what RankMatrix uses
            as the default. Round 4 historically reflects roughly where most candidates have either
            committed or moved out, and it tracks much closer to the rank distribution that actually
            matters when you are deciding to lock or float.
          </li>
        </ul>
        <p>
          You can switch the round the predictor uses for its threshold from the predictor inputs.
          For a deeper read on what these numbers mean, see the{' '}
          <AppLink href="/guides/josaa-opening-and-closing-ranks">
            opening and closing ranks guide
          </AppLink>
          .
        </p>

        <h2>What the predictor is not modelling</h2>
        <p>
          A historical-cutoff projection is a useful starting point, but it is structurally
          incapable of capturing things that move year to year. The predictor does not know:
        </p>
        <ul>
          <li>
            <strong>This year&apos;s applicant pool.</strong> If a particular branch becomes
            disproportionately popular in a given year — say, AI/ML across the system — its closing
            ranks will tighten beyond what last year suggests.
          </li>
          <li>
            <strong>New branches or new institutes.</strong> First-time offerings have no history to
            extrapolate from. The predictor will mark those as &ldquo;no historical data&rdquo;
            rather than guess.
          </li>
          <li>
            <strong>Mid-cycle seat-matrix changes.</strong> Seat counts can shift between rounds
            (supernumerary additions, withdrawals). The predictor uses the matrix snapshot it has
            ingested.
          </li>
          <li>
            <strong>Personal-eligibility nuances.</strong> Domicile rules for NIT home-state quotas,
            PwD certification, EWS recency — the predictor uses the category you tell it you are
            claiming and assumes the documentation is in order.
          </li>
        </ul>

        <h2>How to read predictor output without overcommitting</h2>
        <ul>
          <li>
            <strong>Treat boundary-bucket seats as a discussion list, not a forecast.</strong>{' '}
            Anything within roughly five to ten percent of your rank on either side of last
            year&apos;s closing rank is genuinely on the bubble.
          </li>
          <li>
            <strong>Cross-check trends across rounds.</strong> A seat where the closing rank has
            been steadily tightening for three years is more likely to keep tightening than a seat
            with a one-off bad year.
          </li>
          <li>
            <strong>Use the seat matrix.</strong> A branch with one seat per category at an
            institute is statistically much more volatile than a branch with twenty seats.
            Volatility matters.
          </li>
          <li>
            <strong>Verify on the official portal before locking.</strong> RankMatrix exists to help
            you build a sensible preference list; the actual choice locking, document verification,
            and seat acceptance must happen on{' '}
            <MuiLink href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer">
              josaa.nic.in
            </MuiLink>
            .
          </li>
        </ul>

        <h2>How the data is refreshed</h2>
        <p>
          When JoSAA publishes a new cutoff release or seat-matrix update, the underlying datasets
          are re-ingested and the relevant pages on RankMatrix are revalidated within a day. The
          &ldquo;last updated&rdquo; line on each detail page reflects the most recent regeneration.
          If you spot a discrepancy with the official source, the{' '}
          <AppLink href="/contact">contact page</AppLink> is the fastest way to flag it.
        </p>

        <h2>Disclaimers, briefly</h2>
        <p>
          RankMatrix is not affiliated with JoSAA, JEE, NTA, the IITs, NITs, IIITs, or GFTIs.
          Predictions are projections from public data, not guarantees of admission. See the{' '}
          <AppLink href="/terms">terms of use</AppLink> for the full version, and the{' '}
          <AppLink href="/privacy">privacy policy</AppLink> for what the site does and does not
          collect from you while you use it.
        </p>
      </GuideLayout>
    </>
  );
}
