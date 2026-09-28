"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./quordix-hero.module.scss";

interface QuordixHeroProps {
  onBack?: () => void;
  backHref?: string;
  showNavbar?: boolean;
}

function QuordixLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 669 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || styles.logoSvg}
      role="img"
      aria-label="Quordix"
    >
      <path
        fill="currentColor"
        d="M392.152 86.976H370.136V136H352.6V72H367.064L370.136 77.248L379.224 72H392.152V86.976ZM419.823 71.36H436.591L445.679 76.608V42.56H463.215V136.64H448.751L445.679 131.392L436.591 136.64H419.823L404.975 128.064V79.936L419.823 71.36ZM445.679 121.664V86.336H422.511V121.664H445.679ZM500.011 72V136H482.475V72H500.011ZM481.835 60.096V42.56H500.651V60.096H481.835ZM511.545 136L534.841 103.36L512.313 72H531.385L543.929 90.048L556.473 72H575.545L552.889 103.36L576.313 136H557.497L543.929 116.8L530.361 136H511.545Z"
      />
      <path
        fill="currentColor"
        d="M28.8 63.12V123.28H62.72V63.12H28.8ZM46.592 138.64H25.728L10.88 130.064V56.336L25.728 47.76H65.792L80.64 56.336V130.064L65.792 138.64L80.256 163.6H60.672L46.592 138.64ZM101.1 130.064V74H118.636V123.664H140.524V74H158.06V138.64H143.596L140.524 133.392L131.436 138.64H115.948L101.1 130.064Z"
      />
      <path
        stroke="var(--color-primary, #f97316)"
        d="M237.18 47L188 92.7119L237.18 140"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke="var(--color-primary, #f97316)"
        d="M271 140L320.18 94.2881L271 47"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke="var(--color-primary, #f97316)"
        d="M602 128H661"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isMobile = false;

    const SPACING = 30;
    const BASE_R = 1.5;
    const HOVER_R = 110;
    const SCAN_DUR = 2500;
    const SCAN_PAUSE = 4000;

    class Particle {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      size = 0;
      constructor(w: number, h: number) {
        this.reset(w, h);
      }
      reset(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2.2;
      }
      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = "rgba(249, 115, 22, 0.2)";
        c.fill();
      }
    }

    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      particles.length = 0;
      const n = isMobile ? 12 : 36;
      for (let i = 0; i < n; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      const loopTime = performance.now() % (SCAN_DUR + SCAN_PAUSE);
      const scanY = isMobile
        ? (Math.min(loopTime / SCAN_DUR, 1)) * (canvas.height + HOVER_R * 2) - HOVER_R
        : 0;

      for (let x = 0; x < canvas.width; x += SPACING) {
        for (let y = 0; y < canvas.height; y += SPACING) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = isMobile ? Math.abs(y - scanY) : Math.sqrt(dx * dx + dy * dy);

          if (dist < HOVER_R) {
            const scale = 1 - dist / HOVER_R;
            ctx.fillStyle = "#ff5500";
            ctx.shadowBlur = isMobile ? 0 : 16;
            ctx.shadowColor = isMobile ? "transparent" : "rgba(255, 85, 0, 0.5)";
            ctx.beginPath();
            ctx.arc(x, y, BASE_R + scale * (isMobile ? 2 : 3), 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = "rgba(148, 163, 184, 0.35)";
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            ctx.beginPath();
            ctx.arc(x, y, BASE_R, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.canvasBackground}>
      <canvas ref={canvasRef} className={styles.canvasElement} />
      <div className={styles.glowTopLeft} />
      <div className={styles.glowBottomRight} />
      <div className={styles.watermarkBrackets}>
        <span>&lt;</span>
        <span style={{ width: "18vw" }} />
        <span>&gt;</span>
      </div>
    </div>
  );
}

export function QuordixHero({
  onBack,
  backHref = "/",
  showNavbar = true,
}: QuordixHeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Trabalhos", href: "#work" },
    { label: "Serviços", href: "#services" },
    { label: "Equipe", href: "#team" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <div className={styles.quordixShell}>
      {/* Background Interativo com Canvas de Pontos e Glow */}
      <DotGridCanvas />

      {/* Floating Glassmorphic Navbar */}
      {showNavbar && (
        <>
          <header className={styles.navWrap}>
            <div className={styles.navPill}>
              <div className="flex items-center gap-3">
                {onBack ? (
                  <button
                    type="button"
                    onClick={onBack}
                    className="btn btn-xs btn-ghost rounded-full px-2 cursor-pointer opacity-70 hover:opacity-100"
                    title="Voltar"
                  >
                    ←
                  </button>
                ) : (
                  <Link
                    href={backHref}
                    className="btn btn-xs btn-ghost rounded-full px-2 opacity-70 hover:opacity-100"
                    title="Painel Principal"
                  >
                    ←
                  </Link>
                )}

                <div className={styles.logoWrap}>
                  <QuordixLogo />
                </div>
              </div>

              <nav aria-label="Navegação Principal">
                <ul className={styles.navLinks}>
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className={styles.navLink}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-3">
                <a href="#contact" className={styles.navCta}>
                  Iniciar Projeto
                </a>
                <button
                  className={styles.hamburger}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  <span
                    style={{
                      transform: mobileMenuOpen
                        ? "rotate(45deg) translateY(7px)"
                        : "none",
                    }}
                  />
                  <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
                  <span
                    style={{
                      transform: mobileMenuOpen
                        ? "rotate(-45deg) translateY(-7px)"
                        : "none",
                    }}
                  />
                </button>
              </div>
            </div>
          </header>

          {/* Mobile Overlay */}
          <div
            className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.open : ""}`}
            role="dialog"
            aria-modal="true"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className={styles.navCta}
              onClick={() => setMobileMenuOpen(false)}
            >
              Iniciar Projeto
            </a>
          </div>
        </>
      )}

      {/* Main Hero Content */}
      <main className={styles.heroMain}>
        <div className={styles.titleWrapper}>
          <span className={styles.taglinePulse}>
            DESENVOLVIMENTO DE SOFTWARE SOB MEDIDA
          </span>

          <h1 className="m-0 flex flex-col items-center">
            <span className={styles.titleGrowYour}>GROW YOUR</span>
            <span className={styles.glitchText} data-text="BUSINESS">
              BUSINESS
            </span>
          </h1>
        </div>

        <p className={styles.heroSubtitle}>
          Projetamos e construímos websites ultrarrápidos, bancos de dados seguros e aplicativos móveis de alto desempenho. Execução confiável, comunicação direta e foco absoluto em conversão.
        </p>

        <a href="#contact" className={styles.heroBtn}>
          <span>Começar Agora</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </a>
      </main>
    </div>
  );
}

export default QuordixHero;
