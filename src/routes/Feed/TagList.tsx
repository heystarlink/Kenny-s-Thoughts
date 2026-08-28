import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { FiTag } from "react-icons/fi"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

const TagList: React.FC<Props> = () => {
  const router = useRouter()
  const currentTag =
    typeof router.query.tag === "string" ? router.query.tag : undefined
  const data = useTagsQuery()

  const handleClickTag = (value: any) => {
    // delete
    if (currentTag === value) {
      router.push({
        query: {
          ...router.query,
          tag: undefined,
        },
      })
    }
    // add
    else {
      router.push({
        query: {
          ...router.query,
          tag: value,
        },
      })
    }
  }

  return (
    <StyledWrapper>
      <div className="top">
        <FiTag aria-hidden="true" />
        标签
      </div>
      <div className="list" aria-label="按标签筛选">
        {Object.keys(data).map((key) => (
          <button
            type="button"
            key={key}
            data-active={key === currentTag}
            aria-pressed={key === currentTag}
            aria-label={`${key}，${data[key]} 篇文章`}
            onClick={() => handleClickTag(key)}
          >
            <span>{key}</span>
            <span className="count">{data[key]}</span>
          </button>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagList

const StyledWrapper = styled.div`
  .top {
    display: none;
    gap: 0.5rem;
    align-items: center;
    padding: 0.25rem;
    margin-bottom: 0.75rem;

    @media (min-width: 1024px) {
      display: flex;
    }
  }

  .list {
    display: flex;
    margin-bottom: 1.5rem;
    gap: 0.25rem;
    overflow: scroll;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    @media (min-width: 1024px) {
      display: block;
    }

    button {
      display: inline-flex;
      gap: 0.75rem;
      align-items: center;
      justify-content: space-between;
      min-height: 2.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray10};
      flex-shrink: 0;
      cursor: pointer;
      text-align: left;

      @media (min-width: 1024px) {
        width: 100%;
      }

      .count {
        color: ${({ theme }) => theme.colors.gray9};
        font-size: 0.75rem;
        font-variant-numeric: tabular-nums;
      }

      :hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }
      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray4};
        font-weight: 600;

        .count {
          color: ${({ theme }) => theme.colors.gray11};
        }

        :hover {
          background-color: ${({ theme }) => theme.colors.gray4};
        }
      }
    }
  }
`
