// This function is also serialized into the initial HTML. Keep it self-contained.
export function initializeAnalytics(browser, measurementId) {
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return false;
  if (browser.__rankmatrixAnalytics === measurementId) return true;
  browser.dataLayer = browser.dataLayer || [];
  browser.gtag =
    browser.gtag ||
    function () {
      browser.dataLayer.push(arguments);
    };
  browser.gtag('js', new Date());
  browser.gtag('config', measurementId);
  browser.__rankmatrixAnalytics = measurementId;
  return true;
}

export function analyticsBootstrap(measurementId) {
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '')) return '';
  return `(${initializeAnalytics.toString()})(window,${JSON.stringify(measurementId)});`;
}

export function queueAnalyticsEvent(browser, measurementId, action, payload) {
  if (!browser || !/^[a-z][a-z0-9_]{0,39}$/.test(action || '')) return false;
  if (!initializeAnalytics(browser, measurementId)) return false;
  browser.gtag('event', action, payload);
  return true;
}
