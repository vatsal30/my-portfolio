"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal component that injects copy buttons into all <pre> code blocks.
 * Works like GitHub's README preview — no component overrides needed.
 * Just place this inside the article wrapper.
 */
export default function CopyCodeButtons() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        // Find all <pre> elements (rendered by rehype-pretty-code)
        const preElements = wrapperRef.current.parentElement?.querySelectorAll("pre");
        if (!preElements) return;

        preElements.forEach((pre) => {
            // Skip if already has a copy button
            if (pre.querySelector(".copy-code-btn")) return;

            // Make pre position relative for button positioning
            pre.style.position = "relative";

            const btn = document.createElement("button");
            btn.className = "copy-code-btn";
            btn.setAttribute("aria-label", "Copy code");
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

            btn.addEventListener("click", async () => {
                const code = pre.querySelector("code");
                const text = code?.textContent || pre.textContent || "";
                await navigator.clipboard.writeText(text.trim());

                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
                btn.style.color = "#22c55e";

                setTimeout(() => {
                    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
                    btn.style.color = "";
                }, 2000);
            });

            pre.appendChild(btn);
        });
    }, []);

    // Invisible anchor — just needs to be inside the article container
    return <div ref={wrapperRef} style={{ display: "none" }} />;
}
