/**
 * Build step: pre-render every route to static HTML for SEO.
 *
 *   vite build                       → dist/ (client)
 *   vite build --ssr src/entry-server.jsx --outDir dist-ssr
 *   node scripts/prerender.mjs       → dist/<page>.html, dist/404.html, dist/sitemap.xml
 *
 * Each page gets its real content plus its own title, description, canonical,
 * Open Graph tags and JSON-LD, so search engines and WhatsApp/Facebook previews
 * don't depend on JavaScript. React hydrates the same markup in the browser.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const ssr = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const { render, buildHead, PAGE_SEO, SEO_ROUTES, HEROES, SITE } = ssr;

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("index.html is missing the <!--app-head--> placeholder or the empty #root div");
}

const pages = [...SEO_ROUTES, "notFound"];
for (const key of pages) {
  const page = PAGE_SEO[key];
  const url = key === "notFound" ? "/__not-found__" : page.path;
  const appHtml = await render(url);
  const html = template
    .replace("<!--app-head-->", buildHead(key))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const file = key === "home" ? "index.html" : key === "notFound" ? "404.html" : `${page.path.slice(1)}.html`;
  await fs.writeFile(path.join(dist, file), html);
  console.log(`  prerendered ${url.padEnd(22)} → dist/${file} (${(html.length / 1024).toFixed(1)} kB)`);
}

// sitemap.xml — every indexable page, with lastmod and its banner image.
const today = new Date().toISOString().slice(0, 10);
const PRIORITY = { home: "1.0", admissions: "0.9", franchise: "0.9", academics: "0.8", about: "0.8", contact: "0.8" };
const urls = SEO_ROUTES.map((key) => {
  const page = PAGE_SEO[key];
  const loc = page.path === "/" ? `${SITE.url}/` : `${SITE.url}${page.path}`;
  const hero = page.hero ? HEROES[page.hero] : null;
  const image = hero
    ? `\n    <image:image><image:loc>${SITE.url}${hero.src}</image:loc></image:image>`
    : "";
  const legal = key === "privacy" || key === "terms";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${legal ? "yearly" : "monthly"}</changefreq>
    <priority>${PRIORITY[key] || (legal ? "0.3" : "0.7")}</priority>${image}
  </url>`;
}).join("\n");

await fs.writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
);
console.log(`  sitemap.xml with ${SEO_ROUTES.length} URLs`);

await fs.rm(ssrDir, { recursive: true, force: true });
