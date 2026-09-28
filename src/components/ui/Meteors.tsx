"use client";

import React, { useEffect } from "react";

/**
 * Injeta keyframes otimizados para a animação contínua dos meteoros
 */
function useMeteorsStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "meteors-keyframe-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes meteor-animation {
        0% {
          transform: rotate(215deg) translateX(0);
          opacity: 1;
        }
        60% {
          opacity: 1;
        }
        100% {
          transform: rotate(215deg) translateX(-850px);
          opacity: 0;
        }
      }
      .animate-meteor-effect {
        animation: meteor-animation linear infinite;
        will-change: transform, opacity;
      }
    `;
    document.head.appendChild(style);
  }, []);
}

export interface MeteorsProps {
  /** 
   * Quantidade de meteoros gerados no contêiner.
   * @default 16
   */
  number?: number;
  /** Classes CSS adicionais */
  className?: string;
  /** Cor customizada da cabeça do meteoro */
  headColor?: string;
  /** Cor customizada da cauda luminosa */
  tailColor?: string;
  /** Comprimento da cauda em pixels (padrão 130px) */
  tailLength?: number;
}

/**
 * Meteors — Efeito Atmosférico Noturno (Aceternity UI)
 * 
 * ⚠️ AVISO DE PERFORMANCE:
 * Este componente gera animações contínuas em CSS. 
 * Para garantir 60 FPS e evitar alto consumo de GPU/CPU no navegador,
 * NÃO utilize mais de um elemento com <Meteors /> simultaneamente em uma mesma página.
 * 
 * Uso ideal: Aplique em apenas 1 card de destaque (ex: Plano Pro/Hero) por tela.
 */
export function Meteors({
  number = 16,
  className = "",
  headColor = "#ffffff",
  tailColor = "rgba(56, 189, 248, 0.75)",
  tailLength = 130,
}: MeteorsProps) {
  useMeteorsStyles();
  const meteors = new Array(number).fill(true);

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0"
      aria-hidden="true"
    >
      {meteors.map((_, idx) => {
        // Distribuição escalonada cobrindo a área visível do card
        const topPos = Math.floor(Math.random() * 300 - 60);
        const leftPos = Math.floor(Math.random() * 450 - 120);
        const delay = (Math.random() * 2.2 + 0.1).toFixed(2);
        const duration = (Math.random() * 3 + 2).toFixed(2); // 2s a 5s

        return (
          <span
            key={`meteor-${idx}`}
            className={`animate-meteor-effect absolute rounded-full ${className}`}
            style={{
              width: "3px",
              height: "3px",
              backgroundColor: headColor,
              boxShadow: `0 0 8px 1px ${headColor}, 0 0 3px 1px ${tailColor}`,
              top: `${topPos}px`,
              left: `${leftPos}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {/* Cauda luminosa otimizada (sem filter:drop-shadow para máxima performance de GPU) */}
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: `${tailLength}px`,
                height: "2px",
                background: `linear-gradient(to right, ${tailColor}, transparent)`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

export default Meteors;
