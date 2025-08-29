// Small Strapi client for build-time fetches
// Expects STRAPI_URL and STRAPI_TOKEN in env.

const STRAPI_URL = import.meta.env.STRAPI_URL || process.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || process.env.STRAPI_TOKEN;

export type CaseStudy = {
  id: number;
  attributes: {
    slug: string;
    title?: string;
    body?: string; // Rich text HTML from Strapi
    publishedAt?: string;
  };
};

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!STRAPI_URL || !STRAPI_TOKEN) return null;
  const url = new URL(`/api/case-studies`, STRAPI_URL);
  url.searchParams.set('filters[slug][$eq]', slug);
  url.searchParams.set('publicationState', 'live');
  url.searchParams.set('populate', 'deep');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.warn('Strapi fetch failed', res.status, await safeText(res));
    return null;
  }
  const json = await res.json();
  const item = json?.data?.[0] as CaseStudy | undefined;
  return item ?? null;
}

async function safeText(res: Response) {
  try { return await res.text(); } catch { return ''; }
}

export function getStrapiEnvStatus() {
  return {
    hasUrl: !!STRAPI_URL,
    hasToken: !!STRAPI_TOKEN,
  };
}
