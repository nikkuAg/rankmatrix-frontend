module.exports = {
  siteUrl: 'https://rankmatrix.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin'],
      },
    ],
  },
};
