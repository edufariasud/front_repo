"use client";

import React from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  const getTypeStyles = (type: ToastMessage["type"]) => {
    switch (type) {
      case "success":
        return {
          icon: "✅",
          borderColor: "var(--color-success, #22c55e)"
        };
      case "error":
        return {
          icon: "❌",
          borderColor: "var(--color-error, #ef4444)"
        };
      case "warning":
        return {
          icon: "⚠️",
          borderColor: "var(--color-warning, #f59e0b)"
        };
      default:
        return {
          icon: "ℹ️",
          borderColor: "var(--color-info, #3b82f6)"
        };
    }
  };

  return (
    <aside
      id="toast-notifications-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-label="Notificações do sistema"
    >
      {toasts.map((toast) => {
        const style = getTypeStyles(toast.type);
        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className="card card-elevated pointer-events-auto p-4 flex flex-row items-start gap-3 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
            style={{
              background: "var(--color-base-100)",
              borderLeft: `4px solid ${style.borderColor}`,
              border: "1px solid var(--color-base-300)"
            }}
          >
            <span className="text-xl shrink-0" role="img" aria-hidden="true">{style.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm leading-tight text-base-content">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs opacity-75 mt-1 leading-snug text-base-content">{toast.message}</p>
              )}
            </div>
            <button
              id={`toast-close-btn-${toast.id}`}
              onClick={() => onDismiss(toast.id)}
              className="btn btn-ghost btn-xs btn-circle opacity-60 hover:opacity-100 shrink-0"
              aria-label="Fechar notificação"
            >
              ✕
            </button>
          </div>
        );
      })}
    </aside>
  );
}
