"use client";

import React, { useState, useRef, useMemo, CSSProperties } from "react";
import { Loader2 } from "lucide-react";

export type NeonVariant = "pulse" | "beam" | "cyber" | "spotlight" | "outline-glow";
export type NeonColor = "cyan" | "magenta" | "purple" | "lime" | "amber" | "crimson" | "primary";
export type NeonSize = "sm" | "md" | "lg" | "xl";
export type GlowIntensity = "low" | "medium" | "high";

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeonVariant;
  neonColor?: NeonColor;
  size?: NeonSize;
  glowIntensity?: GlowIntensity;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const COLOR_MAP: Record<NeonColor, { hex: string; rgb: string; textHex: string }> = {
  cyan: {
    hex: "#00f0ff",
    rgb: "0, 240, 255",
    textHex: "#ffffff"
  },
  magenta: {
    hex: "#ff007f",
    rgb: "255, 0, 127",
    textHex: "#ffffff"
  },
  purple: {
    hex: "#a855f7",
    rgb: "168, 85, 247",
    textHex: "#ffffff"
  },
  lime: {
    hex: "#10b981",
    rgb: "16, 185, 129",
    textHex: "#ffffff"
  },
  amber: {
    hex: "#fbbf24",
    rgb: "251, 191, 36",
    textHex: "#ffffff"
  },
  crimson: {
    hex: "#ef4444",
    rgb: "239, 68, 68",
    textHex: "#ffffff"
  },
  primary: {
    hex: "var(--color-primary, #facc15)",
    rgb: "250, 204, 21",
    textHex: "#ffffff"
  }
};

const SIZE_MAP: Record<NeonSize, string> = {
  sm: "h-8 px-3.5 text-xs gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-13 px-7 text-base font-semibold gap-2.5 rounded-2xl",
  xl: "h-15 px-9 text-lg font-bold gap-3 rounded-2xl"
};

