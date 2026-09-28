"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

export interface SideNavItem {
  id: string;
  label: string;
  icon: ReactNode | string;
  href?: string;
  target?: string;
  section?: string;
  badge?: string | number;
  badgeVariant?: "primary" | "secondary" | "accent" | "error" | "warning" | "info";
  disabled?: boolean;
}

export interface SideNavSection {
  id?: string;
  title?: string;
  items: SideNavItem[];
}

export interface SideNavUser {
  name: string;
  subtitle?: string;
  avatarText?: string;
  avatarUrl?: string;
}

export interface SideNavProps {
  // Brand Header
  brandName?: string;
  brandBadge?: string;
  brandIcon?: ReactNode | string;
  brandAvatarText?: string;

  // Navigation Items (either flat items list or grouped sections)
  items?: SideNavItem[];
  sections?: SideNavSection[];
  activeId: string;
  onSelect: (id: string) => void;

  // Secondary Bottom Actions
  bottomActions?: {
    id: string;
    label: string;
    icon: ReactNode | string;
    onClick: () => void;
  }[];

  // User Card Footer
  user?: SideNavUser;
  onUserClick?: () => void;

  // Mobile drawer control
  isOpen?: boolean;
  onClose?: () => void;

  // Additional styling & Theme adaptability
  className?: string;
  activeVariant?: "primary" | "gradient" | "solid" | "red";
  activeColor?: string; // Cor customizada escolhida pelo usuário (ex: '#e50914', 'red', 'indigo', etc.)
  currentTheme?: string; // Tema atual (ex: 'dark', 'light', 'synthwave', 'dracula', etc.)
}

