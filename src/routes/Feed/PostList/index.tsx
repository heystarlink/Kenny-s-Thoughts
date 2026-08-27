import { useRouter } from "next/router"
import React, { useMemo } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  const filteredPosts = useMemo(() => {
    const normalizedQuery = q.trim().toLowerCase()
    let posts = data.filter((post) => {
      const searchContent = [
        post.title,
        post.summary || "",
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase()
      return searchContent.includes(normalizedQuery)
    })

    if (currentTag) {
      posts = posts.filter((post) => post.tags?.includes(currentTag))
    }

    if (currentCategory !== DEFAULT_CATEGORY) {
      posts = posts.filter((post) => post.category?.includes(currentCategory))
    }

    return currentOrder === "desc" ? posts : [...posts].reverse()
  }, [data, q, currentTag, currentCategory, currentOrder])

  return (
    <>
      <div className="my-2">
        {!filteredPosts.length && <p role="status">没有找到匹配的文章</p>}
        {filteredPosts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
    </>
  )
}

export default PostList
