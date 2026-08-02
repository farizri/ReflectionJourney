# Reflection Journey

Guided self-reflection web app for the "Journaling & Self Reflection" workshop. A calm, one-question-at-a-time journal experience inspired by Stoic, with no login, no backend, and no database — every answer stays on the participant's own device (browser `localStorage`) and is never transmitted anywhere.

See [PRD.md](./PRD.md) for the full product spec.

## Run locally

```
npm install
npm start
```

Then open http://localhost:5000 (or set `PORT` to use a different port).

## Deploy

This is a static site (`public/`) with an optional Node server (`server.js`) only used for local development. It deploys as-is to Netlify — `netlify.toml` already points the publish directory at `public/`, no build step required.

## Project structure

- `public/index.html`, `public/styles.css`, `public/app.js` — the app
- `public/questions-data.js` — question set & category copy (single source of truth)
- `public/icons.js` — custom SVG line-icon set (no emoji, no external icon fonts/CDN)
- `server.js` — static file server for local dev only
