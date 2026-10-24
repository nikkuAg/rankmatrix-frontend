import assert from 'node:assert/strict';
import { test } from 'node:test';
import { directoryNavigationHref } from '../src/utils/directoryNavigation.mjs';

function event(href, overrides = {}, anchorOverrides = {}) {
  const anchor = {
    getAttribute: () => href,
    hasAttribute: () => false,
    target: '',
    ...anchorOverrides,
  };
  return {
    button: 0,
    target: { closest: () => anchor },
    currentTarget: { contains: () => true },
    ...overrides,
  };
}
test('unmodified directory clicks and keyboard-generated clicks preserve client navigation', () => {
  assert.equal(directoryNavigationHref(event('/colleges/iit-delhi')), '/colleges/iit-delhi');
  assert.equal(directoryNavigationHref(event('/branches/cse/')), '/branches/cse/');
});
test('modified, canceled, external, download and out-of-container clicks stay native', () => {
  for (const override of [
    { button: 1 },
    { ctrlKey: true },
    { metaKey: true },
    { shiftKey: true },
    { altKey: true },
    { defaultPrevented: true },
    { currentTarget: { contains: () => false } },
  ]) {
    assert.equal(directoryNavigationHref(event('/colleges/iit-delhi', override)), null);
  }
  for (const href of [
    'https://example.com/colleges/test',
    '//example.com/colleges/test',
    '/predict',
    '#details',
    '/colleges/test/programme',
  ]) {
    assert.equal(directoryNavigationHref(event(href)), null);
  }
  assert.equal(directoryNavigationHref(event('/colleges/test', {}, { target: '_blank' })), null);
  assert.equal(
    directoryNavigationHref(event('/colleges/test', {}, { hasAttribute: () => true })),
    null,
  );
  assert.equal(directoryNavigationHref({ button: 0, target: {} }), null);
});
