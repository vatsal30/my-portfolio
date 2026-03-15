"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function HeroInteractive() {
  const [auraActive, setAuraActive] = useState(false);
  const [stars, setStars] = useState<{x: number, y: number, size: number, duration: number, delay: number}[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    })));
  }, []);

  return (
    <>
      {/* Dark Mode Page Border Highlight */}
      {auraActive && (
        <div className="fixed inset-0 pointer-events-none z-[100] hidden dark:block border-0 md:border-[1px] border-transparent"
          style={{ animation: 'page-border-glow 6s ease-in-out infinite' }}
        />
      )}
      
      {/* Dark Mode Stars Background */}
      {auraActive && (
        <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                top: star.y + '%',
                left: star.x + '%',
                animation: `star-twinkle ${star.duration}s infinite ${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes zen-wave {
          0% { transform: scale(1); opacity: 0.8; border-color: rgba(168, 85, 247, 0.6); }
          100% { transform: scale(2.8); opacity: 0; border-color: rgba(168, 85, 247, 0); }
        }
        @keyframes ss-portrait-glow {
          0%, 100% { box-shadow: 0 0 20px 4px rgba(168,85,247,0.4), 0 0 40px 10px rgba(168,85,247,0.25); }
          50% { box-shadow: 0 0 35px 8px rgba(168,85,247,0.7), 0 0 70px 20px rgba(168,85,247,0.4); }
        }
        @keyframes page-border-glow {
          0%, 100% { box-shadow: inset 0 0 20px rgba(168,85,247,0.2), inset 0 0 40px rgba(168,85,247,0.05); border-color: rgba(168,85,247,0.1); }
          50% { box-shadow: inset 0 0 40px rgba(168,85,247,0.5), inset 0 0 80px rgba(168,85,247,0.2); border-color: rgba(168,85,247,0.4); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8); }
        }
      `}</style>

      <div
        className="relative mb-8 cursor-pointer select-none"
        onClick={() => setAuraActive(!auraActive)}
        style={{ width: '160px', height: '160px' }}
      >
        {/* Aura layers */}
        {auraActive && (<>
          <div style={{
            position: 'absolute', inset: '0', borderRadius: '50%',
            border: '2px solid rgba(168,85,247,0.8)',
            animation: 'zen-wave 3s cubic-bezier(0.0, 0, 0.2, 1) infinite',
            zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', inset: '0', borderRadius: '50%',
            border: '2px solid rgba(168,85,247,0.8)',
            animation: 'zen-wave 3s cubic-bezier(0.0, 0, 0.2, 1) infinite 1s',
            zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', inset: '0', borderRadius: '50%',
            border: '2px solid rgba(168,85,247,0.8)',
            animation: 'zen-wave 3s cubic-bezier(0.0, 0, 0.2, 1) infinite 2s',
            zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', inset: '-10px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 60%)',
            filter: 'blur(10px)',
            zIndex: 1,
            animation: 'ss-portrait-glow 2s ease-in-out infinite'
          }} />
        </>)}

        {!auraActive && (
          <div className="absolute inset-[-12px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
              filter: 'blur(12px)',
            }}
          />
        )}

        <div
          className="relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-500"
          style={auraActive ? {
            borderColor: 'rgba(168,85,247,0.7)',
            animation: 'ss-portrait-glow 2s ease-in-out infinite',
            zIndex: 10,
          } : {
            borderColor: 'rgba(161,161,170,0.3)',
          }}
        >
          <Image
            src="/images/avatar.png"
            alt="Vatsal Vora Profile"
            width={160}
            height={160}
            priority
            className={`object-cover w-full h-full transition-all duration-700 ${auraActive ? 'brightness-110 saturate-150' : 'grayscale hover:grayscale-0'}`}
          />
        </div>
      </div>
    </>
  );
}
