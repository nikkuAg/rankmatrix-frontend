import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildMetadata, instituteTitleName } from '../src/utils/metadata.mjs';

test('institute titles retain the IIT/NIT/IIIT identity when displayCode is a city', () => {
  assert.equal(instituteTitleName({ displayCode: 'Bhubaneswar', type: 'IIT' }), 'IIT Bhubaneswar');
  assert.equal(instituteTitleName({ displayCode: 'NIT Trichy', type: 'NIT' }), 'NIT Trichy');
  assert.equal(instituteTitleName({ name: 'Official name', type: 'GFTI' }), 'Official name');
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
