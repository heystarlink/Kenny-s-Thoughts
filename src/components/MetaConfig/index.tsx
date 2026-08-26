import { CONFIG } from "site.config"
import Head from "next/head"

export type MetaConfigProps = {
  title: string
  description: string
  type: "Website" | "Post" | "Page" | string
  date?: string
  modifiedDate?: string
  image?: string
  authorName?: string
  tags?: string[]
  url: string
}

const MetaConfig: React.FC<MetaConfigProps> = (props) => {
  const isPost = props.type === "Post"
  const ogType = isPost ? "article" : "website"
  const authorName = props.authorName || CONFIG.profile.name
  const structuredData = isPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: props.title,
        description: props.description,
        url: props.url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.url,
        },
        datePublished: props.date,
        dateModified: props.modifiedDate || props.date,
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Person",
          name: CONFIG.profile.name,
          url: CONFIG.link,
        },
        image: props.image ? [props.image] : undefined,
        keywords: props.tags?.join(", "),
        inLanguage: CONFIG.lang,
      }
    : null
  const serializedStructuredData = structuredData
    ? JSON.stringify(structuredData).replace(/</g, "\\u003c")
    : ""

  return (
    <Head>
      <title>{props.title}</title>
      <meta name="robots" content="follow, index" />
      <meta charSet="UTF-8" />
      <meta name="description" content={props.description} />
      <link rel="canonical" href={props.url} />
      {/* og */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={CONFIG.blog.title} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.url} />
      {CONFIG.lang && <meta property="og:locale" content={CONFIG.lang} />}
      {props.image && <meta property="og:image" content={props.image} />}
      {/* twitter */}
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:card" content="summary_large_image" />
      {props.image && <meta name="twitter:image" content={props.image} />}
      {/* post */}
      {isPost && (
        <>
          <meta property="article:published_time" content={props.date} />
          <meta
            property="article:modified_time"
            content={props.modifiedDate || props.date}
          />
          <meta property="article:author" content={authorName} />
          {props.tags?.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
        />
      )}
    </Head>
  )
}

export default MetaConfig
