import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"
import { FiSearch } from "react-icons/fi"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <label className="top" htmlFor="post-search">
        <FiSearch aria-hidden="true" />
        搜索
      </label>
      <input
        id="post-search"
        className="mid"
        type="text"
        placeholder="搜索标题、摘要或标签"
        {...props}
      />
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 1.75rem;
  }
  > .top {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.25rem 0;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }
  > .mid {
    min-height: 2.75rem;
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray4};

    :focus-visible {
      border-color: ${({ theme }) => theme.colors.blue8};
      background-color: ${({ theme }) => theme.colors.gray3};
    }
  }
`
