import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { Link } from "../assets/components/Link";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate("/products");
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-soft-gray">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-pinklight/30 p-8">
        <h1 className="text-2xl font-bold text-dark text-center mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-muted text-center text-sm mb-6">
          Accede para guardar tu carrito y favoritos
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 rounded-xl border border-pinklight/30 bg-white outline-none focus:border-primary transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-xl border border-pinklight/30 bg-white outline-none focus:border-primary transition-colors"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-wine transition-colors disabled:opacity-60 disabled:cursor-wait"
          >
            {isLoading ? "Entrando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-wine font-medium"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
