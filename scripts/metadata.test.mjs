import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildMetadata, instituteTitleName, programmeTitleName } from '../src/utils/metadata.mjs';

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
