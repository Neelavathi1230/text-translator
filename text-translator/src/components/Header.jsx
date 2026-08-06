import { Languages } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 pt-10 sm:px-8">
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-marigold
            shadow-soft dark:bg-dusk-card dark:text-marigold"
        >
          <Languages size={20} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold leading-none tracking-tight">
            Verba
          </h1>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-muted dark:text-dusk-muted">
            Text Translator
          </p>
        </div>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}
