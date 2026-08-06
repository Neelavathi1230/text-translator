import { useCallback, useMemo, useState } from 'react'
import { Eraser, SendHorizontal } from 'lucide-react'
import LanguageSelector from './LanguageSelector'
import OutputCard from './OutputCard'
import LoadingSpinner from './LoadingSpinner'
import History from './History'
import { translateText, TranslationError } from '../services/translatorApi'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getLanguageByCode, SOURCE_LANGUAGE } from '../data/languages'
import { MAX_CHARACTERS, copyToClipboard, isBlank } from '../utils/helpers'

const HISTORY_LIMIT = 20

export default function Translator({ notify }) {
  const [sourceCode, setSourceCode] = useState(SOURCE_LANGUAGE.code)
  const [targetCode, setTargetCode] = useState('es')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useLocalStorage('verba:history', [])

  const sourceLang = getLanguageByCode(sourceCode)
  const targetLang = getLanguageByCode(targetCode)
  const charCount = inputText.length
  const overLimit = charCount > MAX_CHARACTERS

  const canTranslate = useMemo(
    () => !isBlank(inputText) && !overLimit && !isLoading,
    [inputText, overLimit, isLoading]
  )

  const handleTranslate = useCallback(async () => {
    if (isBlank(inputText)) {
      setError('Enter some text to translate.')
      notify('Enter some text before translating.', 'error')
      return
    }
    if (overLimit) {
      notify(`Keep it under ${MAX_CHARACTERS} characters.`, 'error')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await translateText({ text: inputText, from: sourceCode, to: targetCode })
      setOutputText(result)

      const entry = {
        id: `${Date.now()}`,
        sourceText: inputText,
        translatedText: result,
        sourceLangCode: sourceCode,
        targetLangCode: targetCode,
        sourceLangName: sourceLang?.name ?? sourceCode,
        targetLangName: targetLang?.name ?? targetCode,
        timestamp: new Date().toISOString(),
      }
      setHistory((current) => [entry, ...current].slice(0, HISTORY_LIMIT))
    } catch (err) {
      const message = err instanceof TranslationError ? err.message : 'Something went wrong. Try again.'
      setError(message)
      setOutputText('')
      notify(message, 'error')
    } finally {
      setIsLoading(false)
    }
  }, [inputText, overLimit, sourceCode, targetCode, sourceLang, targetLang, notify, setHistory])

  const handleClear = useCallback(() => {
    setInputText('')
    setOutputText('')
    setError('')
  }, [])

  const handleSwap = useCallback(() => {
    setSourceCode(targetCode)
    setTargetCode(sourceCode)
    setInputText(outputText)
    setOutputText(inputText)
    setError('')
  }, [sourceCode, targetCode, inputText, outputText])

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(outputText)
      notify('Copied to clipboard.', 'success')
    } catch {
      notify('Could not copy. Try selecting the text manually.', 'error')
    }
  }, [outputText, notify])

  const handleRestore = useCallback((entry) => {
    setSourceCode(entry.sourceLangCode)
    setTargetCode(entry.targetLangCode)
    setInputText(entry.sourceText)
    setOutputText(entry.translatedText)
    setError('')
  }, [])

  const handleClearHistory = useCallback(() => {
    setHistory([])
    notify('History cleared.', 'info')
  }, [setHistory, notify])

  const handleKeyDown = useCallback(
    (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault()
        handleTranslate()
      }
    },
    [handleTranslate]
  )

  return (
    <section className="mx-auto w-full max-w-4xl px-6 sm:px-8">
      <div className="mt-8 text-center sm:mt-12">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Say it in another language
        </h2>
        <p className="mt-2 text-sm text-muted dark:text-dusk-muted">
          Type once, read it back in twenty scripts.
        </p>
      </div>

      <div className="mt-8">
        <LanguageSelector
          sourceCode={sourceCode}
          targetCode={targetCode}
          onSourceChange={setSourceCode}
          onTargetChange={setTargetCode}
          onSwap={handleSwap}
        />
      </div>

      <div className="relative mt-2 h-1 overflow-hidden rounded-full">
        <div className="seam-gradient h-full w-full animate-seam opacity-70" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div
          className="flex h-full min-h-[220px] flex-col rounded-2xl border border-ink/10 bg-card p-5
            shadow-card transition-colors dark:border-dusk-border dark:bg-dusk-card"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-muted dark:text-dusk-muted">
              {sourceLang?.name ?? 'Source'}
            </span>
            <span className={`text-xs font-medium ${overLimit ? 'text-red-500' : 'text-muted dark:text-dusk-muted'}`}>
              {charCount}/{MAX_CHARACTERS}
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARACTERS + 200}
            placeholder="Start typing…"
            aria-label={`Text to translate from ${sourceLang?.name ?? 'source language'}`}
            className="mt-3 flex-1 resize-none bg-transparent text-base leading-relaxed text-ink
              placeholder:text-muted/50 focus:outline-none
              dark:text-dusk-text dark:placeholder:text-dusk-muted/50"
          />

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-ink/5 pt-3 dark:border-dusk-border">
            <button
              type="button"
              onClick={handleClear}
              disabled={!inputText && !outputText}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-muted
                transition-colors hover:bg-ink/5 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40
                dark:text-dusk-muted dark:hover:bg-white/5 dark:hover:text-dusk-text"
            >
              <Eraser size={13} />
              Clear
            </button>

            <button
              type="button"
              onClick={handleTranslate}
              disabled={!canTranslate}
              className="flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper
                shadow-soft transition-all hover:bg-jade disabled:cursor-not-allowed disabled:opacity-40
                disabled:hover:bg-ink dark:bg-marigold dark:text-ink dark:hover:bg-jade dark:hover:text-paper"
            >
              {isLoading ? <LoadingSpinner size={15} /> : <SendHorizontal size={15} />}
              Translate
            </button>
          </div>
        </div>

        <OutputCard
          text={outputText}
          isLoading={isLoading}
          error={error}
          languageName={targetLang?.name ?? 'Translation'}
          onCopy={handleCopy}
        />
      </div>

      <History items={history} onRestore={handleRestore} onClear={handleClearHistory} />
    </section>
  )
}
