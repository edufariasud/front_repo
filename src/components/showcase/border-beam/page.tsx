"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { BorderBeam } from "@/components/ui/BorderBeam";

export default function BorderBeamShowcase() {
  const [activeTab, setActiveTab] = useState<"preview" | "pricing" | "code">("preview");
  const [duration, setDuration] = useState(6);
  const [borderWidth, setBorderWidth] = useState(2);
  const [selectedPreset, setSelectedPreset] = useState<"bumblebee" | "sunset" | "vampire" | "cyberpunk">("bumblebee");

  const presets = {
    bumblebee: {
      name: "Dark Bumblebee (Amarelo & Dourado)",
      from: "#facc15",
      to: "#eab308",
      accent: "text-warning"
    },
    sunset: {
      name: "Sunset (Laranja & Magenta)",
      from: "#ff7e5f",
      to: "#feb47b",
      accent: "text-secondary"
    },
    vampire: {
      name: "Vampire (Rubi & Crimson)",
      from: "#dc2626",
      to: "#991b1b",
      accent: "text-error"
    },
    cyberpunk: {
      name: "Cyberpunk (Ciano & Roxo Neon)",
      from: "#00f2fe",
      to: "#4facfe",
      accent: "text-info"
    }
  };

  const currentPreset = presets[selectedPreset];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Unificado do Showcase */}
        <div className="p-4 sm:p-6 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShowcaseHeader
              title="Border Beam Glow"
              badge="CSS-Only • 21st.dev"
              backHref="/"
            />

            {/* Abas */}
            <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "preview" ? "btn-primary" : "btn-ghost"}`}
              >
                Cards Showcase
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pricing")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "pricing" ? "btn-primary" : "btn-ghost"}`}
              >
                Pricing Spotlight
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "code" ? "btn-primary" : "btn-ghost"}`}
              >
                Instalação & Código
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-8">
          {/* Painel de Controles Interativos */}
          <div className="card bg-base-200/70 border border-base-300/80 p-5 rounded-2xl shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <h2 className="font-bold text-base flex items-center gap-2">
                  <span>🎛️</span> Controles do Feixe de Luz (Em tempo real)
                </h2>
                <p className="text-xs opacity-70">
                  Feixe animado 100% em CSS sem bibliotecas externas pesadas. Ajuste velocidade, espessura e paletas.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                {/* Seletor de Presets de Cores */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold opacity-70">Paleta de Cor</label>
                  <div className="join join-horizontal">
                    {(Object.keys(presets) as (keyof typeof presets)[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedPreset(key)}
                        className={`join-item btn btn-xs capitalize ${selectedPreset === key ? "btn-primary" : "btn-outline"}`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider de Duração (Velocidade) */}
                <div className="flex flex-col gap-1 min-w-[140px]">
                  <label className="text-[11px] font-semibold opacity-70 flex justify-between">
                    <span>Velocidade</span>
                    <span className="font-mono text-primary font-bold">{duration}s</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="range range-xs range-primary"
                  />
                </div>

                {/* Slider de Espessura */}
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <label className="text-[11px] font-semibold opacity-70 flex justify-between">
                    <span>Espessura</span>
                    <span className="font-mono text-primary font-bold">{borderWidth}px</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(Number(e.target.value))}
                    className="range range-xs range-secondary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Aba 1: Cards Showcase */}
          {activeTab === "preview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Métricas / Analytics */}
              <div className="relative rounded-2xl bg-base-200/60 p-6 border border-base-300 shadow-lg flex flex-col justify-between overflow-hidden group hover:bg-base-200/90 transition-all duration-300">
                <BorderBeam
                  duration={duration}
                  borderWidth={borderWidth}
                  colorFrom={currentPreset.from}
                  colorTo={currentPreset.to}
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      Performance
                    </span>
                    <span className="text-xs font-mono opacity-60">Tempo Real</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">R$ 148.920,00</h3>
                  <p className="text-xs opacity-70">
                    Faturamento consolidado da loja com feixe dinâmico destacando metas superadas.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-base-300/60 flex items-center justify-between text-xs">
                  <span className="text-success font-medium flex items-center gap-1">
                    ↑ +24.8% este mês
                  </span>
                  <span className="opacity-60">Meta: 120k</span>
                </div>
              </div>

              {/* Card 2: Segurança & Criptografia */}
              <div className="relative rounded-2xl bg-base-200/60 p-6 border border-base-300 shadow-lg flex flex-col justify-between overflow-hidden group hover:bg-base-200/90 transition-all duration-300">
                <BorderBeam
                  duration={duration * 1.2}
                  borderWidth={borderWidth}
                  colorFrom={currentPreset.to}
                  colorTo={currentPreset.from}
                  delay={duration / 2}
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                      Criptografia
                    </span>
                    <span className="text-lg">🛡️</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Postgres & Supabase RLS</h3>
                  <p className="text-xs opacity-70">
                    Políticas de Row-Level Security ativas e protegendo endpoints com rotação criptográfica.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-base-300/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-primary font-bold">256-bit AES</span>
                  <span className="badge badge-xs badge-success">Seguro</span>
                </div>
              </div>

              {/* Card 3: Status da API / Vercel Edge */}
              <div className="relative rounded-2xl bg-base-200/60 p-6 border border-base-300 shadow-lg flex flex-col justify-between overflow-hidden group hover:bg-base-200/90 transition-all duration-300">
                <BorderBeam
                  duration={duration * 0.8}
                  borderWidth={borderWidth}
                  colorFrom={currentPreset.from}
                  colorTo={currentPreset.to}
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                      Infraestrutura
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Vercel Edge Network</h3>
                  <p className="text-xs opacity-70">
                    Deploy global com latência média de 14ms e replicação em 18 regiões simultâneas.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-base-300/60 flex items-center justify-between text-xs">
                  <span className="opacity-60">Status de Operação</span>
                  <span className="text-success font-bold font-mono">100% Uptime</span>
                </div>
              </div>
            </div>
          )}

          {/* Aba 2: Pricing Spotlight */}
          {activeTab === "pricing" && (
            <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Card Padrão (Sem beam) */}
              <div className="rounded-3xl bg-base-200/40 p-8 border border-base-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-60">Plano Starter</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold">R$ 0</span>
                    <span className="text-xs opacity-60">/mês gratuito</span>
                  </div>
                  <p className="text-sm opacity-70">Para desenvolvedores experimentando protótipos e testes locais.</p>
                  <div className="divider my-2" />
                  <ul className="space-y-2.5 text-xs opacity-80">
                    <li className="flex items-center gap-2">✓ DaisyUI v5 componentes essenciais</li>
                    <li className="flex items-center gap-2">✓ Temas claros e escuros padrão</li>
                    <li className="flex items-center gap-2">✓ Suporte comunitário</li>
                  </ul>
                </div>
                <button type="button" className="btn btn-outline btn-sm rounded-xl mt-8">
                  Começar Grátis
                </button>
              </div>

              {/* Card Destaque PRO (Com BorderBeam ativo!) */}
              <div className="relative rounded-3xl bg-base-200/90 p-8 border border-base-300 shadow-2xl flex flex-col justify-between overflow-hidden">
                <BorderBeam
                  duration={duration}
                  borderWidth={borderWidth + 0.5}
                  colorFrom={currentPreset.from}
                  colorTo={currentPreset.to}
                />
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary font-bold">
                      Plano Enterprise Pro
                    </span>
                    <span className="badge badge-primary badge-sm font-bold shadow-sm">
                      Mais Popular
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-primary">R$ 89</span>
                    <span className="text-xs opacity-60">/mês por desenvolvedor</span>
                  </div>
                  <p className="text-sm opacity-80">
                    Acesso completo a efeitos 3D, WebGL Shaders, Border Beam, Aceternity e suporte premium.
                  </p>
                  <div className="divider my-2" />
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-center gap-2 font-medium">✨ Todos os componentes 21st.dev integrados</li>
                    <li className="flex items-center gap-2 font-medium">✨ Shaders Three.js em tempo real</li>
                    <li className="flex items-center gap-2 font-medium">✨ Botões Líquidos de Vidro & Metal</li>
                    <li className="flex items-center gap-2 font-medium">✨ Suporte a Monorepo Turborepo e Vercel</li>
                  </ul>
                </div>
                <button type="button" className="btn btn-primary btn-sm rounded-xl mt-8 font-bold shadow-lg shadow-primary/20">
                  Assinar Acesso Total
                </button>
              </div>
            </div>
          )}

          {/* Aba 3: Instalação & Código */}
          {activeTab === "code" && (
            <div className="card bg-base-200/60 border border-base-300 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span>💻</span> Como usar o BorderBeam no seu projeto
              </h3>
              <p className="text-sm opacity-80">
                O componente é tão simples quanto adicionar uma linha dentro de qualquer card ou container com <code className="bg-base-300 px-1 py-0.5 rounded text-xs">relative overflow-hidden</code>:
              </p>

              <pre className="bg-base-300/80 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-base-300 text-base-content">
{`import { BorderBeam } from "@/components/ui/BorderBeam";

export function MeuCardDestaque() {
  return (
    <div className="relative rounded-2xl bg-base-200 p-6 overflow-hidden border border-base-300">
      {/* O feixe de luz viaja pela borda sem afetar o conteúdo */}
      <BorderBeam 
        duration={6} 
        colorFrom="#facc15" 
        colorTo="#eab308" 
        borderWidth={2} 
      />
      
      <h3>Título do Card</h3>
      <p>Conteúdo do seu componente DaisyUI...</p>
    </div>
  );
}`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
