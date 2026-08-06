import { Copy } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

export default function OutputCard({ text, isLoading, error, languageName, onCopy }) {
  const isEmpty = !text && !isLoading && !error

  return (
    <div
      className="flex h-full min-h-[220px] flex-col rounded-2xl border border-ink/10 bg-card p-5
        shadow-card transition-colors dark:border-dusk-border dark:bg-dusk-card"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted dark:text-dusk-muted">
          {languageName}
        </span>
        {text && !isLoading && !error && (
          <button
            type="button"
            onClick={onCopy}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-muted
              transition-colors hover:bg-jade-soft hover:text-jade
              dark:text-dusk-muted dark:hover:bg-jade/10 dark:hover:text-jade"
          >
            <Copy size={13} />
            Copy
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-1 items-start">
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted dark:text-dusk-muted">
            <LoadingSpinner size={16} />
            Translating…
          </div>
        )}

        {!isLoading && error && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">{error}</p>
        )}

        {!isLoading && !error && isEmpty && (
          <p className="text-sm text-muted/70 dark:text-dusk-muted/70">
            Your translation will appear here.
          </p>
        )}

        {!isLoading && !error && text && (
          <p className="whitespace-pre-wrap text-base leading-relaxed animate-fadeUp">{text}</p>
        )}
      </div>
    </div>
  )
}
