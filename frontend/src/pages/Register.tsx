import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { Link } from "../assets/components/Link";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const result = await signUp(email, password);
    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage(result.message ?? "Registro exitoso");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-soft-gray">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-pinklight/30 p-8">
        <h1 className="text-2xl font-bold text-dark text-center mb-2">
          Crear Cuenta
        </h1>
        <p className="text-muted text-center text-sm mb-6">
          Guarda tu carrito y favoritos en tu cuenta
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm">
            {message}
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
              autoComplete="new-password"
              className="w-full px-4 py-2.5 rounded-xl border border-pinklight/30 bg-white outline-none focus:border-primary transition-colors"
              placeholder="••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark mb-1">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full px-4 py-2.5 rounded-xl border border-pinklight/30 bg-white outline-none focus:border-primary transition-colors"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-wine transition-colors disabled:opacity-60 disabled:cursor-wait"
          >
            {isLoading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-wine font-medium"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
