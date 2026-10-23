import Link from 'next/link';
import { GuideLayout } from '@/components/GuideLayout';

export function ToolAnswers({ title, description, faqs }) {
  return (
    <GuideLayout title={title} description={description} headingLevel="h2" breadcrumbs={[]}>
      <p>
        Start with your exam and rank list, then match the year, round, category, quota and seat
        pool. <Link href="/predict">Build a college shortlist</Link>, compare{' '}
        <Link href="/colleges">institutes</Link> and <Link href="/branches">programmes</Link>, or
        read the <Link href="/methodology">data methodology</Link>.
      </p>
      <h2>Common questions</h2>
      {faqs.map(({ question, answer }) => (
        <section key={question}>
          <h3>{question}</h3>
          <p>{answer}</p>
        </section>
      ))}
      <p>
        Source: <a href="https://josaa.nic.in/or-cr/">JoSAA opening and closing ranks</a>. Check the{' '}
        <a href="https://josaa.nic.in">official JoSAA website</a> for current rules, schedules and
        seat publications. Historical cutoffs do not guarantee admission.
      </p>
    </GuideLayout>
  );
}
