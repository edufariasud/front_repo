"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MerchantCatalog from "@/components/ecommerce/MerchantCatalog";

export default function MerchantCatalogShowcase() {
  const [theme, setTheme] = useState("dark");
  const [activeCodeTab, setActiveCodeTab] = useState<"preview" | "usage" | "features">("preview");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <main
      className="min-h-screen p-4 sm:p-8"
      style={{
        background: "var(--color-base-100)",
        color: "var(--color-base-content)",
        transition: "background-color 0.2s ease, color 0.2s ease"
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header do Showcase */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="btn btn-outline btn-sm rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Voltar
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-primary badge-sm font-bold">E-Commerce Merchant Suite</span>
                <span className="badge badge-accent badge-sm font-bold">DaisyUI v5 + Tailwind CSS v4</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                🛍️ Catálogo do Lojista (E-Commerce)
              </h1>
            </div>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-semibold opacity-70">Tema:</span>
            <select
              value={theme}
              onChange={(e) => changeTheme(e.target.value)}
              className="select select-bordered select-xs rounded-lg"
            >
              {["dark", "light", "bumblebee", "synthwave", "forest", "luxury", "business", "night", "dim", "sunset", "abyss"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Abas de Visualização / Código / Documentação */}
        <div className="tabs tabs-boxed bg-base-200/60 p-1 w-fit rounded-xl border border-base-300">
          <button
            onClick={() => setActiveCodeTab("preview")}
            className={`tab tab-sm font-bold rounded-lg cursor-pointer ${activeCodeTab === "preview" ? "tab-active bg-primary text-primary-content" : ""}`}
          >
            👁️ Demonstração Interativa
          </button>
          <button
            onClick={() => setActiveCodeTab("usage")}
            className={`tab tab-sm font-bold rounded-lg cursor-pointer ${activeCodeTab === "usage" ? "tab-active bg-primary text-primary-content" : ""}`}
          >
            💻 Como Utilizar (Código)
          </button>
          <button
            onClick={() => setActiveCodeTab("features")}
            className={`tab tab-sm font-bold rounded-lg cursor-pointer ${activeCodeTab === "features" ? "tab-active bg-primary text-primary-content" : ""}`}
          >
            ✨ Recursos do Componente
          </button>
        </div>

        {/* Conteúdo das Abas */}
        {activeCodeTab === "preview" && (
          <div className="space-y-6">
            <MerchantCatalog />
          </div>
        )}

        {activeCodeTab === "usage" && (
          <div className="card bg-base-200/60 border border-base-300 p-6 rounded-2xl space-y-4 font-mono text-xs">
            <h3 className="font-bold text-sm text-base-content font-sans">Exemplo de Importação & Uso:</h3>
            <pre className="p-4 bg-base-300 rounded-xl overflow-x-auto text-primary">
{`import MerchantCatalog, { ProductItem } from "@/components/ecommerce/MerchantCatalog";

export default function LojistaPage() {
  const handleCreated = (newProduct: ProductItem) => {
    console.log("Novo produto criado:", newProduct);
  };

  return (
    <div className="p-6">
      <MerchantCatalog
        currencySymbol="R$"
        onProductCreated={handleCreated}
        onProductUpdated={(p) => console.log("Atualizado:", p)}
        onProductDeleted={(id) => console.log("Excluído:", id)}
      />
    </div>
  );
}`}
            </pre>
          </div>
        )}

        {activeCodeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card bg-base-200/50 p-5 rounded-2xl border border-base-300 space-y-2">
              <span className="text-2xl">📊</span>
              <h4 className="font-bold text-sm">Dashboard de Métricas</h4>
              <p className="text-xs opacity-70 leading-relaxed">
                Contadores de estoque total, itens críticos, faturamento acumulado e velocidade de vendas diárias e mensais.
              </p>
            </div>
            <div className="card bg-base-200/50 p-5 rounded-2xl border border-base-300 space-y-2">
              <span className="text-2xl">🔍</span>
              <h4 className="font-bold text-sm">Filtros & Busca Avançada</h4>
              <p className="text-xs opacity-70 leading-relaxed">
                Busca instantânea por SKU, marca, nome e categoria com popover de filtros dinâmicos por faixa de preço, estoque e estrelas.
              </p>
            </div>
            <div className="card bg-base-200/50 p-5 rounded-2xl border border-base-300 space-y-2">
              <span className="text-2xl">📱</span>
              <h4 className="font-bold text-sm">Drawers & Modais Nativos</h4>
              <p className="text-xs opacity-70 leading-relaxed">
                Drawer lateral deslizante para edição rápida, preview como o cliente vê a vitrine e modal seguro de confirmação de exclusão.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
