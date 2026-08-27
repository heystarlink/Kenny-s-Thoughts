import Prism from "prismjs/prism"
import { ExtendedRecordMap } from "notion-types"

type LanguageLoader = () => Promise<unknown>

const LANGUAGE_LOADERS: Record<string, LanguageLoader> = {
  bash: () => import("prismjs/components/prism-bash.js"),
  c: () => import("prismjs/components/prism-c.js"),
  cpp: () => import("prismjs/components/prism-cpp.js"),
  csharp: () => import("prismjs/components/prism-csharp.js"),
  coffeescript: () => import("prismjs/components/prism-coffeescript.js"),
  diff: () => import("prismjs/components/prism-diff.js"),
  docker: () => import("prismjs/components/prism-docker.js"),
  fsharp: () => import("prismjs/components/prism-fsharp.js"),
  git: () => import("prismjs/components/prism-git.js"),
  go: () => import("prismjs/components/prism-go.js"),
  graphql: () => import("prismjs/components/prism-graphql.js"),
  handlebars: () => import("prismjs/components/prism-handlebars.js"),
  java: () => import("prismjs/components/prism-java.js"),
  "js-templates": () =>
    import("prismjs/components/prism-js-templates.js"),
  kotlin: () => import("prismjs/components/prism-kotlin.js"),
  less: () => import("prismjs/components/prism-less.js"),
  makefile: () => import("prismjs/components/prism-makefile.js"),
  markdown: () => import("prismjs/components/prism-markdown.js"),
  "markup-templating": () =>
    import("prismjs/components/prism-markup-templating.js"),
  objectivec: () => import("prismjs/components/prism-objectivec.js"),
  ocaml: () => import("prismjs/components/prism-ocaml.js"),
  python: () => import("prismjs/components/prism-python.js"),
  reason: () => import("prismjs/components/prism-reason.js"),
  rust: () => import("prismjs/components/prism-rust.js"),
  sass: () => import("prismjs/components/prism-sass.js"),
  scss: () => import("prismjs/components/prism-scss.js"),
  solidity: () => import("prismjs/components/prism-solidity.js"),
  sql: () => import("prismjs/components/prism-sql.js"),
  stylus: () => import("prismjs/components/prism-stylus.js"),
  swift: () => import("prismjs/components/prism-swift.js"),
  wasm: () => import("prismjs/components/prism-wasm.js"),
  yaml: () => import("prismjs/components/prism-yaml.js"),
}

const LANGUAGE_DEPENDENCIES: Record<string, string[]> = {
  cpp: ["c"],
  handlebars: ["markup-templating"],
  objectivec: ["c"],
}

const LANGUAGE_ALIASES: Record<string, string> = {
  "c#": "csharp",
  "c++": "cpp",
  dockerfile: "docker",
  "f#": "fsharp",
  html: "markup",
  "objective-c": "objectivec",
  "objective c": "objectivec",
  shell: "bash",
  sh: "bash",
  webassembly: "wasm",
  xml: "markup",
  yml: "yaml",
}

const pendingLoads = new Map<string, Promise<void>>()

const normalizeLanguage = (language: string) => {
  const normalized = language.trim().toLowerCase()
  return LANGUAGE_ALIASES[normalized] || normalized
}

const loadLanguage = async (language: string): Promise<void> => {
  const normalized = normalizeLanguage(language)
  if (Prism.languages[normalized] || !LANGUAGE_LOADERS[normalized]) return

  const pending = pendingLoads.get(normalized)
  if (pending) return pending

  const load = (async () => {
    await Promise.all(
      (LANGUAGE_DEPENDENCIES[normalized] || []).map(loadLanguage)
    )
    await LANGUAGE_LOADERS[normalized]()
  })()

  pendingLoads.set(normalized, load)
  try {
    await load
  } finally {
    pendingLoads.delete(normalized)
  }
}

export const getCodeLanguages = (recordMap: ExtendedRecordMap) => {
  const languages = Object.values(recordMap.block)
    .map((entry: any) => entry?.value?.value ?? entry?.value)
    .filter((block: any) => block?.type === "code")
    .map((block: any) => block.properties?.language?.[0]?.[0])
    .filter((language): language is string => typeof language === "string")

  return [...new Set(languages)]
}

export const loadPrismLanguages = async (languages: string[]) => {
  await Promise.all(languages.map(loadLanguage))
}
