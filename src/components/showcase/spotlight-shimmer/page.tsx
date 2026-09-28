"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

export default function SpotlightShimmerShowcase() {
  const [activeTab, setActiveTab] = useState<"showcase" | "interactive" | "code">("showcase");
  const [spotlightSize, setSpotlightSize] = useState(380);
  const [shimmerDuration, setShimmerDuration] = useState("2.5s");
  const [selectedGlowColor, setSelectedGlowColor] = useState<"primary" | "cyan" | "emerald" | "crimson">("primary");

  const glowColors = {
    primary: "rgba(250, 204, 21, 0.22)", // Amarelo Bumblebee
    cyan: "rgba(56, 189, 248, 0.25)",    // Ciano Neon
    emerald: "rgba(52, 211, 153, 0.22)", // Verde Esmeralda
    crimson: "rgba(239, 68, 68, 0.24)"   // Rubi Vampire
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Unificado do Showcase */}
        <div className="p-4 sm:p-6 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShowcaseHeader
              title="Spotlight Cards & Shimmer Button"
              badge="Magic UI • 21st.dev"
              backHref="/"
            />

            {/* Abas */}
            <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("showcase")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "showcase" ? "btn-primary" : "btn-ghost"}`}
              >
                Cards com Foco
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "interactive" ? "btn-primary" : "btn-ghost"}`}
              >
                Botões Shimmer
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "code" ? "btn-primary" : "btn-ghost"}`}
              >
                Como Usar
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-8">
          {/* Controles de Customização ao Vivo */}
          <div className="card bg-base-200/70 border border-base-300/80 p-5 rounded-2xl shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <h2 className="font-bold text-base flex items-center gap-2">
                  <span>🔦</span> Controles do Spotlight & Shimmer (Em tempo real)
                </h2>
                <p className="text-xs opacity-70">
                  Efeitos visuais ultraleves que reagem à física do cursor sem bibliotecas de 50MB.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Seletor de Cores de Glow */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold opacity-70">Cor do Foco de Luz</label>
                  <div className="join join-horizontal">
                    {(Object.keys(glowColors) as (keyof typeof glowColors)[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedGlowColor(key)}
                        className={`join-item btn btn-xs capitalize ${selectedGlowColor === key ? "btn-primary" : "btn-outline"}`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider de Tamanho do Foco */}
                <div className="flex flex-col gap-1 min-w-[140px]">
                  <label className="text-[11px] font-semibold opacity-70 flex justify-between">
                    <span>Raio de Iluminação</span>
                    <span className="font-mono text-primary font-bold">{spotlightSize}px</span>
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="600"
                    step="20"
                    value={spotlightSize}
                    onChange={(e) => setSpotlightSize(Number(e.target.value))}
                    className="range range-xs range-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Aba 1: Grid de Spotlight Cards */}
          {activeTab === "showcase" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SpotlightCard
                spotlightSize={spotlightSize}
                spotlightColor={glowColors[selectedGlowColor]}
                className="p-7 flex flex-col justify-between min-h-[260px]"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl border border-primary/20">
                    ⚡
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Performance Ultraleve</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Renderizado com CSS radial gradient e aceleração gráfica por GPU. Zero dependências pesadas no bundle final.
                  </p>
                </div>
                <div className="pt-4 border-t border-base-300/60 flex items-center justify-between text-xs">
                  <span className="text-primary font-semibold">60 FPS Fluido</span>
                  <span className="opacity-50">CSS GPU</span>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightSize={spotlightSize}
                spotlightColor={glowColors[selectedGlowColor]}
                className="p-7 flex flex-col justify-between min-h-[260px]"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xl border border-secondary/20">
                    🛡️
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Supabase & Segurança</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Políticas de Row-Level Security e autenticação social com proteção biométrica e chaves de sessão renováveis.
                  </p>
                </div>
                <div className="pt-4 border-t border-base-300/60 flex items-center justify-between text-xs">
                  <span className="text-secondary font-semibold">RLS Verificado</span>
                  <span className="opacity-50">Postgres 16</span>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightSize={spotlightSize}
                spotlightColor={glowColors[selectedGlowColor]}
                className="p-7 flex flex-col justify-between min-h-[260px]"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-xl border border-accent/20">
                    ✨
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">DaisyUI v5 Nativo</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Cores e contrastes que se adaptam dinamicamente a todos os 13 temas (Bumblebee, Sunset, Vampire e mais).
                  </p>
                </div>
                <div className="pt-4 border-t border-base-300/60 flex items-center justify-between text-xs">
                  <span className="text-accent font-semibold">13 Temas Ativos</span>
                  <span className="opacity-50">Tailwind v4</span>
                </div>
              </SpotlightCard>
            </div>
          )}

          {/* Aba 2: Shimmer Buttons em Ação */}
          {activeTab === "interactive" && (
            <div className="card bg-base-200/50 border border-base-300 p-8 rounded-3xl flex flex-col items-center justify-center gap-8 text-center min-h-[360px]">
              <div className="max-w-md space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">Botões com Shimmer Perimetral</h3>
                <p className="text-xs opacity-70">
                  Um feixe de luz que percorre suavemente a silhueta do botão para atrair a atenção do usuário com elegância e sem agressividade visual.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <ShimmerButton
                  shimmerColor="#facc15"
                  background="var(--color-base-300)"
                  className="px-8 py-3.5"
                >
                  <span className="text-primary font-bold">⭐ Começar Agora</span>
                </ShimmerButton>

                <ShimmerButton
                  shimmerColor="#38bdf8"
                  background="#09090b"
                  className="px-8 py-3.5 text-white"
                >
                  <span>🚀 Publicar na Vercel</span>
                </ShimmerButton>

                <ShimmerButton
                  shimmerColor="#ef4444"
                  background="var(--color-base-200)"
                  className="px-8 py-3.5"
                >
                  <span className="text-error font-semibold">🔥 Oferta Limitada</span>
                </ShimmerButton>
              </div>

              <div className="text-xs opacity-60 max-w-sm">
                Experimente passar o mouse por cima e clicar para sentir a micro-interação de escala elástica.
              </div>
            </div>
          )}

          {/* Aba 3: Como Usar */}
          {activeTab === "code" && (
            <div className="card bg-base-200/60 border border-base-300 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span>💻</span> Exemplos Práticos de Implementação
              </h3>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-primary">1. Spotlight Card</h4>
                <pre className="bg-base-300/80 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-base-300">
{`import { SpotlightCard } from "@/components/ui/SpotlightCard";

<SpotlightCard spotlightColor="rgba(250, 204, 21, 0.2)" className="p-6">
  <h3>Card Iluminado</h3>
  <p>O foco segue o cursor com efeito suave...</p>
</SpotlightCard>`}
                </pre>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-semibold text-primary">2. Shimmer Button</h4>
                <pre className="bg-base-300/80 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-base-300">
{`import { ShimmerButton } from "@/components/ui/ShimmerButton";

<ShimmerButton shimmerColor="#facc15">
  <span>Acessar Plataforma</span>
</ShimmerButton>`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
