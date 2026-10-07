<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Scorpion Code Web

Landing y portal corporativo de **Scorpion Code** (React + Vite + Express + Gemini).

View your app in AI Studio: https://ai.studio/apps/a5515181-4546-424c-81b3-0bca4a6682a4

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Production build

```bash
npm run build
NODE_ENV=production GEMINI_API_KEY=your_key npm start
```
