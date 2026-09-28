"use client";

import React, { useState } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import { ProjectProgressCard, CardColorScheme, ProjectMember } from "@/components/ui/ProjectProgressCard";

interface ProjectItem {
  id: string;
  date: string;
  title: string;
  category: string;
  progress: number;
  timeLeft: string;
  colorScheme: CardColorScheme;
  members: ProjectMember[];
}

const initialProjects: ProjectItem[] = [
  {
    id: "1",
    date: "Feb 2, 2021",
    title: "Web Designing",
    category: "Prototyping",
    progress: 90,
    timeLeft: "2 days left",
    colorScheme: "teal",
    members: [
      { name: "Ana Lima", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
      { name: "Lucas Rocha", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: "2",
    date: "Feb 05, 2021",
    title: "Mobile App",
    category: "Shopping",
    progress: 30,
    timeLeft: "3 weeks left",
    colorScheme: "amber",
    members: [
      { name: "Carlos Eduardo", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
      { name: "Mariana Dias", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: "3",
    date: "March 03, 2021",
    title: "Dashboard",
    category: "Medical",
    progress: 50,
    timeLeft: "3 weeks left",
    colorScheme: "rose",
    members: [
      { name: "Rafael Costa", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
      { name: "Beatriz Santos", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
    ],
  },
  {
    id: "4",
    date: "March 08, 2021",
    title: "Web Designing",
    category: "Wireframing",
    progress: 20,
    timeLeft: "3 weeks left",
    colorScheme: "blue",
    members: [
      { name: "Gabriel Souza", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face" },
      { name: "Fernanda Alves", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
    ],
  },
];

export default function ProjectCardsShowcase() {
  const [activeTab, setActiveTab] = useState<"showcase" | "interactive" | "code">("showcase");
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados para o gerador interativo
  const [newTitle, setNewTitle] = useState("AI Design System");
  const [newCategory, setNewCategory] = useState("Architecture");
  const [newProgress, setNewProgress] = useState(75);
  const [newTimeLeft, setNewTimeLeft] = useState("5 days left");
  const [newColorScheme, setNewColorScheme] = useState<CardColorScheme>("purple");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddMember = (projectTitle: string) => {
    showToast(`Convidar novo colaborador para "${projectTitle}"`);
  };

  const handleMenuClick = (projectTitle: string) => {
    showToast(`Opções do projeto "${projectTitle}" abertas`);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-base-100 text-base-content overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="alert bg-base-200 border border-base-300 text-xs shadow-2xl text-white flex items-center gap-2">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Unificado */}
        <div className="p-4 sm:p-6 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShowcaseHeader
              title="Project Progress Cards"
              badge="Dark UI • Modern Dashboard"
              backHref="/"
            />

            {/* Abas */}
            <div className="join bg-base-200 p-0.5 rounded-xl border border-base-300 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("showcase")}
                className={`join-item btn btn-xs sm:btn-sm ${activeTab === "showcase" ? "btn-primary" : "btn-ghost"}`}
              >
                Cards da Referência
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

        {/* Conteúdo Principal */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
          {activeTab === "showcase" && (
            <div className="max-w-6xl mx-auto w-full space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                  <span>🎨</span>
                  <span>Inspiração Dribbble / Dark Glassmorphism</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Cards de Acompanhamento de Projetos
                </h2>
                <p className="text-sm text-white/60 max-w-2xl">
                  Cards escuros sofisticados com iluminação suave em degradê no canto superior direito, barra de progresso viva e pilha de avatares com botão de convite.
                </p>
              </div>

              {/* Matriz 2x2 perfeitamente distribuída sem espaço sobrando */}
              <div 
                className="grid grid-cols-2 gap-6 lg:gap-8 w-full"
                style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
              >
                {projects.map((project) => (
                  <ProjectProgressCard
                    key={project.id}
                    date={project.date}
                    title={project.title}
                    category={project.category}
                    progress={project.progress}
                    timeLeft={project.timeLeft}
                    colorScheme={project.colorScheme}
                    members={project.members}
                    onAddMember={() => handleAddMember(project.title)}
                    onMenuClick={() => handleMenuClick(project.title)}
                    onClick={() => showToast(`Selecionado: ${project.title} (${project.category})`)}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "interactive" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Painel de Configurações */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-base-200 border border-base-300 space-y-5">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span>🛠️</span>
                  <span>Criar Card Customizado</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block opacity-70 mb-1 font-semibold">Título do Projeto</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block opacity-70 mb-1 font-semibold">Categoria / Subtítulo</label>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between opacity-70 mb-1 font-semibold">
                      <span>Progresso</span>
                      <span className="text-primary font-mono">{newProgress}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={newProgress}
                      onChange={(e) => setNewProgress(Number(e.target.value))}
                      className="range range-xs range-primary"
                    />
                  </div>

                  <div>
                    <label className="block opacity-70 mb-1 font-semibold">Tempo Restante (Badge)</label>
                    <input
                      type="text"
                      value={newTimeLeft}
                      onChange={(e) => setNewTimeLeft(e.target.value)}
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block opacity-70 mb-2 font-semibold">Esquema de Cor Ambiente</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["teal", "amber", "rose", "blue", "purple", "emerald"] as CardColorScheme[]).map((scheme) => (
                        <button
                          key={scheme}
                          type="button"
                          onClick={() => setNewColorScheme(scheme)}
                          className={`btn btn-xs capitalize ${newColorScheme === scheme ? "btn-primary" : "btn-outline"}`}
                        >
                          {scheme}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Dinâmico do Card sem caixas artificiais */}
              <div className="lg:col-span-7 flex justify-center items-center py-4 w-full">
                <div className="w-full max-w-md">
                  <ProjectProgressCard
                    date="Hoje, 14:30"
                    title={newTitle}
                    category={newCategory}
                    progress={newProgress}
                    timeLeft={newTimeLeft}
                    colorScheme={newColorScheme}
                    members={[
                      { name: "Eduardo Silva", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" },
                      { name: "Larissa Melo", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
                    ]}
                    onAddMember={() => showToast("Membro adicionado ao preview")}
                    onMenuClick={() => showToast("Menu do preview aberto")}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-base-200 border border-base-300 space-y-4">
                <h3 className="font-bold text-lg">Como Usar no Seu Projeto</h3>
                <p className="text-xs opacity-75 leading-relaxed">
                  O componente <code className="text-primary font-mono">&lt;ProjectProgressCard /&gt;</code> é 100% responsivo, não depende de bibliotecas externas pesadas e suporta 6 esquemas de cores pré-definidos mais cores arbitrárias via <code className="text-primary font-mono">customColor</code>.
                </p>

                <div className="space-y-4">
                  <pre className="p-4 rounded-xl bg-black/40 text-xs font-mono overflow-x-auto text-white/90 border border-white/5">
{`import { ProjectProgressCard } from "@/components/ui/ProjectProgressCard";

export function DashboardProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectProgressCard
        date="Feb 2, 2021"
        title="Web Designing"
        category="Prototyping"
        progress={90}
        timeLeft="2 days left"
        colorScheme="teal" // "teal" | "amber" | "rose" | "blue" | "purple" | "emerald"
        members={[
          { name: "Ana Lima", avatarUrl: "/avatars/ana.jpg" },
          { name: "Lucas Rocha", avatarUrl: "/avatars/lucas.jpg" },
        ]}
        onAddMember={() => console.log("Adicionar membro")}
        onMenuClick={() => console.log("Abrir opções")}
      />
    </div>
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
