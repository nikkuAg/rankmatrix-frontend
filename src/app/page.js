import Link from 'next/link';
import { DeferredCalendar } from '@/components/DashboardSections/Calendar/DeferredCalendar';
import { FeatureBox, ToolLink } from '@/components/DashboardSections/FeatureBox';
import { Updates } from '@/components/DashboardSections/Updates';
import styles from '@/components/Home/Home.module.css';
import { HomeIntro } from '@/components/Home/HomeIntro';
import { Icon } from '@/components/Icon';

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
            <ToolLink href="/predict" label="Predict Your College" className="button primary">
              Build my choice list <Icon name="arrowUpRight" />
            </ToolLink>
            <Link href="/ranks" prefetch={false} className={styles.secondary}>
              Explore cutoffs <Icon name="arrowRight" />
            </Link>
          </div>
          <p className={styles.note}>
            <span>JEE Main</span>
            <Icon name="plus" />
            <span>JEE Advanced</span>
            <small>Each rank in its own context.</small>
          </p>
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
              <span>Programme / institute</span>
            </div>
            {[
              ['Computer Science and Engineering', 'IIT Roorkee · JEE Advanced'],
              ['Electrical Engineering', 'NIT Tiruchirappalli · JEE Main'],
              ['Mechanical Engineering', 'IIT Guwahati · JEE Advanced'],
            ].map(([title, description], index) => (
              <div className={styles.boardRow} key={title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </div>
                <Icon name="arrowUpRight" />
              </div>
            ))}
            <Link href="/predict" prefetch={false} className={styles.boardLink}>
              Make your own choice list <Icon name="arrowRight" />
            </Link>
          </div>
          <p className={styles.boardNote}>
            Illustrative preferences, not matches for the example ranks.
          </p>
        </div>
      </section>
      <section className={styles.workflow} aria-label="Prepare your choices">
        {[
          ['Discover', 'Find programmes with your rank.', '/predict'],
          ['Compare', 'Keep the evidence side by side.', '/predict'],
          ['Arrange', 'Drag choices into your order.', '/predict'],
        ].map(([title, description, href], index) => (
          <Link href={href} prefetch={false} key={title}>
            <span className={styles.step}>0{index + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <Icon name="arrowUpRight" />
          </Link>
        ))}
      </section>
      <section className={styles.tools}>
        <div className={styles.sectionHead}>
          <div>
            <p className="eyebrow">Look a little closer</p>
            <h2>Good decisions have context.</h2>
          </div>
          <Link href="/methodology" prefetch={false}>
            How we use data <Icon name="arrowUpRight" />
          </Link>
        </div>
        <FeatureBox />
        <div className={styles.readingStrip}>
          <div>
            <p className="eyebrow">Before you choose</p>
            <h3>A little understanding goes a long way.</h3>
          </div>
          <Link href="/guides" prefetch={false}>
            Read the counselling guides <Icon name="arrowRight" />
          </Link>
        </div>
      </section>
      <aside className={styles.contextNote}>
        <strong>Two exams. Two rank scales.</strong>
        <p>
          Main and Advanced cutoff values stay separate. Historical allocations offer context, not
          an admission guarantee.
        </p>
        <Link href="/guides/reading-cutoff-trends" prefetch={false}>
          Read the cutoff guide <Icon name="arrowUpRight" />
        </Link>
      </aside>
      <div className={styles.resources}>
        <details data-accordion className={styles.desk}>
          <summary>
            <div>
              <span className="eyebrow">Counselling desk</span>
              <h2>Updates, dates &amp; official links</h2>
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
