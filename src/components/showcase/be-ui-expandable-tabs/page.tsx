"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { ExpandableTabs } from "@/components/ui/be-ui-expandable-tabs";
import {
  Rocket,
  Inbox,
  Workflow,
  Sparkles,
  ChevronRight,
  FileText,
  ClipboardCheck,
  Megaphone,
  CalendarClock,
  CloudUpload,
  MessageCircle,
  Users,
  BadgeCheck,
  GitBranch,
  Webhook,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

function MenuRow({
  icon: Icon,
  label,
  badge,
}: {
  icon: LucideIcon;
  label: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold text-base-content transition-all hover:bg-base-200/80 cursor-pointer"
    >
      <div className="w-6 h-6 rounded-lg bg-base-300/40 flex items-center justify-center text-primary shrink-0">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="badge badge-xs badge-primary font-bold px-1.5 py-0.5">
          {badge}
        </span>
      )}
      <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
    </button>
  );
}

function MenuContainer({
  title,
  rows,
}: {
  title: string;
  rows: { icon: LucideIcon; label: string; badge?: string }[];
}) {
  return (
    <div className="flex w-[18.5rem] flex-col gap-1 p-1">
      <div className="px-2 py-1 flex items-center justify-between border-b border-base-300/60 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
          {title}
        </span>
        <span className="text-[10px] opacity-60">Ações Rápidas</span>
      </div>
      {rows.map((r) => (
        <MenuRow key={r.label} icon={r.icon} label={r.label} badge={r.badge} />
      ))}
    </div>
  );
}

export default function ExpandableTabsShowcase() {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const tabItems = [
    {
      id: "launch",
      label: "Lançamento",
      icon: <Rocket className="h-4 w-4" />,
      content: (
        <MenuContainer
          title="Gestão de Release"
          rows={[
            { icon: FileText, label: "Briefing da Versão", badge: "v2.4" },
            { icon: ClipboardCheck, label: "Checklist de QA" },
            { icon: Megaphone, label: "Notas de Campanha" },
            { icon: CalendarClock, label: "Cronograma de Rollout" },
            { icon: CloudUpload, label: "Deploy em Staging" },
          ]}
        />
      ),
    },
    {
      id: "inbox",
      label: "Mensagens",
      icon: <Inbox className="h-4 w-4" />,
      content: (
        <MenuContainer
          title="Central de Feedback"
          rows={[
            { icon: MessageCircle, label: "Feedbacks de Clientes", badge: "3 novos" },
            { icon: Users, label: "Solicitações da Equipe" },
            { icon: BadgeCheck, label: "Aprovações Pendentes" },
          ]}
        />
      ),
    },
    {
      id: "flows",
      label: "Fluxos",
      icon: <Workflow className="h-4 w-4" />,
      content: (
        <MenuContainer
          title="Automações & Webhooks"
          rows={[
            { icon: GitBranch, label: "Mapa de Gatilhos" },
            { icon: Webhook, label: "Disparos de Webhook", badge: "Ativo" },
            { icon: RefreshCw, label: "Fila de Retentativas" },
          ]}
        />
      ),
    },
    {
      id: "ai",
      label: "IA Suite",
      icon: <Sparkles className="h-4 w-4" />,
      content: (
        <MenuContainer
          title="Agentes de Inteligência"
          rows={[
            { icon: Sparkles, label: "Gerar Relatório de Métricas", badge: "Pro" },
            { icon: FileText, label: "Auditoria de Acessibilidade" },
            { icon: Users, label: "Simular Testes de Usuário" },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      <div className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* Header Unificado do Showcase */}
        <ShowcaseHeader
          title="BeUI Expandable Tabs"
          badge="Motion Spring & Dynamic Dock"
          backHref="/"
        />

        {/* Card de Apresentação e Detalhes da Arquitetura */}
        <div className="card card-elevated p-6 border border-base-300 mb-8 bg-base-200/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <span>📑</span> Abas Expansíveis com Animação Fluida de Doca
              </h2>
              <p className="text-sm opacity-75 max-w-3xl">
                Componente do <strong>21st.dev</strong> por <em>saurabh10102</em>. Um dock compacto que permanece em tamanho reduzido exibindo apenas ícones, e se expande dinamicamente com física elástica (<em>Spring Physics</em>) para revelar o nome da aba ativa e seu painel de conteúdo flutuante contextual.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="badge badge-primary font-bold text-xs">
                {selectedTab ? `Aba: ${selectedTab}` : "Menu Recolhido"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-base-300/60 text-xs">
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-primary mb-1">📐 Auto-Dimensionamento</span>
              O container se recalcula automaticamente via <code>ResizeObserver</code> com base nas dimensões reais do conteúdo de cada aba.
            </div>
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-accent mb-1">🎯 Foco & Fechamento Inteligente</span>
              Ao clicar fora ou pressionar <code>Escape</code>, o painel se recolhe suavemente de volta ao estado compacto de ícones.
            </div>
            <div className="p-3 bg-base-100 rounded-xl border border-base-300">
              <span className="font-bold block text-info mb-1">⚡ Motion & DaisyUI</span>
              Física de molas (stiffness 460/damping 30) integrada aos temas e variáveis CSS semânticas do projeto.
            </div>
          </div>
        </div>

        {/* Área Interativa com o Dock Expansível Centralizado */}
        <div className="flex flex-col items-center justify-center min-h-[460px] p-8 rounded-3xl border border-base-300 bg-base-200/20 shadow-inner relative overflow-hidden">
          <div className="absolute top-6 left-6 text-xs opacity-60 font-semibold">
            Clique nas abas abaixo para expandir o dock contextual:
          </div>

          <div className="mt-auto">
            <ExpandableTabs
              items={tabItems}
              value={selectedTab}
              onValueChange={setSelectedTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
