"use client";

import React, { useState, useMemo } from "react";

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  stock: number;
  minStockAlert: number;
  salesPerDay: number;
  salesPerMonth: number;
  rating: number;
  reviewsCount: number;
  totalSales: number;
  revenue: number;
  lastUpdated: string;
  image: string;
  gallery: string[];
  description: string;
  weightKg: number;
  lengthCm: number;
  breadthCm: number;
  widthCm: number;
  sellingType: "both" | "online" | "instore";
  shippingRegions: string[];
  colors: string[];
  status: "active" | "draft" | "paused";
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "PRD-001",
    name: "Apple iMac 27\" Retina 5K (2024)",
    sku: "AAPL-IMAC-27-5K",
    category: "Computadores",
    brand: "Apple",
    price: 14999.00,
    originalPrice: 16499.00,
    stock: 95,
    minStockAlert: 15,
    salesPerDay: 1.47,
    salesPerMonth: 44.1,
    rating: 5.0,
    reviewsCount: 342,
    totalSales: 1600,
    revenue: 23998400,
    lastUpdated: "Hoje às 09:30",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Tela Retina 5K de 27 polegadas com tecnologia True Tone. Processador Intel Core i7 8-Core 3.8GHz, 16GB DDR4, Radeon Pro 5500 XT 8GB e 512GB SSD de altíssima velocidade.",
    weightKg: 8.9,
    lengthCm: 65,
    breadthCm: 20,
    widthCm: 51,
    sellingType: "both",
    shippingRegions: ["Brasil", "América do Sul", "Europa"],
    colors: ["#94a3b8", "#cbd5e1", "#334155"],
    status: "active"
  },
  {
    id: "PRD-002",
    name: "Apple iPhone 15 Pro Max 256GB Titânio",
    sku: "AAPL-IPH15PM-256",
    category: "Smartphones",
    brand: "Apple",
    price: 8999.00,
    originalPrice: 9999.00,
    stock: 24,
    minStockAlert: 10,
    salesPerDay: 4.82,
    salesPerMonth: 144.6,
    rating: 4.9,
    reviewsCount: 890,
    totalSales: 3200,
    revenue: 28796800,
    lastUpdated: "Hoje às 10:15",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Design inovador em titânio de grau aeroespacial, chip A17 Pro ultraveloz, Botão de Ação customizável e sistema de câmera teleobjetiva 5x de maior alcance.",
    weightKg: 0.22,
    lengthCm: 16,
    breadthCm: 7.7,
    widthCm: 0.8,
    sellingType: "both",
    shippingRegions: ["Brasil", "América do Norte", "Europa", "Ásia"],
    colors: ["#475569", "#1e293b", "#e2e8f0", "#94a3b8"],
    status: "active"
  },
  {
    id: "PRD-003",
    name: "Sony PlayStation 5 Slim 1TB + 2 Controles",
    sku: "SNY-PS5-SLIM-1TB",
    category: "Consoles",
    brand: "Sony",
    price: 3699.00,
    originalPrice: 3999.00,
    stock: 243,
    minStockAlert: 30,
    salesPerDay: 3.15,
    salesPerMonth: 94.5,
    rating: 4.8,
    reviewsCount: 512,
    totalSales: 2100,
    revenue: 7767900,
    lastUpdated: "Ontem às 18:40",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Console PlayStation 5 modelo Slim com SSD ultraveloz de 1TB, tecnologia Ray Tracing, áudio 3D imersivo e gatilhos adaptáveis DualSense.",
    weightKg: 3.2,
    lengthCm: 35,
    breadthCm: 21,
    widthCm: 9,
    sellingType: "both",
    shippingRegions: ["Brasil", "América do Sul"],
    colors: ["#ffffff", "#000000"],
    status: "active"
  },
  {
    id: "PRD-004",
    name: "Microsoft Xbox Series X 1TB 4K 120FPS",
    sku: "MSFT-XBX-X-1TB",
    category: "Consoles",
    brand: "Microsoft",
    price: 4199.00,
    stock: 18,
    minStockAlert: 20,
    salesPerDay: 2.10,
    salesPerMonth: 63.0,
    rating: 4.7,
    reviewsCount: 420,
    totalSales: 989,
    revenue: 4152811,
    lastUpdated: "Há 2 dias",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&auto=format&fit=crop&q=80"
    ],
    description: "O Xbox mais rápido e potente de todos os tempos. Jogue milhares de títulos de quatro gerações de consoles com tempos de carregamento mínimos via Xbox Velocity Architecture.",
    weightKg: 4.4,
    lengthCm: 30,
    breadthCm: 15,
    widthCm: 15,
    sellingType: "online",
    shippingRegions: ["Brasil", "América do Norte"],
    colors: ["#09090b"],
    status: "active"
  },
  {
    id: "PRD-005",
    name: "Apple iPad Air 11\" M2 128GB Wi-Fi",
    sku: "AAPL-IPAD-AIR-M2",
    category: "Tablets",
    brand: "Apple",
    price: 5499.00,
    originalPrice: 5999.00,
    stock: 287,
    minStockAlert: 25,
    salesPerDay: 1.85,
    salesPerMonth: 55.5,
    rating: 4.9,
    reviewsCount: 298,
    totalSales: 1250,
    revenue: 6873750,
    lastUpdated: "Há 3 dias",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Redesenhado com chip Apple M2 de alto desempenho, tela Liquid Retina brilhante, câmera frontal horizontal de 12 MP e compatibilidade com Apple Pencil Pro.",
    weightKg: 0.46,
    lengthCm: 24.7,
    breadthCm: 17.8,
    widthCm: 0.6,
    sellingType: "both",
    shippingRegions: ["Brasil", "Global"],
    colors: ["#e2e8f0", "#bfdbfe", "#e9d5ff", "#fef08a"],
    status: "active"
  },
  {
    id: "PRD-006",
    name: "Logitech MX Master 3S Mouse Sem Fio",
    sku: "LOGI-MXM-3S",
    category: "Acessórios",
    brand: "Logitech",
    price: 649.00,
    originalPrice: 799.00,
    stock: 0,
    minStockAlert: 15,
    salesPerDay: 5.40,
    salesPerMonth: 162.0,
    rating: 4.9,
    reviewsCount: 1420,
    totalSales: 4500,
    revenue: 2920500,
    lastUpdated: "Há 4 horas",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Cliques silenciosos com 90% menos ruído, sensor de 8.000 DPI para rastreamento em qualquer superfície (inclusive vidro) e rolagem eletromagnética MagSpeed ultrarrápida.",
    weightKg: 0.14,
    lengthCm: 12.5,
    breadthCm: 8.4,
    widthCm: 5.1,
    sellingType: "online",
    shippingRegions: ["Brasil", "Global"],
    colors: ["#1e293b", "#cbd5e1"],
    status: "paused"
  },
  {
    id: "PRD-007",
    name: "Asus ROG Swift 32\" OLED 4K 240Hz",
    sku: "ASUS-ROG-PG32UCDM",
    category: "Monitores",
    brand: "Asus",
    price: 11299.00,
    stock: 8,
    minStockAlert: 10,
    salesPerDay: 0.82,
    salesPerMonth: 24.6,
    rating: 5.0,
    reviewsCount: 95,
    totalSales: 310,
    revenue: 3502690,
    lastUpdated: "Hoje às 08:00",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Painel QD-OLED de terceira geração com resolução 4K, taxa de atualização de 240Hz, tempo de resposta de 0.03ms e dissipador de calor customizado com grafeno.",
    weightKg: 7.3,
    lengthCm: 71.8,
    breadthCm: 25.0,
    widthCm: 58.0,
    sellingType: "both",
    shippingRegions: ["Brasil", "América do Norte", "Europa"],
    colors: ["#0f172a"],
    status: "active"
  },
  {
    id: "PRD-008",
    name: "Sony WH-1000XM5 Fone Noise Cancelling",
    sku: "SNY-WH1000XM5-BLK",
    category: "Áudio",
    brand: "Sony",
    price: 2199.00,
    originalPrice: 2499.00,
    stock: 65,
    minStockAlert: 15,
    salesPerDay: 3.20,
    salesPerMonth: 96.0,
    rating: 4.8,
    reviewsCount: 680,
    totalSales: 2800,
    revenue: 6157200,
    lastUpdated: "Há 1 dia",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Cancelamento de ruído líder do setor com dois processadores e 8 microfones. Chamadas com qualidade de estúdio e até 30 horas de bateria com carregamento ultrarrápido.",
    weightKg: 0.25,
    lengthCm: 22,
    breadthCm: 18,
    widthCm: 7,
    sellingType: "both",
    shippingRegions: ["Brasil", "Global"],
    colors: ["#18181b", "#f5f5f4", "#1e3a8a"],
    status: "active"
  }
];

