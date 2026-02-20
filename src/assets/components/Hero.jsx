import { useState } from "react";
import logoSection from "./../images/section.jpg";
import { useRouter } from "../../hooks/useRouter";

export function Hero() {
  const { navigateTo } = useRouter();

  const [focusedField, setFocusedField] = useState(null);
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
    <main className="mt-12 sm:mt-28">
      <section className="text-center flex flex-col justify-center items-center gap-6 ">
        <img
          src={logoSection}
          alt="Logo Section"
          className="w-full size-120 z-1 object-cover absolute top-16 opacity-50 "
        />
        <div className="z-2 w-100 sm:w-160 text-gray-900 p-4 text-xl">
          <h1>
            Encuentra tu próximo compañero{" "}
            <strong className="text-skylight text-2xl font-extrabold">
              ADORABLE
            </strong>{" "}
            con nosotros
          </h1>
          <p>
            Descubre un mundo de ternura. Desde peluches adorables hasta bolsos
            con estilo, tenemos todo para alegrarte el día.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-3/4 p-2 mb-41 rounded-xl bg-pinklight z-2 sm:w-1/2"
        >
          <div className="flex w-full items-center gap-2 justify-between z-2 text-wine">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              name="search"
              type="text"
              placeholder="Busca peluches, bolsos y más!"
              className="w-full p-2 focus:outline-none transition duration-700 rounded-xl"
              onFocus={() => setFocusedField("search")}
              onBlur={() => setFocusedField(null)}
              style={{
                outline:
                  focusedField === "search" ? "2px solid #A9597E" : "none",
              }}
            />
            {focusedField === "search" && (
              <small className="input-hint text-gray-500">
                Presiona enter para buscar
              </small>
            )}
            <button className="p-2 border-2 rounded-xl cursor-pointer hover:bg-wine hover:text-white hover:border-wine transition">
              Buscar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
