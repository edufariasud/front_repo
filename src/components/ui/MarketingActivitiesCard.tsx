"use client";

import React, { useState, useEffect } from "react";

export interface TeamMemberAvatar {
  name: string;
  avatarUrl: string;
}

export interface ActivitySegment {
  id: string;
  label: string;
  value: number; // porcentagem de 0 a 100
  color: string;
}

export type MarketingCardLayout = "horizontal" | "vertical";

export interface MarketingActivitiesProps {
  /** 
   * Layout dos cards internos:
   * - "horizontal": Lado a lado (estilo original da referência)
   * - "vertical": Empilhado (um em cima do outro, ideal para sidebars ou telas estreitas)
   * @default "horizontal"
   */
  layout?: MarketingCardLayout;
  /** Título principal do card (padrão: "Marketing Activities") */
  title?: string;
  /** Total de horas de atividades da equipe (padrão: 16.5) */
  totalHours?: number;
  /** Total de membros na equipe (padrão: 235) */
  totalMembers?: number;
  /** Segmentos da barra de atividades */
  segments?: ActivitySegment[];
  /** Avatares dos membros exibidos */
  teamAvatars?: TeamMemberAvatar[];
  /** Texto do banner inferior */
  bannerText?: string;
  /** Texto do botão de ação */
  actionButtonText?: string;
  /** Callback ao clicar no botão "See All" */
  onSeeAllClick?: () => void;
  /** Callback ao clicar no botão de filtro */
  onFilterClick?: () => void;
  /** Duração da animação em milissegundos (padrão: 1400ms) */
  animationDuration?: number;
  /** Classes CSS adicionais */
  className?: string;
}

const defaultSegments: ActivitySegment[] = [
  { id: "productive", label: "Productive", value: 54, color: "#00d665" },
  { id: "middle", label: "Middle", value: 24, color: "#a6e22e" },
  { id: "break", label: "Break", value: 14, color: "#facc15" },
  { id: "idle", label: "Idle", value: 8, color: "#1e293b" },
];

const defaultAvatars: TeamMemberAvatar[] = [
  { name: "Lucas", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Camila", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { name: "Rafael", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { name: "Beatriz", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
];

export function MarketingActivitiesCard({
  layout = "horizontal",
  title = "Marketing Activities",
  totalHours = 16.5,
  totalMembers = 235,
  segments = defaultSegments,
  teamAvatars = defaultAvatars,
  bannerText = "Manage your activities and team members",
  actionButtonText = "See All",
  onSeeAllClick,
  onFilterClick,
  animationDuration = 1400,
  className = "",
}: MarketingActivitiesProps) {
  const [animatedHours, setAnimatedHours] = useState(0);
  const [animatedMembers, setAnimatedMembers] = useState(0);
  const [isBarExpanded, setIsBarExpanded] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Animação dos números a partir do zero usando requestAnimationFrame com curva cúbica ease-out
  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    // Inicia a expansão da barra logo após o primeiro tick
    const barTimeout = setTimeout(() => {
      setIsBarExpanded(true);
    }, 80);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const rawProgress = Math.min(elapsed / animationDuration, 1);
      
      // Curva cúbica easeOut: f(t) = 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - rawProgress, 3);

      setAnimatedHours(Number((totalHours * easeProgress).toFixed(1)));
      setAnimatedMembers(Math.floor(totalMembers * easeProgress));

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setAnimatedHours(totalHours);
        setAnimatedMembers(totalMembers);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(barTimeout);
    };
  }, [totalHours, totalMembers, animationDuration, animationKey]);

  return (
    <div
      className={`relative w-full ${
        layout === "horizontal" ? "max-w-[620px]" : "max-w-[390px]"
      } rounded-3xl p-6 sm:p-7 bg-base-100 text-base-content border border-base-300 shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Header Principal */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <button
          type="button"
          onClick={onFilterClick}
          className="p-2 rounded-xl text-base-content/60 hover:text-base-content hover:bg-base-200 transition-colors"
          aria-label="Filtrar atividades"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Grid com 2 Cards Internos (Lado a Lado no horizontal, empilhado no vertical) */}
      <div
        className={`grid gap-4 sm:gap-5 mb-5 ${
          layout === "horizontal" ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* Card 1: Team Activities */}
        <div className="rounded-2xl p-5 bg-base-200/50 border border-base-300/80 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3 text-base-content/70">
              <span className="text-xs sm:text-sm font-medium">Team Activities</span>
              <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </div>

            {/* Número grande animado */}
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
                {animatedHours.toFixed(1)}
              </span>
              <span className="text-xs sm:text-sm font-normal text-base-content/60">
                hours
              </span>
            </div>

            {/* Barra de Progresso Multi-Segmentos Animada a partir do zero */}
            <div className="w-full h-2 rounded-full overflow-hidden bg-base-300/60 flex items-center mb-3">
              {segments.map((segment) => {
                const targetWidth = isBarExpanded ? segment.value : 0;
                return (
                  <div
                    key={segment.id}
                    style={{
                      width: `${targetWidth}%`,
                      backgroundColor: segment.color,
                      transition: `width ${animationDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }}
                    className="h-full first:rounded-l-full last:rounded-r-full"
                    title={`${segment.label}: ${segment.value}%`}
                  />
                );
              })}
            </div>
          </div>

          {/* Legenda dos Segmentos */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-base-content/70">
            {segments.map((segment) => (
              <div key={segment.id} className="inline-flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
                <span>{segment.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Team */}
        <div 
          className="rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all"
          style={{
            backgroundColor: "rgba(238, 249, 219, 0.95)",
            color: "#1d3a0e",
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-3 text-[#2a4d16]">
              <span className="text-xs sm:text-sm font-semibold">Team</span>
              <svg className="w-5 h-5 opacity-85" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>

            {/* Número grande animado */}
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-[#1b380a]">
                {animatedMembers}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#46662e]">
                members
              </span>
            </div>
          </div>

          {/* Pilha de 4 Avatares */}
          <div className="flex items-center pt-2">
            {teamAvatars.slice(0, 4).map((member, i) => (
              <div
                key={i}
                className="relative w-8 h-8 rounded-full border-2 border-[#eef9db] overflow-hidden -ml-2 first:ml-0 shadow-sm"
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
                  <div className="w-full h-full bg-[#3b6622] text-white flex items-center justify-center text-[10px] font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Inferior: Manage your activities... + See All */}
      <div className="rounded-2xl p-3 sm:p-3.5 bg-base-200/60 border border-base-300/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-base-100 shadow-sm border border-base-300 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-base-content/80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs sm:text-sm text-base-content/80 font-medium truncate">
            {bannerText}
          </span>
        </div>

        <button
          type="button"
          onClick={onSeeAllClick}
          className="btn btn-sm btn-neutral rounded-xl px-4 text-xs font-semibold gap-1.5 shrink-0 shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <span>{actionButtonText}</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MarketingActivitiesCard;
