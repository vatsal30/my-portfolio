# 🚀 My Portfolio (and maybe yours too?)

Hey there! Welcome to my little corner of the internet. This is a high-performance, feature-packed portfolio built with Next.js 15, Tailwind CSS, and Framer Motion.

I built this to be more than just a resume—it's a workspace and a living profile. It's got aura effects, live integrations with my favorite services, an LLM-friendly mode, and a bunch of personality baked in. If you like what you see, feel free to fork it and turn it into your own home on the web!

## ✨ Cool Stuff Inside

- 🎵 **Real-time Vibe**: Includes a Spotify "Now Playing" widget so everyone knows what you're jamming to.
- 🌌 **Aura Mode**: Click your profile photo and watch zen-like circular waves ripple across the page, complete with a starry background and glowing borders. Pure vibe.
- 🛠️ **Productivity Suite**: A built-in Pomodoro timer and Ambient Noise generator (Rain, White Noise, etc.) to help you (or your visitors) stay in the zone.
- ✍️ **Notes / Digital Garden**: Full Markdown support synced from your Obsidian vault via GitHub. Includes a `Cmd+K` local search and folder-based categorization.
- 📊 **Live Data**: Integrations with GitHub (contributions), AniList (anime tracking), and TMDB (movies).
- 🤖 **LLM-Friendly Mode**: A global toggle that strips the entire UI down to a raw Markdown feed for AI/LLM ingestion.
- 🌗 **Theme Support**: Clean Dark/Light mode toggle with correct system-preference detection on first load.
- 🎭 **Smooth Motion**: Powered by Framer Motion for scroll animations, hover effects, and premium micro-interactions.
- 🔢 **Abacus Widget**: A fun persistent click counter — tracks your own clicks locally and a global count via API.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion & Aceternity UI
- **Icons**: Lucide React & React Icons & Simple Icons CDN
- **Content**: Local TypeScript files & Markdown
- **APIs**: Spotify, GitHub, TMDB, AniList GraphQL

## 🚀 Getting Started

### Prerequisites

You need a GitHub Personal Access Token (`GITHUB_TOKEN`) with `Contents: Read-only` access if you want to statically generate the private Digital Garden notes. You also need API keys for the third-party entertainment services if you fork this repository.

### Setup

1. Clone this repository and navigate into the folder:
   ```bash
   git clone https://github.com/vatsal30/my-portfolio.git
   cd my-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup your `.env` file:
   You'll need a few API keys if you want the Spotify and GitHub widgets to work

   ```env
   # GitHub (Needed for Digital Garden)
   GITHUB_TOKEN=ghp_...

   # Spotify
   SPOTIFY_CLIENT_ID=...
   SPOTIFY_CLIENT_SECRET=...
   SPOTIFY_REFRESH_TOKEN=...

   # TMDB
   TMDB_API_KEY=...
   TMDB_READ_TOKEN=...
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Make it Yours

I've kept content separated so you don't have to dig through complex components to update your details. Just head over to the `/content` folder:

- `career.ts` — Update your work history.
- `projects.ts` — Show off your best work. Update `outputFile` names to match your repos.
- `skills.ts` — List your tech stack (supports custom `iconUrl` for tools not in SimpleIcons).
- `testimonials.ts` — Add some nice things people have said about you.

## 🖼️ Project Card Images

Project cards use **static pre-generated PNG thumbnails** instead of live API calls, keeping page loads fast. Run this once to generate them (and again any time you update projects or want fresh star counts):

```bash
npm run gen:projects
```

This uses Puppeteer to render and screenshot each card with live GitHub star counts, saving them to `public/projects/`. Puppeteer is already installed as a dev dependency.

> If you fork this, update the `projects` array in `utils/generate-project-images.js` to match your own repos.

## 🚢 Deployment

Optimized for **Vercel** or **Netlify**. The app uses Next.js ISR (`next: { revalidate: 3600 }`) so external data like GitHub activity updates automatically without a full redeploy. Remember to commit your generated images in `public/projects/` before deploying.

## 🤝 Contributing

This is an open-source project! If you find a bug or have a cool idea for a new widget, feel free to open a PR. Let's build something cool together.

## 📜 License

MIT License — feel free to use it for your own personal portfolio!

---

## 💡 Inspirations & Shoutouts

The minimalist, terminal-driven aesthetic of this portfolio was heavily inspired by some incredible engineers and designers:

- [Aditya Patil](https://adityapatil.dev)
- [Jason Cameron](https://jasoncameron.dev)
- [Prasoon](https://prasoon.dev)
- [Aceternity UI](https://ui.aceternity.com/)
