"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ChartDataPoint {
  label: string;
  value: number;
  x: number;
  y: number;
}

export default function ChartsShowcase() {
  const [activePoint, setActivePoint] = useState<ChartDataPoint | null>(null);
  const [radialProgress, setRadialProgress] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);

    // Animate radial progress on mount
    const timer = setTimeout(() => {
      setRadialProgress(78);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Line Chart Data
  // Coordinate bounds: Width=500, Height=200
  // Values ranges: 0 - 100
  const linePoints: ChartDataPoint[] = [
    { label: "Jan", value: 30, x: 40, y: 140 },
    { label: "Fev", value: 45, x: 120, y: 110 },
    { label: "Mar", value: 35, x: 200, y: 130 },
    { label: "Abr", value: 65, x: 280, y: 70 },
    { label: "Mai", value: 55, x: 360, y: 90 },
    { label: "Jun", value: 85, x: 440, y: 30 }
  ];

  // Generate SVG path string from points
  const pathD = `M ${linePoints.map(p => `${p.x} ${p.y}`).join(" L ")}`;
  // Generate Area path under the line
  const areaD = `${pathD} L ${linePoints[linePoints.length - 1].x} 170 L ${linePoints[0].x} 170 Z`;

  // Bar Chart Data
  const barData = [
    { label: "Seg", value: 120, x: 40, height: 100 },
    { label: "Ter", value: 160, x: 110, height: 130 },
    { label: "Qua", value: 90, x: 180, height: 75 },
    { label: "Qui", value: 200, x: 250, height: 160 },
    { label: "Sex", value: 145, x: 320, height: 115 },
    { label: "Sáb", value: 70, x: 390, height: 55 },
    { label: "Dom", value: 50, x: 460, height: 40 }
  ];

  // Radial Circle Calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius; // ~376.99
  const offset = circumference - (radialProgress / 100) * circumference;

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
              <h1 className="text-3xl font-extrabold tracking-tight">📊 Gráficos SVG Interativos</h1>
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

        {/* Charts Grid */}
        <div className={styles.grid}>
          {/* Card 1: Line Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>
              <span>Vendas Mensais (Linha SVG)</span>
              {activePoint ? (
                <span className="text-sm font-bold text-primary">
                  {activePoint.label}: {activePoint.value} un
                </span>
              ) : (
                <span className="text-xs opacity-50">Passe o mouse nos pontos</span>
              )}
            </div>

            <div className={styles.svgContainer}>
              <svg className={styles.svgElement} viewBox="0 0 500 200">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="40" y1="30" x2="460" y2="30" className={styles.gridLine} />
                <line x1="40" y1="100" x2="460" y2="100" className={styles.gridLine} />
                <line x1="40" y1="170" x2="460" y2="170" className={styles.gridLine} />

                {/* Gradient Area under line */}
                <path d={areaD} className={styles.chartArea} />

                {/* Main line path */}
                <path d={pathD} className={styles.chartLine} />

                {/* Data point dots */}
                {linePoints.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    className={styles.chartDot}
                    onMouseEnter={() => setActivePoint(point)}
                    onMouseLeave={() => setActivePoint(null)}
                  />
                ))}

                {/* X Axis Labels */}
                {linePoints.map((point, index) => (
                  <text
                    key={index}
                    x={point.x}
                    y="192"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="11"
                    fontWeight="600"
                    opacity="0.6"
                  >
                    {point.label}
                  </text>
                ))}
              </svg>
            </div>
            
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.dotPrimary}></span>
                <span>Produtos Vendidos</span>
              </div>
            </div>
          </div>

          {/* Card 2: Bar Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>
              <span>Acessos Semanais (Barras SVG)</span>
              <span className="text-xs opacity-50">Barras animadas</span>
            </div>

            <div className={styles.svgContainer}>
              <svg className={styles.svgElement} viewBox="0 0 500 200">
                {/* Horizontal grid lines */}
                <line x1="30" y1="30" x2="480" y2="30" className={styles.gridLine} />
                <line x1="30" y1="100" x2="480" y2="100" className={styles.gridLine} />
                <line x1="30" y1="170" x2="480" y2="170" className={styles.gridLine} />

                {/* Bars */}
                {barData.map((bar, index) => (
                  <rect
                    key={index}
                    x={bar.x}
                    y={170 - bar.height}
                    width="26"
                    height={bar.height}
                    className={styles.chartBar}
                  />
                ))}

                {/* X Axis Labels */}
                {barData.map((bar, index) => (
                  <text
                    key={index}
                    x={bar.x + 13}
                    y="190"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="10"
                    fontWeight="600"
                    opacity="0.6"
                  >
                    {bar.label}
                  </text>
                ))}
              </svg>
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.dotAccent}></span>
                <span>Visualizações</span>
              </div>
            </div>
          </div>

          {/* Card 3: Radial Progress Chart */}
          <div className={styles.chartCard} style={{ gridColumn: "1 / -1", maxWidth: "500px", margin: "0 auto", width: "100%" }}>
            <div className={styles.chartTitle}>
              <span>Status de Armazenamento</span>
            </div>

            <div className={styles.radialWrapper}>
              <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                {/* Background Ring */}
                <circle cx="70" cy="70" r={radius} className={styles.circleBg} />
                
                {/* Foreground Fill Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  className={styles.circleFill}
                  stroke="var(--color-primary)"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>

              <div className={styles.radialText}>
                {radialProgress}%
                <span>Ocupado</span>
              </div>
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.dotPrimary}></span>
                <span>Memória Interna</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