export default function SideNav({
  brandName = "TechSolution",
  brandBadge,
  brandIcon,
  brandAvatarText = "TS",
  items = [],
  sections,
  activeId,
  onSelect,
  bottomActions = [],
  user,
  onUserClick,
  isOpen = false,
  onClose,
  className = "",
  activeVariant = "red",
  activeColor,
  currentTheme = "dark"
}: SideNavProps) {
  // Normaliza itens ou seções para compatibilidade total
  const normalizedSections: SideNavSection[] = React.useMemo(() => {
    if (sections && sections.length > 0) {
      return sections;
    }
    if (!items || items.length === 0) {
      return [];
    }
    const hasSections = items.some((item) => item.section);
    if (!hasSections) {
      return [{ items }];
    }
    const grouped: { [key: string]: SideNavItem[] } = {};
    const sectionOrder: string[] = [];
    items.forEach((item) => {
      const secKey = item.section || "";
      if (!grouped[secKey]) {
        grouped[secKey] = [];
        sectionOrder.push(secKey);
      }
      grouped[secKey].push(item);
    });
    return sectionOrder.map((secKey) => ({
      title: secKey || undefined,
      items: grouped[secKey]
    }));
  }, [items, sections]);

  const renderIcon = (icon: ReactNode | string) => {
    if (typeof icon === "string") {
      // Se for emoji ou texto curto
      if (icon.length <= 4) {
        return <span className="text-lg leading-none" role="img" aria-hidden="true">{icon}</span>;
      }
      return <span className="text-base font-semibold">{icon}</span>;
    }
    return <span className="w-5 h-5 flex items-center justify-center">{icon}</span>;
  };

  // Se o tema for 'dark' ou 'light', honra a cor escolhida pelo usuário (ou o padrão 'red').
  // Se for qualquer outro tema (ex: synthwave, forest, dracula, bumblebee, etc.), acompanha as cores do tema (primary)!
  const isFixedTheme = currentTheme === "dark" || currentTheme === "light";
  const effectiveColor = isFixedTheme ? (activeColor || "red") : "theme";

  const getActiveItemClasses = () => {
    if (effectiveColor === "theme") {
      return "bg-primary text-primary-content shadow-lg shadow-primary/30 font-bold";
    }

    switch (effectiveColor) {
      case "blue":
        return "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold";
      case "emerald":
      case "green":
        return "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-bold";
      case "purple":
        return "bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold";
      case "amber":
      case "orange":
        return "bg-amber-600 text-white shadow-lg shadow-amber-600/30 font-bold";
      case "red":
      default:
        return "bg-error text-error-content shadow-lg shadow-error/30 font-bold";
    }
  };

  const getItemClasses = (item: SideNavItem, isActive: boolean) =>
    `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
      isActive
        ? getActiveItemClasses()
        : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
    } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`;

  const renderItemInner = (item: SideNavItem, isActive: boolean) => (
    <>
      <div className="flex items-center gap-3 truncate">
        <div className={`transition-transform duration-200 ${isActive ? "scale-110" : "opacity-75"}`}>
          {renderIcon(item.icon)}
        </div>
        <span className="truncate">{item.label}</span>
      </div>

      {item.badge && (
        <span
          className={`badge badge-sm font-bold ${
            isActive
              ? "badge-ghost bg-white/20 text-white border-0"
              : "badge-primary"
          }`}
        >
          {item.badge}
        </span>
      )}
    </>
  );

  const getUserAvatarBackground = () => {
    if (effectiveColor === "theme") {
      return "linear-gradient(135deg, var(--color-primary), var(--color-primary-content, #000))";
    }

    switch (effectiveColor) {
      case "blue":
        return "linear-gradient(135deg, #2563eb, #1e3a8a)";
      case "emerald":
      case "green":
        return "linear-gradient(135deg, #059669, #064e3b)";
      case "purple":
        return "linear-gradient(135deg, #9333ea, #581c87)";
      case "amber":
      case "orange":
        return "linear-gradient(135deg, #d97706, #78350f)";
      case "red":
      default:
        return "linear-gradient(135deg, #b91c1c, #7f1d1d)";
    }
  };

  const sideNavContent = (
    <aside
      className={`w-64 h-full flex flex-col justify-between border-r border-base-300 bg-base-100 transition-all duration-300 select-none ${className}`}
      style={{
        background: "var(--color-base-100)",
        color: "var(--color-base-content)"
      }}
    >
      {/* 1. Header do Brand */}
      <div className="p-6 border-b border-base-200/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {brandIcon ? (
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-base-200 font-black">
              {brandIcon}
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shadow-md"
              style={{
                background: "linear-gradient(135deg, #781015, #450a0a)",
                color: "#ffffff"
              }}
            >
              {brandAvatarText}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight leading-tight">
                {brandName}
              </span>
              {brandBadge && (
                <span className="badge badge-xs badge-primary font-bold">{brandBadge}</span>
              )}
            </div>
          </div>
        </div>

        {/* Botão fechar no mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost btn-xs btn-circle lg:hidden"
            aria-label="Fechar Menu"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. Lista de Navegação Principal com Suporte a Seções/Grupos */}
      <div className="flex-1 px-3.5 py-4 overflow-y-auto space-y-4 scrollbar-thin">
        {normalizedSections.map((section, sIdx) => (
          <div key={section.id || section.title || `section-${sIdx}`} className="space-y-1">
            {section.title && (
              <div className="pt-2 pb-1.5 px-2 flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-base-content/50">
                  {section.title}
                </span>
                <div className="h-px flex-1 bg-base-300/60" />
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeId === item.id;
                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.disabled ? "#" : item.href}
                      target={item.target}
                      onClick={(e) => {
                        if (item.disabled) {
                          e.preventDefault();
                          return;
                        }
                        onSelect(item.id);
                        if (onClose) onClose();
                      }}
                      className={getItemClasses(item, isActive)}
                      aria-current={isActive ? "page" : undefined}
                      aria-disabled={item.disabled}
                    >
                      {renderItemInner(item, isActive)}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (!item.disabled) {
                        onSelect(item.id);
                        if (onClose) onClose();
                      }
                    }}
                    disabled={item.disabled}
                    className={getItemClasses(item, isActive)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {renderItemInner(item, isActive)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Rodapé com Ações Secundárias e Card de Usuário */}
      <div className="p-3.5 border-t border-base-200/60 space-y-3 bg-base-100/50">
        {/* Ações inferiores (ex: Configurações, Sair) */}
        {bottomActions.length > 0 && (
          <div className="space-y-1">
            {bottomActions.map((action) => (
              <button
                key={action.id}
                onClick={action.onClick}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-base-content/75 hover:bg-base-200 hover:text-base-content transition-colors cursor-pointer text-left"
              >
                <div className="opacity-70">{renderIcon(action.icon)}</div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Card do Usuário (como no print) */}
        {user && (
          <div
            onClick={onUserClick}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-base-200/70 hover:bg-base-200 border border-base-300 transition-all cursor-pointer"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-9 h-9 rounded-xl object-cover"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center shadow-inner"
                style={{
                  background: getUserAvatarBackground(),
                  color: "#ffffff"
                }}
              >
                {user.avatarText || user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="truncate flex-1">
              <p className="font-extrabold text-xs tracking-tight truncate leading-tight">
                {user.name}
              </p>
              {user.subtitle && (
                <p className="text-[11px] opacity-65 truncate leading-tight mt-0.5">
                  {user.subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop SideNav (fixo no layout) */}
      <div className="hidden lg:flex flex-shrink-0 h-full">
        {sideNavContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative z-10 h-full">
            {sideNavContent}
          </div>
        </div>
      )}
    </>
  );
}
