"use client";

import React, { useRef, useState, useCallback } from "react";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /** Cor do foco de luz (ex: 'rgba(250, 204, 21, 0.15)', 'rgba(56, 189, 248, 0.2)') */
  spotlightColor?: string;
  /** Raio do feixe de luz em pixels */
  spotlightSize?: number;
  /** Borda iluminada ao redor do cursor */
  bordered?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(var(--color-primary-rgb, 250, 204, 21), 0.18)",
  spotlightSize = 350,
  bordered = true,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl bg-base-200/80 border border-base-300 transition-all duration-300 hover:border-primary/40 ${className}`}
      {...props}
    >
      {/* Camada do foco de luz (Spotlight) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />

      {/* Conteúdo interno preservando a hierarquia */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default SpotlightCard;
