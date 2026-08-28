import useDropdown from "src/hooks/useDropdown"
import { useRouter } from "next/router"
import React from "react"
import { MdExpandMore } from "react-icons/md"
import { DEFAULT_CATEGORY } from "src/constants"
import styled from "@emotion/styled"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"
import { getCategoryLabel } from "src/components/Category/constants"

type Props = {}

const CategorySelect: React.FC<Props> = () => {
  const router = useRouter()
  const data = useCategoriesQuery()
  const [dropdownRef, opened, toggle, close] = useDropdown()

  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleOptionClick = (category: string) => {
    close()
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
  }
  return (
    <StyledWrapper ref={dropdownRef}>
      <button
        type="button"
        className="wrapper"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={opened}
      >
        {currentCategory === DEFAULT_CATEGORY
          ? "全部分类"
          : getCategoryLabel(currentCategory)}
        <MdExpandMore aria-hidden="true" />
      </button>
      {opened && (
        <div className="content" role="menu">
          {Object.keys(data).map((key) => (
            <button
              type="button"
              role="menuitem"
              className="item"
              key={key}
              onClick={() => handleOptionClick(key)}
            >
              {`${
                key === DEFAULT_CATEGORY ? "全部" : getCategoryLabel(key)
              } (${data[key]})`}
            </button>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default CategorySelect

const StyledWrapper = styled.div`
  position: relative;
  > .wrapper {
    display: flex;
    margin: 0.25rem 0;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-weight: 700;
    cursor: pointer;

    svg {
      transition: transform 150ms ease;
    }

    &[aria-expanded="true"] svg {
      transform: rotate(180deg);
    }
  }
  > .content {
    position: absolute;
    z-index: 40;
    padding: 0.25rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray10};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    > .item {
      display: block;
      width: 100%;
      padding: 0.25rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;
      text-align: left;

      :hover {
        background-color: ${({ theme }) => theme.colors.gray4};
      }
    }
  }
`
