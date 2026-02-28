"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GithubCalendarWidget({ username }: { username: string }) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-40 w-full animate-pulse bg-zinc-100 dark:bg-zinc-900 rounded-xl" />;
    }

    const isDark = theme === "dark" || resolvedTheme === "dark";

    return (
        <div className="w-full overflow-x-auto p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <GitHubCalendar
                username={username}
                colorScheme={isDark ? "dark" : "light"}
                blockSize={12}
                blockMargin={4}
                fontSize={14}
            />
        </div>
    );
}
