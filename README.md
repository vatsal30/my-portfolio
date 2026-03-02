# 🚀 My Portfolio (and maybe yours too?)

Hey there! Welcome to my little corner of the internet. This is a high-performance, feature-packed portfolio built with Next.js 15, Tailwind CSS, and Framer Motion.

I built this to be more than just a resume—it’s a workspace. It’s got a Pomodoro timer, ambient noise generators, and live integrations with my favorite services. If you like what you see, feel free to fork it and turn it into your own home on the web!

## ✨ Cool Stuff Inside

- 🎵 Real-time Vibe: Includes a Spotify "Now Playing" widget so everyone knows what you're jamming to.
- 🛠️ Productivity Suite: A built-in Pomodoro timer and Ambient Noise generator (Rain, White Noise, etc.) to help you (or your visitors) stay in the zone.
- ✍️ Notes/Blog: Full Markdown support for writing down your thoughts or technical tutorials.
- 📊 Live Data: Integrations with GitHub (contributions), AniList (anime tracking), and TMDB (movies).
- 🌗 Theme Support: Clean Dark/Light mode toggle that actually looks good.
- 🎭 Smooth Motion: Powered by Framer Motion and Aceternity UI components for that premium feel.

## 🛠️ Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React
- Content: Local TypeScript files & Markdown

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
3. Setup your .env file:
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

I've kept the content separated so you don't have to dig through complex components to change your name or projects. Just head over to the `/content` folder:
- `career.ts`: Update your work history.
- `projects.ts`: Show off your best work.
- `skills.ts`: List your tech stack.
- `testimonials.ts`: Add some nice things people have said about you.
  
## 🤝 Contributing

This is an open-source project! If you find a bug or have a cool idea for a new widget (maybe a weather app or a crypto tracker?), feel free to open a PR. Let's build something cool together.

## 📜 License

This project is licensed under the MIT License - feel free to use it for your own personal portfolio!
