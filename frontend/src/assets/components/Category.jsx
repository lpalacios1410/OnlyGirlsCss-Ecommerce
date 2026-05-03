import plushToys from "../images/PlushToys.jpg";
import bags from "../images/Bags.jpg";
import toys from "../images/Toys.jpg";
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
    </section>
  );
}
