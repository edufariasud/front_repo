"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function StepperShowcase() {
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [receiveNews, setReceiveNews] = useState(true);
  const [profileType, setProfileType] = useState("Desenvolvedor");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setUsername("");
    setEmail("");
    setReceiveNews(true);
    setProfileType("Desenvolvedor");
    setCurrentStep(1);
  };

  // Basic step validation
  const isStep1Valid = username.trim().length >= 3 && email.includes("@");

  const getLineFillWidth = () => {
    if (currentStep === 1) return "0%";
    if (currentStep === 2) return "50%";
    return "100%";
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
              <h1 className="text-3xl font-extrabold tracking-tight">🗺️ Stepper Wizard</h1>
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

        {/* Wizard Main Area */}
        <div className={styles.wizardWrapper}>
          {/* Progress Tracker Nodes */}
          <div className={styles.stepperHeader}>
            <div className={styles.stepperLine}>
              <div className={styles.stepperLineFill} style={{ width: getLineFillWidth() }}></div>
            </div>

            {/* Node 1 */}
            <div
              className={`${styles.stepNode} ${
                currentStep === 1 ? styles.active : currentStep > 1 ? styles.completed : ""
              }`}
            >
              {currentStep > 1 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                "1"
              )}
            </div>

            {/* Node 2 */}
            <div
              className={`${styles.stepNode} ${
                currentStep === 2 ? styles.active : currentStep > 2 ? styles.completed : ""
              }`}
            >
              {currentStep > 2 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                "2"
              )}
            </div>

            {/* Node 3 */}
            <div
              className={`${styles.stepNode} ${currentStep === 3 ? styles.active : ""}`}
            >
              3
            </div>
          </div>

          {/* Form Interactive Card */}
          <div className={styles.wizardCard}>
            {/* Step 1: Account Setup */}
            {currentStep === 1 && (
              <div className={styles.formContent}>
                <div>
                  <h3 className={styles.stepTitle}>Crie sua conta</h3>
                  <p className={styles.stepDescription}>Insira seus dados iniciais de perfil.</p>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nome de usuário</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: edusantos"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full input-sm"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">E-mail corporativo</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Ex: edu@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full input-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Settings Configuration */}
            {currentStep === 2 && (
              <div className={styles.formContent}>
                <div>
                  <h3 className={styles.stepTitle}>Preferências</h3>
                  <p className={styles.stepDescription}>Ajuste suas permissões do showcase.</p>
                </div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Tipo de Perfil</span>
                  </label>
                  <select
                    value={profileType}
                    onChange={(e) => setProfileType(e.target.value)}
                    className="select select-bordered select-sm w-full"
                  >
                    <option>Desenvolvedor</option>
                    <option>Product Manager</option>
                    <option>Design Especialista</option>
                  </select>
                </div>

                <div className="form-control flex-row items-center justify-between mt-4">
                  <span className="label-text">Receber alertas de compilação</span>
                  <input
                    type="checkbox"
                    checked={receiveNews}
                    onChange={(e) => setReceiveNews(e.target.checked)}
                    className="toggle toggle-primary toggle-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Success Screen */}
            {currentStep === 3 && (
              <div className={styles.formContent}>
                <div className={styles.successAnimation}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.successIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-xl font-bold">Perfil configurado!</h3>
                    <p className="text-sm opacity-70 mt-1">Sua conta foi criada no banco simulado local com sucesso.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className={styles.actions}>
              {currentStep < 3 ? (
                <>
                  <button
                    onClick={handleBack}
                    className="btn btn-outline btn-sm"
                    disabled={currentStep === 1}
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleNext}
                    className="btn btn-primary btn-sm"
                    disabled={currentStep === 1 && !isStep1Valid}
                  >
                    Avançar
                  </button>
                </>
              ) : (
                <button onClick={handleReset} className="btn btn-primary btn-sm w-full">
                  Configurar Outro Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
