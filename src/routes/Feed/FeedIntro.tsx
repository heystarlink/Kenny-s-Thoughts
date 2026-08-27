import styled from "@emotion/styled"
import { CONFIG } from "site.config"
import usePostsQuery from "src/hooks/usePostsQuery"

const FeedIntro = () => {
  const posts = usePostsQuery()

  return (
    <StyledWrapper aria-labelledby="feed-title">
      <div>
        <h1 id="feed-title">{CONFIG.blog.title}</h1>
        <p>{CONFIG.blog.description}</p>
      </div>
      <span>{posts.length} 篇文章</span>
    </StyledWrapper>
  )
}

export default FeedIntro

const StyledWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.25rem 0.25rem 1.5rem;

  h1 {
    margin-bottom: 0.35rem;
    font-size: 1.75rem;
    line-height: 2.25rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    max-width: 34rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.gray11};
  }

  > span {
    flex-shrink: 0;
    padding-bottom: 0.2rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray10};
  }

  @media (max-width: 600px) {
    display: block;
    padding-bottom: 1.25rem;

    h1 {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    > span {
      display: block;
      margin-top: 0.5rem;
    }
  }
`
