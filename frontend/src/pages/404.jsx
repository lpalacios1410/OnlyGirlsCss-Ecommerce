import { Link } from "../assets/components/Link";

export default function NotFoundPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number with decorative elements */}
        <div className="relative mb-8">
          <h1 className="text-[150px] sm:text-[200px] font-black text-pinklight/50 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-black text-dark mb-4">
          Oops! Pagina no encontrada
        </h2>
        <p className="text-muted text-lg mb-8 leading-relaxed">
          Parece que esta pagina se escapo como un peluche travieso. No te
          preocupes, tenemos muchas cosas adorables esperandote.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-wine hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 active:scale-95"
          >
            Volver al Inicio
          </Link>
          <Link
            href="/products"
            className="px-8 py-3 bg-pinklight/50 text-primary rounded-full font-semibold hover:bg-pinklight transition-all duration-200"
          >
            Ver Productos
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="size-3 rounded-full bg-pinklight animate-pulse" />
          <span className="size-3 rounded-full bg-gold animate-pulse [animation-delay:200ms]" />
          <span className="size-3 rounded-full bg-skylight animate-pulse [animation-delay:400ms]" />
        </div>
      </div>
    </main>
  );
}
