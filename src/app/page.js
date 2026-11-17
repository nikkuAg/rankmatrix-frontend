import Link from 'next/link';
import { DeferredCalendar } from '@/components/DashboardSections/Calendar/DeferredCalendar';
import { FeatureBox, ToolLink } from '@/components/DashboardSections/FeatureBox';
import { Updates } from '@/components/DashboardSections/Updates';
import styles from '@/components/Home/Home.module.css';
import { HomeIntro } from '@/components/Home/HomeIntro';
import { HomeStart } from '@/components/Home/HomeStart';
import { Icon } from '@/components/Icon';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <h1>Which colleges can you get with your JEE rank?</h1>
          <p className={styles.description}>
            Enter your rank to see the IITs, NITs, IIITs and GFTIs where it fell within last year’s
            cutoffs. RankMatrix uses the published results of JoSAA, the joint counselling that
            fills seats at these institutes.
          </p>
        </div>
        <div className={styles.visual}>
          <div className={styles.backdrop} />
          <HomeStart />
        </div>
      </section>
      <section className={styles.paths} aria-labelledby="home-paths-title">
        <h2 id="home-paths-title">Start where you are</h2>
        <ul>
          {[
            [
              'I have a JEE Main rank',
              'See NITs, IIITs and GFTIs for your rank.',
              '/predict',
              'Path: JEE Main rank',
            ],
            [
              'I have a JEE Advanced rank',
              'Enter both ranks to see IITs as well.',
              '/predict',
              'Path: JEE Advanced rank',
            ],
            [
              'I don’t have a rank yet',
              'Look up last year’s cutoffs for any college or branch.',
              '/ranks',
              'Path: no rank yet',
            ],
            [
              'I’m a parent',
              'Read how JoSAA admission works, in plain words.',
              '/guides/what-is-josaa-counselling',
              'Path: parent',
            ],
          ].map(([title, description, href, label]) => (
            <li key={title}>
              <ToolLink href={href} label={label}>
                <strong>{title}</strong>
                <span>{description}</span>
              </ToolLink>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.workflow} aria-labelledby="home-steps-title">
        <h2 id="home-steps-title">How it works</h2>
        <ol>
          {[
            ['Enter your rank', 'Add your category and home state.'],
            ['See your colleges', 'Each with last year’s opening and closing rank.'],
            [
              'Save and order your list',
              'Keep the ones you like, in your own order of preference.',
            ],
          ].map(([title, description], index) => (
            <li key={title}>
              <span className={styles.step}>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.tools}>
        <div className={styles.sectionHead}>
          <h2>Look things up yourself</h2>
          <Link href="/methodology" prefetch={false}>
            How the predictor works
          </Link>
        </div>
        <FeatureBox />
        <div className={styles.readingStrip}>
          <h3>New to JoSAA? The guides explain it step by step.</h3>
          <Link href="/guides" prefetch={false}>
            Read the counselling guides
          </Link>
        </div>
      </section>
      <aside className={styles.contextNote}>
        <strong>JEE Main and JEE Advanced ranks are separate</strong>
        <p>
          IITs use your JEE Advanced rank. NITs, IIITs and GFTIs use your JEE Main rank. Past
          cutoffs are a guide, not a guarantee of admission.
        </p>
        <Link href="/guides/reading-cutoff-trends" prefetch={false}>
          Read the cutoff guide
        </Link>
      </aside>
      <div className={styles.resources}>
        <details data-accordion className={styles.desk}>
          <summary>
            <div>
              <h2>JoSAA updates, dates and official links</h2>
            </div>
            <Icon name="plus" className="disclosure-icon" />
          </summary>
          <div className={styles.news}>
            <Updates />
            <DeferredCalendar />
          </div>
        </details>
      </div>
      <HomeIntro />
    </>
  );
}
