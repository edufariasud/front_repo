"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function ProductCardShowcase() {
  const [selectedSize, setSelectedSize] = useState("XS");
  const [isFavorite, setIsFavorite] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const sizes = ["XS", "S", "M", "L", "XL"];

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
              <h1 className="text-3xl font-extrabold tracking-tight">👟 Card de Produto Premium</h1>
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

        {/* Product Card Component */}
        <div className={styles.cardWrapper}>
          {/* Left image overlap container */}
          <div className={styles.imageArea}>
            <img
              src="/images/sneaker.png"
              alt="Nike Adapt BB 2.0"
              className={styles.sneakerImage}
            />
          </div>

          {/* Right Product Details Info container */}
          <div className={styles.infoArea}>
            <div className={styles.infoTop}>
              <h3 className={styles.title}>Nike Adapt BB 2.0</h3>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`${styles.favBtn} ${isFavorite ? styles.isFav : ""}`}
                title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                {isFavorite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.15-.319.642-.319.792 0l2.082 5.007 5.404.433c.364.03.507.485.236.742l-3.9 3.342 1.257 5.273c.085.358-.32.675-.634.502l-4.832-2.955-4.832 2.955c-.314.173-.719-.144-.634-.502l1.257-5.273-3.9-3.342c-.271-.257-.128-.712.236-.742l5.404-.433 2.082-5.007z" />
                  </svg>
                )}
              </button>
            </div>

            <p className={styles.description}>
              Ajuste consistente, customizado e revolucionário para alto desempenho nas quadras.
            </p>

            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>R$ 1.499,90</span>
              <span className={styles.oldPrice}>R$ 1.899,00</span>
              <span className={styles.discount}>20% OFF</span>
            </div>

            {/* Size Selector */}
            <div className={styles.sizeList}>
              {sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`${styles.sizeNode} ${selectedSize === size ? styles.active : ""}`}
                >
                  {size}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button className={`btn btn-primary btn-sm ${styles.buyBtn}`}>
                Comprar agora
              </button>
              <button className={`btn btn-outline btn-primary btn-sm ${styles.bagBtn}`}>
                Adicionar à sacola
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
