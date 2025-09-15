import { useState } from 'react'

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  const set = (val) => {
    setState(val)
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch {}
  }
  return [state, set]
}
