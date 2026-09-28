"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

// Character sets for the two card versions
const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[]\\;',./";
const MATRIX_CHARS = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890XYZ:*+-<>|";

const generateRandomString = (chars: string, length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

interface EvervaultCardProps {
  title: string;
  metadataTitle: string;
  metadataSubtitle: string;
  chars: string;
  variant: "default" | "matrix";
}

function EvervaultCard({ title, metadataTitle, metadataSubtitle, chars, variant }: EvervaultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowingGridRef = useRef<HTMLDivElement>(null);
  const charLength = 800;

  useEffect(() => {
    const initialStr = generateRandomString(chars, charLength);
    if (glowingGridRef.current) glowingGridRef.current.textContent = initialStr;
  }, [chars]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    const nextStr = generateRandomString(chars, charLength);
    if (glowingGridRef.current) glowingGridRef.current.textContent = nextStr;
  };

  const cardClassName = `${styles.card} ${variant === "matrix" ? styles.matrixCard : ""}`;
  const glowingGridClassName = `${styles.glowingGrid} ${variant === "matrix" ? styles.matrixGlowingGrid : ""}`;
  const radialGlowClassName = `${styles.radialGlow} ${variant === "matrix" ? styles.matrixRadialGlow : ""}`;
  const centeredTextClassName = `${styles.centeredText} ${variant === "matrix" ? styles.matrixCenteredText : ""}`;

  return (
    <div
      ref={cardRef}
      className={cardClassName}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.effectContainer}>
        <div ref={glowingGridRef} className={glowingGridClassName} />
        <div className={radialGlowClassName} />
        <div className={centeredTextClassName}>{title}</div>
      </div>

      <div className={styles.metadata}>
        <span className={styles.title}>{metadataTitle}</span>
        <span className={styles.subtitle}>{metadataSubtitle}</span>
      </div>
    </div>
  );
}

export default function EvervaultShowcase() {
  return (
    <div className={styles.container}>
      {/* Header section */}
      <div className={styles.header}>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
            Aceternity <span className="text-primary">Evervault Card</span>
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Efeito de criptografia dinâmica de alta performance e baixo consumo de CPU.
          </p>
        </div>
        <Link href="/" className={`btn btn-outline btn-sm ${styles.backButton}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Voltar para Home
        </Link>
      </div>

      {/* Grid containing both card variants */}
      <div className={styles.grid}>
        <EvervaultCard
          title="EVERVAULT"
          metadataTitle="Secure Gateway"
          metadataSubtitle="Aceternity Encryption UI"
          chars={DEFAULT_CHARS}
          variant="default"
        />

        <EvervaultCard
          title="MATRIX"
          metadataTitle="Neural Network"
          metadataSubtitle="Matrix Digital Rain UI"
          chars={MATRIX_CHARS}
          variant="matrix"
        />
      </div>
    </div>
  );
}
