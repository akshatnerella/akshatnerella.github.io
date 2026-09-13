type LinkMeta = {
  url: string;
  title: string;
  description: string;
  hostname: string;
  faviconUrl: string | null;
  hostInitial: string;
};

function extractMeta(html: string, key: string) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].trim();
  }

  return "";
}

function extractTitle(html: string) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1]?.trim() ?? "";
}

function extractFavicon(html: string, baseUrl: string) {
  const linkMatches = html.match(/<link[^>]+rel=["']([^"']+)["'][^>]*>/gi) ?? [];

  for (const linkTag of linkMatches) {
    const relMatch = linkTag.match(/rel=["']([^"']+)["']/i);
    const hrefMatch = linkTag.match(/href=["']([^"']+)["']/i);
    const rel = relMatch?.[1]?.toLowerCase() ?? "";
    const href = hrefMatch?.[1];

    if (href && rel.includes("icon")) {
      try {
        return new URL(href, baseUrl).toString();
      } catch {
        return href;
      }
    }
  }

  try {
    return new URL("/favicon.ico", baseUrl).toString();
  } catch {
    return null;
  }
}

export async function getLinkMeta(url: string): Promise<LinkMeta> {
  const response = await fetch(url);
  const html = response.ok ? await response.text() : "";
  const title =
    extractMeta(html, "og:title") || extractTitle(html) || "Untitled link";
  const description =
    extractMeta(html, "og:description") ||
    extractMeta(html, "description") ||
    "";

  const hostname = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  const faviconUrl = extractFavicon(html, url);
  const hostInitial = hostname.charAt(0).toUpperCase();

  return {
    url,
    title,
    description,
    hostname,
    faviconUrl,
    hostInitial,
  };
}
