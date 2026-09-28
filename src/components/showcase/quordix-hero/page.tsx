"use client";

import React, { useState } from "react";
import Link from "next/link";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { QuordixHero } from "@/components/ui/quordix-hero";

export default function QuordixHeroShowcase() {
  const [activeMode, setActiveMode] = useState<"standalone" | "embed">("embed");

  if (activeMode === "standalone") {
    return <QuordixHero onBack={() => setActiveMode("embed")} showNavbar={true} />;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Header do Showcase */}
        <ShowcaseHeader
          title="Quordix Hero Section"
          badge="Canvas Interativo & Glitch FX"
          backHref="/"
        />

        {/* Card de Apresentação e Controles */}
        <div className="card card-elevated p-6 border border-base-300 mb-8 bg-base-200/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <span>⚡</span> Hero Section com Canvas Interativo de Pontos & Glitch
              </h2>
              <p className="text-sm opacity-75 max-w-2xl">
                Componente do <strong>21st.dev</strong> por <em>quordix</em>. Apresenta uma malha de pontos dinâmica em HTML5 Canvas que reage com atração magnética e calor ao cursor do mouse, tipografia com glitch bi-cromático alternando entre estados, e navbar flutuante em glassmorphism.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/components/quordix-hero"
                className="btn btn-primary font-bold shadow-lg shadow-primary/20 gap-2 cursor-pointer"
              >
                <span>🚀 Abrir em Página Inteira</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-base-300/60 text-xs">
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-primary mb-1">🎯 Dot-Grid Interativo</span>
              Malha canvas calculada matematicamente que detecta proximidade do cursor e acende com brilho em degradê laranjado.
            </div>
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-accent mb-1">⚡ Tipografia Glitch Animada</span>
              Animação CSS de glitch puro com clip-path, sombras cromáticas ciano/magenta e alternância temporal de cor.
            </div>
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-info mb-1">💎 Floating Glassmorphic Pill</span>
              Navbar flutuante arredondada com backdrop-filter, menu hambúrguer responsivo e overlay mobile suave.
            </div>
          </div>
        </div>

        {/* Container Embutido com Preview em Tempo Real */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <span>🖥️</span> Preview Interativo (Passe o mouse sobre a tela para acender os pontos):
            </h3>
            <span className="text-xs opacity-60">Dica: abra a versão em página inteira para experienciar a tela cheia</span>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-base-300 shadow-2xl min-h-[580px] bg-base-100">
            <QuordixHero showNavbar={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
