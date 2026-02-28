# Vatsal Vora - Developer Portfolio

A dynamic, full-stack personal developer portfolio built with the Next.js App Router, Tailwind CSS, and Framer Motion. This portfolio acts as a digital resume, a project showcase, and a seamless synchronized markdown digital garden powered by GitHub integrations. 

## Features

- **Modern UI & Aesthetics**: Utilizes Framer Motion for scroll animations and Aceternity UI components (Spotlight, FlipWords, Infinite Moving Cards) for premium, interactive visuals.
- **Digital Garden (Obsidian Sync)**: Natively syncs and statically generates markdown `.md` notes from a private `Obsidian_backup` GitHub repository. Includes an interactive `Cmd+K` local search and dynamic Folder-oriented categorization UI.
- **Media Integrations**: 
  - **Spotify API**: Displays recently played tracks.
  - **TMDB API**: Pulls favorite movies and latest watch activity.
  - **AniList GraphQL**: Showcases top-rated anime activity directly inside unified Media Grid components under the "Interests" page.
- **LLM-Friendly Mode**: Includes a global toggle to convert the entire application UI strictly into a raw text `<pre>` Markdown feed for AI/LLM ingestion.
- **Dark/Light Mode**: Full CSS variable theming with a persistent Floating Action Bar.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Aceternity UI](https://ui.aceternity.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Content Formatting**: React Markdown & Gray-matter
- **APIs**: GitHub REST API, Spotify Web API, TMDB API, AniList GraphQL

## Getting Started

### Prerequisites
You need a GitHub Personal Access Token (`GITHUB_TOKEN`) with `Contents: Read-only` access if you want to statically generate the private Digital Garden notes. You also need API keys for the third-party entertainment services if you fork this repository.

### Local Development

1. Clone this repository and navigate into the folder:
   ```bash
   git clone https://github.com/vatsal30/my-portfolio.git
   cd my-portfolio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file at the root of the project with your secrets:
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

## Deployment
This project is optimized for static deployment on platforms like **Vercel** or **Netlify**. Given the usage of static Next.js fetch API caching (`next: { revalidate: 3600 }`), your application will rebuild specific external data dependencies at interval borders without requiring a full manual production sweep. 

_Designed and Built by [Vatsal Vora](https://github.com/vatsal30)_
