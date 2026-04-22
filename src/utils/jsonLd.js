const SITE_URL = 'https://rankmatrix.in';
const SITE_NAME = 'RankMatrix';
const AUTHOR = { '@type': 'Person', name: 'Divyansh Agarwal' };
const PUBLISHER = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
};

export const articleJsonLd = ({ path, title, description, datePublished, dateModified }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  url: `${SITE_URL}${path}`,
  datePublished,
  dateModified: dateModified ?? datePublished,
  inLanguage: 'en-IN',
  author: AUTHOR,
  publisher: PUBLISHER,
  image: `${SITE_URL}/opengraph-image`,
});

export const faqJsonLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

export const breadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(({ name, path }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});
