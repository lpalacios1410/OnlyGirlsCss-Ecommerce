import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";

import { Header } from "./assets/components/Header";
import { Footer } from "./assets/components/Footer";
import { ProtectedRoute } from "./assets/components/ProtectedRoute";
import { SpinnerLoading } from "./assets/components/SpinnerLoading";
import { supabase } from "./lib/supabase";
import { useAuthStore } from "./store/authStore";

const Home = lazy(() => import("./pages/Home"));
const StoragePage = lazy(() => import("./pages/StoragePage"));
const ContactPage = lazy(() => import("./assets/components/Contact"));
const ProductDetail = lazy(() => import("./assets/components/Detail"));
const NotFoundPage = lazy(() => import("./pages/404"));
const DashboardOg = lazy(() => import("./assets/components/DashboardOG"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [setSession]);

  return <>{children}</>;
}

function App() {
  return (
    <AuthInitializer>
      <Header />
      <Suspense fallback={<SpinnerLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<StoragePage />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboardAdmin"
            element={
              <ProtectedRoute requireAdmin>
                <DashboardOg />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </AuthInitializer>
  );
}

export default App;
