import { instituteType } from './instituteIdentity.mjs';

const EXAM_GROUPS = [
  { id: 'advanced', title: 'JEE Advanced — IIT and IISc programmes', types: ['IIT', 'IISc'] },
  { id: 'main', title: 'JEE Main — NIT, IIIT and GFTI programmes', types: ['NIT', 'IIIT', 'GFTI'] },
];

// Different exam ranks are different scales. List institutes alphabetically
// within an exam instead of presenting one cross-exam competitiveness ranking.
export function groupInstitutesByExam(institutes = []) {
  const groups = [
    ...EXAM_GROUPS,
    { id: 'other', title: 'Other institutes — verify admission exam' },
  ];
  return groups
    .map(({ id, title, types }) => ({
      id,
      title,
      institutes: institutes
        .filter((institute) =>
          types
            ? types.includes(instituteType(institute))
            : !EXAM_GROUPS.some((group) => group.types.includes(instituteType(institute))),
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((group) => group.institutes.length > 0);
}
