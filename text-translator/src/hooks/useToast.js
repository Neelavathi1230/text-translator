import { useCallback, useRef, useState } from 'react'

let idCounter = 0

/**
 * Lightweight toast queue. Each call to `notify` shows a message for
 * `duration` ms, then removes itself. Multiple toasts can stack.
 */
export function useToast() {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    clearTimeout(timers.current[id])
    delete timers.current[id]
  }, [])

  const notify = useCallback(
    (message, type = 'info', duration = 3000) => {
      const id = ++idCounter
      setToasts((current) => [...current, { id, message, type }])
      timers.current[id] = setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss]
  )

  return { toasts, notify, dismiss }
}
