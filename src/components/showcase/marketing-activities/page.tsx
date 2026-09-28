"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { MarketingActivitiesCard, ActivitySegment } from "@/components/ui/MarketingActivitiesCard";

export default function MarketingActivitiesShowcase() {
  const [activeTab, setActiveTab] = useState<"showcase" | "interactive" | "code">("showcase");
  const [layoutMode, setLayoutMode] = useState<"horizontal" | "vertical" | "both">("horizontal");
  const [replayKey, setAnimationKey] = useState(0);

  // Estados personalizáveis
  const [hours, setHours] = useState(16.5);
  const [members, setMembers] = useState(235);
  const [interactiveLayout, setInteractiveLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [productive, setProductive] = useState(54);
  const [middle, setMiddle] = useState(24);
  const [breakTime, setBreakTime] = useState(14);
  const [idle, setIdle] = useState(8);

  const customSegments: ActivitySegment[] = [
    { id: "productive", label: "Productive", value: productive, color: "#00d665" },
    { id: "middle", label: "Middle", value: middle, color: "#a6e22e" },
    { id: "break", label: "Break", value: breakTime, color: "#facc15" },
    { id: "idle", label: "Idle", value: idle, color: "#1e293b" },
  ];

  const triggerReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Unificado do Showcase */}
        <div className="p-4 sm:p-6 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShowcaseHeader
              title="Marketing Activities Widget"
              badge="Dashboard UI • Animated Counters"
              backHref="/"
            />

            {/* Abas e Botão de Replay */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                type="button"
                onClick={triggerReplay}
                className="btn btn-xs sm:btn-sm btn-outline gap-1.5"
                title="Reiniciar animação a partir do zero"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Replay</span>
              </button>

              <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300">
                <button
                  type="button"
                  onClick={() => setActiveTab("showcase")}
                  className={`join-item btn btn-xs sm:btn-sm ${activeTab === "showcase" ? "btn-primary" : "btn-ghost"}`}
                >
                  Card da Referência
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("interactive")}
                  className={`join-item btn btn-xs sm:btn-sm ${activeTab === "interactive" ? "btn-primary" : "btn-ghost"}`}
                >
                  Personalizador
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
        </div>

        {/* Conteúdo Principal */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
          {activeTab === "showcase" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold mb-2">
                    <span>📈</span>
                    <span>Animação Fluída • Contadores & Barras</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Marketing Activities Card
                  </h2>
                  <p className="text-sm opacity-70 mt-1 max-w-2xl">
                    Widget moderno com números animados do zero via requestAnimationFrame e barra multi-segmentada.
                  </p>
                </div>

                {/* Seletor de Variações de Layout */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold opacity-70">Layout:</span>
                  <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300">
                    <button
                      type="button"
                      onClick={() => setLayoutMode("horizontal")}
                      className={`join-item btn btn-xs sm:btn-sm ${layoutMode === "horizontal" ? "btn-primary" : "btn-ghost"}`}
                    >
                      Lado a Lado (Original)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLayoutMode("vertical")}
                      className={`join-item btn btn-xs sm:btn-sm ${layoutMode === "vertical" ? "btn-primary" : "btn-ghost"}`}
                    >
                      Empilhado (Vertical)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLayoutMode("both")}
                      className={`join-item btn btn-xs sm:btn-sm ${layoutMode === "both" ? "btn-primary" : "btn-ghost"}`}
                    >
                      Ambas as Variações
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Centralizado sem fundos artificiais */}
              {layoutMode === "horizontal" && (
                <div className="flex flex-col items-center justify-center py-6 w-full">
                  <div className="text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-3">
                    Variação 1: Lado a Lado (Original da Referência)
                  </div>
                  <MarketingActivitiesCard
                    key={`h-${replayKey}`}
                    layout="horizontal"
                    totalHours={16.5}
                    totalMembers={235}
                    onSeeAllClick={() => alert("Ação See All acionada!")}
                    onFilterClick={() => alert("Filtro de atividades acionado!")}
                  />
                </div>
              )}

              {layoutMode === "vertical" && (
                <div className="flex flex-col items-center justify-center py-6 w-full">
                  <div className="text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-3">
                    Variação 2: Empilhado (Ideal para Sidebars e Telas Estreitas)
                  </div>
                  <MarketingActivitiesCard
                    key={`v-${replayKey}`}
                    layout="vertical"
                    totalHours={16.5}
                    totalMembers={235}
                    onSeeAllClick={() => alert("Ação See All acionada!")}
                    onFilterClick={() => alert("Filtro de atividades acionado!")}
                  />
                </div>
              )}

              {layoutMode === "both" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-center py-6 w-full">
                  <div className="w-full flex flex-col items-center">
                    <div className="text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-3">
                      Lado a Lado (Original da Referência)
                    </div>
                    <MarketingActivitiesCard
                      key={`both-h-${replayKey}`}
                      layout="horizontal"
                      totalHours={16.5}
                      totalMembers={235}
                      onSeeAllClick={() => alert("Ação See All acionada!")}
                      onFilterClick={() => alert("Filtro de atividades acionado!")}
                    />
                  </div>

                  <div className="w-full flex flex-col items-center">
                    <div className="text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-3">
                      Empilhado (Vertical)
                    </div>
                    <MarketingActivitiesCard
                      key={`both-v-${replayKey}`}
                      layout="vertical"
                      totalHours={16.5}
                      totalMembers={235}
                      onSeeAllClick={() => alert("Ação See All acionada!")}
                      onFilterClick={() => alert("Filtro de atividades acionado!")}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "interactive" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Painel de Configurações */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-base-200 border border-base-300 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span>🎛️</span>
                    <span>Ajustar Métricas</span>
                  </h3>
                  <button
                    type="button"
                    onClick={triggerReplay}
                    className="btn btn-xs btn-primary gap-1"
                  >
                    <span>Testar Animação</span>
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Seletor de layout no personalizador */}
                  <div>
                    <div className="font-semibold mb-1.5">Orientação dos Cards Internos:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setInteractiveLayout("horizontal")}
                        className={`btn btn-xs ${interactiveLayout === "horizontal" ? "btn-primary" : "btn-outline"}`}
                      >
                        Lado a Lado (Horizontal)
                      </button>
                      <button
                        type="button"
                        onClick={() => setInteractiveLayout("vertical")}
                        className={`btn btn-xs ${interactiveLayout === "vertical" ? "btn-primary" : "btn-outline"}`}
                      >
                        Empilhado (Vertical)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Total de Horas (Team Activities)</span>
                      <span className="text-primary font-mono">{hours}h</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={80}
                      step={0.5}
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="range range-xs range-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span>Total de Membros (Team)</span>
                      <span className="text-success font-mono">{members}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={1000}
                      step={5}
                      value={members}
                      onChange={(e) => setMembers(Number(e.target.value))}
                      className="range range-xs range-success"
                    />
                  </div>

                  <div className="pt-2 border-t border-base-300 space-y-3">
                    <div className="font-bold text-xs">Distribuição dos Segmentos da Barra (%):</div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span className="text-[#00d665]">● Productive</span>
                        <span className="font-mono">{productive}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={productive}
                        onChange={(e) => setProductive(Number(e.target.value))}
                        className="range range-xs"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span className="text-[#a6e22e]">● Middle</span>
                        <span className="font-mono">{middle}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={middle}
                        onChange={(e) => setMiddle(Number(e.target.value))}
                        className="range range-xs"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span className="text-[#facc15]">● Break</span>
                        <span className="font-mono">{breakTime}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={breakTime}
                        onChange={(e) => setBreakTime(Number(e.target.value))}
                        className="range range-xs"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between font-medium mb-1">
                        <span className="text-[#1e293b] dark:text-slate-400">● Idle</span>
                        <span className="font-mono">{idle}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={idle}
                        onChange={(e) => setIdle(Number(e.target.value))}
                        className="range range-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Dinâmico do Card com os Novos Valores */}
              <div className="lg:col-span-7 flex justify-center items-center py-4 w-full">
                <MarketingActivitiesCard
                  key={`interactive-${replayKey}-${interactiveLayout}`}
                  layout={interactiveLayout}
                  totalHours={hours}
                  totalMembers={members}
                  segments={customSegments}
                />
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-base-200 border border-base-300 space-y-4">
                <h3 className="font-bold text-lg">Como Usar no Seu Projeto</h3>
                <p className="text-xs opacity-75 leading-relaxed">
                  O componente <code className="text-primary font-mono">&lt;MarketingActivitiesCard /&gt;</code> é 100% autônomo, usa <code className="text-primary font-mono">requestAnimationFrame</code> nativo para contar os números suavemente a partir do zero e CSS transitions aceleradas por GPU para a expansão da barra.
                </p>

                <div className="space-y-4">
                  <pre className="p-4 rounded-xl bg-base-300 text-xs font-mono overflow-x-auto">
{`import { MarketingActivitiesCard } from "@/components/ui/MarketingActivitiesCard";

// Variação 1: Lado a Lado (Original da Referência)
export function DashboardOverview() {
  return (
    <MarketingActivitiesCard
      layout="horizontal" // padrão
      totalHours={16.5}
      totalMembers={235}
      onSeeAllClick={() => console.log("Navegar para atividades")}
      onFilterClick={() => console.log("Abrir filtros")}
    />
  );
}

// Variação 2: Empilhado / Vertical (Ideal para Sidebars e Telas Estreitas)
export function SidebarActivities() {
  return (
    <MarketingActivitiesCard
      layout="vertical"
      totalHours={16.5}
      totalMembers={235}
    />
  );
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
