// helpers to persist filters in URL
export function parseQS(search) {
  const p = new URLSearchParams(search)
  const obj = {}
  for (const [k,v] of p.entries()) {
    if (v.includes(',')) obj[k] = v.split(',')
    else obj[k] = v
  }
  return obj
}

export function buildQS(obj) {
  const p = new URLSearchParams()
  Object.entries(obj).forEach(([k,v]) => {
    if (v == null || v === '') return
    if (Array.isArray(v)) p.set(k, v.join(','))
    else p.set(k, String(v))
  })
  return p.toString() ? `?${p.toString()}` : ''
}
