import { DirectoryNavigation } from '@/components/DirectoryNavigation';
import { GuideLayout } from '@/components/GuideLayout';
import { instituteType } from '@/utils/instituteIdentity.mjs';
import { fetchSeoSlugs } from '@/utils/seoApi';

// Server-rendered links keep the catalogue discoverable before interactive tables load.
export async function SeoDirectory({ kind, faqs }) {
  const data = await fetchSeoSlugs();
  const entries = (data?.[kind] || []).filter((entry) => entry.slug);
  const colleges = kind === 'institutes';
  const prefix = colleges ? '/colleges' : '/branches';
  const groups = colleges
    ? ['IIT', 'IISc', 'NIT', 'IIIT', 'GFTI']
        .map((type) => ({
          name: type,
          entries: entries.filter((entry) => instituteType(entry) === type),
        }))
        .concat({
          name: 'Other participating institutes',
          entries: entries.filter(
            (entry) => !['IIT', 'IISc', 'NIT', 'IIIT', 'GFTI'].includes(instituteType(entry)),
          ),
        })
    : [{ name: 'Programmes and cutoff comparisons', entries }];

  return (
    <GuideLayout
      title={
        colleges
          ? 'Browse JoSAA colleges and branch cutoffs'
          : 'Browse engineering programmes by branch'
      }
      headingLevel="h2"
      description={
        colleges
          ? 'Open an institute to compare its programmes, published opening and closing ranks, and seat data.'
          : 'Open a programme to compare participating institutes, then follow a college link for round-wise cutoffs.'
      }
      breadcrumbs={[]}
    >
      <DirectoryNavigation>
        {groups
          .filter((group) => group.entries.length)
          .map((group) => (
            <section key={group.name}>
              <h3>{group.name}</h3>
              <ul style={{ columns: '2 20rem' }}>
                {[...group.entries]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((entry) => (
                    <li key={entry.slug}>
                      <a href={`${prefix}/${entry.slug}`}>{entry.name}</a>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
      </DirectoryNavigation>
      <h2>Common questions</h2>
      {faqs.map(({ question, answer }) => (
        <section key={question}>
          <h3>{question}</h3>
          <p>{answer}</p>
        </section>
      ))}
    </GuideLayout>
  );
}
