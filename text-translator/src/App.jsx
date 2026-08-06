import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Translator from './components/Translator'
import Toast from './components/Toast'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useToast } from './hooks/useToast'

export default function App() {
  const [theme, setTheme] = useLocalStorage('verba:theme', 'light')
  const { toasts, notify, dismiss } = useToast()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-ink transition-colors duration-300 dark:bg-dusk-bg dark:text-dusk-text">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60 dark:opacity-30"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(232,163,61,0.16), rgba(31,157,138,0.08) 45%, transparent 75%)',
        }}
      />
      <Toast toasts={toasts} onDismiss={dismiss} />
      <div className="relative">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Translator notify={notify} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
