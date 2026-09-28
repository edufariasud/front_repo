"use client";

import React from "react";

export interface StatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  badgeVariant?: "primary" | "secondary" | "accent" | "gradient" | "glow";
  progressValue: number;
}

interface StatsCardProps {
  stat: StatItem;
}

export default function StatsCard({ stat }: StatsCardProps) {
  const badgeClass = stat.badgeVariant === "gradient" 
    ? "badge-gradient" 
    : stat.badgeVariant === "glow" 
    ? "badge-glow" 
    : `badge-${stat.badgeVariant || "primary"}`;

  return (
    <article
      id={`stat-card-${stat.id}`}
      className="card card-spotlight transition-all duration-300 hover:translate-y-[-3px]"
      style={{
        background: "var(--color-base-100)",
        border: "1px solid var(--color-base-300)"
      }}
    >
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" role="img" aria-hidden="true">
              {stat.icon}
            </span>
            <span className="text-sm font-bold uppercase tracking-wider opacity-80 text-base-content">
              {stat.label}
            </span>
          </div>
          <span className={`badge ${badgeClass} font-semibold px-2.5 py-1 text-xs`}>
            {stat.isPositive ? `↑ ${stat.change}` : `↓ ${stat.change}`}
          </span>
        </div>

        <div className="mt-4">
          <div className="text-3xl sm:text-4xl font-black tracking-tighter text-gradient-white">
            {stat.value}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center text-xs opacity-75 mb-1.5 font-medium">
            <span>Meta mensal</span>
            <span className="font-bold">{stat.progressValue}%</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
              style={{ width: `${Math.min(100, Math.max(0, stat.progressValue))}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
