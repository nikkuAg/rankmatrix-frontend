const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('next/dist/build/swc');

function load(relative) {
  const filename = path.resolve(__dirname, '../src', relative);
  const compiled = transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    jsc: {
      parser: { syntax: 'ecmascript', jsx: true },
      transform: { react: { runtime: 'automatic' } },
    },
    module: { type: 'commonjs' },
  });
  const target = new Module(filename, module);
  target.filename = filename;
  target.paths = Module._nodeModulePaths(path.dirname(filename));
  const original = target.require.bind(target);
  target.require = (id) => (id.startsWith('@/') ? load(id.slice(2)) : original(id));
  target._compile(compiled.code, filename);
  return target.exports;
}

test('cutoff analysis is visible server HTML with scoped comparisons and honest missing data', () => {
  const { CutoffAnalysis } = load('components/CutoffAnalysis/index.js');
  const row = (year, round, closingRank) => ({
    year,
    round,
    closingRank,
    openingRank: 1,
    quota: 'HS',
    category: 'General',
    seatPool: 'Gender-Neutral',
  });
  const html = renderToStaticMarkup(
    React.createElement(CutoffAnalysis, {
      year: 2026,
      rows: [row(2026, 1, 100), row(2026, 3, 120), row(2025, 3, 130)],
    }),
  );
  for (const text of [
    'JoSAA 2026',
    'Gender-Neutral',
    'Round 1: 100',
    'Round 3: 120',
    'Up 20',
    'Down 10',
    'official final round',
    'same round, quota, category and seat pool',
  ])
    assert.ok(html.includes(text), text);
  assert.match(html, /<th scope="row">HS<\/th>/);
  assert.match(html, /<caption>/);
  assert.ok(html.includes('2025 and 2026 only'));
  const empty = renderToStaticMarkup(React.createElement(CutoffAnalysis, { year: 2026, rows: [] }));
  assert.ok(empty.includes('No unambiguous matching rows'));
  assert.ok(!empty.includes('<table'));
});
