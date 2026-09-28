"use client";

import { useState, useEffect } from "react";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import styles from "./styles.module.scss";

type TabName = "sobre" | "skills" | "contato";

export default function ProfileShowcase() {
  const [activeTab, setActiveTab] = useState<TabName>("sobre");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <main className="min-h-screen p-0 sm:p-8" style={{ background: "var(--color-base-100)", color: "var(--color-base-content)", transition: "background-color 0.2s ease, color 0.2s ease" }}>
      <div className={styles.container}>
        {/* Header */}
        <ShowcaseHeader
          title="📇 Profile Card Premium"
          badge="Showcase"
          backHref="/"
          theme={theme}
          onThemeChange={changeTheme}
          className="max-w-[600px]"
        />

        {/* Profile Card Wrapper */}
        <div className={styles.cardWrapper}>
          <div className={styles.profileCard}>
            {/* Avatar Container */}
            <div className={styles.avatarContainer}>
              <div className={styles.avatarRing}></div>
              {/* Fallback to inline SVG developer avatar instead of external image */}
              <div className={`${styles.avatarImage} bg-neutral flex items-center justify-center overflow-hidden`}>
                <svg viewBox="0 0 100 100" className="w-full h-full text-primary" style={{ fill: "currentColor" }}>
                  <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="100%" stopColor="var(--color-secondary)" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50" fill="var(--color-neutral)" />
                  {/* Portrait features */}
                  <circle cx="50" cy="40" r="20" fill="url(#avatarGrad)" />
                  <path d="M22 80 C22 62, 78 62, 78 80 L78 90 L22 90 Z" fill="url(#avatarGrad)" opacity="0.85" />
                  {/* Glowing developer glasses */}
                  <rect x="36" y="36" width="12" height="6" rx="2" fill="var(--color-base-100)" />
                  <rect x="52" y="36" width="12" height="6" rx="2" fill="var(--color-base-100)" />
                  <rect x="48" y="38" width="4" height="2" fill="var(--color-base-100)" />
                </svg>
              </div>
              <div className={styles.statusIndicator} title="Disponível para Projetos"></div>
            </div>

            {/* User Info */}
            <h2 className={styles.name}>Eduardo Santos</h2>
            <div className={styles.title}>Senior Fullstack Engineer</div>

            {/* Navigation Tabs inside Card */}
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === "sobre" ? styles.active : ""}`}
                onClick={() => setActiveTab("sobre")}
              >
                Sobre
              </button>
              <button
                className={`${styles.tab} ${activeTab === "skills" ? styles.active : ""}`}
                onClick={() => setActiveTab("skills")}
              >
                Habilidades
              </button>
              <button
                className={`${styles.tab} ${activeTab === "contato" ? styles.active : ""}`}
                onClick={() => setActiveTab("contato")}
              >
                Contato
              </button>
            </div>

            {/* Interactive Tab Content */}
            <div className={styles.tabContent}>
              {activeTab === "sobre" && (
                <p className={styles.bioText}>
                  Desenvolvedor focado em interfaces elegantes e de alta performance. Especialista em Next.js, React e arquitetura CSS escalável para WebViews de aplicativos nativos.
                </p>
              )}

              {activeTab === "skills" && (
                <div className={styles.skillsContainer}>
                  <span className={styles.skillBadge}>React</span>
                  <span className={`${styles.skillBadge} ${styles.secondary}`}>Next.js</span>
                  <span className={`${styles.skillBadge} ${styles.accent}`}>SCSS</span>
                  <span className={styles.skillBadge}>Tailwind</span>
                  <span className={`${styles.skillBadge} ${styles.secondary}`}>TypeScript</span>
                  <span className={`${styles.skillBadge} ${styles.accent}`}>Kotlin</span>
                </div>
              )}

              {activeTab === "contato" && (
                <div className={styles.socialContainer}>
                  <a href="#" className={styles.socialButton} aria-label="GitHub">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.socialButton} aria-label="LinkedIn">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.socialButton} aria-label="Email">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Action button */}
            <button className="btn btn-primary btn-sm mt-6 w-full">
              Enviar Mensagem
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
