// Notifies IndexNow (Bing, Yandex, Seznam, Naver…) of URLs that changed, so
// they are recrawled within hours instead of days. Bing's index also feeds
// ChatGPT Search and Copilot.
//
// Run after a deploy is live:
//   bun run indexnow                  # submits every URL in the live sitemap
//   bun run indexnow /about /blog/x   # submits only these paths
//
// The key file lives at public/<KEY>.txt and must stay deployed.

const KEY = "c09678a40eaaa665143d175b22b6c437";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.genexecutive.in";
const host = new URL(SITE).host;

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((p) => new URL(p, SITE).toString())
  : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted, key validation pending.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
