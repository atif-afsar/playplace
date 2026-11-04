/**
 * Server entry used ONLY at build time (scripts/prerender.mjs) to pre-render
 * every route to static HTML. Nothing here runs in the browser.
 */
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

export { buildHead } from "./lib/seoHead.js";
export { PAGE_SEO, SEO_ROUTES } from "./data/seo.js";
export { HEROES } from "./data/school.js";
export { SITE } from "./config/site.js";

async function toHtml(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // Static build: never "outline" large Suspense boundaries into hidden blocks.
    { progressiveChunkSize: Number.POSITIVE_INFINITY }
  );
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}

/**
 * Pages are React.lazy() chunks. The first pass resolves them; the second pass
 * renders everything inline, in document order — no hidden Suspense "S:0" block
 * that crawlers without JavaScript would miss.
 */
export async function render(url) {
  await toHtml(url);
  const html = await toHtml(url);
  if (html.includes('<div hidden id="S:')) throw new Error(`Suspense content was not inlined for ${url}`);
  return html;
}
