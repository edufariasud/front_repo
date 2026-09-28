"use client";

import React, { useState, useEffect } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import styles from "./styles.module.scss";

function NavbarInnerMarkup() {
  return (
    <div className={styles.navbarInner}>
      {/* Brand Logo */}
      <div className={styles.logo}>
        <div className="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center font-bold shadow-md">
          ▲
        </div>
        <span className={styles.logoText}>Startup UI</span>
      </div>

      {/* Center navigation links */}
      <div className={styles.menu}>
        <span className={styles.menuItem}>Recursos</span>
        <span className={styles.menuItem}>Preços</span>
        <span className={styles.menuItem}>Depoimentos</span>
        <span className={styles.menuItem}>Documentação</span>
      </div>

      {/* Right side CTAs */}
      <div className={styles.actions}>
        <span className={styles.loginLink}>Entrar</span>
        <button className="btn btn-primary btn-sm rounded-xl font-bold shadow-md cursor-pointer">
          Começar Grátis
        </button>
      </div>
    </div>
  );
}

export default function ResizableNavbarShowcase() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [forceMode, setForceMode] = useState<"auto" | "expanded" | "shrunk">("auto");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (forceMode === "auto") {
      setIsScrolled(e.currentTarget.scrollTop > 35);
    }
  };

  const effectiveShrunk = forceMode === "auto" ? isScrolled : forceMode === "shrunk";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-base-100)", color: "var(--color-base-content)" }}>
      <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <ShowcaseHeader
          title="🗺️ Resizable Navbar"
          badge="Aceternity UI"
          backHref="/"
          theme={theme}
          onThemeChange={changeTheme}
        />
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 pb-12 space-y-8">
        {/* Interactive Sandbox Card */}
        <div className="card bg-base-100 p-6 sm:p-8 border border-base-300 rounded-3xl shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-4">
            <div>
              <h2 className="text-xl font-black flex items-center gap-2">
                <span>🔴</span> Sandbox Interativo
              </h2>
              <p className="text-xs opacity-70 mt-0.5">
                Role a caixa abaixo para ver a transição fluida entre o estado expandido e o modo compacto flutuante.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="join join-horizontal">
                <button
                  onClick={() => setForceMode("auto")}
                  className={`btn btn-xs join-item font-semibold ${forceMode === "auto" ? "btn-primary" : "btn-ghost"}`}
                >
                  Auto (Scroll)
                </button>
                <button
                  onClick={() => setForceMode("expanded")}
                  className={`btn btn-xs join-item font-semibold ${forceMode === "expanded" ? "btn-primary" : "btn-ghost"}`}
                >
                  Expandida
                </button>
                <button
                  onClick={() => setForceMode("shrunk")}
                  className={`btn btn-xs join-item font-semibold ${forceMode === "shrunk" ? "btn-primary" : "btn-ghost"}`}
                >
                  Compacta
                </button>
              </div>

              <span className={`badge ${effectiveShrunk ? "badge-secondary" : "badge-primary"} font-bold text-xs`}>
                {effectiveShrunk ? "✨ Modo Compacto (Shrunk)" : "📏 Modo Expandido (Full)"}
              </span>
            </div>
          </div>

          <div className={styles.sandbox} onScroll={handleScroll}>
            {/* Animated Resizable Navbar sticky element */}
            <div className={`${styles.navbarWrapper} ${effectiveShrunk ? styles.shrunk : styles.expanded}`}>
              <NavbarInnerMarkup />
            </div>

            {/* Mock Page Content inside sandbox */}
            <div className={styles.sandboxContent}>
              <div className={styles.section} id="features">
                <h2>🚀 1. Seção Principal (Hero)</h2>
                <p>
                  No topo da página, a barra de navegação ocupa 100% da largura, integrando-se organicamente ao layout inicial com borda inferior sutil.
                </p>
                <span className="badge badge-outline badge-sm">Role para baixo para ativar o efeito ↓</span>
              </div>

              <div className={styles.section} id="pricing">
                <h2>💎 2. Seção de Recursos (Floating)</h2>
                <p>
                  Ao rolar a página, o menu reduz de tamanho, ganha cantos arredondados flutuantes (`rounded-full`), fundo translúcido com `backdrop-blur` e sombra refinada.
                </p>
              </div>

              <div className={styles.section} id="contact">
                <h2>📞 3. Seção de Contato & Footer</h2>
                <p>
                  A navbar permanece fixada no topo de forma leve e discreta sem bloquear o conteúdo de leitura do usuário.
                </p>
                <span className="badge badge-outline badge-sm">Role de volta para o topo ↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Static State Comparison Side-by-Side */}
        <div className="space-y-4">
          <h3 className="text-xl font-black flex items-center gap-2">
            <span>🌟</span> Estados Estáticos da Navbar
          </h3>
          <p className="text-xs opacity-70">
            Renderização isolada dos dois modos estáticos para inspeção de tokens e estilos.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Estado 1: Expandido */}
            <div className="card bg-base-100 p-6 border border-base-300 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm">1. Estado Padrão (Topo)</span>
                <span className="badge badge-primary badge-xs font-bold">100% Largura</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-base-300 bg-base-200/40 p-3">
                <div className={`${styles.navbarWrapper} ${styles.expanded}`} style={{ position: "relative" }}>
                  <NavbarInnerMarkup />
                </div>
              </div>
            </div>

            {/* Estado 2: Compacto */}
            <div className="card bg-base-100 p-6 border border-base-300 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm">2. Estado Flutuante (Scroll)</span>
                <span className="badge badge-secondary badge-xs font-bold">Pill / Backdrop Blur</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-base-300 bg-base-200/40 p-3 flex justify-center">
                <div className={`${styles.navbarWrapper} ${styles.shrunk}`} style={{ position: "relative", padding: 0 }}>
                  <NavbarInnerMarkup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