const INTENSITY_MULTIPLIER: Record<GlowIntensity, { opacity: number; blurFactor: number }> = {
  low: { opacity: 0.25, blurFactor: 0.6 },
  medium: { opacity: 0.45, blurFactor: 1.0 },
  high: { opacity: 0.75, blurFactor: 1.4 }
};

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      variant = "pulse",
      neonColor = "cyan",
      size = "md",
      glowIntensity = "medium",
      isLoading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      className = "",
      disabled = false,
      children,
      style,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const colorConfig = COLOR_MAP[neonColor] || COLOR_MAP.cyan;
    const intensity = INTENSITY_MULTIPLIER[glowIntensity];

    // Manipulação do Spotlight magnético para seguir o cursor em tempo real
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "spotlight" && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setCursorPos({ x, y });
      }
      setIsHovered(true);
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    // Estilos dinâmicos de CSS variáveis por botão
    const dynamicStyle = useMemo(() => {
      const isCustomHex = neonColor !== "primary";
      const baseRgb = isCustomHex ? colorConfig.rgb : "250, 204, 21";

      return {
        "--neon-color": colorConfig.hex,
        "--neon-rgb": baseRgb,
        "--neon-glow-alpha": intensity.opacity,
        "--neon-blur-mult": intensity.blurFactor,
        ...(style || {})
      } as CSSProperties;
    }, [colorConfig, neonColor, intensity, style]);

    // Combinador de refs
    const setRefs = (node: HTMLButtonElement | null) => {
      buttonRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Renderizador de cada variante estética
    return (
      <button
        ref={setRefs}
        style={dynamicStyle}
        disabled={disabled || isLoading}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative z-10 inline-flex items-center justify-center font-medium select-none cursor-pointer outline-none transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed max-w-full ${
          fullWidth ? "w-full" : "w-auto"
        } ${variant === "cyber" ? "rounded-none" : SIZE_MAP[size]} ${className}`}
        {...props}
      >
        {/* ========================================================================= */}
        {/* VARIANTE 1: PULSE (Halo Neon com Núcleo Obsidian & Respiração Fluida)     */}
        {/* ========================================================================= */}
        {variant === "pulse" && (
          <>
            {/* Halo difuso de respiração traseira */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-[inherit] pointer-events-none opacity-60 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${colorConfig.rgb}, calc(0.35 * var(--neon-blur-mult))) 0%, transparent 75%)`
              }}
            />

            {/* Borda neon com iluminação direta */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none transition-all duration-300"
              style={{
                border: `1.5px solid ${colorConfig.hex}`,
                boxShadow: isHovered
                  ? `0 0 16px 2px rgba(${colorConfig.rgb}, 0.8), 0 0 32px 4px rgba(${colorConfig.rgb}, 0.4), inset 0 0 12px 1px rgba(${colorConfig.rgb}, 0.4)`
                  : `0 0 10px 0px rgba(${colorConfig.rgb}, 0.5), 0 0 20px -2px rgba(${colorConfig.rgb}, 0.25), inset 0 0 6px 0px rgba(${colorConfig.rgb}, 0.25)`
              }}
            />

            {/* Núcleo escuro estilo obsidian com reflexo radial suave */}
            <div
              aria-hidden="true"
              className="absolute inset-[1px] rounded-[inherit] bg-neutral-950/85 backdrop-blur-md pointer-events-none transition-colors duration-300 group-hover:bg-neutral-950/70"
            />
          </>
        )}

        {/* ========================================================================= */}
        {/* VARIANTE 2: BEAM (Feixe Laser Orbitante com Rastro Neon)                  */}
        {/* ========================================================================= */}
        {variant === "beam" && (
          <>
            {/* Ambient Backlight */}
            <div
              aria-hidden="true"
              className="absolute -inset-1.5 rounded-[inherit] pointer-events-none opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-80"
              style={{
                background: `radial-gradient(circle, rgba(${colorConfig.rgb}, 0.4) 0%, transparent 70%)`
              }}
            />

            {/* Container do Feixe Cônico Giratório */}
            <div
              aria-hidden="true"
              className="absolute -inset-[2px] rounded-[inherit] overflow-hidden pointer-events-none"
            >
              <div
                className="absolute inset-[-100%] w-[300%] h-[300%] animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, ${colorConfig.hex} 340deg, #ffffff 360deg)`
                }}
              />
            </div>

            {/* Máscara interna para criar a trilha de espessura 1.5px */}
            <div
              aria-hidden="true"
              className="absolute inset-[1.5px] rounded-[inherit] bg-neutral-950/90 backdrop-blur-lg pointer-events-none transition-colors duration-300 group-hover:bg-neutral-950/80"
            />

            {/* Glow perimetral suave interno */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 opacity-30 group-hover:opacity-60"
              style={{
                boxShadow: `inset 0 0 10px rgba(${colorConfig.rgb}, 0.4)`
              }}
            />
          </>
        )}

        {/* ========================================================================= */}
        {/* VARIANTE 3: CYBER (Cyberpunk HUD com Cantos Chanfrados & LED Indicador)   */}
        {/* ========================================================================= */}
        {variant === "cyber" && (
          <>
            {/* Borda cortada com clip-path poligonal */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
                size === "sm" ? "px-3 py-1 text-xs" : size === "lg" ? "px-7 py-3 text-base" : "px-5 py-2 text-sm"
              }`}
              style={{
                clipPath:
                  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                background: colorConfig.hex,
                boxShadow: isHovered
                  ? `0 0 24px rgba(${colorConfig.rgb}, 0.6), 0 0 45px rgba(${colorConfig.rgb}, 0.3)`
                  : `0 0 12px rgba(${colorConfig.rgb}, 0.35)`
              }}
            />

            {/* Corpo interno preenchido com recorte idêntico */}
            <div
              aria-hidden="true"
              className="absolute inset-[1.5px] pointer-events-none bg-neutral-950/95 transition-all duration-300 group-hover:bg-neutral-900/90"
              style={{
                clipPath:
                  "polygon(11px 0, 100% 0, 100% calc(100% - 11px), calc(100% - 11px) 100%, 0 100%, 0 11px)"
              }}
            >
              {/* Linhas de scanline sutis no hover */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
                }}
              />
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* VARIANTE 4: SPOTLIGHT (Laser Magnético Seguindo a Física do Cursor)       */}
        {/* ========================================================================= */}
        {variant === "spotlight" && (
          <>
            {/* Halo de luz dinâmica que se move conforme x, y do cursor */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
              style={{
                background: `radial-gradient(circle 120px at ${cursorPos.x}% ${cursorPos.y}%, rgba(${colorConfig.rgb}, 0.6) 0%, transparent 80%)`
              }}
            />

            {/* Borda base fina */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none border border-white/10 transition-colors duration-300"
            />

            {/* Efeito de laser dinâmico na borda */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle 100px at ${cursorPos.x}% ${cursorPos.y}%, ${colorConfig.hex} 0%, transparent 70%)`,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1.5px"
              }}
            />

            {/* Fundo escuro com feixe interior suave */}
            <div
              aria-hidden="true"
              className="absolute inset-[1px] rounded-[inherit] bg-neutral-950/85 backdrop-blur-md pointer-events-none"
              style={{
                backgroundImage: isHovered
                  ? `radial-gradient(circle 140px at ${cursorPos.x}% ${cursorPos.y}%, rgba(${colorConfig.rgb}, 0.25) 0%, transparent 80%)`
                  : undefined
              }}
            />
          </>
        )}

        {/* ========================================================================= */}
        {/* VARIANTE 5: OUTLINE-GLOW (Minimalista com Inundação Fluida de Fótons)     */}
        {/* ========================================================================= */}
        {variant === "outline-glow" && (
          <>
            {/* Halo suave difuso que envolve toda a silhueta do botão */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-[inherit] pointer-events-none opacity-50 blur-md transition-all duration-300 group-hover:opacity-90 group-hover:blur-lg"
              style={{
                background: `radial-gradient(ellipse at center, rgba(${colorConfig.rgb}, calc(0.35 * var(--neon-blur-mult))) 0%, transparent 80%)`
              }}
            />

            {/* Borda com glow externo e interno contínuo sem cortes */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[inherit] pointer-events-none transition-all duration-300"
              style={{
                border: `1.5px solid ${colorConfig.hex}`,
                boxShadow: isHovered
                  ? `0 0 18px 2px rgba(${colorConfig.rgb}, 0.75), 0 0 36px 4px rgba(${colorConfig.rgb}, 0.35), inset 0 0 14px rgba(${colorConfig.rgb}, 0.4)`
                  : `0 0 10px 1px rgba(${colorConfig.rgb}, 0.45), 0 0 20px -2px rgba(${colorConfig.rgb}, 0.25), inset 0 0 8px rgba(${colorConfig.rgb}, 0.25)`
              }}
            />

            {/* Preenchimento luminoso com gradiente em hover */}
            <div
              aria-hidden="true"
              className="absolute inset-[1px] rounded-[inherit] pointer-events-none transition-all duration-300"
              style={{
                background: isHovered
                  ? `linear-gradient(135deg, rgba(${colorConfig.rgb}, 0.22) 0%, rgba(12, 14, 20, 0.92) 100%)`
                  : "rgba(10, 10, 15, 0.7)",
                backdropFilter: "blur(8px)"
              }}
            />
          </>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO DO BOTÃO (Ícones, Texto com Bloom & Indicadores)                  */}
        {/* ========================================================================= */}
        <span
          className={`relative z-10 flex items-center justify-center transition-all duration-300 font-sans tracking-tight text-white overflow-visible ${
            variant === "cyber" ? "font-mono uppercase tracking-wider text-xs sm:text-sm px-6 py-3" : ""
          }`}
          style={{
            textShadow: isHovered
              ? `0 0 12px ${colorConfig.hex}, 0 0 24px rgba(${colorConfig.rgb}, 0.8), 0 0 2px #ffffff`
              : `0 0 8px rgba(${colorConfig.rgb}, 0.5)`
          }}
        >
          {/* LED Indicador para a variante Cyber */}
          {variant === "cyber" && (
            <span className="relative flex h-2 w-2 mr-2.5 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: colorConfig.hex }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px_#fff]"
                style={{ backgroundColor: colorConfig.hex }}
              />
            </span>
          )}

          {/* Spinner de Carregamento com Neon Glow */}
          {isLoading && (
            <Loader2
              className="animate-spin shrink-0 mr-2 size-4"
              style={{
                filter: `drop-shadow(0 0 6px ${colorConfig.hex})`
              }}
            />
          )}

          {/* Ícone Esquerda */}
          {!isLoading && iconLeft && (
            <span
              className="shrink-0 transition-transform duration-300 group-hover:scale-110 mr-1.5 overflow-visible"
              style={{ filter: `drop-shadow(0 0 5px ${colorConfig.hex})` }}
            >
              {iconLeft}
            </span>
          )}

          {/* Texto / Conteúdo com margem e sem clipping */}
          <span className="whitespace-nowrap px-1.5 inline-block overflow-visible">{children}</span>

          {/* Ícone Direita */}
          {!isLoading && iconRight && (
            <span
              className="shrink-0 transition-transform duration-300 group-hover:scale-110 ml-1.5 overflow-visible"
              style={{ filter: `drop-shadow(0 0 5px ${colorConfig.hex})` }}
            >
              {iconRight}
            </span>
          )}
        </span>
      </button>
    );
  }
);

NeonButton.displayName = "NeonButton";
export default NeonButton;
