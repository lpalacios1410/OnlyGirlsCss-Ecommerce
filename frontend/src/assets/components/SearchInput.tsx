interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar productos...",
  label = "Buscar",
}: SearchInputProps) {
  return (
    <div className="w-full">
      <label htmlFor="catalog-search" className="sr-only">
        {label}
      </label>
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-pinklight/30 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 text-muted shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="catalog-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-dark placeholder:text-muted/60"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-muted hover:text-dark"
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
