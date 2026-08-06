import { ArrowRightLeft } from 'lucide-react'
import { LANGUAGES, SOURCE_LANGUAGE } from '../data/languages'

const ALL_LANGUAGES = [SOURCE_LANGUAGE, ...LANGUAGES]

function LanguagePicker({ value, onChange, label }) {
  return (
    <label className="flex-1">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-ink/10 bg-card
          px-4 text-sm font-medium text-ink shadow-card transition-colors
          hover:border-marigold/50 focus:border-jade
          dark:border-dusk-border dark:bg-dusk-card dark:text-dusk-text"
      >
        {ALL_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} · {lang.native}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function LanguageSelector({ sourceCode, targetCode, onSourceChange, onTargetChange, onSwap }) {
  return (
    <div className="flex items-center gap-3">
      <LanguagePicker value={sourceCode} onChange={onSourceChange} label="Source language" />

      <button
        type="button"
        onClick={onSwap}
        aria-label="Swap languages"
        title="Swap languages"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10
          bg-paper text-ink transition-transform hover:rotate-180 hover:border-jade/50 hover:text-jade
          dark:border-dusk-border dark:bg-dusk-bg dark:text-dusk-text"
      >
        <ArrowRightLeft size={15} />
      </button>

      <LanguagePicker value={targetCode} onChange={onTargetChange} label="Target language" />
    </div>
  )
}
