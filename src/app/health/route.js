// Runtime identity: an old revision must never satisfy a new release check.
export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    { status: 'ok', release: process.env.RELEASE_SHA || 'development' },
    { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } },
  );
}
