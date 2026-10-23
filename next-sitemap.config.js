/** @type {import('next-sitemap').IConfig} */
const { createRequire } = require('node:module');
const requireFromNext = createRequire(require.resolve('next/package.json'));
requireFromNext('@next/env').loadEnvConfig(process.cwd());
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSeoSlugs() {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is required to generate the full sitemap');
  const res = await fetch(`${API_URL}/api/seo/slugs`, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`Sitemap catalogue request failed: ${res.status}`);
  return res.json();
}

module.exports = {
  siteUrl: 'https://www.rankmatrix.in',
  generateRobotsTxt: true,
  autoLastmod: false,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  exclude: [
    '/opengraph-image*',
    '/twitter-image*',
    '/icon*',
    '/apple-icon*',
    '/manifest*',
    '/robots.txt',
    '/sitemap*.xml',
  ],
  additionalPaths: async (config) => {
    const { institutes = [], branches = [], cutoffs = [] } = await fetchSeoSlugs();
    const paths = [
      ...institutes.filter((i) => i.slug).map((i) => `/colleges/${i.slug}`),
      ...branches.filter((b) => b.slug).map((b) => `/branches/${b.slug}`),
      ...cutoffs
        .filter((c) => (c.institute_slug || c.instituteSlug) && (c.branch_slug || c.branchSlug))
        .map(
          (c) =>
            `/colleges/${c.institute_slug || c.instituteSlug}/${c.branch_slug || c.branchSlug}`,
        ),
    ];
    return [...new Set(paths)].map((loc) => ({ loc, alternateRefs: config.alternateRefs ?? [] }));
  },
  transform: async (config, path) => {
    const priorityMap = {
      '/': 1.0,
      '/predict': 0.95,
      '/ranks': 0.9,
      '/seat-matrix': 0.9,
      '/colleges': 0.85,
      '/branches': 0.85,
      '/guides': 0.8,
      '/methodology': 0.7,
      '/about': 0.6,
      '/contact': 0.4,
      '/privacy': 0.3,
      '/terms': 0.3,
    };
    const changefreqMap = {
      '/': 'weekly',
      '/predict': 'weekly',
      '/ranks': 'weekly',
      '/seat-matrix': 'weekly',
      '/colleges': 'weekly',
      '/branches': 'weekly',
      '/guides': 'weekly',
      '/methodology': 'monthly',
      '/about': 'monthly',
      '/contact': 'yearly',
      '/privacy': 'yearly',
      '/terms': 'yearly',
    };
    let priority = priorityMap[path];
    let changefreq = changefreqMap[path];
    if (priority === undefined) {
      if (path.startsWith('/guides/')) {
        priority = 0.75;
        changefreq = 'monthly';
      } else {
        priority = 0.7;
        changefreq = 'weekly';
      }
    }
    return {
      loc: path,
      changefreq,
      priority,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api', '/admin'] },
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
