import { useEffect } from "react";
import {
  SITE_NAME,
  SEO_KEYWORDS,
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  schoolJsonLd,
  faqJsonLd,
} from "../../lib/seo";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Updates document title, meta tags, Open Graph, Twitter Card, and canonical URL.
 */
export default function SEO({
  title,
  description,
  path = "/",
  keywords = SEO_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  includeFaq = false,
  breadcrumb,
}) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[name="author"]', { name: "author", content: SITE_NAME });
    upsertMeta('meta[name="geo.region"]', { name: "geo.region", content: "IN-UP" });
    upsertMeta('meta[name="geo.placename"]', { name: "geo.placename", content: "Aligarh" });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_IN" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    upsertLink("canonical", url);

    upsertJsonLd("seo-school-jsonld", schoolJsonLd());
    if (includeFaq) upsertJsonLd("seo-faq-jsonld", faqJsonLd());
    else {
      const faqEl = document.getElementById("seo-faq-jsonld");
      if (faqEl) faqEl.remove();
    }

    if (breadcrumb?.length) {
      upsertJsonLd("seo-breadcrumb-jsonld", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      });
    } else {
      const bcEl = document.getElementById("seo-breadcrumb-jsonld");
      if (bcEl) bcEl.remove();
    }
  }, [title, description, path, keywords, image, noindex, includeFaq, breadcrumb]);

  return null;
}
