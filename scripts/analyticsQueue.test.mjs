import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sendAnalyticsEvent } from '../src/utils/analyticEvent.js';

test('early events retain Google queue format and sanitization before its library loads', () => {
  const previousWindow = globalThis.window;
  const previousId = process.env.NEXT_PUBLIC_GA_ID;
  process.env.NEXT_PUBLIC_GA_ID = 'G-TEST';
  globalThis.window = {};
  try {
    sendAnalyticsEvent({
      action: 'prediction_completed',
      category: 'college_predictor',
      label: 'Results',
      value: 1,
    });
    sendAnalyticsEvent({
      action: 'search',
      category: 'college_list',
      value: { search: 'private input' },
    });
    const queued = window.dataLayer.map((entry) => Array.from(entry));
    assert.equal(queued.length, 2);
    assert.deepEqual(queued[0], [
      'event',
      'prediction_completed',
      {
        event_category: 'college_predictor',
        event_label: 'Results',
        value: 1,
      },
    ]);
    assert.doesNotMatch(JSON.stringify(queued), /private input/);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousId === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
    else process.env.NEXT_PUBLIC_GA_ID = previousId;
  }
});
