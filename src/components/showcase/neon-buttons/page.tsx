"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { NeonButton, NeonColor, NeonVariant, NeonSize, GlowIntensity } from "@/components/ui/NeonButton";
import {
  Sparkles,
  Zap,
  Terminal,
  Rocket,
  ShieldCheck,
  Flame,
  ArrowRight,
  Radio,
  Sliders,
  Copy,
  Check,
  Cpu,
  Layers,
  Power
} from "lucide-react";

export default function NeonButtonsShowcase() {
  const [activeTab, setActiveTab] = useState<"interactive" | "gallery" | "code">("interactive");

  // Estados do Playground
  const [selectedVariant, setSelectedVariant] = useState<NeonVariant>("pulse");
  const [selectedColor, setSelectedColor] = useState<NeonColor>("cyan");
  const [selectedSize, setSelectedSize] = useState<NeonSize>("md");
  const [selectedIntensity, setSelectedIntensity] = useState<GlowIntensity>("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [withIcons, setWithIcons] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const colorsList: { key: NeonColor; label: string; bg: string }[] = [
    { key: "cyan", label: "Cyber Cyan", bg: "bg-[#00f0ff]" },
    { key: "magenta", label: "Neon Pink", bg: "bg-[#ff007f]" },
    { key: "purple", label: "Electric Violet", bg: "bg-[#a855f7]" },
    { key: "lime", label: "Matrix Lime", bg: "bg-[#10b981]" },
    { key: "amber", label: "Solar Amber", bg: "bg-[#fbbf24]" },
    { key: "crimson", label: "Crimson Red", bg: "bg-[#ef4444]" },
    { key: "primary", label: "Theme Primary", bg: "bg-primary" }
  ];

  const variantsList: { key: NeonVariant; label: string; desc: string }[] = [
    { key: "pulse", label: "Pulse Halo", desc: "Respiração fluida com halo neon e núcleo obsidian" },
    { key: "beam", label: "Comet Orbit", desc: "Feixe laser neon giratório com rastro cônico" },
    { key: "cyber", label: "Cyber HUD", desc: "Cantos chanfrados com LED indicador e scanlines" },
    { key: "spotlight", label: "Magnetic Laser", desc: "Luz neon que rastreia dinamicamente o cursor" },
    { key: "outline-glow", label: "Outline Glow", desc: "Linha neon fina com inundação luminosa no hover" }
  ];

  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getGeneratedReactCode = () => {
    const iconProp = withIcons ? ` iconLeft={<Zap className="size-4" />} iconRight={<ArrowRight className="size-4" />}` : "";
    const loadingProp = isLoading ? ` isLoading={true}` : "";
    const disabledProp = isDisabled ? ` disabled={true}` : "";
    return `<NeonButton
  variant="${selectedVariant}"
  neonColor="${selectedColor}"
  size="${selectedSize}"
  glowIntensity="${selectedIntensity}"${iconProp}${loadingProp}${disabledProp}
>
  Explorar Cyberverse
</NeonButton>`;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Unificado do Showcase */}
        <div className="p-4 sm:p-6 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShowcaseHeader
              title="Botões com Efeito Neon Aesthetic"
              badge="Cyberpunk • Magic UI • DaisyUI v5"
              backHref="/"
            />

            {/* Abas Superiores */}
            <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={`join-item btn btn-xs sm:btn-sm ${
                  activeTab === "interactive" ? "btn-primary" : "btn-ghost"
                }`}
              >
                <Sliders className="size-3.5 mr-1" />
                Playground
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className={`join-item btn btn-xs sm:btn-sm ${
                  activeTab === "gallery" ? "btn-primary" : "btn-ghost"
                }`}
              >
                <Sparkles className="size-3.5 mr-1" />
                Galeria Aesthetic
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`join-item btn btn-xs sm:btn-sm ${
                  activeTab === "code" ? "btn-primary" : "btn-ghost"
                }`}
              >
                <Terminal className="size-3.5 mr-1" />
                Como Usar
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-8 flex flex-col gap-8">
          {/* ========================================================================= */}
          {/* ABA 1: PLAYGROUND INTERATIVO                                              */}
          {/* ========================================================================= */}
          {activeTab === "interactive" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Painel de Controles */}
              <div className="lg:col-span-5 flex flex-col gap-6 card bg-base-200/80 border border-base-300/80 p-6 rounded-2xl shadow-sm">
                <div>
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <Sliders className="size-4 text-primary" />
                    Controles de Customização ao Vivo
                  </h3>
                  <p className="text-xs opacity-70 mt-1">
                    Combine cores emissivas, variantes geométricas e intensidades de luz.
                  </p>
                </div>

                {/* Seleção de Variante */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold opacity-80 uppercase tracking-wider">
                    Variante de Efeito Neon
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {variantsList.map((v) => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setSelectedVariant(v.key)}
                        className={`p-3 text-left rounded-xl border text-xs transition-all flex flex-col ${
                          selectedVariant === v.key
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-base-300 bg-base-300/40 hover:bg-base-300"
                        }`}
                      >
                        <span className="font-bold text-sm text-base-content">{v.label}</span>
                        <span className="text-[11px] opacity-70 mt-0.5">{v.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seletor de Cores */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold opacity-80 uppercase tracking-wider">
                    Paleta de Cor Neon
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {colorsList.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setSelectedColor(c.key)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                          selectedColor === c.key
                            ? "border-primary bg-primary/10 font-bold"
                            : "border-base-300 hover:bg-base-300/50"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${c.bg} shrink-0 shadow-[0_0_8px_currentColor]`} />
                        <span className="truncate">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tamanhos e Intensidade */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-80">Tamanho</label>
                    <div className="join w-full">
                      {(["sm", "md", "lg", "xl"] as NeonSize[]).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`join-item btn btn-xs flex-1 uppercase ${
                            selectedSize === sz ? "btn-primary" : "btn-outline"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold opacity-80">Intensidade Glow</label>
                    <div className="join w-full">
                      {(["low", "medium", "high"] as GlowIntensity[]).map((int) => (
                        <button
                          key={int}
                          type="button"
                          onClick={() => setSelectedIntensity(int)}
                          className={`join-item btn btn-xs flex-1 capitalize ${
                            selectedIntensity === int ? "btn-primary" : "btn-outline"
                          }`}
                        >
                          {int}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toggles de Estado */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-base-300/60">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={withIcons}
                      onChange={(e) => setWithIcons(e.target.checked)}
                      className="checkbox checkbox-xs checkbox-primary"
                    />
                    <span>Com Ícones</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={isLoading}
                      onChange={(e) => setIsLoading(e.target.checked)}
                      className="checkbox checkbox-xs checkbox-primary"
                    />
                    <span>Estado Loading</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={isDisabled}
                      onChange={(e) => setIsDisabled(e.target.checked)}
                      className="checkbox checkbox-xs checkbox-primary"
                    />
                    <span>Desabilitado</span>
                  </label>
                </div>
              </div>

              {/* Canvas de Preview do Botão */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="relative min-h-[360px] sm:min-h-[440px] rounded-3xl border border-base-300 bg-neutral-950 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden shadow-2xl">
                  {/* Fundo Cibernético / Grid de Partículas */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                      backgroundSize: "28px 28px"
                    }}
                  />

                  {/* Halo Ambiente Central */}
                  <div
                    className="absolute w-72 h-72 rounded-full blur-[90px] pointer-events-none opacity-30 transition-all duration-700"
                    style={{
                      background:
                        selectedColor === "cyan"
                          ? "#00f0ff"
                          : selectedColor === "magenta"
                          ? "#ff007f"
                          : selectedColor === "purple"
                          ? "#a855f7"
                          : selectedColor === "lime"
                          ? "#10b981"
                          : selectedColor === "amber"
                          ? "#fbbf24"
                          : selectedColor === "crimson"
                          ? "#ef4444"
                          : "var(--color-primary)"
                    }}
                  />

                  {/* O Botão Configurado */}
                  <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-full">
                    <div className="w-full flex items-center justify-center overflow-x-auto py-2 px-1">
                      <NeonButton
                        variant={selectedVariant}
                        neonColor={selectedColor}
                        size={selectedSize}
                        glowIntensity={selectedIntensity}
                        isLoading={isLoading}
                        disabled={isDisabled}
                        iconLeft={withIcons ? <Zap className="size-4 shrink-0" /> : undefined}
                        iconRight={withIcons ? <ArrowRight className="size-4 shrink-0" /> : undefined}
                        onClick={() => setClickCount((prev) => prev + 1)}
                      >
                        Explorar Cyberverse
                      </NeonButton>
                    </div>

                    <div className="text-xs text-neutral-400 font-mono flex items-center gap-2 mt-4 bg-neutral-900/80 px-4 py-1.5 rounded-full border border-neutral-800">
                      <Radio className="size-3 text-emerald-400 animate-pulse" />
                      Cliques registrados: <span className="text-white font-bold">{clickCount}</span>
                    </div>
                  </div>

                  <span className="absolute bottom-4 text-[11px] text-neutral-500 font-mono text-center px-4">
                    Mova o cursor sobre o botão para testar a iluminação dinâmica e a micro-interação tátil
                  </span>
                </div>

                {/* Snippet Gerado em Tempo Real */}
                <div className="card bg-base-200/60 border border-base-300 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-primary flex items-center gap-1.5">
                      <Terminal className="size-3.5" /> Código do componente configurado
                    </span>
                    <button
                      type="button"
                      onClick={() => copySnippet(getGeneratedReactCode())}
                      className="btn btn-ghost btn-xs text-xs gap-1"
                    >
                      {copiedCode ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                      {copiedCode ? "Copiado!" : "Copiar JSX"}
                    </button>
                  </div>
                  <pre className="p-3 bg-neutral-950 text-neutral-100 rounded-xl text-xs font-mono overflow-x-auto border border-neutral-800">
                    {getGeneratedReactCode()}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 2: GALERIA DE ESTILOS AESTHETIC                                       */}
          {/* ========================================================================= */}
          {activeTab === "gallery" && (
            <div className="flex flex-col gap-10">
              {/* Seção 1: Hero Call-to-Actions */}
              <div className="card bg-neutral-950 border border-neutral-800/80 p-8 rounded-3xl relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }}
                />
                <div className="relative z-10 max-w-2xl space-y-4 mb-8">
                  <div className="badge badge-primary badge-outline text-xs uppercase tracking-widest font-mono">
                    Hero Actions • High Impact
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Botões de Conversão Primária
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Projetados para landing pages, heros cibernéticos e botões de chamada com alto contraste e presença visual inesquecível.
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-6">
                  <NeonButton
                    variant="pulse"
                    neonColor="cyan"
                    size="lg"
                    iconLeft={<Rocket className="size-5" />}
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    Acessar Plataforma
                  </NeonButton>

                  <NeonButton
                    variant="beam"
                    neonColor="magenta"
                    size="lg"
                    iconLeft={<Sparkles className="size-5" />}
                  >
                    Ativar Assinatura VIP
                  </NeonButton>

                  <NeonButton
                    variant="spotlight"
                    neonColor="lime"
                    size="lg"
                    iconLeft={<ShieldCheck className="size-5" />}
                  >
                    Conectar Carteira Web3
                  </NeonButton>

                  <NeonButton
                    variant="cyber"
                    neonColor="amber"
                    size="lg"
                    iconLeft={<Terminal className="size-4" />}
                  >
                    Iniciar Console v2.0
                  </NeonButton>
                </div>
              </div>

              {/* Seção 2: Grid de Variantes por Caso de Uso */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Pulse Halo */}
                <div className="card bg-base-200/50 border border-base-300 p-6 rounded-2xl flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <span className="badge badge-sm badge-info font-mono">01. Pulse Halo</span>
                    <h4 className="font-bold text-base">Glow Difuso & Respiração</h4>
                    <p className="text-xs opacity-75">
                      Camadas de desfoque gaussian combinadas com iluminação difusa. Ideal para ações principais e botões flutuantes.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center justify-start bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                    <NeonButton variant="pulse" neonColor="cyan" size="sm">
                      Pequeno
                    </NeonButton>
                    <NeonButton variant="pulse" neonColor="purple" size="md">
                      Médio
                    </NeonButton>
                    <NeonButton variant="pulse" neonColor="magenta" size="sm" iconLeft={<Flame className="size-3.5" />}>
                      Hot Deal
                    </NeonButton>
                  </div>
                </div>

                {/* Card 2: Comet Beam */}
                <div className="card bg-base-200/50 border border-base-300 p-6 rounded-2xl flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <span className="badge badge-sm badge-secondary font-mono">02. Comet Beam</span>
                    <h4 className="font-bold text-base">Feixe Laser Orbitante</h4>
                    <p className="text-xs opacity-75">
                      Um fóton luminoso gira continuamente ao redor da borda acelerando suavemente ao receber o cursor.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center justify-start bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                    <NeonButton variant="beam" neonColor="cyan" size="sm">
                      Deploy
                    </NeonButton>
                    <NeonButton variant="beam" neonColor="amber" size="md" iconRight={<Zap className="size-4" />}>
                      Turbinar
                    </NeonButton>
                  </div>
                </div>

                {/* Card 3: Cyber HUD */}
                <div className="card bg-base-200/50 border border-base-300 p-6 rounded-2xl flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <span className="badge badge-sm badge-accent font-mono">03. Cyber HUD</span>
                    <h4 className="font-bold text-base">Geometria Chanfrada & LED</h4>
                    <p className="text-xs opacity-75">
                      Recorte poligonal angular com luz piloto piscando em loop. Inspirado em interfaces táticas de ficção científica.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center justify-start bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                    <NeonButton variant="cyber" neonColor="crimson" size="sm">
                      Overdrive
                    </NeonButton>
                    <NeonButton variant="cyber" neonColor="lime" size="md">
                      Online
                    </NeonButton>
                  </div>
                </div>

                {/* Card 4: Magnetic Spotlight */}
                <div className="card bg-base-200/50 border border-base-300 p-6 rounded-2xl flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <span className="badge badge-sm badge-warning font-mono">04. Magnetic Spotlight</span>
                    <h4 className="font-bold text-base">Laser Sensível ao Cursor</h4>
                    <p className="text-xs opacity-75">
                      O feixe de plasma neon acompanha as coordenadas x/y do ponteiro com iluminação interna e borda refletiva.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center justify-start bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                    <NeonButton variant="spotlight" neonColor="purple" size="md">
                      Passe o Mouse Aqui
                    </NeonButton>
                  </div>
                </div>

                {/* Card 5: Minimal Outline */}
                <div className="card bg-base-200/50 border border-base-300 p-6 rounded-2xl flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <span className="badge badge-sm badge-primary font-mono">05. Wireframe Glow</span>
                    <h4 className="font-bold text-base">Contorno Neon Elegante</h4>
                    <p className="text-xs opacity-75">
                      Linha neon minimalista de 1.5px que inunda o botão com luz volumétrica e reflexo de vidro sob hover.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center justify-start bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                    <NeonButton variant="outline-glow" neonColor="cyan" size="sm">
                      Secundário
                    </NeonButton>
                    <NeonButton variant="outline-glow" neonColor="primary" size="md">
                      Theme Primary
                    </NeonButton>
                  </div>
                </div>

                {/* Card 6: DaisyUI Classes Nativas */}
                <div className="card bg-base-200/50 border border-base-300 p-6 rounded-2xl flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <span className="badge badge-sm badge-neutral font-mono">06. DaisyUI CSS Puro</span>
                    <h4 className="font-bold text-base">Classes Utilitárias SCSS</h4>
                    <p className="text-xs opacity-75">
                      Sem dependência de React! Pode ser usado diretamente com classes nativas do DaisyUI: <code>btn btn-neon</code>.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center justify-start bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                    <button className="btn btn-sm btn-neon btn-neon-cyan">
                      btn-neon-cyan
                    </button>
                    <button className="btn btn-sm btn-neon btn-neon-magenta btn-neon-pulse">
                      btn-neon-pulse
                    </button>
                    <button className="btn btn-sm btn-neon btn-neon-lime btn-neon-cyber">
                      btn-cyber
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 3: COMO USAR & DOCUMENTAÇÃO                                           */}
          {/* ========================================================================= */}
          {activeTab === "code" && (
            <div className="card bg-base-200/60 border border-base-300 p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Terminal className="size-5 text-primary" />
                  Como Utilizar os Botões Neon no Projeto
                </h3>
                <p className="text-xs opacity-70 mt-1">
                  Você pode usar o componente React flexível ou as classes CSS utilitárias para o DaisyUI.
                </p>
              </div>

              {/* Exemplo 1: React Component */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Layers className="size-4" /> 1. Via Componente React (Recomendado)
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(`import { NeonButton } from "@/components/ui/NeonButton";
import { Zap } from "lucide-react";

export function MeuComponente() {
  return (
    <NeonButton
      variant="pulse"
      neonColor="cyan"
      size="md"
      iconLeft={<Zap className="size-4" />}
      onClick={() => console.log("Clicado!")}
    >
      Acessar Servidor
    </NeonButton>
  );
}`)
                    }
                    className="btn btn-ghost btn-xs text-xs gap-1"
                  >
                    <Copy className="size-3" /> Copiar
                  </button>
                </div>
                <pre className="bg-neutral-950 text-neutral-100 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-neutral-800">
{`import { NeonButton } from "@/components/ui/NeonButton";
import { Zap } from "lucide-react";

export function MeuComponente() {
  return (
    <NeonButton
      variant="pulse"       // "pulse" | "beam" | "cyber" | "spotlight" | "outline-glow"
      neonColor="cyan"      // "cyan" | "magenta" | "purple" | "lime" | "amber" | "crimson" | "primary"
      size="md"             // "sm" | "md" | "lg" | "xl"
      glowIntensity="high"  // "low" | "medium" | "high"
      iconLeft={<Zap className="size-4" />}
      onClick={() => console.log("Clicado!")}
    >
      Acessar Servidor
    </NeonButton>
  );
}`}
                </pre>
              </div>

              {/* Exemplo 2: Classes CSS DaisyUI */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Cpu className="size-4" /> 2. Via Classes Utilitárias do DaisyUI (SCSS)
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(`<!-- Botão Neon Cyan padrão -->
<button className="btn btn-neon btn-neon-cyan">
  Ação Neon
</button>

<!-- Botão Neon com Pulsação Contínua -->
<button className="btn btn-neon btn-neon-magenta btn-neon-pulse">
  Oferta Especial
</button>

<!-- Botão Cyberpunk HUD Chanfrado -->
<button className="btn btn-neon btn-neon-lime btn-neon-cyber">
  Terminal Ativo
</button>

<!-- Botão Neon que usa a cor Primary do tema DaisyUI atual -->
<button className="btn btn-neon btn-neon-primary">
  Tema DaisyUI
</button>`)
                    }
                    className="btn btn-ghost btn-xs text-xs gap-1"
                  >
                    <Copy className="size-3" /> Copiar
                  </button>
                </div>
                <pre className="bg-neutral-950 text-neutral-100 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-neutral-800">
{`<!-- Botão Neon Cyan padrão -->
<button className="btn btn-neon btn-neon-cyan">
  Ação Neon
</button>

<!-- Botão Neon com Pulsação Contínua -->
<button className="btn btn-neon btn-neon-magenta btn-neon-pulse">
  Oferta Especial
</button>

<!-- Botão Cyberpunk HUD Chanfrado -->
<button className="btn btn-neon btn-neon-lime btn-neon-cyber">
  Terminal Ativo
</button>

<!-- Botão Neon que usa a cor Primary do tema DaisyUI ativo (Bumblebee, Vampire, etc) -->
<button className="btn btn-neon btn-neon-primary">
  Tema DaisyUI
</button>`}
                </pre>
              </div>

              {/* Tabela de Props */}
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-semibold">Propriedades do Componente NeonButton</h4>
                <div className="overflow-x-auto">
                  <table className="table table-xs border border-base-300">
                    <thead>
                      <tr className="bg-base-300/50">
                        <th>Prop</th>
                        <th>Tipo</th>
                        <th>Padrão</th>
                        <th>Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono text-primary font-bold">variant</td>
                        <td className="font-mono">"pulse" | "beam" | "cyber" | "spotlight" | "outline-glow"</td>
                        <td>"pulse"</td>
                        <td>Estilo visual e algoritmo de iluminação</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-primary font-bold">neonColor</td>
                        <td className="font-mono">"cyan" | "magenta" | "purple" | "lime" | "amber" | "crimson" | "primary"</td>
                        <td>"cyan"</td>
                        <td>Tom emissivo da luz neon</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-primary font-bold">size</td>
                        <td className="font-mono">"sm" | "md" | "lg" | "xl"</td>
                        <td>"md"</td>
                        <td>Dimensões, espaçamento interno e raio de borda</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-primary font-bold">glowIntensity</td>
                        <td className="font-mono">"low" | "medium" | "high"</td>
                        <td>"medium"</td>
                        <td>Fator multiplicador do raio e opacidade do blur</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-primary font-bold">isLoading</td>
                        <td className="font-mono">boolean</td>
                        <td>false</td>
                        <td>Exibe um spinner neon com aceleração constante</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-primary font-bold">iconLeft / iconRight</td>
                        <td className="font-mono">React.ReactNode</td>
                        <td>undefined</td>
                        <td>Ícone com glow e animação suave de hover</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
