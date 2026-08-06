import { useEffect } from 'react'
import { CheckCircle2, XCircle, Info } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const STYLES = {
  success: 'border-jade/30 text-jade bg-jade-soft/60 dark:bg-jade/10',
  error: 'border-red-300 text-red-600 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400',
  info: 'border-ink/10 text-ink bg-card dark:border-dusk-border dark:bg-dusk-card dark:text-dusk-text',
}

function ToastItem({ toast, onDismiss }) {
  const Icon = ICONS[toast.type] || Info

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onDismiss(toast.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toast.id, onDismiss])

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-center gap-2 rounded-xl border px-4 py-2.5
        shadow-soft backdrop-blur animate-toastIn ${STYLES[toast.type] || STYLES.info}`}
    >
      <Icon size={16} className="shrink-0" />
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  )
}

export default function Toast({ toasts, onDismiss }) {
  if (!toasts.length) return null

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-6 z-50 flex -translate-x-1/2 flex-col items-center gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
