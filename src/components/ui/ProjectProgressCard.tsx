"use client";

import React, { useState } from "react";

export interface ProjectMember {
  name: string;
  avatarUrl: string;
}

export type CardColorScheme = "teal" | "amber" | "rose" | "blue" | "purple" | "emerald";

export interface ProjectProgressCardProps {
  /** Data de início ou criação (ex: "Feb 2, 2021") */
  date: string;
  /** Título do projeto (ex: "Web Designing") */
  title: string;
  /** Categoria ou subtítulo (ex: "Prototyping") */
  category: string;
  /** Porcentagem de progresso de 0 a 100 */
  progress: number;
  /** Tempo restante em texto (ex: "2 days left", "3 weeks left") */
  timeLeft: string;
  /** Esquema de cor pré-definido ou personalizado */
  colorScheme?: CardColorScheme;
  /** Cor personalizada em HEX/RGBA para a iluminação e barra (opcional) */
  customColor?: string;
  /** Membros associados ao projeto */
  members?: ProjectMember[];
  /** Callback ao clicar no botão '+' de adicionar membro */
  onAddMember?: () => void;
  /** Callback ao clicar no menu de três pontos */
  onMenuClick?: () => void;
  /** Callback de clique no card */
  onClick?: () => void;
  /** Classes adicionais */
  className?: string;
}

const colorThemes: Record<CardColorScheme, { glow: string; accent: string; badge: string }> = {
  teal: {
    glow: "rgba(20, 184, 166, 0.32)",
    accent: "#14b8a6",
    badge: "rgba(20, 184, 166, 0.9)",
  },
  amber: {
    glow: "rgba(245, 158, 11, 0.30)",
    accent: "#f59e0b",
    badge: "rgba(245, 158, 11, 0.9)",
  },
  rose: {
    glow: "rgba(244, 63, 94, 0.28)",
    accent: "#f43f5e",
    badge: "rgba(244, 63, 94, 0.9)",
  },
  blue: {
    glow: "rgba(59, 130, 246, 0.32)",
    accent: "#3b82f6",
    badge: "rgba(59, 130, 246, 0.9)",
  },
  purple: {
    glow: "rgba(168, 85, 247, 0.30)",
    accent: "#a855f7",
    badge: "rgba(168, 85, 247, 0.9)",
  },
  emerald: {
    glow: "rgba(16, 185, 129, 0.32)",
    accent: "#10b981",
    badge: "rgba(16, 185, 129, 0.9)",
  },
};

export function ProjectProgressCard({
  date,
  title,
  category,
  progress,
  timeLeft,
  colorScheme = "teal",
  customColor,
  members = [],
  onAddMember,
  onMenuClick,
  onClick,
  className = "",
}: ProjectProgressCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const theme = colorThemes[colorScheme] || colorThemes.teal;
  const activeAccent = customColor || theme.accent;
  const activeGlow = customColor 
    ? `${customColor}33` 
    : theme.glow;

  // Garante que o progresso fique entre 0 e 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden border border-white/5 transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{
        backgroundColor: "#13151b",
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px 0 rgba(0,0,0,0.4)"
          : "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Luz ambiente no canto superior direito */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full transition-opacity duration-500 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${activeGlow} 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0.85,
        }}
      />

      {/* Header: Data e Menu de Opções */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs font-medium text-white/50 tracking-wide">
          {date}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.();
          }}
          className="p-1.5 -mr-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Opções do projeto"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Centro: Título e Categoria Centralizados */}
      <div className="relative z-10 my-6 text-center space-y-1">
        <h3 className="text-xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-sm text-white/50 font-normal">
          {category}
        </p>
      </div>

      {/* Seção de Progresso */}
      <div className="relative z-10 space-y-1.5 mb-4">
        <div className="text-xs font-semibold text-white/90">Progress</div>
        <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${clampedProgress}%`,
              backgroundColor: activeAccent,
              boxShadow: `0 0 10px ${activeAccent}88`,
            }}
          />
        </div>
        <div className="text-right text-xs font-medium text-white/70 font-mono">
          {clampedProgress}%
        </div>
      </div>

      {/* Footer: Membros e Badge de Tempo Restante */}
      <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
        {/* Avatar Stack */}
        <div className="flex items-center">
          {members.slice(0, 3).map((member, i) => (
            <div
              key={i}
              className="relative w-8 h-8 rounded-full border-2 border-[#13151b] overflow-hidden -ml-2.5 first:ml-0 shadow-sm"
              title={member.name}
            >
              {member.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-base-300 flex items-center justify-center text-[10px] font-bold text-white/80">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
          ))}

          {/* Botão de Adicionar Membro */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddMember?.();
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold -ml-2 border-2 border-[#13151b] shadow-sm hover:scale-110 active:scale-95 transition-all"
            style={{ backgroundColor: activeAccent }}
            aria-label="Adicionar membro"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Badge de Prazo */}
        <div className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white/70 bg-white/5 border border-white/5 tracking-wide">
          {timeLeft}
        </div>
      </div>
    </div>
  );
}

export default ProjectProgressCard;
