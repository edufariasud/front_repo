"use client";

import React from "react";

export interface TabNavItem {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  badge?: string | number;
}

export interface ScrollableTabsNavProps {
  items: TabNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export default function ScrollableTabsNav({
  items,
  activeId,
  onSelect,
  className = ""
}: ScrollableTabsNavProps) {
  return (
    <nav
      className={`border-b border-base-300 bg-base-200/60 px-4 sm:px-8 py-2 overflow-x-auto select-none ${className}`}
      aria-label="Navegação em Abas"
    >
      <div className="flex items-center gap-1.5 min-w-max">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`btn btn-xs rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "btn-primary shadow-md scale-105"
                  : "btn-ghost opacity-70 hover:opacity-100"
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span className="badge badge-xs badge-neutral ml-1">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
