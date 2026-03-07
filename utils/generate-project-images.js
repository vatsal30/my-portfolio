/**
 * Project Image Generator Script
 *
 * Usage:
 * 1. Install dependencies: npm install -D puppeteer
 * 2. Run this script: node utils/generate-project-images.js
 *
 * This script automates generation of Mac Terminal style GitHub project cards
 * to serve as preview images for the portfolio.
 */

const fs = require("fs");
const path = require("path");

// To run this script, uncomment the require statement and install puppeteer
// const puppeteer = require('puppeteer');

const projects = [
  {
    owner: "vatsal30",
    repo: "my-portfolio",
    description:
      "My personal developer portfolio built with Next.js and Tailwind.",
    stars: 42,
    output: "public/projects/my-portfolio.png",
  },
  {
    owner: "vatsal30",
    repo: "LeetCode",
    description: "My daily LeetCode algorithms and data structures journal.",
    stars: 12,
    output: "public/projects/leetcode.png",
  },
];

async function generateImages() {
  console.log("Image generation script initialized.");
  console.log(
    "To fully enable actual PNG generation, please run: npm install -D puppeteer",
  );
  console.log("Then uncomment the puppeteer blocks in this script.");

  /*
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Standard OG Image dimensions 1200x630
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  
  // Ensure output directory exists
  const publicProjectsDir = path.join(process.cwd(), 'public', 'projects');
  if (!fs.existsSync(publicProjectsDir)) {
      fs.mkdirSync(publicProjectsDir, { recursive: true });
  }

  for (const proj of projects) {
      const html = `
      <!DOCTYPE html>
      <html>
        <body style="background: #94a3b8; color: white; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; box-sizing: border-box;">
          <div style="width: 1000px; height: 500px; background: #27272a; border-radius: 20px; box-shadow: 0 40px 60px rgba(0,0,0,0.4); border: 2px solid #3f3f46; display: flex; flex-direction: column; overflow: hidden; position: relative;">
             <!-- Terminal Header (Traffic Lights & Stars) -->
             <div style="padding: 24px 30px; display: flex; align-items: center; justify-content: space-between;">
               <div style="display: flex; gap: 10px;">
                 <div style="width: 18px; height: 18px; border-radius: 50%; background: #ef4444"></div>
                 <div style="width: 18px; height: 18px; border-radius: 50%; background: #eab308"></div>
                 <div style="width: 18px; height: 18px; border-radius: 50%; background: #22c55e"></div>
               </div>
               <div style="display: flex; align-items: center; gap: 8px; color: #d4d4d8; font-size: 24px;">
                 <span>${proj.stars}</span>
                 <!-- SVG Star -->
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
               </div>
             </div>
             
             <!-- Content -->
             <div style="padding: 20px 40px; flex-grow: 1;">
                <h1 style="font-size: 44px; font-family: monospace; color: #e879f9; margin: 0; margin-bottom: 24px;">
                    ${proj.owner} <span style="color: #71717a">/</span> <span style="color: #4ade80">${proj.repo}</span>
                </h1>
                <p style="font-size: 36px; color: #f4f4f5; margin: 0; font-family: monospace; line-height: 1.5;">
                    ${proj.description}
                </p>
             </div>
             
             <!-- Footer (Watermark / Avatar Placeholder) -->
             <div style="padding: 30px 40px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: #3f3f46; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; color: #71717a">VV</div>
                <div style="color: #71717a; font-size: 28px; font-weight: bold; opacity: 0.6; font-family: sans-serif;">
                    VatsalVora
                </div>
             </div>
          </div>
        </body>
      </html>
      `;
      await page.setContent(html);
      const outputPath = path.join(process.cwd(), proj.output);
      await page.screenshot({ path: outputPath });
      console.log(`Generated image successfully at: ${proj.output}`);
  }
  await browser.close();
  */
}

generateImages();
