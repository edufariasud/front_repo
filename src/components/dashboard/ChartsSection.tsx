"use client";

import React, { useState } from "react";

export default function ChartsSection() {
  const [activeTab, setActiveTab] = useState<"revenue" | "traffic">("revenue");

  const monthlyRevenue = [
    { month: "Jan", value: 34, height: 45 },
    { month: "Fev", value: 48, height: 60 },
    { month: "Mar", value: 42, height: 52 },
    { month: "Abr", value: 65, height: 80 },
    { month: "Mai", value: 58, height: 72 },
    { month: "Jun", value: 78, height: 95 },
    { month: "Jul", value: 89, height: 110 },
    { month: "Ago", value: 95, height: 120 }
  ];

  return (
    <section id="dashboard-charts-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Gráfico Principal */}
      <div
        className="card card-elevated lg:col-span-2"
        style={{
          background: "var(--color-base-100)",
          border: "1px solid var(--color-base-300)"
        }}
      >
        <div className="card-body p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="badge badge-gradient badge-sm">Analytics</span>
                <span className="text-xs opacity-60">Atualizado há 5 min</span>
              </div>
              <h3 className="text-xl font-black text-base-content mt-1">
                Evolução Financeira & Métricas
              </h3>
            </div>

            <div className="join">
              <button
                id="chart-tab-revenue"
                onClick={() => setActiveTab("revenue")}
                className={`join-item btn btn-xs ${activeTab === "revenue" ? "btn-primary" : "btn-ghost"}`}
              >
                Receita
              </button>
              <button
                id="chart-tab-traffic"
                onClick={() => setActiveTab("traffic")}
                className={`join-item btn btn-xs ${activeTab === "traffic" ? "btn-primary" : "btn-ghost"}`}
              >
                Acessos
              </button>
            </div>
          </div>

          <div className="w-full pt-4">
            <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 pb-2 border-b border-base-300 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-b border-base-content w-full" />
                <div className="border-b border-base-content w-full" />
                <div className="border-b border-base-content w-full" />
                <div className="border-b border-base-content w-full" />
              </div>

              {monthlyRevenue.map((item, idx) => {
                const multiplier = activeTab === "traffic" ? 1.2 : 1.0;
                const calculatedHeight = Math.min(180, Math.round(item.height * multiplier));

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center gap-2 group relative z-10 h-full justify-end"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-8 bg-neutral text-neutral-content text-xs font-bold py-1 px-2 rounded shadow pointer-events-none z-20 whitespace-nowrap">
                      {activeTab === "revenue" ? `R$ ${item.value * 1250},00` : `${item.value * 45} visitas`}
                    </div>

                    <div
                      className="w-full max-w-[40px] rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      style={{
                        height: `${calculatedHeight}px`,
                        background: idx === monthlyRevenue.length - 1
                          ? "var(--color-primary, #8250df)"
                          : "linear-gradient(180deg, var(--color-secondary, #d946ef) 0%, rgba(130, 80, 223, 0.4) 100%)",
                        boxShadow: idx === monthlyRevenue.length - 1 ? "0 0 15px var(--color-primary)" : "none"
                      }}
                    />
                    <span className="text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Card Lateral: Distribuição de Planos */}
      <div
        className="card card-elevated"
        style={{
          background: "var(--color-base-100)",
          border: "1px solid var(--color-base-300)"
        }}
      >
        <div className="card-body p-6 justify-between">
          <div>
            <div className="badge badge-secondary badge-sm mb-2">Segmentação</div>
            <h3 className="text-lg font-bold text-base-content">Planos Ativos</h3>
            <p className="text-xs opacity-70 mt-1">
              Distribuição da base de clientes por modalidade
            </p>

            <div className="mt-6 flex justify-center items-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="transparent"
                    stroke="var(--color-base-300)"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="transparent"
                    stroke="var(--color-primary)"
                    strokeWidth="3.8"
                    strokeDasharray="45, 100"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="transparent"
                    stroke="var(--color-secondary)"
                    strokeWidth="3.8"
                    strokeDasharray="35, 100"
                    strokeDashoffset="-45"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="transparent"
                    stroke="var(--color-accent, #38bdf8)"
                    strokeWidth="3.8"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-80"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-2xl font-black text-base-content leading-none">1.420</span>
                  <span className="text-[10px] uppercase font-bold opacity-60 mt-1">Total Assinantes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-base-300">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="font-medium text-base-content">Enterprise</span>
              </span>
              <span className="font-bold">45% (639)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="font-medium text-base-content">Profissional</span>
              </span>
              <span className="font-bold">35% (497)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="font-medium text-base-content">Starter</span>
              </span>
              <span className="font-bold">20% (284)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
