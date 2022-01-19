self.addEventListener("install", (event) => event.skipWaiting());

self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(req) {
  if (!new URL(req.url).pathname.startsWith("/autoskola/assets"))
    return await fetch(req).then(
      async (resp) => {
        const cache = await caches.open("v1");
        await cache.put(req, resp.clone());
        return resp;
      },
      () => caches.match(req)
    );
  const cacheResp = await caches.match(req);
  if (cacheResp !== undefined) return cacheResp;
  const [fetchResp, cache] = await Promise.all([fetch(req), caches.open("v1")]);
  await cache.put(req, fetchResp.clone());
  return fetchResp;
}
