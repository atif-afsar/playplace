import { useEffect } from "react";
import { SITE, absoluteUrl } from "../../config/site";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps title, description, canonical, Open Graph and Twitter tags in sync during
 * client-side navigation. The first load of every page already has these tags
 * (plus JSON-LD) baked in by the build-time pre-renderer (scripts/prerender.mjs).
 */
export default function Seo({ title, description, path = "/", noindex = false, image = SITE.ogImage }) {
  useEffect(() => {
    const url = path === "/" ? `${absoluteUrl("/").replace(/\/$/, "")}/` : absoluteUrl(path);
    const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    if (noindex) document.head.querySelector('link[rel="canonical"]')?.remove();
    else upsertCanonical(url);
  }, [title, description, path, noindex, image]);

  return null;
}
