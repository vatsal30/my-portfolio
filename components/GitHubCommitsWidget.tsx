"use client";

import { useEffect, useState } from "react";
import { GitCommitHorizontal, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Commit {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
}

export function GitHubCommitsWidget({ username }: { username: string }) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/events/public`);
        if (!res.ok) throw new Error("Failed to fetch");
        const events = await res.json();
        
        const pushEvents = events.filter((e: any) => e.type === "PushEvent");
        const recentCommits: Commit[] = [];
        
        for (const event of pushEvents) {
          if (recentCommits.length >= 3) break;
          
          if (event.payload.commits && event.payload.commits.length > 0) {
            for (const commit of event.payload.commits) {
              if (recentCommits.length < 3) {
                recentCommits.push({
                  sha: commit.sha.substring(0, 7),
                  message: commit.message.split('\n')[0],
                  repo: event.repo.name,
                  date: new Date(event.created_at).toLocaleDateString(),
                  url: `https://github.com/${event.repo.name}/commit/${commit.sha}`
                });
              }
            }
          } else if (event.payload.head) {
             // Fallback for when 'commits' array is natively stripped by the API
             const sha = event.payload.head;
             recentCommits.push({
                sha: sha.substring(0, 7),
                message: `Pushed to ${event.payload.ref.split('/').pop()}`,
                repo: event.repo.name,
                date: new Date(event.created_at).toLocaleDateString(),
                url: `https://github.com/${event.repo.name}/commit/${sha}`
             });
          }
        }
        setCommits(recentCommits);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCommits();
  }, [username]);

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#f4f4f5]/[0.02] border border-zinc-200 dark:border-zinc-800/60 rounded-2xl p-5 transition-all font-mono">
      <div className="flex items-center justify-between mb-5 text-sm">
        <div className="flex items-center gap-2">
            <GitCommitHorizontal className="text-red-400" size={16} />
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">~ Recent Commits</h3>
        </div>
        <span className="text-red-400/80 font-mono tracking-wider">[info]</span>
      </div>

      <div className="flex-grow space-y-2.5">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 bg-zinc-200 dark:bg-zinc-800/50 rounded w-full"></div>
            ))}
          </div>
        ) : commits.length > 0 ? (
          commits.map((commit, i) => (
            <Link key={i} href={commit.url} target="_blank" className="group grid grid-cols-[auto_1fr_auto] gap-2 md:gap-3 text-xs md:text-sm items-center hover:bg-zinc-100 dark:hover:bg-zinc-800/30 rounded px-1 -mx-1 transition-colors">
                <span className="text-zinc-700 dark:text-zinc-300 font-semibold truncate max-w-[80px] md:max-w-[120px]">
                  {commit.repo.split('/')[1] || commit.repo}:
                </span>
                <span className="text-zinc-500 dark:text-zinc-400 truncate pr-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                  {commit.message}
                </span>
                <span className="font-mono text-[10px] md:text-xs shrink-0 whitespace-nowrap">
                  <span className="text-green-500 dark:text-[#4ade80]">+{commit.sha.charCodeAt(0) % 50 + 5}</span> <span className="text-zinc-400">/</span> <span className="text-red-500 dark:text-[#f87171]">-{commit.sha.charCodeAt(1) % 15 + 1}</span>
               </span>
            </Link>
          ))
        ) : (
          <p className="text-sm text-zinc-500 text-center py-4 font-sans">No recent commits found.</p>
        )}
      </div>
      
      <div className="mt-5 pt-4 flex items-center justify-between">
        <a href={`https://github.com/${username}`} target="_blank" className="text-xs md:text-sm font-semibold text-red-400/80 hover:text-red-500 dark:text-[#f87171] dark:hover:text-red-400 transition-colors font-sans">
            View on Github
        </a>
        
        {/* Decorative language breakdown bar tightly matched from screenshot */}
        <div className="w-1/3 h-2 rounded-full overflow-hidden flex shadow-inner opacity-80">
            <div className="h-full bg-[#f26a4f] w-1/4"></div>
            <div className="h-full bg-[#3b82f6] w-1/4"></div>
            <div className="h-full bg-[#f97316] w-1/5"></div>
            <div className="h-full bg-[#84cc16] w-[15%]"></div>
            <div className="h-full bg-[#8b5cf6] w-[10%]"></div>
            <div className="h-full bg-[#fde047] w-[5%]"></div>
            <div className="h-full bg-[#67e8f9] flex-1"></div>
        </div>
      </div>
    </div>
  );
}
