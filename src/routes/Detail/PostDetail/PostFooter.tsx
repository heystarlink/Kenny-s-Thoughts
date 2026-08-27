import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { FiArrowLeft, FiArrowUp } from "react-icons/fi"
import usePostQuery from "src/hooks/usePostQuery"

type Props = {}

const Footer: React.FC<Props> = () => {
  const currentPost = usePostQuery()
  const newerPost = currentPost?.navigation?.newer
  const olderPost = currentPost?.navigation?.older

  return (
    <StyledWrapper>
      {(newerPost || olderPost) && (
        <div className="adjacent">
          {newerPost ? (
            <Link href={`/${newerPost.slug}`}>
              <span>上一篇</span>
              <strong>{newerPost.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {olderPost ? (
            <Link href={`/${olderPost.slug}`} className="next">
              <span>下一篇</span>
              <strong>{olderPost.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
      <div className="actions">
        <Link href="/">
          <FiArrowLeft aria-hidden="true" />
          返回文章列表
        </Link>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FiArrowUp aria-hidden="true" />
          回到顶部
        </button>
      </div>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray6};

  .adjacent {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;

    > a {
      display: flex;
      min-height: 5.5rem;
      padding: 0.75rem;
      flex-direction: column;
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;

      span {
        margin-bottom: 0.35rem;
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.gray10};
      }

      strong {
        display: -webkit-box;
        overflow: hidden;
        line-height: 1.5rem;
        font-weight: 500;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      :hover {
        border-color: ${({ theme }) => theme.colors.gray8};
      }
    }

    > .next {
      text-align: right;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray10};

    a,
    button {
      display: inline-flex;
      gap: 0.4rem;
      align-items: center;
      padding: 0.5rem 0;

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
      }
    }
  }

  @media (max-width: 600px) {
    .adjacent {
      grid-template-columns: 1fr;

      > span {
        display: none;
      }

      > .next {
        text-align: left;
      }
    }
  }
`
