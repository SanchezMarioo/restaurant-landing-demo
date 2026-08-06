const fallbackSiteUrl = "https://lumiere.xync.es"
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
const isLocalUrl = configuredSiteUrl?.includes("localhost") || configuredSiteUrl?.includes("127.0.0.1")
const siteUrl = ((process.env.NODE_ENV === "production" && isLocalUrl) || !configuredSiteUrl
  ? fallbackSiteUrl
  : configuredSiteUrl
).replace(/\/$/, "")

export function absoluteUrl(path: string = "/") {
  return new URL(path, `${siteUrl}/`).toString()
}

export { siteUrl }
