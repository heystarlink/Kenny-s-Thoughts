const { CONFIG } = require("./site.config")
const fs = require("fs")
const path = require("path")

const getPostDates = () => {
  try {
    const indexData = JSON.parse(
      fs.readFileSync(path.join(__dirname, ".next/server/pages/index.json"))
    )
    const posts = indexData.pageProps.dehydratedState.queries.find(
      (query) => query.queryKey?.[0] === "posts"
    )?.state.data
    const dates = new Map()

    for (const post of posts || []) {
      const date = post.updatedTime || post.date?.start_date || post.createdTime
      dates.set(`/${post.slug}`, new Date(date).toISOString())
    }

    return dates
  } catch (error) {
    console.warn("Unable to read post dates for sitemap:", error.message)
    return new Map()
  }
}

const postDates = getPostDates()
const latestPostDate = Array.from(postDates.values()).sort().at(-1)

module.exports = {
  siteUrl: CONFIG.link,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  autoLastmod: false,
  exclude: ["/404", "/feed", "/feed.xml"],
  transform: async (_, route) => ({
    loc: encodeURI(route),
    lastmod: route === "/" ? latestPostDate : postDates.get(route),
    changefreq: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }),
}
