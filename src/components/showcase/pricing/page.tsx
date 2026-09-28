"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ShowcaseHeader from "@/components/layout/ShowcaseHeader";
import styles from "./styles.module.scss";

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: { text: string; enabled: boolean }[];
  featured?: boolean;
  buttonText: string;
  badge?: string;
}

export default function PricingShowcase() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const plans: Plan[] = [
    {
      name: "Básico",
      monthlyPrice: 29,
      yearlyPrice: 24,
      description: "Ideal para desenvolvedores individuais testando ideias.",
      features: [
        { text: "Até 3 projetos ativos", enabled: true },
        { text: "Componentes básicos", enabled: true },
        { text: "Suporte comunitário", enabled: true },
        { text: "Exportação de código estático", enabled: false },
        { text: "Updates em tempo real", enabled: false }
      ],
      buttonText: "Começar Teste"
    },
    {
      name: "Pro",
      monthlyPrice: 79,
      yearlyPrice: 59,
      description: "Para equipes que precisam criar apps e dashboards robustos.",
      features: [
        { text: "Projetos ilimitados", enabled: true },
        { text: "Acesso a todos os componentes premium", enabled: true },
        { text: "Suporte prioritário 24/7", enabled: true },
        { text: "Exportação de código estático", enabled: true },
        { text: "Updates em tempo real", enabled: false }
      ],
      featured: true,
      badge: "Popular",
      buttonText: "Adquirir Pro"
    },
    {
      name: "Enterprise",
      monthlyPrice: 199,
      yearlyPrice: 149,
      description: "Solução sob medida para grandes corporações e sistemas WebView.",
      features: [
        { text: "Projetos ilimitados", enabled: true },
        { text: "Acesso a todos os componentes premium", enabled: true },
        { text: "Suporte dedicado com canal privado", enabled: true },
        { text: "Exportação de código estático", enabled: true },
        { text: "Updates em tempo real", enabled: true }
      ],
      buttonText: "Fale Conosco"
    }
  ];

  return (
    <main className="min-h-screen p-0 sm:p-8" style={{ background: "var(--color-base-100)", color: "var(--color-base-content)", transition: "background-color 0.2s ease, color 0.2s ease" }}>
      <div className={styles.container}>
        {/* Header */}
        <ShowcaseHeader
          title="💳 Tabela de Preços Premium"
          badge="Showcase"
          backHref="/"
          theme={theme}
          onThemeChange={changeTheme}
          className="max-w-[1000px]"
        />

        {/* Billing Toggle Switch */}
        <div className={styles.toggleContainer}>
          <span className={`${styles.toggleLabel} ${!isYearly ? styles.active : ""}`}>Mensal</span>
          <input
            type="checkbox"
            checked={isYearly}
            onChange={(e) => setIsYearly(e.target.checked)}
            className="toggle toggle-primary toggle-md"
          />
          <span className={`${styles.toggleLabel} ${isYearly ? styles.active : ""}`}>
            Anual <span className="badge badge-accent badge-sm font-bold scale-90">-25%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className={styles.grid}>
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const isSelected = selectedPlan === plan.name;
            
            return (
              <div
                key={plan.name}
                className={`${styles.pricingCard} ${plan.featured ? styles.featured : ""}`}
              >
                {/* Popular Badge */}
                {plan.featured && plan.badge && (
                  <span className={`badge badge-primary badge-sm ${styles.badge}`}>{plan.badge}</span>
                )}

                <h3 className={styles.planName}>{plan.name}</h3>
                
                <div className={styles.priceContainer}>
                  <span className={styles.currency}>R$</span>
                  <span className={styles.price}>{price}</span>
                  <span className={styles.period}>/mês</span>
                </div>

                <p className={styles.description}>{plan.description}</p>

                <div className={styles.divider}></div>

                {/* Features List */}
                <ul className={styles.featuresList}>
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`${styles.featureItem} ${!feature.enabled ? styles.disabled : ""}`}
                    >
                      {feature.enabled ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={styles.checkIcon}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={styles.crossIcon}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Selection Action Button */}
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`btn ${styles.selectButton} ${
                    plan.featured 
                      ? (isSelected ? "btn-secondary" : "btn-primary") 
                      : (isSelected ? "btn-primary" : "btn-outline")
                  }`}
                >
                  {isSelected ? "Selecionado" : plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
