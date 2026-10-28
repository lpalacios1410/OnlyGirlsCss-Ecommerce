interface EmptyResultsProps {
  query?: string;
  onClear?: () => void;
}

export function EmptyResults({ query, onClear }: EmptyResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-pinklight/30 shadow-sm">
      <div className="size-16 bg-pinklight/30 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-dark mb-2">
        No hay productos disponibles
      </h3>
      <p className="text-muted max-w-md mb-6">
        {query ? (
          <>
            No encontramos resultados para{" "}
            <span className="font-semibold text-dark">"{query}"</span>. Prueba
            con otra palabra o revisa la ortografía.
          </>
        ) : (
          "No hay productos que coincidan con los filtros seleccionados."
        )}
      </p>
      {onClear && (
        <button
          onClick={onClear}
          className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-wine transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
