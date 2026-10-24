import assert from 'node:assert/strict';
import { test } from 'node:test';
import vm from 'node:vm';
import { analyticsPayload } from '../src/utils/analyticsPayload.mjs';
import {
  analyticsBootstrap,
  initializeAnalytics,
  queueAnalyticsEvent,
} from '../src/utils/analyticsTransport.mjs';

test('early events queue after config, once, without waiting for the network tag', () => {
  const browser = {};
  assert.equal(queueAnalyticsEvent(browser, 'G-TEST123', 'form_submitted', { value: 1 }), true);
  const original = browser.dataLayer;
  initializeAnalytics(browser, 'G-TEST123');
  queueAnalyticsEvent(browser, 'G-TEST123', 'prediction_completed', { value: 1 });
  assert.equal(browser.dataLayer, original);
  assert.deepEqual(
    original.map((item) => Array.from(item).slice(0, 2)),
    [
      ['js', original[0][1]],
      ['config', 'G-TEST123'],
      ['event', 'form_submitted'],
      ['event', 'prediction_completed'],
    ],
  );
});

test('SSR bootstrap is executable, idempotent and preserves a pre-existing data layer', () => {
  const previous = { event: 'consent_initialization' };
  const browser = { dataLayer: [previous] };
  const context = vm.createContext({ window: browser });
  vm.runInContext(analyticsBootstrap('G-TEST123'), context);
  vm.runInContext(analyticsBootstrap('G-TEST123'), context);
  queueAnalyticsEvent(browser, 'G-TEST123', 'page_change', { value: 2 });
  assert.equal(browser.dataLayer[0], previous);
  assert.equal(browser.dataLayer.filter((item) => item[0] === 'config').length, 1);
  assert.equal(browser.dataLayer.at(-1)[1], 'page_change');
});

test('disabled, server-only and malformed configurations send nothing', () => {
  for (const id of [undefined, '', 'G-test', 'G-X</script><script>evil']) {
    const browser = {};
    assert.equal(analyticsBootstrap(id), '');
    assert.equal(queueAnalyticsEvent(browser, id, 'search', {}), false);
    assert.equal(browser.dataLayer, undefined);
  }
  assert.equal(queueAnalyticsEvent(null, 'G-TEST', 'search', {}), false);
  assert.equal(queueAnalyticsEvent({}, 'G-TEST', 'bad event', {}), false);
});

test('metadata drops form contents, search text and non-allowlisted values', () => {
  assert.deepEqual(
    analyticsPayload({
      category: 'rank_list',
      label: 'Filters',
      parameters: {
        field: 'category',
        category: 'SC',
        rank: 1000,
        query: 'private@example.com',
        selected_count: 2,
        result_count: Infinity,
        source: '<script>',
        outcome: 'empty',
      },
    }),
    {
      event_category: 'rank_list',
      event_label: 'Filters',
      field: 'category',
      selected_count: 2,
      outcome: 'empty',
    },
  );
});
