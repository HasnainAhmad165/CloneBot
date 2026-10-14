import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

const STORAGE_PREFIX = 'clonebot.demo.v1.'

/** Load a value saved by this browser, falling back to the supplied demo data. */
export function useMockStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const storageKey = `${STORAGE_PREFIX}${key}`
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      return saved === null ? initialValue : (JSON.parse(saved) as T)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value))
    } catch {
      // Keep the prototype usable if browser storage is disabled or full.
    }
  }, [storageKey, value])

  return [value, setValue]
}

/** Clear this prototype's saved data without affecting other websites. */
export function clearMockStorage() {
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith(STORAGE_PREFIX)) window.localStorage.removeItem(key)
    }
  } catch {
    // Ignore browser storage restrictions; a reload still restores the defaults.
  }
}
