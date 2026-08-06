import { useEffect, useState } from 'react'

/**
 * Persists state to localStorage under `key`, syncing both directions.
 * Falls back silently to in-memory state if storage is unavailable
 * (private browsing, quota exceeded, etc).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage unavailable or full — state still works for this session.
    }
  }, [key, value])

  return [value, setValue]
}
