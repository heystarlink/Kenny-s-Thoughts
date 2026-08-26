import { GetServerSideProps } from "next"
import { getPosts } from "src/apis"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

const buildFeed = async () => {
  const posts = filterPosts(await getPosts())
  const items = posts
    .map((post) => {
      const url = `${CONFIG.link}/${encodeURI(post.slug)}`
      const publishedAt = post.date?.start_date || post.createdTime
      const description = post.summary || post.title
      const categories = (post.tags || [])
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("")

      return `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <description>${escapeXml(description)}</description>
        <pubDate>${new Date(publishedAt).toUTCString()}</pubDate>
        ${categories}
      </item>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(CONFIG.blog.title)}</title>
    <link>${escapeXml(CONFIG.link)}</link>
    <description>${escapeXml(CONFIG.blog.description)}</description>
    <language>${escapeXml(CONFIG.lang)}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await buildFeed()

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8")
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=3600"
  )
  res.write(feed)
  res.end()

  return { props: {} }
}

const FeedXml = () => null

export default FeedXml
