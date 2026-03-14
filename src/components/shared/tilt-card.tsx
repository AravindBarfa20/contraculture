"use client";

import { useEffect, useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  tiltAmount?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt,
  tiltAmount,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const tilt = tiltAmount ?? maxTilt ?? 10;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  const applyTransform = (rotateX: number, rotateY: number, hovered: boolean) => {
    if (!cardRef.current) return;
    const translateY = hovered ? -4 : 0;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px)`;
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x - width / 2) / (width / 2)) * tilt;
    const rotateX = -((y - height / 2) / (height / 2)) * tilt;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      applyTransform(rotateX, rotateY, true);
      frameRef.current = null;
    });
  };

  const handleLeave = () => {
    if (!enabled) return;
    applyTransform(0, 0, false);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: enabled ? "transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}
