"use client";

import React, { useState, useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import DashboardView from "@/components/dashboard/DashboardView";
import { DAISY_THEMES } from "@/components/dashboard/ThemeSwitcher";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingTheme = document.documentElement.getAttribute("data-theme");
      if (existingTheme && DAISY_THEMES.includes(existingTheme as any)) {
        setCurrentTheme(existingTheme);
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const handleLoginSuccess = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <main id="app-root-container" className="w-full min-h-screen">
      {!isAuthenticated || !user ? (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
      ) : (
        <DashboardView
          user={user}
          onLogout={handleLogout}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
      )}
    </main>
  );
}
