export const SITE_URL = 'https://www.rankmatrix.in';
export const SITE_NAME = 'RankMatrix';
export const HOME_TITLE = 'Free JEE College Predictor & JoSAA Cutoffs';
export const HOME_DESCRIPTION =
  'Predict colleges with your JEE Main or Advanced rank. Compare JoSAA cutoffs, branches and seat matrices using official data. Free, with no signup.';

const PREVIEW_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: 'RankMatrix: JEE college predictor, JoSAA cutoffs and seat matrix',
};

export function instituteTitleName(institute) {
  // A display code can be a campus city or a stored type can be approximate.
  // Use the supplied institution name rather than manufacturing an acronym.
  const name = institute.name?.trim() || institute.displayCode?.trim();
  if (!name) throw new Error('Institute metadata requires an institution name');
  return name;
}

/** Keep search and social metadata aligned, independent of layout inheritance. */
export function buildMetadata({
  path,
  title,
  description,
  type = 'website',
  publishedTime,
  modifiedTime,
  index = true,
}) {
  if (!path?.startsWith('/') || path.startsWith('//') || /[?#]/.test(path)) {
    throw new Error('Metadata requires a canonical pathname without query or fragment');
  }
  const cleanTitle = title.replace(/\s+/g, ' ').trim();
  const cleanDescription = description.replace(/\s+/g, ' ').trim();
  const brandedTitle = cleanTitle.includes(SITE_NAME) ? cleanTitle : `${cleanTitle} | ${SITE_NAME}`;
  const canonical = new URL(path, SITE_URL).href;

  return {
    title: { absolute: brandedTitle },
    description: cleanDescription,
    alternates: { canonical },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_IN',
      title: brandedTitle,
      description: cleanDescription,
      images: [PREVIEW_IMAGE],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: cleanDescription,
      images: [PREVIEW_IMAGE],
    },
  };
}
