# Verba — Text Translator

A responsive text translator built with React (Vite) and Tailwind CSS, translating
free-form text into 20 languages via a RapidAPI translation endpoint.

## Features

- Translate text into 20 languages, with full source/target swap
- Character count with a 2,000-character limit and empty-input validation
- Copy translated text to the clipboard, one click
- Translation history (last 20), stored in `localStorage`, with restore
- Light/dark mode, persisted across sessions
- Toast notifications for copy, errors, and empty input
- Keyboard shortcut: `Cmd/Ctrl + Enter` to translate
- Friendly, specific error messages for network issues, invalid keys, and rate limits

## Tech stack

- React 18 + Vite
- Tailwind CSS
- Axios
- lucide-react icons

## Getting started

```bash
npm install
cp .env.example .env
# then edit .env and paste in your RapidAPI key
npm run dev
```

The app runs at `http://localhost:5173`.

## Getting a RapidAPI key

This project uses the **Rapid Translate Multi Traduction** API on RapidAPI:

1. Go to https://rapidapi.com/gtranslate/api/rapid-translate-multi-traduction
2. Sign in and subscribe to the free tier
3. Copy your API key from the RapidAPI dashboard
4. Paste it into `.env` as `VITE_RAPID_API_KEY`

Swapping in a different RapidAPI translation endpoint later only requires
editing `src/services/translatorApi.js` — every component calls translation
through that one module.

## Project structure

```
src/
├── components/       UI components (Translator, LanguageSelector, History, etc.)
├── services/         translatorApi.js — all API calls live here
├── hooks/            useLocalStorage, useToast
├── data/             languages.js — the supported language list
├── utils/            helpers.js — clipboard, formatting, validation
├── App.jsx
├── main.jsx
└── index.css
```

## Build

```bash
npm run build
npm run preview
```

## Notes

- If `VITE_RAPID_API_KEY` is missing, the app shows a clear inline message
  instead of a raw error — translation is disabled until a key is added.
- History and theme both persist in `localStorage` under the `verba:` prefix.
