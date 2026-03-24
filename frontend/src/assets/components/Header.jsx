import { useState } from "react";
import logo from "../images/logo.jpg";
import { Link } from "./Link.jsx";
import { useAuthStore } from "../../store/authStore.js";

export function Header() {
  const { isLoggedIn, login, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pinklight/30 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-3 group" href="/">
            <span className="sr-only">Home</span>
            <img
              src={logo}
              alt="OnlyGirlsCcs Logo"
              width={50}
              height={50}
              className="rounded-full ring-2 ring-pinklight/50 group-hover:ring-primary/50 transition-all duration-300"
            />
            <span className="hidden sm:block font-bold text-lg tracking-tight text-dark">
              OnlyGirls<span className="text-primary">Ccs</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Global">
            <ul className="flex items-center gap-1">
              {[
                { href: "/", label: "Inicio" },
                { href: "/products", label: "Tienda" },
                { href: "#", label: "Historia" },
                { href: "/contact", label: "Contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    className="relative px-4 py-2 text-sm font-medium text-muted hover:text-primary transition-colors duration-200 rounded-full hover:bg-pinklight/30"
                    activeClassName="text-primary bg-pinklight/40"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <button
              className="relative p-2.5 rounded-full hover:bg-pinklight/30 transition-colors duration-200 text-muted hover:text-primary"
              aria-label="Carrito de compras"
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Auth Button */}
            <div className="hidden sm:block">
              {isLoggedIn ? (
                <button
                  className="px-5 py-2.5 rounded-full bg-soft-gray text-dark font-medium text-sm hover:bg-pinklight/50 transition-all duration-200 cursor-pointer"
                  onClick={logout}
                >
                  Cerrar Sesion
                </button>
              ) : (
                <button
                  className="px-5 py-2.5 rounded-full bg-primary text-white font-medium text-sm hover:bg-wine hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 cursor-pointer active:scale-95"
                  onClick={login}
                >
                  Iniciar Sesion
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 rounded-full bg-pinklight/40 hover:bg-pinklight transition-colors duration-200 text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <nav className="pt-2 border-t border-pinklight/30">
            <ul className="flex flex-col gap-1">
              {[
                { href: "/", label: "Inicio" },
                { href: "/products", label: "Tienda" },
                { href: "#", label: "Historia" },
                { href: "/contact", label: "Contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    className="block px-4 py-3 text-sm font-medium text-muted hover:text-primary hover:bg-pinklight/20 rounded-xl transition-colors duration-200"
                    activeClassName="text-primary bg-pinklight/30"
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 px-4">
                {isLoggedIn ? (
                  <button
                    className="w-full py-3 rounded-xl bg-soft-gray text-dark font-medium text-sm hover:bg-pinklight/50 transition-all duration-200"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Cerrar Sesion
                  </button>
                ) : (
                  <button
                    className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-wine transition-all duration-200"
                    onClick={() => {
                      login();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Iniciar Sesion
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
