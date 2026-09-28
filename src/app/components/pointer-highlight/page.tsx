"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

// -----------------------------------------------------------------------------
// Component 1: Individual Hover/Manual content PointerHighlight
// -----------------------------------------------------------------------------
interface PointerHighlightProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success";
  pointerLabel?: string;
  isActive?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  triggerMode?: "hover" | "manual";
}

function PointerHighlight({
  children,
  variant = "primary",
  pointerLabel = "AI Assistant",
  isActive = false,
  onHoverChange,
  triggerMode = "hover",
}: PointerHighlightProps) {
  const [isHovered, setIsHovered] = useState(false);
  const active = triggerMode === "hover" ? isHovered : isActive;

  const handleMouseEnter = () => {
    if (triggerMode === "hover") {
      setIsHovered(true);
      if (onHoverChange) onHoverChange(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode === "hover") {
      setIsHovered(false);
      if (onHoverChange) onHoverChange(false);
    }
  };

  return (
    <span
      className={`${styles.wrapper} ${styles[variant]} ${active ? styles.active : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span className={styles.highlightBox} />
      <span className={styles.pointer}>
        <svg
          className={styles.pointerIcon}
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0V14.3L4.1 10.2L9.5 15L11.3 13L6 8.5L11.5 8L0 0Z" fill="currentColor" />
        </svg>
        <span className={styles.pointerBadge}>{pointerLabel}</span>
      </span>
    </span>
  );
}

// -----------------------------------------------------------------------------
// Component 2: Title selection indicator (Blue Cursor + Drawing Rectangle)
// -----------------------------------------------------------------------------
interface TitleSelectionHighlightProps {
  children: React.ReactNode;
  isStaticActive?: boolean;
}

function TitleSelectionHighlight({ children, isStaticActive = false }: TitleSelectionHighlightProps) {
  // If isStaticActive is true, we force full opacity without animation keyframes (for static duplicates)
  return (
    <span className={styles.titleWordWrapper}>
      {children}
      
      {/* Selection outline rectangle */}
      <span 
        className={styles.titleRectangle}
        style={isStaticActive ? { opacity: 1, clipPath: "none", animation: "none" } : undefined}
      />
      
      {/* Classic blue cursor pointer */}
      <svg
        className={styles.titleCursorPointer}
        style={isStaticActive ? { opacity: 1, transform: "none", animation: "none" } : undefined}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.92851 2.92851L17.4727 7.77658L11.5173 9.76173L13.5024 15.7171L12.0152 16.2128L9.76173 11.5173L2.92851 13.5024L2.92851 2.92851Z"
          fill="#3B82F6"
        />
      </svg>
    </span>
  );
}

// -----------------------------------------------------------------------------
// Main Showcase Page
// -----------------------------------------------------------------------------
export default function PointerHighlightShowcase() {
  // Page 1 Hover states configuration
  const [triggerMode, setTriggerMode] = useState<"hover" | "manual">("hover");
  const [badgeText, setBadgeText] = useState("AI Assistant");
  const [colorTheme, setColorTheme] = useState<"primary" | "secondary" | "success">("primary");
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle for playground variant
  useEffect(() => {
    if (triggerMode !== "manual") return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(interval);
  }, [triggerMode]);

  return (
    <div className={styles.container}>
      {/* Header section */}
      <div className={styles.header}>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
            Aceternity <span className="text-primary">Pointer Highlight</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Efeito de realce e marcação com cursor simulado para títulos e palavras de destaque.
          </p>
        </div>
        <Link href="/" className={`btn btn-outline btn-sm ${styles.backButton}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Voltar para Home
        </Link>
      </div>

      {/* =====================================================================
         VARIANCE 2: Title Selection Auto-Animation (THE REFRESHING VERSION)
         ===================================================================== */}
      <div className="card card-elevated p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-base-300 pb-3">
          <span className="text-md font-bold opacity-80 flex items-center gap-2">
            <span>🔵</span> 1. Efeito Título (Auto-Animação do Cursor e Retângulo)
          </span>
          <span className="badge badge-primary">Loop Contínuo</span>
        </div>

        <div className={styles.titleEditionCard}>
          <h2 className={styles.titleHeading}>
            The best way to grow is to{" "}
            <TitleSelectionHighlight>collaborate</TitleSelectionHighlight>
          </h2>
        </div>
      </div>

      {/* =====================================================================
         VARIANCE 1: Text Block Selector (Interactive Playground)
         ===================================================================== */}
      <div className="card card-elevated p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-base-300 pb-3">
          <span className="text-md font-bold opacity-80 flex items-center gap-2">
            <span>🟢</span> 2. Playground de Realce (Micro-interações)
          </span>
          <span className="badge badge-accent">Configurável</span>
        </div>

        {/* Playground Settings Grid */}
        <div className={styles.controlsGrid}>
          {/* Card 1: Trigger Mode */}
          <div className="card bg-base-100 p-4 border border-base-300 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold opacity-80 uppercase tracking-wider">
              ⚙️ Gatilho do Destaque
            </h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                <input
                  type="radio"
                  name="triggerMode"
                  className="radio radio-primary radio-sm"
                  checked={triggerMode === "hover"}
                  onChange={() => setTriggerMode("hover")}
                />
                Hover (Passe o mouse)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                <input
                  type="radio"
                  name="triggerMode"
                  className="radio radio-primary radio-sm"
                  checked={triggerMode === "manual"}
                  onChange={() => setTriggerMode("manual")}
                />
                Auto-Ciclo (Loop automático)
              </label>
            </div>
          </div>

          {/* Card 2: Custom Text Badge */}
          <div className="card bg-base-100 p-4 border border-base-300 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold opacity-80 uppercase tracking-wider">
              🏷️ Nome do Cursor
            </h3>
            <input
              type="text"
              className="input input-bordered w-full input-sm"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value || "AI Assistant")}
              placeholder="Ex: Antigravity, Editor..."
            />
          </div>

          {/* Card 3: Color Palette Selection */}
          <div className="card bg-base-100 p-4 border border-base-300 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold opacity-80 uppercase tracking-wider">
              🎨 Paleta de Cores
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setColorTheme("primary")}
                className={`btn btn-xs flex-1 ${colorTheme === "primary" ? "btn-primary" : "btn-outline"}`}
              >
                Primário
              </button>
              <button
                onClick={() => setColorTheme("secondary")}
                className={`btn btn-xs flex-1 ${colorTheme === "secondary" ? "btn-secondary" : "btn-outline"}`}
              >
                Acento
              </button>
              <button
                onClick={() => setColorTheme("success")}
                className={`btn btn-xs flex-1 ${colorTheme === "success" ? "btn-success" : "btn-outline"}`}
              >
                Sucesso
              </button>
            </div>
          </div>
        </div>

        {/* Text paragraph */}
        <div className={styles.editorialCard}>
          <div className={styles.editorialBody}>
            “A nossa biblioteca premium foi projetada para combinar{" "}
            <PointerHighlight
              variant={colorTheme}
              pointerLabel={badgeText}
              isActive={activeIndex === 0}
              triggerMode={triggerMode}
            >
              performance extrema
            </PointerHighlight>{" "}
            com layouts elegantes. Entregar uma experiência de usuário rica significa construir{" "}
            <PointerHighlight
              variant={colorTheme}
              pointerLabel={badgeText}
              isActive={activeIndex === 1}
              triggerMode={triggerMode}
            >
              micro-animações fluidas
            </PointerHighlight>{" "}
            que respondem instantaneamente aos comandos. Cada componente é estruturado de forma isolada, facilitando a sua{" "}
            <PointerHighlight
              variant={colorTheme}
              pointerLabel={badgeText}
              isActive={activeIndex === 2}
              triggerMode={triggerMode}
            >
              integração modular
            </PointerHighlight>{" "}
            sem poluir os estilos globais do seu app.”
          </div>
        </div>
      </div>

      {/* Static Comparison of States (Duplication) */}
      <div className={styles.showcaseSection}>
        <h2 className="text-2xl font-black">🌟 Estados Estáticos Duplicados</h2>
        <p className="text-sm opacity-70 -mt-2">
          Exibição estática comparando o estado original (inativo) com o estado de destaque marcado (ativo) do título principal:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* State 1: Inactive Title */}
          <div className={styles.staticCard}>
            <div className={styles.cardTitle}>
              1. Título Padrão <span>(Inativo / Sem seleção)</span>
            </div>
            <div className="p-8 bg-base-100 border border-base-300 rounded-xl flex justify-center items-center">
              <h3 className="text-xl md:text-2xl font-black">
                The best way to grow is to{" "}
                <span className="font-black border-transparent ml-1">collaborate</span>
              </h3>
            </div>
          </div>

          {/* State 2: Active Title Selection */}
          <div className={styles.staticCard}>
            <div className={styles.cardTitle}>
              2. Título Destacado <span>(Ativo / Marcador e Cursor Fixos)</span>
            </div>
            <div className="p-8 bg-base-100 border border-base-300 rounded-xl flex justify-center items-center">
              <h3 className="text-xl md:text-2xl font-black">
                The best way to grow is to{" "}
                <TitleSelectionHighlight isStaticActive={true}>collaborate</TitleSelectionHighlight>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
