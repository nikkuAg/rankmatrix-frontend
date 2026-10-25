import Link from 'next/link';
import { FaqList, ReferenceItem, ReferencePanel } from '@/components/ReferencePanel';

export function ToolAnswers({ title, description, faqs }) {
  return (
    <ReferencePanel title={title} description={description} label="Reading the evidence">
      <ReferenceItem title="Match your context before comparing">
        <p>
          Start with your exam and rank list, then match the year, round, category, quota and seat
          pool. <Link href="/predict">Build a college shortlist</Link>, compare{' '}
          <Link href="/colleges">institutes</Link> and <Link href="/branches">programmes</Link>, or
          read the <Link href="/methodology">data methodology</Link>.
        </p>
      </ReferenceItem>
      <ReferenceItem title="Sources and current rules">
        <p>
          Source: <a href="https://josaa.nic.in/or-cr/">JoSAA opening and closing ranks</a>. Check
          the <a href="https://josaa.nic.in">official JoSAA website</a> for current rules, schedules
          and seat publications. Historical cutoffs do not guarantee admission.
        </p>
      </ReferenceItem>
      <FaqList faqs={faqs} />
    </ReferencePanel>
  );
}
