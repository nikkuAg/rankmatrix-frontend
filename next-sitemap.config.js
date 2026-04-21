/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rankmatrix.in',
  generateRobotsTxt: true,
  autoLastmod: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  // Next.js metadata routes and Sentry's tunnel are not user-facing pages.
  exclude: [
    '/opengraph-image*',
    '/twitter-image*',
    '/icon*',
    '/apple-icon*',
    '/manifest*',
    '/robots.txt',
    '/sitemap*.xml',
  ],
  transform: async (config, path) => {
    // Per-route priority/changefreq tuned for how often the underlying data moves.
    const priorityMap = {
      '/': 1.0,
      '/predict': 0.95,
      '/ranks': 0.9,
      '/seat-matrix': 0.9,
      '/colleges': 0.85,
      '/branches': 0.85,
      '/documents': 0.5,
      '/matrix': 0.4,
      '/test-choices': 0.4,
    };
    const changefreqMap = {
      '/': 'weekly',
      '/predict': 'weekly',
      '/ranks': 'weekly',
      '/seat-matrix': 'weekly',
      '/colleges': 'weekly',
      '/branches': 'weekly',
      '/documents': 'monthly',
      '/matrix': 'monthly',
      '/test-choices': 'monthly',
    };
    return {
      loc: path,
      changefreq: changefreqMap[path] ?? 'weekly',
      priority: priorityMap[path] ?? 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      // Baseline: allow everything, block only backend-style routes.
      { userAgent: '*', allow: '/', disallow: ['/api', '/admin'] },
      // Explicit allow for well-behaved AI crawlers so RankMatrix shows up in
      // answer-engine results. Disallow the Sentry tunnel route.
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'Perplexity-User', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'Bingbot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'DuckDuckBot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'Applebot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'YouBot', allow: '/', disallow: ['/api', '/admin'] },
      { userAgent: 'MistralAI-User', allow: '/', disallow: ['/api', '/admin'] },
    ],
  },
};
