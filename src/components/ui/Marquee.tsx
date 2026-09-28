"use client";

import React, { useEffect, CSSProperties } from "react";

function useMarqueeStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "marquee-keyframe-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes marquee-scroll {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(calc(-100% - var(--gap, 1rem)));
        }
      }
      @keyframes marquee-scroll-vertical {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(calc(-100% - var(--gap, 1rem)));
        }
      }
      .animate-marquee-track {
        animation: marquee-scroll var(--duration, 30s) linear infinite;
      }
      .animate-marquee-track-vertical {
        animation: marquee-scroll-vertical var(--duration, 30s) linear infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);
}

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inverter a direção do scroll */
  reverse?: boolean;
  /** Pausar o scroll ao passar o cursor do mouse */
  pauseOnHover?: boolean;
  /** Direção vertical em vez de horizontal */
  vertical?: boolean;
  /** Quantidade de repetições da track */
  repeat?: number;
  /** Duração da animação (ex: '20s', '45s') */
  duration?: string;
  /** Espaçamento entre os elementos (ex: '1rem', '1.5rem') */
  gap?: string;
  /** Adicionar fade degradê suave nas bordas */
  fadeEdges?: boolean;
  children: React.ReactNode;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  repeat = 4,
  duration = "30s",
  gap = "1rem",
  fadeEdges = true,
  children,
  style,
  ...props
}: MarqueeProps) {
  useMarqueeStyles();

  const containerStyle: CSSProperties = {
    "--duration": duration,
    "--gap": gap,
    ...(style || {}),
  } as CSSProperties;

  return (
    <div
      {...props}
      style={containerStyle}
      className={`relative group flex overflow-hidden p-2 ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            vertical ? "animate-marquee-track-vertical flex-col" : "animate-marquee-track flex-row"
          } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
          style={{
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}

      {/* Degradê suave de fade nas bordas (horizontal) */}
      {fadeEdges && !vertical && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-base-100 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-base-100 to-transparent z-10" />
        </>
      )}

      {/* Degradê suave de fade nas bordas (vertical) */}
      {fadeEdges && vertical && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-base-100 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-base-100 to-transparent z-10" />
        </>
      )}
    </div>
  );
}

export default Marquee;
