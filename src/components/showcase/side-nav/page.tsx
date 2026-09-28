"use client";

import React, { useState, useEffect } from "react";
import SideNav, { SideNavItem } from "@/components/layout/SideNav";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";

export default function SideNavShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Itens exatamente correspondentes aos prints fornecidos pelo usuário
  const sideNavItems: SideNavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: "explorar",
      label: "Explorar Projetos",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    },
    {
      id: "meus-projetos",
      label: "Meus Projetos",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    },
    {
      id: "portfolio",
      label: "Portfólio",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      id: "conquistas",
      label: "Conquistas",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h2m12 0h2a2 2 0 012 2v5a2 2 0 01-2 2h-2m-12 0v3a2 2 0 002 2h8a2 2 0 002-2v-3m-12 0h12" />
        </svg>
      )
    },
    {
      id: "aprendizado",
      label: "Aprendizado",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  const bottomActions = [
    {
      id: "configuracoes",
      label: "Configurações",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      onClick: () => alert("Configurações clicadas")
    },
    {
      id: "sair",
      label: "Sair",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      onClick: () => alert("Logout clicado")
    }
  ];

  const currentUser = {
    name: "EDUARDO AUGUSTO ...",
    subtitle: "Univassouras",
    avatarText: "E"
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-base-100)", color: "var(--color-base-content)" }}>
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <ShowcaseHeader
          title="📂 Side Navigation Bar"
          badge="Showcase"
          backHref="/"
          theme={theme}
          onThemeChange={changeTheme}
        />
      </div>

      {/* Showcase Live Preview Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 pb-12">
        <div className="border border-base-300 rounded-3xl overflow-hidden shadow-2xl bg-base-100 flex flex-col lg:flex-row h-[720px]">
          {/* O Componente SideNav em Funcionamento */}
          <SideNav
            brandName="TechSolution"
            brandAvatarText="TS"
            items={sideNavItems}
            activeId={activeTab}
            onSelect={setActiveTab}
            bottomActions={bottomActions}
            user={currentUser}
            isOpen={isMobileOpen}
            onClose={() => setIsMobileOpen(false)}
          />

          {/* Área de Demonstração de Conteúdo da Página */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-base-200/40">
            {/* Topbar interna com botão para abrir no mobile */}
            <div className="p-4 border-b border-base-300 flex items-center justify-between bg-base-100/70 backdrop-blur-md">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="btn btn-ghost btn-sm lg:hidden gap-2"
              >
                <span>☰</span>
                <span>Menu Lateral</span>
              </button>

              <span className="text-xs font-mono opacity-60 ml-auto">
                Seção Ativa: <strong className="text-primary">{activeTab}</strong>
              </span>
            </div>

            {/* Conteúdo Ilustrado idêntico ao print */}
            <div className="p-6 sm:p-10 space-y-8 flex-1">
              <div>
                <h2 className="text-3xl font-black tracking-tight flex items-center gap-2">
                  Olá, EDUARDO! 👋
                </h2>
                <p className="text-sm opacity-70 mt-1">
                  Explore novos projetos e construa seu portfólio.
                </p>
              </div>

              {/* Card ilustrado do print */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card bg-base-100 p-6 border border-base-300 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center text-lg mb-4">
                    🧰
                  </div>
                  <div className="text-3xl font-black">0</div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-70 mt-1">
                    Projetos Ativos
                  </p>
                  <span className="text-xs opacity-50 mt-1">Em andamento</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-error rounded-full inline-block" />
                  Projetos em Destaque
                </h3>
                <div className="p-8 border border-dashed border-base-300 rounded-2xl bg-base-100/50 text-center opacity-60 text-sm">
                  Conteúdo da seção &ldquo;{activeTab}&rdquo; carregado dinamicamente via SideNav.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
