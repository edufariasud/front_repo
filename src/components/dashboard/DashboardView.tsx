"use client";

import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import StatsCard, { StatItem } from "./StatsCard";
import ChartsSection from "./ChartsSection";
import DataTable from "./DataTable";
import QuickActions from "./QuickActions";
import UserMenu from "./UserMenu";
import AppsLauncher from "./AppsLauncher";
import ToastContainer, { ToastMessage } from "./ToastContainer";

import SideNav, { SideNavItem, SideNavSection } from "../layout/SideNav";
import ScrollableTabsNav from "../layout/ScrollableTabsNav";

// Importando todos os showcases de componentes do projeto
import StatsShowcase from "../showcase/stats/page";
import ProfileShowcase from "../showcase/profile/page";
import UploadShowcase from "../showcase/upload/page";
import FAQShowcase from "../showcase/faq/page";
import NotificationsShowcase from "../showcase/notifications/page";
import PricingShowcase from "../showcase/pricing/page";
import TableShowcase from "../showcase/table/page";
import StepperShowcase from "../showcase/stepper/page";
import ChartsShowcase from "../showcase/charts/page";
import ProductCardShowcase from "../showcase/product-card/page";
import EvervaultShowcase from "../showcase/evervault/page";
import PointerHighlightShowcase from "../showcase/pointer-highlight/page";
import SideNavShowcase from "../showcase/side-nav/page";
import ResizableNavbarShowcase from "../showcase/resizable-navbar/page";
import MerchantCatalogShowcase from "../showcase/merchant-catalog/page";
import WebGLShaderShowcase from "../showcase/webgl-shader/page";
import BorderBeamShowcase from "../showcase/border-beam/page";
import SpotlightShimmerShowcase from "../showcase/spotlight-shimmer/page";
import MeteorsMarqueeShowcase from "../showcase/meteors-marquee/page";
import ProjectCardsShowcase from "../showcase/project-cards/page";
import MarketingActivitiesShowcase from "../showcase/marketing-activities/page";
import HorizonHeroShowcase from "../showcase/horizon-hero/page";
import QuordixHeroShowcase from "../showcase/quordix-hero/page";
import ExpandableTabsShowcase from "../showcase/be-ui-expandable-tabs/page";
import NeonButtonsShowcase from "../showcase/neon-buttons/page";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

interface DashboardViewProps {
  user: UserProfile;
  onLogout: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

type NavSection = 
  | "dashboard"
  | "explorar-projetos"
  | "meus-projetos"
  | "portfolio"
  | "conquistas"
  | "aprendizado"
  | "stats" 
  | "profile" 
  | "upload" 
  | "faq" 
  | "notifications" 
  | "pricing" 
  | "table" 
  | "stepper" 
  | "charts" 
  | "product-card" 
  | "evervault" 
  | "pointer-highlight"
  | "side-nav"
  | "resizable-navbar"
  | "merchant-catalog"
  | "webgl-shader"
  | "border-beam"
  | "spotlight-shimmer"
  | "meteors-marquee"
  | "project-cards"
  | "marketing-activities"
  | "horizon-hero"
  | "quordix-hero"
  | "be-ui-expandable-tabs"
  | "neon-buttons";

export default function DashboardView({
  user,
  onLogout,
  currentTheme,
  onThemeChange
}: DashboardViewProps) {
  const [activeSection, setActiveSection] = useState<NavSection>("dashboard");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [userActiveColor, setUserActiveColor] = useState<string>("red");

  const colorOptions = [
    { id: "red", label: "Vermelho", bg: "bg-red-600" },
    { id: "blue", label: "Azul", bg: "bg-blue-600" },
    { id: "emerald", label: "Verde", bg: "bg-emerald-600" },
    { id: "purple", label: "Roxo", bg: "bg-purple-600" },
    { id: "amber", label: "Laranja", bg: "bg-amber-600" }
  ];
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedTxDetail, setSelectedTxDetail] = useState<string | null>(null);

