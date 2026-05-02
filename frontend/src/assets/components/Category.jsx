import plushToys from "../images/plushToys.jpg";
import bags from "../images/Bags.jpg";
import toys from "../images/toys.jpg";
import termos from "../images/Termos.jpg";
import { Link } from "./Link";

const categories = [
  { id: 1, title: "Peluches", subtitle: "Suaves y adorables", img: plushToys },
  { id: 2, title: "Bolsos", subtitle: "Estilo kawaii", img: bags },
  { id: 3, title: "Juguetes", subtitle: "Diversion sin fin", img: toys },
  { id: 4, title: "Termos", subtitle: "Mantente hidratada", img: termos },
];

export function Category() {
  return (
    <section className="bg-linear-to-b from-white to-soft-gray py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pinklight/50 text-primary text-sm font-medium mb-4">
            Explora
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">
            Nuestras Categorias
          </h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Encuentra exactamente lo que buscas en nuestras colecciones
          </p>
        </div>

        {/* Categories Grid */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <li key={cat.id} className="group">
              <Link
                href="/products"
                className="block relative aspect-4/5 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-bold mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 size-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* New Arrivals Section */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold/30 text-dark text-sm font-medium mb-4">
                Recien Llegados
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">
                Nuevos Productos
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-primary font-semibold hover:text-wine transition-colors"
            >
              Ver todos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Conejito Esponjoso",
                desc: "Super suave y tierno",
                price: "$24.99",
                tag: "Nuevo",
              },
              {
                name: "Osito Rosa",
                desc: "Ideal para regalar",
                price: "$29.99",
                tag: "Popular",
              },
              {
                name: "Gatito Kawaii",
                desc: "Compania perfecta",
                price: "$19.99",
                tag: null,
              },
              {
                name: "Unicornio Magico",
                desc: "Brilla en la oscuridad",
                price: "$34.99",
                tag: "Oferta",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-transparent hover:border-pinklight/50"
              >
                <div className="relative aspect-square overflow-hidden bg-soft-gray">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFMXFZRcPPgBHNDa-y4todDOKIxN2g7i7tALBnYqsV3zvF56Kzrd-bKx-zAXDDUfe0oKzttPhLcUsDl0ezQzI639XTdqhww0nd1QyGskQaxVF8Umqt6PgHcYD3dGTmQki_KH56tAi1xinZbl0bat2Qm9_t5gKbeiwx6mn6hInGOVnXNCJj1HuGz4e1udP5UxHLlA5ttynSfZJY4TNBBYX3UqdhA1gWjSm1R8gwh8ZwA89jZb9zujuw97krK5a-Cfb9hsxFSgjSYPiz"
                  />
                  {/* Tag */}
                  {product.tag && (
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                        product.tag === "Nuevo"
                          ? "bg-skylight text-dark"
                          : product.tag === "Popular"
                            ? "bg-primary text-white"
                            : "bg-gold text-dark"
                      }`}
                    >
                      {product.tag}
                    </span>
                  )}
                  {/* Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark/10">
                    <button className="size-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors cursor-pointer">
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <button className="size-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors cursor-pointer">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted text-sm mb-4">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-primary">
                      {product.price}
                    </span>
                    <button className="px-4 py-2 bg-pinklight/50 text-primary rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer active:scale-95">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
