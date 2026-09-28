"use client";

import React, { useState, useMemo } from "react";

interface Transaction {
  id: string;
  customer: string;
  email: string;
  initials: string;
  gradientBg: string;
  plan: "Enterprise" | "Pro" | "Starter";
  status: "Concluído" | "Pendente" | "Processando" | "Cancelado";
  amount: string;
  date: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TX-9021",
    customer: "Ana Beatriz Silva",
    email: "ana.beatriz@empresa.com",
    initials: "AB",
    gradientBg: "from-purple-500 to-pink-500",
    plan: "Enterprise",
    status: "Concluído",
    amount: "R$ 4.850,00",
    date: "Hoje, 14:32"
  },
  {
    id: "TX-9020",
    customer: "Carlos Eduardo Mendes",
    email: "carlos.mendes@techcorp.io",
    initials: "CE",
    gradientBg: "from-blue-500 to-cyan-500",
    plan: "Pro",
    status: "Concluído",
    amount: "R$ 1.290,00",
    date: "Hoje, 11:15"
  },
  {
    id: "TX-9019",
    customer: "Mariana Costa",
    email: "m.costa@designstudio.br",
    initials: "MC",
    gradientBg: "from-emerald-500 to-teal-500",
    plan: "Starter",
    status: "Processando",
    amount: "R$ 490,00",
    date: "Hoje, 09:40"
  },
  {
    id: "TX-9018",
    customer: "Lucas Albuquerque",
    email: "lucas@fintechsa.com",
    initials: "LA",
    gradientBg: "from-amber-500 to-orange-500",
    plan: "Enterprise",
    status: "Pendente",
    amount: "R$ 8.900,00",
    date: "Ontem, 18:22"
  },
  {
    id: "TX-9017",
    customer: "Fernanda Lima Rocha",
    email: "fernanda.rocha@cloudlabs.net",
    initials: "FL",
    gradientBg: "from-indigo-500 to-purple-500",
    plan: "Pro",
    status: "Concluído",
    amount: "R$ 1.290,00",
    date: "Ontem, 15:04"
  }
];

interface DataTableProps {
  onActionClick?: (action: string, transactionId: string) => void;
}

export default function DataTable({ onActionClick }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredData = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || item.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "Concluído":
        return "badge badge-success badge-sm font-semibold";
      case "Pendente":
        return "badge badge-warning badge-sm font-semibold";
      case "Processando":
        return "badge badge-info badge-sm font-semibold";
      case "Cancelado":
        return "badge badge-error badge-sm font-semibold";
      default:
        return "badge badge-neutral badge-sm font-semibold";
    }
  };

  return (
    <div
      id="dashboard-data-table-container"
      className="card card-elevated"
      style={{
        background: "var(--color-base-100)",
        border: "1px solid var(--color-base-300)"
      }}
    >
      <div className="card-body p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="badge badge-primary badge-sm mb-1">Operações</div>
            <h3 className="text-xl font-bold text-base-content">
              Transações Recentes
            </h3>
            <p className="text-xs opacity-70">
              Gerencie e acompanhe as últimas ativações de contas e pagamentos
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                id="table-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar cliente ou código..."
                className="input input-sm input-bordered w-full sm:w-60 pr-8"
              />
              {searchTerm && (
                <button
                  id="table-clear-search-btn"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1.5 text-xs opacity-50 hover:opacity-100 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              id="table-status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select select-sm select-bordered cursor-pointer"
            >
              <option value="all">Todos os Status</option>
              <option value="concluído">Concluído</option>
              <option value="pendente">Pendente</option>
              <option value="processando">Processando</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full" id="recent-transactions-table">
            <thead>
              <tr className="border-b border-base-300 text-xs uppercase opacity-75">
                <th>Identificador</th>
                <th>Cliente</th>
                <th>Plano</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Data</th>
                <th className="text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 opacity-60 text-sm">
                    Nenhuma transação encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover">
                    <td className="font-mono text-xs font-bold text-primary">
                      {item.id}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${item.gradientBg} text-white font-bold text-xs flex items-center justify-center shadow-sm`}>
                            <span>{item.initials}</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm leading-tight text-base-content">
                            {item.customer}
                          </div>
                          <div className="text-xs opacity-60">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm font-medium">
                        {item.plan}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadge(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td className="font-semibold text-sm text-base-content">
                      {item.amount}
                    </td>
                    <td className="text-xs opacity-75">
                      {item.date}
                    </td>
                    <td className="text-right">
                      <button
                        id={`btn-view-${item.id}`}
                        onClick={() => onActionClick?.("Detalhes", item.id)}
                        className="btn btn-ghost btn-xs text-primary hover:bg-primary/10 cursor-pointer"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
