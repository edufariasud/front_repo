"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQShowcase() {
  const [openIds, setOpenIds] = useState<number[]>([1]);
  const [singleMode, setSingleMode] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "O que é esta biblioteca de componentes?",
      answer: "É um showcase de componentes refinados baseados no DaisyUI v5 e SCSS customizado. Ele foi projetado para oferecer alta performance em WebViews nativas do Android, com design moderno, arredondamento pílula consistente e suporte a temas nativos sem JIT delay."
    },
    {
      id: 2,
      question: "Como o arredondamento pílula é forçado em todos os temas?",
      answer: "Nós sobrescrevemos as variáveis CSS do DaisyUI (`--radius-field`, `--radius-box`, etc.) utilizando a diretiva `!important` na raiz do nosso arquivo de estilos global. Isso garante que, independentemente do tema ativo (dark, luxury, bumblebee), os botões, campos e cards sigam o padrão visual arredondado."
    },
    {
      id: 3,
      question: "Como posso remover um componente que não desejo usar?",
      answer: "O projeto foi estruturado com modularidade total. Cada componente premium reside em sua própria pasta sob `src/app/components/` com seus próprios estilos locais encapsulados. Para remover um componente, basta deletar a pasta correspondente e retirar o respectivo link do dashboard principal."
    },
    {
      id: 4,
      question: "Os componentes carregam recursos externos da internet?",
      answer: "Não! Todos os estilos e componentes funcionam de forma 100% offline. As fontes são pré-baixadas e auto-hospedadas localmente pelo Next.js (`next/font`), e o CSS do DaisyUI é importado diretamente de arquivos locais dentro de `node_modules` no build do projeto."
    }
  ];

  const handleToggle = (id: number) => {
    if (singleMode) {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    } else {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((oId) => oId !== id) : [...prev, id]
      );
    }
  };

  return (
    <main className="min-h-screen p-0 sm:p-8" style={{ background: "var(--color-base-100)", color: "var(--color-base-content)", transition: "background-color 0.2s ease, color 0.2s ease" }}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className="flex items-center gap-4">
            <Link href="/" className={`btn btn-outline btn-sm ${styles.backButton}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: "1rem", height: "1rem" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Voltar
            </Link>
            <div>
              <div className="badge badge-primary badge-sm mb-1">Showcase</div>
              <h1 className="text-3xl font-extrabold tracking-tight">💬 FAQ / Accordion</h1>
            </div>
          </div>

          {/* Theme selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold opacity-70">Tema:</span>
            <select
              value={theme}
              onChange={(e) => changeTheme(e.target.value)}
              className="select select-bordered select-xs"
              style={{
                background: "var(--color-base-200)",
                color: "var(--color-base-content)",
                border: "1px solid var(--color-base-300)",
                borderRadius: "var(--radius-field, 0.375rem)",
              }}
            >
              {["dark", "light", "bumblebee", "synthwave", "forest", "luxury", "business", "night", "dim", "sunset", "abyss"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="flex items-center gap-2 mb-6 max-w-[650px] w-full justify-end">
          <span className="text-sm font-semibold opacity-80">Modo Accordion (Apenas um aberto):</span>
          <input
            type="checkbox"
            checked={singleMode}
            onChange={(e) => {
              setSingleMode(e.target.checked);
              if (e.target.checked && openIds.length > 1) {
                setOpenIds([openIds[0]]);
              }
            }}
            className="toggle toggle-primary toggle-sm"
          />
        </div>

        {/* FAQ Wrapper */}
        <div className={styles.faqWrapper}>
          {faqData.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`${styles.accordionItem} ${isOpen ? styles.active : ""}`}
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={styles.chevron}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Animated Height Container */}
                <div
                  className={styles.contentWrapper}
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                  }}
                >
                  <div className={styles.content}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
