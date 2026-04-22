import { useState } from "react";
import { useRouter } from "../../hooks/useRouter";

export function Hero() {
  const { navigateTo } = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get("search");

    const url = searchQuery
      ? `/products?text=${encodeURIComponent(searchQuery)}`
      : "/products";
    navigateTo(url);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/section.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-white/50 to-white/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pinklight/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-skylight/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pinklight/60 backdrop-blur-sm text-primary text-sm font-medium mb-6 animate-pulse">
          <span className="size-2 bg-primary rounded-full" />
          Delivery gratis en compras +$50
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-dark leading-tight mb-6">
          Encuentra tu proximo{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">compañero</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-gold/40 -rotate-1 rounded" />
          </span>{" "}
          <span className="text-skylight">adorable</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Descubre un mundo de ternura. Desde tiernos peluches hasta bolsos con
          estilo, tenemos todo para alegrarte el dia.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
          <div
            className={`flex items-center gap-3 p-2 rounded-2xl bg-white shadow-xl shadow-primary/10 border-2 transition-all duration-300 ${
              isFocused
                ? "border-primary shadow-2xl shadow-primary/20"
                : "border-transparent"
            }`}
          >
            <div className="pl-3 text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              name="search"
              type="text"
              placeholder="Busca peluches, bolsos y mas..."
              className="flex-1 py-3 px-2 text-dark placeholder:text-muted/60 bg-transparent focus:outline-none text-base"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-wine transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 active:scale-95 cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-muted">Popular:</span>
          {["Peluches", "Bolsos", "Termos", "Juguetes"].map((tag) => (
            <button
              key={tag}
              onClick={() => navigateTo(`/products?text=${tag.toLowerCase()}`)}
              className="px-4 py-1.5 rounded-full bg-soft-gray hover:bg-pinklight/50 text-muted hover:text-primary transition-all duration-200 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="text-lg font-medium">Explora</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
