import { instituteType } from './instituteIdentity.mjs';

export const CHOICES_KEY = 'rankmatrix:choices:v1';
export const programmeId = (row) => `${row.institute.code}:${row.branch.code}`;
export function programmeExam(institute) {
  const type = instituteType(institute);
  if (['IIT', 'IISc'].includes(type)) return 'JEE Advanced';
  if (['NIT', 'IIIT', 'GFTI'].includes(type)) return 'JEE Main';
  return 'Verify exam';
}
export function groupProgrammes(rows = []) {
  const groups = new Map();
  for (const row of rows) {
    const id = programmeId(row);
    if (!groups.has(id))
      groups.set(id, { id, institute: row.institute, branch: row.branch, records: [] });
    groups.get(id).records.push(row);
  }
  return [...groups.values()];
}
export function reorderChoices(choices, activeId, overId) {
  const from = choices.findIndex((choice) => choice.id === activeId);
  const to = choices.findIndex((choice) => choice.id === overId);
  if (from < 0 || to < 0 || from === to) return choices;
  const next = [...choices];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}
export function parseChoices(raw) {
  try {
    const value = JSON.parse(raw);
    if (value?.version !== 1 || !Array.isArray(value.choices)) return [];
    return value.choices
      .filter(
        (choice) =>
          isIdentifier(choice?.institute?.code) &&
          isIdentifier(choice?.branch?.code) &&
          typeof choice.institute.name === 'string' &&
          typeof choice.branch.name === 'string' &&
          [
            choice.institute.type,
            choice.institute.slug,
            choice.branch.slug,
            choice.branch.degree,
          ].every(isOptionalText) &&
          isOptionalValue(choice.branch.courseDuration) &&
          choice.id === programmeId(choice) &&
          Array.isArray(choice.records) &&
          choice.records.length > 0 &&
          choice.records.every(
            (record) =>
              record?.institute?.code === choice.institute.code &&
              record?.branch?.code === choice.branch.code &&
              [record.category, record.quota, record.seatPool].every(
                (value) => typeof value === 'string',
              ) &&
              [record.round, record.openingRank, record.closingRank].every(isOptionalValue),
          ),
      )
      .filter((choice, index, all) => all.findIndex((item) => item.id === choice.id) === index);
  } catch {
    return [];
  }
}
const isIdentifier = (value) =>
  typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));
const isOptionalText = (value) => value == null || typeof value === 'string';
const isOptionalValue = (value) => value == null || isIdentifier(value);
export function choiceRows(choices) {
  return choices.flatMap((choice, index) =>
    choice.records.map((record) => ({
      preference: index + 1,
      institute: choice.institute.name,
      instituteType: instituteType(choice.institute),
      branch: choice.branch.name,
      degree: choice.branch.degree,
      duration: choice.branch.courseDuration,
      exam: programmeExam(choice.institute),
      category: record.category,
      quota: record.quota,
      seatPool: record.seatPool,
      year: 'Not supplied by predictor',
      round: record.round,
      openingRank: record.openingRank,
      closingRank: record.closingRank,
    })),
  );
}
