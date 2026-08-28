import styled from "@emotion/styled"
import React from "react"
import { FiMoon, FiSun } from "react-icons/fi"
import useScheme from "src/hooks/useScheme"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()

  const handleClick = () => {
    setScheme(scheme === "light" ? "dark" : "light")
  }

  const label = scheme === "light" ? "切换到深色模式" : "切换到浅色模式"

  return (
    <StyledWrapper
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
    >
      {scheme === "light" ? <FiSun /> : <FiMoon />}
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.375rem;
  color: ${({ theme }) => theme.colors.gray11};

  :hover {
    color: ${({ theme }) => theme.colors.gray12};
    background-color: ${({ theme }) => theme.colors.gray4};
  }
`
