"use client";

import React from "react";
import Link from "next/link";

interface ShowcaseHeaderProps {
  title: string;
  badge?: string;
  backHref?: string;
  onBack?: () => void;
  theme?: string;
  onThemeChange?: (theme: string) => void;
  className?: string;
}

const DAISY_THEMES = [
  "dark", "light", "bumblebee", "dark-bumblebee", "synthwave", "forest", "luxury",
  "vampire", "business", "night", "dim", "sunset", "abyss"
];

export default function ShowcaseHeader({
  title,
  badge = "Showcase",
  backHref = "/",
  onBack,
  theme,
  onThemeChange,
  className = ""
}: ShowcaseHeaderProps) {
  const renderBackButton = () => {
    const content = (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span>Voltar</span>
      </>
    );

    if (onBack) {
      return (
        <button
          type="button"
          onClick={onBack}
          className="btn btn-outline btn-sm rounded-full gap-1.5 font-medium px-3.5 transition-all hover:scale-105 cursor-pointer"
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        href={backHref}
        className="btn btn-outline btn-sm rounded-full gap-1.5 font-medium px-3.5 transition-all hover:scale-105"
      >
        {content}
      </Link>
    );
  };

  return (
    <header className={`w-full mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between items-start text-left gap-4 ${className}`}>
      {/* Container de Título e Botão Voltar (Sempre aninhado à esquerda) */}
      <div className="flex flex-col sm:flex-row sm:items-center items-start justify-start gap-3 sm:gap-4 text-left w-full md:w-auto">
        {/* Voltar e Badge sempre alinhados à esquerda */}
        <div className="flex items-center justify-start gap-2.5 shrink-0 self-start">
          {renderBackButton()}

          {badge && (
            <span className="badge badge-primary badge-sm font-semibold px-2.5 py-1">
              {badge}
            </span>
          )}
        </div>

        {/* Título Principal alinhado à esquerda */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-base-content text-left">
          {title}
        </h1>
      </div>

      {/* Seletor de Tema */}
      {theme && onThemeChange && (
        <div className="flex items-center justify-start gap-2 self-start md:self-center shrink-0">
          <span className="text-xs font-semibold opacity-70">Tema:</span>
          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value)}
            className="select select-bordered select-xs rounded-lg"
            style={{
              background: "var(--color-base-200)",
              color: "var(--color-base-content)",
              border: "1px solid var(--color-base-300)"
            }}
          >
            {DAISY_THEMES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
}
