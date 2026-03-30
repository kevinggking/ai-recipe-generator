# RecipeReel 🍳

**Turn any YouTube cooking video into a clean, structured recipe — instantly.**

RecipeReel is a Next.js application that lets users paste a YouTube URL and receive a fully-extracted recipe powered by Claude AI. It fetches the video transcript, analyzes it, and returns ingredients, step-by-step instructions, chef tips, and more — no manual scrubbing required.

---

## ✨ Features

- 🎬 **YouTube transcript extraction** — works with any video that has captions
- 🤖 **AI-powered parsing** — Claude extracts ingredients, steps, timing, and tips
- ⚖️ **Adjustable servings** — ingredient amounts scale automatically
- 🖨️ **Print-ready layout** — clean output with UI elements hidden
- 📋 **One-click copy** — copy the full recipe as plain text
- 🎨 **Warm editorial design** — Playfair Display + DM Sans, terracotta + sage palette

---

## 🗂 Project Structure

```
video-to-recipe/
├── app/
│   ├── api/
│   │   └── extract-recipe/
│   │       └── route.ts          # POST /api/extract-recipe
│   ├── globals.css               # Design tokens, fonts, shimmer animation
│   ├── layout.tsx                # Root layout + metadata
│   └── page.tsx                  # Main page (client state machine)
├── components/
│   ├── Hero.tsx                  # Headline + tagline
│   ├── UrlInput.tsx              # YouTube URL form
│   ├── LoadingSkeleton.tsx       # Shimmer skeleton + AI progress steps
│   ├── RecipeCard.tsx            # Full recipe display + servings scaler
│   ├── ErrorDisplay.tsx          # Error state with retry
│   └── HowItWorks.tsx           # Landing page explainer section
├── lib/
│   ├── types.ts                  # TypeScript interfaces (Recipe, Ingredient, etc.)
│   ├── youtube.ts                # URL parsing + thumbnail helpers
│   └── extractRecipe.ts          # Claude API call + prompt
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone <your-repo>
cd video-to-recipe
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔌 How It Works

```
User pastes YouTube URL
        ↓
POST /api/extract-recipe
        ↓
youtube-transcript fetches captions
        ↓
Claude (claude-sonnet-4) parses transcript → structured JSON
        ↓
RecipeCard renders with adjustable servings
```

### API Route: `POST /api/extract-recipe`

**Request body:**
```json
{ "url": "https://www.youtube.com/watch?v=..." }
```

**Success response:**
```json
{
  "success": true,
  "recipe": {
    "title": "Crispy Roast Chicken",
    "description": "...",
    "cuisine": "French",
    "difficulty": "Medium",
    "prepTime": "20 minutes",
    "cookTime": "1 hour 20 minutes",
    "totalTime": "1 hour 40 minutes",
    "servings": 4,
    "calories": 520,
    "ingredients": [
      { "amount": "1", "unit": "", "item": "whole chicken (3-4 lbs)", "notes": "pat dry" }
    ],
    "steps": [
      { "stepNumber": 1, "title": "Season the bird", "description": "...", "duration": "5 minutes", "tips": "..." }
    ],
    "tips": ["Let it rest 15 minutes before carving"],
    "tags": ["chicken", "roast", "french"],
    "videoId": "abc123",
    "videoTitle": "...",
    "thumbnailUrl": "https://img.youtube.com/vi/abc123/maxresdefault.jpg"
  }
}
```

**Error response:**
```json
{ "error": "Could not fetch transcript. The video may not have captions enabled." }
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary | Terracotta `#C4614A` |
| Secondary | Sage `#628B70` |
| Background | Cream `#FDF8EE` |
| Text | Ink `#1A1208` |
| Display font | Playfair Display |
| Body font | DM Sans |
| Mono font | JetBrains Mono |

---

## 📦 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| AI | Anthropic Claude (`claude-sonnet-4`) |
| Transcript | `youtube-transcript` |
| Icons | `lucide-react` |
| Utilities | `clsx` |

---

## ⚠️ Limitations

- Videos **must have captions** enabled (auto-generated captions work too)
- Private or age-restricted videos cannot be accessed
- Very short videos or videos with minimal spoken content may not yield a full recipe
- Results depend on how clearly the creator explains the recipe in the video

---

## 🚢 Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Add `ANTHROPIC_API_KEY` in your Vercel project's environment variables.

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📄 License

MIT — free to use, modify, and deploy.
