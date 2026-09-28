"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  isHiding?: boolean;
}

export default function NotificationsShowcase() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const triggerToast = (type: "success" | "error" | "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    
    let title = "Notificação";
    let message = "Esta é uma mensagem informativa sutil.";

    if (type === "success") {
      title = "Sucesso!";
      message = "Operação concluída com sucesso no banco local.";
    } else if (type === "error") {
      title = "Erro Detectado";
      message = "Falha ao conectar com o serviço de sincronização.";
    } else if (type === "info") {
      title = "Informação";
      message = "Atualizações pendentes prontas para compilação.";
    }

    const newToast: Toast = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    // Slide out after 3.7s, remove completely after 4s
    setTimeout(() => {
      hideToast(id);
    }, 3700);
  };

  const hideToast = (id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isHiding: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
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
              <h1 className="text-3xl font-extrabold tracking-tight">🔔 Toasts Glow</h1>
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

        {/* Action Panel */}
        <div className={styles.triggerPanel}>
          <div>
            <h3 className="text-lg font-bold">Simulador de Notificações</h3>
            <p className="text-sm opacity-70">Clique abaixo para empilhar novos alertas flutuantes no canto inferior direito da tela.</p>
          </div>

          <div className={styles.buttonGrid}>
            <button onClick={() => triggerToast("success")} className="btn btn-success btn-sm">
              Sucesso
            </button>
            <button onClick={() => triggerToast("error")} className="btn btn-error btn-sm">
              Erro
            </button>
            <button onClick={() => triggerToast("info")} className="btn btn-primary btn-sm">
              Informativo
            </button>
          </div>
        </div>

        {/* Floating Toasts Area */}
        <div className={styles.toastArea}>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`${styles.toastCard} ${styles[toast.type]} ${toast.isHiding ? styles.hiding : ""}`}
            >
              {/* Type Icons */}
              {toast.type === "success" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={styles.icon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {toast.type === "error" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={styles.icon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
              {toast.type === "info" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={styles.icon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.085 1.085l-.04.04m-2.137.082a.75.75 0 111.085-1.083l.04.039m1.013-1.425a3 3 0 11-6 0 3 3 0 016 0zm-3 11.5a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              )}

              <div className={styles.content}>
                <div className={styles.title}>{toast.title}</div>
                <div className={styles.message}>{toast.message}</div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => hideToast(toast.id)}
                className={styles.closeButton}
                title="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Diminishing Progress Bar */}
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
