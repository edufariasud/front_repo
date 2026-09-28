"use client";

import React, { useState } from "react";
import Link from "next/link";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { HorizonHeroSection } from "@/components/ui/horizon-hero-section";

export default function HorizonHeroShowcase() {
  const [activeMode, setActiveMode] = useState<"standalone" | "embed">("embed");

  if (activeMode === "standalone") {
    return <HorizonHeroSection onBack={() => setActiveMode("embed")} showTopNav={true} />;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Header do Showcase */}
        <ShowcaseHeader
          title="Horizon Hero Section 3D"
          badge="Three.js • Bloom & GSAP"
          backHref="/"
        />

        {/* Card de Apresentação e Controles */}
        <div className="card card-elevated p-6 border border-base-300 mb-8 bg-base-200/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <span>🌌</span> Experiência Cósmica Interativa 3D
              </h2>
              <p className="text-sm opacity-75 max-w-2xl">
                Componente imersivo do <strong>21st.dev</strong> por <em>lovesickfromthe6ix</em>. Combina renderização <strong>Three.js</strong> com shaders procedurais, pós-processamento <strong>UnrealBloomPass</strong>, paralaxe montanhosa em múltiplas camadas e orquestração fluida com <strong>GSAP</strong> vinculada à rolagem.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/components/horizon-hero"
                className="btn btn-primary font-bold shadow-lg shadow-primary/20 gap-2 cursor-pointer"
              >
                <span>🚀 Abrir em Página Inteira</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-base-300/60 text-xs">
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-primary mb-1">✨ Shaders de Partículas</span>
              Campo de 4.500 estrelas em 3 camadas de profundidade com rotação assíncrona e atenuação de borda.
            </div>
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-accent mb-1">🏔️ Montanhas em Paralaxe</span>
              4 camadas geométricas geradas matematicamente com atenuação de opacidade e movimento sincronizado.
            </div>
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-info mb-1">📜 Rolagem Conectada</span>
              Câmera suave que viaja entre órbitas <strong>HORIZON → COSMOS → INFINITY</strong> conforme o scroll do usuário.
            </div>
          </div>
        </div>

        {/* Container Embutido com Preview em Tempo Real */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <span>🖥️</span> Preview Interativo (Role a página para navegar pelas órbitas):
            </h3>
            <span className="text-xs opacity-60">Dica: abra a versão em página inteira para máxima imersão</span>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden border border-base-300 shadow-2xl bg-[#030014]">
            <HorizonHeroSection showTopNav={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
