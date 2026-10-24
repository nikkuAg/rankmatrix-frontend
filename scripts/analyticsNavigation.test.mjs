import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyticsNavigation, navigationDestination } from '../src/utils/analyticsNavigation.mjs';

const location = {
  href: 'https://www.rankmatrix.in/colleges',
  origin: 'https://www.rankmatrix.in',
  pathname: '/colleges',
};
function event(href, match = '') {
  const anchor = {
    getAttribute: () => href,
    hasAttribute: () => false,
    closest: (selector) => (selector === match ? {} : null),
  };
  return { target: { closest: () => anchor } };
}
test('navigation reports route types instead of URLs, queries or link text', () => {
  assert.deepEqual(analyticsNavigation(event('/predict?rank=1000&category=SC'), location), {
    source: 'content',
    destination_type: 'predictor',
  });
  assert.equal(navigationDestination('/colleges/iit-delhi/cse'), 'institute_programme');
  assert.equal(navigationDestination('/branches/cse/'), 'programme');
  assert.equal(navigationDestination('/guides/choice-filling'), 'guide');
  assert.equal(navigationDestination('/unknown'), null);
});
test('existing feature events, external links, anchors and non-links are excluded', () => {
  assert.equal(analyticsNavigation(event('/predict', '[data-analytics-handled]'), location), null);
  assert.equal(analyticsNavigation(event('https://example.com/predict'), location), null);
  assert.equal(analyticsNavigation(event('#main-content'), location), null);
  assert.equal(analyticsNavigation({ target: {} }, location), null);
});
