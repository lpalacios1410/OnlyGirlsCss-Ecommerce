import { useState } from "react";
import DashboardOg from "../DashboardOG";
import { ProductManager } from "./ProductManager";

type AdminTab = "manage" | "create";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "manage", label: "Editar productos" },
  { id: "create", label: "Agregar producto" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>("manage");

  return (
    <div className="min-h-screen bg-pink-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark">
            Panel de Administración
          </h1>
          <p className="text-muted text-sm mt-1">
            Gestiona el inventario de OnlyGirlsCcs: agrega, edita o elimina
            productos.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Secciones del panel de administración"
          className="flex gap-2 bg-white p-1.5 rounded-xl border border-pinklight/40 shadow-sm w-full sm:w-fit"
        >
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                tab === id
                  ? "bg-primary text-white shadow hover:cursor-pointer"
                  : "text-muted hover:bg-pinklight/40 hover:text-dark hover:cursor-pointer"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "manage" ? <ProductManager /> : <DashboardOg />}
        </div>
      </div>
    </div>
  );
}
