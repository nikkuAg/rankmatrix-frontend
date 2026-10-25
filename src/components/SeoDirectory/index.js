import { DirectoryNavigation } from '@/components/DirectoryNavigation';
import { FaqList, ReferenceItem, ReferencePanel } from '@/components/ReferencePanel';
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
    <ReferencePanel
      title={
        colleges
          ? 'Browse JoSAA colleges and branch cutoffs'
          : 'Browse engineering programmes by branch'
      }
      description={
        colleges
          ? 'Open an institute to compare its programmes, published opening and closing ranks, and seat data.'
          : 'Open a programme to compare participating institutes, then follow a college link for round-wise cutoffs.'
      }
      label="Directory & useful context"
    >
      {groups
        .filter((group) => group.entries.length)
        .map((group) => (
          <ReferenceItem
            key={group.name}
            title={`${group.name} · ${group.entries.length}`}
            wide={!colleges}
          >
            <DirectoryNavigation>
              <ul className="directory-links">
                {[...group.entries]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((entry) => (
                    <li key={entry.slug}>
                      <a href={`${prefix}/${entry.slug}`}>{entry.name}</a>
                    </li>
                  ))}
              </ul>
            </DirectoryNavigation>
          </ReferenceItem>
        ))}
      <FaqList faqs={faqs} />
    </ReferencePanel>
  );
}
