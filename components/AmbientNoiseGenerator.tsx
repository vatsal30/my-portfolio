"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Waves, Wind, CloudRain, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type NoiseType = "white" | "pink" | "brown";

export function AmbientNoiseGenerator() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [noiseType, setNoiseType] = useState<NoiseType>("brown");
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    // Initialize Web Audio API
    useEffect(() => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContext();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.connect(audioCtxRef.current.destination);

        return () => {
            if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
                audioCtxRef.current.close();
            }
        };
    }, []);

    // Update volume
    useEffect(() => {
        if (gainNodeRef.current && audioCtxRef.current) {
            // Apply a slight exponential curve to volume slider for better human perception
            const humanVol = isMuted ? 0 : Math.pow(volume, 2);
            gainNodeRef.current.gain.setTargetAtTime(humanVol, audioCtxRef.current.currentTime, 0.05);
        }
    }, [volume, isMuted]);

    const generateNoiseBuffer = (type: NoiseType): AudioBuffer => {
        const ctx = audioCtxRef.current!;
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of audio to loop
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        if (type === "white") {
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
        } else if (type === "pink") {
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                data[i] *= 0.11; // gain adjustment
                b6 = white * 0.115926;
            }
        } else if (type === "brown") {
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5; // gain adjustment
            }
        }

        return buffer;
    };

    const playNoise = (type: NoiseType) => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;

        // Stop current if playing
        if (sourceRef.current) {
            sourceRef.current.stop();
            sourceRef.current.disconnect();
        }

        // Resume AudioContext if suspended (browser auto-play policy)
        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
        }

        const buffer = generateNoiseBuffer(type);
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        
        // Add a slight lowpass filter to make it sound richer and less harsh
        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = type === "brown" ? 400 : type === "pink" ? 1000 : 3000;
        
        source.connect(filter);
        filter.connect(gainNodeRef.current);
        source.start();

        sourceRef.current = source;
        setIsPlaying(true);
        setNoiseType(type);
    };

    const togglePlay = () => {
        if (isPlaying) {
            if (sourceRef.current) {
                // Fade out to avoid clipping clicks
                gainNodeRef.current?.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.1);
                setTimeout(() => {
                    sourceRef.current?.stop();
                    setIsPlaying(false);
                    // Reset volume for next play
                    gainNodeRef.current?.gain.setTargetAtTime(isMuted ? 0 : Math.pow(volume, 2), audioCtxRef.current!.currentTime, 0.1);
                }, 150);
            }
        } else {
            playNoise(noiseType);
        }
    };

    const switchNoise = (type: NoiseType) => {
        if (isPlaying) {
            playNoise(type); // Instantly swap buffer
        } else {
            setNoiseType(type);
        }
    };

    return (
        <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
                    <Waves className="text-blue-500" />
                    <h2>Ambient Focus Mix</h2>
                </div>
                <button
                    onClick={togglePlay}
                    className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-full text-white transition-all shadow-md active:scale-95",
                        isPlaying ? "bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600" : "bg-blue-600 hover:bg-blue-500"
                    )}
                >
                    {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3 block">Frequency Profile</label>
                    <div className="grid grid-cols-3 gap-2">
                        <NoiseButton 
                            active={noiseType === "brown"} 
                            onClick={() => switchNoise("brown")} 
                            label="Brown Noise" 
                            icon={<Waves size={16} />} 
                            desc="Deep & Rumble"
                        />
                        <NoiseButton 
                            active={noiseType === "pink"} 
                            onClick={() => switchNoise("pink")} 
                            label="Pink Noise" 
                            icon={<CloudRain size={16} />} 
                            desc="Balanced & Rain-like"
                        />
                        <NoiseButton 
                            active={noiseType === "white"} 
                            onClick={() => switchNoise("white")} 
                            label="White Noise" 
                            icon={<Wind size={16} />} 
                            desc="Harsh & Static"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMuted(!isMuted)} 
                            className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                        >
                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>
            </div>
            {isPlaying && (
                <div className="mt-6 flex items-center justify-center gap-1 h-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-blue-500 rounded-full animate-pulse"
                            style={{ 
                                height: `${Math.random() * 100}%`,
                                animationDuration: `${0.5 + Math.random()}s`,
                                animationDelay: `${Math.random()}s`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function NoiseButton({ active, onClick, label, icon, desc }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode, desc: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center",
                active 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 shadow-sm" 
                    : "border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
            )}
        >
            <div className="mb-2">{icon}</div>
            <span className="text-sm font-bold mb-0.5">{label}</span>
            <span className="text-[10px] opacity-70 font-medium">{desc}</span>
        </button>
    );
}
