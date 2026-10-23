import Link from 'next/link';

export const metadata = {
  title: { absolute: 'Page Not Found | RankMatrix' },
  description:
    'This RankMatrix page could not be found. Browse colleges, branches or JoSAA guides.',
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <section style={{ maxWidth: 820, margin: 'auto', padding: '3rem 1.5rem' }}>
      <h1>Page not found</h1>
      <p>
        The address may be incorrect, or this institute or programme is not in our current
        catalogue.
      </p>
      <ul>
        <li>
          <Link href="/colleges">Browse participating colleges</Link>
        </li>
        <li>
          <Link href="/branches">Compare engineering branches</Link>
        </li>
        <li>
          <Link href="/guides">Read JoSAA counselling guides</Link>
        </li>
        <li>
          <Link href="/">Return to RankMatrix home</Link>
        </li>
      </ul>
    </section>
  );
}
