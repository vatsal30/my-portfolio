/**
 * Project Card Image Generator
 *
 * Generates static PNG preview images for each project card.
 * Run this script periodically to refresh star counts and thumbnails.
 *
 * Usage:
 *   node utils/generate-project-images.js
 *
 * Prerequisites (one-time setup):
 *   npm install -D puppeteer
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const puppeteer = require("puppeteer");

// ─── Config ───────────────────────────────────────────────────────────────────

const OUTPUT_DIR = path.join(process.cwd(), "public", "projects");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

const projects = [
  {
    owner: "vatsal30",
    repo: "my-portfolio",
    description:
      "My personal developer portfolio — a digital workspace with aura effects, Spotify/TMDB integrations, and an LLM-friendly markdown view.",
    outputFile: "my-portfolio.png",
  },
  {
    owner: "vatsal30",
    repo: "Melanoma-Detection",
    description:
      "A CNN-based melanoma detection model that classifies skin lesions from dermoscopic images with high accuracy.",
    outputFile: "melanoma-detection.png",
  },
  {
    owner: "vatsal30",
    repo: "LeetCode",
    description:
      "A well-organized collection of optimized DSA solutions across topics — from Trees & Graphs to segment trees.",
    outputFile: "leetcode.png",
  },
  {
    owner: "vatsal30",
    repo: "Advent-of-Code",
    description:
      "My solutions to the annual Advent of Code — sometimes elegant, sometimes brute-forced, always fun.",
    outputFile: "advent-of-code.png",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fetchStars(owner, repo) {
  return new Promise((resolve) => {
    const options = {
      hostname: "api.github.com",
      path: `/repos/${owner}/${repo}`,
      headers: {
        "User-Agent": "portfolio-image-generator",
        ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
      },
    };
    https
      .get(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data).stargazers_count ?? 0);
          } catch {
            resolve(0);
          }
        });
      })
      .on("error", () => resolve(0));
  });
}

function buildHtml(owner, repo, description, stars) {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:48px;background:#94a3b8;display:flex;align-items:center;justify-content:center;height:100vh;box-sizing:border-box;">
  <div style="width:900px;background:#1c1c22;border-radius:20px;box-shadow:0 40px 80px rgba(0,0,0,0.5);border:1px solid #3f3f46;overflow:hidden;font-family:monospace;">

    <!-- Traffic lights + stars -->
    <div style="padding:16px 28px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.06);">
      <div style="display:flex;gap:10px;">
        <div style="width:14px;height:14px;border-radius:50%;background:#ef4444;"></div>
        <div style="width:14px;height:14px;border-radius:50%;background:#eab308;"></div>
        <div style="width:14px;height:14px;border-radius:50%;background:#22c55e;"></div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;color:#d4d4d8;font-size:20px;">
        <span>${stars}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div style="padding:32px 40px 40px;">
      <h1 style="font-size:34px;color:#e879f9;margin:0 0 18px;font-weight:600;">
        ${owner} <span style="color:#52525b;">/</span> <span style="color:#4ade80;">${repo}</span>
      </h1>
      <p style="font-size:24px;color:#d4d4d8;margin:0;line-height:1.6;">
        ${description}
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  for (const proj of projects) {
    process.stdout.write(`Generating ${proj.repo}... `);

    const stars = await fetchStars(proj.owner, proj.repo);
    await page.setContent(
      buildHtml(proj.owner, proj.repo, proj.description, stars),
    );
    await page.waitForNetworkIdle({ timeout: 3000 }).catch(() => {});

    const outputPath = path.join(OUTPUT_DIR, proj.outputFile);
    await page.screenshot({ path: outputPath });
    console.log(`✓  ${proj.outputFile} (${stars} ⭐)`);
  }

  await browser.close();
  console.log(`\nDone! Images saved to public/projects/`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  console.error("\nMake sure puppeteer is installed: npm install -D puppeteer");
  process.exit(1);
});
