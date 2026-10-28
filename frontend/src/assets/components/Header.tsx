import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "./Link";
import { useAuthStore } from "../../store/authStore";
import { useShoppingStore } from "../../store/shoppingStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { CartModal } from "./CartModal";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Tienda" },
  { href: "/contact", label: "Contacto" },
];

export function Header() {
  const { user, signOut, isAdmin } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { countShoppingCart } = useShoppingStore();
  const { countFavorites } = useFavoritesStore();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const inShoppingCartCount = countShoppingCart();
  const favoriteCount = countFavorites();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pinklight/30 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link className="flex items-center gap-3 group" href="/">
            <img
              src="/logo.jpg"
              alt="OnlyGirlsCcs Logo"
              width={50}
              height={50}
              className="rounded-full ring-2 ring-pinklight/50 group-hover:ring-primary/50 transition-all duration-300"
            />
            <span className="hidden sm:block font-bold text-lg tracking-tight text-dark">
              OnlyGirls<span className="text-primary">Ccs</span>
            </span>
          </Link>

          <nav className="hidden md:block" aria-label="Global">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
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
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn && (
              <>
                {/* Favorites Button */}
                <Link
                  href="/favorites"
                  className="relative p-2.5 rounded-full hover:bg-pinklight/30 transition-colors duration-200 text-muted hover:text-primary"
                  aria-label="Favoritos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {favoriteCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {favoriteCount}
                    </span>
                  )}
                </Link>

                {/* Shopping Cart Button */}
                <button
                  className="relative p-2.5 rounded-full cursor-pointer hover:bg-pinklight/30 transition-colors duration-200 text-muted hover:text-primary"
                  aria-label="Carrito de compras"
                  onClick={() => setIsCartOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
                    />
                  </svg>
                  {inShoppingCartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {inShoppingCartCount}
                    </span>
                  )}
                </button>

                <CartModal
                  isOpen={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                />
              </>
            )}

            {/* Auth */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted max-w-[120px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-soft-gray text-dark font-medium text-sm hover:bg-pinklight/50 transition-all duration-200 cursor-pointer"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-muted hover:text-primary transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-full bg-primary text-white font-medium text-sm hover:bg-wine transition-all duration-200"
                >
                  Registrarse
                </Link>
              </div>
            )}

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
                strokeWidth={2}
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

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <nav className="pt-2 border-t border-pinklight/30">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
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
                    onClick={handleLogout}
                  >
                    Cerrar Sesión ({user?.email})
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="w-full text-center py-3 rounded-xl bg-soft-gray text-dark font-medium text-sm hover:bg-pinklight/50 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      className="w-full text-center py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-wine transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Crear Cuenta
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

      {isAdmin &&
        createPortal(
          <Link
            href="/dashboardAdmin"
            ariaLabel="Agregar producto nuevo"
            className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-primary px-5 py-4 font-semibold text-white shadow-xl hover:bg-wine hover:scale-105 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Agregar producto</span>
          </Link>,
          document.body
        )}
    </>
  );
}
