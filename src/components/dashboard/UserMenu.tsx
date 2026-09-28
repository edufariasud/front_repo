"use client";

import React, { useState, useRef, useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

interface UserMenuProps {
  user: UserProfile;
  onLogout: () => void;
  onOpenSettings?: () => void;
}

export default function UserMenu({ user, onLogout, onOpenSettings }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="user-profile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-full hover:bg-base-200 transition-colors focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Abrir menu do usuário"
      >
        <div className="avatar online placeholder">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary text-primary-content font-bold text-xs ring-2 ring-primary/40 flex items-center justify-center shadow-md">
            <span>{initials}</span>
          </div>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-bold text-base-content leading-tight">
            {user.name}
          </div>
          <div className="text-xs opacity-60">
            {user.role}
          </div>
        </div>
        <span className="text-xs opacity-50 hidden md:inline-block">▼</span>
      </button>

      {isOpen && (
        <div
          id="user-profile-dropdown-menu"
          className="absolute right-0 mt-2 w-64 p-3.5 shadow-2xl z-50 rounded-2xl border border-base-300 animate-in fade-in zoom-in-95 duration-150"
          style={{
            background: "var(--color-base-100)",
            color: "var(--color-base-content)"
          }}
        >
          <div className="px-3 py-2 border-b border-base-300 mb-2">
            <p className="text-xs uppercase font-bold opacity-50 tracking-wider">Conta Conectada</p>
            <p className="font-bold text-sm text-base-content truncate mt-0.5">{user.name}</p>
            <p className="text-xs opacity-70 truncate">{user.email}</p>
            <span className="badge badge-gradient badge-xs mt-2">{user.role}</span>
          </div>

          <div className="space-y-1">
            <button
              id="menu-item-settings"
              onClick={() => {
                setIsOpen(false);
                onOpenSettings?.();
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-base-200 text-base-content flex items-center justify-between cursor-pointer"
            >
              <span>⚙️ Configurações</span>
              <span className="opacity-50">Alt + S</span>
            </button>
            <button
              id="menu-item-help"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-base-200 text-base-content flex items-center justify-between cursor-pointer"
            >
              <span>💬 Central de Ajuda</span>
              <span className="badge badge-ghost badge-xs">v1.0</span>
            </button>
          </div>

          <div className="border-t border-base-300 mt-2 pt-2">
            <button
              id="menu-item-logout-btn"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="btn btn-error btn-outline btn-xs w-full font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>🚪 Sair da Conta</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
