const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('next/dist/build/swc');

const filename = path.resolve(__dirname, '../src/components/NoData/index.js');
const compiled = transformSync(fs.readFileSync(filename, 'utf8'), {
  filename,
  jsc: {
    parser: { syntax: 'ecmascript', jsx: true },
    transform: { react: { runtime: 'automatic' } },
  },
  module: { type: 'commonjs' },
});
const componentModule = new Module(filename, module);
componentModule.filename = filename;
componentModule.paths = Module._nodeModulePaths(path.dirname(filename));
componentModule._compile(compiled.code, filename);
const { NoDataComponent } = componentModule.exports;

test('standalone empty states produce valid section HTML before hydration', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      'section',
      null,
      React.createElement(NoDataComponent, { text: 'Add details' }),
    ),
  );
  assert.match(html, /Add details/);
  assert.doesNotMatch(html, /<(td|th|tr)\b/);
});

test('empty table results retain a cell spanning the supplied columns', () => {
  const html = renderToStaticMarkup(
    React.createElement(
      'table',
      null,
      React.createElement(
        'tbody',
        null,
        React.createElement('tr', null, React.createElement(NoDataComponent, { colSpan: 7 })),
      ),
    ),
  );
  assert.match(html, /<td\b[^>]*colSpan="7"/i);
  assert.match(html, /No results match the selected filters/);
});
