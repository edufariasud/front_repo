"use client";

import React, { useEffect } from "react";

/**
 * Injeta estilos CSS globais para a rotação contínua da borda animada
 */
function useBorderBeamStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "border-beam-keyframe-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes border-beam-spin {
        from {
          --angle: 0deg;
        }
        to {
          --angle: 360deg;
        }
      }

      @property --angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
      }
    `;
    document.head.appendChild(style);
  }, []);
}

export interface BorderBeamProps {
  className?: string;
  /** Tamanho do feixe de luz em pixels */
  size?: number;
  /** Duração em segundos de uma volta completa */
  duration?: number;
  /** Delay inicial em segundos */
  delay?: number;
  /** Cor de início do feixe de luz */
  colorFrom?: string;
  /** Cor de término do feixe de luz */
  colorTo?: string;
  /** Espessura da borda em pixels */
  borderWidth?: number;
  /** Raio de borda personalizado (por padrão herda do elemento pai) */
  borderRadius?: string;
}

export function BorderBeam({
  className = "",
  size = 220,
  duration = 8,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1.5,
  borderRadius = "inherit"
}: BorderBeamProps) {
  useBorderBeamStyles();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
          borderRadius
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={
          {
            padding: "var(--border-width)",
            background: `
              linear-gradient(
                var(--angle, 0deg),
                transparent 0%,
                transparent 30%,
                var(--color-from) 48%,
                var(--color-to) 62%,
                transparent 80%,
                transparent 100%
              )
            `,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            animation: `border-beam-spin var(--duration) linear infinite var(--delay)`,
            borderRadius
          } as React.CSSProperties
        }
      />
    </div>
  );
}

export default BorderBeam;
