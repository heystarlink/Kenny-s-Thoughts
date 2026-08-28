import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { ExtendedRecordMap } from "notion-types"
import { getBlockValue, getPageTableOfContents, uuidToId } from "notion-utils"
import { FiChevronDown, FiList } from "react-icons/fi"

type Props = {
  recordMap: ExtendedRecordMap
  variant: "desktop" | "mobile"
}

const TableOfContents = ({ recordMap, variant }: Props) => {
  const rootId = Object.keys(recordMap.block)[0]
  const rootBlock = rootId ? getBlockValue(recordMap.block[rootId]) : null
  const items =
    rootBlock?.type === "page"
      ? getPageTableOfContents(rootBlock, recordMap)
      : []

  if (items.length < 3) return null

  const links = (
    <nav aria-label="本文目录">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${uuidToId(item.id)}`}
          style={{ paddingLeft: `${item.indentLevel * 0.75}rem` }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )

  if (variant === "mobile") {
    return (
      <StyledMobile>
        <details>
          <summary>
            <FiList aria-hidden="true" />
            本文目录
            <FiChevronDown className="chevron" aria-hidden="true" />
          </summary>
          {links}
        </details>
      </StyledMobile>
    )
  }

  return (
    <StyledDesktop>
      <div className="title">
        <FiList aria-hidden="true" />
        本文目录
      </div>
      {links}
    </StyledDesktop>
  )
}

export default TableOfContents

const tocLinks = css`
  nav {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  nav a {
    display: block;
    padding-top: 0.35rem;
    padding-right: 0.4rem;
    padding-bottom: 0.35rem;
    overflow: hidden;
    border-radius: 0.375rem;
    font-size: 0.8125rem;
    line-height: 1.35rem;
    color: var(--toc-color);
    text-overflow: ellipsis;
  }

  nav a:hover {
    color: var(--toc-active-color);
  }
`

const StyledDesktop = styled.aside`
  --toc-color: ${({ theme }) => theme.colors.gray10};
  --toc-active-color: ${({ theme }) => theme.colors.gray12};

  display: none;

  @media (min-width: 1024px) {
    display: block;
    position: sticky;
    top: 5rem;
    align-self: start;
    max-height: calc(100vh - 7rem);
    padding-left: 1.5rem;
    overflow-y: auto;
    border-left: 1px solid ${({ theme }) => theme.colors.gray6};
  }

  .title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  nav a:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }

  ${tocLinks}
`

const StyledMobile = styled.div`
  --toc-color: ${({ theme }) => theme.colors.gray10};
  --toc-active-color: ${({ theme }) => theme.colors.gray12};

  margin: 1.5rem 0;

  @media (min-width: 1024px) {
    display: none;
  }

  details {
    padding: 0.75rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.gray3};
  }

  summary {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  .chevron {
    margin-left: auto;
    transition: transform 150ms ease;
  }

  details[open] .chevron {
    transform: rotate(180deg);
  }

  nav a:hover {
    background-color: ${({ theme }) => theme.colors.gray4};
  }

  nav {
    margin-top: 0.75rem;
  }

  ${tocLinks}
`
