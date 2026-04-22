/** @type {import('next-sitemap').IConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSeoSlugs() {
  if (!API_URL) {
    return { institutes: [], branches: [] };
  }
  try {
    const res = await fetch(`${API_URL}/api/seo/slugs`);
    if (!res.ok) return { institutes: [], branches: [] };
    const json = await res.json();
    return {
      institutes: json.institutes || [],
      branches: json.branches || [],
    };
  } catch {
    return { institutes: [], branches: [] };
  }
}

module.exports = {
  siteUrl: 'https://rankmatrix.in',
  generateRobotsTxt: true,
  autoLastmod: true,
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
    const { institutes, branches } = await fetchSeoSlugs();
    const lastmod = new Date().toISOString();
    const paths = [];
    institutes.forEach((institute) => {
      if (!institute.slug) return;
      paths.push({
        loc: `/colleges/${institute.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod,
        alternateRefs: config.alternateRefs ?? [],
      });
    });
    branches.forEach((branch) => {
      if (!branch.slug) return;
      paths.push({
        loc: `/branches/${branch.slug}`,
        changefreq: 'weekly',
        priority: 0.75,
        lastmod,
        alternateRefs: config.alternateRefs ?? [],
      });
    });
    // Institute × branch combinations are generated on demand (ISR) and
    // can number in the thousands; skip them from the initial sitemap to
    // keep it under the 50k URL cap and let Google discover them via
    // internal links from the institute/branch pages.
    return paths;
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
      '/guides': 'weekly',
      '/documents': 'monthly',
      '/matrix': 'monthly',
      '/test-choices': 'monthly',
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
      lastmod: new Date().toISOString(),
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