export interface MerchantCatalogProps {
  initialData?: ProductItem[];
  currencySymbol?: string;
  onProductCreated?: (product: ProductItem) => void;
  onProductUpdated?: (product: ProductItem) => void;
  onProductDeleted?: (id: string) => void;
}

export default function MerchantCatalog({
  initialData = INITIAL_PRODUCTS,
  currencySymbol = "R$",
  onProductCreated,
  onProductUpdated,
  onProductDeleted
}: MerchantCatalogProps) {
  // State
  const [products, setProducts] = useState<ProductItem[]>(initialData);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in_stock" | "low_stock" | "out_of_stock">("all");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 20000 });
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Active Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [previewProduct, setPreviewProduct] = useState<ProductItem | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<ProductItem | null>(null);

  // New Product Form State
  const [newProductForm, setNewProductForm] = useState<Partial<ProductItem>>({
    name: "",
    sku: "",
    category: "Computadores",
    brand: "Apple",
    price: 999,
    originalPrice: 1199,
    stock: 50,
    minStockAlert: 10,
    description: "",
    weightKg: 1.5,
    lengthCm: 30,
    breadthCm: 20,
    widthCm: 5,
    sellingType: "both",
    shippingRegions: ["Brasil"],
    colors: ["#3b82f6"],
    status: "active",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80"]
  });

  // Extract unique categories & brands for filter options
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, [products]);

  // Global Metrics
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalRevenue = products.reduce((acc, p) => acc + p.revenue, 0);
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= p.minStockAlert).length;
    const outOfStockCount = products.filter((p) => p.stock === 0).length;
    return { totalProducts, totalRevenue, totalStock, lowStockCount, outOfStockCount };
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand;

      let matchesStock = true;
      if (stockFilter === "in_stock") matchesStock = p.stock > p.minStockAlert;
      else if (stockFilter === "low_stock") matchesStock = p.stock > 0 && p.stock <= p.minStockAlert;
      else if (stockFilter === "out_of_stock") matchesStock = p.stock === 0;

      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      const matchesRating = ratingFilter === 0 || p.rating >= ratingFilter;

      return matchesSearch && matchesCat && matchesBrand && matchesStock && matchesPrice && matchesRating;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, stockFilter, priceRange, ratingFilter]);

  // Paginated Products
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Actions
  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: ProductItem = {
      id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
      name: newProductForm.name || "Novo Produto",
      sku: newProductForm.sku || `SKU-${Date.now().toString().slice(-4)}`,
      category: newProductForm.category || "Geral",
      brand: newProductForm.brand || "Generico",
      price: Number(newProductForm.price) || 0,
      originalPrice: newProductForm.originalPrice ? Number(newProductForm.originalPrice) : undefined,
      stock: Number(newProductForm.stock) || 0,
      minStockAlert: Number(newProductForm.minStockAlert) || 5,
      salesPerDay: 0,
      salesPerMonth: 0,
      rating: 5.0,
      reviewsCount: 0,
      totalSales: 0,
      revenue: 0,
      lastUpdated: "Agora",
      image: newProductForm.image || "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80",
      gallery: [newProductForm.image || "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80"],
      description: newProductForm.description || "Descrição padrão do produto.",
      weightKg: Number(newProductForm.weightKg) || 1,
      lengthCm: Number(newProductForm.lengthCm) || 10,
      breadthCm: Number(newProductForm.breadthCm) || 10,
      widthCm: Number(newProductForm.widthCm) || 10,
      sellingType: newProductForm.sellingType || "both",
      shippingRegions: newProductForm.shippingRegions || ["Brasil"],
      colors: newProductForm.colors || ["#3b82f6"],
      status: newProductForm.status || "active"
    };

    setProducts((prev) => [newProd, ...prev]);
    setIsAddModalOpen(false);
    onProductCreated?.(newProd);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? { ...editingProduct, lastUpdated: "Agora" } : p))
    );
    onProductUpdated?.(editingProduct);
    setEditingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteCandidate) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteCandidate.id));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteCandidate.id));
    onProductDeleted?.(deleteCandidate.id);
    setDeleteCandidate(null);
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return;
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    setIsBulkActionsOpen(false);
  };

  const formatCurrency = (val: number) => {
    return `${currencySymbol} ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getStockBadge = (stock: number, minAlert: number) => {
    if (stock === 0) {
      return (
        <span className="badge badge-error badge-sm gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-error-content animate-pulse" />
          Esgotado
        </span>
      );
    }
    if (stock <= minAlert) {
      return (
        <span className="badge badge-warning badge-sm gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-warning-content animate-ping" />
          Baixo ({stock})
        </span>
      );
    }
    return (
      <span className="badge badge-success badge-sm gap-1 font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-success-content" />
        {stock} un
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header do Painel do Lojista & Métricas em Tempo Real */}
      <section className="card card-spotlight p-6 sm:p-8 bg-base-100 border border-base-300 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-primary font-bold px-3 py-1 text-xs">Área do Lojista</span>
              <span className="text-xs opacity-60 font-mono">Gestão Comercial & Estoque</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-base-content flex items-center gap-2.5">
              <span>🛍️</span> Catálogo de Produtos
            </h2>
            <p className="text-sm opacity-70 mt-1 max-w-xl">
              Monitore estoque, vendas diárias, preços e visualize seus itens como o cliente final enxerga na loja virtual.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-base-200/60 p-3.5 rounded-2xl border border-base-300/80">
            <div className="text-center px-3 py-1">
              <span className="text-[11px] font-semibold opacity-60 uppercase block">Total Itens</span>
              <span className="text-lg sm:text-xl font-black text-primary">{metrics.totalProducts}</span>
            </div>
            <div className="text-center px-3 py-1 border-l border-base-300">
              <span className="text-[11px] font-semibold opacity-60 uppercase block">Em Estoque</span>
              <span className="text-lg sm:text-xl font-black text-success">{metrics.totalStock}</span>
            </div>
            <div className="text-center px-3 py-1 border-l border-base-300">
              <span className="text-[11px] font-semibold opacity-60 uppercase block">Estoque Crítico</span>
              <span className="text-lg sm:text-xl font-black text-warning">{metrics.lowStockCount + metrics.outOfStockCount}</span>
            </div>
            <div className="text-center px-3 py-1 border-l border-base-300">
              <span className="text-[11px] font-semibold opacity-60 uppercase block">Faturamento</span>
              <span className="text-lg sm:text-xl font-black text-accent">
                {currencySymbol} {(metrics.totalRevenue / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Container da Tabela e Barra de Ferramentas */}
      <div className="card bg-base-100 border border-base-300 shadow-md rounded-2xl overflow-hidden">
        {/* Barra de Filtros e Busca */}
        <div className="p-4 sm:p-5 border-b border-base-300/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Campo de Busca Inteligente */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none opacity-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar por nome, SKU, marca ou categoria..."
              className="input input-bordered input-sm sm:input-md w-full pl-10 pr-9 rounded-xl text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs opacity-50 hover:opacity-100 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Ações e Filtros */}
          <div className="flex flex-wrap items-center gap-2.5 justify-end">
            {/* Toggle View Mode */}
            <div className="join border border-base-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("table")}
                className={`join-item btn btn-sm ${viewMode === "table" ? "btn-primary font-bold" : "btn-ghost"}`}
                title="Visualização em Tabela"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`join-item btn btn-sm ${viewMode === "grid" ? "btn-primary font-bold" : "btn-ghost"}`}
                title="Visualização em Grade"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>

            {/* Dropdown Filtros Avançados */}
            <div className="relative">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`btn btn-sm rounded-xl border-base-300 font-medium flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory !== "all" || stockFilter !== "all" || selectedBrand !== "all" || ratingFilter > 0
                    ? "btn-primary font-bold"
                    : "btn-outline"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filtros</span>
                {(selectedCategory !== "all" || stockFilter !== "all" || selectedBrand !== "all" || ratingFilter > 0) && (
                  <span className="w-2 h-2 rounded-full bg-accent" />
                )}
              </button>

              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-base-100 border border-base-300 rounded-2xl shadow-2xl z-50 p-4 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-base-300 pb-2">
                    <span className="font-bold text-sm">Filtros Rápidos</span>
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedBrand("all");
                        setStockFilter("all");
                        setRatingFilter(0);
                        setIsFilterDropdownOpen(false);
                      }}
                      className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Limpar Tudo
                    </button>
                  </div>

                  {/* Categoria */}
                  <div>
                    <label className="text-xs font-semibold opacity-70 block mb-1">Categoria</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="select select-bordered select-sm w-full rounded-lg text-xs"
                    >
                      <option value="all">Todas as Categorias</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Marca */}
                  <div>
                    <label className="text-xs font-semibold opacity-70 block mb-1">Marca</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="select select-bordered select-sm w-full rounded-lg text-xs"
                    >
                      <option value="all">Todas as Marcas</option>
                      {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status do Estoque */}
                  <div>
                    <label className="text-xs font-semibold opacity-70 block mb-1">Disponibilidade</label>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {[
                        { id: "all", label: "Todos" },
                        { id: "in_stock", label: "Em Estoque" },
                        { id: "low_stock", label: "Estoque Baixo" },
                        { id: "out_of_stock", label: "Esgotados" }
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setStockFilter(s.id as any)}
                          className={`btn btn-xs rounded-lg font-medium cursor-pointer ${
                            stockFilter === s.id ? "btn-primary font-bold" : "btn-ghost border border-base-300"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avaliação Mínima */}
                  <div>
                    <label className="text-xs font-semibold opacity-70 block mb-1">Avaliação Mínima</label>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                          className={`text-lg transition-transform hover:scale-110 cursor-pointer ${
                            star <= ratingFilter ? "opacity-100" : "opacity-30"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="text-xs font-bold text-base-content ml-2">
                        {ratingFilter > 0 ? `${ratingFilter}+ estrelas` : "Qualquer"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFilterDropdownOpen(false)}
                    className="btn btn-primary btn-sm w-full rounded-xl font-bold cursor-pointer mt-2"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              )}
            </div>

            {/* Ações em Lote (Quando há itens selecionados) */}
            {selectedIds.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}
                  className="btn btn-sm btn-secondary font-bold rounded-xl gap-1.5 cursor-pointer"
                >
                  <span>Ações ({selectedIds.length})</span>
                  <span className="text-xs">▾</span>
                </button>

                {isBulkActionsOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-base-100 border border-base-300 rounded-xl shadow-xl z-50 p-1.5 space-y-1">
                    <button
                      onClick={() => {
                        alert(`Exportando ${selectedIds.length} produtos em CSV...`);
                        setIsBulkActionsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-base-200 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <span>📥</span> Exportar Selecionados
                    </button>
                    <button
                      onClick={handleBatchDelete}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-error/10 text-error flex items-center gap-2 cursor-pointer font-bold"
                    >
                      <span>🗑️</span> Excluir Selecionados
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Botão Adicionar Produto */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-sm sm:btn-md btn-primary font-bold rounded-xl shadow-md gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Cadastrar Produto</span>
            </button>
          </div>
        </div>

        {/* 3. Renderização Principal: TABELA ou GRADE */}
        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="table table-sm md:table-md w-full">
              <thead className="bg-base-200/70 text-xs uppercase font-bold text-base-content/70">
                <tr>
                  <th className="w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredProducts.length}
                      onChange={handleSelectAll}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                  </th>
                  <th>Produto & SKU</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                  <th>Preço Unitário</th>
                  <th>Vendas / Dia</th>
                  <th>Avaliação</th>
                  <th>Receita Total</th>
                  <th className="text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-200">
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12">
                      <div className="max-w-xs mx-auto text-center space-y-3">
                        <span className="text-4xl block">🔍</span>
                        <h4 className="font-bold text-base">Nenhum produto encontrado</h4>
                        <p className="text-xs opacity-60">Tente ajustar seus termos de busca ou filtros aplicados.</p>
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                            setSelectedBrand("all");
                            setStockFilter("all");
                            setRatingFilter(0);
                          }}
                          className="btn btn-xs btn-outline rounded-lg"
                        >
                          Limpar Todos os Filtros
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => {
                    const isSelected = selectedIds.includes(product.id);
                    return (
                      <tr
                        key={product.id}
                        className={`hover:bg-base-200/40 transition-colors ${isSelected ? "bg-primary/5" : ""}`}
                      >
                        <td>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(product.id)}
                            className="checkbox checkbox-sm checkbox-primary"
                          />
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-11 h-11 bg-base-300">
                                <img src={product.image} alt={product.name} className="object-cover" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-sm text-base-content hover:text-primary transition-colors cursor-pointer" onClick={() => setPreviewProduct(product)}>
                                {product.name}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] opacity-60 font-mono mt-0.5">
                                <span>{product.sku}</span>
                                <span>•</span>
                                <span className="font-semibold text-primary">{product.brand}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-ghost badge-sm font-semibold border-base-300">
                            {product.category}
                          </span>
                        </td>
                        <td>
                          <div className="space-y-1">
                            {getStockBadge(product.stock, product.minStockAlert)}
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-sm text-base-content">
                            {formatCurrency(product.price)}
                          </div>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-[10px] line-through opacity-50 block font-mono">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="font-mono text-xs font-semibold">
                            {product.salesPerDay.toFixed(2)}/dia
                          </div>
                          <span className="text-[10px] opacity-50">~{product.salesPerMonth.toFixed(0)}/mês</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-amber-400 font-bold">★ {product.rating.toFixed(1)}</span>
                            <span className="opacity-40 text-[10px]">({product.reviewsCount})</span>
                          </div>
                        </td>
                        <td>
                          <div className="font-mono font-bold text-xs text-success">
                            {formatCurrency(product.revenue)}
                          </div>
                        </td>
                        <td className="text-right">
                          <div className="join border border-base-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="join-item btn btn-ghost btn-xs font-bold text-primary hover:bg-primary hover:text-primary-content cursor-pointer"
                              title="Editar Produto"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => setPreviewProduct(product)}
                              className="join-item btn btn-ghost btn-xs hover:bg-base-200 cursor-pointer"
                              title="Visualizar Vitrine"
                            >
                              Ver
                            </button>
                            <button
                              onClick={() => setDeleteCandidate(product)}
                              className="join-item btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content cursor-pointer"
                              title="Excluir Produto"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Visualização em Grade / Cards */
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-base-200/50 border border-base-300 hover:border-primary/50 transition-all duration-200 p-4 space-y-3 rounded-2xl group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-base-300">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2">
                      {getStockBadge(product.stock, product.minStockAlert)}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-white">
                      {product.brand}
                    </div>
                  </div>

                  <div>
                    <span className="badge badge-ghost badge-xs text-[10px] font-semibold">{product.category}</span>
                    <h4 className="font-bold text-sm text-base-content mt-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs opacity-60 line-clamp-2 mt-1">{product.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-base-300/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] opacity-50 block uppercase font-mono">Preço</span>
                      <span className="font-black text-base text-base-content">{formatCurrency(product.price)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] opacity-50 block uppercase font-mono">Avaliação</span>
                      <span className="text-xs font-bold text-amber-400">★ {product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="btn btn-xs btn-primary font-bold rounded-lg cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setPreviewProduct(product)}
                      className="btn btn-xs btn-outline rounded-lg cursor-pointer"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setDeleteCandidate(product)}
                      className="btn btn-xs btn-ghost text-error rounded-lg cursor-pointer hover:bg-error/10"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Rodapé da Tabela & Paginação */}
        <div className="p-4 border-t border-base-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 opacity-70">
            <span>Exibindo</span>
            <span className="font-bold text-base-content">
              {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
            </span>
            <span>de</span>
            <span className="font-bold text-base-content">{filteredProducts.length} produtos</span>
            <div className="divider divider-horizontal my-0 h-4" />
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="select select-bordered select-xs rounded-lg"
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={25}>25 por página</option>
            </select>
          </div>

          {/* DaisyUI Join Pagination */}
          <div className="join border border-base-300 rounded-xl overflow-hidden shadow-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="join-item btn btn-xs sm:btn-sm btn-ghost disabled:opacity-30 cursor-pointer"
            >
              « Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`join-item btn btn-xs sm:btn-sm cursor-pointer ${
                  currentPage === page ? "btn-primary font-bold" : "btn-ghost"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="join-item btn btn-xs sm:btn-sm btn-ghost disabled:opacity-30 cursor-pointer"
            >
              Próximo »
            </button>
          </div>
        </div>
      </div>

      {/* 5. MODAL: Cadastrar Novo Produto */}
      {isAddModalOpen && (
        <dialog className="modal modal-open z-50">
          <div className="modal-box max-w-3xl bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-base-300 pb-4">
              <div>
                <span className="badge badge-primary badge-sm font-bold mb-1">Novo Item</span>
                <h3 className="text-xl sm:text-2xl font-black text-base-content">Cadastrar Produto no Catálogo</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="label text-xs font-bold uppercase opacity-70">Nome Comercial do Produto</label>
                  <input
                    type="text"
                    required
                    placeholder={`Ex: Apple MacBook Pro 16" M3 Max`}
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <div>
                  <label className="label text-xs font-bold uppercase opacity-70">Código SKU</label>
                  <input
                    type="text"
                    placeholder="Ex: AAPL-MBP16-M3"
                    value={newProductForm.sku}
                    onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                    className="input input-bordered w-full rounded-xl font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="label text-xs font-bold uppercase opacity-70">Categoria</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="select select-bordered w-full rounded-xl"
                  >
                    <option value="Computadores">Computadores</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Consoles">Consoles</option>
                    <option value="Monitores">Monitores</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Áudio">Áudio</option>
                  </select>
                </div>

                <div>
                  <label className="label text-xs font-bold uppercase opacity-70">Preço de Venda ({currencySymbol})</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="2999.00"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="input input-bordered w-full rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="label text-xs font-bold uppercase opacity-70">Quantidade Inicial em Estoque</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                    className="input input-bordered w-full rounded-xl font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="label text-xs font-bold uppercase opacity-70">Descrição Completa</label>
                  <textarea
                    rows={3}
                    placeholder="Descreva as principais especificações técnicas e destaques do produto..."
                    value={newProductForm.description}
                    onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    className="textarea textarea-bordered w-full rounded-xl"
                  />
                </div>

                {/* Imagem Dropzone Simulação */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="label text-xs font-bold uppercase opacity-70">URL da Imagem de Capa</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newProductForm.image}
                    onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                    className="input input-bordered w-full rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="modal-action border-t border-base-300 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn btn-ghost rounded-xl cursor-pointer"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Salvar e Publicar
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/60" onClick={() => setIsAddModalOpen(false)} />
        </dialog>
      )}

      {/* 6. DRAWER LATERAL: Editar Produto */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setEditingProduct(null)}
          />
          <aside className="relative w-full max-w-xl h-full bg-base-100 border-l border-base-300 shadow-2xl p-6 sm:p-8 overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-base-300 pb-4">
              <div>
                <span className="badge badge-primary badge-sm font-bold mb-1">Editor de Produto</span>
                <h3 className="text-xl font-black text-base-content">{editingProduct.name}</h3>
                <span className="text-xs opacity-50 font-mono">SKU: {editingProduct.sku}</span>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="btn btn-sm btn-circle btn-ghost cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-5">
              <div>
                <label className="label text-xs font-bold uppercase opacity-70">Nome do Produto</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="input input-bordered w-full rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label text-xs font-bold uppercase opacity-70">Preço ({currencySymbol})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="input input-bordered w-full rounded-xl font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="label text-xs font-bold uppercase opacity-70">Estoque Disponível</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="input input-bordered w-full rounded-xl font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="label text-xs font-bold uppercase opacity-70">Descrição</label>
                <textarea
                  rows={4}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="textarea textarea-bordered w-full rounded-xl text-xs leading-relaxed"
                />
              </div>

              {/* Dimensões e Logística */}
              <div className="card bg-base-200/60 p-4 rounded-xl border border-base-300 space-y-3">
                <span className="text-xs font-bold uppercase opacity-70 block">Dimensões & Logística</span>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="opacity-60 block">Peso (kg)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={editingProduct.weightKg}
                      onChange={(e) => setEditingProduct({ ...editingProduct, weightKg: Number(e.target.value) })}
                      className="input input-bordered input-xs w-full rounded-md font-mono"
                    />
                  </div>
                  <div>
                    <span className="opacity-60 block">Comp. (cm)</span>
                    <input
                      type="number"
                      value={editingProduct.lengthCm}
                      onChange={(e) => setEditingProduct({ ...editingProduct, lengthCm: Number(e.target.value) })}
                      className="input input-bordered input-xs w-full rounded-md font-mono"
                    />
                  </div>
                  <div>
                    <span className="opacity-60 block">Larg. (cm)</span>
                    <input
                      type="number"
                      value={editingProduct.breadthCm}
                      onChange={(e) => setEditingProduct({ ...editingProduct, breadthCm: Number(e.target.value) })}
                      className="input input-bordered input-xs w-full rounded-md font-mono"
                    />
                  </div>
                  <div>
                    <span className="opacity-60 block">Alt. (cm)</span>
                    <input
                      type="number"
                      value={editingProduct.widthCm}
                      onChange={(e) => setEditingProduct({ ...editingProduct, widthCm: Number(e.target.value) })}
                      className="input input-bordered input-xs w-full rounded-md font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-base-300">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="btn btn-ghost btn-sm rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {/* 7. DRAWER LATERAL: Preview de Vitrine (Como o cliente enxerga) */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setPreviewProduct(null)}
          />
          <aside className="relative w-full max-w-lg h-full bg-base-100 border-l border-base-300 shadow-2xl p-6 sm:p-8 overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <div className="flex items-center gap-2">
                <span className="badge badge-accent badge-sm font-bold">Preview da Loja</span>
                <span className="text-xs opacity-50 font-mono">Visão do Cliente</span>
              </div>
              <button
                onClick={() => setPreviewProduct(null)}
                className="btn btn-sm btn-circle btn-ghost cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Imagem Principal & Mini Galeria */}
            <div className="space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-base-200 border border-base-300 relative shadow-inner">
                <img src={previewProduct.image} alt={previewProduct.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  {getStockBadge(previewProduct.stock, previewProduct.minStockAlert)}
                </div>
              </div>
            </div>

            {/* Dados do Produto */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge badge-ghost font-semibold">{previewProduct.brand} • {previewProduct.category}</span>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                  ★ {previewProduct.rating.toFixed(1)} <span className="opacity-40 text-xs">({previewProduct.reviewsCount} avaliações)</span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-base-content leading-tight">
                {previewProduct.name}
              </h3>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-primary">
                  {formatCurrency(previewProduct.price)}
                </span>
                {previewProduct.originalPrice && (
                  <span className="text-sm line-through opacity-40 font-mono">
                    {formatCurrency(previewProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs opacity-80 leading-relaxed bg-base-200/50 p-3.5 rounded-xl border border-base-300/60">
                {previewProduct.description}
              </p>
            </div>

            {/* Cores e Especificações */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-base-200/60 rounded-xl border border-base-300">
                <span className="font-bold opacity-60 block mb-1">Cores Disponíveis</span>
                <div className="flex items-center gap-1.5 mt-1">
                  {previewProduct.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-base-300 shadow-xs inline-block"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="p-3 bg-base-200/60 rounded-xl border border-base-300">
                <span className="font-bold opacity-60 block mb-1">Canais de Venda</span>
                <span className="badge badge-sm badge-outline font-semibold">
                  {previewProduct.sellingType === "both" ? "Físico & Online" : previewProduct.sellingType === "online" ? "Somente Online" : "Loja Física"}
                </span>
              </div>
            </div>

            {/* Botão de Compra Mock */}
            <div className="pt-4 border-t border-base-300 space-y-2">
              <button
                onClick={() => alert(`Simulação: produto '${previewProduct.name}' adicionado ao carrinho da loja virtual!`)}
                className="btn btn-primary w-full rounded-xl font-bold shadow-lg cursor-pointer"
              >
                🛒 Comprar Agora (Simulação de Loja)
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 8. MODAL: Confirmar Exclusão */}
      {deleteCandidate && (
        <dialog className="modal modal-open z-50">
          <div className="modal-box max-w-md bg-base-100 border border-base-300 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center text-2xl mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-base-content">Excluir Produto do Catálogo?</h3>
              <p className="text-xs opacity-70">
                Você está prestes a remover <strong className="text-base-content">{deleteCandidate.name}</strong> ({deleteCandidate.sku}). Esta ação removerá o item da vitrine e cancelará o controle de estoque associado.
              </p>
            </div>

            <div className="modal-action grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="btn btn-ghost rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn btn-error text-white font-bold rounded-xl cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/60" onClick={() => setDeleteCandidate(null)} />
        </dialog>
      )}
    </div>
  );
}
