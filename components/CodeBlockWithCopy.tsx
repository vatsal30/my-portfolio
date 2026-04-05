"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

export function CodeBlockWithCopy({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const text = preRef.current?.querySelector("code")?.textContent?.trim() ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <pre {...props} ref={preRef}>
      {children}
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="copy-code-btn"
      >
        {copied
          ? <Check size={14} className="text-green-500" />
          : <Copy size={14} />
        }
      </button>
    </pre>
  );
}
