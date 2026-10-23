// Only an explicit endpoint 404 means a missing resource. Configuration,
// transport, server and response-contract failures must remain errors.
export async function fetchSeoJson(base, path, { allowNotFound = true, ...options } = {}) {
  if (typeof base !== 'string' || !base.trim()) {
    throw new Error('Backend API URL is required for SEO rendering');
  }
  const response = await fetch(`${base.replace(/\/$/, '')}${path}`, options);
  if (allowNotFound && response.status === 404) return null;
  if (!response.ok) throw new Error(`SEO API ${path} failed with ${response.status}`);
  const data = await response.json();
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`SEO API ${path} returned an invalid response`);
  }
  return data;
}
