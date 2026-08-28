import { TCategories } from "src/types"
import React from "react"
import CategorySelect from "./CategorySelect"
import OrderButtons from "./OrderButtons"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

type Props = {}

const FeedHeader: React.FC<Props> = () => {
  const router = useRouter()
  const isFeatured = router.query.tag === "推荐"

  const handleFeaturedToggle = () => {
    router.push({
      query: {
        ...router.query,
        tag: isFeatured ? undefined : "推荐",
      },
    })
  }

  return (
    <StyledWrapper>
      <div className="filters">
        <CategorySelect />
        <button
          type="button"
          className="featured"
          data-active={isFeatured}
          aria-pressed={isFeatured}
          onClick={handleFeaturedToggle}
        >
          精选
        </button>
      </div>
      <OrderButtons />
    </StyledWrapper>
  )
}

export default FeedHeader

const StyledWrapper = styled.div`
  display: flex;
  padding-bottom: 0.5rem;
  margin-bottom: 1.25rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};

  .filters {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .featured {
    padding: 0.35rem 0.65rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.375rem;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.gray10};
    cursor: pointer;

    :hover,
    &[data-active="true"] {
      border-color: ${({ theme }) => theme.colors.gray8};
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray4};
    }

    &[data-active="true"] {
      font-weight: 600;
    }
  }
`
