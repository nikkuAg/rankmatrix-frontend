const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { transformSync } = require('next/dist/build/swc');

const filename = path.resolve(__dirname, '../src/components/Footer/index.js');
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
const originalRequire = componentModule.require.bind(componentModule);
componentModule.require = (id) =>
  id.endsWith('.module.css') ? {} : originalRequire(id);
componentModule._compile(compiled.code, filename);

test('footer navigation and attribution render without browser state or a theme provider', () => {
  const html = renderToStaticMarkup(React.createElement(componentModule.exports.Footer));
  assert.equal((html.match(/<a\b/g) || []).length, 26);
  for (const name of ['Tools', 'Guides', 'Reference', 'Site']) {
    assert.ok(html.includes(`<nav aria-label="${name}">`));
  }
  for (const href of ['/predict', '/ranks', '/seat-matrix', '/colleges', '/branches', '/privacy', '/terms']) {
    assert.ok(html.includes(`href="${href}"`));
  }
  const anchors = html.match(/<a\b[^>]*>/g);
  for (const anchor of anchors.filter((a) => a.includes('target="_blank"'))) {
    assert.match(anchor, /rel="[^"]*noopener noreferrer/);
  }
  assert.ok(html.includes(`© ${new Date().getFullYear()} RankMatrix · Built by`));
  assert.ok(html.includes('No signup or contact details required'));
  assert.ok(html.includes('Predictor outputs are our calculations'));
  assert.ok(!html.includes('\uFFFD'));
});
