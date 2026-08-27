export function formatDate(date: any, local: any) {
  const d = new Date(date)
  const options: any = { year: "numeric", month: "short", day: "numeric" }
  const res = d.toLocaleDateString(local, options)
  return res
}

export function resolveExternalUrl(value: string, baseUrl: string) {
  if (/^https?:\/\//i.test(value)) return value
  return `${baseUrl}${value.replace(/^\/+/, "")}`
}
