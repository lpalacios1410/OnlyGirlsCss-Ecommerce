export function SpinnerLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {/* Animated dots */}
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
        <span className="size-3 rounded-full bg-pinklight animate-bounce [animation-delay:150ms]" />
        <span className="size-3 rounded-full bg-gold animate-bounce [animation-delay:300ms]" />
        <span className="size-3 rounded-full bg-skylight animate-bounce [animation-delay:450ms]" />
      </div>
      {/* Loading text */}
      <p className="text-muted text-sm font-medium animate-pulse">
        Cargando productos adorables...
      </p>
    </div>
  );
}
