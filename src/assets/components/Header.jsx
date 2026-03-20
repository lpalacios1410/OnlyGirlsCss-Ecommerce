import logo from "../images/logo.jpg";
import { Link } from "./Link.jsx";
import { useAuthStore } from "../../store/authStore.js";

export function Header() {
  const { isLoggedIn, login, logout } = useAuthStore();
  return (
    <div>
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block " href="/">
                <span className="sr-only">Home</span>
                <img src={logo} alt="Logo" width={60} className="rounded-4xl" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-700 transition font-semibold hover:text-gray-300"
                      activeClassName="underline underline-offset-4"
                      href="/"
                    >
                      Inicio
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-gray-700 transition font-semibold hover:text-gray-300"
                      activeClassName="underline underline-offset-4"
                      href="/products"
                    >
                      Products
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-gray-700 transition font-semibold hover:text-gray-300"
                      activeClassName="underline underline-offset-4"
                      href="#"
                    >
                      History
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-gray-700 transition font-semibold hover:text-gray-300"
                      activeClassName="underline underline-offset-4"
                      href="/contact"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {isLoggedIn ? (
                  <button
                    className="w-full p-2 rounded-xl bg-primary cursor-pointer hover:bg-primary/90 transition text-white font-semibold "
                    onClick={logout}
                  >
                    Log out
                  </button>
                ) : (
                  <button
                    className="w-full p-2 rounded-xl bg-primary cursor-pointer hover:bg-primary/90 transition text-white font-semibold "
                    onClick={login}
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded-sm bg-pink-400 p-2 hover:bg-pink-300 hover:text-pink-500 hover:cursor-pointer transition text-white ">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
