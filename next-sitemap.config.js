/** @type {import('next-sitemap').IConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchSeoSlugs() {
  const empty = { institutes: [], branches: [], cutoffs: [] };
  if (!API_URL) return empty;
  try {
    const res = await fetch(`${API_URL}/api/seo/slugs`);
    if (!res.ok) return empty;
    const json = await res.json();
    return {
      institutes: json.institutes || [],
      branches: json.branches || [],
      cutoffs: json.cutoffs || [],
    };
  } catch {
    return empty;
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
    const { institutes, branches, cutoffs } = await fetchSeoSlugs();
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
    // Deep institute × branch combination pages. Emitted explicitly so
    // Google can queue them all for crawl without waiting to follow
    // internal links. sitemapSize (5000) will split these into multiple
    // sitemap files automatically if the count exceeds one file.
    cutoffs.forEach((combo) => {
      const instituteSlug = combo.instituteSlug ?? combo.institute_slug;
      const branchSlug = combo.branchSlug ?? combo.branch_slug;
      if (!instituteSlug || !branchSlug) return;
      paths.push({
        loc: `/colleges/${instituteSlug}/${branchSlug}`,
        changefreq: 'monthly',
        priority: 0.65,
        lastmod,
        alternateRefs: config.alternateRefs ?? [],
      });
    });
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
