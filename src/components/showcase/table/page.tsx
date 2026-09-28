"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Ativo" | "Pendente" | "Inativo";
  initials: string;
}

export default function TableShowcase() {
  const [search, setSearch] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [theme, setTheme] = useState("dark");
  const dropdownRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);

    // Click outside handler for dropdowns
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const users: User[] = [
    { id: 1, name: "Ana Beatriz", email: "ana.beatriz@empresa.com", role: "Product Designer", status: "Ativo", initials: "AB" },
    { id: 2, name: "Carlos Eduardo", email: "carlos.du@empresa.com", role: "Frontend Lead", status: "Ativo", initials: "CE" },
    { id: 3, name: "Fernanda Lima", email: "fernanda.l@empresa.com", role: "DevOps Engineer", status: "Pendente", initials: "FL" },
    { id: 4, name: "Guilherme Silva", email: "gui.silva@empresa.com", role: "Mobile Developer", status: "Ativo", initials: "GS" },
    { id: 5, name: "Juliana Costa", email: "ju.costa@empresa.com", role: "QA Engineer", status: "Inativo", initials: "JC" },
    { id: 6, name: "Lucas Oliveira", email: "lucas.oli@empresa.com", role: "Backend Engineer", status: "Ativo", initials: "LO" }
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = (id: number) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const handleDelete = (name: string) => {
    alert(`Ação de Excluir simulada para: ${name}`);
    setActiveDropdown(null);
  };

  const handleEdit = (name: string) => {
    alert(`Ação de Editar simulada para: ${name}`);
    setActiveDropdown(null);
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
              <h1 className="text-3xl font-extrabold tracking-tight">🗃️ Tabela de Dados Premium</h1>
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

        {/* Custom Table Component Wrapper */}
        <div className={styles.tableWrapper}>
          {/* Filtering Header Bar */}
          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={styles.searchIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
              <input
                type="text"
                placeholder="Pesquisar usuários, cargos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`input input-bordered input-sm ${styles.searchInput}`}
              />
            </div>
            <div className="badge badge-neutral badge-sm font-semibold opacity-75">
              {filteredUsers.length} de {users.length} usuários
            </div>
          </div>

          {/* Table Element container */}
          <div className={styles.tableContainer}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Cargo / Função</th>
                  <th>Status</th>
                  <th style={{ width: "80px", textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody ref={dropdownRef}>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      {/* User Avatar & Info Cell */}
                      <td>
                        <div className={styles.avatarCell}>
                          <div className={styles.avatar}>{user.initials}</div>
                          <div className={styles.userInfo}>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.userEmail}>{user.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role Cell */}
                      <td>
                        <span className={styles.roleText}>{user.role}</span>
                      </td>

                      {/* Status Badge Cell */}
                      <td>
                        <span
                          className={`badge badge-sm ${styles.badge} ${
                            user.status === "Ativo"
                              ? "badge-success"
                              : user.status === "Pendente"
                              ? "badge-warning"
                              : "badge-neutral"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Row Action Dropdown Cell */}
                      <td style={{ textAlign: "center" }}>
                        <div className={styles.actionsContainer}>
                          <button
                            onClick={() => toggleDropdown(user.id)}
                            className={styles.actionsButton}
                            title="Opções"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                          </button>

                          {activeDropdown === user.id && (
                            <div className={styles.dropdownMenu}>
                              <button
                                onClick={() => handleEdit(user.name)}
                                className={styles.dropdownItem}
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(user.name)}
                                className={`${styles.dropdownItem} ${styles.danger}`}
                              >
                                Excluir
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>
                      Nenhum usuário encontrado para a busca.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>Mostrando 1-6 de {filteredUsers.length} resultados</span>
            <div className={styles.btnGroup}>
              <button className="btn btn-outline btn-xs" disabled>Anterior</button>
              <button className="btn btn-xs btn-primary">1</button>
              <button className="btn btn-outline btn-xs" disabled>Próximo</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
