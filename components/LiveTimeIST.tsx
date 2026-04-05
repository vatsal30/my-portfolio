"use client";

import { useEffect, useState } from "react";

export function LiveTimeIST() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch by rendering nothing until mounted
  if (!time) return null;

  return <span>{time} IST</span>;
}
