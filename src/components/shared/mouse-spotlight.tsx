"use client";

import { useEffect, useRef, useState } from "react";

interface MouseSpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

export function MouseSpotlight({
  children,
  className = "",
  size = 280,
}: MouseSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const latestRef = useRef({ x: -9999, y: -9999 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  const flushPosition = () => {
    if (!spotlightRef.current) {
      frameRef.current = null;
      return;
    }

    spotlightRef.current.style.setProperty("--spotlight-x", `${latestRef.current.x}px`);
    spotlightRef.current.style.setProperty("--spotlight-y", `${latestRef.current.y}px`);
    frameRef.current = null;
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    latestRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(flushPosition);
    }
  };

  const handleEnter = () => {
    if (!enabled || !spotlightRef.current) return;
    spotlightRef.current.style.opacity = "1";
  };

  const handleLeave = () => {
    if (!enabled || !spotlightRef.current) return;
    spotlightRef.current.style.opacity = "0";
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200"
        style={
          {
            "--spotlight-x": "-9999px",
            "--spotlight-y": "-9999px",
            background: `radial-gradient(${size}px circle at var(--spotlight-x) var(--spotlight-y), rgba(99,102,241,0.12), transparent 45%)`,
          } as React.CSSProperties
        }
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
