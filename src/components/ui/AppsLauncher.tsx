"use client";

import React, { useState, useRef, useEffect } from "react";

export interface AppLauncherItem {
  id: string;
  name: string;
  description?: string;
  icon: React.ReactNode;
  iconBg?: string;
  badge?: string;
  badgeVariant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info";
  href?: string;
  target?: string;
  onClick?: () => void;
  category?: "favoritos" | "servicos" | "ferramentas";
}

export interface AppsLauncherProps {
  apps?: AppLauncherItem[];
  title?: string;
  onSelectApp?: (app: AppLauncherItem) => void;
  onOpenMore?: () => void;
}

const DEFAULT_APPS: AppLauncherItem[] = [
  {
    id: "catalog",
    name: "Loja Virtual",
    description: "Gestão do catálogo e vitrine",
    iconBg: "bg-linear-to-br from-purple-500 to-indigo-600 text-white",
    badge: "Novo",
    badgeVariant: "primary",
    category: "favoritos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Métricas e faturamento",
    iconBg: "bg-linear-to-br from-blue-500 to-cyan-600 text-white",
    category: "favoritos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: "crm",
    name: "Clientes CRM",
    description: "Base e relacionamento",
    iconBg: "bg-linear-to-br from-emerald-500 to-teal-600 text-white",
    category: "favoritos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: "checkout",
    name: "Pagamentos",
    description: "Gateway e cobranças",
    iconBg: "bg-linear-to-br from-amber-500 to-orange-600 text-white",
    category: "servicos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    id: "shipping",
    name: "Entregas & Frete",
    description: "Rastreio e logística",
    iconBg: "bg-linear-to-br from-rose-500 to-red-600 text-white",
    category: "servicos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    )
  },
  {
    id: "inbox",
    name: "Mensagens",
    description: "SAC e conversas ativas",
    iconBg: "bg-linear-to-br from-violet-500 to-purple-600 text-white",
    badge: "3",
    badgeVariant: "accent",
    category: "servicos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    id: "ai-assistant",
    name: "IA Copilot",
    description: "Geração de texto e automações",
    iconBg: "bg-linear-to-br from-fuchsia-500 to-pink-600 text-white",
    category: "ferramentas",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: "invoices",
    name: "Notas Fiscais",
    description: "Emissão fiscal e tributos",
    iconBg: "bg-linear-to-br from-emerald-600 to-green-700 text-white",
    category: "ferramentas",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: "settings",
    name: "Ajustes Globais",
    description: "Segurança e preferências",
    iconBg: "bg-linear-to-br from-slate-600 to-gray-700 text-white",
    category: "ferramentas",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function AppsLauncher({
  apps = DEFAULT_APPS,
  title = "Seus Aplicativos",
  onSelectApp,
  onOpenMore
}: AppsLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    (app.description && app.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAppClick = (app: AppLauncherItem) => {
    if (app.onClick) {
      app.onClick();
    }
    onSelectApp?.(app);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Botão Gatilho Waffle Icon (9-dots grid) */}
      <button
        id="apps-launcher-trigger"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`btn btn-ghost btn-circle btn-sm relative transition-all duration-200 cursor-pointer ${
          isOpen ? "bg-base-200 ring-2 ring-primary/40 text-primary" : "text-base-content/80 hover:text-base-content"
        }`}
        aria-label="Abrir inicializador de aplicativos"
        title="Aplicativos & Ferramentas"
      >
        {/* 2x2 Grid Icon (4 squares) */}
        <svg
          className="w-5 h-5 transition-transform duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7.5" height="7.5" rx="1.8" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8" />
        </svg>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          id="apps-launcher-popover"
          className="absolute right-0 mt-3 w-84 sm:w-96 rounded-3xl shadow-2xl z-50 p-4 border animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
          style={{
            background: "var(--color-base-100)",
            borderColor: "var(--color-base-300)"
          }}
        >
          {/* Header do Menu */}
          <div className="flex items-center justify-between pb-3 border-b border-base-300/80 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-base" role="img" aria-hidden="true">🚀</span>
              <h4 className="font-extrabold text-sm text-base-content tracking-tight">{title}</h4>
            </div>
            <span className="badge badge-sm badge-ghost font-mono text-[10px] opacity-70">
              {apps.length} apps
            </span>
          </div>

          {/* Campo de Busca Rápida (para quando houver muitos apps) */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Buscar aplicativo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered input-xs w-full rounded-xl pl-8 text-xs bg-base-200/50"
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-2 opacity-50 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1.5 text-xs opacity-50 hover:opacity-100 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Grade de Aplicativos (3 Colunas) */}
          <div className="grid grid-cols-3 gap-2.5 max-h-76 overflow-y-auto pr-1">
            {filteredApps.length === 0 ? (
              <div className="col-span-3 text-center py-6 text-xs opacity-60">
                Nenhum aplicativo encontrado para "{search}".
              </div>
            ) : (
              filteredApps.map((app) => {
                const badgeColorClass = app.badgeVariant ? `badge-${app.badgeVariant}` : "badge-primary";
                return (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-base-200/80 active:scale-95 transition-all duration-150 text-center group cursor-pointer relative border border-transparent hover:border-base-300"
                  >
                    {/* Badge opcional no topo do card */}
                    {app.badge && (
                      <span className={`badge badge-xs font-bold absolute top-1.5 right-1.5 ${badgeColorClass}`}>
                        {app.badge}
                      </span>
                    )}

                    {/* Ícone com gradiente */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform duration-200 ${
                        app.iconBg || "bg-primary text-primary-content"
                      }`}
                    >
                      {app.icon}
                    </div>

                    {/* Nome do Aplicativo */}
                    <span className="text-xs font-bold text-base-content line-clamp-1 group-hover:text-primary transition-colors">
                      {app.name}
                    </span>

                    {/* Subtítulo / Descrição sutil */}
                    {app.description && (
                      <span className="text-[10px] opacity-50 line-clamp-1 mt-0.5 max-w-full">
                        {app.description}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Rodapé / CTA para mais apps */}
          <div className="mt-3 pt-2.5 border-t border-base-300/80 flex items-center justify-between text-xs">
            <span className="opacity-50 text-[11px]">Ecossistema Integrado</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenMore?.();
              }}
              className="text-primary font-bold hover:underline cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <span>Ver mais</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
