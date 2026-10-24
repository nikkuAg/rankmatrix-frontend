const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('next/dist/build/swc');
const source = path.resolve(__dirname, '../src');
function load(relative) {
  const filename = path.join(source, relative);
  const compiled = transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    jsc: {
      parser: { syntax: 'ecmascript', jsx: true },
      transform: { react: { runtime: 'automatic' } },
    },
    module: { type: 'commonjs' },
  });
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = (name) => {
    if (name.endsWith('.module.css')) return {};
    if (name === '@/components/NoData') return load('components/NoData/index.js');
    if (name.startsWith('@/')) return originalRequire(path.join(source, name.slice(2)));
    return originalRequire(name);
  };
  loaded._compile(compiled.code, filename);
  return loaded.exports;
}
const { CollegeRows } = load('components/CollegeList/CollegeRows.js');
const { CollegeHeader } = load('components/CollegeList/CollegeHeader.js');
const { CollegePagination } = load('components/CollegeList/CollegePagination.js');
const { CollegeControls } = load('components/CollegeList/CollegeControls.js');
const { ThemeProvider, createTheme } = require('@mui/material/styles');
const { themes } = require('../src/constants/themes.js');
const testTheme = createTheme({
  palette: {
    mode: 'light',
    primary: themes.light.primary,
    gray: themes.light.gray,
    text: themes.light.text,
    shadow: themes.light.shadow,
  },
});
const college = {
  code: 1,
  name: '<script>private()</script>',
  slug: 'example',
  type: 'NIT',
  state: 'Example',
  nirfRanks: [
    { year: 2025, rank: 2 },
    { year: 2024, rank: 3 },
  ],
};
function table(Component, props) {
  return renderToStaticMarkup(
    React.createElement(
      ThemeProvider,
      { theme: testTheme },
      React.createElement('table', null, React.createElement(Component, props)),
    ),
  );
}
test('native rows preserve escaping, route links and latest NIRF rank', () => {
  const html = table(CollegeRows, {
    colleges: [college],
    nirfYears: [2025, 2024],
    expandedNirf: false,
  });
  assert.equal((html.match(/<td\b/g) || []).length, 5);
  assert.match(html, /&lt;script&gt;private\(\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /href="\/colleges\/example"/);
  assert.match(html, />2<\/td>/);
  assert.doesNotMatch(html, />3<\/td>/);
});
test('expanded NIRF rows match year columns; missing ranks retain placeholders', () => {
  const html = table(CollegeRows, {
    colleges: [college],
    nirfYears: [2025, 2024, 2023],
    expandedNirf: true,
  });
  assert.equal((html.match(/<td\b/g) || []).length, 7);
  assert.match(html, />2<\/td><td[^>]*>3<\/td><td[^>]*>-<\/td>/);
});
test('table headers expose sort state and real keyboard-operable buttons', () => {
  const html = table(CollegeHeader, {
    sortField: 'name',
    sortOrder: 'asc',
    handleSort() {},
    onExpand() {},
    expandedNirf: true,
    nirfYears: [2025, 2024],
  });
  assert.match(html, /aria-sort="ascending"/);
  assert.match(html, /<button[^>]+type="button"[^>]*>College Name/);
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /colSpan="2"/i);
  assert.match(html, />2025<\/th>/);
  assert.match(html, />2024<\/th>/);
});

test('empty catalogue cells span the actual collapsed or expanded table columns', () => {
  for (const [expandedNirf, nirfYears, count] of [
    [false, [], 5],
    [true, [2025, 2024], 6],
    [true, [], 5],
  ]) {
    assert.match(
      table(CollegeRows, { colleges: [], nirfYears, expandedNirf }),
      new RegExp(`colSpan="${count}"`, 'i'),
    );
  }
});

test('pagination preserves disabled boundaries, current page and long-range ellipses', () => {
  const markup = (currentPage, totalPages) =>
    renderToStaticMarkup(
      React.createElement(
        ThemeProvider,
        { theme: testTheme },
        React.createElement(CollegePagination, {
          currentPage,
          totalPages,
          onPageChange() {},
          start: 1,
          end: 25,
          totalItems: 200,
        }),
      ),
    );
  assert.match(markup(1, 6), /<button[^>]*disabled=""[^>]*aria-label="Go to previous page"/);
  assert.match(markup(6, 6), /<button[^>]*disabled=""[^>]*aria-label="Go to next page"/);
  assert.match(markup(1, 6), /aria-current="page"[^>]*aria-label="page 1"/);
  assert.match(markup(5, 20), /…/);
  assert.match(markup(5, 20), /Go to page 20/);
});

test('initial college controls expose all four selected types and a labelled search input', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      ThemeProvider,
      { theme: testTheme },
      React.createElement(CollegeControls, { onTypeChange() {}, onSearchChange() {} }),
    ),
  );
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 4);
  assert.match(html, /IIT \/ IISc/);
  const label = html.match(/<label[^>]*for="([^"]+)"[^>]*>Search by any keyword<\/label>/);
  assert.ok(label);
  assert.ok(html.includes(`id="${label[1]}" type="text"`));
});

test('returning catalogue controls reflect retained query filters and search', () => {
  const html = renderToStaticMarkup(React.createElement(ThemeProvider, { theme: testTheme },
    React.createElement(CollegeControls, { defaultSelected: ['NIT'], defaultSearch: 'Delhi',
      onTypeChange() {}, onSearchChange() {} })));
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1);
  assert.match(html, /aria-pressed="true"[^>]*>NIT<\/button>/);
  assert.match(html, /value="Delhi"/);
});
