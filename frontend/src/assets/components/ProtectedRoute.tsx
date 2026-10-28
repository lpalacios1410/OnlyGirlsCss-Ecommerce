import { Navigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { SpinnerLoading } from "./SpinnerLoading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, isInitialized, isAdmin } = useAuthStore();

  if (!isInitialized) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <SpinnerLoading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
}
