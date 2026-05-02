import type { APIRoute } from 'astro';

// SSR endpoint — must run on each request, not at build time.
export const prerender = false;

/**
 * Receives a webhook ping from Sanity Studio (configured in
 * sanity.io/manage → API → Webhooks) and re-triggers the Vercel deploy.
 *
 * Configure two env vars in Vercel project settings:
 *   - SANITY_REVALIDATE_SECRET — shared secret; Sanity sends it as a header
 *   - VERCEL_DEPLOY_HOOK       — full deploy-hook URL from Vercel → Settings → Git
 *
 * In Sanity webhook settings:
 *   - URL:        https://<your-vercel-url>/api/revalidate
 *   - HTTP method: POST
 *   - Secret header: x-sanity-revalidate-secret
 */
export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.SANITY_REVALIDATE_SECRET ?? process.env.SANITY_REVALIDATE_SECRET;
  const deployHook =
    import.meta.env.VERCEL_DEPLOY_HOOK ?? process.env.VERCEL_DEPLOY_HOOK;

  // 1. Authenticate.
  const provided =
    request.headers.get('x-sanity-revalidate-secret') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!secret || provided !== secret) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  // 2. Trigger Vercel rebuild (only meaningful in production; on local
  // dev we just acknowledge).
  if (!deployHook) {
    return new Response(
      JSON.stringify({ ok: true, note: 'Acknowledged. VERCEL_DEPLOY_HOOK not set.' }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    );
  }

  try {
    const res = await fetch(deployHook, { method: 'POST' });
    return new Response(
      JSON.stringify({ ok: res.ok, status: res.status }),
      { status: res.ok ? 200 : 502, headers: { 'content-type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message }),
      { status: 502, headers: { 'content-type': 'application/json' } },
    );
  }
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ message: 'POST a Sanity webhook here.' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
