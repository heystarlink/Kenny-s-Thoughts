import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import Prism from "prismjs/prism"
import {
  getCodeLanguages,
  loadPrismLanguages,
} from "src/libs/prism/loadLanguages"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const languages = useMemo(() => getCodeLanguages(recordMap), [recordMap])
  const [languagesReady, setLanguagesReady] = useState(false)

  useEffect(() => {
    let active = true
    setLanguagesReady(false)

    loadPrismLanguages(languages).then(() => {
      if (active) setLanguagesReady(true)
    })

    return () => {
      active = false
    }
  }, [languages])

  useEffect(() => {
    if (!languagesReady || !wrapperRef.current) return

    const frame = requestAnimationFrame(() => {
      if (wrapperRef.current) Prism.highlightAllUnder(wrapperRef.current)
    })

    return () => cancelAnimationFrame(frame)
  }, [languagesReady, recordMap])

  return (
    <StyledWrapper ref={wrapperRef}>
      {languagesReady && (
        <_NotionRenderer
          darkMode={scheme === "dark"}
          recordMap={recordMap}
          components={{
            Code,
            Collection,
            Equation,
            Modal,
            Pdf,
            nextImage: Image,
            nextLink: Link,
          }}
          mapPageUrl={mapPageUrl}
        />
      )}
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
  }
`
