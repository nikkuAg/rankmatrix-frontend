import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildMetadata,
  instituteSearchTitle,
  instituteShortName,
  instituteTitleName,
  programmeSearchTitle,
  programmeTitleName,
  toolPageCopy,
} from '../src/utils/metadata.mjs';

test('institute titles preserve supplied identity without guessing from city or type', () => {
  assert.equal(
    instituteTitleName({
      name: 'National Institute of Technology Goa',
      displayCode: 'Cuncolim',
      type: 'NIT',
    }),
    'National Institute of Technology Goa',
  );
  assert.equal(
    instituteTitleName({
      name: 'Indian Institute of Science, Bengaluru',
      displayCode: 'Bengaluru',
      type: 'IIT',
    }),
    'Indian Institute of Science, Bengaluru',
  );
  assert.equal(instituteTitleName({ name: 'Official name', type: 'GFTI' }), 'Official name');
  assert.equal(instituteTitleName({ displayCode: 'Stored name' }), 'Stored name');
  assert.throws(() => instituteTitleName({ type: 'IIT' }), /institution name/);
});

test('search and social previews describe the same page on the canonical host', () => {
  const meta = buildMetadata({
    path: '/ranks',
    title: 'JoSAA Cutoffs',
    description: 'Compare historical opening and closing ranks.',
  });
  assert.equal(meta.alternates.canonical, 'https://www.rankmatrix.in/ranks');
  assert.equal(meta.openGraph.url, meta.alternates.canonical);
  assert.equal(meta.title.absolute, meta.openGraph.title);
  assert.equal(meta.twitter.title, meta.openGraph.title);
  assert.equal(meta.description, meta.twitter.description);
  assert.equal(meta.twitter.images[0].url, meta.openGraph.images[0].url);
  assert.equal(meta.openGraph.images[0].width, 1200);
  assert.equal(meta.robots.googleBot['max-snippet'], -1);
  assert.equal(meta.twitter.creator, undefined);
});

test('an empty data page cannot inherit an index directive from its layout', () => {
  const meta = buildMetadata({
    path: '/branches/empty',
    title: 'Empty branch',
    description: 'No data.',
    index: false,
  });
  assert.equal(meta.robots.index, false);
  assert.equal(meta.robots.googleBot.index, false);
  assert.equal(meta.robots.follow, true);
});

test('titles already naming RankMatrix do not repeat the brand', () => {
  const meta = buildMetadata({
    path: '/about',
    title: 'About RankMatrix',
    description: 'Our purpose and data.',
  });
  assert.equal(meta.title.absolute, 'About RankMatrix');
  assert.equal(meta.openGraph.title, 'About RankMatrix');
});

test('canonical URLs cannot point to another origin or include filter parameters', () => {
  for (const path of [
    '//example.com',
    'https://example.com',
    '/ranks?year=2025',
    '/ranks#results',
  ]) {
    assert.throws(() => buildMetadata({ path, title: 'Ranks', description: 'Cutoffs.' }));
  }
});

test('article dates are included only when supplied for an article', () => {
  const input = { path: '/guides/example', title: 'Guide', description: 'Read the guide.' };
  assert.equal(buildMetadata(input).openGraph.publishedTime, undefined);
  assert.equal(
    buildMetadata({ ...input, type: 'article', publishedTime: '2026-04-23' }).openGraph
      .publishedTime,
    '2026-04-23',
  );
});

test('programme metadata disambiguates equal names and duration without merging records', () => {
  const a = { name: 'Chemical Engineering', code: 'A', courseDuration: 5 };
  const b = { ...a, code: 'B' };
  assert.notEqual(programmeTitleName(a), programmeTitleName(b));
  assert.match(programmeTitleName(a), /5 years, code A/);
  assert.equal(programmeTitleName({ ...a, courseDuration: 0 }), 'Chemical Engineering (code A)');
  assert.throws(() => programmeTitleName({ name: 'Chemical Engineering' }), /name and code/);
});

