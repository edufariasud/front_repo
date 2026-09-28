"use client";

import React, { useState } from "react";
import ThemeSwitcher from "../dashboard/ThemeSwitcher";

interface LoginFormProps {
  onLoginSuccess: (user: { name: string; email: string; role: string; avatarUrl: string }) => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

// Perfis de demonstração Google Workspace para teste rápido
const GOOGLE_ACCOUNTS = [
  {
    name: "Eduardo Silva",
    email: "eduardo.silva@frontref.dev",
    role: "Tech Lead & Arquiteto",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    badge: "Administrador"
  },
  {
    name: "Mariana Lemos",
    email: "mariana.lemos@empresa.com.br",
    role: "Gerente de E-commerce",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    badge: "Lojista Master"
  }
];

export default function LoginForm({
  onLoginSuccess,
  currentTheme,
  onThemeChange
}: LoginFormProps) {
  const [selectedAccount, setSelectedAccount] = useState(GOOGLE_ACCOUNTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [authStep, setAuthStep] = useState<string>("");

  const handleGoogleSignIn = (account = selectedAccount) => {
    setIsLoading(true);
    setAuthStep("Conectando ao Google Identity...");

    setTimeout(() => {
      setAuthStep("Autenticando via OAuth 2.0...");
    }, 500);

    setTimeout(() => {
      setAuthStep("Sessão corporativa autorizada!");
    }, 1000);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: account.name,
        email: account.email,
        role: account.role,
        avatarUrl: account.avatarUrl
      });
    }, 1400);
  };

  return (
    <div
      id="login-view-wrapper"
      className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden transition-colors duration-300 font-sans"
      style={{
        background: "var(--color-base-100)",
        color: "var(--color-base-content)"
      }}
    >
      {/* Background Decorativo Moderno com Grid & Ambient Glows */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, transparent 65%),
            radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--color-secondary) 15%, transparent) 0%, transparent 55%),
            radial-gradient(circle at 0% 100%, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 50%),
            linear-gradient(to right, color-mix(in srgb, var(--color-base-content) 5%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--color-base-content) 5%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px"
        }}
      />

      {/* Header Superior */}
      <header className="flex items-center justify-between z-10 w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-black text-white shadow-lg shadow-primary/20">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-base-content">
                Front Ref <span className="text-primary">Studio</span>
              </span>
              <span className="badge badge-xs badge-neutral opacity-70 font-mono">v2.5</span>
            </div>
            <p className="text-xs opacity-50 hidden sm:block">Design System & Component Library</p>
          </div>
        </div>

        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
          compact
        />
      </header>

      {/* Card Central de Login */}
      <main className="flex items-center justify-center py-10 z-10 w-full">
        <div className="w-full max-w-lg">
          <div
            id="login-card-container"
            className="card shadow-2xl p-7 sm:p-10 relative transition-all duration-300 rounded-3xl border border-base-300 backdrop-blur-xl"
            style={{
              background: "color-mix(in srgb, var(--color-base-200) 90%, transparent)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent)"
            }}
          >
            {/* Status Pill Superior */}
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-base-300/80 border border-base-content/10 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="opacity-90">SSO Corporativo Google Ativo</span>
              </div>
            </div>

            {/* Cabeçalho do Card */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2.5">
                Bem-vindo ao <span className="text-gradient-white">Front Ref</span>
              </h1>
              <p className="text-sm opacity-75 max-w-sm mx-auto leading-relaxed">
                Acesse o ambiente unificado com autenticação social segura via <strong className="opacity-100 font-semibold">Google Workspace</strong>.
              </p>
            </div>

            {/* Botão Principal de Login Social com Google */}
            <div className="space-y-4">
              <button
                id="btn-google-login-main"
                type="button"
                disabled={isLoading}
                onClick={() => handleGoogleSignIn(selectedAccount)}
                className="btn btn-outline w-full h-14 rounded-2xl flex items-center justify-center gap-3.5 text-base font-bold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] border-2 shadow-lg hover:shadow-xl cursor-pointer"
                style={{
                  background: "var(--color-base-100)",
                  borderColor: "var(--color-base-300)",
                  color: "var(--color-base-content)"
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <span className="loading loading-spinner loading-md text-primary" />
                    <span className="text-sm font-semibold tracking-wide animate-pulse">
                      {authStep}
                    </span>
                  </div>
                ) : (
                  <>
                    {/* SVG Oficial de 4 Cores do Google */}
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continuar com o Google</span>
                  </>
                )}
              </button>

              {/* Seletor Rápido de Perfil Simulado */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                    Ou selecione uma conta de teste:
                  </span>
                  <span className="text-[11px] opacity-40">OAuth Sandbox</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {GOOGLE_ACCOUNTS.map((account) => {
                    const isSelected = selectedAccount.email === account.email;
                    return (
                      <button
                        key={account.email}
                        type="button"
                        onClick={() => {
                          setSelectedAccount(account);
                          handleGoogleSignIn(account);
                        }}
                        disabled={isLoading}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-base-300 hover:border-base-content/20 bg-base-100/50 hover:bg-base-100"
                        }`}
                      >
                        <img
                          src={account.avatarUrl}
                          alt={account.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-base-300"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold truncate leading-tight">
                            {account.name}
                          </p>
                          <p className="text-[11px] opacity-60 truncate">
                            {account.role}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selos de Segurança e Auditoria */}
            <div className="mt-8 pt-5 border-t border-base-300/80">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-base-100/40">
                  <span className="text-base">🔒</span>
                  <span className="text-[10px] font-bold uppercase opacity-75">OAuth 2.0</span>
                  <span className="text-[9px] opacity-40">Criptografado</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-base-100/40">
                  <span className="text-base">🛡️</span>
                  <span className="text-[10px] font-bold uppercase opacity-75">Zero Senhas</span>
                  <span className="text-[9px] opacity-40">Sem vazamentos</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-base-100/40">
                  <span className="text-base">⚡</span>
                  <span className="text-[10px] font-bold uppercase opacity-75">1 Clique</span>
                  <span className="text-[9px] opacity-40">Acesso Imediato</span>
                </div>
              </div>
            </div>

            {/* Rodapé Interno com Termos */}
            <div className="mt-6 text-center">
              <p className="text-[11px] opacity-50 leading-relaxed">
                Ao continuar, você concorda com nossos{" "}
                <a href="#termos" onClick={(e) => e.preventDefault()} className="underline hover:text-primary">
                  Termos de Serviço
                </a>{" "}
                e reconhece a aplicação das políticas de segurança institucional.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé Global da Página */}
      <footer className="text-center text-xs opacity-50 py-3 z-10 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-2 border-t border-base-content/5">
        <span>Front Ref Studio © 2026 — Plataforma de Engenharia de Interface</span>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Google Identity API: Online
          </span>
          <span>Privacidade</span>
          <span>Segurança</span>
        </div>
      </footer>
    </div>
  );
}
