"use client";

import React from "react";

export const DAISY_THEMES = [
  "dark", "light", "bumblebee", "dark-bumblebee", "synthwave", "forest", "luxury",
  "vampire", "business", "night", "dim", "sunset", "abyss"
] as const;

export type DaisyTheme = (typeof DAISY_THEMES)[number];

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  compact?: boolean;
}

export default function ThemeSwitcher({
  currentTheme,
  onThemeChange,
  compact = false
}: ThemeSwitcherProps) {
  return (
    <div className="flex items-center gap-2" id="theme-switcher-container">
      {!compact && (
        <span className="text-xs font-semibold uppercase tracking-wider opacity-70 hidden sm:inline-block">
          Tema:
        </span>
      )}
      <select
        id="theme-select-dropdown"
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value)}
        className="select select-sm select-bordered font-medium"
        style={{
          background: "var(--color-base-200)",
          color: "var(--color-base-content)",
          border: "1px solid var(--color-base-300)",
          borderRadius: "var(--radius-field, 0.375rem)"
        }}
        aria-label="Selecionar tema do DaisyUI"
      >
        {DAISY_THEMES.map((themeName) => (
          <option
            key={themeName}
            value={themeName}
            style={{
              background: "var(--color-base-200)",
              color: "var(--color-base-content)"
            }}
          >
            🎨 {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