  const addToast = (type: ToastMessage["type"], title: string, message?: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const statsData: StatItem[] = [
    {
      id: "revenue",
      label: "Faturamento Total",
      value: "R$ 142.850",
      change: "18.4%",
      isPositive: true,
      icon: "💰",
      badgeVariant: "gradient",
      progressValue: 88
    },
    {
      id: "subscribers",
      label: "Assinantes Ativos",
      value: "1.420",
      change: "12.2%",
      isPositive: true,
      icon: "👥",
      badgeVariant: "glow",
      progressValue: 74
    },
    {
      id: "churn",
      label: "Taxa de Retenção",
      value: "97.8%",
      change: "0.4%",
      isPositive: true,
      icon: "🛡️",
      badgeVariant: "secondary",
      progressValue: 97
    },
    {
      id: "server_uptime",
      label: "Disponibilidade SLA",
      value: "99.98%",
      change: "0.01%",
      isPositive: true,
      icon: "⚡",
      badgeVariant: "accent",
      progressValue: 99
    }
  ];

  const handleQuickAction = (actionName: string) => {
    addToast(
      "success",
      `Ação Iniciada: ${actionName}`,
      `O processo para '${actionName}' foi executado com sucesso no ambiente.`
    );
  };

  const handleTableAction = (action: string, txId: string) => {
    setSelectedTxDetail(txId);
    addToast(
      "info",
      `Visualizando ${txId}`,
      `Detalhes e registro de auditoria da transação abertos.`
    );
  };

  // Seções organizadas do SideNav (Principal e Componentes)
  const sideNavSections: SideNavSection[] = [
    {
      id: "section-principal",
      title: "Principal",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          )
        },
        {
          id: "meus-projetos",
          label: "Meus Projetos",
          badge: "4",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          )
        },
        {
          id: "explorar-projetos",
          label: "Explorar Projetos",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: "portfolio",
          label: "Portfólio",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )
        },
        {
          id: "conquistas",
          label: "Conquistas",
          badge: "8",
          badgeVariant: "accent",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
            </svg>
          )
        },
        {
          id: "aprendizado",
          label: "Aprendizado",
          badge: "Novo",
          badgeVariant: "info",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )
        }
      ]
    },
    {
      id: "section-componentes",
      title: "Componentes",
      items: [
        { id: "stats", label: "Stats Cards", icon: "📈" },
        { id: "profile", label: "Perfil & Bio", icon: "📇" },
        { id: "upload", label: "Dropzone Upload", icon: "📂" },
        { id: "pricing", label: "Tabela Preços", icon: "💳" },
        { id: "table", label: "Tabela Dados", icon: "🗃️" },
        { id: "stepper", label: "Stepper", icon: "🗺️" },
        { id: "charts", label: "Gráficos", icon: "📉" },
        { id: "faq", label: "FAQ / Dúvidas", icon: "💬" },
        { id: "notifications", label: "Notificações", icon: "🔔" },
        { id: "product-card", label: "Card Produto 3D", icon: "👟" },
        { id: "evervault", label: "Evervault", icon: "🔒" },
        { id: "pointer-highlight", label: "Pointer Highlight", icon: "🎯" },
        { id: "side-nav", label: "SideNav Specs", icon: "🧭" },
        { id: "resizable-navbar", label: "Resizable Navbar", icon: "🗺️" },
        { id: "merchant-catalog", label: "Catálogo Lojista", icon: "🛍️", badge: "Novo", badgeVariant: "primary" },
        { id: "webgl-shader", label: "WebGL & Liquid Button", icon: "🔮", badge: "3D", badgeVariant: "accent" },
        { id: "border-beam", label: "Border Beam Glow", icon: "✨", badge: "21st", badgeVariant: "accent" },
        { id: "spotlight-shimmer", label: "Spotlight & Shimmer", icon: "🔦", badge: "Novo", badgeVariant: "primary" },
        { id: "meteors-marquee", label: "Meteors & Marquee", icon: "🌌", badge: "Novo", badgeVariant: "accent" },
        { id: "project-cards", label: "Project Progress Cards", icon: "📋", badge: "Novo", badgeVariant: "primary" },
        { id: "marketing-activities", label: "Marketing Activities", icon: "📊", badge: "Novo", badgeVariant: "primary" },
        { id: "horizon-hero", label: "Horizon Hero 3D", icon: "🌌", badge: "21st", badgeVariant: "accent", href: "/components/horizon-hero" },
        { id: "quordix-hero", label: "Quordix Hero", icon: "⚡", badge: "21st", badgeVariant: "primary", href: "/components/quordix-hero" },
        { id: "be-ui-expandable-tabs", label: "Expandable Tabs Dock", icon: "📑", badge: "21st", badgeVariant: "accent" },
        { id: "neon-buttons", label: "Botões Neon", icon: "💡", badge: "Novo", badgeVariant: "primary" }
      ]
    }
  ];

  // Ações inferiores (Configurações e Sair)
  const bottomActions = [
    {
      id: "configuracoes",
      label: "Configurações",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => addToast("info", "Configurações", "Painel de configurações em desenvolvimento.")
    },
    {
      id: "sair",
      label: "Sair",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      onClick: onLogout
    }
  ];

  // Abas para os componentes específicos caso o usuário queira inspecionar cada um
  const componentTabs = [
    { id: "dashboard", label: "Principal", icon: "📊" },
    { id: "stats", label: "Stats Cards", icon: "📈" },
    { id: "profile", label: "Perfil & Bio", icon: "📇" },
    { id: "upload", label: "Dropzone", icon: "📂" },
    { id: "pricing", label: "Preços", icon: "💳" },
    { id: "table", label: "Tabela", icon: "🗃️" },
    { id: "stepper", label: "Stepper", icon: "🗺️" },
    { id: "charts", label: "Gráficos", icon: "📉" },
    { id: "faq", label: "FAQ", icon: "💬" },
    { id: "notifications", label: "Toasts", icon: "🔔" },
    { id: "product-card", label: "Product 3D", icon: "👟" },
    { id: "evervault", label: "Evervault", icon: "🔒" },
    { id: "pointer-highlight", label: "Pointer Highlight", icon: "🎯" },
    { id: "side-nav", label: "SideNav Specs", icon: "🧭" },
    { id: "resizable-navbar", label: "Resizable Navbar", icon: "🗺️" },
    { id: "merchant-catalog", label: "Catálogo Lojista", icon: "🛍️" },
    { id: "webgl-shader", label: "WebGL & Liquid", icon: "🔮" },
    { id: "border-beam", label: "Border Beam Glow", icon: "✨" },
    { id: "spotlight-shimmer", label: "Spotlight & Shimmer", icon: "🔦" },
    { id: "meteors-marquee", label: "Meteors & Marquee", icon: "🌌" },
    { id: "project-cards", label: "Project Progress Cards", icon: "📋" },
    { id: "marketing-activities", label: "Marketing Activities", icon: "📊" },
    { id: "neon-buttons", label: "Botões Neon", icon: "💡" }
  ];

  return (
    <div
      id="dashboard-view-wrapper"
      className="h-screen w-full flex overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--color-base-100)",
        color: "var(--color-base-content)"
      }}
    >
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* 1. Side Navigation (Sidebar principal do layout) */}
      <SideNav
        brandName="TechSolution"
        brandAvatarText="TS"
        sections={sideNavSections}
        activeId={activeSection}
        onSelect={(id) => setActiveSection(id as NavSection)}
        bottomActions={bottomActions}
        activeColor={userActiveColor}
        currentTheme={currentTheme}
        user={{
          name: "EDUARDO AUGUSTO ...",
          subtitle: "Univassouras",
          avatarText: "E"
        }}
        onUserClick={() => addToast("info", "Perfil", "Usuário: Eduardo Augusto (Univassouras)")}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* 2. Área Direita: Header + Conteúdo Rolável */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Navbar */}
        <header
          id="dashboard-header-navbar"
          className="shrink-0 border-b border-base-300 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 relative z-40"
          style={{ background: "color-mix(in srgb, var(--color-base-100) 92%, transparent)" }}
        >
          <div className="flex items-center gap-3">
            {/* Botão de abrir menu no mobile */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="btn btn-ghost btn-square btn-sm lg:hidden cursor-pointer"
              aria-label="Abrir Menu de Navegação"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Título visível apenas no mobile (no desktop a SideNav já exibe a marca) */}
            <button
              onClick={() => setActiveSection("dashboard")}
              className="flex lg:hidden items-center gap-2 cursor-pointer text-left hover:opacity-80 transition-opacity"
              title="Ir para o Dashboard Principal"
            >
              <span className="font-extrabold text-base tracking-tight text-base-content">
                TechSolution
              </span>
              <span className="badge badge-gradient badge-xs font-bold">
                DASHBOARD
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Paleta de Cor do Botão Ativo (Fixa em dark e light) */}
            {(currentTheme === "dark" || currentTheme === "light") && (
              <div className="hidden md:flex items-center gap-1.5 bg-base-200/80 px-2.5 py-1 rounded-xl border border-base-300">
                <span className="text-[11px] font-semibold opacity-60 mr-1">Cor:</span>
                {colorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    title={opt.label}
                    onClick={() => {
                      setUserActiveColor(opt.id);
                      addToast("success", "Cor Atualizada", `Destaque definido para tom ${opt.label}.`);
                    }}
                    className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${opt.bg} ${
                      userActiveColor === opt.id ? "scale-125 ring-2 ring-base-content" : "opacity-75 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}

            <ThemeSwitcher
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
            />

            {/* Inicializador de Aplicativos (Apps Launcher / Waffle Menu) */}
            <AppsLauncher
              onSelectApp={(app) => {
                if (app.id === "catalog") {
                  setActiveSection("merchant-catalog");
                  addToast("info", `App Aberto: ${app.name}`, "Redirecionando para o Catálogo do Lojista.");
                } else if (app.id === "analytics") {
                  setActiveSection("dashboard");
                  addToast("info", `App Aberto: ${app.name}`, "Exibindo painel de métricas analíticas.");
                } else {
                  addToast("info", `Abrindo ${app.name}`, `Iniciando o ecossistema ${app.name}...`);
                }
              }}
              onOpenMore={() => {
                setActiveSection("explorar-projetos");
                addToast("info", "Ecossistema TechSolution", "Explorando catálogo completo de soluções.");
              }}
            />

            <button
              id="header-notification-btn"
              onClick={() => addToast("info", "Central de Notificações", "Todos os componentes estão sincronizados e operacionais.")}
              className="btn btn-ghost btn-circle btn-sm relative cursor-pointer"
              aria-label="Notificações"
            >
              <span className="text-base" role="img" aria-hidden="true">🔔</span>
              <span className="w-2 h-2 rounded-full bg-primary absolute top-1.5 right-1.5 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-primary absolute top-1.5 right-1.5" />
            </button>

            <div className="divider divider-horizontal my-1 opacity-40" />

            <UserMenu
              user={user}
              onLogout={onLogout}
              onOpenSettings={() => addToast("info", "Configurações", "Painel de configurações em desenvolvimento.")}
            />
          </div>
        </header>

        {/* Barra de Componentes Reutilizável (ScrollableTabsNav) */}
        <ScrollableTabsNav
          items={componentTabs}
          activeId={activeSection}
          onSelect={(id) => setActiveSection(id as NavSection)}
        />

        {/* Conteúdo Rolável Principal */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
            {/* Visão Principal: Dashboard */}
            {activeSection === "dashboard" && (
              <>
                {/* Banner */}
                <section
                  id="dashboard-welcome-banner"
                  className="card card-spotlight p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(130, 80, 223, 0.15) 0%, rgba(217, 70, 239, 0.08) 100%)",
                    border: "1px solid var(--color-base-300)"
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="badge badge-primary font-bold px-3 py-1 text-xs">
                        Sessão Conectada
                      </span>
                      <span className="text-sm opacity-70 font-medium">13 Componentes Carregados</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-gradient-white">
                      Olá, {user.name.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-base sm:text-lg opacity-85 mt-2 max-w-2xl leading-relaxed">
                      Painel integrado TechSolution utilizando a SideNav e todos os componentes e tokens de design.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      id="btn-quick-export"
                      onClick={() => handleQuickAction("Relatório Executivo")}
                      className="btn btn-gradient font-bold px-5 shadow-lg cursor-pointer"
                    >
                      📊 Baixar Resumo
                    </button>
                    <button
                      id="btn-dashboard-logout"
                      onClick={onLogout}
                      className="btn btn-outline btn-error font-semibold px-4 cursor-pointer"
                    >
                      Sair
                    </button>
                  </div>
                </section>

                {/* 1. Stat Cards */}
                <section aria-label="Estatísticas Principais">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statsData.map((stat) => (
                      <StatsCard key={stat.id} stat={stat} />
                    ))}
                  </div>
                </section>

                {/* 2. Atalhos e Ações Rápidas */}
                <QuickActions onTriggerAction={handleQuickAction} />

                {/* 3. Gráficos Analíticos */}
                <ChartsSection />

                {/* 4. Tabela de Transações Recentes */}
                <DataTable onActionClick={handleTableAction} />
              </>
            )}

            {/* Visão: Meus Projetos */}
            {activeSection === "meus-projetos" && (
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300 pb-5">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                      <span>📁</span> Meus Projetos
                    </h2>
                    <p className="text-sm opacity-70 mt-1">
                      Gerencie seus repositórios, status de entrega e progresso de desenvolvimento.
                    </p>
                  </div>
                  <button
                    onClick={() => addToast("success", "Novo Projeto", "Assistente de criação de projeto iniciado.")}
                    className="btn btn-primary font-bold btn-sm sm:btn-md cursor-pointer"
                  >
                    ➕ Criar Novo Projeto
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      name: "Front Ref Components",
                      desc: "Biblioteca de componentes React 19 com DaisyUI v5 e Tailwind CSS v4.",
                      badge: "Em Produção",
                      badgeColor: "badge-success",
                      progress: 96,
                      tech: ["React 19", "Next.js 16", "DaisyUI v5"],
                      updated: "Hoje às 08:30"
                    },
                    {
                      name: "Dashboard Analytics V2",
                      desc: "Painel analítico corporativo com métricas em tempo real e gráficos Recharts.",
                      badge: "Em Andamento",
                      badgeColor: "badge-primary",
                      progress: 82,
                      tech: ["TypeScript", "Recharts", "Tailwind"],
                      updated: "Ontem"
                    },
                    {
                      name: "Hardware Monitor CLI",
                      desc: "Ferramenta CLI para diagnóstico e telemetria de componentes de hardware.",
                      badge: "Concluído",
                      badgeColor: "badge-accent",
                      progress: 100,
                      tech: ["Node.js", "Bash", "Systemd"],
                      updated: "Há 3 dias"
                    },
                    {
                      name: "E-Commerce Mobile",
                      desc: "Aplicativo mobile multiplataforma com catálogo de produtos e checkout ágil.",
                      badge: "Planejamento",
                      badgeColor: "badge-warning",
                      progress: 35,
                      tech: ["React Native", "Expo", "Stripe"],
                      updated: "Há 1 semana"
                    }
                  ].map((proj) => (
                    <div key={proj.name} className="card card-elevated p-6 space-y-4 border border-base-300">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-lg">{proj.name}</h3>
                          <p className="text-xs opacity-70 mt-1">{proj.desc}</p>
                        </div>
                        <span className={`badge badge-sm font-bold ${proj.badgeColor}`}>{proj.badge}</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="opacity-70">Progresso</span>
                          <span className="text-primary">{proj.progress}%</span>
                        </div>
                        <progress className="progress progress-primary w-full" value={proj.progress} max="100" />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-base-200 text-xs">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tech.map((t) => (
                            <span key={t} className="badge badge-ghost badge-xs font-mono">{t}</span>
                          ))}
                        </div>
                        <span className="opacity-50 text-[11px]">{proj.updated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Visão: Explorar Projetos */}
            {activeSection === "explorar-projetos" && (
              <section className="space-y-6">
                <div className="border-b border-base-300 pb-5">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                    <span>🧭</span> Explorar Projetos & Templates
                  </h2>
                  <p className="text-sm opacity-70 mt-1">
                    Descubra padrões de arquitetura, templates prontos e designs criados pela comunidade.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { title: "SaaS Admin Kit", category: "Dashboards", rating: "4.9 ★", downloads: "2.4k", desc: "Estrutura completa com auth, RBAC e faturamento." },
                    { title: "Design Tokens Studio", category: "UI/UX", rating: "5.0 ★", downloads: "1.8k", desc: "Gerador automatizado de paletas OKLCH para DaisyUI." },
                    { title: "Dropzone Enterprise", category: "Componentes", rating: "4.8 ★", downloads: "3.1k", desc: "Upload assíncrono com suporte a S3 e progresso detalhado." }
                  ].map((item) => (
                    <div key={item.title} className="card card-elevated p-6 space-y-4 border border-base-300">
                      <div className="flex justify-between items-center text-xs">
                        <span className="badge badge-secondary badge-sm font-semibold">{item.category}</span>
                        <span className="font-bold opacity-80">{item.rating}</span>
                      </div>
                      <h3 className="font-bold text-base">{item.title}</h3>
                      <p className="text-xs opacity-70">{item.desc}</p>
                      <div className="pt-3 border-t border-base-200 flex items-center justify-between">
                        <span className="text-xs opacity-50 font-mono">📥 {item.downloads}</span>
                        <button
                          onClick={() => addToast("info", item.title, "Visualizador de template carregado.")}
                          className="btn btn-xs btn-outline btn-primary font-semibold cursor-pointer"
                        >
                          Explorar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Visão: Portfólio */}
            {activeSection === "portfolio" && (
              <section className="space-y-6">
                <div className="card card-spotlight p-6 sm:p-8 border border-base-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <span className="badge badge-accent font-bold text-xs mb-2">Portfólio Ativo</span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Eduardo Augusto — Desenvolvedor Fullstack</h2>
                    <p className="text-sm opacity-75 mt-1 max-w-xl">
                      Especialista em React, Next.js, TypeScript e arquitetura de interfaces modernas com DaisyUI e Tailwind CSS.
                    </p>
                  </div>
                  <button
                    onClick={() => addToast("success", "Portfólio Compartilhado", "Link público copiado para a área de transferência.")}
                    className="btn btn-accent btn-sm sm:btn-md font-bold cursor-pointer"
                  >
                    🔗 Copiar Link Público
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="card card-elevated p-6 border border-base-300 space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2"><span>🎯</span> Principais Especialidades</h3>
                    <ul className="text-sm space-y-2 opacity-80">
                      <li className="flex items-center gap-2">✅ Design Systems escaláveis e componentes atômicos reutilizáveis</li>
                      <li className="flex items-center gap-2">✅ Otimização de Performance (Core Web Vitals e LCP &lt; 1.5s)</li>
                      <li className="flex items-center gap-2">✅ Aplicações responsivas com suporte a temas dinâmicos (DaisyUI v5)</li>
                    </ul>
                  </div>
                  <div className="card card-elevated p-6 border border-base-300 space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2"><span>📊</span> Métricas de Entregas</h3>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-base-200/60 rounded-xl border border-base-300">
                        <div className="text-2xl font-black text-primary">13+</div>
                        <div className="text-xs opacity-65 mt-0.5">Componentes Criados</div>
                      </div>
                      <div className="p-3 bg-base-200/60 rounded-xl border border-base-300">
                        <div className="text-2xl font-black text-secondary">30+</div>
                        <div className="text-xs opacity-65 mt-0.5">Temas Suportados</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Visão: Conquistas */}
            {activeSection === "conquistas" && (
              <section className="space-y-6">
                <div className="border-b border-base-300 pb-5">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                      <span>🏆</span> Conquistas & Marcos
                    </h2>
                    <span className="badge badge-accent font-bold">8 / 12 Desbloqueadas</span>
                  </div>
                  <p className="text-sm opacity-70 mt-1">
                    Acompanhe seus marcos de produtividade, arquitetura e qualidade de código.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Mestre dos Componentes", icon: "🧩", status: "Desbloqueada", date: "Hoje", desc: "Configurou 13 componentes de alta qualidade." },
                    { title: "Velocidade Extrema", icon: "⚡", status: "Desbloqueada", date: "Ontem", desc: "Obteve pontuação 99 no Lighthouse Performance." },
                    { title: "Poliglota Visual", icon: "🎨", status: "Desbloqueada", date: "Esta semana", desc: "Implementou suporte dinâmico a múltiplos temas DaisyUI." },
                    { title: "Acessibilidade 100%", icon: "🛡️", status: "Desbloqueada", date: "Esta semana", desc: "Estrutura semântica e suporte a teclado completo." },
                    { title: "Dropzone Master", icon: "📂", status: "Desbloqueada", date: "Semana passada", desc: "Suporte a múltiplos arquivos com validação." },
                    { title: "Auditoria Segura", icon: "🔒", status: "Desbloqueada", date: "Semana passada", desc: "Logs de transações com modal de inspeção." },
                    { title: "Navegação Perfeita", icon: "🧭", status: "Desbloqueada", date: "Hoje", desc: "Menu SideNav com suporte a rotas e abas SPA." },
                    { title: "Poder Reativo", icon: "⚛️", status: "Desbloqueada", date: "Hoje", desc: "Uso pleno de React 19 e Next.js 16." },
                    { title: "Deploy Master", icon: "🚀", status: "Bloqueada", date: "Pendente", desc: "Realizar o primeiro deploy em ambiente de produção." },
                    { title: "Colaborador Elite", icon: "👥", status: "Bloqueada", date: "Pendente", desc: "Compartilhar componentes com mais de 5 times." }
                  ].map((badge) => (
                    <div
                      key={badge.title}
                      className={`card card-elevated p-5 border space-y-3 ${
                        badge.status === "Desbloqueada" ? "border-primary/40 bg-base-100" : "border-base-300 opacity-50 bg-base-200/30"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-3xl">{badge.icon}</span>
                        <span className={`badge badge-xs font-bold ${badge.status === "Desbloqueada" ? "badge-success" : "badge-ghost"}`}>
                          {badge.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm">{badge.title}</h4>
                        <p className="text-xs opacity-70 mt-1">{badge.desc}</p>
                      </div>
                      <div className="text-[10px] opacity-50 pt-2 border-t border-base-200 font-mono">
                        {badge.date}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Visão: Aprendizado */}
            {activeSection === "aprendizado" && (
              <section className="space-y-6">
                <div className="border-b border-base-300 pb-5">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
                    <span>🎓</span> Trilhas de Aprendizado
                  </h2>
                  <p className="text-sm opacity-70 mt-1">
                    Capacitação técnica contínua nos padrões modernos do ecossistema Frontend.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { title: "Next.js 16 & Server Actions", hours: "6h de conteúdo", progress: 85, modules: "12/14 aulas concluídas", level: "Avançado" },
                    { title: "DaisyUI v5 + Tailwind CSS v4", hours: "4h de conteúdo", progress: 100, modules: "Todas as aulas concluídas", level: "Intermediário" },
                    { title: "Arquitetura de Design System", hours: "8h de conteúdo", progress: 60, modules: "6/10 aulas concluídas", level: "Avançado" },
                    { title: "Acessibilidade Web & WCAG 2.2", hours: "5h de conteúdo", progress: 45, modules: "4/9 aulas concluídas", level: "Essencial" }
                  ].map((course) => (
                    <div key={course.title} className="card card-elevated p-6 space-y-4 border border-base-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-base">{course.title}</h3>
                          <p className="text-xs opacity-65 mt-0.5">{course.hours} • Nível {course.level}</p>
                        </div>
                        <span className="badge badge-primary badge-sm font-semibold">{course.progress}%</span>
                      </div>
                      <progress className="progress progress-primary w-full" value={course.progress} max="100" />
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-base-200">
                        <span className="opacity-70">{course.modules}</span>
                        <button
                          onClick={() => addToast("info", course.title, "Continuando reprodução do curso...")}
                          className="btn btn-xs btn-outline btn-primary font-bold cursor-pointer"
                        >
                          Continuar Trilha
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Módulos Específicos dos Componentes Originais */}
            {activeSection === "stats" && <StatsShowcase />}
            {activeSection === "profile" && <ProfileShowcase />}
            {activeSection === "upload" && <UploadShowcase />}
            {activeSection === "pricing" && <PricingShowcase />}
            {activeSection === "table" && <TableShowcase />}
            {activeSection === "stepper" && <StepperShowcase />}
            {activeSection === "charts" && <ChartsShowcase />}
            {activeSection === "faq" && <FAQShowcase />}
            {activeSection === "notifications" && <NotificationsShowcase />}
            {activeSection === "product-card" && <ProductCardShowcase />}
            {activeSection === "evervault" && <EvervaultShowcase />}
            {activeSection === "pointer-highlight" && <PointerHighlightShowcase />}
            {activeSection === "side-nav" && <SideNavShowcase />}
            {activeSection === "resizable-navbar" && <ResizableNavbarShowcase />}
            {activeSection === "merchant-catalog" && <MerchantCatalogShowcase />}
            {activeSection === "webgl-shader" && <WebGLShaderShowcase />}
            {activeSection === "border-beam" && <BorderBeamShowcase />}
            {activeSection === "spotlight-shimmer" && <SpotlightShimmerShowcase />}
            {activeSection === "meteors-marquee" && <MeteorsMarqueeShowcase />}
            {activeSection === "project-cards" && <ProjectCardsShowcase />}
            {activeSection === "marketing-activities" && <MarketingActivitiesShowcase />}
            {activeSection === "horizon-hero" && <HorizonHeroShowcase />}
            {activeSection === "quordix-hero" && <QuordixHeroShowcase />}
            {activeSection === "be-ui-expandable-tabs" && <ExpandableTabsShowcase />}
            {activeSection === "neon-buttons" && <NeonButtonsShowcase />}
          </main>

          {/* Footer */}
          <footer className="border-t border-base-300 py-6 px-4 text-center text-xs opacity-60">
            Painel de Gestão Integrado — TechSolution • Front Ref Components
          </footer>
        </div>
      </div>

      {/* Modal de Detalhes da Transação */}
      {selectedTxDetail && (
        <dialog id="transaction-modal" className="modal modal-open" aria-labelledby="modal-title">
          <div className="modal-box card-elevated" style={{ background: "var(--color-base-100)", border: "1px solid var(--color-base-300)" }}>
            <h3 id="modal-title" className="font-bold text-lg text-base-content flex items-center gap-2">
              <span>🔍</span> Detalhes da Operação: {selectedTxDetail}
            </h3>
            <p className="py-4 text-sm opacity-80">
              Esta é uma visualização detalhada da transação <span className="font-mono font-bold text-primary">{selectedTxDetail}</span>, incluindo metadados de pagamento, hash criptográfico e log de aprovação.
            </p>
            <div className="bg-base-200 p-3 rounded-lg text-xs font-mono mb-4 border border-base-300 space-y-1">
              <div>STATUS: <span className="text-success font-bold">APROVADO</span></div>
              <div>ORIGEM: GATEWAY_PAGAMENTO_V2</div>
              <div>GATEWAY_ID: 88f7b20e-c6a9-4081-a9f8</div>
            </div>
            <div className="modal-action">
              <button
                id="modal-close-btn"
                onClick={() => setSelectedTxDetail(null)}
                className="btn btn-sm btn-primary font-bold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/60" onClick={() => setSelectedTxDetail(null)} />
        </dialog>
      )}
    </div>
  );
}

