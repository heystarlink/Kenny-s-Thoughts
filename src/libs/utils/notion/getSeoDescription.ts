import { ExtendedRecordMap } from "notion-types"
import { getTextContent } from "notion-utils"

const DESCRIPTION_LENGTH = 160
const TEXT_BLOCK_TYPES = new Set([
  "text",
  "quote",
  "callout",
  "bulleted_list",
  "numbered_list",
  "toggle",
  "header",
  "sub_header",
  "sub_sub_header",
])

const shorten = (value: string) => {
  const normalized = value.replace(/\s+/g, " ").trim()
  if (normalized.length <= DESCRIPTION_LENGTH) return normalized

  return `${normalized.slice(0, DESCRIPTION_LENGTH - 3).trim()}...`
}

export default function getSeoDescription(
  recordMap: ExtendedRecordMap,
  fallback: string
) {
  const paragraphs: string[] = []

  for (const record of Object.values(recordMap.block || {})) {
    const recordValue = (record as any)?.value
    const block = recordValue?.value ?? recordValue

    if (!TEXT_BLOCK_TYPES.has(block?.type)) continue

    const text = getTextContent(block?.properties?.title || []).trim()
    if (!text) continue

    paragraphs.push(text)
    if (paragraphs.join(" ").length >= DESCRIPTION_LENGTH) break
  }

  return shorten(paragraphs.join(" ") || fallback)
}
