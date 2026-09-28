"use client";

import { useState, useEffect } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import styles from "./styles.module.scss";

export default function StatsShowcase() {
  const [visits, setVisits] = useState(14820);
  const [sales, setSales] = useState(3240);
  const [performance, setPerformance] = useState(94);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleSimulate = () => {
    // Generate simulated metrics updates
    setVisits((prev) => prev + Math.floor(Math.random() * 450) + 50);
    setSales((prev) => prev + Math.floor(Math.random() * 15) + 2);
    setPerformance((prev) => {
      const delta = Math.floor(Math.random() * 7) - 3;
      return Math.max(50, Math.min(100, prev + delta));
    });
  };

  return (
    <main className="min-h-screen p-0 sm:p-8" style={{ background: "var(--color-base-100)", color: "var(--color-base-content)", transition: "background-color 0.2s ease, color 0.2s ease" }}>
      <div className={styles.container}>
        {/* Header */}
        <ShowcaseHeader
          title="📊 Stat Cards Premium"
          badge="Showcase"
          backHref="/"
          theme={theme}
          onThemeChange={changeTheme}
        />

        {/* Stats Showcase Grid */}
        <div className={styles.grid}>
          {/* Card 1: Visits */}
          <div className={styles.statCard}>
            <div className={styles.iconWrapper}>
              <div className={styles.glow}></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 18H9.75c-2.21 0-4.07-1.421-4.75-3.413M15 8.25a3 3 0 11-6 0 3 3 0 016 0zm-3 11.5a3 3 0 100-6 3 3 0 000 6zM9.75 15.75a.75.75 0 000-1.5H9a1.5 1.5 0 00-1.5 1.5v1.5a.75.75 0 001.5 0v-1.5h.75z" />
              </svg>
            </div>
            <div className={styles.info}>
              <span className={styles.label}>Visitas Únicas</span>
              <span className={styles.value}>{visits.toLocaleString()}</span>
            </div>
            <div className={styles.footer}>
              <span className={styles.trendUp}>+14.5%</span>
              <span className="opacity-60">desde ontem</span>
            </div>
          </div>

          {/* Card 2: Sales */}
          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.secondary}`}>
              <div className={styles.glow}></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h.007v.008H3.75V4.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3 10.25h.007v.008H3v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM4.5 18h15M5.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75A2.25 2.25 0 015.25 4.5z" />
              </svg>
            </div>
            <div className={styles.info}>
              <span className={styles.label}>Vendas Mensais</span>
              <span className={styles.value}>R$ {sales.toLocaleString()}</span>
            </div>
            <div className={styles.footer}>
              <span className={styles.trendUp}>+8.2%</span>
              <span className="opacity-60">neste mês</span>
            </div>
          </div>

          {/* Card 3: Performance */}
          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.accent}`}>
              <div className={styles.glow}></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div className={styles.info}>
              <span className={styles.label}>Performance de Carga</span>
              <span className={styles.value}>{performance}%</span>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${performance}%` }}></div>
              </div>
            </div>
            <div className={styles.footer}>
              <span className={performance >= 90 ? styles.trendUp : styles.trendDown}>
                {performance >= 90 ? "Excelente" : "Atenção"}
              </span>
              <span className="opacity-60">tempo de resposta local</span>
            </div>
          </div>
        </div>

        {/* Actions panel */}
        <div className={styles.controls}>
          <div>
            <h3 className="text-lg font-bold">Simulador Interativo</h3>
            <p className="text-sm opacity-70">Clique no botão para simular tráfego em tempo real no dashboard.</p>
          </div>
          <button onClick={handleSimulate} className="btn btn-primary">
            Simular Atividade
          </button>
        </div>
      </div>
    </main>
  );
}
