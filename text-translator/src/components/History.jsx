import { Trash2, RotateCcw, Clock } from 'lucide-react'
import { formatTimestamp, truncate } from '../utils/helpers'

export default function History({ items, onRestore, onClear }) {
  if (!items.length) return null

  return (
    <section className="mt-10 animate-fadeUp">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
          <Clock size={16} className="text-marigold" />
          Recent translations
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-muted
            transition-colors hover:bg-red-50 hover:text-red-500
            dark:text-dusk-muted dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <Trash2 size={13} />
          Clear all
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onRestore(item)}
              className="group flex w-full items-center justify-between gap-4 rounded-xl border border-ink/10
                bg-card px-4 py-3 text-left shadow-card transition-colors hover:border-jade/40
                dark:border-dusk-border dark:bg-dusk-card"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-ink dark:text-dusk-text">
                  {truncate(item.sourceText, 70)}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted dark:text-dusk-muted">
                  {truncate(item.translatedText, 70)}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-muted/70 dark:text-dusk-muted/70">
                  {item.sourceLangName} → {item.targetLangName} · {formatTimestamp(item.timestamp)}
                </p>
              </div>
              <RotateCcw
                size={15}
                className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100 dark:text-dusk-muted"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
