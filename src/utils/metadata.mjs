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


// Established abbreviations for institutes whose official name does not begin
// with the family name. Keyed by the official name so nothing is inferred from
// a campus city, display code or stored type.
const KNOWN_SHORT_NAMES = {
  'Malaviya National Institute of Technology Jaipur': 'MNIT Jaipur',
  'Maulana Azad National Institute of Technology Bhopal': 'MANIT Bhopal',
  'Motilal Nehru National Institute of Technology Allahabad': 'MNNIT Allahabad',
  'Sardar Vallabhbhai National Institute of Technology, Surat': 'SVNIT Surat',
  'Visvesvaraya National Institute of Technology, Nagpur': 'VNIT Nagpur',
  'Dr. B R Ambedkar National Institute of Technology, Jalandhar': 'NIT Jalandhar',
  'Indian Institute of Science, Bangalore': 'IISc Bangalore',
  'Indian Institute of Science, Bengaluru': 'IISc Bengaluru',
  "Indian Institute of Information Technology(IIIT) Kilohrad, Sonepat, Haryana": "IIIT Sonepat",
};

const FAMILY_PREFIXES = [
  [/^Indian Institute of Information Technology\s*(?:\(IIIT\))?\s*,?\s*/i, 'IIIT'],
  [/^Indian Institute of Technology\s+/i, 'IIT'],
  [/^National Institute of Technology\s*,?\s+/i, 'NIT'],
];

/**
 * The short form applicants search for ("IIT Ropar"), derived only from the
 * official name. Returns null when the name does not follow a known pattern,
 * so callers fall back to the official name instead of a guessed acronym.
 */
export function instituteShortName(institute) {
  const name = institute?.name?.replace(/\s+/g, ' ').trim();
  if (!name) return null;
  if (KNOWN_SHORT_NAMES[name]) return KNOWN_SHORT_NAMES[name];
  // Design & Manufacturing institutes use a different acronym (IIITDM).
  if (/Design\s*(&|and)\s*Manufactur/i.test(name)) return null;
  for (const [pattern, family] of FAMILY_PREFIXES) {
    if (!pattern.test(name)) continue;
    const place = name.replace(pattern, '').trim();
    // Skip names stored in capitals or with nothing after the family name.
    if (!place || !/[a-z]/.test(place)) return null;
    // IIIT names often carry a trailing state; applicants use the campus alone.
    return `${family} ${family === "IIIT" ? place.split(",")[0].trim() : place}`;
  }
  return null;
}

/** Title for an institute page: short name first when one exists. */
export function instituteSearchTitle(institute, year) {
  const yearText = year ? ` ${year}` : '';
  const short = instituteShortName(institute);
  return short
    ? `${short} Cutoff${yearText}: JoSAA Ranks, Branches & NIRF`
    : `${instituteTitleName(institute)} JoSAA Cutoff${yearText}`;
}

/**
 * Title for an institute-programme page. The programme code stays visible so
 * two programmes with the same name cannot share a title.
 */
export function programmeSearchTitle(institute, programme, year) {
  if (!programme.name?.trim() || !programme.code)
    throw new Error('Programme metadata requires name and code');
  const yearText = year ? ` ${year}` : '';
  const place = instituteShortName(institute) || instituteTitleName(institute);
  return `${place} ${programme.name.trim()} Cutoff${yearText} (${programme.code})`;
}

// Programme names are not unique, even with degree/duration. Keep the stored
// code visible so separate records cannot collapse to identical metadata.
export function programmeTitleName(programme) {
  if (!programme.name?.trim() || !programme.code)
    throw new Error('Programme metadata requires name and code');
  const duration = programme.courseDuration > 0 ? `${programme.courseDuration} years, ` : '';
  return `${programme.name.trim()} (${duration}code ${programme.code})`;
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

const TOOL_PAGE_COPY = {
  ranks: {
    title: 'JoSAA Opening & Closing Ranks by Year and Round',
    description:
      'Compare JoSAA opening and closing ranks by college, branch, year, round, category and quota. Explore historical IIT, NIT, IIIT and GFTI cutoffs.',
    datedTitle: (year) => `JoSAA Opening & Closing Ranks ${year}, All Rounds`,
    datedDescription: (year) =>
      `JoSAA opening and closing ranks for ${year} and earlier years. Filter by college, branch, round, category and quota across IITs, NITs, IIITs and GFTIs. Free, no signup.`,
  },
  seatMatrix: {
    title: 'JoSAA Seat Matrix: College & Category-wise Seats',
    description:
      'Explore JoSAA seats by college, branch, year, category, quota and seat pool. Compare seat availability alongside historical admission cutoffs.',
    datedTitle: (year) => `JoSAA Seat Matrix ${year} by College & Category`,
    datedDescription: (year) =>
      `JoSAA seat matrix for ${year} and earlier years: seats by college, branch, category, quota and seat pool, with the change from the previous year.`,
  },
  predict: {
    title: 'Free JEE Main & Advanced College Predictor',
    description:
      'Find college and branch options for your JEE Main or Advanced rank. Compare historical JoSAA cutoffs by category and quota. Free, no signup.',
    // The predictor is used for the coming counselling year, so only the
    // description names the cutoff year it compares against.
    datedTitle: () => 'Free JEE Main & Advanced College Predictor',
    datedDescription: (year) =>
      `Find college and branch options for your JEE Main or Advanced rank, compared with JoSAA ${year} cutoffs by category and quota. Free, no signup.`,
  },
};

/**
 * Title and description for a tool page. The latest stored JoSAA year is
 * named only when the API supplied a plausible one; otherwise the undated
 * copy is used so a failed lookup can never publish a wrong year.
 */
export function toolPageCopy(page, latestYear) {
  const copy = TOOL_PAGE_COPY[page];
  if (!copy) throw new Error(`Unknown tool page: ${page}`);
  const dated = Number.isInteger(latestYear) && latestYear >= 2015 && latestYear <= 2100;
  return dated
    ? { title: copy.datedTitle(latestYear), description: copy.datedDescription(latestYear) }
    : { title: copy.title, description: copy.description };
}
