import styled from "@emotion/styled"
import { useEffect, useState } from "react"

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const nextProgress =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, nextProgress)))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return <StyledProgress aria-hidden="true" style={{ width: `${progress}%` }} />
}

export default ReadingProgress

const StyledProgress = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndexes.header + 1};
  top: 3rem;
  left: 0;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.blue9};
  transition: width 80ms linear;
`