test('short names come only from the official name and never from city, code or type', () => {
  const short = (name, extra = {}) => instituteShortName({ name, ...extra });
  assert.equal(short('Indian Institute of Technology Ropar'), 'IIT Ropar');
  assert.equal(short('Indian Institute of Technology (BHU) Varanasi'), 'IIT (BHU) Varanasi');
  assert.equal(short('National Institute of Technology, Warangal'), 'NIT Warangal');
  assert.equal(
    short('National Institute of Technology Karnataka, Surathkal'),
    'NIT Karnataka, Surathkal',
  );
  assert.equal(
    short('Indian Institute of Information Technology(IIIT) Una, Himachal Pradesh'),
    'IIIT Una',
  );
  assert.equal(
    short('Indian Institute of Information Technology (IIIT)Kota, Rajasthan'),
    'IIIT Kota',
  );
  assert.equal(short('Malaviya National Institute of Technology Jaipur'), 'MNIT Jaipur');
  assert.equal(short('Indian Institute of Science, Bangalore'), 'IISc Bangalore');
  for (const [name, expected] of [
    ['National Institute of Technical Teachers Training and Research Bhopal', 'NITTTR Bhopal'],
    [
      'National Institute of Electronics and Information Technology, Ajmer (Rajasthan)',
      'NIELIT Ajmer',
    ],
    ['National Institute of Electronics and Information Technology, Calicut', 'NIELIT Calicut'],
    ['School of Planning & Architecture: Vijayawada', 'SPA Vijayawada'],
    [
      'National Institute of Food Technology Entrepreneurship and Management, Kundli',
      'NIFTEM Kundli',
    ],
    [
      'Indian Institute of Information Technology, Design & Manufacturing, Kancheepuram',
      'IIITDM Kancheepuram',
    ],
    ['INDIAN INSTITUTE OF INFORMATION TECHNOLOGY SENAPATI MANIPUR', 'IIIT Manipur'],
    ['International Institute of Information Technology, Bhubaneswar', 'IIIT Bhubaneswar'],
    ['Punjab Engineering College, Chandigarh', 'PEC Chandigarh'],
    ['Birla Institute of Technology, Mesra, Ranchi', 'BIT Mesra'],
  ])
    assert.equal(short(name), expected, name);
  // Unmapped names keep their official name rather than a guessed acronym.
  for (const name of [
    'Indian Institute of Information Technology Design & Manufacturing Somewhere New',
    'INDIAN INSTITUTE OF TECHNOLOGY NEWTOWN',
    'University of Hyderabad',
    'Assam University, Silchar',
  ])
    assert.equal(short(name), null, name);
  assert.equal(short('Official name', { displayCode: 'Goa', type: 'NIT' }), null);
  assert.equal(instituteShortName({}), null);
});

test('search titles lead with the short name, stay short and keep programmes distinct', () => {
  const iit = { name: 'Indian Institute of Technology Bombay' };
  assert.equal(
    instituteSearchTitle(iit, 2026),
    'IIT Bombay Cutoff 2026: JoSAA Ranks, Branches & NIRF',
  );
  assert.equal(
    instituteSearchTitle({ name: 'Assam University, Silchar' }),
    'Assam University, Silchar JoSAA Cutoff',
  );
  const programme = { name: 'Aerospace Engineering', code: 4101, courseDuration: 4 };
  const title = programmeSearchTitle(iit, programme, 2026);
  assert.equal(title, 'IIT Bombay Aerospace Engineering Cutoff 2026 (4101)');
  assert.ok(`${title} | RankMatrix`.length <= 65);
  assert.notEqual(title, programmeSearchTitle(iit, { ...programme, code: 4102 }, 2026));
  assert.throws(
    () => programmeSearchTitle(iit, { name: 'Aerospace Engineering' }),
    /name and code/,
  );
});

test('tool pages name the data year only when a plausible one is supplied', () => {
  assert.deepEqual(
    toolPageCopy('ranks', 2026).title,
    'JoSAA Opening & Closing Ranks 2026, All Rounds',
  );
  assert.equal(
    toolPageCopy('seatMatrix', 2026).title,
    'JoSAA Seat Matrix 2026 by College & Category',
  );
  assert.equal(toolPageCopy('predict', 2026).title, 'Free JEE Main & Advanced College Predictor');
  assert.match(toolPageCopy('predict', 2026).description, /JoSAA 2026 cutoffs/);
  for (const page of ['ranks', 'seatMatrix', 'predict']) {
    const dated = toolPageCopy(page, 2026);
    assert.ok(`${dated.title} | RankMatrix`.length <= 60, dated.title);
    assert.ok(dated.description.length <= 170, dated.description);
    for (const bad of [null, undefined, '2026', 2026.5, 0, 1999, 3000]) {
      const copy = toolPageCopy(page, bad);
      assert.doesNotMatch(`${copy.title} ${copy.description}`, /\b(19|20|30)\d\d\b/);
    }
  }
  assert.throws(() => toolPageCopy('unknown', 2026), /Unknown tool page/);
});
