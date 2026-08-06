import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="relative flex h-10 w-10 items-center justify-center rounded-full
        border border-ink/10 bg-card text-ink shadow-card transition-all
        hover:scale-105 hover:border-marigold/50
        dark:border-dusk-border dark:bg-dusk-card dark:text-dusk-text dark:hover:border-marigold/50"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
