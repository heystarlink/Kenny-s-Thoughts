const CONFIG = {
  // profile setting (required)
  profile: {
    name: "sneezeforever",
    image: "/avatar.jpg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Java 后端工程师",
    bio: "工程实践与 Agent 落地",
    email: "heystarlink@gmail.com",
    linkedin: "",
    github: "https://github.com/heystarlink",
    instagram: "",
  },
  projects: [
    {
      name: `Geek漫游指南`,
      href: "https://github.com/heystarlink",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Geek漫游指南",
    description: "关于 Java、后端架构、工程实践与个人思考的中文博客",
    theme: "light"
  },

  // CONFIG configration (required)
  link: "https://www.k-thoughts.site",
  since: 2021, // If leave this empty, current year will be used.
  lang: "zh-CN", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash
  seo: {
    keywords : ["Blog", "Software", "Kenny", "Notion", "软件开发", "技术分享", "生活分享", "Kenny’s Thoughts", "后端", "java", "Java", "架构", "算法", "程序员"]
  },

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  bingWebmaster: {
    enable: Boolean(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION),
    config: {
      siteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
  baiduSiteVerification: {
    enable: Boolean(process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION),
    config: {
      siteVerification: process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: true,
    config: {
      host: "https://cusdis.com",
      appid: process.env.CUSDIS_APP_ID || "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 86400, // revalidate time for [slug], index
}

module.exports = { CONFIG }
