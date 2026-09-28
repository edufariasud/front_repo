"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";

export default function WebGLShaderShowcase() {
  const [activeTab, setActiveTab] = useState<"preview" | "buttons" | "code">("preview");
  const [isShaderFullscreen, setIsShaderFullscreen] = useState(false);
  const [buttonClickedMessage, setButtonClickedMessage] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setButtonClickedMessage(`Ação disparada via ${label}! 🚀`);
    setTimeout(() => setButtonClickedMessage(null), 3000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      {/* Se o modo fullscreen estiver ativo, o shader cobre toda a viewport */}
      {isShaderFullscreen && <WebGLShader className="fixed inset-0 w-full h-full block z-0" />}

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Unificado do Showcase */}
        <div className="p-4 sm:p-6 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShowcaseHeader
              title="WebGL Shader & Liquid Glass Button"
              badge="Three.js & Shaders"
              backHref="/"
            />

            {/* Ações Rápidas do Showcase */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIsShaderFullscreen(!isShaderFullscreen)}
                className={`btn btn-xs sm:btn-sm ${
                  isShaderFullscreen ? "btn-primary" : "btn-outline"
                } rounded-xl gap-2 font-medium cursor-pointer`}
              >
                <span>{isShaderFullscreen ? "🔲 Modo Container" : "✨ Shader Tela Cheia"}</span>
              </button>

              <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`join-item btn btn-xs ${activeTab === "preview" ? "btn-primary" : "btn-ghost"}`}
                >
                  Hero Demo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("buttons")}
                  className={`join-item btn btn-xs ${activeTab === "buttons" ? "btn-primary" : "btn-ghost"}`}
                >
                  Botões Líquidos & Metal
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`join-item btn btn-xs ${activeTab === "code" ? "btn-primary" : "btn-ghost"}`}
                >
                  Código
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Toast Local */}
        {buttonClickedMessage && (
          <div className="fixed bottom-6 right-6 z-50 alert alert-success shadow-2xl py-2.5 px-4 text-sm font-bold flex items-center gap-2 animate-bounce">
            <span>✨</span>
            <span>{buttonClickedMessage}</span>
          </div>
        )}

        {/* Conteúdo Principal */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 flex flex-col items-center justify-center">
          {/* TAB 1: Hero Demo Oficial */}
          {activeTab === "preview" && (
            <div className="w-full flex flex-col items-center justify-center py-6">
              <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-base-300 shadow-2xl bg-black/90 min-h-[560px] flex items-center justify-center p-4 sm:p-8">
                {/* Background WebGL Shader embutido no container */}
                {!isShaderFullscreen && (
                  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <WebGLShader className="absolute inset-0 w-full h-full block" />
                  </div>
                )}

                {/* Conteúdo Hero Overlay */}
                <div className="relative z-10 w-full max-w-2xl mx-auto text-center border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-sm bg-black/30 shadow-2xl">
                  <div className="inline-flex items-center justify-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-green-400">Available for New Projects</span>
                  </div>

                  <h1 className="mb-4 text-white text-center text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight drop-shadow-md">
                    Design is Everything
                  </h1>

                  <p className="text-white/70 px-4 text-center text-sm sm:text-base lg:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                    Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <LiquidButton
                      className="text-white border border-white/20 rounded-full cursor-pointer hover:border-white/50"
                      size="xl"
                      onClick={() => handleAction("Liquid Glass Button")}
                    >
                      <span>Let&apos;s Go →</span>
                    </LiquidButton>

                    <MetalButton
                      variant="gold"
                      onClick={() => handleAction("Metal Gold Button")}
                    >
                      Acessar Portfólio
                    </MetalButton>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Showcase de Botões Líquidos e Metálicos */}
          {activeTab === "buttons" && (
            <div className="w-full max-w-5xl space-y-10 py-6">
              {/* Coleção Liquid Glass Button */}
              <div className="card bg-base-200/80 border border-base-300 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                    <span>💧</span> Liquid Glass Button (Efeito de Vidro Líquido & Filtro SVG)
                  </h2>
                  <p className="text-sm opacity-70 mt-1">
                    Utiliza filtros de refração SVG dinâmicos (<code className="font-mono text-xs">#container-glass</code>) e sombras concêntricas para criar uma lente líquida translúcida.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-items-center p-6 bg-base-300/40 rounded-2xl border border-base-300">
                  <div className="text-center space-y-2">
                    <span className="text-xs opacity-60 font-mono">Tamanho XXL (Padrão)</span>
                    <div>
                      <LiquidButton size="xxl" onClick={() => handleAction("Liquid XXL")}>
                        Conhecer Mais
                      </LiquidButton>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <span className="text-xs opacity-60 font-mono">Tamanho XL + Ícone</span>
                    <div>
                      <LiquidButton size="xl" className="text-secondary" onClick={() => handleAction("Liquid XL")}>
                        <span>⚡ Iniciar Teste</span>
                      </LiquidButton>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <span className="text-xs opacity-60 font-mono">Tamanho LG (Destructive)</span>
                    <div>
                      <LiquidButton size="lg" variant="destructive" onClick={() => handleAction("Liquid Destructive")}>
                        Cancelar Operação
                      </LiquidButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coleção Metal Button */}
              <div className="card bg-base-200/80 border border-base-300 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                    <span>🪙</span> Metal Buttons (Estilo Neomorfismo Metalizado & Brilho Tátil)
                  </h2>
                  <p className="text-sm opacity-70 mt-1">
                    Gradientes multicamadas simulando relevo usinado com chanfro, reflexo luminoso animado ao clique e resposta tátil.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-5 p-6 bg-base-300/40 rounded-2xl border border-base-300">
                  <MetalButton variant="default" onClick={() => handleAction("Metal Default")}>
                    Prata Cromo
                  </MetalButton>

                  <MetalButton variant="gold" onClick={() => handleAction("Metal Gold")}>
                    Ouro Real 24k
                  </MetalButton>

                  <MetalButton variant="bronze" onClick={() => handleAction("Metal Bronze")}>
                    Bronze Escovado
                  </MetalButton>

                  <MetalButton variant="primary" onClick={() => handleAction("Metal Primary")}>
                    Safira / Indigo
                  </MetalButton>

                  <MetalButton variant="success" onClick={() => handleAction("Metal Success")}>
                    Esmeralda Metal
                  </MetalButton>

                  <MetalButton variant="error" onClick={() => handleAction("Metal Error")}>
                    Rubi Carmesim
                  </MetalButton>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Guia de Instalação e Código */}
          {activeTab === "code" && (
            <div className="w-full max-w-4xl space-y-6 py-6">
              <div className="card bg-base-200 border border-base-300 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold">1. Instalação de Dependências</h3>
                <pre className="p-4 rounded-xl bg-base-300 font-mono text-xs overflow-x-auto text-primary">
                  npm install three @radix-ui/react-slot class-variance-authority clsx tailwind-merge
                </pre>
              </div>

              <div className="card bg-base-200 border border-base-300 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold">2. Importação e Uso no seu Projeto</h3>
                <pre className="p-4 rounded-xl bg-base-300 font-mono text-xs overflow-x-auto text-base-content/90">
{`import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button";

export default function HeroSection() {
  return (
    <div className="relative min-h-[500px] w-full overflow-hidden rounded-3xl">
      <WebGLShader className="absolute inset-0 w-full h-full block" />
      <div className="relative z-10 p-12 text-center">
        <h1 className="text-5xl font-black text-white">Design is Everything</h1>
        <div className="mt-8 flex justify-center gap-4">
          <LiquidButton size="xl">Começar Agora</LiquidButton>
          <MetalButton variant="gold">Ver Planos</MetalButton>
        </div>
      </div>
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
