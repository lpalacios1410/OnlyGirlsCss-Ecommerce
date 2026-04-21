import { useState } from "react";

export function FiltersProducts({
  selectedColor: propSelectedColor = null,
  onColorChange = () => {},
  onCategoryChange,
  activeCategory,
}) {
  const colors = [
    { key: "wine", hex: "#A9597E", name: "Rosa Wine" },
    { key: "pinklight", hex: "#F6D7E3", name: "Rosa Claro" },
    { key: "gold", hex: "#F2D77E", name: "Dorado" },
    { key: "skylight", hex: "#8EDCE6", name: "Celeste" },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0].key);

  const categories = [
    {
      key: "todos",
      label: "Todos",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    },
    {
      key: "peluche",
      label: "Peluches",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      key: "bolso",
      label: "Bolsos",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    },
    {
      key: "juguete",
      label: "Juguetes",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      key: "termo",
      label: "Termos",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    },
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-pinklight/30">
          <h3 className="font-bold text-dark text-lg mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Categorias
          </h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => onCategoryChange(cat.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-muted hover:bg-pinklight/30 hover:text-dark"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={cat.icon}
                  />
                </svg>
                <span className="font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-pinklight/30">
          <h3 className="font-bold text-dark text-lg mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            Colores
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const active = propSelectedColor ?? selectedColor;
              const isActive = active === color.key;

              const handleClick = () => {
                if (propSelectedColor === null) setSelectedColor(color.key);
                onColorChange(color.key);
              };

              return (
                <button
                  key={color.key}
                  onClick={handleClick}
                  style={{ background: color.hex }}
                  className={`group relative size-10 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "ring-2 ring-offset-2 ring-dark scale-110"
                      : "hover:scale-110 hover:shadow-lg"
                  }`}
                  aria-label={`Color ${color.name}`}
                  title={color.name}
                >
                  {isActive && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-0 m-auto size-5 text-white drop-shadow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range (placeholder) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-pinklight/30">
          <h3 className="font-bold text-dark text-lg mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Precio
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted mb-1 block">Min</label>
                <input
                  type="number"
                  placeholder="$0"
                  className="w-full px-3 py-2 rounded-lg border border-pinklight/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted mb-1 block">Max</label>
                <input
                  type="number"
                  placeholder="$100"
                  className="w-full px-3 py-2 rounded-lg border border-pinklight/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button className="w-full py-2.5 bg-pinklight/50 text-primary rounded-xl font-medium text-sm hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer">
              Aplicar filtro
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        <button className="w-full py-3 text-muted hover:text-primary font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Limpiar filtros
        </button>
      </div>
    </aside>
  );
}
