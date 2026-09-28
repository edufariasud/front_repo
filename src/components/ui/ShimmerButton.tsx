"use client";

import React, { useEffect, CSSProperties } from "react";

function useShimmerStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "shimmer-button-keyframe-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes shimmer-slide {
        to {
          transform: translate(calc(100cqw - 100%), 0);
        }
      }
      @keyframes spin-around {
        0% {
          transform: translateZ(0) rotate(0);
        }
        15%, 35% {
          transform: translateZ(0) rotate(90deg);
        }
        65%, 85% {
          transform: translateZ(0) rotate(270deg);
        }
        100% {
          transform: translateZ(0) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }, []);
}

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.08em",
      shimmerDuration = "2.5s",
      borderRadius = "14px",
      background = "var(--color-base-200, #18181b)",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    useShimmerStyles();

    return (
      <button
        style={{
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
          borderRadius,
          background,
          ...((props.style as CSSProperties) || {})
        } as CSSProperties}
        className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-base-300 px-6 py-3 font-semibold text-base-content transition-all duration-300 ease-out active:scale-95 hover:border-primary/50 shadow-md ${className}`}
        ref={ref}
        {...props}
      >
        {/* Spark container */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-visible pointer-events-none -z-30 blur-[3px]"
          style={{ containerType: "size" }}
        >
          <div
            className="absolute inset-0 [aspect-ratio:1] [border-radius:0] [mask:none]"
            style={{
              height: "100cqh",
              animation: `shimmer-slide var(--speed) ease-in-out infinite alternate`
            }}
          >
            <div
              className="absolute -inset-full w-auto rotate-0"
              style={{
                background: `conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))`,
                animation: `spin-around calc(var(--speed) * 2) linear infinite`
              }}
            />
          </div>
        </div>

        {/* Efeito de relevo interno / highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] pointer-events-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)] group-hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.25)] transition-shadow duration-300"
        />

        {/* Conteúdo do botão */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
export default ShimmerButton;
