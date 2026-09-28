"use client";

import React from "react";

interface QuickActionsProps {
  onTriggerAction: (actionName: string) => void;
}

export default function QuickActions({ onTriggerAction }: QuickActionsProps) {
  const actions = [
    {
      id: "action-new-transaction",
      label: "Nova Transação",
      icon: "💳",
      desc: "Registrar pagamento",
      btnClass: "btn-primary"
    },
    {
      id: "action-invite-user",
      label: "Convidar Membro",
      icon: "👥",
      desc: "Adicionar à equipe",
      btnClass: "btn-secondary"
    },
    {
      id: "action-export-report",
      label: "Exportar Relatório",
      icon: "📑",
      desc: "Baixar dados em CSV",
      btnClass: "btn-gradient"
    },
    {
      id: "action-system-health",
      label: "Diagnóstico",
      icon: "⚡",
      desc: "Verificar integridade",
      btnClass: "btn-ghost"
    }
  ];

  return (
    <section id="dashboard-quick-actions" className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((act) => (
        <button
          key={act.id}
          id={act.id}
          onClick={() => onTriggerAction(act.label)}
          className="card card-elevated p-4 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group flex flex-col justify-between"
          style={{
            background: "var(--color-base-100)",
            border: "1px solid var(--color-base-300)"
          }}
        >
          <div className="flex items-center justify-between w-full mb-3">
            <span className="text-2xl group-hover:rotate-6 transition-transform">
              {act.icon}
            </span>
            <span className="badge badge-ghost badge-xs opacity-60">Atalho</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-base-content leading-tight">
              {act.label}
            </h4>
            <p className="text-[11px] opacity-65 mt-0.5">{act.desc}</p>
          </div>
        </button>
      ))}
    </section>
  );
}
