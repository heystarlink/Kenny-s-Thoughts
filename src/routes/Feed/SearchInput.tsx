import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"
import { Emoji } from "src/components/Emoji"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <label className="top" htmlFor="post-search">
        <Emoji>🔎</Emoji> 搜索
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
    margin-bottom: 2rem;
  }
  > .top {
    display: block;
    padding: 0.25rem;
    margin-bottom: 0.75rem;
  }
  > .mid {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-radius: 1rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.gray4};

    :focus-visible {
      background-color: ${({ theme }) => theme.colors.gray3};
    }
  }
`
