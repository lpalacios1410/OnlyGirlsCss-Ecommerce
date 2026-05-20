import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import { Header } from "./assets/components/Header";
import { Footer } from "./assets/components/Footer";
import { SpinnerLoading } from "./assets/components/SpinnerLoading";

const Home = lazy(() => import("./pages/Home"));
const StoragePage = lazy(() => import("./pages/StoragePage"));
const ContactPage = lazy(() => import("./assets/components/Contact"));
const ProductDetail = lazy(() => import("./assets/components/Detail"));
const NotFoundPage = lazy(() => import("./pages/404"));
const DashboardOg = lazy(() => import("./assets/components/DashboardOG"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<SpinnerLoading />}>
        <Routes>
          <Route path="/dashboardAdmin" element={<DashboardOg />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<StoragePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
