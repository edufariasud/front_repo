"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { Meteors } from "@/components/ui/Meteors";
import { Marquee } from "@/components/ui/Marquee";
import { BorderBeam } from "@/components/ui/BorderBeam";

export default function MeteorsMarqueeShowcase() {
  const [activeTab, setActiveTab] = useState<"showcase" | "interactive" | "code">("showcase");
  const [meteorCount, setMeteorCount] = useState(24);
  const [marqueeSpeed, setMarqueeSpeed] = useState("28s");
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [fadeEdges, setFadeEdges] = useState(true);

  const partners = [
    { name: "Next.js 15", category: "Framework", icon: "⚡" },
    { name: "DaisyUI v5", category: "UI Library", icon: "🌼" },
    { name: "Tailwind v4", category: "Engine CSS", icon: "🎨" },
    { name: "TypeScript", category: "Type Safety", icon: "🔷" },
    { name: "Aceternity UI", category: "Efeitos 3D", icon: "🌌" },
    { name: "Magic UI", category: "Motion", icon: "✨" },
    { name: "Vercel Edge", category: "Infra", icon: "▲" },
    { name: "Supabase", category: "Database", icon: "⚡" },
  ];

  const testimonials = [
    {
      name: "Camila Duarte",
      handle: "@camila_frontend",
      avatar: "👩‍💻",
      comment: "A biblioteca é surreal de leve! Substituí 3 libs pesadas por esses componentes em CSS nativo.",
      stars: "★★★★★",
    },
    {
      name: "Rodrigo Silveira",
      handle: "@rodrigo_lead",
      avatar: "👨‍💻",
      comment: "O efeito de Meteors no card de planos aumentou nossa conversão em 18%. Visual impecável!",
      stars: "★★★★★",
    },
    {
      name: "Lucas Alcantara",
      handle: "@lucas_design",
      avatar: "🎨",
      comment: "Totalmente integrado às variáveis de cores do DaisyUI. Alternar de tema funciona perfeitamente.",
      stars: "★★★★★",
    },
    {
      name: "Mariana Costa",
      handle: "@mari_dev",
      avatar: "🚀",
      comment: "Zero framer-motion no bundle final. Roda liso a 60fps até no celular de entrada.",
      stars: "★★★★★",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Unificado do Showcase */}
        <div className="p-4 sm:p-6 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShowcaseHeader
              title="Meteors & Infinite Marquee"
              badge="Aceternity • Magic UI • 21st.dev"
              backHref="/"
            />

            {/* Abas */}
            <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("showcase")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "showcase" ? "btn-primary" : "btn-ghost"}`}
              >
                Showcase Visual
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "interactive" ? "btn-primary" : "btn-ghost"}`}
              >
                Painel Interativo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "code" ? "btn-primary" : "btn-ghost"}`}
              >
                Código & Docs
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
          {activeTab === "showcase" && (
            <>
              {/* Seção 1: Meteors Cards Cósmicos */}
              <section className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                    <span>🌌</span>
                    <span>Aceternity UI • ID 1407</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Meteors Cards — Efeito Atmosférico Noturno
                  </h2>
                  <p className="text-sm opacity-70 mt-1 max-w-2xl">
                    Chuva de meteoros renderizada no fundo do contêiner com cauda luminosa cônica em gradiente CSS puro.
                  </p>
                </div>

                {/* Banner de Aviso de Performance */}
                <div className="alert bg-warning/10 border border-warning/30 text-xs flex items-start gap-3 rounded-xl p-4">
                  <span className="text-lg">⚠️</span>
                  <div className="space-y-1">
                    <div className="font-bold text-warning">Regra de Ouro de Performance (Meteors):</div>
                    <div className="opacity-90 leading-relaxed">
                      O efeito de meteoros gera dezenas de animações simultâneas em CSS. Para manter <strong>60 FPS constantes</strong> sem pesar a GPU, <strong>não utilize mais de 1 elemento com Meteors em uma mesma página</strong>. O padrão recomendado é aplicá-lo exclusivamente no card de maior destaque (como no Plano Cosmic Pro abaixo).
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Enterprise Plan com Meteors + BorderBeam */}
                  <div className="relative group rounded-2xl bg-base-200/90 border border-base-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    {/* Meteors Effect */}
                    <Meteors number={26} headColor="#ffffff" tailColor="rgba(250, 204, 21, 0.9)" tailLength={140} />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="badge badge-primary badge-sm font-semibold">Mais Escolhido</span>
                        <span className="text-2xl">⚡</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Plano Cosmic Pro</h3>
                        <p className="text-xs opacity-75 mt-1">Infraestrutura dedicada com suporte prioritário e SLA de 99.9%.</p>
                      </div>
                      <div className="flex items-baseline gap-1 py-2">
                        <span className="text-3xl font-extrabold text-primary">R$ 149</span>
                        <span className="text-xs opacity-60">/mês</span>
                      </div>
                      <ul className="space-y-2 text-xs opacity-85">
                        <li className="flex items-center gap-2">✓ Acesso ilimitado a componentes</li>
                        <li className="flex items-center gap-2">✓ Exportação em Tailwind v4 & DaisyUI</li>
                        <li className="flex items-center gap-2">✓ Suporte direto com engenheiros</li>
                      </ul>
                    </div>

                    <div className="relative z-10 pt-6 mt-6 border-t border-base-300/50">
                      <button className="btn btn-primary btn-block shadow-lg">
                        Começar Agora
                      </button>
                    </div>

                    <BorderBeam size={160} duration={9} colorFrom="var(--color-primary)" colorTo="#38bdf8" />
                  </div>

                  {/* Card 2: Neural AI / Tech */}
                  <div className="relative group rounded-2xl bg-base-200/90 border border-base-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="badge badge-secondary badge-sm font-semibold">Inovação</span>
                        <span className="text-2xl">🧠</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Modelos Neurais</h3>
                        <p className="text-xs opacity-75 mt-1">Processamento de linguagem e visão computacional em tempo real.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-base-300/40 border border-base-300/60 font-mono text-xs space-y-1">
                        <div className="text-success text-[11px] font-semibold">● Agentes Autônomos Ativos</div>
                        <div className="opacity-70">Latência média: 14ms</div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-6 mt-6 border-t border-base-300/50">
                      <button className="btn btn-secondary btn-outline btn-block">
                        Explorar Pipeline
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Segurança & Vault */}
                  <div className="relative group rounded-2xl bg-base-200/90 border border-base-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="badge badge-accent badge-sm font-semibold">Zero Trust</span>
                        <span className="text-2xl">🔒</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Cofre de Segredos</h3>
                        <p className="text-xs opacity-75 mt-1">Criptografia em repouso e rotação programada de credenciais e chaves.</p>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between opacity-80">
                          <span>Nível de Criptografia</span>
                          <span className="font-semibold text-accent">AES-256 GCM</span>
                        </div>
                        <div className="w-full bg-base-300 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-accent h-full w-[94%]" />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-6 mt-6 border-t border-base-300/50">
                      <button className="btn btn-accent btn-outline btn-block">
                        Verificar Auditoria
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção 2: Infinite Marquee Showcase */}
              <section className="space-y-6 pt-6 border-t border-base-300/60">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-2">
                    <span>🔄</span>
                    <span>Magic UI / lukacho • ID 1198</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Infinite Marquee — Ticker & Carrossel Contínuo
                  </h2>
                  <p className="text-sm opacity-70 mt-1 max-w-2xl">
                    Scroll infinito contínuo e suave a 60fps com aceleração por hardware, pausa ao passar o mouse e fade degradê nas pontas.
                  </p>
                </div>

                {/* Marquee 1: Logos / Tecnologias */}
                <div className="rounded-2xl border border-base-300 bg-base-200/40 p-2 sm:p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-base-content/50 px-4 py-2">
                    Stack & Ecossistema Suportado
                  </div>
                  <Marquee
                    pauseOnHover={pauseOnHover}
                    duration={marqueeSpeed}
                    fadeEdges={fadeEdges}
                    className="py-3"
                  >
                    {partners.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl border border-base-300 bg-base-100 shadow-sm hover:border-primary/50 transition-colors mx-2 cursor-pointer"
                      >
                        <span className="text-xl">{p.icon}</span>
                        <div>
                          <div className="font-semibold text-sm">{p.name}</div>
                          <div className="text-[11px] opacity-60">{p.category}</div>
                        </div>
                      </div>
                    ))}
                  </Marquee>
                </div>

                {/* Marquee 2: Depoimentos & Reviews (Reverse) */}
                <div className="rounded-2xl border border-base-300 bg-base-200/40 p-2 sm:p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-base-content/50 px-4 py-2">
                    Feedback de Desenvolvedores (Sentido Inverso)
                  </div>
                  <Marquee
                    reverse
                    pauseOnHover={pauseOnHover}
                    duration="32s"
                    fadeEdges={fadeEdges}
                    className="py-3"
                  >
                    {testimonials.map((t, idx) => (
                      <div
                        key={idx}
                        className="w-72 sm:w-80 flex flex-col justify-between p-4 rounded-xl border border-base-300 bg-base-100 shadow-sm hover:border-primary/50 transition-colors mx-2"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{t.avatar}</span>
                              <div>
                                <div className="font-semibold text-xs">{t.name}</div>
                                <div className="text-[10px] opacity-60">{t.handle}</div>
                              </div>
                            </div>
                            <span className="text-warning text-xs font-mono">{t.stars}</span>
                          </div>
                          <p className="text-xs opacity-80 leading-relaxed italic">
                            &ldquo;{t.comment}&rdquo;
                          </p>
                        </div>
                      </div>
                    ))}
                  </Marquee>
                </div>
              </section>
            </>
          )}

          {activeTab === "interactive" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Painel de Controles */}
              <div className="space-y-6 p-6 rounded-2xl bg-base-200 border border-base-300 h-fit">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span>⚙️</span>
                  <span>Ajustes em Tempo Real</span>
                </h3>

                <div className="space-y-4">
                  {/* Slider Quantidade de Meteoros */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Quantidade de Meteoros</span>
                      <span className="text-primary font-mono">{meteorCount}</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={48}
                      value={meteorCount}
                      onChange={(e) => setMeteorCount(Number(e.target.value))}
                      className="range range-xs range-primary"
                    />
                  </div>

                  {/* Velocidade Marquee */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Duração do Marquee</span>
                      <span className="text-primary font-mono">{marqueeSpeed}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {["15s", "28s", "50s"].map((speed) => (
                        <button
                          key={speed}
                          type="button"
                          onClick={() => setMarqueeSpeed(speed)}
                          className={`btn btn-xs ${marqueeSpeed === speed ? "btn-primary" : "btn-outline"}`}
                        >
                          {speed === "15s" ? "Rápido" : speed === "28s" ? "Normal" : "Suave"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center justify-between cursor-pointer text-xs">
                      <span>Pausar Marquee no Hover</span>
                      <input
                        type="checkbox"
                        checked={pauseOnHover}
                        onChange={(e) => setPauseOnHover(e.target.checked)}
                        className="toggle toggle-sm toggle-primary"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer text-xs">
                      <span>Degradê de Borda (Fade Edges)</span>
                      <input
                        type="checkbox"
                        checked={fadeEdges}
                        onChange={(e) => setFadeEdges(e.target.checked)}
                        className="toggle toggle-sm toggle-primary"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Preview Dinâmico */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative rounded-2xl bg-base-200 border border-base-300 p-8 overflow-hidden min-h-[220px] flex flex-col justify-center items-center text-center shadow-lg">
                  <Meteors number={meteorCount} headColor="#ffffff" tailColor="rgba(56, 189, 248, 0.95)" tailLength={150} />
                  <div className="relative z-10 max-w-md space-y-2">
                    <span className="text-3xl">🚀</span>
                    <h4 className="text-xl font-bold">Simulação de Ambiente Espacial</h4>
                    <p className="text-xs opacity-75">
                      Contêiner com {meteorCount} feixes simulados calculados independentemente via CSS puro.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-200/50 p-4">
                  <Marquee
                    pauseOnHover={pauseOnHover}
                    duration={marqueeSpeed}
                    fadeEdges={fadeEdges}
                    className="py-2"
                  >
                    {partners.slice(0, 4).map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 bg-base-100 text-xs font-semibold mx-1 shadow-sm"
                      >
                        <span>{p.icon}</span>
                        <span>{p.name}</span>
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-base-200 border border-base-300 space-y-4">
                <h3 className="font-bold text-lg">Como Usar no Seu Projeto</h3>
                <p className="text-xs opacity-75 leading-relaxed">
                  Ambos os componentes são 100% autônomos, sem bibliotecas externas pesadas como framer-motion.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                      1. Meteors (Aceternity UI)
                    </h4>
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-[11px] text-warning mb-2 font-semibold">
                      ⚠️ Atenção: Para máxima fluidez (60 FPS), utilize apenas 1 instância de &lt;Meteors /&gt; por página.
                    </div>
                    <pre className="p-4 rounded-xl bg-base-300 text-xs font-mono overflow-x-auto">
{`import { Meteors } from "@/components/ui/Meteors";

export function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-base-200 p-8 border border-base-300">
      <h3 className="text-xl font-bold">Título do Card</h3>
      <p className="text-sm opacity-70">Conteúdo com meteors no fundo.</p>
      
      {/* Insira como filho direto do contêiner relativo com overflow-hidden */}
      <Meteors number={16} tailColor="var(--color-primary)" />
    </div>
  );
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                      2. Infinite Marquee (Magic UI)
                    </h4>
                    <pre className="p-4 rounded-xl bg-base-300 text-xs font-mono overflow-x-auto">
{`import { Marquee } from "@/components/ui/Marquee";

export function LogosTicker() {
  return (
    <Marquee pauseOnHover duration="30s" fadeEdges>
      <div className="px-4 py-2 border rounded-lg bg-base-100">Item 1</div>
      <div className="px-4 py-2 border rounded-lg bg-base-100">Item 2</div>
      <div className="px-4 py-2 border rounded-lg bg-base-100">Item 3</div>
    </Marquee>
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
