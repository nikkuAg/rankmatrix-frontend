import Link from 'next/link';
import { DeferredCalendar } from '@/components/DashboardSections/Calendar/DeferredCalendar';
import { FeatureBox } from '@/components/DashboardSections/FeatureBox';
import { Updates } from '@/components/DashboardSections/Updates';
import styles from '@/components/Home/Home.module.css';
import { HomeIntro } from '@/components/Home/HomeIntro';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className="eyebrow">From JEE to JoSAA</p>
          <h1>
            Your rank.
            <br />
            Your <em>next move.</em>
          </h1>
          <p className={styles.description}>
            Explore colleges, compare the evidence, and put your JoSAA choices in the order that
            feels right for you.
          </p>
          <div className={styles.actions}>
            <Link href="/predict" prefetch={false} className="button primary">
              Build my choice list <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/ranks" prefetch={false} className={styles.secondary}>
              Explore cutoffs <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className={styles.note}>Free to use. No signup. Your decision, backed by data.</p>
        </div>
        <div className={styles.visual} aria-label="Illustration of a choice planning workspace">
          <div className={styles.backdrop} />
          <div className={styles.rankCard}>
            <div>
              <span>JEE Main · example CRL</span>
              <strong>18,000</strong>
            </div>
            <div>
              <span>JEE Advanced · example CRL</span>
              <strong>7,200</strong>
            </div>
          </div>
          <div className={styles.board}>
            <div className={styles.boardHeading}>
              <div>
                <span>Your preference list</span>
                <h2>Make the order yours.</h2>
              </div>
              <span className={styles.count}>
                100<small>choices</small>
              </span>
            </div>
            <div className={styles.columnHead}>
              <span>Order</span>
              <span>Your planning process</span>
            </div>
            {[
              ['Find your options', 'Explore programmes across both exams'],
              ['Compare the evidence', 'Match category, quota, year and round'],
              ['Choose your order', 'Put your genuine preferences first'],
            ].map(([title, description], index) => (
              <div className={styles.boardRow} key={title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </div>
                <span aria-hidden="true">↗</span>
              </div>
            ))}
            <p className={styles.boardNote}>
              An illustrative workspace. Historical data is not an admission guarantee.
            </p>
          </div>
        </div>
      </section>
      <div className={styles.strip}>
        <span>JEE Main &amp; JEE Advanced</span>
        <span>Separate rank lists. Clear context.</span>
        <Link href="/methodology" prefetch={false}>
          Know the data ↗
        </Link>
      </div>
      <section className={styles.tools}>
        <div className={styles.sectionHead}>
          <div>
            <p className="eyebrow">The research desk</p>
            <h2>See the whole picture.</h2>
          </div>
          <p>Free JEE Main &amp; Advanced College Predictor and JoSAA Cutoffs</p>
        </div>
        <FeatureBox />
      </section>
      <section className={styles.news}>
        <Updates />
        <DeferredCalendar />
      </section>
      <HomeIntro />
    </>
  );
}
