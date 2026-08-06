import axios from 'axios'

const RAPID_API_HOST = 'rapid-translate-multi-traduction.p.rapidapi.com'
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY

/**
 * Custom error type so callers (and the UI) can distinguish translation
 * failures from generic JS errors and read a user-safe message off `.message`.
 */
export class TranslationError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'TranslationError'
    this.status = status
  }
}

const client = axios.create({
  baseURL: `https://${RAPID_API_HOST}`,
  timeout: 15000,
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Host': RAPID_API_HOST,
    'X-RapidAPI-Key': RAPID_API_KEY ?? '',
  },
})

/**
 * Translates `text` from `from` to `to` (ISO 639-1 codes).
 * Throws TranslationError with a message safe to show directly in the UI.
 */
export async function translateText({ text, from = 'en', to }) {
  if (!RAPID_API_KEY) {
    throw new TranslationError(
      'Translation is not configured yet. Add your RapidAPI key to a .env file (see .env.example).'
    )
  }

  if (!text || !text.trim()) {
    throw new TranslationError('Enter some text to translate.')
  }

  if (!to) {
    throw new TranslationError('Choose a target language.')
  }

  try {
    const response = await client.post('/t', {
      from,
      to,
      q: text,
    })

    const data = response.data

    // The API can respond as a plain string, an array of strings, or
    // an object wrapping either — normalize all of them here.
    const translated = Array.isArray(data)
      ? data[0]
      : typeof data === 'string'
        ? data
        : data?.translatedText ?? data?.[0]

    if (typeof translated !== 'string' || !translated.length) {
      throw new TranslationError('The translation service returned an unexpected response.')
    }

    return translated
  } catch (error) {
    if (error instanceof TranslationError) throw error

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new TranslationError('The request timed out. Check your connection and try again.')
      }
      if (!error.response) {
        throw new TranslationError('Network error. Check your connection and try again.')
      }

      const status = error.response.status
      if (status === 401 || status === 403) {
        throw new TranslationError('Invalid or missing API key. Check your .env configuration.', status)
      }
      if (status === 429) {
        throw new TranslationError('Rate limit exceeded. Wait a moment and try again.', status)
      }
      if (status === 400) {
        throw new TranslationError('That language pair is not supported.', status)
      }
      throw new TranslationError('The translation service is currently unavailable.', status)
    }

    throw new TranslationError('Something went wrong while translating.')
  }
}
