"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function AbacusClickerWidget() {
    // In a real Vercel KV production environment, this would hit an API route to increment.
    const [count, setCount] = useState(0);
    const [userClicks, setUserClicks] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    // Initial Hydration
    useEffect(() => {
        // Fetch Global Total
        async function fetchGlobalCount() {
            try {
                const res = await fetch('/api/abacus');
                const data = await res.json();
                if (data.count !== undefined) {
                    setCount(data.count);
                }
            } catch (error) {
                console.error('Failed to fetch global abacus count:', error);
            }
        }

        // Load Local User Clicks
        const savedClicks = localStorage.getItem('abacus_user_clicks');
        if (savedClicks) {
            setUserClicks(parseInt(savedClicks, 10));
        }

        fetchGlobalCount();
    }, []);

    const handleClick = async () => {
        const newCount = count + 1;
        const newUserClicks = userClicks + 1;

        // Optimistic UI updates
        setCount(newCount);
        setUserClicks(newUserClicks);

        // Persist User Clicks Locally
        localStorage.setItem('abacus_user_clicks', newUserClicks.toString());

        // Persist Global Count to API
        try {
            await fetch('/api/abacus', { method: 'POST' });
        } catch (error) {
            console.error('Failed to sync global abacus count:', error);
        }
    };

    return (
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden group min-h-[280px]">
            {/* Tooltip Info Icon */}
            <div 
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-help z-20"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <Info size={18} />
            </div>

            <AnimatePresence>
                {showTooltip && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-10 bg-zinc-900/95 p-6 rounded-3xl flex flex-col justify-center backdrop-blur-sm"
                    >
                        <p className="text-zinc-200 font-mono text-sm leading-relaxed mb-4">
                            A real-time global counter tracking every click from everyone visiting this site. 
                            Completely pointless, yet oddly satisfying.
                        </p>
                        <p className="text-zinc-400 font-mono text-xs">
                            Powered by <span className="text-purple-400">Abacus</span>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative space-y-6">
                
                {/* Number Display - We use Framer Motion for the satisfying layout bump */}
                <motion.div 
                    key={count}
                    initial={{ scale: 0.8, opacity: 0.5, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                    {count.toLocaleString()}
                </motion.div>

                {/* Click Button */}
                <button 
                    onClick={handleClick}
                    aria-label="Click to add an Abacus bead"
                    className="w-full relative h-[48px] bg-zinc-100 dark:bg-zinc-800/80 rounded border border-zinc-200 dark:border-zinc-700/50 overflow-hidden group cursor-crosshair hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                    CLICK ME
                </button>

                {/* Local User Click Status */}
                <div className="h-4">
                    <AnimatePresence mode="wait">
                        {userClicks > 0 && (
                            <motion.p
                                key={userClicks}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-xs sm:text-sm font-mono text-zinc-400 dark:text-zinc-600"
                            >
                                you've clicked {userClicks} time{userClicks !== 1 ? 's' : ''}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40" 
                style={{
                    background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
                }}
            />
        </div>
    );
}
