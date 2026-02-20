import plushToys from "../images/plushToys.jpg";
import bags from "../images/Bags.jpg";
import toys from "../images/toys.jpg";
import termos from "../images/Termos.jpg";
import { Link } from "./Link";

const categories = [
  { id: 1, title: "Plush Toys", img: plushToys },
  { id: 2, title: "Bolsos", img: bags },
  { id: 3, title: "Juguetes", img: toys },
  { id: 4, title: "Termos", img: termos },
];

export function Category() {
  return (
    <section className="bg-gray-200">
      <div className="flex justify-center my-2 sm:my-0 text-3xl font-bold p-7 text-wine text-shadow-2xs underline decoration-pinklight decoration-2 underline-offset-8 decoration-wavy ">
        <h1> Nuestras categorias</h1>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <Link href="/products">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-48 opacity-85 object-cover transform hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 trasition duration-300 bg-black/50">
                  <span className="text-white text-lg font-semibold">
                    {cat.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <section className="pb-16 md:pb-24 bg-gray-200 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-wine">New Arrivals</h2>
            <a
              className="text-primary font-medium hover:underline"
              href="/products"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                alt="A cute pink bunny plush toy."
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFMXFZRcPPgBHNDa-y4todDOKIxN2g7i7tALBnYqsV3zvF56Kzrd-bKx-zAXDDUfe0oKzttPhLcUsDl0ezQzI639XTdqhww0nd1QyGskQaxVF8Umqt6PgHcYD3dGTmQki_KH56tAi1xinZbl0bat2Qm9_t5gKbeiwx6mn6hInGOVnXNCJj1HuGz4e1udP5UxHLlA5ttynSfZJY4TNBBYX3UqdhA1gWjSm1R8gwh8ZwA89jZb9zujuw97krK5a-Cfb9hsxFSgjSYPiz"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-wine">
                  Fluffy Bunny Plush
                </h3>
                <p className="text-gray-700 mt-1">Super soft and cuddly</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">$24.99</span>
                  <button className="bg-primary/20 text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                alt="A cute pink bunny plush toy."
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFMXFZRcPPgBHNDa-y4todDOKIxN2g7i7tALBnYqsV3zvF56Kzrd-bKx-zAXDDUfe0oKzttPhLcUsDl0ezQzI639XTdqhww0nd1QyGskQaxVF8Umqt6PgHcYD3dGTmQki_KH56tAi1xinZbl0bat2Qm9_t5gKbeiwx6mn6hInGOVnXNCJj1HuGz4e1udP5UxHLlA5ttynSfZJY4TNBBYX3UqdhA1gWjSm1R8gwh8ZwA89jZb9zujuw97krK5a-Cfb9hsxFSgjSYPiz"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-wine">
                  Fluffy Bunny Plush
                </h3>
                <p className="text-gray-700 mt-1">Super soft and cuddly</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">$24.99</span>
                  <button className="bg-primary/20 text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                alt="A cute pink bunny plush toy."
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFMXFZRcPPgBHNDa-y4todDOKIxN2g7i7tALBnYqsV3zvF56Kzrd-bKx-zAXDDUfe0oKzttPhLcUsDl0ezQzI639XTdqhww0nd1QyGskQaxVF8Umqt6PgHcYD3dGTmQki_KH56tAi1xinZbl0bat2Qm9_t5gKbeiwx6mn6hInGOVnXNCJj1HuGz4e1udP5UxHLlA5ttynSfZJY4TNBBYX3UqdhA1gWjSm1R8gwh8ZwA89jZb9zujuw97krK5a-Cfb9hsxFSgjSYPiz"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-wine">
                  Fluffy Bunny Plush
                </h3>
                <p className="text-gray-700 mt-1">Super soft and cuddly</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">$24.99</span>
                  <button className="bg-primary/20 text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <img
                alt="A cute pink bunny plush toy."
                className="w-full h-56 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFMXFZRcPPgBHNDa-y4todDOKIxN2g7i7tALBnYqsV3zvF56Kzrd-bKx-zAXDDUfe0oKzttPhLcUsDl0ezQzI639XTdqhww0nd1QyGskQaxVF8Umqt6PgHcYD3dGTmQki_KH56tAi1xinZbl0bat2Qm9_t5gKbeiwx6mn6hInGOVnXNCJj1HuGz4e1udP5UxHLlA5ttynSfZJY4TNBBYX3UqdhA1gWjSm1R8gwh8ZwA89jZb9zujuw97krK5a-Cfb9hsxFSgjSYPiz"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg text-wine">
                  Fluffy Bunny Plush
                </h3>
                <p className="text-gray-700 mt-1">Super soft and cuddly</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-primary">$24.99</span>
                  <button className="bg-primary/20 text-primary px-4 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
